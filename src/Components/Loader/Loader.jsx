import React from "react";
import ReactDOM from "react-dom";
import LoaderImage from "../../assets/loader.gif";

export const Loader = () => {
  const loaderContent = (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 9999, // High z-index to ensure it's on top of everything
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "white",
          fontSize: "48px",
        }}
      >
        <img src={LoaderImage} alt='Loading' height={60} />
      </div>
    </div>
  );

  // Create a portal that renders the loader to the body
  return ReactDOM.createPortal(loaderContent, document.body);
};
