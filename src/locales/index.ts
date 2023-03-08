import { createI18n } from 'vue-i18n'
import en from './en_US'
import zh from './zh_CN'

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'zh',
    messages: {
        en,
        zh
    }
})
