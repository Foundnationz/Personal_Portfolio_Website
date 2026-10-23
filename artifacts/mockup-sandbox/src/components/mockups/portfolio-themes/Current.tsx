import "./_group.css";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, BookOpen, Code2, Menu, Users, X, MapPin, Mail, Link2 } from "lucide-react";
import {
  about, contact, education, experience, featuredProjectIds, navItems, profile, projects, skills,
  type IconKey, type Project,
} from "./_data";
import { ProjectArt } from "./_ProjectArt";

const icons: Record<IconKey, typeof Code2> = { ledger: BookOpen, code: Code2, people: Users };

const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#729AC1] px-7 py-3.5 text-[15px] font-medium text-[#14202e] transition hover:-translate-y-0.5 hover:bg-[#86abd0] active:translate-y-0";
const ghost =
  "inline-flex items-center gap-2 rounded-xl border border-[#729AC1]/60 px-5 py-2.5 text-sm font-medium text-[#a9c3de] transition hover:bg-[#729AC1]/15";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Modal({ open, onOpenChange, title, description, children }: {
  open: boolean; onOpenChange: (o: boolean) => void; title: string; description: string; children?: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dlg-overlay fixed inset-0 z-50 bg-[#0d1218]/80 backdrop-blur-sm" />
        <Dialog.Content className="dlg-content fixed left-1/2 top-1/2 z-50 max-h-[88dvh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#3a4656] bg-[#222831] p-6 shadow-2xl sm:p-8">
          <Dialog.Title className="pr-8 text-2xl font-bold tracking-tight">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-[15px] leading-relaxed text-[#aab6c4]">{description}</Dialog.Description>
          {children}
          <Dialog.Close aria-label="Close dialog" data-testid="button-close-dialog"
            className="absolute right-4 top-4 rounded-lg p-2 text-[#aab6c4] transition hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M6.94 8.98H3.56V20h3.38V8.98ZM5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 13.6c0-3.03-1.62-4.8-3.96-4.8-1.2 0-2.1.55-2.6 1.3V8.98h-3.37V20h3.37v-6c0-1.4.6-2.4 1.9-2.4 1.2 0 1.8.9 1.8 2.4V20h3.37l-.01-6.4Z" />
    </svg>
  );
}

function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <Reveal className="mb-12">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#729AC1]">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
    </Reveal>
  );
}

function ExampleTag() {
  return <span className="rounded-full border border-[#729AC1]/40 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#a9c3de]">Example</span>;
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <article data-testid={`card-project-${p.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#2f3a49] bg-[#1e252e] transition hover:-translate-y-1 hover:border-[#729AC1]/60">
      <div className="aspect-[16/9] overflow-hidden border-b border-[#2f3a49]">
        <div className="h-full w-full transition duration-500 group-hover:scale-[1.04]"><ProjectArt kind={p.art} /></div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[#729AC1]">{p.category}</span>
          {p.isExample && <ExampleTag />}
        </div>
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#aab6c4]">{p.summary}</p>
        <button type="button" onClick={() => onOpen(p)} data-testid={`button-view-project-${p.id}`} className={`${ghost} mt-6 self-start`}>
          View Project <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

type Fields = { first: string; last: string; email: string; subject: string; message: string };
const emptyForm: Fields = { first: "", last: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [v, setV] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [checked, setChecked] = useState(false);

  const validate = (f: Fields) => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!f.first.trim()) e.first = "Enter your first name.";
    if (!f.last.trim()) e.last = "Enter your last name.";
    if (!f.email.trim()) e.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address.";
    if (!f.subject.trim()) e.subject = "Enter a subject.";
    if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  };
  const set = (k: keyof Fields, val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (checked) setErrors(validate(next));
  };
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(v);
    setErrors(e);
    setChecked(true);
    if (Object.keys(e).length) {
      const first = (Object.keys(e)[0] as keyof Fields);
      document.getElementById(`field-${first}`)?.focus();
    }
  };
  const valid = checked && Object.keys(errors).length === 0;

  const field = (k: keyof Fields, label: string, type = "text", half = true) => (
    <div className={half ? "" : "sm:col-span-2"}>
      <label htmlFor={`field-${k}`} className="mb-2 block text-sm font-medium">{label}</label>
      <input id={`field-${k}`} data-testid={`input-${k}`} type={type} value={v[k]}
        onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `err-${k}` : undefined}
        className="w-full rounded-xl border border-[#3f4c5e] bg-[#1b2129] px-4 py-3 text-[15px] placeholder:text-[#6c7a8c] focus:border-[#729AC1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#729AC1]/50 aria-[invalid=true]:border-[#e07a6e]" />
      {errors[k] && <p id={`err-${k}`} className="mt-1.5 text-sm text-[#f0a198]">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-2xl border border-[#2f3a49] bg-[#1e252e] p-6 sm:grid-cols-2 sm:p-8" data-testid="form-contact">
      {field("first", "First name")}
      {field("last", "Last name")}
      {field("email", "Email", "email", false)}
      {field("subject", "Subject", "text", false)}
      <div className="sm:col-span-2">
        <label htmlFor="field-message" className="mb-2 block text-sm font-medium">Message</label>
        <textarea id="field-message" data-testid="input-message" rows={5} value={v.message}
          onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
          className="w-full resize-y rounded-xl border border-[#3f4c5e] bg-[#1b2129] px-4 py-3 text-[15px] focus:border-[#729AC1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#729AC1]/50 aria-[invalid=true]:border-[#e07a6e]" />
        {errors.message && <p id="err-message" className="mt-1.5 text-sm text-[#f0a198]">{errors.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" data-testid="button-submit-contact" className={btn}>Preview Message</button>
        <p className="mt-4 text-sm text-[#aab6c4]">Preview only: this form is not connected to any email service, so nothing is sent.</p>
        <div role="status" aria-live="polite">
          {valid && (
            <p data-testid="status-form-preview" className="mt-3 rounded-xl border border-[#729AC1]/50 bg-[#729AC1]/10 p-4 text-sm leading-relaxed">
              Your details look valid, but this message was <strong>not sent</strong>. No backend or email service is configured. Your text is kept above so you can copy it. Email {contact.email} directly once a real address is added.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default function Current() {
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [liOpen, setLiOpen] = useState(false);

  useEffect(() => {
    const els = navItems.map((n) => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setActive(id);
  };
  const openLinkedIn = () => {
    if (profile.linkedinUrl) window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer");
    else setLiOpen(true);
  };
  const openResume = () => {
    if (profile.resumeUrl) window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
    else setResumeOpen(true);
  };
  const featured = projects.filter((p) => featuredProjectIds.includes(p.id));

  return (
    <div className="min-h-[100dvh] overflow-x-hidden">
      <a href="#about" onClick={(e) => { e.preventDefault(); go("about"); }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#729AC1] focus:px-4 focus:py-2 focus:text-[#14202e]">Skip to content</a>

      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between rounded-xl bg-[#001D3D] px-5 py-3 shadow-lg shadow-black/25 sm:px-8">
          <button type="button" onClick={() => go("home")} aria-label="Shawn Stephen Abok, back to top" data-testid="link-logo">
            <img src={profile.logo} alt="Shawn Stephen Abok" className="h-8 w-auto sm:h-9" />
          </button>
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((n) => (
              <li key={n.id}>
                <button type="button" onClick={() => go(n.id)} data-testid={`link-nav-${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`relative rounded-md px-4 py-2 text-sm transition hover:text-white ${active === n.id ? "text-white" : "text-white/70"}`}>
                  {n.label}
                  <span className={`absolute inset-x-4 bottom-0.5 h-px origin-left bg-[#729AC1] transition-transform duration-300 ${active === n.id ? "scale-x-100" : "scale-x-0"}`} />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="rounded-lg p-2 text-white lg:hidden" aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)} data-testid="button-menu">
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {menu && (
          <div id="mobile-menu" className="dlg-overlay mx-auto mt-2 max-w-7xl rounded-xl bg-[#001D3D] p-3 shadow-xl lg:hidden">
            <ul>
              {navItems.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => go(n.id)} aria-current={active === n.id ? "true" : undefined}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-base ${active === n.id ? "bg-white/10 text-white" : "text-white/75"}`}>
                    {n.label}
                    {active === n.id && <span className="h-2 w-2 rounded-full bg-[#729AC1]" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* HOME */}
        <section id="home" aria-label="Home" className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-[1.25fr_1fr] md:px-12 lg:py-16">
          <div className="order-2 md:order-1">
            <p className="reveal in text-lg tracking-wide text-white/90 sm:text-xl" style={{ animation: "fadeIn .8s ease both" }}>
              {profile.greeting} <span className="text-[#8b97e6]">{profile.name}</span>
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ animation: "fadeIn 1s .1s ease both" }}>
              {profile.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#aab6c4]" style={{ animation: "fadeIn 1s .2s ease both" }}>
              {profile.role} at {profile.university}. {profile.intro}
            </p>
            <div className="mt-8 flex items-center gap-5" style={{ animation: "fadeIn 1s .3s ease both" }}>
              <button type="button" onClick={() => go("about")} className={btn} data-testid="button-about-me">About Me</button>
              <button type="button" onClick={openLinkedIn} aria-label="LinkedIn profile" data-testid="button-linkedin"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#0a74b5] text-white transition hover:scale-110">
                <LinkedInGlyph />
              </button>
            </div>
          </div>
          <div className="order-1 mx-auto w-[68%] max-w-[420px] md:order-2 md:w-full" style={{ animation: "fadeIn 1.2s ease both" }}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 rounded-full border border-[#729AC1]/25" />
              <img src={profile.portrait} alt="Portrait of Shawn Stephen Abok" data-testid="img-portrait"
                className="aspect-square w-full rounded-full border-2 border-[#729AC1]/70 object-cover shadow-[0_24px_60px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" aria-labelledby="h-about" className="border-t border-[#2f3a49]/70 bg-[#1e252e]/70 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <SectionHead eyebrow="About" title="About Me" id="h-about" />
            <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h3 className="text-2xl font-semibold" data-testid="text-name">{profile.name}</h3>
                <p className="mt-1 text-[#729AC1]">{profile.role}</p>
                <dl className="mt-8 space-y-4 text-[15px]">
                  <div className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-[#729AC1]" aria-hidden /><div><dt className="sr-only">Email</dt><dd>{about.email} <span className="text-xs text-[#8793a3]">(example)</span></dd></div></div>
                  <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[#729AC1]" aria-hidden /><div><dt className="sr-only">Location</dt><dd>{about.location} <span className="text-xs text-[#8793a3]">(example)</span></dd></div></div>
                </dl>
                <button type="button" onClick={openResume} className={`${btn} mt-8`} data-testid="button-view-resume">View Resume</button>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-[#c3ccd7]">
                {about.bio.map((b, i) => <p key={i}>{b}</p>)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" aria-labelledby="h-skills" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <SectionHead eyebrow="Skills" title="What I Bring" id="h-skills" />
            <div className="grid gap-5 md:grid-cols-3">
              {skills.map((s, i) => {
                const Icon = icons[s.icon];
                return (
                  <Reveal key={s.title}>
                    <div style={{ transitionDelay: `${i * 60}ms` }} data-testid={`card-skill-${i}`}
                      className="h-full rounded-2xl border border-[#2f3a49] bg-[#1e252e] p-7 transition hover:-translate-y-1 hover:border-[#729AC1]/60">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#001D3D] text-[#729AC1]"><Icon className="h-6 w-6" aria-hidden /></div>
                      <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#aab6c4]">{s.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.tags.map((t) => <li key={t} className="rounded-full bg-[#729AC1]/15 px-3 py-1 text-[13px] text-[#b6cde4]">{t}</li>)}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" aria-labelledby="h-edu" className="border-t border-[#2f3a49]/70 bg-[#1e252e]/70 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <SectionHead eyebrow="Education" title="Education" id="h-edu" />
            <div className="grid gap-5 md:grid-cols-2">
              {education.map((e, i) => (
                <Reveal key={e.school}>
                  <div data-testid={`card-education-${i}`} className="h-full rounded-2xl border border-[#2f3a49] bg-[#222831] p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-[#729AC1]">{e.period}</span>
                      {e.isExample && <ExampleTag />}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{e.school}</h3>
                    <p className="mt-1 text-[#c3ccd7]">{e.degree}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#aab6c4]">{e.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" aria-labelledby="h-proj" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <SectionHead eyebrow="Projects" title="Featured Projects" id="h-proj" />
            <p className="-mt-6 mb-10 max-w-xl text-[#aab6c4]">All projects below are examples showing the layout. Replace them with real work.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((p) => <Reveal key={p.id}><ProjectCard p={p} onOpen={setProject} /></Reveal>)}
            </div>
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setAllOpen(true)} className={btn} data-testid="button-view-all">View All</button>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" aria-labelledby="h-exp" className="border-t border-[#2f3a49]/70 bg-[#1e252e]/70 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <SectionHead eyebrow="Experience" title="Professional Journey" id="h-exp" />
            <ol className="relative space-y-10 border-l border-[#3a4656] pl-8">
              {experience.map((x, i) => (
                <li key={i} data-testid={`item-experience-${i}`}>
                  <Reveal>
                    <span aria-hidden className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-[#729AC1] bg-[#222831]" />
                    <div className="flex flex-wrap items-center gap-3"><span className="text-sm text-[#729AC1]">{x.period}</span><ExampleTag /></div>
                    <h3 className="mt-2 text-xl font-semibold">{x.title}</h3>
                    <p className="text-[#c3ccd7]">{x.org}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-[#aab6c4]">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="h-contact" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <SectionHead eyebrow="Contact" title="Get In Touch" id="h-contact" />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
              <Reveal>
                <p className="mb-8 max-w-md text-lg text-[#aab6c4]">Open to finance internship conversations. Contact details below are placeholders until real ones are added.</p>
                <ul className="space-y-6">
                  <li className="flex gap-4"><Mail className="mt-1 h-5 w-5 text-[#729AC1]" aria-hidden /><div><p className="text-sm text-[#8793a3]">Email (example)</p><p>{contact.email}</p></div></li>
                  <li className="flex gap-4"><Link2 className="mt-1 h-5 w-5 text-[#729AC1]" aria-hidden /><div><p className="text-sm text-[#8793a3]">Connect</p><button type="button" onClick={openLinkedIn} className="text-left underline decoration-[#729AC1]/60 underline-offset-4 hover:text-[#a9c3de]">{contact.connect}</button></div></li>
                  <li className="flex gap-4"><MapPin className="mt-1 h-5 w-5 text-[#729AC1]" aria-hidden /><div><p className="text-sm text-[#8793a3]">Location (example)</p><p>{contact.location}</p></div></li>
                </ul>
              </Reveal>
              <Reveal><ContactForm /></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2f3a49] bg-[#001D3D] px-6 py-8 text-center text-sm text-white/60">
        {new Date().getFullYear()} {profile.name}. Sample content is marked as example.
      </footer>

      <Modal open={!!project} onOpenChange={(o) => !o && setProject(null)} title={project?.title ?? ""} description={project ? `${project.category}. Sample project overview.` : ""}>
        {project && (
          <div className="mt-6">
            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-[#2f3a49]"><ProjectArt kind={project.art} /></div>
            <p className="mt-5 rounded-lg bg-[#729AC1]/10 px-4 py-2 text-sm text-[#b6cde4]">Example content: not a claimed achievement.</p>
            <p className="mt-4 leading-relaxed text-[#c3ccd7]">{project.overview}</p>
            <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#729AC1]">Role</h4>
            <p className="mt-1">{project.role}</p>
            <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#729AC1]">Tools</h4>
            <ul className="mt-2 flex flex-wrap gap-2">{project.tools.map((t) => <li key={t} className="rounded-full bg-[#729AC1]/15 px-3 py-1 text-[13px]">{t}</li>)}</ul>
            <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#729AC1]">Highlights</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#c3ccd7]">{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        )}
      </Modal>

      <Modal open={allOpen} onOpenChange={setAllOpen} title="All Projects" description="Every project here is an example placeholder.">
        <ul className="mt-6 space-y-3">
          {projects.map((p) => (
            <li key={p.id}>
              <button type="button" data-testid={`button-all-${p.id}`} onClick={() => { setAllOpen(false); setProject(p); }}
                className="flex w-full items-center gap-4 rounded-xl border border-[#2f3a49] bg-[#1e252e] p-3 text-left transition hover:border-[#729AC1]/60">
                <div className="h-16 w-28 shrink-0 overflow-hidden rounded-lg"><ProjectArt kind={p.art} /></div>
                <div className="min-w-0 flex-1"><p className="font-semibold">{p.title}</p><p className="truncate text-sm text-[#aab6c4]">{p.category} - Example</p></div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#729AC1]" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal open={resumeOpen} onOpenChange={setResumeOpen} title="Resume not added yet" description="No resume file has been uploaded to this portfolio, so there is nothing to download. Once a PDF is added, this button will open it." />
      <Modal open={liOpen} onOpenChange={setLiOpen} title="LinkedIn not configured" description="A LinkedIn profile URL has not been added to this portfolio yet. Once a real link is supplied, this icon will open it in a new tab." />
    </div>
  );
}
