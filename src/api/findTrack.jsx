import { useState, useEffect } from "react";

const SearchTrack = (accessToken, text) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function findTrack() {
      if (accessToken) {
        await fetch(`https://api.spotify.com/v1/search/q=${text}&type=track`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTracks(data.track);
          })
          .catch((error) => {
            console.error("Error fetching track:", error);
          });
      }
    }
    findTrack();
  }, [accessToken]);

  return tracks;
};

export default SearchTrack;