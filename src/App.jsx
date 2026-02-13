import { useEffect, useRef, useState } from 'react'
import { FaCss3Alt, FaFacebookF, FaGithub, FaHtml5, FaInstagram, FaLinkedinIn, FaPhp, FaReact } from 'react-icons/fa'
import { SiJavascript, SiKotlin, SiMysql, SiTailwindcss } from 'react-icons/si'
import SectionTitle from './components/SectionTitle'
import projects from './data/projects'

function useInView({ threshold = 0.2, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

function RevealText({ text, className, as: Tag = 'p', step = 35 }) {
  const [ref, isVisible] = useInView()
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
          style={{ transitionDelay: `${index * step}ms` }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

function VoguzPreview() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <p className="text-sm font-bold tracking-wide text-slate-900 dark:text-slate-100">VOGUZ</p>
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-500" />
        </div>
      </div>
      <div className="border-b border-slate-200 px-4 py-2 text-center text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
        TOPWEAR | JEANS | PANTS | SHOES
      </div>
      <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-center text-[11px] font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
        FREE DELIVERY WORLDWIDE FOR MEN PRODUCTS
      </div>
      <div className="relative h-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-700 to-slate-900 opacity-40" />
        <div className="absolute -left-10 -top-4 h-56 w-12 rotate-12 bg-slate-100/70" />
        <div className="absolute left-7 -top-4 h-56 w-10 rotate-12 bg-red-500/80" />
        <div className="absolute left-20 -top-4 h-56 w-10 rotate-12 bg-slate-800/90" />
        <div className="absolute left-32 -top-4 h-56 w-10 rotate-12 bg-yellow-500/80" />
        <div className="absolute left-44 -top-4 h-56 w-10 rotate-12 bg-amber-800/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/30 px-4 text-center">
          <h4 className="text-lg font-extrabold text-white">VOGUZ STYLING</h4>
          <p className="mt-1 text-xs text-slate-100">Elevate your wardrobe with premium men's collection</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState('light')
  const [selectedMarks, setSelectedMarks] = useState(null)
  const [activeProject, setActiveProject] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const coreStack = [
    { name: 'HTML', Icon: FaHtml5, iconClass: 'text-orange-500' },
    { name: 'CSS', Icon: FaCss3Alt, iconClass: 'text-blue-500' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, iconClass: 'text-cyan-500' },
    { name: 'JavaScript', Icon: SiJavascript, iconClass: 'text-yellow-400' },
    { name: 'React', Icon: FaReact, iconClass: 'text-sky-500' },
    { name: 'PHP', Icon: FaPhp, iconClass: 'text-indigo-500' },
    { name: 'Kotlin', Icon: SiKotlin, iconClass: 'text-violet-500' },
    { name: 'MySQL', Icon: SiMysql, iconClass: 'text-blue-600' },
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = selectedMarks ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedMarks])

  useEffect(() => {
    const slider = setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length)
    }, 5000)

    return () => clearInterval(slider)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const educationTimeline = [
    {
      status: 'Completed',
      period: 'Foundation Stage',
      title: 'NCC Level 4 Diploma in Computing',
      detail: 'Built core knowledge in programming, databases, system analysis, and software development practices.',
      marksImagePath: '/images/l4 marks.png',
    },
    {
      status: 'Completed',
      period: 'Advanced Diploma Stage',
      title: 'NCC Level 5 Diploma in Computing',
      detail: 'Strengthened practical skills in project work, architecture, and applied computing concepts.',
      marksImagePath: '/images/l5 marks.jpg',
    },
    {
      status: 'Currently Attending',
      period: 'Final Year',
      title: 'B.Sc (Hons) Computing Science, University of Greenwich (UK)',
      detail: 'Completing final-year studies with focus on advanced computing topics and real-world development.',
    },
  ]

  return (
    <div className="portfolio-bg relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="fixed left-0 top-0 z-[60] h-1.5 w-full bg-slate-200/60 backdrop-blur dark:bg-slate-800/70">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 shadow-[0_0_18px_rgba(47,109,246,0.6)] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-300/45 blur-3xl dark:bg-cyan-500/20" />
        <div className="absolute right-[-80px] top-40 h-80 w-80 rounded-full bg-fuchsia-300/45 blur-3xl dark:bg-fuchsia-500/20" />
        <div className="absolute left-1/3 top-[34rem] h-72 w-72 rounded-full bg-amber-300/45 blur-3xl dark:bg-amber-500/20" />
        <div className="absolute bottom-24 left-[-70px] h-80 w-80 rounded-full bg-emerald-300/45 blur-3xl dark:bg-emerald-500/20" />
        <div className="absolute right-[8%] top-[62rem] h-64 w-64 rounded-full bg-rose-300/35 blur-3xl dark:bg-rose-500/20" />
        <div className="absolute left-[10%] top-[90rem] h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/20" />
        <div className="absolute right-[-40px] top-[120rem] h-80 w-80 rounded-full bg-sky-300/35 blur-3xl dark:bg-sky-500/20" />
        <div className="absolute left-1/2 top-[146rem] h-64 w-64 -translate-x-1/2 rounded-full bg-lime-300/30 blur-3xl dark:bg-lime-500/20" />
        <div className="absolute left-[-50px] top-[170rem] h-72 w-72 rounded-full bg-pink-300/30 blur-3xl dark:bg-pink-500/20" />
        <div className="absolute right-[12%] bottom-[18rem] h-64 w-64 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/20" />
      </div>

      <header className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-16">
        <nav className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="rounded-2xl border border-white/60 bg-white/70 px-3 py-2 shadow-lg shadow-brand-500/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white dark:bg-brand-500">
                AK
              </span>
              <div>
                <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Aung Khant Min</p>
                <div className="mt-0.5 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
                  Full Stack Developer
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
            <a href="#about" className="hover:text-brand-600 dark:hover:text-brand-100">
              About
            </a>
            <a href="#education" className="hover:text-brand-600 dark:hover:text-brand-100">
              Education
            </a>
            <a href="#projects" className="hover:text-brand-600 dark:hover:text-brand-100">
              Projects
            </a>
            <a href="#contact" className="hover:text-brand-600 dark:hover:text-brand-100">
              Contact
            </a>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              className={`relative inline-flex h-9 w-16 items-center rounded-full border p-1 transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-slate-600 bg-slate-900 shadow-inner shadow-slate-950'
                  : 'border-amber-200 bg-gradient-to-r from-amber-200 to-orange-200 shadow-inner shadow-amber-300/60'
              }`}
            >
              <span
                className={`absolute left-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                  theme === 'dark'
                    ? 'translate-x-7 bg-slate-800 text-slate-100 shadow-lg shadow-black/40'
                    : 'translate-x-0 bg-white text-amber-500 shadow-lg shadow-amber-400/60'
                }`}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 13.2A8.8 8.8 0 1 1 10.8 3a7.4 7.4 0 1 0 10.2 10.2Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3" />
                  </svg>
                )}
              </span>
              <span className="sr-only">{theme === 'dark' ? 'Dark mode active' : 'Light mode active'}</span>
            </button>
          </div>
        </nav>

        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-100">Full Stack Developer</p>
            <RevealText
              as="h1"
              text="Hi, I am Aung Khant Min."
              className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl"
              step={55}
            />
            <RevealText
              text="I build clean and scalable web applications, from frontend interfaces to backend logic."
              className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300"
              step={20}
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {coreStack.map(({ name, Icon, iconClass }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                >
                  <Icon className={iconClass} />
                  {name}
                </span>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="#projects"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-100 dark:hover:text-brand-100"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
              <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-500" />
              Scroll for more
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
            <img
              src="/images/profile.jpg"
              alt="Aung Khant Min profile"
              className="h-80 w-full rounded-2xl object-cover object-[center_25%] ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <p className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Aung Khant Min</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Full Stack Developer</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-200">
              {coreStack.map(({ name, Icon, iconClass }) => (
                <li key={name} className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 dark:bg-slate-800/70">
                  <Icon className={iconClass} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl space-y-20 px-6 pb-20">
        <section id="about">
          <SectionTitle eyebrow="About" title="A quick introduction" />
          <RevealText
            text="I am a Full Stack Developer who enjoys turning ideas into polished, scalable web apps. I work with HTML, CSS, Tailwind CSS, JavaScript, React, PHP, Kotlin, and MySQL to build smooth user experiences and reliable backend systems."
            className="max-w-3xl text-slate-700 dark:text-slate-300"
            step={12}
          />
        </section>

        <section id="education">
          <SectionTitle eyebrow="Education" title="Academic background" />
          <div className="relative space-y-8 pl-8">
            <div className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-700 dark:from-brand-800 dark:via-brand-600 dark:to-brand-300" />
            {educationTimeline.map((item) => (
              <article
                key={item.title}
                className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
              >
                <span className="absolute -left-[30px] top-7 h-4 w-4 rounded-full border-4 border-white bg-brand-500 shadow ring-2 ring-brand-200 dark:border-slate-900 dark:ring-brand-900" />
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === 'Currently Attending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-500 dark:text-brand-100">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
                {item.marksImagePath ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedMarks({ title: item.title, imagePath: item.marksImagePath })}
                      className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      View Marks
                    </button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionTitle eyebrow="Portfolio" title="Featured projects" />
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-4 shadow-2xl shadow-brand-500/10 ring-1 ring-slate-200 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:ring-slate-700 md:p-6">
            <div className="pointer-events-none absolute -left-24 -top-20 h-52 w-52 rounded-full bg-brand-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-14 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-500 dark:text-brand-200">
                Slide Showcase
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveProject((current) => (current - 1 + projects.length) % projects.length)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProject((current) => (current + 1) % projects.length)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-brand-500/60 via-cyan-400/60 to-brand-500/60 p-[1.5px]">
              <div className="overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-950/95">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeProject * 100}%)` }}
              >
                {projects.map((project) => (
                  <article key={project.name} className="w-full shrink-0 px-1">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-700 md:p-7">
                      <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                        Featured Work
                      </div>
                      {project.featured && !project.imagePath ? <VoguzPreview /> : null}
                      {project.imagePath ? (
                        <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
                          <img src={project.imagePath} alt={`${project.name} preview`} className="h-56 w-full object-cover object-top" />
                        </div>
                      ) : null}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                          View GitHub
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  type="button"
                  onClick={() => setActiveProject(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeProject
                      ? 'w-8 bg-gradient-to-r from-brand-500 to-cyan-500 dark:from-brand-300 dark:to-cyan-300'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'
                  }`}
                  aria-label={`Go to ${project.name}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="rounded-3xl bg-brand-900 p-10 text-white">
          <SectionTitle eyebrow="Contact" title="Let's work together" inverse />
          <p className="max-w-2xl text-brand-100">
            Looking for a frontend developer for your next project? Send a message and tell me about your goals.
          </p>
          <div className="mt-7">
            <button
              type="button"
              onClick={() => setShowContactForm((current) => !current)}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-100"
            >
              {showContactForm ? 'Hide Contact Form' : 'Open Contact Form'}
            </button>
          </div>

          {showContactForm ? (
            <form action="https://formsubmit.co/akmdaniel2@gmail.com" method="POST" className="mt-8 grid gap-4 md:grid-cols-2">
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://formsubmit.co/thanks" />

              <div className="md:col-span-1">
                <label htmlFor="name" className="mb-1 block text-sm font-semibold text-brand-100">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-brand-100/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/70 focus:border-white focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-brand-100">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-brand-100/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/70 focus:border-white focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="mb-1 block text-sm font-semibold text-brand-100">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full rounded-xl border border-brand-100/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/70 focus:border-white focus:outline-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-100"
                >
                  Send Message
                </button>
              </div>
            </form>
          ) : null}
        </section>
      </main>

      <footer className="footer-glow relative z-10 overflow-hidden border-t border-slate-200/80 bg-white/80 py-16 backdrop-blur dark:border-slate-700 dark:bg-slate-950/80">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-500 dark:text-brand-200">How I Can Help</p>
            <h2 className="mt-2 bg-gradient-to-r from-brand-600 via-cyan-500 to-brand-500 bg-clip-text text-3xl font-extrabold text-transparent">
              Flexible ways to build your product
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="footer-card rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                <p className="text-2xl font-black text-brand-500 dark:text-brand-200">01</p>
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">Design</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  I design clean, usable, and modern interfaces that turn ideas into clear digital experiences.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Website</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Web Apps</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Design Systems</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Branding</span>
                </div>
              </article>

              <article className="footer-card rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                <p className="text-2xl font-black text-brand-500 dark:text-brand-200">02</p>
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">Development</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  I build fast and reliable frontend/backend solutions with a practical, maintainable code approach.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Website</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Web Apps</span>
                </div>
              </article>

              <article className="footer-card rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
                <p className="text-2xl font-black text-brand-500 dark:text-brand-200">03</p>
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">Full Package</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  End-to-end delivery from design to deployment for teams that need one complete implementation partner.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">Design + Dev</span>
                </div>
              </article>
            </div>
          </section>

          <section className="footer-faq grid gap-6 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-500 dark:text-brand-200">Need More Info?</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Let&apos;s have a call</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Not sure if my process fits your needs yet? I can walk you through timeline, scope, and execution.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">How can I reach out to discuss collaboration?</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Use the contact form above and share your goal. I will get back to you with next steps.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Do you offer freelance services or consultations?</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Yes. I&apos;m available for freelance projects and focused consulting sessions.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Social Media</p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/share/1DuyCdNZyH/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="social-orb inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-orb inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.instagram.com/this_is_just_daniel?igsh=bGlhMWxvdGNyNDBp&utm_source=qr" target="_blank" rel="noreferrer" className="social-orb inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/aung-khant-min-b1ab583a5?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" className="social-orb inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </section>
        </div>
      </footer>

      {showScrollTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-[0_10px_30px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:from-slate-800 hover:to-slate-600 dark:border-slate-600 dark:from-brand-700 dark:to-brand-500 dark:shadow-[0_10px_30px_rgba(47,109,246,0.35)]"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
          </span>
          <svg
            viewBox="0 0 24 24"
            className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="M12 18V6M6.5 11.5 12 6l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}

      {selectedMarks ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setSelectedMarks(null)}>
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{selectedMarks.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedMarks(null)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200"
              >
                Close
              </button>
            </div>
            <img src={selectedMarks.imagePath} alt={`${selectedMarks.title} marks`} className="max-h-[75vh] w-full object-contain bg-slate-100 dark:bg-slate-950" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App



