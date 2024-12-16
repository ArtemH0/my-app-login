import React, { useEffect, useState } from "react";
import "./CatalogPage.css";
import CatImg from "../../components/CatImg";

const CatalogPage = () => {
  const [catImages, setCatImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCatImages = async () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key":
        "live_4BUbGsIg9hz3AT71uD0qRER5FTcHlrQcItp8QJBYGndtZ7T0EIkq74IlbGwHenUn",
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=5",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cat images");
      }
      const result = await response.json();
      setCatImages(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImages();
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
      <button onClick={fetchCatImages} className="refresh-button">
        Refresh Cats
      </button>
    </div>
  );
};

export default CatalogPage;



