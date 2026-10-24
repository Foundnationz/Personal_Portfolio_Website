import "./_group.css";
import "./_signature-fintech.css";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Building2, Code2, FileText,
  Link2, Mail, MapPin, Menu, Users, X,
} from "lucide-react";
import {
  about, contact, education, experience, featuredProjectIds, navItems, profile,
  projects, skills, type IconKey, type Project,
} from "./_data";
import { ProjectArt } from "./_ProjectArt";
import { SiteFooter } from "./_SiteFooter";

const skillIcons: Record<IconKey, typeof BookOpen> = { ledger: BookOpen, code: Code2, people: Users };

function Example({ light = false }: { light?: boolean }) {
  return <span className={`sf-example${light ? " sf-example-light" : ""}`}>Example</span>;
}

function Modal({ open, onOpenChange, title, description, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="sf-dialog-overlay" />
      <Dialog.Content className="sf-dialog">
        <Dialog.Title asChild><h2>{title}</h2></Dialog.Title>
        <Dialog.Description className="sf-dialog-desc">{description}</Dialog.Description>
        {children}
        <Dialog.Close aria-label="Close dialog" className="sf-dialog-close"><X size={18} /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

type Fields = { first: string; last: string; email: string; subject: string; message: string };
const blankFields: Fields = { first: "", last: "", email: "", subject: "", message: "" };
type FieldKey = keyof Fields;

function ContactForm() {
  const [values, setValues] = useState<Fields>(blankFields);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const validate = (fields: Fields) => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!fields.first.trim()) next.first = "Enter your first name.";
    if (!fields.last.trim()) next.last = "Enter your last name.";
    if (!fields.email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) next.email = "Enter a valid email address.";
    if (!fields.subject.trim()) next.subject = "Enter a subject.";
    if (fields.message.trim().length < 10) next.message = "Write at least 10 characters.";
    return next;
  };
  const update = (key: FieldKey, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(values);
    setAttempted(true);
    setErrors(next);
    const firstError = Object.keys(next)[0] as FieldKey | undefined;
    if (firstError) document.getElementById(`sf-${firstError}`)?.focus();
  };
  const field = (key: FieldKey, label: string, type = "text", wide = false) => (
    <div className={`sf-field${wide ? " sf-field-wide" : ""}`} key={key}>
      <label htmlFor={`sf-${key}`}>{label}</label>
      <input id={`sf-${key}`} name={key} type={type} value={values[key]} onChange={(event) => update(key, event.target.value)}
        aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `sf-error-${key}` : undefined} />
      {errors[key] && <span className="sf-error" id={`sf-error-${key}`}>{errors[key]}</span>}
    </div>
  );
  const valid = attempted && Object.keys(errors).length === 0;
  return <form className="sf-form" onSubmit={submit} noValidate data-testid="form-contact">
    {field("first", "First name")}
    {field("last", "Last name")}
    {field("email", "Email address", "email", true)}
    {field("subject", "Subject", "text", true)}
    <div className="sf-field sf-field-wide">
      <label htmlFor="sf-message">Message</label>
      <textarea id="sf-message" name="message" rows={5} value={values.message} onChange={(event) => update("message", event.target.value)}
        aria-invalid={!!errors.message} aria-describedby={errors.message ? "sf-error-message" : undefined} />
      {errors.message && <span className="sf-error" id="sf-error-message">{errors.message}</span>}
    </div>
    <button className="sf-primary" type="submit" data-testid="button-submit-contact">Preview message <ArrowRight size={15} /></button>
    <p className="sf-form-note">Preview only. This form is not connected to email; nothing is sent or stored.</p>
    {valid && <p className="sf-form-status" role="status" aria-live="polite">
      Your details look valid, but this message was not sent. Your text remains above so you can copy it.
    </p>}
  </form>;
}

export function SignatureFinTech() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [notice, setNotice] = useState<"resume" | "linkedin" | null>(null);
  const featured = projects.filter((project) => featuredProjectIds.includes(project.id));
  const openProjectOutline = (project: Project) => {
    setAllOpen(false);
    if (project.id === "ledger-reconciliation") {
      window.open("/projects/ledger-reconciliation", "_blank", "noopener,noreferrer");
    } else {
      setSelectedProject(project);
    }
  };

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-36% 0px -56% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };
  const openLinkedIn = () => profile.linkedinUrl
    ? window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer")
    : setNotice("linkedin");
  const openResume = () => profile.resumeUrl
    ? window.open(profile.resumeUrl, "_blank", "noopener,noreferrer")
    : setNotice("resume");

  return <div className="sf-page">
    <a className="sf-skip" href="#about">Skip to content</a>
    <header className="sf-header">
      <nav className="sf-wrap sf-nav" aria-label="Primary navigation">
        <button className="sf-brand" type="button" onClick={() => go("home")} aria-label={`${profile.name}, back to home`} data-testid="link-logo">
          <span className="sf-brand-mark">s.</span>
          <span className="sf-brand-text">{profile.name}<small>FINANCIAL TECHNOLOGY · UCSI</small></span>
        </button>
        <ul className="sf-navlinks">
          {navItems.map((item) => <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => go(item.id)} aria-current={active === item.id ? "true" : undefined} data-testid={`link-nav-${item.id}`}>{item.label}</a>
          </li>)}
        </ul>
        <button className="sf-menu" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen} aria-controls="sf-mobile-menu" onClick={() => setMenuOpen((open) => !open)} data-testid="button-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {menuOpen && <nav className="sf-mobile sf-wrap" id="sf-mobile-menu" aria-label="Mobile navigation">
        {navItems.map((item) => <a href={`#${item.id}`} key={item.id} onClick={() => go(item.id)}
          aria-current={active === item.id ? "true" : undefined}>{item.label}<ArrowUpRight size={14} /></a>)}
      </nav>}
    </header>

    <main>
      <section className="sf-wrap sf-hero" id="home" aria-label="Home">
        <div className="sf-hero-copy">
          <p className="sf-kicker sf-hero-eyebrow">A student profile · Open to finance internships</p>
          <h1>{profile.greeting}<br /><em>Shawn.</em></h1>
          <p className="sf-lede"><strong>{profile.headline}</strong> at {profile.university}. {profile.intro}</p>
          <div className="sf-actions">
            <a className="sf-primary" href="#about" onClick={() => go("about")} data-testid="button-about-me">About Me <ArrowDownRight size={16} /></a>
            <button className="sf-linkedin" type="button" onClick={openLinkedIn} aria-label="Open LinkedIn profile" data-testid="button-linkedin">
              <Link2 size={17} />
            </button>
            <button className="sf-text-btn" type="button" onClick={openLinkedIn}>LinkedIn <ArrowUpRight size={13} /></button>
          </div>
        </div>
        <div className="sf-photo-stage">
          <span className="sf-photo-index sf-kicker">01 / Profile</span>
          <div className="sf-photo-frame"><img src={profile.portrait} alt="Portrait of Shawn Stephen Abok" data-testid="img-portrait" /></div>
          <div className="sf-photo-caption"><span>SHAWN STEPHEN ABOK</span><span>UCSI UNIVERSITY</span></div>
        </div>
        <div className="sf-hero-foot"><span>Final-year · Bachelor of Financial Technology (Honours)</span><span>Scroll to explore ↓</span></div>
      </section>

      <section className="sf-section sf-section-dark" id="about" aria-labelledby="sf-about-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>01</b><span /> About</div>
            <div><h2 id="sf-about-title">About me.</h2></div>
          </div>
          <div className="sf-about-grid">
            <div className="sf-about-card">
              <h3>{profile.name}</h3>
              <p className="sf-about-role">{profile.role}</p>
              <div className="sf-bio">
                {about.bio.map((paragraph, index) => <p key={index}>{paragraph}{index > 0 && <span> <Example /></span>}</p>)}
              </div>
              <div className="sf-about-bottom">
                <div className="sf-meta-row"><MapPin size={16} aria-hidden /><span>{about.location} <Example /></span></div>
                <button className="sf-outline sf-resume" type="button" onClick={openResume} data-testid="button-view-resume">
                  <FileText size={15} /> View resume <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sf-section sf-section-wash" id="skills" aria-labelledby="sf-skills-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>02</b><span /> Working notes</div>
            <div><h2 id="sf-skills-title">Foundations, still<br />taking shape.</h2><p>These skill groups are examples from the portfolio source and should be confirmed before sharing as personal experience.</p></div>
          </div>
          <div className="sf-skills">
            {skills.map((skill, index) => {
              const Icon = skillIcons[skill.icon];
              return <article className="sf-skill" key={skill.title} data-testid={`card-skill-${index}`}>
                <span className="sf-skill-no">0{index + 1} / <Icon size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
                <h3>{skill.title}</h3><p>{skill.description}</p>
                <ul className="sf-tags">{skill.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <div className="sf-skill-foot"><Example light /></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="sf-section sf-section-dark" id="education" aria-labelledby="sf-education-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>03</b><span /> Education</div>
            <div><h2 id="sf-education-title">Academic<br />foundation.</h2><p>Formal study at the intersection of finance and technology.</p></div>
          </div>
          <div className="sf-education-list">
            {education.map((entry, index) => <article className="sf-edu" key={entry.school} data-testid={`card-education-${index}`}>
              <div className="sf-edu-image" role="img" aria-label={`University image placeholder for ${entry.school}`}>
                <Building2 size={30} aria-hidden="true" />
                <span>University image placeholder</span>
              </div>
              <div className="sf-edu-copy">
                <div className="sf-edu-topline"><span className="sf-period">{entry.period}</span><span className="sf-edu-index">0{index + 1}</span></div>
                <h3>{entry.school} {entry.isExample && <Example />}</h3>
                <p className="sf-edu-degree">{entry.degree}</p>
                <p className="sf-edu-note">{entry.note}</p>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="sf-section" id="projects" aria-labelledby="sf-projects-title">
        <div className="sf-wrap">
          <div className="sf-project-intro">
            <div className="sf-section-head">
              <div className="sf-section-label sf-kicker"><b>04</b><span /> Selected work</div>
              <div><h2 id="sf-projects-title">Evidence over<br />adjectives.</h2></div>
            </div>
            <p className="sf-project-note">Example projects only—not claimed achievements. Each opens to an illustrative case note, ready to replace with real work.</p>
          </div>
          <div className="sf-project-stack">
            {featured.map((project, index) => <article className="sf-project" key={project.id} data-testid={`card-project-${project.id}`}>
              <div className="sf-project-art"><ProjectArt kind={project.art} /><span className="sf-figcaption">FIG. 0{index + 1} — ILLUSTRATIVE ART, NOT DATA</span></div>
              <div className="sf-project-copy">
                <div className="sf-project-meta"><span>{project.category}</span><Example /></div>
                <h3>{project.title}</h3><p>{project.summary}</p>
                <button className="sf-project-open" type="button" onClick={() => openProjectOutline(project)} data-testid={`button-view-project-${project.id}`}>
                  View project outline <ArrowUpRight size={15} />
                </button>
              </div>
            </article>)}
          </div>
          <div className="sf-view-all"><button className="sf-outline" type="button" onClick={() => setAllOpen(true)} data-testid="button-view-all">View all project examples <ArrowRight size={15} /></button></div>
        </div>
      </section>

      <section className="sf-section sf-section-wash" id="experience" aria-labelledby="sf-experience-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>05</b><span /> Experience</div>
            <div><h2 id="sf-experience-title">The next chapter<br />is unwritten.</h2><p>Illustrative placeholders only. No employment or society roles are being claimed here.</p></div>
          </div>
          <div className="sf-exp-list">
            {experience.map((item, index) => <article className="sf-exp" key={`${item.title}-${index}`} data-testid={`item-experience-${index}`}>
              <div className="sf-exp-date">{item.period}</div>
              <div className="sf-exp-card"><div className="sf-exp-head"><h3>{item.title}</h3><Example light /></div><p className="sf-exp-org">{item.org}</p>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="sf-section sf-section-dark" id="contact" aria-labelledby="sf-contact-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>06</b><span /> Contact</div>
            <div><h2 id="sf-contact-title">Start a conversation.</h2><p>Open to finance internship conversations. Contact details below are placeholders until replaced with real ones.</p></div>
          </div>
          <div className="sf-contact-grid">
            <div className="sf-contact-intro">
              <p>A thoughtful introduction is always welcome. For now, the contact details below are examples, not working personal contact information.</p>
              <div className="sf-contact-list">
                <div className="sf-contact-item"><Mail size={17} aria-hidden /><div><small>EMAIL · EXAMPLE</small><span>{contact.email}</span></div></div>
                <div className="sf-contact-item"><Link2 size={17} aria-hidden /><div><small>CONNECT</small><button type="button" onClick={openLinkedIn}>{contact.connect}</button></div></div>
                <div className="sf-contact-item"><MapPin size={17} aria-hidden /><div><small>LOCATION · EXAMPLE</small><span>{contact.location}</span></div></div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
    <SiteFooter onNavigate={go} />

    <Modal open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}
      title={selectedProject?.title ?? ""} description={selectedProject ? `${selectedProject.category} · Example project case note` : ""}>
      {selectedProject && <div className="sf-dialog-body">
        <div className="sf-modal-art"><ProjectArt kind={selectedProject.art} /></div>
        <p><Example light /> &nbsp; Illustrative content only—not a claimed achievement.</p>
        <p>{selectedProject.overview}</p>
        <h4>Role</h4><p>{selectedProject.role}</p>
        <h4>Tools</h4><div className="sf-dialog-tools">{selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        <h4>Highlights</h4><ul>{selectedProject.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </div>}
    </Modal>
    <Modal open={allOpen} onOpenChange={setAllOpen} title="Project index" description="Every entry is an example placeholder. Select one to inspect its illustrative case note.">
      <div className="sf-all-list">{projects.map((project) => <button type="button" key={project.id} data-testid={`button-all-${project.id}`}
        onClick={() => openProjectOutline(project)}>
        <span className="sf-all-art"><ProjectArt kind={project.art} /></span>
        <span className="sf-all-title"><strong>{project.title}</strong><small>{project.category} · Example</small></span><ArrowUpRight size={16} />
      </button>)}</div>
    </Modal>
    <Modal open={!!notice} onOpenChange={(open) => !open && setNotice(null)}
      title={notice === "resume" ? "Resume not added yet" : "LinkedIn not configured"}
      description={notice === "resume"
        ? "No resume file has been added to this portfolio, so there is nothing to download. This control will open a real PDF once one is supplied."
        : "A LinkedIn profile URL has not been added to this portfolio. This control will open a real profile once a link is supplied."} />
  </div>;
}
