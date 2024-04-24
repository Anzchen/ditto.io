import React, { useEffect, useState } from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import Discover from "./Discover/";
import Message from "./Message/";
import Song from "../Song/";
import SpotifyAPITesting, { API_URL } from "../../consts";
import useTracks from "../../api/getTracks";
import useAccessToken from "../../api/getAccessToken";
import { useInstantTransition } from "framer-motion";
import axios from "axios";
function Home() {
  const [user, setUser] = useState({});
  const [topSongs, setTopSongs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        if (isUser) {
          setUser(isUser);
          setTopSongs(isUser.songs);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error fetching user profile:", error);
      }
    };
    getProfile();
  }, [setUser]);
  const accessToken = useAccessToken();

  const tracks = useTracks(accessToken, topSongs);
  console.log(tracks);

  return (
    <VStack>
      <HStack mt="7em" mr="45em">
        <Discover />
        {user && <Message user={user} isLoggedIn={isLoggedIn} />}
      </HStack>
      {isLoggedIn ? (
        <HStack>
          {tracks.length > 0 ? (
            tracks.map((song) => {
              return <Song key={song.song_id} song={song} />;
            })
          ) : (
            <Text color="white">No songs available.</Text>
          )}
        </HStack>
      ) : (
        <HStack>
          <Text color="white">Log in to see user data </Text>
        </HStack>
      )}
    </VStack>
  );
}
export default Home;
