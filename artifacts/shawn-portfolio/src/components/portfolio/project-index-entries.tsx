import { ArrowUpRight } from "lucide-react";
import { ProjectArt } from "./project-art";

export function ProjectIndexEntries({ onOpen }: { onOpen: (id: string) => void }) {
  return <div className="sf-all-list">
    <button type="button" data-testid="button-all-ledger-reconciliation" onClick={() => onOpen("ledger-reconciliation")}>
      <span className="sf-all-art"><ProjectArt kind="ledger" /></span>
      <span className="sf-all-title"><strong>Ledger Reconciliation Walkthrough</strong><small>Accounting Workflow · Example</small></span><ArrowUpRight size={16} />
    </button>
    <button type="button" data-testid="button-all-payments-journey" onClick={() => onOpen("payments-journey")}>
      <span className="sf-all-art"><ProjectArt kind="flow" /></span>
      <span className="sf-all-title"><strong>Digital Payments Journey Map</strong><small>FinTech Research · Example</small></span><ArrowUpRight size={16} />
    </button>
    <button type="button" data-testid="button-all-budget-model" onClick={() => onOpen("budget-model")}>
      <span className="sf-all-art"><ProjectArt kind="grid" /></span>
      <span className="sf-all-title"><strong>Personal Budget Model</strong><small>Spreadsheet Modelling · Example</small></span><ArrowUpRight size={16} />
    </button>
    <button type="button" data-testid="button-all-case-brief" onClick={() => onOpen("case-brief")}>
      <span className="sf-all-art"><ProjectArt kind="document" /></span>
      <span className="sf-all-title"><strong>Company Case Brief</strong><small>Financial Analysis · Example</small></span><ArrowUpRight size={16} />
    </button>
  </div>;
}
