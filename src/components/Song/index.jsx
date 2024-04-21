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
    </Box>
  );
}
export default Song;
