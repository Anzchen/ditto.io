import React, { useState } from "react";
import { VStack, HStack } from "@chakra-ui/react"
import Discover from "./Discover/";
import Message from "./Message/";
import Song from "../Song/";
import SpotifyAPITesting, { API_URL } from "../../consts";

function Home() {
  
  const [user, setUser] = useState({});
  const getProfile = () => {
    fetch(`${API_URL}/profile`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
    .then(user => {
      setUser(user);
    });
  }
  
  const [topSongs, setTopSongs] = useState([]);
  return (
    <VStack>
      <HStack mt="7em" mr="45em">
        <Discover/>
        { user &&
          <Message user={user}/>
        }
      </HStack>
      <HStack>
        {
          topSongs.map(song => {
            return (
              <Song key={song.song_id} song={song}/>
            );
          })
        }
      </HStack>
      <SpotifyAPITesting/>
    </VStack>
  );
}
export default Home;
