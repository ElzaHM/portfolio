/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Direct collaboration — personal email displayed on Contact page */
  readonly VITE_CONTACT_PRO_EMAIL?: string
  /** Direct collaboration — mobile (e.g. +374 XX XX XX XX) */
  readonly VITE_CONTACT_PHONE?: string
  /** Azure Speech resource key (browser — use token auth in production when possible) */
  readonly VITE_AZURE_SPEECH_KEY?: string
  /** Azure region, e.g. eastus2 */
  readonly VITE_AZURE_SPEECH_REGION?: string
  /** Optional neural voice name, e.g. en-US-AvaNeural */
  readonly VITE_AZURE_SPEECH_VOICE?: string
  /** D-ID API credentials as USER:PASSWORD (local only — prefer server-side proxy in production) */
  readonly VITE_DID_API_KEY?: string
}
