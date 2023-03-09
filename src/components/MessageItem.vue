<template>
    <n-list-item class="msg-item">
        <template v-if="from === 'user'" #prefix>
            <n-avatar :size="32" :src="`https://gravatar.loli.net/avatar/${store.uid}?d=identicon`" />
        </template>
        <template v-else #prefix>
            <n-avatar :size="32" :src="chatgptsvg" />
        </template>
        <n-spin size="small" :show="isLoading">
            <n-alert :type="type" :show-icon="false">
                <div class="msg" v-html="html"></div>
            </n-alert>
        </n-spin>
    </n-list-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NAlert, NAvatar, NListItem, NSpin } from 'naive-ui'
import MarkdownIt from 'markdown-it'
import mdHighlight from 'markdown-it-highlightjs'

import { useSettingsStore } from '../store'
import chatgptsvg from '../assets/logo.svg'

const store = useSettingsStore()
const props = defineProps<{ from: string, text: string, type: "default" | "error" | "info" | "success" | "warning" }>()

let isLoading = computed(() => props.from !== 'user' && props.text.length === 0)
const md = MarkdownIt().use(mdHighlight, { inline: true })

const html = computed(() => {
    if (props.from === 'user') return props.text
    return md.render(props.text)
})

</script>

<style>
.n-list-item.msg-item .n-list-item__main {
    min-width: 0;
}

div.msg pre {
    overflow-x: auto;
}

div.msg :first-child {
    margin-block-start: 0;
}

div.msg :last-child {
    margin-block-end: 0;
}
</style>
