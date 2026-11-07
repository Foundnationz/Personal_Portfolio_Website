import "@/styles/signature-fintech.css";
import "@/styles/project-outline.css";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Github, Menu, MonitorSmartphone, Target, Wrench, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { profile } from "@/data/portfolio";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function CashFlowOutline() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    const createdDescription = !description;
    const pageDescription = "Placeholder outline for the Cash Flow Scenario Notes project by Shawn Stephen Abok.";
    const meta = description ?? document.createElement("meta");

    if (createdDescription) {
      meta.name = "description";
      document.head.appendChild(meta);
    }
    document.title = "Cash Flow Scenario Notes | " + profile.name;
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
    <div className="sf-page sf-outline-page sf-cashflow-outline-page">
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
            aria-expanded={menuOpen} aria-controls="cash-flow-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen && <nav id="cash-flow-mobile-nav" className="sf-mobile sf-wrap" aria-label="Mobile navigation">
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
            <span className="sf-outline-index">PROJECT NOTE&nbsp; / &nbsp;03</span>
          </div>

          <section className="sf-outline-heading" aria-labelledby="project-title">
            <div>
              <p className="sf-kicker sf-outline-kicker">Financial technology · Personal finance</p>
              <h1 id="project-title">Building Integrated Financial Statements for Colgate-Palmolive</h1>
            </div>
            <a
              className="sf-primary sf-outline-view"
              href="https://github.com/Foundnationz/colgate-pro-forma-model_v2.git"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-view-cash-flow-project"
              aria-label="View project detail on GitHub (opens in a new tab)"
            >
              <Github size={16} aria-hidden="true" />
              <span>View Project Detail</span><ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </section>

          <section className="sf-outline-overview" aria-labelledby="overview-title">
            <div className="sf-outline-overview-copy">
              <div className="sf-outline-section-heading">
                <span className="sf-outline-number">01</span>
                <h2 id="overview-title">Project Overview</h2>
              </div>
              <p className="sf-outline-prose sf-overview-prose text-justify" data-testid="text-cash-flow-overview">Built a three-statement pro forma model of Colgate-Palmolive for 2024 in Excel, using five years of reported financials and the percent-of-sales method. Costs were forecast with a regression on sales, and built-in checks confirm the statements tie together. The base case projects 2024 sales of $19.2 billion and profit after tax of $2.7 billion, and sensitivity tests show that profit depends far more on the cost-to-sales relationship than on sales growth. Includes the Excel model, a written report and Python-generated charts.</p>
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
                    <div><dt>Platform</dt><dd>Placeholder: Add the analysis or build environment</dd></div>
                  </div>
                  <div className="sf-outline-meta-item">
                    <Target className="sf-outline-meta-icon" size={18} aria-hidden="true" />
                    <div><dt>Focus</dt><dd>Placeholder: Add the project’s main focus</dd></div>
                  </div>
                </dl>
              </section>
            </div>

            <figure className="sf-outline-figure">
              <a
                className="sf-outline-image-link"
                href={import.meta.env.BASE_URL + "images/financial-tracker-budgeting-illustration.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the financial planning illustration at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/financial-tracker-budgeting-illustration.png"}
                  alt="Illustration of a person saving money beside a budgeting planner and calculator"
                  data-testid="img-cash-flow-project"
                />
              </a>
              <figcaption>
                <a href={import.meta.env.BASE_URL + "images/financial-tracker-budgeting-illustration.png"} target="_blank" rel="noreferrer">
                  Open full-size image
                </a>
              </figcaption>
            </figure>

            <section className="sf-outline-summary" aria-labelledby="project-summary-title">
              <h3 className="sf-outline-group-heading" id="project-summary-title">Summary</h3>
              <div className="sf-outline-summary-grid">
                <article>
                  <h4>Goal</h4>
                  <p>The goal of this project is to build a clear, verified pro forma forecast of Colgate-Palmolive’s 2024 income statement, balance sheet and cash flow statement from its 2018 to 2022 financials, and to show which assumptions matter most to the result.</p>
                </article>
                <article>
                  <h4>Process</h4>
                  <p>Placeholder: Summarise the methods, tools, and steps used in the project.</p>
                  <ul>
                    <li>Placeholder: Add the first project step</li>
                    <li>Placeholder: Add the next project step</li>
                    <li>Placeholder: Add the final project step</li>
                  </ul>
                </article>
                <article>
                  <h4>Results</h4>
                  <p>Placeholder: Summarise the main findings or deliverables.</p>
                  <ul>
                    <li>Placeholder: Add a key result</li>
                    <li>Placeholder: Add another result</li>
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
            <p className="sf-outline-prose sf-problem-statement-copy">Forecasting a company’s finances is only useful if the three statements agree with each other and the assumptions behind them are clear. This project asks how Colgate-Palmolive’s 2024 results can be projected from its 2018 to 2022 financials, and which assumptions matter most.</p>
            <ul className="sf-problem-questions">
              <li>How can the income statement, balance sheet and cash flow statement be forecast so they balance and tie together?</li>
              <li>How should operating costs be projected when they rose almost as fast as sales?</li>
              <li>How sensitive is 2024 profit to sales growth, the cost relationship, tax and interest?</li>
              <li>How close does the forecast come to Colgate’s reported 2023 results, and what are its limits?</li>
            </ul>
          </section>

          <section className="sf-outline-text-section sf-outline-workflow" aria-labelledby="workflow-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">03</span>
              <h2 id="workflow-title">Project Workflow</h2>
            </div>
            <figure className="sf-outline-workflow-figure">
              <a
                href={import.meta.env.BASE_URL + "images/colgate-workflow.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the Colgate-Palmolive project workflow diagram at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/colgate-workflow.png"}
                  alt="Colgate-Palmolive project workflow, from the original group assignment through post-submission improvements and publication"
                  data-testid="img-cash-flow-workflow"
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
              <section className="sf-project-outcome-group" aria-labelledby="cash-flow-result-1">
                <h3 id="cash-flow-result-1">Result 1: Costs rose almost as fast as sales</h3>
                <ul><li>Operating costs track sales almost one for one, with a regression slope of 0.94 and an R² of 0.97. Each extra dollar of sales therefore adds only about six cents of EBITDA. This is the assumption that drives the whole forecast, and the EBITDA margin falls from 26.5% in 2018 to 22.7% in 2022 and 21.1% in 2027 as a result.</li></ul>
                <figure className="sf-cashflow-result-figure">
                  <a
                    href={import.meta.env.BASE_URL + "images/colgate-result-2.png"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open the Colgate-Palmolive result 2 charts at full size"
                  >
                    <img
                      src={import.meta.env.BASE_URL + "images/colgate-result-2.png"}
                      alt="Charts showing forecast EBITDA margin and the relationship between operating costs and sales"
                      data-testid="img-cash-flow-result-1"
                    />
                  </a>
                  <figcaption>Select the image to view it at full size.</figcaption>
                </figure>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="cash-flow-result-2">
                <h3 id="cash-flow-result-2">Result 2: Sales grow, but EBITDA stays almost flat</h3>
                <ul><li>Net sales rise from $17,967 million in 2022 to $21,164 million in 2027, while EBITDA moves only from $4,079 million to $4,455 million. Profit after tax stays near $2.7 billion in every forecast year. This shows the effect of the cost relationship in Result 1.</li></ul>
                <figure className="sf-cashflow-result-figure">
                  <a
                    href={import.meta.env.BASE_URL + "images/colgate-result-1.png"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open the Colgate-Palmolive result 1 charts at full size"
                  >
                    <img
                      src={import.meta.env.BASE_URL + "images/colgate-result-1.png"}
                      alt="Charts showing Colgate-Palmolive historical and forecast net sales and EBITDA from 2018 to 2027"
                      data-testid="img-cash-flow-result-2"
                    />
                  </a>
                  <figcaption>Select the image to view it at full size.</figcaption>
                </figure>
              </section>
              <section className="sf-project-outcome-group" aria-labelledby="cash-flow-result-3">
                <h3 id="cash-flow-result-3">Result 3: The cost slope drives profit far more than sales growth</h3>
                <ul>
                  <li>Changing the cost slope by 0.04 moves 2024 profit by about $580–$590 million, while a one-point change in sales growth moves it by only about $15 million. Tax and interest each move it by $70–$95 million. Anyone using the forecast should test the cost relationship first.</li>
                  <li>The chart’s values come straight from Table 8 in the report.</li>
                </ul>
                <figure className="sf-cashflow-result-figure">
                  <a
                    href={import.meta.env.BASE_URL + "images/colgate-result-3.png"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open the Colgate-Palmolive result 3 sensitivity chart at full size"
                  >
                    <img
                      src={import.meta.env.BASE_URL + "images/colgate-result-3.png"}
                      alt="Sensitivity chart showing the effects of changes in cost slope, tax rate, interest rate, and sales growth on 2024 after-tax profit"
                      data-testid="img-cash-flow-result-3"
                    />
                  </a>
                  <figcaption>Select the image to view it at full size.</figcaption>
                </figure>
              </section>
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
