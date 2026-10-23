import "./_group.css";
import "./_fintech.css";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Code2, Menu, Users, X, MapPin, Mail, Link2, FileText, ShieldCheck } from "lucide-react";
import { about, contact, education, experience, featuredProjectIds, navItems, profile, projects, skills, type IconKey, type Project } from "./_data";
import { ProjectArt } from "./_ProjectArt";

const icons: Record<IconKey, typeof Code2> = { ledger: BookOpen, code: Code2, people: Users };
type Fields = { first: string; last: string; email: string; subject: string; message: string };
const emptyForm: Fields = { first: "", last: "", email: "", subject: "", message: "" };

function Modal({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; description: string; children?: ReactNode }) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal>
    <Dialog.Overlay className="ft-overlay" />
    <Dialog.Content className="ft-dialog">
      <Dialog.Title className="ft-dialog-title">{title}</Dialog.Title>
      <Dialog.Description className="ft-dialog-desc">{description}</Dialog.Description>
      {children}
      <Dialog.Close aria-label="Close dialog" className="ft-close"><X size={19} /></Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal></Dialog.Root>;
}

function Example({ light = false }: { light?: boolean }) {
  return <span className={`ft-example${light ? " ft-example-light" : ""}`}>Example</span>;
}

function LinkedInGlyph() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor"><path d="M6.94 8.98H3.56V20h3.38V8.98ZM5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 13.6c0-3.03-1.62-4.8-3.96-4.8-1.2 0-2.1.55-2.6 1.3V8.98h-3.37V20h3.37v-6c0-1.4.6-2.4 1.9-2.4 1.2 0 1.8.9 1.8 2.4V20h3.37l-.01-6.4Z" /></svg>;
}

function ProjectRow({ p, index, onOpen }: { p: Project; index: number; onOpen: (p: Project) => void }) {
  return <article className={`ft-project-row ${index === 0 ? "ft-project-lead" : ""}`} data-testid={`card-project-${p.id}`}>
    <div className="ft-project-art"><ProjectArt kind={p.art} /><span className="ft-art-caption">FIG. 0{index + 1} <i>— illustrative preview</i></span></div>
    <div className="ft-project-copy">
      <div className="ft-project-meta"><span>{p.category}</span><Example light /></div>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <button type="button" onClick={() => onOpen(p)} className="ft-text-link" data-testid={`button-view-project-${p.id}`}>View project <ArrowUpRight size={16} /></button>
    </div>
  </article>;
}

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
  const set = (key: keyof Fields, value: string) => {
    const next = { ...v, [key]: value }; setV(next);
    if (checked) setErrors(validate(next));
  };
  const submit = (ev: FormEvent) => {
    ev.preventDefault(); const next = validate(v); setErrors(next); setChecked(true);
    const first = Object.keys(next)[0] as keyof Fields | undefined;
    if (first) document.getElementById(`ft-${first}`)?.focus();
  };
  const field = (key: keyof Fields, label: string, type = "text") => <div className={key === "first" || key === "last" ? "" : "ft-wide"}>
    <label htmlFor={`ft-${key}`}>{label}</label>
    <input id={`ft-${key}`} type={type} value={v[key]} onChange={e => set(key, e.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `ft-err-${key}` : undefined} />
    {errors[key] && <span className="ft-error" id={`ft-err-${key}`}>{errors[key]}</span>}
  </div>;
  const valid = checked && Object.keys(errors).length === 0;
  return <form className="ft-form" onSubmit={submit} noValidate data-testid="form-contact">
    {field("first", "First name")}{field("last", "Last name")}
    {field("email", "Email", "email")}{field("subject", "Subject")}
    <div className="ft-wide"><label htmlFor="ft-message">Message</label><textarea id="ft-message" rows={4} value={v.message} onChange={e => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "ft-err-message" : undefined} />{errors.message && <span className="ft-error" id="ft-err-message">{errors.message}</span>}</div>
    <div className="ft-wide"><button className="ft-button" type="submit" data-testid="button-submit-contact">Preview message <ArrowRight size={16} /></button>
      <p className="ft-preview-note">Preview only. This form is not connected to email, so nothing is sent.</p>
      {valid && <p className="ft-form-status" role="status" aria-live="polite">Your details look valid, but this message was <strong>not sent</strong>. No email service is configured. Your text remains above to copy. Email {contact.email} directly once a real address is added.</p>}
    </div>
  </form>;
}

export function FinTech() {
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [liOpen, setLiOpen] = useState(false);
  useEffect(() => {
    const els = navItems.map(n => document.getElementById(n.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-34% 0px -56% 0px" });
    els.forEach(e => io.observe(e)); return () => io.disconnect();
  }, []);
  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setActive(id);
  };
  const openLinkedIn = () => profile.linkedinUrl ? window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer") : setLiOpen(true);
  const openResume = () => profile.resumeUrl ? window.open(profile.resumeUrl, "_blank", "noopener,noreferrer") : setResumeOpen(true);
  const featured = projects.filter(p => featuredProjectIds.includes(p.id));

  return <div className="ft-shell">
    <a href="#about" onClick={e => { e.preventDefault(); go("about"); }} className="ft-skip">Skip to content</a>
    <header className="ft-header"><nav className="ft-nav" aria-label="Primary">
      <button type="button" className="ft-nameplate" onClick={() => go("home")} aria-label={`${profile.name}, back to top`} data-testid="link-logo">
        <span className="ft-monogram">SA<span>.</span></span><span className="ft-nameplate-name">Shawn Stephen Abok<small>FINANCIAL TECHNOLOGY</small></span>
      </button>
      <ul className="ft-nav-links">{navItems.map(n => <li key={n.id}><button type="button" onClick={() => go(n.id)} aria-current={active === n.id ? "true" : undefined} data-testid={`link-nav-${n.id}`}>{n.label}</button></li>)}</ul>
      <button type="button" className="ft-menu-toggle" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="ft-mobile-menu" onClick={() => setMenu(m => !m)} data-testid="button-menu">{menu ? <X /> : <Menu />}</button>
    </nav>
    {menu && <div className="ft-mobile-menu" id="ft-mobile-menu"><ul>{navItems.map(n => <li key={n.id}><button onClick={() => go(n.id)} aria-current={active === n.id ? "true" : undefined}>{n.label}<ArrowUpRight size={15} /></button></li>)}</ul></div>}
    </header>
    <main>
      <section className="ft-hero" id="home" aria-label="Introduction">
        <div className="ft-hero-inner">
          <div className="ft-hero-copy">
            <p className="ft-kicker"><span className="ft-status-dot" /> FINAL-YEAR STUDENT <span className="ft-kicker-rule" /> KUALA LUMPUR, MY</p>
            <h1>Finance,<br /><em>made legible.</em></h1>
            <p className="ft-intro">Hi, I’m <strong>Shawn Stephen Abok</strong> — a Financial Technology student learning to connect careful financial thinking with useful technology.</p>
            <div className="ft-hero-actions"><button type="button" className="ft-button" onClick={() => go("projects")} data-testid="button-about-me">Explore my work <ArrowDownRight size={17} /></button>
              <button type="button" className="ft-linkedin" onClick={openLinkedIn} aria-label="LinkedIn profile" data-testid="button-linkedin"><LinkedInGlyph /> LinkedIn</button>
            </div>
            <div className="ft-hero-foot"><span>01 / A student portfolio</span><span>Scroll to explore <ArrowDownRight size={14} /></span></div>
          </div>
          <div className="ft-portrait-column">
            <div className="ft-image-frame"><img src={profile.portrait} alt="Portrait of Shawn Stephen Abok" data-testid="img-portrait" /><span className="ft-photo-index">PROFILE / 2025</span></div>
            <div className="ft-photo-caption"><span>SHAWN STEPHEN ABOK</span><span>UCSI UNIVERSITY</span></div>
            <div className="ft-hero-stamp" aria-hidden="true"><span>FIN</span><span>×</span><span>TECH</span></div>
          </div>
        </div>
      </section>

      <section className="ft-work" id="projects" aria-labelledby="ft-work-title">
        <div className="ft-section-top"><div><p className="ft-eyebrow">Selected work <span>02 — 05</span></p><h2 id="ft-work-title">Evidence over<br className="ft-mobile-break" /> adjectives.</h2></div><p className="ft-work-note">A few examples of the questions and workflows I’m learning to work through. All project descriptions are placeholders, not claimed achievements.</p></div>
        <div className="ft-project-list">{featured.map((p, i) => <ProjectRow key={p.id} p={p} index={i} onOpen={setProject} />)}</div>
        <div className="ft-work-bottom"><span>Projects shown as examples · no performance claims</span><button type="button" onClick={() => setAllOpen(true)} className="ft-all-projects" data-testid="button-view-all">Browse all projects <ArrowRight size={16} /></button></div>
      </section>

      <section className="ft-about section-dark" id="about" aria-labelledby="ft-about-title">
        <div className="ft-section-top ft-dark-top"><div><p className="ft-eyebrow">A little context <span>06</span></p><h2 id="ft-about-title">Where I’m<br />coming from.</h2></div>
          <div className="ft-about-body"><h3>{profile.name}</h3><p className="ft-degree">{profile.role}</p>{about.bio.map((b, i) => <p key={i}>{b}</p>)}
            <div className="ft-about-facts"><span><MapPin size={16} />{about.location} <small>(example)</small></span><span><Mail size={16} />{about.email} <small>(example)</small></span></div>
            <button type="button" className="ft-outline-button" onClick={openResume} data-testid="button-view-resume"><FileText size={16} /> View resume <ArrowUpRight size={15} /></button>
          </div>
        </div>
      </section>

      <section className="ft-skills" id="skills" aria-labelledby="ft-skills-title">
        <div className="ft-section-top"><div><p className="ft-eyebrow">Working toolkit <span>03</span></p><h2 id="ft-skills-title">Learning to<br />join the dots.</h2></div><p className="ft-work-note">A snapshot of areas represented in this portfolio. Skill labels are examples and should be confirmed or replaced.</p></div>
        <div className="ft-skill-list">{skills.map((s, i) => { const Icon = icons[s.icon]; return <article className="ft-skill" key={s.title} data-testid={`card-skill-${i}`}>
          <span className="ft-skill-no">0{i + 1}</span><div className="ft-skill-heading"><Icon size={20} /><h3>{s.title}</h3></div><p>{s.description}</p><div className="ft-tags">{s.tags.map(t => <span key={t}>{t}</span>)}</div><Example light />
        </article>; })}</div>
      </section>

      <section className="ft-education section-dark" id="education" aria-labelledby="ft-education-title">
        <div className="ft-education-heading"><p className="ft-eyebrow">Formal study <span>04</span></p><h2 id="ft-education-title">Education</h2><p>Grounded in finance. Curious about the systems around it.</p></div>
        <div className="ft-education-list">{education.map((e, i) => <article className="ft-education-item" key={e.school} data-testid={`card-education-${i}`}>
          <span className="ft-edu-period">{e.period}</span><div><h3>{e.school} {e.isExample && <Example />}</h3><p className="ft-edu-degree">{e.degree}</p><p>{e.note}</p></div><span className="ft-edu-index">0{i + 1}</span>
        </article>)}</div>
      </section>

      <section className="ft-experience" id="experience" aria-labelledby="ft-experience-title">
        <div className="ft-section-top"><div><p className="ft-eyebrow">Experience <span>05</span></p><h2 id="ft-experience-title">The next chapter<br />is still unwritten.</h2></div><p className="ft-work-note">Illustrative entries only. No employment history is being claimed here; replace these placeholders with real experience.</p></div>
        <div className="ft-timeline">{experience.map((x, i) => <article className="ft-timeline-item" key={i} data-testid={`item-experience-${i}`}>
          <div className="ft-timeline-mark"><span>0{i + 1}</span></div><div className="ft-timeline-content"><div className="ft-project-meta"><span>{x.period}</span><Example light /></div><h3>{x.title}</h3><p className="ft-org">{x.org}</p><ul>{x.points.map(point => <li key={point}>{point}</li>)}</ul></div>
        </article>)}</div>
      </section>

      <section className="ft-contact section-dark" id="contact" aria-labelledby="ft-contact-title">
        <div className="ft-contact-intro"><p className="ft-eyebrow">Start a conversation <span>07</span></p><h2 id="ft-contact-title">Let’s talk<br />about the work.</h2><p>Open to finance internship conversations. Contact details below are placeholders until real ones are added.</p>
          <ul className="ft-contact-details"><li><Mail size={17} /><span><small>EMAIL · EXAMPLE</small>{contact.email}</span></li><li><Link2 size={17} /><span><small>CONNECT</small><button onClick={openLinkedIn}>{contact.connect}</button></span></li><li><MapPin size={17} /><span><small>LOCATION · EXAMPLE</small>{contact.location}</span></li></ul>
          <div className="ft-honesty"><ShieldCheck size={17} /><span>Details are clearly marked where information is a placeholder.</span></div>
        </div><ContactForm />
      </section>
    </main>
    <footer className="ft-footer"><span>SA<span className="ft-blue-dot">.</span></span><span>{new Date().getFullYear()} · {profile.name}</span><span>Student portfolio · Example content labelled</span><button onClick={() => go("home")} aria-label="Back to top"><ArrowUpRight size={17} /></button></footer>

    <Modal open={!!project} onOpenChange={o => !o && setProject(null)} title={project?.title ?? ""} description={project ? `${project.category} · Example project overview` : ""}>
      {project && <div className="ft-modal-body"><div className="ft-modal-art"><ProjectArt kind={project.art} /></div><p className="ft-modal-caveat">Example content — not a claimed achievement.</p><p>{project.overview}</p><h4>Role</h4><p>{project.role}</p><h4>Tools</h4><div className="ft-tags">{project.tools.map(t => <span key={t}>{t}</span>)}</div><h4>Highlights</h4><ul>{project.highlights.map(h => <li key={h}>{h}</li>)}</ul></div>}
    </Modal>
    <Modal open={allOpen} onOpenChange={setAllOpen} title="All project examples" description="Every project shown here is a placeholder. Replace with work you can discuss with a recruiter.">
      <ul className="ft-all-list">{projects.map(p => <li key={p.id}><button type="button" data-testid={`button-all-${p.id}`} onClick={() => { setAllOpen(false); setProject(p); }}><span className="ft-all-art"><ProjectArt kind={p.art} /></span><span><strong>{p.title}</strong><small>{p.category} · Example</small></span><ArrowUpRight size={17} /></button></li>)}</ul>
    </Modal>
    <Modal open={resumeOpen} onOpenChange={setResumeOpen} title="Resume not added yet" description="No resume file has been uploaded to this portfolio, so there is nothing to download. Once a PDF is added, this button will open it." />
    <Modal open={liOpen} onOpenChange={setLiOpen} title="LinkedIn not configured" description="A LinkedIn profile URL has not been added to this portfolio yet. Once a real link is supplied, this control will open it in a new tab." />
  </div>;
}
