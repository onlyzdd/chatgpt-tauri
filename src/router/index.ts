import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import { useSettingsStore } from '../store'

import Setup from '../views/Setup.vue'
import Chat from '../views/Chat.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'chat', component: Chat, meta: { requireKey: true } },
    { path: '/setup', name: 'setup', component: Setup, meta: { requireKey: false } }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    const store = useSettingsStore()
    if (to.meta.requireKey && !store.apikey) {
        next({ path: '/setup' })
    } else {
        next()
    }
})

export default router
