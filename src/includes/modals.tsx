import React, { useRef, useState, useEffect } from "react";
// Stylesheets
import "../../src/assets/css/views/modals.css";

interface ArchivedModalAttributes {
  projectName: string;
  link: string;
  isOpen: boolean;
  onClose?: () => void;
}

function ArchivedProjectModal(attributes: ArchivedModalAttributes): JSX.Element {
  const [isModalOpen, setModalOpen] = useState<boolean>(attributes.isOpen);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Detect if the isOpen attribute changes
  useEffect(() => {
    setModalOpen(attributes.isOpen);
  }, [attributes.isOpen]);

  // Modal functionality
  const handleContinueBtn = () => {
    window.open(attributes.link, '_blank')?.focus();
    handleCloseModal();
  }
  const handleCloseModal = () => {
    if (attributes.onClose) {
      attributes.onClose();
    }
    setModalOpen(false);
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.key).toLowerCase() === "escape") {
      handleCloseModal();
    }
  }

  return (
    <div className={(isModalOpen ? "show " : "") + "modal fade"} id="archived-project-modal" tabIndex={-1} aria-hidden="true" ref={modalRef} onKeyDown={handleKeyDown}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <h3>This project has been archived</h3>

          <p>The project <strong>{attributes.projectName}</strong> has been <span className="text-danger"><strong>archived</strong></span>.</p>
          <p>This means that you'll be redirected to the <a href="https://en.wikipedia.org/wiki/Wayback_Machine" target="_blank">wayback machine</a>.</p>

          <div className="btn-wrapper">
            <button className="btn btn-responsive" onClick={handleContinueBtn}>Continue</button>
            <button className="btn" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ArchivedProjectModal };