/**
 * Thin stroke icons (~Lucide 14px / stroke 1.5).
 */
type IconProps = { className?: string; 'aria-hidden'?: boolean }

const base = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconHome({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-7H9v7H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
    </svg>
  )
}

export function IconLayers({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="m12.5 2.5 9 5-9 5-9-5 9-5z" />
      <path d="m3.5 10 9 5 9-5" />
      <path d="m3.5 14.5 9 5 9-5" />
    </svg>
  )
}

export function IconListOrdered({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M11 6h10M11 12h10M11 18h10" />
      <path d="M4 5v3l1 1M4 17.5l2.5-2.5M5 12h2" />
    </svg>
  )
}

export function IconLayoutGrid({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function IconUser({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
    </svg>
  )
}

export function IconMessageCircle({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l4.9-2z" />
    </svg>
  )
}

export function IconMail({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function IconMenu({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconX({ className, ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
