import React, { useState, useEffect } from "react";
import LogoImage from "./LogoImage";
import mafiosoImage from "../../assets/mafioso.png";
import tcpImage from "../../assets/tcp-logo.png";
import interpreter from "../../assets/Interpreter.png";
import db from "../../assets/db.svg";
import p2p from "../../assets/p2p.png";
import tank from "../../assets/tank.png";
import zooble from "../../assets/zooble.png";
import cinnamonLogo from "../../assets/cinnamon.png";
import pulseLogo from "../../assets/42.png";
import lvisLogo from "../../assets/lvis.png";
import ContactForm from "../ContactForm";
import About from "../about/About";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  // IconSun,
  // IconMoon,
} from "@tabler/icons-react";
import "../../styles/Portfolio.scss";
import { useTheme } from "./ThemeContext";

const Portfolio: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 200) {
          setActiveSection(section);
        }
      }

      setShowNav(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="creative-portfolio">
      <nav className={`creative-portfolio__nav ${showNav ? "visible" : ""}`}>
        <div className="container">
          <span className="nav-brand">WA</span>
          <div className="nav-items">
            {[
              "Home",
              "About",
              "Skills",
              "Experience",
              "Projects",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-item ${
                  activeSection === item.toLowerCase() ? "active" : ""
                }`}
              >
                {item}
              </a>
            ))}
            {/* <button onClick={toggleTheme} className="theme-toggle">
              {theme === "light" ? (
                <IconMoon size={20} />
              ) : (
                <IconSun size={20} />
              )}
            </button> */}
          </div>
        </div>
      </nav>

      <section id="home" className="creative-portfolio__hero">
        <div className="container hero-content">
          <h1 className="animate-fade-in">Wameedh M. Ali</h1>
          <h2 className="animate-fade-in delay-200">
            Senior Frontend Engineer
          </h2>
          <p className="animate-fade-in delay-400">
            Crafting digital experiences that blend creativity with cutting-edge
            technology. Let's build something extraordinary together.
          </p>
          <div className="cta-buttons animate-fade-in delay-600">
            <a href="#contact" className="btn btn-primary">
              Get in Touch
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>
        </div>
        <div className="creative-portfolio__scroll-indicator">
          <span>Scroll to explore</span>
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </section>
      <About />
      <section id="skills" className="creative-portfolio__skills">
        <div className="container">
          <h2>Skills & Expertise</h2>
          <div className="creative-portfolio__skills-chart">
            {[
              { name: "Frontend Development", level: 95 },
              { name: "iOS Mobile Development", level: 90 },
              { name: "UI/UX Design", level: 85 },
              { name: "Backend Development", level: 70 },
              // { name: "DevOps", level: 75 },
            ].map((skill) => (
              <div key={skill.name} className="skill-bar">
                <span className="skill-name">{skill.name}</span>
                <div
                  className="skill-level"
                  style={{ width: `${skill.level}%` }}
                >
                  <span className="skill-percent">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="creative-portfolio__experience">
        <div className="container">
          <h2>Professional Journey</h2>
          <div className="creative-portfolio__timeline">
            {[
              {
                role: "Senior Frontend Engineer",
                company: "LVIS",
                logo: lvisLogo,
                period: "Mar 2022 - Present",
                achievements: [
                  "Spearheaded migration to Vue.js 3, reducing load times by 20%",
                  "Developed refactoring plan saving 500+ FTE hours annually",
                  "Led frontend team growth initiatives",
                ],
              },
              {
                role: "Full Stack Software Engineer",
                company: "Pulse42",
                logo: pulseLogo,
                period: "Jun 2021 - Jan 2022",
                achievements: [
                  "Built reusable React component library",
                  "Developed data visualization components with ChartJS and MUI",
                  "Conducted design reviews for robust architecture",
                ],
              },
              {
                role: "QA Engineer",
                company: "Cinnamon Mobile",
                logo: cinnamonLogo,
                period: "Jan 2016 - Mar 2018",
                achievements: [
                  "Evaluated product usability and provided design feedback",
                  "Implemented annotation tools to streamline communication",
                ],
              },
            ].map((job, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3>{job.role}</h3>
                      <div className="title-logo">
                        <h4>{job.company}</h4>
                        <LogoImage
                          logo={job.logo}
                          alt={`${job.company} logo`}
                          size={50}
                        />
                      </div>
                    </div>
                    <span>{job.period}</span>
                  </div>
                  <ul>
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="creative-portfolio__projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {[
              {
                name: "Mafioso",
                description: "iOS party game enhancing the werewolf experience",
                technologies: ["Swift", "Firebase", "UI/UX Design"],
                image: mafiosoImage,
                backgroundColor: "#fff",
              },
              {
                name: "Zooble Pet",
                description: "Social media platform for pet owners",
                technologies: ["React", "Node.js", "MongoDB"],
                image: zooble,
                link: "https://github.com/Wameedh/CSC-648-SFSU-csc648-04-sp21-Team02",
                backgroundColor: "#39A9DB",
              },
              {
                name: "TCP Network",
                description: "Centralized client-server network",
                technologies: ["Python"],
                image: tcpImage,
                link: "https://github.com/Wameedh/CSC645-projects/tree/master/Projects/TCP-Client-Server-Centralized-Network",
                backgroundColor: "#000",
              },
              {
                name: "P2P Network",
                description: "Decentralized Network with BitTorrent Protocol",
                technologies: ["Python"],
                image: p2p,
                link: "https://github.com/Wameedh/CSC645-projects/tree/master/Projects/P2P-Decentralized-Network",
                backgroundColor: "#DDDFDF",
              },
              {
                name: "Database System with CL interface",
                description:
                  "MySQL Database for a Wholesale Store with command line interface",
                technologies: ["Python", "MySQL"],
                image: db,
                link: "https://github.com/Wameedh/databases-systems-sp21-Wameedh/tree/master/projects",
                backgroundColor: "#EDDDD4",
              },
              {
                name: "Tank Wars Game",
                description: "2D tanks wars game",
                technologies: ["Java"],
                image: tank,
                link: "https://github.com/Wameedh/Tank-Wars-Game",
                backgroundColor: "#D0C4DF",
              },
              {
                name: "Interpreter",
                description: "Interpreter for the mock language X",
                technologies: ["Java"],
                image: interpreter,
                link: "https://github.com/Wameedh/Interpeter",
                backgroundColor: "#e16b5c",
              },
            ].map((project, index) => (
              <div className="project-card">
                {/* <div className="project-header"> */}
                {/* <img
                  src={project.image}
                  alt={project.name}
                  className="project-icon"
                /> */}
                <LogoImage
                  logo={project.image}
                  alt={`${project.name} logo`}
                  backgroundColor={project.backgroundColor}
                />
                <h3>{project.name}</h3>
                {/* </div> */}
                <div className="project-info">
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="creative-portfolio__contact">
        <div className="container">
          <h2>Let's Connect</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>
                Interested in collaborating or just want to say hi? Feel free to
                reach out!
              </p>
              <div className="contact-links">
                <a href="mailto:wameedh.wf@gmail.com" className="contact-link">
                  <IconMail size={24} />
                  wameedh.wf@gmail.com
                </a>
                <a href="tel:408-614-6617" className="contact-link">
                  <IconMail size={24} />
                  408-614-6617
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="creative-portfolio__footer">
        <div className="container footer-content">
          <p>&copy; 2024 Wameedh M. Ali. All rights reserved.</p>
          <div className="social-links">
            <a
              href="https://github.com/wameedh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <IconBrandGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/wameedh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <IconBrandLinkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;