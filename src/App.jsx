import SectionTitle from './components/SectionTitle'
import projects from './data/projects'

function VoguzPreview() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <p className="text-sm font-bold tracking-wide text-slate-900">VOGUZ</p>
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="border-b border-slate-200 px-4 py-2 text-center text-xs font-semibold text-slate-700">
        TOPWEAR | JEANS | PANTS | SHOES
      </div>
      <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-center text-[11px] font-semibold text-slate-800">
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
          <p className="mt-1 text-xs text-slate-100">Elevate your wardrobe with premium men&apos;s collection</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="portfolio-bg relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-300/45 blur-3xl" />
        <div className="absolute right-[-80px] top-40 h-80 w-80 rounded-full bg-fuchsia-300/45 blur-3xl" />
        <div className="absolute left-1/3 top-[34rem] h-72 w-72 rounded-full bg-amber-300/45 blur-3xl" />
        <div className="absolute bottom-24 left-[-70px] h-80 w-80 rounded-full bg-emerald-300/45 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-16">
        <nav className="mb-12 flex items-center justify-between">
          <span className="text-lg font-bold text-brand-900">YourName</span>
          <div className="flex gap-6 text-sm font-medium text-slate-700">
            <a href="#about" className="hover:text-brand-600">
              About
            </a>
            <a href="#projects" className="hover:text-brand-600">
              Projects
            </a>
            <a href="#contact" className="hover:text-brand-600">
              Contact
            </a>
          </div>
        </nav>

        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Frontend Developer</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              I build fast and modern web interfaces.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              I craft user-friendly products with React and Tailwind CSS, focused on clean design and performance.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#projects"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-brand-500">Tech Stack</p>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>React</li>
              <li>JavaScript (ES6+)</li>
              <li>Tailwind CSS</li>
              <li>REST API Integration</li>
            </ul>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl space-y-20 px-6 pb-20">
        <section id="about">
          <SectionTitle eyebrow="About" title="A quick introduction" />
          <p className="max-w-3xl text-slate-700">
            I am a developer who enjoys turning ideas into polished, scalable web apps. I focus on readable code,
            responsive layouts, and smooth user experiences.
          </p>
        </section>

        <section id="projects">
          <SectionTitle eyebrow="Portfolio" title="Featured projects" />
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 ${
                  project.featured ? 'md:col-span-2' : ''
                }`}
              >
                {project.featured ? <VoguzPreview /> : null}
                <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                <p className="mt-3 text-sm text-slate-600">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                      {item}
                    </span>
                  ))}
                </div>
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
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
          <a
            href="mailto:youremail@example.com"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900"
          >
            youremail@example.com
          </a>
        </section>
      </main>
    </div>
  )
}

export default App
