// Default React Imports
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
// Third Party Imports
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// Pages
import HomePage from "./pages/home";
import ProjectPage from "./pages/projects";
import { Error404 } from "./pages/http-errors";
// Global Imports
import Header from "./includes/header";
// Stylesheets
import "./assets/css/views/footer.css";

const pageList = ["home", "projects"];
let page = "home";

function getPage() {
  return page;
}

/**
 * Get the routes for the application
 * @returns {React.Component} The routes for the application
 */
function Navigation() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const pathnameArray = (displayLocation.pathname).split("/");

  if (displayLocation.pathname === "/") {
    page = "home";
  } else {
    pathnameArray.forEach(pathname => {
      if (pageList.includes(pathname)) {
        page = pathname;
      } else if (page === "") {
        page = "404";
      }
    });
  }

  // Update the displayed content when the location changes
  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  // Return the routes for the application
  return (
    <div
      className={`root-page ${transitionStage}`}
      data-page-name={page}
      onAnimationEnd={(() => {
        if (transitionStage === "fadeOut") {
          setTransitionStage("fadeIn");
          setDisplayLocation(location);
        }
      })}
    >
      <Routes location={displayLocation}>
        <Route path="/" key="/" element={<HomePage />} />
        <Route path="/home" key="/" element={<HomePage />} />
        <Route path="/projects" key="/projects" element={<ProjectPage />} />
        <Route path="/projects" key="/projects/:project" element={<ProjectPage />} />
        <Route path="*" element={() => {
          return (<Error404 />)
        }} />
      </Routes>
    </div>
  );
}

// Render the HTML body
const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Header page={getPage} />
			<Navigation />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);