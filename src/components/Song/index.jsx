import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react";

function Song(props) {
  const [rating, setRating] = useState(0);

  return (
    <Box ml="2em" as="b" bg="white" w="100%" borderRadius=".5em">
      <Text color="black">
        {props.song.name}
        <br />
      </Text>
      {/* here's a link to all the things we can get from a song:
      https://developer.spotify.com/documentation/web-api/reference/get-several-tracks  */}
    </Box>
  );
}
export default Song;
