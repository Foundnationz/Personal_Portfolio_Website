import "./_group.css";
import "./Editorial.css";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDownRight, ArrowUpRight, BookOpen, Menu, X } from "lucide-react";
import {
  about, contact, education, experience, featuredProjectIds, navItems, profile, projects, skills,
  type Project,
} from "./_data";
import { ProjectArt } from "./_ProjectArt";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`ed-reveal ${className}`}>{children}</div>;
}

function Example() { return <span className="ed-example">Example</span>; }

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!project} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="ed-modal-overlay" />
        <Dialog.Content className="ed-modal">
          <Dialog.Close className="ed-modal-close" aria-label="Close project dialog"><X size={18} /></Dialog.Close>
          <Dialog.Title className="ed-kicker">{project?.category}</Dialog.Title>
          <Dialog.Description className="sr-only">Example project overview and details.</Dialog.Description>
          {project && <>
            <h2>{project.title}</h2>
            <div className="ed-art"><ProjectArt kind={project.art} /></div>
            <p className="ed-example">Example content — not a claimed achievement.</p>
            <p>{project.overview}</p>
            <h4>Role</h4><p>{project.role}</p>
            <h4>Tools</h4><div className="ed-modal-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            <h4>Highlights</h4><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type Fields = { first: string; last: string; email: string; subject: string; message: string };
const blank: Fields = { first: "", last: "", email: "", subject: "", message: "" };
function ContactForm() {
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const validate = (v: Fields) => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!v.first.trim()) e.first = "Add your first name.";
    if (!v.last.trim()) e.last = "Add your last name.";
    if (!v.email.trim()) e.email = "Add your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (!v.subject.trim()) e.subject = "Add a subject.";
    if (v.message.trim().length < 10) e.message = "Write at least 10 characters.";
    return e;
  };
  const update = (key: keyof Fields, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setSubmitted(true);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) document.getElementById(`editorial-${firstError}`)?.focus();
  };
  const field = (key: keyof Fields, label: string, type = "text", full = false) => (
    <div className={`ed-field${full ? " full" : ""}`} key={key}>
      <label htmlFor={`editorial-${key}`}>{label}</label>
      <input id={`editorial-${key}`} type={type} value={values[key]} onChange={(event) => update(key, event.target.value)}
        aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `editorial-error-${key}` : undefined} />
      {errors[key] && <p className="ed-error" id={`editorial-error-${key}`}>{errors[key]}</p>}
    </div>
  );
  const valid = submitted && Object.keys(errors).length === 0;
  return <form className="ed-form" onSubmit={submit} noValidate data-testid="form-contact">
    {field("first", "First name")}
    {field("last", "Last name")}
    {field("email", "Email address", "email", true)}
    {field("subject", "Subject", "text", true)}
    <div className="ed-field full">
      <label htmlFor="editorial-message">Message</label>
      <textarea id="editorial-message" value={values.message} onChange={(event) => update("message", event.target.value)}
        aria-invalid={!!errors.message} aria-describedby={errors.message ? "editorial-error-message" : undefined} />
      {errors.message && <p className="ed-error" id="editorial-error-message">{errors.message}</p>}
    </div>
    <div className="ed-form-foot">
      <button className="ed-button" type="submit" data-testid="button-submit-contact">Preview message <ArrowUpRight size={15} /></button>
      <p className="ed-form-note">Preview only. This form is not connected to an email service; nothing is sent.</p>
      {valid && <p role="status" aria-live="polite" className="ed-success">Your details look valid, but this message was not sent. No backend or email service is configured. Copy your message and email {contact.email} directly once a real address is added.</p>}
    </div>
  </form>;
}

export function Editorial() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [linkedinOpen, setLinkedinOpen] = useState(false);
  const featured = projects.filter((item) => featuredProjectIds.includes(item.id));

  useEffect(() => {
    const targets = navItems.map((item) => document.getElementById(item.id)).filter((item): item is HTMLElement => !!item);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -58% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setActive(id);
  };
  const openResume = () => profile.resumeUrl ? window.open(profile.resumeUrl, "_blank", "noopener,noreferrer") : setResumeOpen(true);
  const openLinkedIn = () => profile.linkedinUrl ? window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer") : setLinkedinOpen(true);

  return <div className="editorial">
    <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#315b45] focus:p-3 focus:text-white" href="#about">Skip to content</a>
    <header className="ed-nav">
      <nav className="ed-wrap ed-nav-inner" aria-label="Primary">
        <button className="ed-brand" onClick={() => go("home")} aria-label={`${profile.name}, back to top`} data-testid="link-logo">
          <span className="ed-brand-mark">s</span><span className="ed-brand-name">Shawn Stephen Abok</span>
        </button>
        <ul className="ed-navlinks">
          {navItems.map((item) => <li key={item.id}><button onClick={() => go(item.id)} aria-current={active === item.id ? "true" : undefined} data-testid={`link-nav-${item.id}`}>{item.label}</button></li>)}
        </ul>
        <button className="ed-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="editorial-mobile-menu" data-testid="button-menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      {menuOpen && <div className="ed-mobile-links" id="editorial-mobile-menu">{navItems.map((item) => <button key={item.id} onClick={() => go(item.id)} aria-current={active === item.id ? "true" : undefined}>{item.label}</button>)}</div>}
    </header>

    <main>
      <section className="ed-wrap ed-hero" id="home" aria-label="Home">
        <div className="ed-hero-copy">
          <div className="ed-issue"><span className="ed-issue-line" /><span className="ed-kicker">A student, in practice · Kuala Lumpur</span></div>
          <h1 className="ed-serif">Hi, I’m Shawn.<br />I’m learning to make<br /><em>finance work better.</em></h1>
          <p className="ed-lede">{profile.role} at {profile.university}. {profile.intro}</p>
          <div className="ed-hero-actions">
            <button className="ed-button" onClick={() => go("projects")} data-testid="button-about-me">Explore my work <ArrowDownRight size={16} /></button>
            <button className="ed-text-link" onClick={openLinkedIn} data-testid="button-linkedin">LinkedIn <ArrowUpRight size={14} /></button>
          </div>
        </div>
        <div className="ed-photo-stage">
          <span className="ed-photo-index">01 / introduction</span>
          <div className="ed-photo-frame"><img src={profile.portrait} alt="Portrait of Shawn Stephen Abok" data-testid="img-portrait" /></div>
          <span className="ed-photo-caption">Financial technology · UCSI University</span>
        </div>
      </section>

      <div className="ed-intro-strip">
        <div className="ed-wrap ed-intro-grid">
          <div className="ed-intro-cell"><small>Currently</small><strong>Final year, UCSI University</strong></div>
          <div className="ed-intro-cell"><small>Looking toward</small><strong>Finance internship conversations</strong></div>
          <div className="ed-intro-cell"><small>Approach</small><strong>Curious, careful, collaborative</strong></div>
        </div>
      </div>

      <section className="ed-section" id="about" aria-labelledby="ed-about-heading">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-section-label"><span>01</span><p className="ed-kicker">A little context</p></div>
            <div><h2 id="ed-about-heading">Finance and technology, with room to keep asking why.</h2></div>
          </div>
          <Reveal className="ed-about-grid">
            <div className="ed-about-meta">
              <p><strong>{profile.name}</strong></p><p>{profile.role}</p>
              <p>{about.location} <Example /></p>
              <p>{about.email} <Example /></p>
              <button className="ed-text-link" onClick={openResume} data-testid="button-view-resume">View resume <ArrowUpRight size={14} /></button>
            </div>
            <div className="ed-about-text">{about.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          </Reveal>
        </div>
      </section>

      <section className="ed-section tint" id="skills" aria-labelledby="ed-skills-heading">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-section-label"><span>02</span><p className="ed-kicker">Working notes</p></div>
            <div><h2 id="ed-skills-heading">Foundations I’m building on.</h2><p>These are example skill labels, intended to be replaced with what Shawn can confidently discuss.</p></div>
          </div>
          <div className="ed-skill-list">
            {skills.map((skill, index) => <Reveal key={skill.title}>
              <article className="ed-skill-row" data-testid={`card-skill-${index}`}>
                <span className="ed-skill-no">0{index + 1}</span>
                <div><h3>{skill.title}</h3><p>{skill.description}</p></div>
                <div className="ed-tags">{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="ed-section" id="education" aria-labelledby="ed-education-heading">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-section-label"><span>03</span><p className="ed-kicker">The foundation</p></div>
            <div><h2 id="ed-education-heading">Learning with a foot in both worlds.</h2></div>
          </div>
          <div className="ed-education">
            {education.map((item, index) => <Reveal key={item.school}>
              <article className="ed-edu-item" data-testid={`card-education-${index}`}>
                <div className="ed-meta"><span>{item.period}</span>{item.isExample && <Example />}</div>
                <h3>{item.school}</h3><p>{item.degree}</p><p>{item.note}</p>
              </article>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="ed-section tint" id="projects" aria-labelledby="ed-projects-heading">
        <div className="ed-wrap">
          <div className="ed-section-head">
            <div className="ed-section-label"><span>04</span><p className="ed-kicker">Selected studies</p></div>
            <div><h2 id="ed-projects-heading">A few ways of thinking through the work.</h2><p>Each project shown here is an example placeholder, not a claimed achievement. Open a study to see the proposed case-study structure.</p></div>
          </div>
          {featured[0] && <Reveal>
            <button className="ed-project-feature" onClick={() => setProject(featured[0])} data-testid={`card-project-${featured[0].id}`}>
              <div className="ed-art ed-feature-art"><ProjectArt kind={featured[0].art} /></div>
              <div className="ed-project-copy">
                <span className="ed-kicker">{featured[0].category} · <Example /></span>
                <h3>{featured[0].title}</h3><p>{featured[0].summary}</p>
                <span className="ed-open-label">Read the case note <ArrowUpRight size={15} /></span>
              </div>
            </button>
          </Reveal>}
          <div className="ed-project-secondary">
            {featured.slice(1).map((item) => <Reveal key={item.id}>
              <button className="ed-project-card" onClick={() => setProject(item)} data-testid={`card-project-${item.id}`}>
                <div className="ed-art"><ProjectArt kind={item.art} /></div>
                <div className="ed-project-copy"><span className="ed-kicker">{item.category} · <Example /></span><h3>{item.title}</h3><p>{item.summary}</p><span className="ed-open-label">Read the case note <ArrowUpRight size={15} /></span></div>
              </button>
            </Reveal>)}
          </div>
          <div style={{ paddingTop: 24 }}>
            <button className="ed-text-link" onClick={() => setAllOpen(true)} data-testid="button-view-all">Browse all example projects <ArrowUpRight size={14} /></button>
          </div>
        </div>
      </section>

      <section className="ed-section" id="experience" aria-labelledby="ed-experience-heading">
        <div className="ed-wrap ed-journey">
          <div><div className="ed-section-label"><span>05</span><p className="ed-kicker">Along the way</p></div><h2 id="ed-experience-heading" className="ed-serif" style={{ fontSize: 42, fontWeight: 400, lineHeight: 1.05 }}>Experience,<br />as it grows.</h2><p className="ed-journey-note">Illustrative entries only. No employment or society roles are being claimed here.</p></div>
          <div className="ed-timeline">
            {experience.map((item, index) => <Reveal key={`${item.title}-${index}`}>
              <article className="ed-experience-row" data-testid={`item-experience-${index}`}>
                <div className="ed-meta"><span>{item.period}</span><Example /></div>
                <div><h3>{item.title}</h3><p>{item.org}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
              </article>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="ed-section tint" id="contact" aria-labelledby="ed-contact-heading">
        <div className="ed-wrap ed-contact">
          <div>
            <p className="ed-kicker">06 · An open door</p>
            <h2 id="ed-contact-heading">Let’s start a conversation.</h2>
            <p className="ed-contact-copy">Open to finance internship conversations. Contact details here are placeholders until real ones are added.</p>
            <div className="ed-contact-list">
              <div className="ed-contact-line"><small>Email · example</small><strong>{contact.email}</strong></div>
              <div className="ed-contact-line"><small>Connect</small><button onClick={openLinkedIn}>{contact.connect}</button></div>
              <div className="ed-contact-line"><small>Location · example</small><strong>{contact.location}</strong></div>
            </div>
          </div>
          <div><p className="ed-kicker" style={{ marginBottom: 15 }}>Send a note</p><ContactForm /></div>
        </div>
      </section>
    </main>
    <footer className="ed-footer"><div className="ed-wrap ed-footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><span>Sample content is marked as example. No form messages are sent.</span></div></footer>

    <ProjectDialog project={project} onClose={() => setProject(null)} />
    <Dialog.Root open={allOpen} onOpenChange={setAllOpen}>
      <Dialog.Portal><Dialog.Overlay className="ed-modal-overlay" /><Dialog.Content className="ed-modal">
        <Dialog.Close className="ed-modal-close" aria-label="Close all projects"><X size={18} /></Dialog.Close>
        <Dialog.Title className="ed-kicker">The index</Dialog.Title><Dialog.Description className="sr-only">Browse all example project placeholders.</Dialog.Description>
        <h2>All project notes</h2><p>Every project below is an example placeholder.</p>
        <div className="ed-all-list">{projects.map((item) => <button key={item.id} data-testid={`button-all-${item.id}`} onClick={() => { setAllOpen(false); setProject(item); }}>
          <div className="ed-art"><ProjectArt kind={item.art} /></div><span><strong>{item.title}</strong><small>{item.category} · Example</small></span><ArrowUpRight size={17} />
        </button>)}</div>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
    <Dialog.Root open={resumeOpen} onOpenChange={setResumeOpen}><Dialog.Portal><Dialog.Overlay className="ed-modal-overlay" /><Dialog.Content className="ed-modal">
      <Dialog.Close className="ed-modal-close" aria-label="Close resume notice"><X size={18} /></Dialog.Close><Dialog.Title className="ed-kicker">Resume</Dialog.Title>
      <h2>Not added yet.</h2><Dialog.Description>No resume file has been uploaded to this portfolio, so there is nothing to download. Once a PDF is added, this button will open it.</Dialog.Description>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={linkedinOpen} onOpenChange={setLinkedinOpen}><Dialog.Portal><Dialog.Overlay className="ed-modal-overlay" /><Dialog.Content className="ed-modal">
      <Dialog.Close className="ed-modal-close" aria-label="Close LinkedIn notice"><X size={18} /></Dialog.Close><Dialog.Title className="ed-kicker">LinkedIn</Dialog.Title>
      <h2>Profile link not configured.</h2><Dialog.Description>A LinkedIn profile URL has not been added to this portfolio yet. Once a real link is supplied, this control will open it in a new tab.</Dialog.Description>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}
