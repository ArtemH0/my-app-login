import React from "react";
import "./RefreshButton.css"; 

const RefreshButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="refresh-button">
      Refresh
    </button>
  );
};

export default RefreshButton;
