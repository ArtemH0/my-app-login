import React from "react";

const CatImg = ({ imageUrl }) => {
  return (
    <div className="cat-image-container">
      <img src={imageUrl} alt="A cute cat" className="cat-image" />
    </div>
  );
};

export default CatImg;
