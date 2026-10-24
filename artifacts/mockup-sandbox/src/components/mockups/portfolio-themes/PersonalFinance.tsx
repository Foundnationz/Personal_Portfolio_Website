import "./_group.css";
import "./_personal-finance.css";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Code2, FileText,
  Link2, Mail, MapPin, Menu, Users, X,
} from "lucide-react";
import {
  about, contact, education, experience, featuredProjectIds, navItems, profile,
  projects, skills, type IconKey, type Project,
} from "./_data";
import { ProjectArt } from "./_ProjectArt";

const skillIcons: Record<IconKey, typeof BookOpen> = { ledger: BookOpen, code: Code2, people: Users };
const example = <span className="pf-example">Example</span>;

function Modal({ open, onOpenChange, title, description, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="pf-overlay" />
      <Dialog.Content className="pf-dialog">
        <Dialog.Close className="pf-dialog-close" aria-label="Close dialog"><X size={19} /></Dialog.Close>
        <Dialog.Title className="pf-dialog-title">{title}</Dialog.Title>
        <Dialog.Description className="pf-dialog-description">{description}</Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

type Fields = { first: string; last: string; email: string; subject: string; message: string };
const emptyFields: Fields = { first: "", last: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [values, setValues] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [attempted, setAttempted] = useState(false);
  const [previewed, setPreviewed] = useState(false);

  const validate = (fields: Fields) => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.first.trim()) next.first = "Please enter your first name.";
    if (!fields.last.trim()) next.last = "Please enter your last name.";
    if (!fields.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) next.email = "Please enter a valid email address.";
    if (!fields.subject.trim()) next.subject = "Please enter a subject.";
    if (fields.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    return next;
  };
  const update = (key: keyof Fields, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    setPreviewed(false);
    if (attempted) setErrors(validate(next));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(values);
    setAttempted(true);
    setErrors(next);
    setPreviewed(Object.keys(next).length === 0);
    const firstError = Object.keys(next)[0] as keyof Fields | undefined;
    if (firstError) document.getElementById(`pf-${firstError}`)?.focus();
  };
  const field = (key: keyof Fields, label: string, type = "text") => <div className={`pf-field${key === "email" || key === "subject" ? " pf-wide" : ""}`} key={key}>
    <label htmlFor={`pf-${key}`}>{label}</label>
    <input id={`pf-${key}`} type={type} value={values[key]} onChange={(event) => update(key, event.target.value)}
      aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `pf-error-${key}` : undefined} />
    {errors[key] && <p className="pf-error" id={`pf-error-${key}`}>{errors[key]}</p>}
  </div>;

  return <form className="pf-form" onSubmit={submit} noValidate data-testid="form-contact">
    {field("first", "First name")}
    {field("last", "Last name")}
    {field("email", "Email address", "email")}
    {field("subject", "Subject")}
    <div className="pf-field pf-wide">
      <label htmlFor="pf-message">Message</label>
      <textarea id="pf-message" rows={5} value={values.message} onChange={(event) => update("message", event.target.value)}
        aria-invalid={!!errors.message} aria-describedby={errors.message ? "pf-error-message" : undefined} />
      {errors.message && <p className="pf-error" id="pf-error-message">{errors.message}</p>}
    </div>
    <div className="pf-submit-row pf-wide">
      <button className="pf-button" type="submit" data-testid="button-submit-contact">Preview message <ArrowUpRight size={16} /></button>
      <p className="pf-form-note">Preview only. This form is not connected to email, so nothing is sent.</p>
      {previewed && <p className="pf-form-status" role="status" aria-live="polite">
        Your details look valid, but this message was <strong>not sent</strong>. Your text remains above so you can copy it. Contact {contact.email} directly once a real address is added.
      </p>}
    </div>
  </form>;
}

function ProjectDetail({ project }: { project: Project }) {
  return <div className="pf-project-detail">
    <div className="pf-detail-art"><ProjectArt kind={project.art} /></div>
    <p className="pf-caveat">Example content — not a claimed achievement.</p>
    <p className="pf-detail-overview">{project.overview}</p>
    <div className="pf-detail-columns">
      <div><h4>Role</h4><p>{project.role}</p></div>
      <div><h4>Tools shown</h4><ul className="pf-tool-list">{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
    </div>
    <h4>Illustrative highlights</h4>
    <ul className="pf-highlight-list">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
  </div>;
}

export function PersonalFinance() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [notice, setNotice] = useState<"resume" | "linkedin" | null>(null);
  const featured = projects.filter((project) => featuredProjectIds.includes(project.id));

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-38% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    setActive(id);
  };
  const openLinkedIn = () => profile.linkedinUrl
    ? window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer")
    : setNotice("linkedin");
  const openResume = () => profile.resumeUrl
    ? window.open(profile.resumeUrl, "_blank", "noopener,noreferrer")
    : setNotice("resume");

  return <div className="pf-page">
    <a className="pf-skip" href="#about">Skip to content</a>
    <header className="pf-header">
      <nav className="pf-nav" aria-label="Primary navigation">
        <button type="button" className="pf-brand" onClick={() => go("home")} aria-label={`${profile.name}, back to top`} data-testid="link-logo">
          <img src={profile.logo} alt="" /><span className="pf-brand-name">Shawn Stephen Abok<small>Financial Technology · UCSI</small></span>
        </button>
        <ul className="pf-nav-list">
          {navItems.map((item) => <li key={item.id}>
            <button type="button" onClick={() => go(item.id)} aria-current={active === item.id ? "page" : undefined} data-testid={`link-nav-${item.id}`}>{item.label}</button>
          </li>)}
        </ul>
        <button type="button" className="pf-menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen} aria-controls="pf-mobile-menu" onClick={() => setMenuOpen((open) => !open)} data-testid="button-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {menuOpen && <nav className="pf-mobile-menu" id="pf-mobile-menu" aria-label="Mobile navigation">
        {navItems.map((item) => <button type="button" key={item.id} onClick={() => go(item.id)} aria-current={active === item.id ? "page" : undefined}>{item.label}<ArrowUpRight size={14} /></button>)}
      </nav>}
    </header>

    <main>
      <section id="home" className="pf-hero pf-wrap" aria-label="Introduction">
        <div className="pf-hero-copy">
          <p className="pf-eyebrow"><span className="pf-eyebrow-mark" /> A student, in practice <span className="pf-eyebrow-divider">/</span> UCSI University</p>
          <h1>{profile.greeting}<br /><em>Shawn.</em></h1>
          <p className="pf-hero-degree">{profile.headline}</p>
          <p className="pf-hero-lede">{profile.role} at {profile.university}. {profile.intro}</p>
          <div className="pf-hero-actions">
            <button className="pf-button" type="button" onClick={() => go("about")} data-testid="button-about-me">About Me <ArrowDownRight size={16} /></button>
            <button className="pf-linkedin" type="button" onClick={openLinkedIn} data-testid="button-linkedin"><Link2 size={15} /> LinkedIn</button>
          </div>
          <p className="pf-hero-caption"><span>01</span> A personal portfolio for finance internship conversations</p>
        </div>
        <figure className="pf-portrait">
          <div className="pf-portrait-frame"><img src={profile.portrait} alt="Portrait of Shawn Stephen Abok" data-testid="img-portrait" /></div>
          <figcaption><span>Shawn Stephen Abok</span><span>Financial Technology · Final year</span></figcaption>
          <span className="pf-portrait-note" aria-hidden="true">Finance<br />with a<br /><i>human</i><br />side.</span>
        </figure>
        <div className="pf-hero-foot" aria-label="Profile at a glance">
          <span><small>Studying</small>Bachelor of Financial Technology (Honours)</span>
          <span><small>At</small>UCSI University</span>
          <span><small>Looking for</small>Finance internship opportunities</span>
        </div>
      </section>

      <section id="about" className="pf-section pf-about" aria-labelledby="pf-about-title">
        <div className="pf-wrap">
          <div className="pf-section-head pf-about-head">
            <p className="pf-section-kicker"><span>01</span> A little context</p>
            <h2 id="pf-about-title">Finance and technology,<br /><em>with room to keep asking why.</em></h2>
          </div>
          <div className="pf-about-grid">
            <aside className="pf-about-aside">
              <div className="pf-aside-rule" />
              <h3>{profile.name}</h3><p className="pf-role">{profile.role}</p>
              <dl className="pf-meta-list">
                <div><dt><Mail size={15} />Email</dt><dd>{about.email} {example}</dd></div>
                <div><dt><MapPin size={15} />Location</dt><dd>{about.location} {example}</dd></div>
              </dl>
              <button className="pf-text-link" type="button" onClick={openResume} data-testid="button-view-resume"><FileText size={16} /> View résumé <ArrowUpRight size={14} /></button>
            </aside>
            <div className="pf-bio">
              {about.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              <p className="pf-note">A thoughtful introduction is still taking shape; the second paragraph is an example sentence to personalise.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="pf-section pf-skills" aria-labelledby="pf-skills-title">
        <div className="pf-wrap">
          <div className="pf-section-head pf-inline-head">
            <div><p className="pf-section-kicker"><span>02</span> Working notes</p><h2 id="pf-skills-title">Foundations I’m<br /><em>building on.</em></h2></div>
            <p className="pf-section-note">A starting point for a conversation, not a claim of expertise. Every skill label here is an example to confirm or replace.</p>
          </div>
          <div className="pf-skill-list">
            {skills.map((skill, index) => {
              const Icon = skillIcons[skill.icon];
              return <article className="pf-skill-row" key={skill.title} data-testid={`card-skill-${index}`}>
                <span className="pf-skill-index">0{index + 1}</span>
                <div className="pf-skill-main"><div className="pf-skill-title"><Icon size={18} /><h3>{skill.title}</h3></div><p>{skill.description}</p></div>
                <ul className="pf-tags">{skill.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <span className="pf-skill-example">{example}</span>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="education" className="pf-section pf-education" aria-labelledby="pf-education-title">
        <div className="pf-wrap pf-education-layout">
          <div className="pf-education-intro"><p className="pf-section-kicker"><span>03</span> The foundation</p><h2 id="pf-education-title">Education, <em>so far.</em></h2><p>Grounded in a formal programme and still learning how its ideas meet the day-to-day work of finance.</p></div>
          <div className="pf-education-list">
            {education.map((entry, index) => <article className="pf-education-entry" key={entry.school} data-testid={`card-education-${index}`}>
              <div className="pf-education-period">{entry.period}{entry.isExample && <span>{example}</span>}</div>
              <div><h3>{entry.school}</h3><p className="pf-degree">{entry.degree}</p><p className="pf-education-note">{entry.note}</p></div>
              <span className="pf-entry-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </article>)}
          </div>
        </div>
      </section>

      <section id="projects" className="pf-section pf-projects" aria-labelledby="pf-projects-title">
        <div className="pf-wrap">
          <div className="pf-section-head pf-inline-head pf-project-head">
            <div><p className="pf-section-kicker"><span>04</span> Selected studies</p><h2 id="pf-projects-title">Work in <em>progress.</em></h2></div>
            <p className="pf-section-note">These are example project briefs, not completed work or claimed results. They show the kind of evidence a case study could hold.</p>
          </div>
          <div className="pf-featured-projects">
            {featured.map((project, index) => <article className={`pf-project-card${index === 0 ? " pf-project-lead" : " pf-project-secondary"}`} key={project.id} data-testid={`card-project-${project.id}`}>
              <button className="pf-project-open" type="button" onClick={() => setSelectedProject(project)} aria-label={`View example project: ${project.title}`}>
                <div className="pf-project-art"><ProjectArt kind={project.art} /><span>FIG. 0{index + 1} <i>Illustrative artwork</i></span></div>
                <div className="pf-project-copy">
                  <p className="pf-project-meta">{project.category}<span>{example}</span></p>
                  <h3>{project.title}</h3><p>{project.summary}</p>
                  <span className="pf-case-link">Read the example brief <ArrowUpRight size={15} /></span>
                </div>
              </button>
            </article>)}
          </div>
          <div className="pf-project-bottom"><span>Example work · no performance claims</span><button className="pf-text-link" type="button" onClick={() => setAllOpen(true)} data-testid="button-view-all">View All projects <ArrowRight size={15} /></button></div>
        </div>
      </section>

      <section id="experience" className="pf-section pf-experience" aria-labelledby="pf-experience-title">
        <div className="pf-wrap pf-experience-layout">
          <div className="pf-experience-intro"><p className="pf-section-kicker"><span>05</span> Along the way</p><h2 id="pf-experience-title">Experience,<br /><em>as it grows.</em></h2><p>Illustrative entries only. No employment or society roles are being claimed here.</p></div>
          <ol className="pf-timeline">
            {experience.map((item, index) => <li key={`${item.title}-${index}`} data-testid={`item-experience-${index}`}>
              <span className="pf-timeline-dot" aria-hidden="true" />
              <article className="pf-experience-entry">
                <div className="pf-exp-period">{item.period} {example}</div>
                <h3>{item.title}</h3><p className="pf-exp-org">{item.org}</p>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            </li>)}
          </ol>
        </div>
      </section>

      <section id="contact" className="pf-section pf-contact" aria-labelledby="pf-contact-title">
        <div className="pf-wrap">
          <div className="pf-contact-heading"><p className="pf-section-kicker"><span>06</span> An open door</p><h2 id="pf-contact-title">Let’s start<br /><em>a conversation.</em></h2></div>
          <div className="pf-contact-grid">
            <div className="pf-contact-info">
              <p className="pf-contact-lede">Open to finance internship conversations. Contact details below are examples until real ones are added.</p>
              <ul className="pf-contact-list">
                <li><Mail size={17} /><span><small>Email · Example</small>{contact.email}</span></li>
                <li><Link2 size={17} /><span><small>Connect</small><button type="button" onClick={openLinkedIn}>{contact.connect}</button></span></li>
                <li><MapPin size={17} /><span><small>Location · Example</small>{contact.location}</span></li>
              </ul>
              <p className="pf-contact-small">Details marked Example should be replaced before sharing this portfolio.</p>
            </div>
            <div className="pf-contact-form-wrap"><p className="pf-form-kicker">Send a note <span>Preview only</span></p><ContactForm /></div>
          </div>
        </div>
      </section>
    </main>

    <footer className="pf-footer"><div className="pf-wrap"><span>{profile.name}</span><span>Student portfolio · examples are labelled</span><button type="button" onClick={() => go("home")} aria-label="Back to top">Back to top <ArrowUpRight size={14} /></button></div></footer>

    <Modal open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}
      title={selectedProject?.title ?? "Project example"} description={selectedProject ? `${selectedProject.category} · Example project brief` : "Example project details"}>
      {selectedProject && <ProjectDetail project={selectedProject} />}
    </Modal>
    <Modal open={allOpen} onOpenChange={setAllOpen} title="Project notes" description="All projects below are example placeholders. Select an item to open its illustrative brief.">
      <div className="pf-all-projects">
        {projects.map((project) => <button type="button" key={project.id} onClick={() => { setAllOpen(false); setSelectedProject(project); }} data-testid={`button-all-${project.id}`}>
          <span className="pf-all-art"><ProjectArt kind={project.art} /></span><span className="pf-all-copy"><strong>{project.title}</strong><small>{project.category} · Example</small></span><ArrowUpRight size={17} />
        </button>)}
      </div>
    </Modal>
    <Modal open={!!notice} onOpenChange={(open) => !open && setNotice(null)}
      title={notice === "resume" ? "Résumé not added yet" : "LinkedIn not configured"}
      description={notice === "resume"
        ? "No résumé file has been uploaded to this portfolio, so there is nothing to download. This action will open a real PDF once one is added."
        : "A LinkedIn profile URL has not been added to this portfolio. Once a real link is supplied, this control will open it in a new tab."} />
  </div>;
}
