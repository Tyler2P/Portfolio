// Default React Imports
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// Third Party Imports
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// Pages
import HomePage from "./pages/home";
import ProjectPage from "./pages/projects";
import { Error404 } from "./pages/http-errors";
// Global Imports
import Header from "./includes/header";

/**
 * Get the routes for the application
 * @returns {React.Component} The routes for the application
 */
function Navigation() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  const pathnameArray = (displayLocation.pathname).split("/");
  const pageList = ["home", "projects"];
  let page = "";

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
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  console.log(displayLocation.pathname);

  // Return the routes for the application
  return (
      <div
        className={`root-page ${transitionStage}`}
        data-page-name={page}
        onAnimationEnd={(() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        })}
      >
        <Routes location={displayLocation}>
          <Route path="/" key="/" element={<HomePage />} />
          <Route path="/projects" key="/projects" element={<ProjectPage />} />
          <Route path="/projects" key="/projects/:project" element={<ProjectPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
  );
}

// Render the HTML body
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Header />
			<Navigation />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);