import "./_group.css";
import "./finance.css";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Code2,
  FileText, Link2, Mail, MapPin, Menu, Users, X,
} from "lucide-react";
import {
  about, contact, education, experience, featuredProjectIds, navItems, profile, projects, skills,
  type IconKey, type Project,
} from "./_data";
import { ProjectArt } from "./_ProjectArt";

const iconMap: Record<IconKey, typeof BookOpen> = { ledger: BookOpen, code: Code2, people: Users };

function Example() { return <span className="fin-example">Example</span>; }

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`fin-reveal ${className}`}>{children}</div>;
}

function SectionHead({ eyebrow, title, id, note }: { eyebrow: string; title: string; id: string; note?: string }) {
  return <div className="fin-sectionhead"><div><p className="fin-overline">{eyebrow}</p><h2 id={id}>{title}</h2>{note && <p className="fin-subcopy">{note}</p>}</div></div>;
}

function Modal({ open, onOpenChange, title, description, children }: {
  open: boolean; onOpenChange: (open: boolean) => void; title: string; description: string; children?: ReactNode;
}) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fin-dialog-overlay" />
      <Dialog.Content className="fin-dialog">
        <Dialog.Title><h2>{title}</h2></Dialog.Title>
        <Dialog.Description className="fin-dialog-desc">{description}</Dialog.Description>
        {children}
        <Dialog.Close aria-label="Close dialog" className="fin-dialog-close"><X size={19} /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return <article className="fin-project">
    <div className="fin-project-art"><ProjectArt kind={project.art} /></div>
    <div className="fin-project-body">
      <div className="fin-tagline"><span className="fin-category">{project.category}</span><Example /></div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <button type="button" onClick={() => onOpen(project)}>Review project <ArrowRight size={14} /></button>
    </div>
  </article>;
}

type Fields = { first: string; last: string; email: string; subject: string; message: string };
const initialFields: Fields = { first: "", last: "", email: "", subject: "", message: "" };
function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const [validPreview, setValidPreview] = useState(false);
  const validate = (v: Fields) => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!v.first.trim()) next.first = "Please enter your first name.";
    if (!v.last.trim()) next.last = "Please enter your last name.";
    if (!v.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) next.email = "Please enter a valid email.";
    if (!v.subject.trim()) next.subject = "Please enter a subject.";
    if (v.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    return next;
  };
  const change = (key: keyof Fields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    setValidPreview(false);
    if (attempted) setErrors(validate(next));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    const next = validate(fields);
    setErrors(next);
    setValidPreview(Object.keys(next).length === 0);
    if (Object.keys(next).length) document.getElementById(`finance-${Object.keys(next)[0]}`)?.focus();
  };
  const field = (key: keyof Fields, label: string, type = "text", wide = false) => <div className={`fin-field${wide ? " wide" : ""}`} key={key}>
    <label htmlFor={`finance-${key}`}>{label}</label>
    <input id={`finance-${key}`} type={type} value={fields[key]} onChange={(e) => change(key, e.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `finance-error-${key}` : undefined} />
    {errors[key] && <span id={`finance-error-${key}`} className="fin-error">{errors[key]}</span>}
  </div>;
  return <form className="fin-form" onSubmit={submit} noValidate>
    {field("first", "First name")}
    {field("last", "Last name")}
    {field("email", "Email address", "email", true)}
    {field("subject", "Subject", "text", true)}
    <div className="fin-field wide">
      <label htmlFor="finance-message">Message</label>
      <textarea id="finance-message" value={fields.message} onChange={(e) => change("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "finance-error-message" : undefined} />
      {errors.message && <span id="finance-error-message" className="fin-error">{errors.message}</span>}
    </div>
    <button className="fin-primary" type="submit">Preview message <ArrowUpRight size={15} /></button>
    <p className="fin-form-note">Preview only. This form is not connected to email and does not send or store your message.</p>
    {validPreview && <p className="fin-status" role="status" aria-live="polite">Your details look valid, but nothing was sent. You can copy your message above and contact {contact.email} directly once a real address is added.</p>}
  </form>;
}

export function Finance() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [notice, setNotice] = useState<"resume" | "linkedin" | null>(null);
  const featured = projects.filter((p) => featuredProjectIds.includes(p.id));

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(".finance-page .fin-reveal"));
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("fin-in"); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.08 });
    revealNodes.forEach((node) => revealObserver.observe(node));
    const sections = navItems.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-38% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setActive(id);
  };
  const openLinkedIn = () => {
    if (profile.linkedinUrl) window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer");
    else setNotice("linkedin");
  };
  const openResume = () => {
    if (profile.resumeUrl) window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
    else setNotice("resume");
  };

  return <div className="finance-page min-h-[100dvh]">
    <a href="#about" onClick={(e) => { e.preventDefault(); go("about"); }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
    <header className="fin-shell">
      <nav className="fin-nav" aria-label="Primary navigation">
        <button type="button" className="fin-brand" onClick={() => go("home")} aria-label={`${profile.name}, back to top`}>SHAWN <span>ABOK</span></button>
        <div className={`fin-navlinks${menuOpen ? " open" : ""}`}>
          {navItems.map((item) => <button type="button" key={item.id} aria-current={active === item.id ? "true" : undefined} onClick={() => go(item.id)}>{item.label}</button>)}
        </div>
        <button className="fin-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </nav>
    </header>
    <main>
      <section id="home" className="fin-shell fin-hero" aria-label="Introduction">
        <div className="fin-hero-copy">
          <p className="fin-kicker">Candidate profile · Financial technology</p>
          <h1>{profile.greeting}<br /><span>{profile.name}</span></h1>
          <p className="fin-intro">{profile.role} at {profile.university}. {profile.intro}</p>
          <div className="fin-actions">
            <button type="button" className="fin-primary" onClick={() => go("projects")}>Explore selected work <ArrowDown size={15} /></button>
            <button type="button" className="fin-secondary" onClick={openLinkedIn}><Link2 size={15} /> LinkedIn</button>
          </div>
        </div>
        <div className="fin-portrait">
          <img src={profile.portrait} alt="Portrait of Shawn Stephen Abok" />
          <span className="fin-photo-caption">Final-year student</span>
        </div>
        <div className="fin-quick" aria-label="At a glance">
          <div className="fin-quick-item"><span className="fin-quick-label">Current focus</span><span className="fin-quick-value">Finance internship</span></div>
          <div className="fin-quick-item"><span className="fin-quick-label">Programme</span><span className="fin-quick-value">Financial Technology</span></div>
          <div className="fin-quick-item"><span className="fin-quick-label">University</span><span className="fin-quick-value">UCSI University</span></div>
          <div className="fin-quick-item"><span className="fin-quick-label">Based in</span><span className="fin-quick-value">Kuala Lumpur <span className="fin-example">Example</span></span></div>
        </div>
      </section>

      <section id="projects" className="fin-shell fin-section" aria-labelledby="fin-project-heading">
        <Reveal><SectionHead eyebrow="Selected work · 01—02" title="Evidence, not claims." id="fin-project-heading" note="Illustrative project examples. Replace with real coursework or personal work before sharing." /></Reveal>
        <div className="fin-projects">
          {featured.map((project) => <Reveal key={project.id}><ProjectCard project={project} onOpen={setSelected} /></Reveal>)}
        </div>
        <div style={{ marginTop: 17, display: "flex", justifyContent: "flex-end" }}><button className="fin-textlink" type="button" onClick={() => setAllOpen(true)}>Browse all example projects <ArrowRight size={13} /></button></div>
      </section>

      <section id="about" className="fin-section" aria-labelledby="fin-about-heading">
        <div className="fin-shell">
          <Reveal><SectionHead eyebrow="01 / Introduction" title="A little about me." id="fin-about-heading" /></Reveal>
          <div className="fin-about-grid">
            <Reveal>
              <div className="fin-about-aside">
                <h3>{profile.name}</h3><p>{profile.role}</p>
                <div className="fin-meta">
                  <div><Mail size={15} /><span>{about.email} <Example /></span></div>
                  <div><MapPin size={15} /><span>{about.location} <Example /></span></div>
                </div>
                <button className="fin-secondary" style={{ marginTop: 22 }} type="button" onClick={openResume}><FileText size={15} /> View résumé</button>
              </div>
            </Reveal>
            <Reveal><div className="fin-bio">{about.bio.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div></Reveal>
          </div>
        </div>
      </section>

      <section id="skills" className="fin-section" aria-labelledby="fin-skills-heading">
        <div className="fin-shell">
          <Reveal><SectionHead eyebrow="02 / Capabilities" title="Areas of study." id="fin-skills-heading" note="Example skills and topics; confirm these reflect your actual experience." /></Reveal>
          <div className="fin-skill-list">
            {skills.map((skill) => {
              const Icon = iconMap[skill.icon];
              return <Reveal key={skill.title}><div className="fin-skill-row">
                <div><h3><Icon size={15} style={{ verticalAlign: "middle", marginRight: 8, color: "#477f7c" }} />{skill.title}</h3><p>{skill.description}</p></div>
                <ul className="fin-chips">{skill.tags.map((tag) => <li className="fin-chip" key={tag}>{tag}</li>)}</ul>
              </div></Reveal>;
            })}
          </div>
        </div>
      </section>

      <section id="education" className="fin-section" aria-labelledby="fin-education-heading">
        <div className="fin-shell">
          <Reveal><SectionHead eyebrow="03 / Education" title="Academic foundation." id="fin-education-heading" /></Reveal>
          <div className="fin-education">
            {education.map((entry) => <Reveal key={entry.school}><article className="fin-edu-card">
              <span className="fin-period">{entry.period}</span>{entry.isExample && <span style={{ marginLeft: 9 }}><Example /></span>}
              <h3>{entry.school}</h3><p className="fin-degree">{entry.degree}</p><p>{entry.note}</p>
            </article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="experience" className="fin-section" aria-labelledby="fin-experience-heading">
        <div className="fin-shell">
          <Reveal><SectionHead eyebrow="04 / Experience" title="Professional journey." id="fin-experience-heading" note="Example entries only. No employment history is being claimed." /></Reveal>
          <div className="fin-exp-list">
            {experience.map((item, index) => <Reveal key={`${item.title}-${index}`}><article className="fin-exp-item">
              <div className="fin-exp-date">{item.period}</div>
              <div><div style={{ display: "flex", alignItems: "center", gap: 9 }}><BriefcaseBusiness size={15} color="#477f7c" /><h3>{item.title}</h3><Example /></div>
                <p>{item.org}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="contact" className="fin-section" aria-labelledby="fin-contact-heading">
        <div className="fin-shell">
          <Reveal><SectionHead eyebrow="05 / Contact" title="Start a conversation." id="fin-contact-heading" /></Reveal>
          <div className="fin-contact">
            <Reveal><div>
              <p className="fin-subcopy" style={{ fontSize: 14, margin: "0 0 23px" }}>Open to finance internship conversations. Contact details shown here are examples until replaced with real ones.</p>
              <div className="fin-contact-list">
                <div className="fin-contact-row"><Mail size={16} /><span><strong>Email · Example</strong>{contact.email}</span></div>
                <div className="fin-contact-row"><Link2 size={16} /><span><strong>Connect</strong><button className="fin-textlink" type="button" onClick={openLinkedIn}>{contact.connect}</button></span></div>
                <div className="fin-contact-row"><MapPin size={16} /><span><strong>Location · Example</strong>{contact.location}</span></div>
              </div>
            </div></Reveal>
            <Reveal><ContactForm /></Reveal>
          </div>
        </div>
      </section>
    </main>
    <footer className="fin-footer"><div className="fin-shell fin-footer-inner"><span>{new Date().getFullYear()} · {profile.name}</span><span>Sample content is marked as example.</span><button className="fin-textlink" style={{ color: "#b9d6d0" }} onClick={() => go("home")} type="button">Back to top ↑</button></div></footer>

    <Modal open={!!selected} onOpenChange={(open) => !open && setSelected(null)} title={selected?.title ?? ""} description={selected ? `${selected.category} · Example project overview` : ""}>
      {selected && <div>
        <div className="fin-dialog-art"><ProjectArt kind={selected.art} /></div>
        <p><Example /> &nbsp;This is illustrative content, not a claimed achievement.</p>
        <p>{selected.overview}</p>
        <h4>Role</h4><p>{selected.role}</p>
        <h4>Tools</h4><ul>{selected.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        <h4>Highlights</h4><ul>{selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </div>}
    </Modal>
    <Modal open={allOpen} onOpenChange={setAllOpen} title="Project index" description="All project descriptions below are examples. Select one to inspect its illustrative brief.">
      <div className="fin-modal-list">{projects.map((project) => <button type="button" key={project.id} onClick={() => { setAllOpen(false); setSelected(project); }}>
        <span><strong>{project.title}</strong><small>{project.category} · Example</small></span><ArrowUpRight size={16} />
      </button>)}</div>
    </Modal>
    <Modal open={!!notice} onOpenChange={(open) => !open && setNotice(null)} title={notice === "resume" ? "Résumé not added yet" : "LinkedIn not configured"} description={notice === "resume" ? "No résumé file has been uploaded to this portfolio, so there is nothing to download. This action will open a real PDF once one is added." : "A LinkedIn profile URL has not been added to this portfolio. This action will open a real profile once a link is supplied."} />
  </div>;
}

export default Finance;
