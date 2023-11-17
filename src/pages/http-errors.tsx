// Dependencies
import React from "react";
import { Link } from "react-router-dom";
// Stylesheets
import "../../src/assets/css/global/error-styles.css";
// Components
import Footer from "../includes/footer";

export function Error404() {
  React.useEffect(() => {
    // Change the title of the page
    document.title = "404 | Tyler Pearson";
  });
  return (
    <>
      <div className="wrapper text-center bg-transparent" data-page="http-error">
          <h1 className="display-3">404</h1>
          <p className="lead">The page you're looking for doesn't exist</p>
          <Link to="/" className="btn btn-responsive">Return Home</Link>
      </div>
      <Footer includeSeparation="true" />
    </>
  )
}