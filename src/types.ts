export interface SettingsState {
    apikey: string
    lang: 'en' | 'zh'
    darkTheme: boolean
    showSettings: boolean
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant'
    content: string
}

export interface ChatRecord {
    from: string;
    text: string;
    type: "default" | "error" | "info" | "success" | "warning";
}
