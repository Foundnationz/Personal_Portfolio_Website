import { BookOpen, Code2, Users } from "lucide-react";

export function SkillCards() {
  return (
    <div className="sf-skills">
      <article className="sf-skill" data-testid="card-skill-0">
        <span className="sf-skill-no"><span>01 /</span>{" "}<BookOpen size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
        <h3>Finance Foundations</h3>
        <p>I have studied core subjects related to finance in the first two years to build a strong foundation and understanding.</p>
        <ul className="sf-tags">
          <li>Financial Accounting</li><li>Corporate Finance</li><li>Financial Markets</li><li>Risk Basics</li>
        </ul>
        <div className="sf-skill-foot"><span className="sf-example sf-example-light">Example</span></div>
      </article>
      <article className="sf-skill" data-testid="card-skill-1">
        <span className="sf-skill-no"><span>02 /</span>{" "}<Code2 size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
        <h3>Technical Tools</h3>
        <p>Example: tools you use for analysis and building. Replace with your own.</p>
        <ul className="sf-tags">
          <li>Excel</li><li>Python</li><li>SQL</li><li>Data Analysis</li>
        </ul>
        <div className="sf-skill-foot"><span className="sf-example sf-example-light">Example</span></div>
      </article>
      <article className="sf-skill" data-testid="card-skill-2">
        <span className="sf-skill-no"><span>03 /</span>{" "}<Users size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
        <h3>Soft Skills</h3>
        <p>Example: working style strengths. Replace with your own.</p>
        <ul className="sf-tags">
          <li>Communication</li><li>Teamwork</li><li>Attention to Detail</li><li>Time Management</li>
        </ul>
        <div className="sf-skill-foot"><span className="sf-example sf-example-light">Example</span></div>
      </article>
    </div>
  );
}
