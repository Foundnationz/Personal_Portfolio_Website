import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { ProjectArt } from "./project-art";

export function FeaturedProjectCards({ onOpenPayments }: { onOpenPayments: () => void }) {
  return (
    <div className="sf-project-stack">
      <article className="sf-project" data-testid="card-project-ledger-reconciliation">
        <div className="sf-project-art"><ProjectArt kind="ledger" /><span className="sf-figcaption">FIG. 01 — ILLUSTRATIVE ART, NOT DATA</span></div>
        <div className="sf-project-copy">
          <div className="sf-project-meta"><span>Accounting Workflow</span><span className="sf-example">Example</span></div>
          <h3>Financial Tracker & Budgeting App</h3>
          <p>Example project: matching entries between two sample ledgers.</p>
          <Link className="sf-project-open" href="/projects/ledger-reconciliation" data-testid="button-view-project-ledger-reconciliation">
            <span>View project outline</span><ArrowUpRight size={15} />
          </Link>
        </div>
      </article>
      <article className="sf-project" data-testid="card-project-payments-journey">
        <div className="sf-project-art"><ProjectArt kind="flow" /><span className="sf-figcaption">FIG. 02 — ILLUSTRATIVE ART, NOT DATA</span></div>
        <div className="sf-project-copy">
          <div className="sf-project-meta"><span>FinTech Research</span><span className="sf-example">Example</span></div>
          <h3>Digital Payments Journey Map</h3>
          <p>Example project: mapping the steps of a customer payment.</p>
          <button className="sf-project-open" type="button" onClick={onOpenPayments} data-testid="button-view-project-payments-journey">
            <span>View project outline</span><ArrowUpRight size={15} />
          </button>
        </div>
      </article>
    </div>
  );
}
