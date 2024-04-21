import { useState, useEffect } from "react";

const useTracks = (accessToken) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (accessToken) {
      fetch(
        "https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.tracks);
        })
        .catch((error) => {
          console.error("Error fetching tracks:", error);
        });
    }
  }, [accessToken]);

  return tracks;
};

export default useTracks;
