export default function SocialIcon({ type, className = 'h-[14px] w-[14px] fill-current' }) {
  switch (type) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18.5 5.2 12 5.2 12 5.2s-6.5 0-8.8.5c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 2.3.5 8.8.5 8.8.5s6.5 0 8.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l5.7 3.3-5.7 3.3z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M6.5 21H3V9h3.5v12zM4.8 7.5A2 2 0 1 1 4.8 3.4a2 2 0 0 1 0 4.1zM21 21h-3.5v-6.4c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1.1V21H9.8s0-10.3 0-12H13v1.8c.5-.8 1.5-2 3.6-2 2.6 0 4.5 1.7 4.5 5.4V21z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M19.6 7.4c-1.5-.1-2.9-.8-3.9-1.9V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 2 2.7V2.5h2.6c.2 2.2 1.9 3.9 4 4.2v2.7z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
  }
}
