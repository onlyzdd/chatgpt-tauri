import CryptoJS from 'crypto-js'
import { createPinia, defineStore } from 'pinia'

import { SettingsState } from '../types'
import { storage } from "../utils/storage"

export const pinia = createPinia()

export const useSettingsStore = defineStore('settings', {
    state: (): SettingsState => {
        return { 
            apikey: storage.get('apikey') || '',
            darkTheme: storage.get('darktheme') || false,
            lang: storage.get('lang') || 'en',
            showSettings: false,
        }
    },
    actions: {
        setAPIKey(apikey: string) {
            this.apikey = apikey
            storage.set('apikey', apikey)
        },
        setLang(lang: 'en' | 'zh') {
            if (this.lang !== lang) {
                this.lang = lang
                storage.set('lang', lang)
            }
        },
        toggleShowSettings() {
            this.showSettings = !this.showSettings
        },
        toggleTheme() {
            this.darkTheme = !this.darkTheme
            storage.set('darktheme', this.darkTheme)
        },
        logout() {
            this.setAPIKey('')
            this.showSettings = false
        },
    },
    getters: {
        uid: (state) => {
            return CryptoJS.MD5(state.apikey).toString()
        }
    },
})
