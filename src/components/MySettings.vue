<template>
    <n-drawer :width="400" :show="store.showSettings" placement="right" @mask-click="store.toggleShowSettings">
        <n-drawer-content :title="t('settings')">
            <n-space vertical>
                <n-space class="title">
                    {{ t('theme') }}
                </n-space>
                <n-space>
                    <n-icon size="24" @click="switchDarkTheme(false)"><sunny-outline /></n-icon>
                    <n-icon size="24" @click="switchDarkTheme(true)"><moon-outline /></n-icon>
                </n-space>
                <n-space class="title">
                    {{ t('lang') }}
                </n-space>
                <n-space>
                    <n-radio-group v-model:value="store.lang" @update-value="changeLang">
                        <n-radio v-for="lang in langs" :key="lang" :value="lang" :label="t(lang)" />
                    </n-radio-group>
                </n-space>
                <n-space class="title">
                    {{ t('about') }}
                </n-space>
                <n-space>
                    <span>
                        {{ t('built_with') }} <a href="https://vitejs.dev/" target="_blank">Vite</a> 
                        + <a href="https://vuejs.org/" target="_blank">Vue</a> 
                        + <a href="https://www.naiveui.com/" target="_blank">NaiveUI</a> 
                        + <a href="https://tauri.app/" target="_blank">Tauri</a>.
                    </span>
                </n-space>
                <n-space class="title">
                    {{ t('danger_zone') }}
                </n-space>
                <n-space>
                    <n-button @click="logout">{{ t('exit') }}</n-button>
                </n-space>
            </n-space>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { NButton, NDrawer, NDrawerContent, NIcon, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

import router from '../router'
import { useSettingsStore } from '../store'

const store = useSettingsStore()
const { locale, t } = useI18n()
const langs = reactive(['en', 'zh'])

const switchDarkTheme = (checkDark: boolean) => {
    if (checkDark !== store.darkTheme) { store.toggleTheme() }
}

const changeLang = (value: 'en' | 'zh') => {
    store.setLang(value)
    locale.value = value
}

const logout = () => {
    store.logout()
    router.push('/setup')
}

</script>

<style scoped>
.n-space.title {
    font-size: 18px;
}

.n-icon {
    cursor: pointer;
}
</style>
