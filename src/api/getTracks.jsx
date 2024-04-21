import { useState, useEffect } from "react";

const useTracks = (accessToken, trackIds) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function getTracks() {
      if (accessToken) {
        await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTracks(data.tracks);
          })
          .catch((error) => {
            console.error("Error fetching tracks:", error);
          });
      }
    }
    getTracks();
  }, [accessToken]);

  return tracks;
};

export default useTracks;
