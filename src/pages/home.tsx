// Dependancies
import React from "react";
// Stylesheets
import "../../src/assets/css/views/home.css";
// Components
import Footer from "../includes/footer";

/**
 * Get the home page's content
 * @returns The home page
 */
function HomePage(): JSX.Element {
  React.useEffect(() => {
    // Change the title of the page
    document.title = "Home | Tyler Pearson";
  });
  return (
    <>
      <section id="coming-soon">
        <h3 className="display-3">Coming Soon</h3>
      </section>
      <Footer includeSeperation="true" />
    </>
  )
}

export default HomePage;