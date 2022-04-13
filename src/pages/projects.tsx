// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import React from "react";
// Stylesheets
import "../../src/assets/css/views/projects/main.css";
import "../../src/assets/css/views/projects/project-cards.css";
// Components
import Footer from "../includes/footer";

type InformationButtonState = "enabled" | "disabled";
type TagOptions = "AWS" | "CSS" | "Docker" | "Express" | "Git" | "HTML" | "JavaScript" | "MongoDB" | "Mongoose" | "Node.js" | "React" | "TypeScript" | "Webpack";
type FrameworkOptions = "Bootstrap" | "jQuery";
type LibaryOptions = "Google Fonts" | "Font Awesome";

interface LinkOptions {
  text: string;
  url: string;
  target: "_blank" | "_self";
  children?: React.ReactNode;
}

interface ProjectObj {
  name: string;
  description: string;
  links?: LinkOptions[];
  image: string;
  tags: TagOptions[];
  frameworks?: FrameworkOptions[];
  libaries?: LibaryOptions[];
  options?: {
    small?: boolean;
    large? : boolean;
    moreInformation?: InformationButtonState;
  }
}

const projects: ProjectObj[] = [
  {
    name: "Portfolio",
    description: "My portfolio",
    links: [{
      text: "Github Repo",
      url: "",
      target: "_blank",
      children: <FontAwesomeIcon icon={faGithub} />
    }],
    image: "/favicon192.png",
    tags: ["CSS", "React", "TypeScript"],
    frameworks: ["Bootstrap"],
    libaries: ["Font Awesome"],
    options: {
      small: true
    }
  }, {
    name: "Beauty by Rachel",
    description: "An appointment booking app for a small business",
    links: [{
      text: "View Project",
      url: "https://beauty-by-rachel.co.uk",
      target: "_blank",
      children: <FontAwesomeIcon icon={faEye} />
    }],
    image: "https://beauty-by-rachel.co.uk/favicon.ico",
    tags: ["CSS", "Express", "HTML", "JavaScript"],
    frameworks: ["Bootstrap", "jQuery"],
    libaries: ["Font Awesome", "Google Fonts"]
  }, {
    name: "Project 1",
    description: "This is a description for project 1",
    image: "",
    tags: ["CSS", "HTML", "JavaScript"],
    options: {
      large: true
    }
  }
];

const contributions: object[] = [];

function ProjectImageOverlay(props: { text: string }) {
  return (
    <div className="project-image-overlay">
        <h3 className="no-select">{props.text}</h3>
    </div>
  );
}
/**
 * Get a grid of projects 
 * @returns The projects grid
 */
function ProjectsGrid(): JSX.Element {
  if (projects.length > 0) {
    return (
      <div className="projects-grid">
        {projects.map((project: ProjectObj, index: number) => (
          <div className={
            [
              "project",
              " card",
              `${project.options?.small ? " card-small" : ""}`,
              `${project.options?.large ? " card-large" : ""}`,
              `${!project.options?.small && !project.options?.large ? " card-medium" : ""}`
            ].join("")} key={index}
          >
            <div className="project-image-wrapper card-img-top">
              {
                project.image ? (
                  <div
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <ProjectImageOverlay text={project.name} />
                  </div>
                ) : (
                  <div className="project-image project-image-placeholder">
                    <ProjectImageOverlay text={project.name} />
                  </div>
                )
              }
            </div>
            <div className="project-body card-body">
              <p className="card-text color-static">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag: string, index: number) => (
                  <span className="badge badge-secondary color-reverse no-select" key={index}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                {/* <div role="button" className="btn btn-responsive color-reverse">
                  <span className="children-wrapper">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>
                  <span>More Information</span>
                </div> */}
                {project.links?.map((link: LinkOptions, index: number) => (
                  <a href={link.url} target={link.target} className="btn btn-responsive color-reverse" key={index}>
                    {link.children ? <span className="children-wrapper">{link.children}</span> : null}
                    <span>{link.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div className="error-modal text-center">
        <h2 className="display-5">No projects found</h2>
        <p className="lead">Nothing to be displayed</p>
      </div>
    )
  }
}

/**
 * Get a grid of contributions
 * @returns The contributions grid
 */
function ContributionsGrid(): JSX.Element {
  return (
    <div className="error-modal text-center">
      <h2 className="display-5">No contributions</h2>
      <p className="lead">Nothing to be displayed</p>
    </div>
  )
}

/**
 * Get the projects page content
 * @returns The projects page
 */
function ProjectPage(): JSX.Element {
  React.useEffect(() => {
    // Change the title of the page
    document.title = "Projects | Tyler Pearson";
  });
  return (
    <>
      <h1>Projects</h1>
      <div className="page" data-page="projects">
        <ProjectsGrid />
      </div>
      <h1>Contributions</h1>
      <div className="page" data-page="contributions">
        <ContributionsGrid />
      </div>
      <Footer includeSeperation="true" />
    </>
  )
}

export default ProjectPage;