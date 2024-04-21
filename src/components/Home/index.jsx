import React, { useEffect, useState } from "react";
import { VStack, HStack } from "@chakra-ui/react";
import Discover from "./Discover/";
import Message from "./Message/";
import Song from "../Song/";
import SpotifyAPITesting, { API_URL } from "../../consts";
import useTracks from "../../api/getTracks";
import useAccessToken from "../../api/getAccessToken";

function Home() {
  const [user, setUser] = useState({});
  const [topSongs, setTopSongs] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/profile`, {
          method: "POST",
          credentials: "include",
        });
        const userData = await res.json();
        setUser(userData);
        setTopSongs(userData.songs || []);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getProfile();
  }, []);
  const accessToken = useAccessToken();

  const tracks = useTracks(accessToken);
  console.log(tracks);

  return (
    <VStack>
      <HStack mt="7em" mr="45em">
        <Discover />
        {user && <Message user={user} />}
      </HStack>
      <HStack>
        {tracks.map((song) => {
          return <Song key={song.song_id} song={song} />;
        })}
      </HStack>
      {/* <SpotifyAPITesting /> */}
    </VStack>
  );
}
export default Home;
