import {
  ResultReason,
  SpeechConfig,
  SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk'

/** Last started synthesizer; closed when a new `speak` runs or on completion. */
let activeSynthesizer: SpeechSynthesizer | null = null

/** Strip common markdown so TTS does not read asterisks and backticks aloud. */
function stripForSpeech(raw: string): string {
  let s = raw.replace(/```[\s\S]*?```/g, ' ')
  s = s.replace(/`[^`]*`/g, ' ')
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1')
  s = s.replace(/\*([^*]+)\*/g, '$1')
  s = s.replace(/__([^_]+)__/g, '$1')
  s = s.replace(/_([^_]+)_/g, '$1')
  s = s.replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
  s = s.replace(/^#{1,6}\s+/gm, '')
  s = s.replace(/\s+/g, ' ')
  return s.trim()
}

function readAzureEnv(): { key: string; region: string; voice?: string } | null {
  const key = import.meta.env.VITE_AZURE_SPEECH_KEY?.trim()
  const region = import.meta.env.VITE_AZURE_SPEECH_REGION?.trim()
  if (!key || !region) return null
  const voice = import.meta.env.VITE_AZURE_SPEECH_VOICE?.trim()
  return { key, region, voice: voice || undefined }
}

/** Stop any in-flight Azure synthesis (e.g. new user message or unmount). */
export function cancelAzureSpeech(): void {
  if (!activeSynthesizer) return
  try {
    activeSynthesizer.close()
  } catch {
    /* already closed */
  }
  activeSynthesizer = null
}

/**
 * Speak plain text via Azure Neural TTS. No-op if env is missing.
 * Viseme events are logged to the console for future lip-sync work.
 */
export function speak(text: string): void {
  const plain = stripForSpeech(text)
  if (!plain) return

  const env = readAzureEnv()
  if (!env) {
    if (import.meta.env.DEV) {
      console.debug(
        '[azureSpeech] skipped: set VITE_AZURE_SPEECH_KEY and VITE_AZURE_SPEECH_REGION',
      )
    }
    return
  }

  cancelAzureSpeech()

  const speechConfig = SpeechConfig.fromSubscription(env.key, env.region)
  if (env.voice) {
    speechConfig.speechSynthesisVoiceName = env.voice
  }

  const synthesizer = new SpeechSynthesizer(speechConfig)
  activeSynthesizer = synthesizer

  synthesizer.visemeReceived = (_sender, event) => {
    const audioOffsetMs = event.audioOffset / 10000
    console.debug('[azureSpeech][viseme]', {
      visemeId: event.visemeId,
      audioOffsetMs,
      animationChars: event.animation?.length ?? 0,
    })
  }

  synthesizer.speakTextAsync(
    plain,
    (result) => {
      if (result.reason !== ResultReason.SynthesizingAudioCompleted) {
        console.warn('[azureSpeech] synthesis finished with', result.reason, result.errorDetails)
      }
      try {
        synthesizer.close()
      } catch {
        /* */
      }
      if (activeSynthesizer === synthesizer) {
        activeSynthesizer = null
      }
    },
    (err) => {
      console.warn('[azureSpeech] speakTextAsync error', err)
      try {
        synthesizer.close()
      } catch {
        /* */
      }
      if (activeSynthesizer === synthesizer) {
        activeSynthesizer = null
      }
    },
  )
}
