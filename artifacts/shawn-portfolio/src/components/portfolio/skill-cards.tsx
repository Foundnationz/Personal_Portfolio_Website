import { BookOpen, Code2, Users } from "lucide-react";

export function SkillCards() {
  return (
    <div className="sf-skills">
      <article className="sf-skill" data-testid="card-skill-0">
        <span className="sf-skill-no"><span>01 /</span>{" "}<BookOpen size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
        <h3>Finance Foundations</h3>
        <p>I have studied core subjects related to finance in the first two years to build a strong foundation and understanding.</p>
        <ul className="sf-tags">
          <li>Financial Accounting</li><li>Corporate Finance</li><li>Financial Markets</li><li>Financial Modelling</li>
          <li>Electronic Payment Systems</li><li>Data Mining</li><li>Cloud Computing</li>
        </ul>
        <div className="sf-skill-foot"></div>
      </article>
      <article className="sf-skill" data-testid="card-skill-1">
        <span className="sf-skill-no"><span>02 /</span>{" "}<Code2 size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
        <h3>Technical Tools</h3>
        <p>I have utilized a number of tools and applied a number of technical skills during my studies</p>
        <ul className="sf-tags">
          <li>Excel</li><li>Python</li><li>WEKA</li><li>Data Analysis</li>
          <li>Basic Programming</li><li>Academic Research</li><li>Canva</li>
          <li>AI Prompt Engineering</li><li>Microsoft Office Suite</li>
        </ul>
        <div className="sf-skill-foot"></div>
      </article>
      <article className="sf-skill" data-testid="card-skill-2">
        <span className="sf-skill-no"><span>03 /</span>{" "}<Users size={14} aria-hidden style={{ verticalAlign: "middle" }} /></span>
        <h3>Soft Skills</h3>
        <p>Example: working style strengths. Replace with your own.</p>
        <ul className="sf-tags">
          <li>Communication</li><li>Teamwork</li><li>Attention to Detail</li><li>Time Management</li>
          <li>Adaptability</li><li>Willingness to Learn</li><li>Creativity</li>
        </ul>
        <div className="sf-skill-foot"></div>
      </article>
    </div>
  );
}
