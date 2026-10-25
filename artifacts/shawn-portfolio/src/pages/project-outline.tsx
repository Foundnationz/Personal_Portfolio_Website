import "@/styles/signature-fintech.css";
import "@/styles/project-outline.css";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { navItems, profile } from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";

const overview = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.";

export default function ProjectOutline() {
  const [, setLocation] = useLocation();
  const [unavailableOpen, setUnavailableOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    const createdDescription = !description;
    const pageDescription = "An example project outline for a financial tracker and budgeting app by Shawn Stephen Abok.";
    const meta = description ?? document.createElement("meta");

    if (createdDescription) {
      meta.name = "description";
      document.head.appendChild(meta);
    }
    document.title = "Financial Tracker and Budgetting App | " + profile.name;
    meta.content = pageDescription;
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      document.title = previousTitle;
      if (createdDescription) meta.remove();
      else if (previousDescription !== undefined) meta.content = previousDescription;
    };
  }, []);

  const navigateHome = (id: string) => setLocation(`/#${id}`);

  return (
    <div className="sf-page sf-outline-page">
      <a className="sf-skip" href="#project-main">Skip to project content</a>
      <header className="sf-header">
        <nav className="sf-wrap sf-nav" aria-label="Primary navigation">
          <Link className="sf-brand" href={import.meta.env.BASE_URL} aria-label={`${profile.name}, home`}>
            <span className="sf-brand-mark" aria-hidden="true">s.</span>
            <span className="sf-brand-text">{profile.name}<small>FINANCIAL TECHNOLOGY · UCSI</small></span>
          </Link>
          <ul className="sf-navlinks">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <button className="sf-menu" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen} aria-controls="outline-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && <nav id="outline-mobile-nav" className="sf-mobile sf-wrap" aria-label="Mobile navigation">
          {navItems.map((item) => <Link key={item.id} href={`/#${item.id}`}>{item.label}</Link>)}
        </nav>}
      </header>
      <main className="sf-outline-main" id="project-main">
        <div className="sf-wrap">
          <div className="sf-outline-back-row">
            <Link className="sf-outline-back" href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Back to projects</Link>
            <span className="sf-outline-index">PROJECT NOTE&nbsp; / &nbsp;01</span>
          </div>

          <section className="sf-outline-heading" aria-labelledby="project-title">
            <div>
              <p className="sf-kicker sf-outline-kicker">Financial technology · Example outline</p>
              <h1 id="project-title">Financial Tracker and Budgetting App</h1>
            </div>
            <Dialog.Root open={unavailableOpen} onOpenChange={setUnavailableOpen}>
              <Dialog.Trigger asChild>
                <button className="sf-primary sf-outline-view" type="button" data-testid="button-view-project">
                  View Project <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="sf-dialog-overlay" />
                <Dialog.Content className="sf-dialog" aria-describedby="project-link-description">
                  <Dialog.Title asChild><h2>Project link unavailable</h2></Dialog.Title>
                  <Dialog.Description className="sf-dialog-desc" id="project-link-description">
                    No live project destination has been provided, so this button does not open an external page.
                  </Dialog.Description>
                  <p className="sf-dialog-body">This outline is a reference-based example and is awaiting final project content.</p>
                  <Dialog.Close className="sf-dialog-close" aria-label="Close dialog"><X size={18} /></Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </section>

          <p className="sf-outline-notice" role="note" data-testid="status-project-example">
            <span className="sf-outline-notice-mark" aria-hidden="true">i</span>
            This outline contains example and placeholder material from the reference page. Final project content is still being prepared.
          </p>

          <section className="sf-outline-overview" aria-labelledby="overview-title">
            <div className="sf-outline-overview-copy">
              <div className="sf-outline-section-heading">
                <span className="sf-outline-number">01</span>
                <h2 id="overview-title">Project Overview</h2>
              </div>
              <p className="sf-outline-prose" data-testid="text-project-overview">{overview}</p>
              <dl className="sf-outline-metadata" aria-label="Project details">
                <div className="sf-outline-meta-item">
                  <dt>Tools</dt>
                  <dd>Python | SQL | Google Colab | VsCode |  </dd>
                </div>
                <div className="sf-outline-meta-item">
                  <dt>Timeline</dt>
                  <dd>12 Weeks</dd>
                </div>
                <div className="sf-outline-meta-item">
                  <dt>Platform</dt>
                  <dd>Web &amp; Mobile</dd>
                </div>
                <div className="sf-outline-meta-item">
                  <dt>Focus</dt>
                  <dd>Financial Tracking</dd>
                </div>
              </dl>
              <div className="sf-outline-summary-grid">
                <article>
                  <h3>Goal</h3>
                  <p>Automate financial management for individuals.</p>
                </article>
                <article>
                  <h3>Process</h3>
                  <p>User research, prototyping, and iterative testing.</p>
                </article>
                <article>
                  <h3>Insights</h3>
                  <p>Simplicity drives long-term user retention.</p>
                </article>
              </div>
            </div>
            <figure className="sf-outline-figure">
              <img
                src={import.meta.env.BASE_URL + "images/project-financial-tracker.jpg"}
                alt="Abstract network and technology illustration used as a project reference image"
                data-testid="img-project-illustration"
              />
              <figcaption>Illustrative image · not financial data</figcaption>
            </figure>
          </section>

          <section className="sf-outline-text-section" aria-labelledby="problem-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">02</span>
              <h2 id="problem-title">Problem Statement</h2>
            </div>
            <p className="sf-outline-prose">{overview}</p>
          </section>

          <section className="sf-outline-text-section sf-outline-workflow" aria-labelledby="workflow-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">03</span>
              <h2 id="workflow-title">Project Workflow</h2>
            </div>
            <p className="sf-outline-prose">{overview}</p>
          </section>

          <div className="sf-outline-end">
            <span>End of project outline</span>
            <Link href="/#projects">Return to selected work <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </main>
      <SiteFooter
        onNavigate={navigateHome}
        homeHref={import.meta.env.BASE_URL}
      />
    </div>
  );
}
