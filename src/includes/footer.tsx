import React from "react";
import "../../src/assets/css/global/footer.css";

/**
 * The footer JSX markup
 * @returns The footer JSX for the page
 */
function Footer(props: { includeSeperation: "true" | "false" }): JSX.Element {
  return (
    <footer className="no-select">
      <div className="wrapper">
        {props.includeSeperation === "true" ? <hr /> : null}
        <p className="lead text-center" aria-label={`Copyright ${new Date().getUTCFullYear()}. All rights reserved`}>{`${String.fromCharCode(169)} 2020 - ${new Date().getUTCFullYear()} Tyler Pearson - All Rights Reserved`}</p>
        <ul>
          <li className="lead">
            <a href="/legal/terms" target="_blank" aria-label="Read our Terms and Conditions to using the site">Terms and Conditions</a>
          </li>
          <li className="lead">
            <a href="/legal/privacy-policy" target="_blank" aria-label="Read our Privacy Policy">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;