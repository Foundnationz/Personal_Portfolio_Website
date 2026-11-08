import "@/styles/signature-fintech.css";
import "@/styles/projects.css";
import "@/styles/portfolio-typography.css";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { profile } from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function ProjectsPage() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const pageDescription = "A collection of example and in-progress FinTech project outlines by Shawn Stephen Abok, a final-year Financial Technology student.";
    document.title = "Projects | " + profile.name;
    const metadata: [string, string, string][] = [
      ["name", "description", pageDescription],
      ["property", "og:title", document.title],
      ["property", "og:description", pageDescription],
      ["name", "twitter:title", document.title],
      ["name", "twitter:description", pageDescription],
    ];
    const restoreMetadata = metadata.map(([attribute, key, content]) => {
      const existing = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const meta = existing ?? document.createElement("meta");
      const previousContent = meta.getAttribute("content");
      meta.setAttribute(attribute, key);
      meta.content = content;
      if (!existing) document.head.appendChild(meta);
      return () => {
        if (!existing) meta.remove();
        else if (previousContent === null) meta.removeAttribute("content");
        else meta.content = previousContent;
      };
    });
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      document.title = previousTitle;
      restoreMetadata.forEach((restore) => restore());
    };
  }, []);

  const navigateHome = (id: string) => setLocation(`/#${id}`);

  return (
    <div className="sf-page projects-page">
      <a className="sf-skip" href="#projects-main">Skip to project collection</a>
      <header className="sf-header">
        <nav className="sf-wrap sf-nav" aria-label="Primary navigation">
          <Link className="sf-brand" href="/#home" aria-label={`${profile.name}, home`}>
            <span className="sf-brand-mark" aria-hidden="true">s.</span>
            <span className="sf-brand-text"><span>Shawn Stephen Abok</span><small>FINANCIAL TECHNOLOGY · UCSI</small></span>
          </Link>
          <ul className="sf-navlinks">
            <li><Link href="/#home">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#skills">Skills</Link></li>
            <li><Link href="/#education">Education</Link></li>
            <li><Link href="/projects" aria-current="page">Projects</Link></li>
            <li><Link href="/#experience">Experience</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <button
            className="sf-menu"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="projects-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-toggle-project-navigation"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
        {menuOpen && (
          <nav id="projects-mobile-nav" className="sf-mobile sf-wrap" aria-label="Mobile navigation">
            <Link href="/#home">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#skills">Skills</Link>
            <Link href="/#education">Education</Link>
            <Link href="/projects" aria-current="page" onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        )}
      </header>
      <main className="projects-main" id="projects-main">
        <div className="sf-wrap projects-wrap">
          <div className="projects-return-row">
            <Link className="projects-return-link" href="/#home" data-testid="link-return-home">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Return home</span>
            </Link>
            <span className="projects-index">WORK COLLECTION / 04 ENTRIES</span>
          </div>

          <section className="projects-intro" aria-labelledby="projects-title">
            <p className="projects-kicker">Financial technology · Selected work</p>
            <h1 id="projects-title">Projects, in progress.</h1>
            <p className="projects-lede">A small collection of finance-focused examples and developing ideas. Project notes are labelled clearly where material is illustrative or still being prepared.</p>
            <div className="projects-intro-rule">
              <span>Four project notes</span>
              <span>Updated as work develops</span>
            </div>
          </section>

          <section className="projects-collection" aria-label="All projects">
            <article className="projects-card projects-card-ledger" data-testid="card-project-ledger-reconciliation">
              <div className="projects-card-art projects-card-art-contained">
                <img
                  src={import.meta.env.BASE_URL + "images/financial-tracker-budgeting-illustration.png"}
                  alt="Illustration of a person saving money beside a budgeting planner and calculator"
                  loading="lazy"
                  decoding="async"
                />
                <span className="projects-art-caption">PERSONAL FINANCE</span>
              </div>
              <div className="projects-card-copy">
                <div className="projects-card-meta">
                  <span className="sf-example sf-example-light">Example</span>
                </div>
                <h2 className="projects-card-title">Financial Tracker &amp; Budgeting App</h2>
                <p className="projects-card-description">Finance Tracker is a Python desktop app for Gen Z users to manage spending, budgets, subscriptions, and savings goals, with visual dashboards and explainable financial guidance.</p>
                <Link className="projects-card-action" href="/projects/ledger-reconciliation" data-testid="link-project-ledger-reconciliation">
                  <span>View project outline</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="projects-card projects-card-house" data-testid="card-project-house-rent-estimation">
              <div className="projects-card-art projects-card-art-contained">
                <img
                  src={import.meta.env.BASE_URL + "images/predictive-house-rent.png"}
                  alt="A yellow house in front of chart bars with rising and falling arrows, representing house rent prediction"
                  loading="lazy"
                  decoding="async"
                />
                <span className="projects-art-caption">HOUSE RENT ESTIMATION · CONCEPT VISUAL</span>
              </div>
              <div className="projects-card-copy">
                <div className="projects-card-meta">
                  <span>FinTech Research</span>
                  <span className="sf-example sf-example-light">Example</span>
                </div>
                <h2 className="projects-card-title">Predictive Analytics for House Rent Estimation</h2>
                <p className="projects-card-description">Predicting monthly rent across six Indian cities with linear regression, using a log-transformed target, and recommending city, size and furnishing as the key pricing factors.</p>
                <Link className="projects-card-action" href="/projects/house-rent-estimation" data-testid="link-project-house-rent-outline">
                  <span>View project outline</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="projects-card projects-card-placeholder" data-testid="card-placeholder-cash-flow-notes">
              <div className="projects-card-art projects-card-art-photo">
                <img
                  src={import.meta.env.BASE_URL + "images/cash-flow-analysis.png"}
                  alt="Financial analyst reviewing charts, spreadsheets, and market data"
                  loading="lazy"
                  decoding="async"
                />
                <span className="projects-art-caption">FINANCIAL ANALYSIS</span>
              </div>
              <div className="projects-card-copy">
                <div className="projects-card-meta">
                  <span>Personal finance</span>
                  <span className="projects-placeholder-badge">Additional placeholder project</span>
                </div>
                <h2 className="projects-card-title">Building Integrated Financial Statements for Colgate-Palmolive</h2>
                <p className="projects-card-description">Integrated pro forma financials for Colgate-Palmolive (2024 base case): percent-of-sales assumptions, a regression-driven cost forecast, automatic integrity checks, and a full report covering method, sensitivity analysis and limitations.</p>
                <Link className="projects-card-action" href="/projects/cash-flow-scenario-notes" data-testid="link-project-cash-flow-notes">
                  <span>View project outline</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article className="projects-card projects-card-placeholder" data-testid="card-placeholder-market-data-log">
              <div className="projects-card-art projects-card-art-contained">
                <img
                  src={import.meta.env.BASE_URL + "images/aglow-technology-logo.png"}
                  alt="Aglow Technology logo, also shown beside the accounting project overview"
                  loading="lazy"
                  decoding="async"
                />
                <span className="projects-art-caption">ACCOUNTING · FINANCIAL STATEMENTS</span>
              </div>
              <div className="projects-card-copy">
                <div className="projects-card-meta">
                  <span>Market research</span>
                  <span className="projects-placeholder-badge">Additional placeholder project</span>
                </div>
                <h2 className="projects-card-title">From Source Documents to Financial Statements: A Q1 2023 Accounting Project</h2>
                <p className="projects-card-description">A placeholder for future notes on reading financial market data, without claims of completed analysis.</p>
                <Link className="projects-card-action" href="/projects/source-documents-financial-statements" data-testid="link-project-source-statements-outline">
                  <span>View project outline</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>

          </section>

          <div className="projects-endnote">
            <span>Project collection / end</span>
            <Link href="/#home" data-testid="link-projects-end-home">
              <span>Back to Shawn’s homepage</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter onNavigate={navigateHome} homeHref={import.meta.env.BASE_URL} />
    </div>
  );
}
