import React, { JSX, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import "../../src/assets/css/global/header.css";
import "../../src/assets/css/global/utils.css";

interface HeaderAttributes {
  page: () => string;
}

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
 * @param page The current page
 * @returns The JSX for the page
 */
function Header(attributes: HeaderAttributes): JSX.Element {
  useEffect(() => {
    // Add an event listener to the window to detect when the window is resized
    window.addEventListener("resize", windowResized, false);
    // Ensure the header is optimized for the current window size
    windowResized();
  });
  const elemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let page = attributes?.page();

      // Ensure the elemRef is correct
      if (!elemRef?.current) return;
      // Ensure the current page is the projects page
      if (page === "projects") {
        // Ensure the page is set to dark mode
        if (window.matchMedia("(prefers-color-scheme: light)").matches)
          return elemRef.current.classList.remove("scrolled");

        if (window.scrollY > 125) {
          elemRef.current.classList.add("scrolled");
        } else {
          elemRef.current.classList.remove("scrolled");
        }
      } else if (page === "home") {
        // Ensure the page is set to dark mode
        if (window.matchMedia("(prefers-color-scheme: light)").matches)
          return elemRef.current.classList.remove("scrolled");
        else
          elemRef.current.classList.add("scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  return (
    <>
      <noscript>
        <div id="noscript-display">
          <h5>JavaScript must be enabled for this site to work correctly</h5>
        </div>
      </noscript>
      <header>
        <div className="wrapper" ref={elemRef}>
          <section className="branding">
            <h1 aria-label="Tyler Pearson" translate="no">Tyler Pearson</h1>
          </section>
          <section className="navigation-menu">
            <button className="hamburger" onClick={hamburgerClick} aria-label="Main navigation menu" aria-expanded="false">
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
            <a href="https://github.com/Tyler2P" aria-label="Link to my Github profile" target="_blank" rel="noreferrer" className="button" data-linkto="github">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://stackoverflow.com/users/14267427/tyler2p" aria-label="Link to my Stack Overflow profile" target="_blank" rel="noreferrer" className="button" data-linkto="stackoverflow">
              <FontAwesomeIcon icon={faStackOverflow} />
            </a>
          </section>
        </div>
      </header>
    </>
  )
}

export default Header;