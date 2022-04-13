import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import "../../src/assets/css/global/header.css";
import "../../src/assets/css/global/utils.css";

const cache = {
  "hamburger-menu": {
    enabled: true
  }
}

/**
 * A function to be executed every time the window is resized
 */
function windowResized(): void {
  // Define page elements
  let header = document.querySelector<HTMLElement>("header");
  let title = header?.querySelector<HTMLElement>("section.branding > h1");
  let pageList = document.querySelector("header > .wrapper section.navigation-menu > ul") as HTMLElement;

  if (window.outerWidth <= 980) {
    // Mobile
    if (title)
      title.innerText = "TP";
    // Enable the hamburger menu
    cache["hamburger-menu"].enabled = true;
  } else {
    // Desktop
    if (title)
      title.innerText = "Tyler Pearson";
    // Disable the hamburger menu
    cache["hamburger-menu"].enabled = false;
  }
  // Ensure the page-list is optimised for the height of the header
  if (window.outerWidth <= 600) {
    // Ensure the margin-top style has not already been set
    if (pageList.getAttribute("style")?.includes("margin-top"))
      pageList.setAttribute("style", (pageList.getAttribute("style") || "").replace("margin-top", ""));
    // Set the margin-top style
    if (pageList.getAttribute("style"))
      pageList.setAttribute("style", `${(pageList.getAttribute("style") || "")};margin-top:${header?.offsetHeight || 80}px`);
    else
      pageList.setAttribute("style", `margin-top:${(header?.offsetHeight || 80) - 10}px`);
  } else {
    // Ensure the margin-top style has been set
    if (pageList.getAttribute("style")?.includes("margin-top"))
      pageList.setAttribute("style", (pageList.getAttribute("style") || "").replace("margin-top", ""));
  }
}

/**
 * A function to handle the hamburger click event
 */
function hamburgerClick(): void {
  // Ensure the hamburger is enabled
  if (!cache["hamburger-menu"].enabled) throw new Error("The hamburger menu is not enabled for this screen size");

  // Find the page list & toggle the open class
  let pageList = document.querySelector("header > .wrapper section.navigation-menu > ul");
  pageList?.classList.toggle("open");
}

/**
 * A function to handle when the content of the page changes for mobile users
 */
function linkClick(): void {
  // Find the page list & remove the open class
  let pageList = document.querySelector("header > .wrapper section.navigation-menu > ul");
  pageList?.classList.remove("open");
}

/**
 * Get the header JSX markup
 * @returns The JSX for the page
 */
function Header(): JSX.Element {
  useEffect(() => {
    // Add an event listener to the window to detect when the window is resized
    window.addEventListener("resize", windowResized, false);
    // Ensure the header is optimized for the current window size
    windowResized();
  });
  return (
    <>
      <noscript>
        <div id="noscript-display">
          <h5>JavaScript must be enabled for this site to work correctly</h5>
        </div>
      </noscript>
      <header>
        <div className="wrapper">
          <section className="branding">
            <h1>Tyler Pearson</h1>
          </section>
          <section className="navigation-menu">
            <button className="hamburger" onClick={hamburgerClick}>
              <div></div>
              <div></div>
              <div></div>
            </button>
            <ul>
              <li>
                <Link to="/" className="menu-button" onClick={linkClick}>
                  <FontAwesomeIcon icon={faHome} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="menu-button" onClick={linkClick}>
                  <FontAwesomeIcon icon={faCode} />
                  <span>Projects</span>
                </Link>
              </li>
            </ul>
          </section>
          <section className="action-row">
            <a href="https://github.com/Tyler2P" target="_blank" rel="noreferrer" className="button" data-linkto="github">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://stackoverflow.com/users/14267427/tyler2p" target="_blank" rel="noreferrer" className="button" data-linkto="stackoverflow">
              <FontAwesomeIcon icon={faStackOverflow} />
            </a>
          </section>
        </div>
      </header>
    </>
  )
}

export default Header;