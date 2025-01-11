export const fetchCatImages = async () => {
    const apiKey = process.env.REACT_APP_CAT_API_KEY;
    const catDomain = process.env.REACT_APP_CAT_API;
    const catSearchEndpoint = process.env.REACT_APP_SEARCH_CAT;

    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    });

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    const url = new URL(catSearchEndpoint, catDomain);

    url.search = new URLSearchParams({
        size: 'med',
        mime_types: 'jpg',
        format: 'json',
        has_breeds: true,
        order: 'RANDOM',
        page: 0,
        limit: 5,
    }).toString();

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to fetch cat images");
      }
      
      return await response.json();
    } catch (err) {
        console.error("Failed to fetch cat images", err);
        throw err;
    } 
  };