import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ProjectArt } from "./project-art";

// Separate source elements keep visual edits local to each project.
export function ProjectExampleDialogs({ selectedId, onClose }: { selectedId?: string; onClose: () => void }) {
  return <>
    <Dialog.Root open={selectedId === "payments-journey"} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="sf-dialog-overlay" />
        <Dialog.Content className="sf-dialog">
          <Dialog.Title asChild><h2>Digital Payments Journey Map</h2></Dialog.Title>
          <Dialog.Description className="sf-dialog-desc">FinTech Research · Example project case note</Dialog.Description>
          <div className="sf-dialog-body">
            <div className="sf-modal-art"><ProjectArt kind="flow" /></div>
            <p><span className="sf-example sf-example-light">Example</span>{" "}<span>Illustrative content only—not a claimed achievement.</span></p>
            <p>A sample overview of a research-style project mapping how a payment moves between parties. Replace with a real project description.</p>
            <h4>Role</h4><p>Example: Group project</p>
            <h4>Tools</h4><div className="sf-dialog-tools"><span>Presentation</span><span>Desk research</span></div>
            <h4>Highlights</h4><ul><li>Example: mapped each party</li><li>Example: noted risk points</li><li>Example: presented findings</li></ul>
          </div>
          <Dialog.Close aria-label="Close dialog" className="sf-dialog-close"><X size={18} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    <Dialog.Root open={selectedId === "budget-model"} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="sf-dialog-overlay" />
        <Dialog.Content className="sf-dialog">
          <Dialog.Title asChild><h2>Personal Budget Model</h2></Dialog.Title>
          <Dialog.Description className="sf-dialog-desc">Spreadsheet Modelling · Example project case note</Dialog.Description>
          <div className="sf-dialog-body">
            <div className="sf-modal-art"><ProjectArt kind="grid" /></div>
            <p><span className="sf-example sf-example-light">Example</span>{" "}<span>Illustrative content only—not a claimed achievement.</span></p>
            <p>A sample project card for a spreadsheet model with clear inputs and assumptions. All figures would be sample data. Replace with your own.</p>
            <h4>Role</h4><p>Example: Personal project</p>
            <h4>Tools</h4><div className="sf-dialog-tools"><span>Excel</span></div>
            <h4>Highlights</h4><ul><li>Example: separated inputs from outputs</li><li>Example: documented assumptions</li></ul>
          </div>
          <Dialog.Close aria-label="Close dialog" className="sf-dialog-close"><X size={18} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    <Dialog.Root open={selectedId === "case-brief"} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="sf-dialog-overlay" />
        <Dialog.Content className="sf-dialog">
          <Dialog.Title asChild><h2>Company Case Brief</h2></Dialog.Title>
          <Dialog.Description className="sf-dialog-desc">Financial Analysis · Example project case note</Dialog.Description>
          <div className="sf-dialog-body">
            <div className="sf-modal-art"><ProjectArt kind="document" /></div>
            <p><span className="sf-example sf-example-light">Example</span>{" "}<span>Illustrative content only—not a claimed achievement.</span></p>
            <p>A sample brief format: context, key questions, findings and recommendation. Replace with a real piece of coursework.</p>
            <h4>Role</h4><p>Example: Coursework</p>
            <h4>Tools</h4><div className="sf-dialog-tools"><span>Word</span><span>Public filings</span></div>
            <h4>Highlights</h4><ul><li>Example: summarised the context</li><li>Example: raised key questions</li></ul>
          </div>
          <Dialog.Close aria-label="Close dialog" className="sf-dialog-close"><X size={18} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}
