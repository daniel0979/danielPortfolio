function SectionTitle({ eyebrow, title, inverse = false }) {
  const eyebrowClass = inverse ? 'text-brand-100' : 'text-brand-500 dark:text-brand-100'
  const titleClass = inverse ? 'text-white' : 'text-slate-900 dark:text-white'
  const underlineClass = inverse
    ? 'from-white via-brand-100 to-white'
    : 'from-brand-500 via-cyan-400 to-brand-500'

  return (
    <div className="mb-8">
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-bold ${titleClass}`}>{title}</h2>
      <span
        className={`section-underline mt-3 block h-1 w-16 rounded-full bg-gradient-to-r bg-[length:200%_100%] ${underlineClass}`}
        aria-hidden="true"
      />
    </div>
  )
}

export default SectionTitle
