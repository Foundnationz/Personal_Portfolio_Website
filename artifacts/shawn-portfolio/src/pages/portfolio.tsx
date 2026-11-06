import "@/styles/signature-fintech.css";
import { useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "wouter";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, FileText,
  Link2, Mail, MapPin, Menu, X,
} from "lucide-react";
import {
  contact, navItems, profile,
} from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { EducationCards } from "@/components/portfolio/education-cards";
import { SkillCards } from "@/components/portfolio/skill-cards";
import { ExperienceCards } from "@/components/portfolio/experience-cards";
import { FeaturedProjectCards } from "@/components/portfolio/featured-project-cards";

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

export default function Portfolio() {
  const [, navigate] = useLocation();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<"resume" | "linkedin" | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

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
          <span className="sf-brand-text"><span>Shawn Stephen Abok</span><small>FINANCIAL TECHNOLOGY · UCSI</small></span>
        </button>
        <ul className="sf-navlinks">
          <li><a href="#home" onClick={() => go("home")} aria-current={active === "home" ? "true" : undefined} data-testid="link-nav-home">Home</a></li>
          <li><a href="#about" onClick={() => go("about")} aria-current={active === "about" ? "true" : undefined} data-testid="link-nav-about">About</a></li>
          <li><a href="#skills" onClick={() => go("skills")} aria-current={active === "skills" ? "true" : undefined} data-testid="link-nav-skills">Skills</a></li>
          <li><a href="#education" onClick={() => go("education")} aria-current={active === "education" ? "true" : undefined} data-testid="link-nav-education">Education</a></li>
          <li><a href="#projects" onClick={() => go("projects")} aria-current={active === "projects" ? "true" : undefined} data-testid="link-nav-projects">Projects</a></li>
          <li><a href="#experience" onClick={() => go("experience")} aria-current={active === "experience" ? "true" : undefined} data-testid="link-nav-experience">Experience</a></li>
          <li><a href="#contact" onClick={() => go("contact")} aria-current={active === "contact" ? "true" : undefined} data-testid="link-nav-contact">Contact</a></li>
        </ul>
        <button className="sf-menu" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen} aria-controls="sf-mobile-menu" onClick={() => setMenuOpen((open) => !open)} data-testid="button-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {menuOpen && <nav className="sf-mobile sf-wrap" id="sf-mobile-menu" aria-label="Mobile navigation">
        <a href="#home" onClick={() => go("home")} aria-current={active === "home" ? "true" : undefined}><span>Home</span><ArrowUpRight size={14} /></a>
        <a href="#about" onClick={() => go("about")} aria-current={active === "about" ? "true" : undefined}><span>About</span><ArrowUpRight size={14} /></a>
        <a href="#skills" onClick={() => go("skills")} aria-current={active === "skills" ? "true" : undefined}><span>Skills</span><ArrowUpRight size={14} /></a>
        <a href="#education" onClick={() => go("education")} aria-current={active === "education" ? "true" : undefined}><span>Education</span><ArrowUpRight size={14} /></a>
        <a href="#projects" onClick={() => go("projects")} aria-current={active === "projects" ? "true" : undefined}><span>Projects</span><ArrowUpRight size={14} /></a>
        <a href="#experience" onClick={() => go("experience")} aria-current={active === "experience" ? "true" : undefined}><span>Experience</span><ArrowUpRight size={14} /></a>
        <a href="#contact" onClick={() => go("contact")} aria-current={active === "contact" ? "true" : undefined}><span>Contact</span><ArrowUpRight size={14} /></a>
      </nav>}
    </header>

    <main>
      <section className="sf-wrap sf-hero" id="home" aria-label="Home">
        <div className="sf-hero-copy">
          <p className="sf-kicker sf-hero-eyebrow">A student profile · Open to finance internships</p>
          <h1><span>Hi There, I'm</span><br /><em>Shawn.</em></h1>
          <p className="sf-lede"><strong>Final-year Financial Technology Student</strong>{" "}<span>at UCSI University. Seeking a finance internship where I can pair a financial technology education with careful, curious work.</span></p>
          <div className="sf-actions">
            <a className="sf-primary" href="#about" onClick={() => go("about")} data-testid="button-about-me"><span>About Me</span><ArrowDownRight size={16} /></a>
            <button className="sf-linkedin" type="button" onClick={openLinkedIn} aria-label="Open LinkedIn profile" data-testid="button-linkedin">
              <Link2 size={17} />
            </button>
            <button className="sf-text-btn" type="button" onClick={openLinkedIn}><span>LinkedIn</span><ArrowUpRight size={13} /></button>
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
            <div className="sf-section-label sf-kicker"><b>01</b><span /><span className="sf-section-name">About</span></div>
            <div><h2 id="sf-about-title">About me.</h2></div>
          </div>
          <div className="sf-about-grid">
            <div className="sf-about-card">
              <h3>Shawn Stephen Abok</h3>
              <p className="sf-about-role">Bachelor of Financial Technology (Honours) Student</p>
              <div className="sf-bio">
                <p>I am a final-year Bachelor of Financial Technology (Honours) student at UCSI University, studying where finance meets technology.</p>
                <p><span>I am looking for a finance internship to learn how teams work with real numbers, processes and clients. (Example sentence: replace with your own story and interests.)</span>{" "}<span className="sf-example">Example</span></p>
              </div>
              <div className="sf-about-bottom">
                <div className="sf-meta-row"><MapPin size={16} aria-hidden /><div><span>Kuala Lumpur, Malaysia</span>{" "}<span className="sf-example">Example</span></div></div>
                <button className="sf-outline sf-resume" type="button" onClick={openResume} data-testid="button-view-resume">
                  <FileText size={15} /><span>View resume</span><ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sf-section sf-section-wash" id="skills" aria-labelledby="sf-skills-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>02</b><span /><span className="sf-section-name">Skills</span></div>
            <div><h2 id="sf-skills-title"><span>Foundations, still</span><br /><span>taking shape.</span></h2><p>These skill groups are examples from the portfolio source and should be confirmed before sharing as personal experience.</p></div>
          </div>
          <SkillCards />
        </div>
      </section>

      <section className="sf-section sf-section-dark" id="education" aria-labelledby="sf-education-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>03</b><span /><span className="sf-section-name">Education</span></div>
            <div><h2 id="sf-education-title"><span>Academic</span><br /><span>foundation.</span></h2><p>Education is not the learning of facts, but the training of the mind to think.</p></div>
          </div>
          <EducationCards />
        </div>
      </section>

      <section className="sf-section" id="projects" aria-labelledby="sf-projects-title">
        <div className="sf-wrap">
          <div className="sf-project-intro">
            <div className="sf-section-head">
              <div className="sf-section-label sf-kicker"><b>04</b><span /><span className="sf-section-name">Selected work</span></div>
              <div><h2 id="sf-projects-title"><span>Evidence over</span><br /><span>adjectives.</span></h2></div>
            </div>
            <p className="sf-project-note">Example projects only—not claimed achievements. Each opens to an illustrative case note, ready to replace with real work.</p>
          </div>
          <FeaturedProjectCards />
          <div className="sf-view-all"><Link className="sf-outline" href="/projects" data-testid="button-view-all"><span>View all projects</span><ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="sf-section sf-section-wash" id="experience" aria-labelledby="sf-experience-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>05</b><span /><span className="sf-section-name">Experience</span></div>
            <div><h2 id="sf-experience-title">Work Experience</h2><p>Professional experience to date.</p></div>
          </div>
          <ExperienceCards />
        </div>
      </section>

      <section className="sf-section sf-section-dark" id="contact" aria-labelledby="sf-contact-title">
        <div className="sf-wrap">
          <div className="sf-section-head">
            <div className="sf-section-label sf-kicker"><b>06</b><span /><span className="sf-section-name">Contact</span></div>
            <div><h2 id="sf-contact-title">Start a conversation.</h2><p>Open to finance internship conversations. Feel free to reach out by email.</p></div>
          </div>
          <div className="sf-contact-simple">
            <p className="sf-contact-simple-copy">For finance internship opportunities, email me directly.</p>
            <a className="sf-primary sf-contact-email" href={`mailto:${contact.email}`} data-testid="link-contact-email">
              <Mail size={17} aria-hidden="true" />
              <span>{contact.email}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter onNavigate={go} />

    <Modal open={!!notice} onOpenChange={(open) => !open && setNotice(null)}
      title={notice === "resume" ? "Resume not added yet" : "LinkedIn not configured"}
      description={notice === "resume"
        ? "No resume file has been added to this portfolio, so there is nothing to download. This control will open a real PDF once one is supplied."
        : "A LinkedIn profile URL has not been added to this portfolio. This control will open a real profile once a link is supplied."} />
  </div>;
}
