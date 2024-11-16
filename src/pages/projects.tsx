import React, { useEffect, useState } from "react";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye, faInfoCircle, faNetworkWired, faStar } from "@fortawesome/free-solid-svg-icons"
// Stylesheets
import "../../src/assets/css/views/projects/main.css";
import "../../src/assets/css/views/projects/project-cards.css";
// Components
import Footer from "../includes/footer";
import { ArchivedProjectModal } from "includes/modals";

type InformationButtonState = "enabled" | "disabled";
type TagOptions = "AWS" | "CSS" | "Docker" | "Express" | "Git" | "HTML" | "JavaScript" | "MongoDB" | "Mongoose" | "Node.js" | "React" | "MySQL" | "TypeScript" | "Webpack";
type FrameworkOptions = "Bootstrap" | "jQuery" | "Tippy" | "PopperJS";
type LibraryOptions = "Google Fonts" | "Font Awesome";
type StatsDataType = {
  [key: string]: {
    watchers: number;
    stars: number;
    forks: number;
  };
};
interface LinkOptions {
  text: string;
  url: string;
  target: "_blank" | "_self";
  children?: React.ReactNode;
}

interface ProjectObj {
  name: string;
  description: string;
  archived?: boolean;
  date?: string;
  links?: LinkOptions[];
  image: string;
  tags: TagOptions[];
  frameworks?: FrameworkOptions[];
  libraries?: LibraryOptions[];
  githubApiLink?: string;
  options?: {
    small?: boolean;
    large? : boolean;
    moreInformation?: InformationButtonState;
    largeTitle?: boolean;
  }
}
interface ContributionObj {
  name: string;
  description: string;
  date?: string;
  links?: LinkOptions[];
  image?: string;
  githubApiLink?: string;
  options?: {
    small?: boolean;
    large? : boolean;
    moreInformation?: InformationButtonState;
    largeTitle?: boolean;
  }
}

const projects: ProjectObj[] = [
  {
    name: "Portfolio",
    description: "My portfolio",
    date: "2023-11-15",
    links: [{
      text: "Github Repo",
      url: "https://github.com/Tyler2P/Portfolio",
      target: "_blank",
      children: <FontAwesomeIcon icon={faGithub} />
    }],
    image: "/favicon192.png",
    tags: ["CSS", "React", "TypeScript"],
    frameworks: ["Bootstrap"],
    libraries: ["Font Awesome"]
  }, {
    name: "Welsh Wedding Photography",
    description: "A feature-rich website for a wedding photography business serving all of Wales. Featuring a contact page and a comprehensive blog system with full posting capabilities.",
    date: "2024-10-09",
    links: [{
      text: "View Project",
      url: "https://welshweddingphotography.co.uk",
      target: "_blank",
      children: <FontAwesomeIcon icon={faEye} />
    }],
    image: "/images/welsh-wedding-photography-icon.webp",
    tags: ["CSS", "Express", "HTML", "JavaScript", "MySQL"],
    frameworks: ["Bootstrap"],
    libraries: ["Font Awesome"]
  }
];

const contributions: ContributionObj[] = [
  {
    name: "Microsoft Reward Chrome Ext",
    description: "A Chrome extension for Microsoft Rewards search, for accounts with two-factor authentication.",
    image: "/images/microsoft-rewards.svg",
    githubApiLink: "https://api.github.com/repos/tmxkn1/Microsoft-Reward-Chrome-Ext",
    links: [{
      text: "Github Repo",
      url: "https://github.com/tmxkn1/Microsoft-Reward-Chrome-Ext",
      target: "_blank",
      children: <FontAwesomeIcon icon={faGithub} />
    }],
    options: {
      largeTitle: true
    }
  }, {
    name: "Discord OwO Bot",
    description: "A Discord bot that will keep track of your OwO",
    image: "/images/discord-owo-bot-icon.webp",
    githubApiLink: "https://api.github.com/repos/ChristopherBThai/Discord-OwO-Bot",
    links: [{
      text: "Github Repo",
      url: "https://github.com/ChristopherBThai/Discord-OwO-Bot",
      target: "_blank",
      children: <FontAwesomeIcon icon={faGithub} />
    }]
  }, {
    name: "Speed Reader",
    description: "A chrome extension to allow users to quickly read long paragraphs",
    githubApiLink: "https://api.github.com/repos/cheekysim/speed-reader",
    links: [{
      text: "Github Repo",
      url: "https://github.com/cheekysim/speed-reader",
      target: "_blank",
      children: <FontAwesomeIcon icon={faGithub} />
    }]
  }
];

function ProjectImageOverlay(props: { text: string }) {
  return (
    <div className="project-image-overlay">
      <h3>{props.text}</h3>
    </div>
  );
}
/**
 * Get a grid of projects 
 * @returns The projects grid
 */
function ProjectsGrid(): JSX.Element {
  const [isArchivedModalOpen, setArchivedModalOpen] = useState<boolean>(false);
  const [archivedModalLink, setArchivedModalLink] = useState<string>("");
  const [archivedModalName, setArchivedModalName] = useState<string>("");

  const displayArchivedModal = (name: string, link: string | null) => {
    setArchivedModalName(name);
    if (link)
      setArchivedModalLink(link);
    setArchivedModalOpen(true);
  }

  if (projects.length > 0) {
    return (
      <>
        <div className="projects-grid">
          {projects.sort((a, b) => (a.archived === b.archived)? 0 : a.archived? 1 : -1).sort((a: ProjectObj, b: ProjectObj) => Number(a.archived) - Number(b.archived)).map((project: ProjectObj, index: number) => (
            <div className={
              [
                "project",
                "card",
                `${project.options?.small ? "card-small" : ""}`,
                `${project.options?.large ? "card-large" : ""}`,
                `${!project.options?.small && !project.options?.large ? "card-medium" : ""}`,
                `${project.options?.largeTitle ? "large-title" : ""}`,
                `${project.archived ? "archived" : ""}`
              ].join(" ").trim()} key={index}
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
                  {project.tags.sort().map((tag: string, index: number) => (
                    <span className="badge text-bg-secondary color-reverse" key={index}>{tag}</span>
                  ))}
                  {project.archived === true && (<span className="badge text-bg-danger color-reverse" key={project.tags.length}>Archived</span>)}
                </div>
                <div className="project-links">
                  {/* <div role="button" className="btn btn-responsive color-reverse">
                    <span className="children-wrapper">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                    <span>More Information</span>
                  </div> */}
                  {project.links?.map((link: LinkOptions, index: number) => (
                    project.archived === true ? (
                      <button className="btn btn-responsive color-reverse" onClick={() => displayArchivedModal(project.name, link.url)} key={index}>
                        {link.children && <span className="children-wrapper">{link.children}</span>}
                        <span>{link.text}</span>
                      </button>
                    ) : (
                      <a href={link.url} target={link.target} key={index}>
                        <button className="btn btn-responsive color-reverse">
                          {link.children && <span className="children-wrapper">{link.children}</span>}
                          <span>{link.text}</span>
                        </button>
                      </a>
                    )
                  ))}
                </div>
              </div>
              {project.date && <p className="date text-center">{project.date}</p>}
            </div>
          ))}
        </div>
        <ArchivedProjectModal isOpen={isArchivedModalOpen} onClose={() => setArchivedModalOpen(false)} link={archivedModalLink} projectName={archivedModalName} />
      </>
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
  const [statsData, setStatsData] = useState<StatsDataType>({});

  useEffect(() => {
    contributions.forEach(contribution => {
      let link = contribution.githubApiLink;

      if (!link || !link.includes("api.github.com/")) return;

      fetch(link)
        .then(response => {
          if (response.status !== 200) return;
          return response.json();
        })
        .then(data => {
          const { stargazers_count, subscribers_count, forks } = data;
          setStatsData(prevData => ({
            ...prevData,
            [contribution.name]: { watchers: subscribers_count, stars: stargazers_count, forks }
          }));
        })
        .catch(error => console.error(error));
    });
  }, [contributions]);

  if (contributions.length > 0) {
    return (
      <div className="projects-grid">
        {contributions.map((contribution: ContributionObj, index: number) => (
          <div className={
            [
              "project",
              "card",
              `${contribution.options?.small ? "card-small" : ""}`,
              `${contribution.options?.large ? "card-large" : ""}`,
              `${!contribution.options?.small && !contribution.options?.large ? "card-medium" : ""}`,
              `${contribution.options?.largeTitle ? "large-title" : ""}`
            ].join(" ")} key={index}
          >
            <div className="project-image-wrapper card-img-top">
              {
                contribution.image ? (
                  <div
                    className="project-image"
                    style={{ backgroundImage: `url(${contribution.image})` }}
                  >
                    <ProjectImageOverlay text={contribution.name} />
                  </div>
                ) : (
                  <div className="project-image project-image-placeholder">
                    <ProjectImageOverlay text={contribution.name} />
                  </div>
                )
              }
            </div>
            <div className="stats-wrapper">
              <div className="stars">
                <FontAwesomeIcon icon={faStar} />
                <span className="data">{statsData[contribution.name]?.stars || 0}</span>
              </div>
              <div className="watchers">
                <FontAwesomeIcon icon={faEye} />
                <span className="data">{statsData[contribution.name]?.watchers || 0}</span>
              </div>
              <div className="forks">
              <FontAwesomeIcon icon={faNetworkWired} />
              <span className="data">{statsData[contribution.name]?.forks || 0}</span>
              </div>
            </div>
            <div className="project-body card-body">
              <p className="card-text color-static">{contribution.description}</p>
              <div className="project-links">
                {/* <div role="button" className="btn btn-responsive color-reverse">
                  <span className="children-wrapper">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>
                  <span>More Information</span>
                </div> */}
                {contribution.links?.map((link: LinkOptions, index: number) => (
                  <a href={link.url} target={link.target} key={index}>
                    <button className="btn btn-responsive color-reverse">
                      {link.children ? <span className="children-wrapper">{link.children}</span> : null}
                      <span>{link.text}</span>
                    </button>
                  </a>
                ))}
              </div>
            </div>
            {contribution.date && <p className="date text-center">{contribution.date}</p>}
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div className="error-modal text-center">
        <h2 className="display-5">No contributions</h2>
        <p className="lead">Nothing to be displayed</p>
      </div>
    )
  }
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
      <Footer includeSeparation="true" />
    </>
  )
}

export default ProjectPage;