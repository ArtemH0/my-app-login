import React, { useState, useEffect } from "react";

const CatImg = ({ alt, width, height }) => {
  const [imgUrl, setImgUrl] = useState(null); // Для URL картинки
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки

  useEffect(() => {
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

    const fetchCatImage = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
          requestOptions
        );
        const data = await response.json();
        setImgUrl(data[0]?.url || ""); // Извлекаем URL изображения
      } catch (err) {
        setError("Не удалось загрузить изображение");
      } finally {
        setLoading(false);
      }
    };

    fetchCatImage();
  }, []);

  if (loading) {
    return (
      <div
        className="cat-img-wrapper"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="cat-img-wrapper"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="cat-img-wrapper"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img className="cat-img" src={imgUrl} alt={alt} />
    </div>
  );
};

export default CatImg;
