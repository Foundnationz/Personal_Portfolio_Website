import "@/styles/signature-fintech.css";
import "@/styles/project-outline.css";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Github, Menu, MonitorSmartphone, Target, Wrench, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { profile } from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function ProjectOutline() {
  const [, setLocation] = useLocation();
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
            aria-expanded={menuOpen} aria-controls="outline-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && <nav id="outline-mobile-nav" className="sf-mobile sf-wrap" aria-label="Mobile navigation">
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
            <Link className="sf-outline-back" href="/#projects"><ArrowLeft size={16} aria-hidden="true" /><span>Back to projects</span></Link>
            <span className="sf-outline-index">PROJECT NOTE&nbsp; / &nbsp;01</span>
          </div>

          <section className="sf-outline-heading" aria-labelledby="project-title">
            <div>
              <p className="sf-kicker sf-outline-kicker">Financial technology · Example outline</p>
              <h1 id="project-title">Financial Tracker and Budgetting App</h1>
            </div>
            <a
              className="sf-primary sf-outline-view"
              href="https://github.com/Foundnationz/finance-tracker"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-view-project"
              aria-label="View project detail on GitHub (opens in a new tab)"
            >
              <Github size={16} aria-hidden="true" />
              <span>View Project Detail</span><ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </section>

          <p className="sf-outline-notice" role="note" data-testid="status-project-example">
            <span className="sf-outline-notice-mark" aria-hidden="true">i</span>
            <span>This outline contains example and placeholder material from the reference page. Final project content is still being prepared.</span>
          </p>

          <section className="sf-outline-overview" aria-labelledby="overview-title">
            <div className="sf-outline-overview-copy">
              <div className="sf-outline-section-heading">
                <span className="sf-outline-number">01</span>
                <h2 id="overview-title">Project Overview</h2>
              </div>
              <p className="sf-outline-prose sf-overview-prose text-justify" data-testid="text-project-overview">Finance Tracker is a personal finance application designed with Generation Z users in mind. It combines account management, transaction tracking, budgets, subscriptions, savings goals, and financial visualisations with motivational features and explainable, rule-based guidance.</p>
              <section className="sf-outline-details" aria-labelledby="project-details-title">
                <h3 className="sf-outline-group-heading" id="project-details-title">Project details</h3>
                <dl className="sf-outline-metadata" aria-label="Project details">
                  <div className="sf-outline-meta-item">
                    <Wrench className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Tools</dt>
                      <dd>Product Design</dd>
                    </div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <CalendarDays className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Project Object</dt>
                      <dd>12 Weeks</dd>
                    </div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <MonitorSmartphone className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Platform</dt>
                      <dd>Web &amp; Mobile</dd>
                    </div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <Target className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div>
                      <dt>Focus</dt>
                      <dd>Financial Tracking</dd>
                    </div>
                  </div>
                </dl>
              </section>
            </div>
            <figure className="sf-outline-figure">
              <a
                className="sf-outline-image-link"
                href={import.meta.env.BASE_URL + "images/financial-tracker-dashboard.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the financial tracker dashboard image at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/financial-tracker-dashboard.png"}
                  alt="Financial tracker app dashboard showing total balance, income, expenses, and monthly spending"
                  data-testid="img-project-illustration"
                />
              </a>
              <figcaption>
                <a href={import.meta.env.BASE_URL + "images/financial-tracker-dashboard.png"} target="_blank" rel="noreferrer">
                  Open full-size image
                </a>
              </figcaption>
            </figure>
            <section className="sf-outline-summary" aria-labelledby="project-summary-title">
              <h3 className="sf-outline-group-heading" id="project-summary-title">Summary</h3>
              <div className="sf-outline-summary-grid">
                <article>
                  <h4>Goal</h4>
                  <p>Automate financial management for individuals.</p>
                </article>
                <article>
                  <h4>Process</h4>
                  <p>User research, prototyping, and iterative testing.</p>
                </article>
                <article>
                  <h4>Insights</h4>
                  <p>Simplicity drives long-term user retention.</p>
                </article>
              </div>
            </section>
          </section>

          <section className="sf-outline-text-section" aria-labelledby="problem-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">02</span>
              <h2 id="problem-title">Problem Statement</h2>
            </div>
            <p className="sf-outline-prose text-justify sf-problem-statement-copy">        Generation Z users may struggle to maintain consistent financial records, monitor recurring expenses, and translate spending information into practical budgeting decisions. Financial tools that separate transaction tracking, subscription management, savings goals, and understandable guidance can make these tasks difficult to manage together. This project addresses the need for an accessible personal finance application that combines these functions with clear visualisations, motivational features, and explainable, rule-based suggestions.</p>
          </section>

          <section className="sf-outline-text-section sf-outline-workflow" aria-labelledby="workflow-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">03</span>
              <h2 id="workflow-title">Project Workflow</h2>
            </div>
            <figure className="sf-outline-workflow-figure">
              <a
                href={import.meta.env.BASE_URL + "images/financial-app-development-lifecycle.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the financial app development lifecycle diagram at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/financial-app-development-lifecycle.png"}
                  alt="Financial app development lifecycle: original final-year project phases A and B, post-submission desktop development steps 1 through 13, and a scope note"
                  data-testid="img-project-workflow"
                />
              </a>
              <figcaption>Select the diagram to view it at full size.</figcaption>
            </figure>
          </section>

          <section className="sf-outline-text-section" aria-labelledby="project-outcome-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">04</span>
              <h2 id="project-outcome-title">Project Outcome</h2>
            </div>
            <div className="sf-project-outcome-groups">
              <section className="sf-project-outcome-group" aria-labelledby="outcome-desktop-title">
                <h3 id="outcome-desktop-title">Desktop Application Development</h3>
                <ul>
                  <li>Migrated the original Google Colab prototype into a local desktop application using Python, Tkinter, and SQLite.</li>
                  <li>Integrated account management, transaction tracking, budgets, subscriptions, wishlist goals, and financial visualisations within one interface.</li>
                </ul>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="outcome-records-title">
                <h3 id="outcome-records-title">Financial Record Management</h3>
                <ul>
                  <li>Added editing controls, transaction notes, references, tags, and Need/Want classification.</li>
                  <li>Improved budget calculations through consistent calendar periods, clearer spending breakdowns, and recorded monthly settings history.</li>
                  <li>Unified subscription and recurring-transaction processing with stable history links and duplicate-occurrence protection.</li>
                </ul>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="outcome-guidance-title">
                <h3 id="outcome-guidance-title">Explainable Financial Guidance</h3>
                <ul>
                  <li>Implemented rule-based Dashboard suggestions covering budget allowances, spending changes, upcoming expenses, and subscription commitments.</li>
                  <li>Added Needs/Wants reflection, repeated-spending review, historical budget comparisons, and data-quality notices.</li>
                  <li>Displayed relevant calculations, date ranges, and limitations to help users interpret the guidance.</li>
                </ul>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="outcome-usability-title">
                <h3 id="outcome-usability-title">Usability and Privacy Controls</h3>
                <ul>
                  <li>Organised the Dashboard into Overview, Period Insights, and Current Planning tabs.</li>
                  <li>Improved chart readability, scrolling, password confirmation, and password-visibility controls.</li>
                  <li>Added password-confirmed self-service account deletion while preserving other users’ records.</li>
                </ul>
              </section>
            </div>
          </section>

          <div className="sf-outline-end">
            <span>End of project outline</span>
            <Link href="/#projects"><span>Return to selected work</span><ArrowRight size={15} aria-hidden="true" /></Link>
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
