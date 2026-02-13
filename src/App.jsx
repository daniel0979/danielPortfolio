import { useEffect, useState } from 'react'
import SectionTitle from './components/SectionTitle'
import projects from './data/projects'

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
  const coreStack = ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React', 'PHP', 'Kotlin', 'MySQL']

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
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-300/45 blur-3xl dark:bg-cyan-500/20" />
        <div className="absolute right-[-80px] top-40 h-80 w-80 rounded-full bg-fuchsia-300/45 blur-3xl dark:bg-fuchsia-500/20" />
        <div className="absolute left-1/3 top-[34rem] h-72 w-72 rounded-full bg-amber-300/45 blur-3xl dark:bg-amber-500/20" />
        <div className="absolute bottom-24 left-[-70px] h-80 w-80 rounded-full bg-emerald-300/45 blur-3xl dark:bg-emerald-500/20" />
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
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-100 dark:hover:text-brand-100"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </nav>

        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-100">Full Stack Developer</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">
              Hi, I&apos;m Aung Khant Min.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              I build clean and scalable web applications, from frontend interfaces to backend logic.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {coreStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="#projects"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
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
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
            <img
              src="/images/profile.jpg"
              alt="Aung Khant Min profile"
              className="h-80 w-full rounded-2xl object-cover object-[center_25%] ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <p className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Aung Khant Min</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Full Stack Developer</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li>HTML | CSS | Tailwind CSS</li>
              <li>JavaScript | React</li>
              <li>PHP | Kotlin | MySQL</li>
            </ul>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl space-y-20 px-6 pb-20">
        <section id="about">
          <SectionTitle eyebrow="About" title="A quick introduction" />
          <p className="max-w-3xl text-slate-700 dark:text-slate-300">
            I am a Full Stack Developer who enjoys turning ideas into polished, scalable web apps. I work with HTML,
            CSS, Tailwind CSS, JavaScript, React, PHP, Kotlin, and MySQL to build smooth user experiences and reliable
            backend systems.
          </p>
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
                      className="rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-600"
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
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700 ${
                  project.featured ? 'md:col-span-2' : ''
                }`}
              >
                {project.featured ? <VoguzPreview /> : null}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.name}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
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
                    className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-brand-500 dark:hover:bg-brand-600"
                  >
                    View GitHub
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-3xl bg-brand-900 p-10 text-white">
          <SectionTitle eyebrow="Contact" title="Let's work together" inverse />
          <p className="max-w-2xl text-brand-100">
            Looking for a frontend developer for your next project? Send a message and tell me about your goals.
          </p>
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
        </section>
      </main>

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
