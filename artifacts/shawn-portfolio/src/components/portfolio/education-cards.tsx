// Each card has its own literal text so visual edits affect only that card.
export function EducationCards() {
  return (
    <div className="sf-education-list">
      <article className="sf-edu" data-testid="card-education-0">
        <div className="sf-edu-image sf-edu-image-photo">
          <img src={import.meta.env.BASE_URL + "images/ucsi-university.jpg"} alt="UCSI University campus building and entrance" loading="lazy" decoding="async" />
        </div>
        <div className="sf-edu-copy">
          <div className="sf-edu-topline">
            <span className="sf-period" id="education-ucsi-period">2022 - current</span>
            <span className="sf-edu-index">01</span>
          </div>
          <h3 id="education-ucsi-school">UCSI University (Kuala Lumpur Campus)</h3>
          <p className="sf-edu-degree" id="education-ucsi-degree">Bachelor of Financial Technology (Honours)</p>
          <p className="sf-edu-note" id="education-ucsi-note">Specializing in digital payment, corporate finance, data analytics, and understanding of Fintech operations with hands-on Python experience. Built a finance tracker and budgeting app oriented towards Gen-Z as my final-year project, and served as a committee member as treasurer in Youth Financial Literacy (YFL)</p>
        </div>
      </article>
      <article className="sf-edu" data-testid="card-education-1">
        <div className="sf-edu-image sf-edu-image-photo">
          <img src={import.meta.env.BASE_URL + "images/sunway-college.jpg"} alt="Sunway College campus building and courtyard" loading="lazy" decoding="async" />
        </div>
        <div className="sf-edu-copy">
          <div className="sf-edu-topline">
            <span className="sf-period" id="education-second-period">2021 - 2022</span>
            <span className="sf-edu-index">02</span>
          </div>
          <div className="sf-edu-title-row">
            <h3 id="education-second-school">Sunway College </h3>
          </div>
          <p className="sf-edu-degree" id="education-second-degree">Monash University Foundation Year (MUFY)</p>
          <p className="sf-edu-note" id="education-second-note">Placeholder text</p>
        </div>
      </article>
    </div>
  );
}
