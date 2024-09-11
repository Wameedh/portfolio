import styles from "./About.module.scss";
interface techT {
  label: string;
  class: string;
}

const techs: techT[] = [
  { label: "React", class: "reactBlue" },
  { label: "Vue.js", class: "vueGreen" },
  { label: "TypeScript", class: "typescriptBlue" },
  { label: "Node.js", class: "nodeGreen" },
  { label: "GraphQL", class: "graphqlPink" },
  { label: "AWS", class: "awsOrange" },
];

const About: React.FC = () => {
  return (
    <section id="about" className="creative-portfolio__about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              With a passion for creating efficient, maintainable, and
              high-performance web applications, I bring ideas to life through
              code. My journey in tech has been driven by curiosity and a
              constant desire to push the boundaries of what's possible on the
              web.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              working on side projects, playing soccer or video games.
            </p>
          </div>
          <div className="creative-portfolio__tech-stack">
            <h3>My Tech Stack</h3>
            <div className="tech-badges">
              {techs.map((tech) => (
                <span
                  key={tech.label}
                  className={`tech-badge ${styles[tech.class]}`}
                >
                  {tech.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
