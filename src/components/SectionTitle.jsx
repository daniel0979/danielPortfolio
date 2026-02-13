function SectionTitle({ eyebrow, title, inverse = false }) {
  const eyebrowClass = inverse ? 'text-brand-100' : 'text-brand-500 dark:text-brand-100'
  const titleClass = inverse ? 'text-white' : 'text-slate-900 dark:text-white'

  return (
    <div className="mb-8">
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-bold ${titleClass}`}>{title}</h2>
    </div>
  )
}

export default SectionTitle
