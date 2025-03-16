// Dependencies
import React, { JSX } from "react";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faJsSquare, faCss3Alt, faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
// Stylesheets
import "../assets/css/views/home.css";
import "../assets/css/views/home/skills-cards.css";
// Components
import Footer from "../includes/footer";

interface skillObj {
  title: string;
  description: string;
  icon: IconDefinition;
  special?: boolean;
}

const skills: skillObj[] = [
  {
    title: "JavaScript",
    description: "I have extensive experience with JavaScript and have used it to build dynamic web pages and interactive user interfaces. I am also familiar with popular JavaScript libraries and frameworks such as jQuery.",
    icon: faJsSquare,
    // backgroundColor: "#fff135",
    special: true
  },
  {
    title: "HTML5",
    description: "I am well-versed in HTML5 and have experience creating semantic, accessible web pages using HTML5 tags and attributes.",
    icon: faHtml5
  },
  {
    title: "CSS3",
    description: "I am proficient in CSS3 and have used it to create responsive, visually appealing web pages. I am also familiar with CSS frameworks such as Bootstrap.",
    icon: faCss3Alt
  },
  {
    title: "Node.js",
    description: "I have experience working with Node.js to build scalable, high-performance web applications. I am familiar with Node.js libraries and tools such as Express, Socket.io, and NPM.",
    icon: faNodeJs
  },
  {
    title: "React",
    description: "I am skilled in building user interfaces using React. I am also familiar with popular React libraries and tools such as React Router.",
    icon: faReact
  }
];

function SVGBackground(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560">
      <g mask="url(&quot;#svg-mask&quot;)" fill="none">
        <rect width="1440" height="560" x="0" y="0"></rect>
        <path d="M733.48 666.57C895.68 607.44 928.79 128.79 1158.24 122.11 1387.7 115.43 1466.15 313.46 1583.01 318.11" stroke="rgb(255, 255, 255)" strokeWidth="2"></path>
        <path d="M727.62 600.54C843.83 592.35 904.22 379.53 1131.09 367.37 1357.96 355.21 1423.7 186.9 1534.56 182.57" stroke="rgb(255, 255, 255)" strokeWidth="2"></path>
        <path d="M415.47 630.33C509.54 630.31 499.76 605.74 790.8 603.29 1081.84 600.84 1342.16 338.5 1541.45 334.49" stroke="rgb(255, 255, 255)" strokeWidth="2"></path>
        <path d="M257.81 643.89C452.5 631.3 573.13 273.12 939.21 263.54 1305.29 253.96 1445.81 107.75 1620.61 106.74" stroke="rgb(255, 255, 255)" strokeWidth="2"></path>
        <path d="M358.14 572.01C465.77 567.3 550.34 386.25 746.84 385.93 943.35 385.61 941.19 455.93 1135.55 455.93 1329.9 455.93 1425.51 386.21 1524.25 385.93" stroke="rgb(255, 255, 255)" strokeWidth="2"></path>
      </g>
      <defs>
        <mask id="svg-mask">
          <rect width="1440" height="560" fill="#ffffff"></rect>
        </mask>
      </defs>
    </svg>
  )
}

/**
 * Get the skills section's content
 * @returns The skills section
 */
function SkillsSection(): JSX.Element {
  return (
    <section id="skills">
      <h3 className="display-4">Skills</h3>
      <div className="skill-card-wrapper">
        {skills.map((skill: skillObj, index: number) => (
          <div className={(skill.special ? "special " : "") + "skill-card card"} key={index}>
            <div className="card-header">
              <div className="wrapper">
                <div className="skill-icon">
                  <FontAwesomeIcon icon={skill.icon} />
                </div>
                <h4 className="color-reverse">{skill.title}</h4>
              </div>
            </div>
            <p className="lead color-reverse">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Get the home page's content
 * @returns The home page
 */
function HomePage(): JSX.Element {
  React.useEffect(() => {
    // Change the title of the page
    document.title = "Tyler Pearson";
  });
  return (
    <>
      <section id="intro">
        <SVGBackground />
        <div className="container">
          <h1 className="display-3 color-static">Tyler Pearson</h1>
          <p className="lead color-static">...is a Full Stack Web Developer</p>
        </div>
      </section>
      <SkillsSection />
      <Footer includeSeparation="true" />
    </>
  )
}

export default HomePage;