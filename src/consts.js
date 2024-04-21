import React, { useState, useEffect } from "react";
import useAccessToken from "./api/getAccessToken";
import useTracks from "./api/getTracks";

export const API_HOST = "";
export const API_URL = "";

function SpotifyAPITesting() {
  const accessToken = useAccessToken();
  const tracks = useTracks(accessToken);

  return (
    <div>
      <h1>Access Token:</h1>
      <p>{accessToken}</p>
      <h2>Tracks:</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpotifyAPITesting;
