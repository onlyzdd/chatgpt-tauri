<template>
    <n-layout content-style="padding-top: 15%;">
        <n-space vertical style="height: 100%;">
            <n-space justify="center">
                <n-avatar class="logo" :size="60" :src="chatgptSvg" />
            </n-space>
            <n-form ref="formRef" :model="modelRef" :rules="rules">
                <n-form-item path="apikey" label="API Key">
                    <n-input v-model:value="modelRef.apikey" placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        clearable @keydown.enter.prevent="goHome"></n-input>
                </n-form-item>
                <n-form-item :show-label="false">
                    <n-button type="primary" @click="goHome">{{ t('go') }}</n-button>
                </n-form-item>
            </n-form>
        </n-space>
    </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NAvatar, NForm, NFormItem, NInput, NLayout, NRow, NSpace, FormInst, FormItemRule, FormRules, useNotification } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import router from '../router'
import { useSettingsStore } from '../store'

import chatgptSvg from '../assets/logo.svg'

interface ModelType {
    apikey: string | null;
}

const { t } = useI18n()
const store = useSettingsStore()
const notification = useNotification()
const formRef = ref<FormInst | null>(null)
const modelRef = ref<ModelType>({ apikey: store.apikey })

const rules: FormRules = {
    apikey: [
        {
            required: true,
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error(t('apikey_required_prompt'))
                } else if (value.length !== 51 || !value.startsWith('sk-')) {
                    return new Error(t('apikey_invalid_prompt'))
                }
                return true
            },
            trigger: ['blur'],
        }
    ]
}

const goHome = () => {
    if (!modelRef.value.apikey) {
        notification.error({ content: t('apikey_required_prompt'), duration: 1500 })
    } else if (modelRef.value.apikey?.length === 51 && modelRef.value.apikey.startsWith('sk-')) {
        store.setAPIKey(modelRef.value.apikey)
        notification.success({ content: t('redirect_home'), duration: 500 })
        router.push('/')
    }
    else {
        notification.error({ content: t('apikey_invalid_prompt'), duration: 1500 })
    }
}

</script>

<style scoped>
.logo {
    border-radius: 12px;
}
</style>
