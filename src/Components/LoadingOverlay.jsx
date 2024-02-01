import React from "react";

export const LoadingOverlay = () => {
  return (
    <div className={`loading-overlay visible`}>
      <img src="/movies-app/loading-overlay.gif" alt="Loading..." />
      <p className="text-light">loading...</p>
    </div>
  );
};
