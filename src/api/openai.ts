import { useSettingsStore } from '../store'
import { ChatMessage } from '../types'

const createOpenAI = () => {
    const chat = async(
        messages: Array<ChatMessage>
    ) => {
        const store = useSettingsStore()
        return await fetch('https://api.openai.com/v1/chat/completions', {
            body: JSON.stringify({
                messages,
                model: 'gpt-3.5-turbo',
                stream: true,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.apikey}`
            },
            method: 'POST',
        })
    }
    return { chat }
}

export const openai = createOpenAI()
