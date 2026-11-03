import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export function FeaturedProjectCards({ onOpenPayments }: { onOpenPayments: () => void }) {
  return (
    <div className="sf-project-stack">
      <article className="sf-project" data-testid="card-project-ledger-reconciliation">
        <div className="sf-project-art sf-project-art-photo">
          <img
            src={import.meta.env.BASE_URL + "images/financial-tracker-workspace.jpg"}
            alt="A smartphone, calculator, and financial charts on a desk beside a laptop"
            loading="lazy"
            decoding="async"
            data-testid="img-featured-financial-tracker"
          />
          <span className="sf-figcaption">PERSONAL FINANCE </span>
        </div>
        <div className="sf-project-copy">
          <div className="sf-project-meta"><span>Accounting Workflow</span><span className="sf-example">Example</span></div>
          <h3>Financial Tracker & Budgeting App</h3>
          <p>Python desktop application designed to help Generation Z users manage accounts, transactions, budgets, subscriptions, and savings goals. Evolved from a joint Final Year Project prototype, it combines financial visualisations, motivational features, and explainable rule-based recommendations to support informed budgeting decisions. The application uses Tkinter and SQLite, with password hashing, privacy controls, and automated regression tests.</p>
          <Link className="sf-project-open" href="/projects/ledger-reconciliation" data-testid="button-view-project-ledger-reconciliation">
            <span>View project outline</span><ArrowUpRight size={15} />
          </Link>
        </div>
      </article>
      <article className="sf-project" data-testid="card-project-payments-journey">
        <div className="sf-project-art sf-project-art-contained">
          <img
            src={import.meta.env.BASE_URL + "images/predictive-house-rent.png"}
            alt="A yellow house in front of chart bars with rising and falling arrows, representing house rent prediction"
            loading="lazy"
            decoding="async"
            data-testid="img-featured-house-rent-prediction"
          />
          <span className="sf-figcaption">HOUSE RENT ESTIMATION · CONCEPT VISUAL</span>
        </div>
        <div className="sf-project-copy">
          <div className="sf-project-meta"><span>FinTech Research</span><span className="sf-example">Example</span></div>
          <h3>Predictive Analytics for House Rent Estimation</h3>
          <p>Example project: mapping the steps of a customer payment.</p>
          <button className="sf-project-open" type="button" onClick={onOpenPayments} data-testid="button-view-project-payments-journey">
            <span>View project outline</span><ArrowUpRight size={15} />
          </button>
        </div>
      </article>
    </div>
  );
}
