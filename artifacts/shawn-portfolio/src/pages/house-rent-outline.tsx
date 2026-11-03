import "@/styles/signature-fintech.css";
import "@/styles/project-outline.css";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Menu, MonitorSmartphone, Target, Wrench, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { profile } from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function HouseRentOutline() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    const createdDescription = !description;
    const pageDescription = "Placeholder project outline for predictive analytics and house rent estimation by Shawn Stephen Abok.";
    const meta = description ?? document.createElement("meta");

    if (createdDescription) {
      meta.name = "description";
      document.head.appendChild(meta);
    }
    document.title = "Predictive Analytics for House Rent Estimation | " + profile.name;
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
    <div className="sf-page sf-outline-page sf-house-rent-outline-page">
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
          <button className="sf-menu" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen} aria-controls="house-rent-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && <nav id="house-rent-mobile-nav" className="sf-mobile sf-wrap" aria-label="Mobile navigation">
          <Link href="/#home">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#education">Education</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact">Contact</Link>
        </nav>}
      </header>

      <main className="sf-outline-main" id="project-main">
        <div className="sf-wrap">
          <div className="sf-outline-back-row">
            <Link className="sf-outline-back" href="/projects"><ArrowLeft size={16} aria-hidden="true" /><span>Back to projects</span></Link>
            <span className="sf-outline-index">PROJECT NOTE&nbsp; / &nbsp;02</span>
          </div>

          <section className="sf-outline-heading" aria-labelledby="project-title">
            <div>
              <p className="sf-kicker sf-outline-kicker">Financial technology · Predictive analytics</p>
              <h1 id="project-title">Predictive Analytics for House Rent Estimation</h1>
            </div>
            <span className="sf-outline-view sf-outline-view-pending" role="status">Project link pending</span>
          </section>

          <section className="sf-outline-overview" aria-labelledby="overview-title">
            <div className="sf-outline-overview-copy">
              <div className="sf-outline-section-heading">
                <span className="sf-outline-number">01</span>
                <h2 id="overview-title">Project Overview</h2>
              </div>
              <p className="sf-outline-prose sf-overview-prose">Placeholder: Add a concise overview of the project, the data it uses, and the rent-estimation problem it aims to address.</p>
              <section className="sf-outline-details" aria-labelledby="project-details-title">
                <h3 className="sf-outline-group-heading" id="project-details-title">Project details</h3>
                <dl className="sf-outline-metadata" aria-label="Project details">
                  <div className="sf-outline-meta-item">
                    <Wrench className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Tools</dt>
                      <dd>Placeholder: Add tools used</dd>
                    </div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <CalendarDays className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Project Type</dt>
                      <dd>Placeholder: Add project format</dd>
                    </div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <MonitorSmartphone className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Platform</dt>
                      <dd>Placeholder: Add analysis environment</dd>
                    </div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <Target className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Focus</dt>
                      <dd>Placeholder: Add the project’s main focus</dd>
                    </div>
                  </div>
                </dl>
              </section>
            </div>
            <figure className="sf-outline-figure">
              <a
                className="sf-outline-image-link"
                href={import.meta.env.BASE_URL + "images/predictive-house-rent.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the house rent estimation image at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/predictive-house-rent.png"}
                  alt="A yellow house in front of chart bars with rising and falling arrows, representing house rent prediction"
                  data-testid="img-house-rent-project"
                />
              </a>
              <figcaption>
                <a href={import.meta.env.BASE_URL + "images/predictive-house-rent.png"} target="_blank" rel="noreferrer">
                  Open full-size image
                </a>
              </figcaption>
            </figure>
            <section className="sf-outline-summary" aria-labelledby="project-summary-title">
              <h3 className="sf-outline-group-heading" id="project-summary-title">Summary</h3>
              <div className="sf-outline-summary-grid">
                <article>
                  <h4>Goal</h4>
                  <p>Placeholder: State the project’s intended rent-estimation goal.</p>
                </article>
                <article>
                  <h4>Process</h4>
                  <p>Placeholder: Summarise the data preparation, feature selection, modelling, and validation process.</p>
                </article>
                <article>
                  <h4>Results</h4>
                  <ul>
                    <li>Placeholder: Add verified model performance and evaluation metrics.</li>
                    <li>Placeholder: Summarise the key factors used in the rent estimates.</li>
                    <li>Placeholder: Note the project’s limitations and findings.</li>
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
            <p className="sf-outline-prose sf-problem-statement-copy">Placeholder: Describe the house-rent estimation problem, who would use the estimates, and what information is currently difficult to assess.</p>
          </section>

          <section className="sf-outline-text-section sf-outline-workflow" aria-labelledby="workflow-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">03</span>
              <h2 id="workflow-title">Project Workflow</h2>
            </div>
            <figure className="sf-outline-workflow-figure">
              <div className="sf-outline-workflow-placeholder" role="note">
                Placeholder: Add a workflow diagram showing data preparation, model training, evaluation, and rent estimation.
              </div>
              <figcaption>Workflow visual placeholder.</figcaption>
            </figure>
          </section>

          <section className="sf-outline-text-section" aria-labelledby="project-outcome-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">04</span>
              <h2 id="project-outcome-title">Project Outcome</h2>
            </div>
            <div className="sf-rent-result-list">
              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 1: Placeholder finding title</h3>
                <p className="sf-rent-result-copy">Placeholder: Add a brief explanation of the first result, the evidence behind it, and what it means.</p>
                <figure className="sf-rent-result-figure">
                  <div className="sf-rent-result-image-placeholder" role="img" aria-label="Placeholder image for Result 1">
                    <span>Result 1 image placeholder</span>
                  </div>
                  <figcaption>Add a chart, model output, or other supporting image.</figcaption>
                </figure>
              </article>

              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 2: Placeholder finding title</h3>
                <p className="sf-rent-result-copy">Placeholder: Explain a second verified result and include any context needed to interpret it.</p>
                <figure className="sf-rent-result-figure">
                  <div className="sf-rent-result-image-placeholder" role="img" aria-label="Placeholder image for Result 2">
                    <span>Result 2 image placeholder</span>
                  </div>
                  <figcaption>Add a chart, model output, or other supporting image.</figcaption>
                </figure>
              </article>

              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 3: Placeholder finding title</h3>
                <p className="sf-rent-result-copy">Placeholder: Summarise another result, noting its relevance and any limitations.</p>
                <figure className="sf-rent-result-figure">
                  <div className="sf-rent-result-image-placeholder" role="img" aria-label="Placeholder image for Result 3">
                    <span>Result 3 image placeholder</span>
                  </div>
                  <figcaption>Add a chart, model output, or other supporting image.</figcaption>
                </figure>
              </article>
            </div>
          </section>

          <div className="sf-outline-end">
            <span>End of project outline</span>
            <Link href="/projects"><span>Return to all projects</span><ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </main>
      <SiteFooter onNavigate={navigateHome} homeHref={import.meta.env.BASE_URL} />
    </div>
  );
}
