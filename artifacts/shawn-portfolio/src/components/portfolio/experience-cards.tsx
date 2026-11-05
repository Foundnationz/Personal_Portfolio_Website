export function ExperienceCards() {
  return (
    <div className="sf-exp-list">
      <article className="sf-exp" data-testid="item-experience-0">
        <div className="sf-exp-date">September - December 2024 </div>
        <div className="sf-exp-card">
          <div className="sf-exp-head"><h3>Operations Intern</h3></div>
          <p className="sf-exp-org">Funding Societies Malaysia</p>
          <ul>
            <li>Conducted AML checks and credit evaluations on transactions and counterparties.</li>
            <li>Performed due diligence on loan drawdown applications across microfinancing, invoice financing and reverse factoring.</li>
            <li>Prepared Trustee payment instructions and processed payments via the financial portal, ensuring accuracy and timeliness.</li>
          </ul>
        </div>
      </article>
      <article className="sf-exp" data-testid="item-experience-1">
        <div className="sf-exp-date">September - November 2023</div>
        <div className="sf-exp-card">
          <div className="sf-exp-head"><h3>Credit Intern</h3><span className="sf-example sf-example-light">Example</span></div>
          <p className="sf-exp-org">Airswift Malaysia</p>
          <ul>
            <li>Prepared aging reports for credit control across five regional entities (MY, CN, ID, AU, KR).</li>
            <li>Reconciled client and contractor invoices against timesheets, receipts and amendments in D365 and Ariba.</li>
            <li>Generated receivables and payables summaries in Power BI for management presentations.</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
