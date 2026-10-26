// Each card has its own literal text so visual edits affect only that card.
export function EducationCards() {
  return <div className="sf-education-list">
    <article className="sf-edu" data-testid="card-education-0">
      <div className="sf-edu-image sf-edu-image-photo">
        <img src={import.meta.env.BASE_URL + "images/ucsi-university.jpg"} alt="UCSI University campus building and entrance" loading="lazy" decoding="async" />
      </div>
      <div className="sf-edu-copy">
        <div className="sf-edu-topline"><span className="sf-period">Final year</span><span className="sf-edu-index">01</span></div>
        <h3>UCSI University (Kuala Lumpur Campus)</h3>
        <p className="sf-edu-degree">Bachelor of Financial Technology (Honours)</p>
        <p className="sf-edu-note">Currently in the final year of the programme.</p>
      </div>
    </article>
    <article className="sf-edu" data-testid="card-education-1">
      <div className="sf-edu-image sf-edu-image-photo">
        <img src={import.meta.env.BASE_URL + "images/sunway-college.jpg"} alt="Sunway College campus building and courtyard" loading="lazy" decoding="async" />
      </div>
      <div className="sf-edu-copy">
        <div className="sf-edu-topline"><span className="sf-period">Example: Year - Year</span><span className="sf-edu-index">02</span></div>
        <h3>Example: Previous Institution <span className="sf-example">Example</span></h3>
        <p className="sf-edu-degree">Example: Pre-university qualification</p>
        <p className="sf-edu-note">Placeholder entry. Replace with your pre-university studies and results.</p>
      </div>
    </article>
  </div>;
}
