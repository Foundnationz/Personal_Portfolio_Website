import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Facebook, Instagram, Linkedin, Mail, MapPin, X, Youtube } from "lucide-react";
import { contact, navItems, profile } from "./_data";

const socials = [
  { name: "Facebook", Icon: Facebook },
  { name: "Instagram", Icon: Instagram },
  { name: "YouTube", Icon: Youtube },
  { name: "X", Icon: X },
  { name: "LinkedIn", Icon: Linkedin },
  { name: "TikTok", Icon: TikTokIcon },
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 3c.3 2.1 1.5 3.4 3.4 3.7v3a8.5 8.5 0 0 1-3.5-1.1v7.1a6 6 0 1 1-5.2-6v3.1a2.9 2.9 0 1 0 2.1 2.8V3h3.2Z" />
  </svg>;
}

export function SiteFooter({ onNavigate }: { onNavigate: (id: string) => void }) {
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
            <a className="sf-footer-name" href="#home" onClick={() => onNavigate("home")}>{profile.name}</a>
            <p>Thank you for visiting my personal portfolio website.<br />Connect with me over socials.</p>
          </div>
          <nav className="sf-footer-links" aria-label="Footer navigation">
            <h2>Quick links</h2>
            <ul>{navItems.map((item) => <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => onNavigate(item.id)}>{item.label}</a>
            </li>)}</ul>
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
              {socials.map(({ name, Icon }) => <button key={name} type="button"
                aria-label={`Open ${name} profile${name === "LinkedIn" && profile.linkedinUrl ? "" : " — link not added yet"}`}
                title={name === "LinkedIn" && profile.linkedinUrl ? name : `${name} — link not added yet`}
                onClick={() => openSocial(name)}><Icon size={18} aria-hidden="true" /></button>)}
            </div>
          </div>
        </div>
        <div className="sf-footer-copyright">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Portfolio Showcase</span>
        </div>
      </div>
    </footer>
    <Dialog.Root open={!!unconfigured} onOpenChange={(open) => !open && setUnconfigured(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="sf-dialog-overlay" />
        <Dialog.Content className="sf-dialog">
          <Dialog.Title asChild><h2>{unconfigured} link not added yet</h2></Dialog.Title>
          <Dialog.Description className="sf-dialog-desc">
            This social profile has not been connected yet. No profile page has been opened.
          </Dialog.Description>
          <Dialog.Close className="sf-dialog-close" aria-label="Close dialog"><X size={18} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}
