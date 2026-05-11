import axios from 'axios'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string
const MODEL = import.meta.env.VITE_GEMINI_MODEL as string
const BASE_URL = import.meta.env.VITE_GEMINI_BASE_URL as string

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

/** Turns sent to the API (user / model only; excludes UI-only welcome). */
export type ConversationTurn = {
  role: 'user' | 'model'
  text: string
}

const SYSTEM_PROMPT = `You are the AI Assistant of Elza Hovhannisyan. You represent her professional profile and speak about her work with clarity and accuracy.

Identity rules:
- Never claim you have no name or that you are only a generic chatbot disconnected from Elza.
- When asked who you are, your name, or what you are, respond in substance with this message (you may lightly adapt wording for flow but keep the same meaning): "Hello! I am the AI Assistant of Elza Hovhannisyan. I'm here to tell you about her expertise in Frontend Development, Project Management, and her social impact projects like techahartak.com."
- In other replies, stay consistent with this persona: you are her dedicated assistant helping visitors understand her skills, experience, and projects.

Subject matter: frontend engineering (React, Next.js, TypeScript, accessibility), technical and agile project management, Techahartak.com and social impact, leadership and delivery. Be concise unless the user asks for detail. If something is unknown, say so rather than inventing.`

/** Appended to the base system prompt for the Digital Twin single-Q&A surface (concise briefing tone). */
export const DIGITAL_TWIN_SYSTEM_SUFFIX = `Digital Twin interview mode: You answer one question at a time on the portfolio page—there is no rolling chat history visible to the visitor. Reply briefly by default: about 2–5 short sentences or a compact bullet list, staying under roughly 120 words unless the user explicitly asks for more depth or a long explanation. Do not prepend a long greeting unless it is one short clause.`

export type SendGeminiOptions = {
  systemInstructionSuffix?: string
}

export const sendToGemini = async (
  history: ConversationTurn[],
  options?: SendGeminiOptions,
): Promise<string> => {
  const url = `${BASE_URL}/models/${MODEL}:generateContent`

  const systemText = options?.systemInstructionSuffix
    ? `${SYSTEM_PROMPT}\n\n${options.systemInstructionSuffix}`
    : SYSTEM_PROMPT

  const payload = {
    systemInstruction: {
      role: 'system',
      parts: [{ text: systemText }],
    },
    contents: history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
  }

  try {
    const response = await axios.post<GeminiResponse>(url, payload, {
      params: { key: API_KEY },
      headers: { 'Content-Type': 'application/json' },
    })

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
  } catch (error: unknown) {
    const message =
      error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { error?: { message?: string } } } }).response?.data
            ?.error?.message
        : undefined
    console.error(message || error)
    return 'Sorry — something went wrong reaching the assistant. Please try again in a moment.'
  }
}
