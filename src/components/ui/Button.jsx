import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-cyan-500 text-navy-950 hover:bg-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.35)]',
  outline:
    'bg-transparent text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10',
  ghost: 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10',
  pill: 'bg-navy-800/80 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm font-medium',
  lg: 'px-8 py-3.5 text-base font-semibold',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    as = 'button',
    href,
    ...props
  },
  ref
) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300 will-change-transform ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`

  if (as === 'a' || href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={classes} {...props}>
      {children}
    </button>
  )
})

export default Button
