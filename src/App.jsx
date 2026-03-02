import { useEffect, useRef, useState } from 'react'
import { FaCss3Alt, FaFacebookF, FaGithub, FaHtml5, FaInstagram, FaJava, FaLinkedinIn, FaPhp, FaReact } from 'react-icons/fa'
import {
  SiJavascript,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
} from 'react-icons/si'
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

function useCountUp(target, { duration = 1400, start = 0, shouldStart = true } = {}) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (!shouldStart) {
      setValue(start)
      return
    }

    let frameId = null
    let startTime = null

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (target - start) * eased))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [duration, shouldStart, start, target])

  return value
}

function StatCounterCard({ label, value, suffix = '', detail, delay = 0 }) {
  const [ref, isVisible] = useInView({ threshold: 0.35, rootMargin: '0px 0px -8% 0px' })
  const countedValue = useCountUp(value, { duration: 1200 + delay, shouldStart: isVisible })

  return (
    <article
      ref={ref}
      className={`stat-card rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-700 dark:border-slate-700 dark:bg-slate-900/80 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500 dark:text-brand-200">{label}</p>
      <p className="stat-number mt-3 text-3xl font-black text-slate-900 dark:text-white">
        {countedValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
    </article>
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
  const [showCvPreview, setShowCvPreview] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [isProjectSliderHovered, setIsProjectSliderHovered] = useState(false)
  const [isDraggingProjectSlider, setIsDraggingProjectSlider] = useState(false)
  const [projectDragOffset, setProjectDragOffset] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  })
  const [isSendingContactMessage, setIsSendingContactMessage] = useState(false)
  const [contactFormStatus, setContactFormStatus] = useState({ type: 'idle', message: '' })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const projectSliderViewportRef = useRef(null)
  const projectSliderDragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    deltaX: 0,
    width: 0,
    isHorizontalDrag: false,
  })
  const coreStack = [
    { name: 'HTML', Icon: FaHtml5, iconClass: 'text-orange-500' },
    { name: 'CSS', Icon: FaCss3Alt, iconClass: 'text-blue-500' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, iconClass: 'text-cyan-500' },
    { name: 'JavaScript', Icon: SiJavascript, iconClass: 'text-yellow-400' },
    { name: 'React', Icon: FaReact, iconClass: 'text-sky-500' },
    { name: 'PHP', Icon: FaPhp, iconClass: 'text-indigo-500' },
    { name: 'Laravel', Icon: SiLaravel, iconClass: 'text-red-500' },
    { name: 'Kotlin', Icon: SiKotlin, iconClass: 'text-violet-500' },
    { name: 'MySQL', Icon: SiMysql, iconClass: 'text-blue-600' },
  ]
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]
  const skillRanges = [
    {
      name: 'Frontend Engineering',
      level: 93,
      detail: 'React component architecture, responsive layouts, and polished UX interactions.',
      gradient: 'from-cyan-500 via-sky-500 to-indigo-500',
    },
    {
      name: 'Backend Development',
      level: 86,
      detail: 'PHP and Laravel API/database workflows focused on practical production features.',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
    {
      name: 'Database Management',
      level: 82,
      detail: 'MySQL schema planning, data handling, and reliable CRUD operations.',
      gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    },
    {
      name: 'UI Implementation',
      level: 90,
      detail: 'Modern Tailwind interfaces with consistent spacing, hierarchy, and accessibility.',
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
    },
    {
      name: 'Vibe Coding & AI Pairing',
      level: 96,
      detail: 'Fast iteration using Codex, DeepSeek, GitHub Copilot, Grok, and other AI assistants with clean production output.',
      gradient: 'from-fuchsia-500 via-violet-500 to-indigo-500',
    },
  ]
  const learningTracks = [
    {
      category: 'Frontend',
      detail: 'Learning modern routing, hybrid rendering, and production patterns.',
      tools: [{ name: 'Next.js', Icon: SiNextdotjs, iconClass: 'text-slate-900 dark:text-slate-100' }],
      gradient: 'from-slate-700 via-slate-800 to-slate-900',
    },
    {
      category: 'Backend',
      detail: 'Practicing API design and scalable server architecture in two ecosystems.',
      tools: [
        { name: 'Node.js', Icon: SiNodedotjs, iconClass: 'text-emerald-500' },
        { name: 'Java', Icon: FaJava, iconClass: 'text-orange-500' },
      ],
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
    {
      category: 'Database',
      detail: 'Studying relational schema design, indexing strategy, and query tuning.',
      tools: [{ name: 'PostgreSQL', Icon: SiPostgresql, iconClass: 'text-sky-600' }],
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    },
  ]
  const cvFilePath = '/images/aung-khant-min-cv.pdf'
  const totalProjects = projects.length
  const uniqueStackCount = new Set(projects.flatMap((project) => project.stack)).size
  const githubProjects = projects.filter((project) => Boolean(project.githubUrl)).length
  const projectStats = [
    {
      label: 'Projects Created',
      value: totalProjects,
      suffix: '+',
      detail: 'Portfolio projects designed and implemented from idea to working product.',
    },
    {
      label: 'Tech Used',
      value: uniqueStackCount,
      suffix: '+',
      detail: 'Languages and frameworks used across frontend and backend builds.',
    },
    {
      label: 'GitHub Repos',
      value: githubProjects,
      suffix: '+',
      detail: 'Project repositories available with code structure and implementation details.',
    },
  ]
  const [skillsRangeRef, isSkillsRangeVisible] = useInView({ threshold: 0.24, rootMargin: '0px 0px -12% 0px' })
  const [learningTracksRef, isLearningTracksVisible] = useInView({ threshold: 0.2, rootMargin: '0px 0px -8% 0px' })

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
    document.body.style.overflow = selectedMarks || showCvPreview ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedMarks, showCvPreview])

  useEffect(() => {
    if (projects.length < 2 || isProjectSliderHovered || isDraggingProjectSlider) return

    const slider = setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length)
    }, 8000)

    return () => clearInterval(slider)
  }, [isProjectSliderHovered, isDraggingProjectSlider])

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (contactFormStatus.type !== 'success') return

    const hideMessageTimer = window.setTimeout(() => {
      setContactFormStatus({ type: 'idle', message: '' })
    }, 4800)

    return () => window.clearTimeout(hideMessageTimer)
  }, [contactFormStatus])

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

  const goToPreviousProject = () => {
    setActiveProject((current) => (current - 1 + projects.length) % projects.length)
  }

  const goToNextProject = () => {
    setActiveProject((current) => (current + 1) % projects.length)
  }

  const resetProjectSliderDrag = () => {
    projectSliderDragStateRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      deltaX: 0,
      width: 0,
      isHorizontalDrag: false,
    }
    setProjectDragOffset(0)
    setIsDraggingProjectSlider(false)
  }

  const handleProjectSliderPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const viewport = projectSliderViewportRef.current
    if (!viewport) return

    projectSliderDragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      deltaX: 0,
      width: viewport.clientWidth,
      isHorizontalDrag: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDraggingProjectSlider(true)
  }

  const handleProjectSliderPointerMove = (event) => {
    const dragState = projectSliderDragStateRef.current
    if (dragState.pointerId !== event.pointerId) return

    const deltaX = event.clientX - dragState.startX
    const deltaY = event.clientY - dragState.startY

    if (!dragState.isHorizontalDrag) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        resetProjectSliderDrag()
        return
      }
      dragState.isHorizontalDrag = true
    }

    const maxDrag = dragState.width * 0.3
    const limitedOffset = Math.max(-maxDrag, Math.min(maxDrag, deltaX))

    dragState.deltaX = limitedOffset
    setProjectDragOffset(limitedOffset)
  }

  const handleProjectSliderPointerEnd = (event) => {
    const dragState = projectSliderDragStateRef.current
    if (dragState.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const swipeDistance = dragState.deltaX
    const swipeThreshold = Math.min(150, dragState.width * 0.16)

    if (Math.abs(swipeDistance) >= swipeThreshold) {
      if (swipeDistance < 0) {
        goToNextProject()
      } else {
        goToPreviousProject()
      }
    }

    resetProjectSliderDrag()
  }

  const handleContactInputChange = (event) => {
    const { name, value } = event.target
    setContactFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (contactFormStatus.type !== 'idle') {
      setContactFormStatus({ type: 'idle', message: '' })
    }
  }

  const handleContactFormSubmit = async (event) => {
    event.preventDefault()
    if (isSendingContactMessage) return

    const payload = {
      name: contactFormData.name.trim(),
      email: contactFormData.email.trim(),
      message: contactFormData.message.trim(),
      website: contactFormData.website.trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setContactFormStatus({ type: 'error', message: 'Please fill in name, email, and message.' })
      return
    }

    try {
      setIsSendingContactMessage(true)
      setContactFormStatus({ type: 'idle', message: '' })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.message || 'Failed to send message. Please try again.')
      }

      setContactFormStatus({
        type: 'success',
        message: result?.message || 'Message sent successfully. I will reply soon.',
      })
      setContactFormData({
        name: '',
        email: '',
        message: '',
        website: '',
      })
    } catch (error) {
      let message = 'Failed to send message. Please try again.'

      if (error instanceof TypeError) {
        message = 'Contact server is unreachable. Run `npm run dev` and configure `.env` SMTP settings.'
      } else if (error instanceof Error && error.message) {
        message = error.message
      }

      setContactFormStatus({
        type: 'error',
        message,
      })
    } finally {
      setIsSendingContactMessage(false)
    }
  }

  return (
    <div className="portfolio-bg relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="fixed left-0 top-0 z-[60] h-1.5 w-full bg-slate-200/60 backdrop-blur dark:bg-slate-800/70">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 shadow-[0_0_18px_rgba(47,109,246,0.6)] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="ambient-blob absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-300/45 blur-3xl dark:bg-cyan-500/20"
          style={{ '--ambient-duration': '26s', '--ambient-delay': '-3s' }}
        />
        <div
          className="ambient-blob absolute right-[-80px] top-40 h-80 w-80 rounded-full bg-fuchsia-300/45 blur-3xl dark:bg-fuchsia-500/20"
          style={{ '--ambient-duration': '30s', '--ambient-delay': '-9s' }}
        />
        <div
          className="ambient-blob absolute left-1/3 top-[34rem] h-72 w-72 rounded-full bg-amber-300/45 blur-3xl dark:bg-amber-500/20"
          style={{ '--ambient-duration': '25s', '--ambient-delay': '-5s' }}
        />
        <div
          className="ambient-blob absolute bottom-24 left-[-70px] h-80 w-80 rounded-full bg-emerald-300/45 blur-3xl dark:bg-emerald-500/20"
          style={{ '--ambient-duration': '28s', '--ambient-delay': '-11s' }}
        />
        <div
          className="ambient-blob absolute right-[8%] top-[62rem] h-64 w-64 rounded-full bg-rose-300/35 blur-3xl dark:bg-rose-500/20"
          style={{ '--ambient-duration': '24s', '--ambient-delay': '-7s' }}
        />
        <div
          className="ambient-blob absolute left-[10%] top-[90rem] h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/20"
          style={{ '--ambient-duration': '29s', '--ambient-delay': '-13s' }}
        />
        <div
          className="ambient-blob absolute right-[-40px] top-[120rem] h-80 w-80 rounded-full bg-sky-300/35 blur-3xl dark:bg-sky-500/20"
          style={{ '--ambient-duration': '27s', '--ambient-delay': '-4s' }}
        />
        <div
          className="ambient-blob absolute left-1/2 top-[146rem] h-64 w-64 -translate-x-1/2 rounded-full bg-lime-300/30 blur-3xl dark:bg-lime-500/20"
          style={{ '--ambient-duration': '31s', '--ambient-delay': '-10s', '--ambient-base-transform': 'translateX(-50%)' }}
        />
        <div
          className="ambient-blob absolute left-[-50px] top-[170rem] h-72 w-72 rounded-full bg-pink-300/30 blur-3xl dark:bg-pink-500/20"
          style={{ '--ambient-duration': '26s', '--ambient-delay': '-14s' }}
        />
        <div
          className="ambient-blob absolute right-[12%] bottom-[18rem] h-64 w-64 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/20"
          style={{ '--ambient-duration': '30s', '--ambient-delay': '-6s' }}
        />
      </div>

      <header className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <nav className="mb-12 rounded-3xl border border-white/60 bg-white/70 p-3 shadow-xl shadow-brand-500/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 rounded-2xl border border-white/60 bg-white/70 px-3 py-2 shadow-lg shadow-brand-500/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-extrabold text-white dark:bg-brand-500 sm:h-10 sm:w-10 sm:text-sm">
                  AK
                </span>
                <div className="min-w-0">
                  <p className="max-w-[9.5rem] truncate text-sm font-black tracking-tight text-slate-900 dark:text-white sm:max-w-none sm:text-lg">Aung Khant Min</p>
                  <div className="mt-0.5 hidden items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200 sm:inline-flex">
                    Full Stack Developer
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-brand-200 dark:hover:text-brand-100 md:hidden"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  {isMobileMenuOpen ? (
                    <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  )}
                </svg>
              </button>

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
          </div>

          <div className="mt-4 hidden flex-wrap items-center gap-2 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link-pill">
                <span className="relative z-[1]">{link.label}</span>
              </a>
            ))}
          </div>

          <div
            id="mobile-nav-menu"
            className={`mobile-nav-panel mt-3 grid gap-2 overflow-hidden transition-all duration-300 md:hidden ${
              isMobileMenuOpen ? 'max-h-80 translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={`mobile-${link.href}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
              </a>
            ))}
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
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
              >
                View Projects
              </a>
              <button
                type="button"
                onClick={() => setShowCvPreview(true)}
                className="w-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:scale-[1.02] hover:from-brand-600 hover:to-cyan-600 sm:w-auto"
              >
                Download CV
              </button>
              <a
                href="#contact"
                className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-100 dark:hover:text-brand-100 sm:w-auto"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
              <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-brand-500" />
              Scroll for more
            </div>
          </div>
          <div className="hero-float rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
            <img
              src="/images/profile.jpg"
              alt="Aung Khant Min profile"
              className="portrait-breathe h-80 w-full rounded-2xl object-cover object-[center_25%] ring-1 ring-slate-200 dark:ring-slate-700"
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

      <main className="relative z-10 mx-auto max-w-5xl space-y-20 px-4 pb-20 sm:px-6">
        <section id="about">
          <SectionTitle eyebrow="About" title="A quick introduction" />
          <RevealText
            text="I am a Full Stack Developer who enjoys turning ideas into polished, scalable web apps. I work with HTML, CSS, Tailwind CSS, JavaScript, React, PHP, Laravel, Kotlin, and MySQL to build smooth user experiences and reliable backend systems."
            className="max-w-3xl text-slate-700 dark:text-slate-300"
            step={12}
          />
        </section>

        <section id="skills">
          <SectionTitle eyebrow="Skills" title="Skill range and delivery details" />
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div
              ref={skillsRangeRef}
              className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/40 backdrop-blur dark:border-slate-700 dark:bg-slate-900/75 dark:ring-slate-700"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-500 dark:text-brand-200">Skill Range</p>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Current confidence level based on projects I have delivered and tools I use daily.
              </p>
              <div className="mt-6 space-y-5">
                {skillRanges.map((skill, index) => (
                  <article
                    key={skill.name}
                    className={`transition-all duration-700 ${isSkillsRangeVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                    style={{ transitionDelay: `${index * 110}ms` }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</h3>
                      <span className="text-xs font-bold text-brand-500 dark:text-brand-200">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/80">
                      <div
                        className={`skill-fill h-full rounded-full bg-gradient-to-r ${skill.gradient} transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isSkillsRangeVisible ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{
                          width: `${skill.level}%`,
                          transformOrigin: 'left',
                          transitionDelay: `${100 + index * 150}ms`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{skill.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {projectStats.map((item, index) => (
                <StatCounterCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  suffix={item.suffix}
                  detail={item.detail}
                  delay={index * 140}
                />
              ))}
            </div>
          </div>

          <div
            ref={learningTracksRef}
            className="mt-6 rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-900/5 ring-1 ring-white/40 backdrop-blur dark:border-slate-700 dark:bg-slate-900/75 dark:ring-slate-700 sm:p-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-500 dark:text-brand-200">Currently Learning</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  New technologies I am actively studying right now.
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:bg-brand-900/60 dark:text-brand-100">
                2026 learning path
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {learningTracks.map((track, index) => (
                <article
                  key={track.category}
                  className={`rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition-all duration-700 dark:border-slate-700 dark:bg-slate-900/85 ${
                    isLearningTracksVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${120 + index * 130}ms` }}
                >
                  <div
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${track.gradient} px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white`}
                  >
                    {track.category}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{track.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {track.tools.map(({ name, Icon, iconClass }) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      >
                        <Icon className={`text-base ${iconClass}`} />
                        {name}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
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
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-500 dark:text-brand-200">
                  Slide Showcase
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {totalProjects} projects created using {uniqueStackCount} technologies.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goToPreviousProject}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={goToNextProject}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-brand-500/60 via-cyan-400/60 to-brand-500/60 p-[1.5px]">
              <div
                ref={projectSliderViewportRef}
                className={`overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-950/95 ${
                  isDraggingProjectSlider ? 'cursor-grabbing select-none' : 'cursor-grab'
                }`}
                style={{ touchAction: 'pan-y' }}
                onMouseEnter={() => setIsProjectSliderHovered(true)}
                onMouseLeave={() => setIsProjectSliderHovered(false)}
                onPointerDown={handleProjectSliderPointerDown}
                onPointerMove={handleProjectSliderPointerMove}
                onPointerUp={handleProjectSliderPointerEnd}
                onPointerCancel={handleProjectSliderPointerEnd}
              >
              <div
                className={`flex ${isDraggingProjectSlider ? '' : 'transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
                style={{ transform: `translate3d(calc(-${activeProject * 100}% + ${projectDragOffset}px), 0, 0)` }}
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
                          <img src={project.imagePath} alt={`${project.name} preview`} className="h-48 w-full object-cover object-top sm:h-56" />
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
            <form onSubmit={handleContactFormSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={contactFormData.website}
                  onChange={handleContactInputChange}
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="name" className="mb-1 block text-sm font-semibold text-brand-100">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={contactFormData.name}
                  onChange={handleContactInputChange}
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
                  maxLength={120}
                  value={contactFormData.email}
                  onChange={handleContactInputChange}
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
                  minLength={10}
                  maxLength={4000}
                  value={contactFormData.message}
                  onChange={handleContactInputChange}
                  className="w-full rounded-xl border border-brand-100/40 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/70 focus:border-white focus:outline-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSendingContactMessage}
                  className={`contact-send-btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-70 ${
                    isSendingContactMessage ? 'contact-send-btn-busy' : ''
                  }`}
                >
                  {isSendingContactMessage ? (
                    <>
                      <span className="contact-spinner" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {contactFormStatus.type !== 'idle' ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`contact-status ${
                      contactFormStatus.type === 'success' ? 'contact-status-success' : 'contact-status-error'
                    }`}
                  >
                    <span className="contact-status-icon" aria-hidden="true">
                      {contactFormStatus.type === 'success' ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6">
                          <path d="m5 12 4.2 4.2L19 7.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M12 8.6v4.8M12 17.2h.01" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      )}
                    </span>
                    <p>{contactFormStatus.message}</p>
                  </div>
                ) : null}
              </div>
            </form>
          ) : null}
        </section>
      </main>

      <footer className="footer-glow relative z-10 overflow-hidden border-t border-slate-200/80 bg-white/80 py-16 backdrop-blur dark:border-slate-700 dark:bg-slate-950/80">
        <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6">
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

      {showCvPreview ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-4" onClick={() => setShowCvPreview(false)}>
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Aung Khant Min CV</h3>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={cvFilePath}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-brand-100 dark:hover:text-brand-100"
                >
                  Open in New Tab
                </a>
                <a
                  href={cvFilePath}
                  download="Aung-Khant-Min-CV.pdf"
                  className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  Download CV
                </a>
                <button
                  type="button"
                  onClick={() => setShowCvPreview(false)}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-brand-100 dark:hover:text-brand-100"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              title="Aung Khant Min CV preview"
              src={cvFilePath}
              className="h-[78vh] w-full bg-slate-100 dark:bg-slate-950"
            />
          </div>
        </div>
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



