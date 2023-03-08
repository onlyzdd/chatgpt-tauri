
<template>
  <n-config-provider :theme="theme" style="height: 100%">
    <n-notification-provider>
      <n-layout style="min-height: 100%" content-style="margin: 0 auto; max-width: 840px; padding: 36px 24px" >
        <n-layout-header>
          <n-space align="center" justify="space-between" v-if="store.apikey">
            <n-avatar :size="40" :src="logoSVG" />
            <n-space align="center">
              <n-icon size="24" @click="store.toggleTheme">
                <moon-outline v-if="store.darkTheme"></moon-outline>
                <sunny-outline v-else></sunny-outline>
              </n-icon>
              <n-icon size="24" @click="store.toggleShowSettings" style="cursor: pointer;">
                <settings-outline />
              </n-icon>
            </n-space>
          </n-space>
        </n-layout-header>
        <n-layout-content>
          <router-view />
        </n-layout-content>
        <n-layout-footer position="absolute" style="bottom: 12px;">
          <n-space justify="center">
            Made with ❤️
          </n-space>
        </n-layout-footer>
      </n-layout>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n' 
import { NAvatar, NConfigProvider, NIcon, NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NNotificationProvider, NSpace, darkTheme } from 'naive-ui'
import { MoonOutline, SettingsOutline, SunnyOutline } from '@vicons/ionicons5'
import { useSettingsStore } from './store'


import logoSVG from './assets/logo.svg'

const { locale, t } = useI18n()
const store = useSettingsStore()
locale.value = store.lang
const theme = computed(() => {
  return store.darkTheme ? darkTheme : undefined
})

</script>

<style scoped>
.n-layout-header, .n-layout-footer {
  background-color: transparent;
}

.n-avatar {
  border-radius: 8px;
}

</style>
