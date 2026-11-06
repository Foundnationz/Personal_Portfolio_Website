import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Github, Linkedin, Mail, MapPin, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contact, profile } from "@/data/portfolio";

const socials: { name: string; Icon: LucideIcon; href?: string }[] = [
  { name: "LinkedIn", Icon: Linkedin },
  { name: "GitHub", Icon: Github, href: profile.githubUrl },
];

export function SiteFooter({ onNavigate, homeHref = "" }: { onNavigate: (id: string) => void; homeHref?: string }) {
  const [unconfigured, setUnconfigured] = useState<string | null>(null);
  const openSocial = (name: string) => {
    if (name === "LinkedIn" && profile.linkedinUrl) {
      window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer");
    } else {
      setUnconfigured(name);
    }
  };

  return <>
    <footer id="footer" className="sf-site-footer">
      <div className="sf-wrap">
        <div className="sf-footer-columns">
          <div className="sf-footer-intro">
            <a className="sf-footer-name" href={`${homeHref}#home`} onClick={(event) => { event.preventDefault(); onNavigate("home"); }}>Shawn Stephen Abok</a>
            <p><span>Thank you for visiting my personal portfolio website.</span><br /><span>Connect with me over socials.</span></p>
          </div>
          <nav className="sf-footer-links" aria-label="Footer navigation">
            <h2>Quick links</h2>
            <ul>
              <li><a href={`${homeHref}#home`} onClick={(event) => { event.preventDefault(); onNavigate("home"); }}>Home</a></li>
              <li><a href={`${homeHref}#about`} onClick={(event) => { event.preventDefault(); onNavigate("about"); }}>About</a></li>
              <li><a href={`${homeHref}#skills`} onClick={(event) => { event.preventDefault(); onNavigate("skills"); }}>Skills</a></li>
              <li><a href={`${homeHref}#education`} onClick={(event) => { event.preventDefault(); onNavigate("education"); }}>Education</a></li>
              <li><a href={`${homeHref}#projects`} onClick={(event) => { event.preventDefault(); onNavigate("projects"); }}>Projects</a></li>
              <li><a href={`${homeHref}#experience`} onClick={(event) => { event.preventDefault(); onNavigate("experience"); }}>Experience</a></li>
              <li><a href={`${homeHref}#contact`} onClick={(event) => { event.preventDefault(); onNavigate("contact"); }}>Contact</a></li>
            </ul>
          </nav>
          <div className="sf-footer-contact">
            <h2>Contact info</h2>
            <div className="sf-footer-contact-row">
              <Mail size={15} aria-hidden="true" />
              {contact.isExample ? <span>{contact.email}</span> : <a href={`mailto:${contact.email}`}>{contact.email}</a>}
            </div>
            <div className="sf-footer-contact-row"><MapPin size={15} aria-hidden="true" /><span>{contact.location}</span></div>
            {contact.isExample && <p className="sf-footer-placeholder">Contact details are placeholders.</p>}
            <div className="sf-footer-socials" aria-label="Social profiles">
              {socials.map(({ name, Icon, href }) => href ? (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={`Open ${name} profile in a new tab`} title={name}>
                  <Icon size={18} aria-hidden="true" />
                </a>
              ) : (
                <button key={name} type="button"
                  aria-label={`Open ${name} profile${profile.linkedinUrl ? "" : " — link not added yet"}`}
                  title={profile.linkedinUrl ? name : `${name} — link not added yet`}
                  onClick={() => openSocial(name)}><Icon size={18} aria-hidden="true" /></button>
              ))}
            </div>
          </div>
        </div>
        <div className="sf-footer-copyright">
          <span><span>©</span>{" "}{new Date().getFullYear()}{" "}<span>Shawn Stephen Abok. All rights reserved.</span></span>
          <span>Portfolio Showcase</span>
        </div>
      </div>
    </footer>
    <Dialog.Root open={!!unconfigured} onOpenChange={(open) => !open && setUnconfigured(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="sf-dialog-overlay" />
        <Dialog.Content className="sf-dialog">
          <Dialog.Title asChild><h2>{unconfigured}{" "}<span>link not added yet</span></h2></Dialog.Title>
          <Dialog.Description className="sf-dialog-desc">
            This social profile has not been connected yet. No profile page has been opened.
          </Dialog.Description>
          <Dialog.Close className="sf-dialog-close" aria-label="Close dialog"><X size={18} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}
