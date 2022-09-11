import React from "react";
import RabbitImage from "./rabbit.png";

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <img src={RabbitImage} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;
