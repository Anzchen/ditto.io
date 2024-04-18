import React, { useState } from "react";
import { Box, HStack, Flex } from "@chakra-ui/react"
import Discover from "./Discover/";
import Message from "./Message/";
import Song from "../Song/";

function Home() {
  const [topSongs, setTopSongs] = useState([]);
  return (
    <>
    <Flex>
      <Box>
        <Discover/>
        <Message/>
        <HStack>
          {
            topSongs.map(song => {
              return (
                <Song key={song.song_id} song={song}/>
              );
            })
          }
        </HStack>
      </Box>
    </Flex>
    </>
  );
}
export default Home;
