import CryptoJS from 'crypto-js'


const CRYPTOJS_SECRET = '#CRYPTOJS_SECRET#'

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

const createStorage = (prefix = '') => {
    const getKey = (key: string) => {
        return `${prefix}${key}`.toUpperCase()
    }

    const get = <T> (key: string, default_val: any = null): T => {
        let data = localStorage.getItem(getKey(key))
        if (data !== null) {
            try {
                data = CryptoJS.AES.decrypt(data, CRYPTOJS_SECRET).toString(CryptoJS.enc.Utf8)
                const json = JSON.parse(data)
                const { value, expire } = json
                if (expire === null || expire >= Date.now()) {
                    return value
                }
                localStorage.removeItem(getKey(key))
            }
            catch (e) {
                return default_val
            }
        }
        return default_val
    }

    const set = (key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME): void => {
        const data = JSON.stringify({value, expire: expire !== null ? new Date().getTime() + expire * 1000 : null})
        localStorage.setItem(
            getKey(key),
            CryptoJS.AES.encrypt(data, CRYPTOJS_SECRET).toString()
        )
    }

    return { get, set }
}

export const storage = createStorage()
