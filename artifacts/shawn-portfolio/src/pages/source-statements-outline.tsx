import "@/styles/signature-fintech.css";
import "@/styles/project-outline.css";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Menu, MonitorSmartphone, Target, Wrench, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { profile } from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function SourceStatementsOutline() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    const createdDescription = !description;
    const pageDescription = "Project outline with editable placeholders for the Q1 2023 accounting project by Shawn Stephen Abok.";
    const meta = description ?? document.createElement("meta");

    if (createdDescription) {
      meta.name = "description";
      document.head.appendChild(meta);
    }
    document.title = "From Source Documents to Financial Statements | " + profile.name;
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
    <div className="sf-page sf-outline-page sf-source-statements-outline-page">
      <a className="sf-skip" href="#project-main">Skip to project content</a>
      <header className="sf-header">
        <nav className="sf-wrap sf-nav" aria-label="Primary navigation">
          <Link className="sf-brand" href={import.meta.env.BASE_URL} aria-label={`${profile.name}, home`}>
            <span className="sf-brand-mark" aria-hidden="true">s.</span>
            <span className="sf-brand-text"><span>Shawn Stephen Abok</span><small>FINANCIAL TECHNOLOGY · UCSI</small></span>
          </Link>
          <ul className="sf-navlinks">
            <li><Link href="/#home">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#skills">Skills</Link></li>
            <li><Link href="/#education">Education</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/#experience">Experience</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <button
            className="sf-menu"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="source-statements-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && (
          <nav id="source-statements-mobile-nav" className="sf-mobile sf-wrap" aria-label="Mobile navigation">
            <Link href="/#home">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#skills">Skills</Link>
            <Link href="/#education">Education</Link>
            <Link href="/#projects">Projects</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        )}
      </header>

      <main className="sf-outline-main" id="project-main">
        <div className="sf-wrap">
          <div className="sf-outline-back-row">
            <Link className="sf-outline-back" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to projects</span>
            </Link>
            <span className="sf-outline-index">PROJECT NOTE&nbsp; / &nbsp;04</span>
          </div>

          <section className="sf-outline-heading" aria-labelledby="project-title">
            <div>
              <p className="sf-kicker sf-outline-kicker">Accounting · Financial reporting</p>
              <h1 id="project-title">From Source Documents to Financial Statements: A Q1 2023 Accounting Project</h1>
            </div>
          </section>

          <section className="sf-outline-overview" aria-labelledby="overview-title">
            <div className="sf-outline-overview-copy">
              <div className="sf-outline-section-heading">
                <span className="sf-outline-number">01</span>
                <h2 id="overview-title">Project Overview</h2>
              </div>
              <p className="sf-outline-prose sf-overview-prose">Placeholder: Add a concise overview of the project, its purpose, and the financial statements or accounting work it covers.</p>
              <section className="sf-outline-details" aria-labelledby="project-details-title">
                <h3 className="sf-outline-group-heading" id="project-details-title">Project details</h3>
                <dl className="sf-outline-metadata" aria-label="Project details">
                  <div className="sf-outline-meta-item">
                    <Wrench className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div><dt>Tools</dt><dd>Placeholder: Add tools used</dd></div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <CalendarDays className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div><dt>Project Type</dt><dd>Placeholder: Add project format</dd></div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <MonitorSmartphone className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div><dt>Platform</dt><dd>Placeholder: Add the analysis or work environment</dd></div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <Target className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div><dt>Focus</dt><dd>Placeholder: Add the project’s main focus</dd></div>
                  </div>
                </dl>
              </section>
            </div>
            <figure className="sf-outline-figure">
              <div className="sf-outline-workflow-placeholder sf-source-cover-placeholder" role="img" aria-label="Placeholder for the project overview image">
                Placeholder: Add a representative project image.
              </div>
              <figcaption>Project overview image placeholder</figcaption>
            </figure>

            <section className="sf-outline-summary" aria-labelledby="project-summary-title">
              <h3 className="sf-outline-group-heading" id="project-summary-title">Summary</h3>
              <div className="sf-outline-summary-grid">
                <article>
                  <h4>Goal</h4>
                  <p>Placeholder: Describe the project goal.</p>
                </article>
                <article>
                  <h4>Process</h4>
                  <p>Placeholder: Summarize the accounting process, source materials, and methods used.</p>
                </article>
                <article>
                  <h4>Results</h4>
                  <ul>
                    <li>Placeholder: Add a key project result.</li>
                    <li>Placeholder: Add another result or learning.</li>
                  </ul>
                </article>
              </div>
            </section>
          </section>

          <section className="sf-outline-text-section" aria-labelledby="problem-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">02</span>
              <h2 id="problem-title">Problem Statement</h2>
            </div>
            <p className="sf-outline-prose sf-problem-statement-copy">Placeholder: Explain the accounting question, reporting need, or problem this project set out to address.</p>
          </section>

          <section className="sf-outline-text-section sf-outline-workflow" aria-labelledby="workflow-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">03</span>
              <h2 id="workflow-title">Project Workflow</h2>
            </div>
            <figure className="sf-outline-workflow-figure">
              <div className="sf-outline-workflow-placeholder" role="img" aria-label="Placeholder for the project workflow diagram">
                Placeholder: Add the project workflow, steps, and supporting notes.
              </div>
              <figcaption>Project workflow image placeholder</figcaption>
            </figure>
          </section>

          <section className="sf-outline-text-section" aria-labelledby="project-outcome-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">04</span>
              <h2 id="project-outcome-title">Project Outcome</h2>
            </div>
            <div className="sf-project-outcome-groups">
              <section className="sf-project-outcome-group" aria-labelledby="source-result-1">
                <h3 id="source-result-1">Result 1: Placeholder finding title</h3>
                <ul><li>Placeholder: Explain the first result, its evidence, and what it means.</li></ul>
                <figure className="sf-source-result-figure">
                  <div className="sf-outline-workflow-placeholder" role="img" aria-label="Placeholder for the first result image">Result 1 image placeholder</div>
                  <figcaption>Result 1 image placeholder</figcaption>
                </figure>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="source-result-2">
                <h3 id="source-result-2">Result 2: Placeholder finding title</h3>
                <ul><li>Placeholder: Explain the second result, its evidence, and what it means.</li></ul>
                <figure className="sf-source-result-figure">
                  <div className="sf-outline-workflow-placeholder" role="img" aria-label="Placeholder for the second result image">Result 2 image placeholder</div>
                  <figcaption>Result 2 image placeholder</figcaption>
                </figure>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="source-result-3">
                <h3 id="source-result-3">Result 3: Placeholder finding title</h3>
                <ul><li>Placeholder: Explain the third result, its evidence, and what it means.</li></ul>
                <figure className="sf-source-result-figure">
                  <div className="sf-outline-workflow-placeholder" role="img" aria-label="Placeholder for the third result image">Result 3 image placeholder</div>
                  <figcaption>Result 3 image placeholder</figcaption>
                </figure>
              </section>
            </div>
          </section>

          <div className="sf-outline-end">
            <span>End of project outline</span>
            <Link href="/projects">
              <span>Return to all projects</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter onNavigate={navigateHome} homeHref={import.meta.env.BASE_URL} />
    </div>
  );
}
