// Dependencies
import React from "react";
// Stylesheets
import "../../src/assets/css/global/footer.css";

/**
 * The footer JSX markup
 * @returns The footer JSX for the page
 */
function Footer(props: { includeSeparation: "true" | "false" }): JSX.Element {
  return (
    <footer className="no-select">
      <div className="wrapper">
        {props.includeSeparation === "true" ? <hr /> : null}
        <p className="lead text-center" aria-label={`Copyright ${new Date().getUTCFullYear()}. All rights reserved`}>{`${String.fromCharCode(169)} 2020 - ${new Date().getUTCFullYear()} Tyler Pearson - All Rights Reserved`}</p>
      </div>
    </footer>
  )
}

export default Footer;