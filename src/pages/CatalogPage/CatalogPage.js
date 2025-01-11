import React, { useEffect, useState } from "react";
import "./CatalogPage.css";
import CatImg from "../../components/CatImg";
import { fetchCatImages } from "../../api";

const CatalogPage = () => {
  const [catImages, setCatImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setIsLoading(true);
    const res = await fetchCatImages();
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    setCatImages(res);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="catalog-page">
      <h1>Cat Gallery</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="cat-images-grid">
        {catImages.map((cat, index) => (
          <CatImg key={index} imageUrl={cat.url} />
        ))}
      </div>
      <button onClick={fetchImages} className="refresh-button">
        Refresh Cats
      </button>
    </div>
  );
};

export default CatalogPage;



