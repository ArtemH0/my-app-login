import React, { useState } from "react";
import CatImg from "../../components/CatImg"; 
import RefreshButton from "../../components/RefreshButton/RefreshButton"; 
import "./CatalogPage.css"; 

const CatalogPage = () => {
  const imageSize = 200; 
  const [images, setImages] = useState(
    Array.from({ length: 6 }, (_, index) => index)
  );

  const refreshImages = () => {

    setImages(Array.from({ length: 6 }, () => Math.random()));
  };

  return (
    <div className="catalog-page">
      <h1>Каталог Картинок</h1>
      <div className="catalog-gallery">
        {images.map((key, index) => (
          <CatImg
          key={key} 
          width={imageSize}
          height={imageSize}
          />
        ))}
      </div>
        <RefreshButton onClick={refreshImages} />
    </div>
  );
};

export default CatalogPage;
