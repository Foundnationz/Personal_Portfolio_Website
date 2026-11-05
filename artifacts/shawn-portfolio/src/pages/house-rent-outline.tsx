import "@/styles/signature-fintech.css";
import "@/styles/project-outline.css";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Github, Menu, MonitorSmartphone, Target, Wrench, X } from "lucide-react";
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
            <a
              className="sf-primary sf-outline-view"
              href="https://github.com/Foundnationz/house-rent-prediction.git"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-view-house-rent-project"
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
              <p className="sf-outline-prose sf-overview-prose text-justify">This project predicts monthly house rent in India from 4,746 listings across six cities, using linear regression on log(Rent) to handle the skew. After cleaning the data and building a leakage-safe pipeline, I compared five models and kept the simple linear one, since the others added no real benefit. It explains about 83% of the variation in log-rent, with city and furnishing as the strongest drivers, but predictions are rougher for expensive homes, so it works best as a pricing guide, not an exact valuation.</p>
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
                href={import.meta.env.BASE_URL + "images/house-rent-project-cover.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the house rent estimation image at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/house-rent-project-cover.png"}
                  alt="A modern white home surrounded by trees and landscaping."
                  data-testid="img-house-rent-project"
                />
              </a>
              <figcaption>
                <a href={import.meta.env.BASE_URL + "images/house-rent-project-cover.png"} target="_blank" rel="noreferrer">
                  Open full-size image
                </a>
              </figcaption>
            </figure>
            <section className="sf-outline-summary" aria-labelledby="project-summary-title">
              <h3 className="sf-outline-group-heading" id="project-summary-title">Summary</h3>
              <div className="sf-outline-summary-grid">
                <article>
                  <h4>Goal</h4>
                  <p className="text-justify">The goal of this project is to build a linear regression model that predicts monthly house rent from listing details such as city, size, furnishing status and number of bedrooms and bathrooms. It also aims to show which features drive rent the most, so that the results can serve as a practical pricing guide for renters, landlords and property agents.</p>
                </article>
                <article>
                  <h4>Process</h4>
                  <p className="text-justify">I explored and cleaned the rental data, then modelled log(Rent) to handle the skew. After an 80/20 split and a leakage-safe preprocessing pipeline, I compared five regression models and kept the simple linear one, then evaluated it and interpreted its coefficients.

                  Explore and clean the data
                  Model log(Rent) to handle the skew
                  Split 80/20 and preprocess with one pipeline
                  Compare five regression models
                  Keep the simple linear model
                  Evaluate it and interpret the coefficients</p>
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
            <p className="sf-outline-prose sf-problem-statement-copy">Renters, landlords and property agents in Indian cities often have no objective way to judge whether a listed rent is fair, because rents vary widely with city, furnishing, size and other property features. Rents are also highly skewed, with a small number of very expensive listings, so simple averages are misleading. Without a data-driven reference, people may overpay, underprice their properties or rely on guesswork. This project addresses the problem by building a linear regression model on 4,746 rental listings across six cities. It predicts rent from the listing details, and it identifies which features, such as city and furnishing status, influence rent the most.</p>
          </section>

          <section className="sf-outline-text-section sf-outline-workflow" aria-labelledby="workflow-title">
            <div className="sf-outline-section-heading">
              <span className="sf-outline-number">03</span>
              <h2 id="workflow-title">Project Workflow</h2>
            </div>
            <figure className="sf-outline-workflow-figure">
              <a
                href={import.meta.env.BASE_URL + "images/house-rent-workflow.png"}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the house rent estimation workflow diagram at full size"
              >
                <img
                  src={import.meta.env.BASE_URL + "images/house-rent-workflow.png"}
                  alt="House rent estimation workflow from problem definition and data preparation through modelling, evaluation, interpretation, and reporting"
                  data-testid="img-house-rent-workflow"
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
            <div className="sf-rent-result-list">
              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 1: Rent is heavily skewed, so the model predicts log(Rent)</h3>
                <p className="sf-rent-result-copy text-justify">Raw rent has a long right tail, with a skewness of 21.41. A few very expensive listings dominate it, which would distort a linear regression. After a log transform the distribution is roughly symmetric (skewness 0.91). That is why the model predicts log(Rent) and converts back to rupees afterwards.</p>
                <figure className="sf-rent-result-figure">
                  <img className="sf-rent-result-image" src={`${import.meta.env.BASE_URL}images/house-rent-result-1.png`} alt="Side-by-side charts showing the raw rent distribution and the more balanced log-rent distribution." width={1758} height={717} loading="eager" decoding="sync" />
                  <figcaption>Raw and log-transformed rent distributions.</figcaption>
                </figure>
              </article>

              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 2: City and furnishing drive rent the most</h3>
                <p className="sf-rent-result-copy text-justify">Rent differs sharply between categories, and each box is labelled with its number of listings. Median rent by furnishing status is Furnished 27,500, Semi-Furnished 18,000 and Unfurnished 12,000. The gaps between cities are even larger, with Mumbai’s median roughly six times Kolkata’s. This is why city and furnishing status are kept in the model.</p>
                <figure className="sf-rent-result-figure">
                  <img className="sf-rent-result-image" src={`${import.meta.env.BASE_URL}images/house-rent-result-2.png`} alt="Four box-plot charts comparing rents by city, furnishing status, area type, and tenant preference." width={2384} height={1485} loading="eager" decoding="sync" />
                  <figcaption>Rent distributions by city, furnishing status, area type, and tenant preference.</figcaption>
                </figure>
              </article>

              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 3: City and furnishing are the strongest rent drivers (Mumbai about 181% above Bangalore, unfurnished about 29% below furnished)</h3>
                <p className="sf-rent-result-copy text-justify">Each bar shows how much a feature changes rent, as a percentage, while the other features are held constant. City has the largest effect. Mumbai rents are about 181% above the Bangalore baseline, and Kolkata about 25% below. Furnishing comes next, with unfurnished homes about 29% cheaper than furnished ones and semi-furnished about 20% cheaper. Size, BHK and bathrooms all push rent up. The numeric features are standardised, so their effects are per one standard deviation.</p>
                <figure className="sf-rent-result-figure">
                  <img className="sf-rent-result-image" src={`${import.meta.env.BASE_URL}images/house-rent-result-3.png`} alt="Horizontal bar chart showing estimated percentage effects of housing features on rent." width={1475} height={1176} loading="eager" decoding="sync" />
                  <figcaption>Estimated percentage effects of selected features on rent.</figcaption>
                </figure>
              </article>

              <article className="sf-rent-result">
                <h3 className="sf-rent-result-title">Result 4: The model explains about 83% of rent variation, but typical errors are 21–29%, and larger for expensive homes</h3>
                <p className="sf-rent-result-copy text-justify">The left panel plots actual against predicted log-rent for the 928 test listings, and the points follow the diagonal closely (R² about 0.83 on the log scale, about 0.70 in rupees). The right panel plots the errors, which are centred on zero. They widen as predicted rent rises (spread about 0.30 for the lowest quintile, about 0.49 for the highest). The median error by city ranges from about 21% (Bangalore and Mumbai) to about 29% (Delhi).</p>
                <figure className="sf-rent-result-figure">
                  <img className="sf-rent-result-image" src={`${import.meta.env.BASE_URL}images/house-rent-result-4.png`} alt="Charts comparing actual and predicted test-set rent, alongside residuals versus predicted values." width={2234} height={885} loading="eager" decoding="sync" />
                  <figcaption>Actual versus predicted rent and residuals for the test set.</figcaption>
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
