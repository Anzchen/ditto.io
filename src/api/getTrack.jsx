import { useState, useEffect } from "react";

const useTrack = (accessToken, trackId) => {
  const [track, setTrack] = useState([]);

  useEffect(() => {
    async function getTrack() {
      if (accessToken) {
        await fetch(`https://api.spotify.com/v1/track/${trackId}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTrack(data.track);
          })
          .catch((error) => {
            console.error("Error fetching tracks:", error);
          });
      }
    }
    getTrack();
  }, [accessToken]);

  return track;
};

export default useTrack;