<template>
    <n-space :class="themeClass" vertical style="max-width: 800px; width: 100%;">
        <n-space vertical style="margin-bottom: 3em; min-height: 240px;">
            <n-list>
                <message-item v-for="qa in history" :type="qa.type" :text="qa.text" :from="qa.from" />
            </n-list>
            <n-space justify="end">
                <n-button v-if="lastQuestion.length" @click="tryAgain">{{ t('try_again') }}</n-button>
            </n-space>
        </n-space>
        <n-space>
            <n-input autofocus type="textarea" autosize
                :placeholder="t('chat_placeholder')" v-model:value="question"
                @keydown.enter.prevent="submitOnEnter" style="position: absolute; bottom: 0;">
                <template #suffix>
                    <n-icon class="suffix-icon" :size="16" :component="PaperPlane" @click="submitOnClick" />
                </template>
            </n-input>
        </n-space>
    </n-space>
    <my-settings></my-settings>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { NButton, NIcon, NInput, NList, NSpace } from 'naive-ui'
import { PaperPlane } from '@vicons/ionicons5'
import { openai } from '../api/openai'
import { ChatMessage, ChatRecord } from '../types'
import { useI18n } from 'vue-i18n'

import { useSettingsStore } from '../store'

import MySettings from '../components/MySettings.vue'
import MessageItem from '../components/MessageItem.vue'

const { t } = useI18n()
const store = useSettingsStore()
const question = ref('')
const lastQuestion = ref('')
const isLoading = ref(false)
const history: Array<ChatRecord> = reactive([])
const messages: Array<ChatMessage> = []
const themeClass = computed(() => store.darkTheme ? 'theme-dark' : 'theme-light')

const submit = async (retry: boolean = false) => {
    if (isLoading.value) return
    isLoading.value = true
    if (!retry) {
        history.push({ from: 'user', text: question.value, type: 'default' })
        history.push({ from: 'chatgpt', text: '', type: 'success' })
        messages.push({ role: 'user', content: question.value })
        lastQuestion.value = question.value
        question.value = ''
    }
    const last = history[history.length - 1]
    try {
        let res = await openai.chat(messages)
        let reader = res.body?.getReader()
        let done = false
        let decoder = new TextDecoder('utf-8')
        last.type = 'success'
        while (reader && !done) {
            const { value, done: readerDone } = await reader.read()
            if (value) {
                const sequences = decoder.decode(value).split('data: ')
                for (let seq of sequences) {
                    if (seq.startsWith('{')) {
                        const json = JSON.parse(seq)
                        const text = json.choices[0].delta?.content || ''
                        last.text += text
                    }
                }
            }
            done = readerDone
        }
    } catch (e) {
        last.text = t('chat_error')
        last.type = 'error'
    }
    isLoading.value = false
}

const submitOnEnter = async (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        question.value += '\n'
    } else if (question.value.trim().length) {
        await submit()
    }
}

const submitOnClick = async () => {
    if (question.value.trim().length) {
        await submit()
    }
}

const tryAgain = async () => {
    if (lastQuestion.value.trim().length) {
        const last = history[history.length - 1]
        last.text = ''
        await submit(true)
    }
}

</script>

<style lang="scss">
.suffix-icon {
    cursor: pointer;
}

.suffix-icon:hover {
    color: var(--n-icon-color-hover);
}

.theme-light {
    @import '../assets/_atom-one-light.scss';
}

.theme-dark {
    @import '../assets/_github-dark.scss';
}
</style>