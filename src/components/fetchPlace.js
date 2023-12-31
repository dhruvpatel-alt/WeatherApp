export const fetchPlace = async (text) => {
    try {
        const apiKey=process.env.REACT_APP_MAPBOX_API_KEY
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${apiKey}&cachebuster=1625641871908&autocomplete=true&types=place`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };