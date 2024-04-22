import React from "react";
import { Text, Box, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Song(props) {
  const navigate = useNavigate();

  const handleSongClick = () => {
    // Redirect to the review page when song box is clicked
    navigate(`/reviews/${props.song.id}`);
  };

  return (
    <Flex
      direction="column"
      align="center"
      ml="4em"
      bg="white"
      w="12em"
      borderRadius=".5em"
      p="1em"
      boxShadow="md"
      cursor="pointer" // Add cursor pointer for clickable effect
      onClick={handleSongClick} 
    >
      {/* Album Cover */}
      <Image
        src={props.song.album.images[0].url} 
        alt={props.song.album.name} 
        borderRadius=".5em"
        mb="0.5em"
      />

      {/* Song Title */}
      <Text fontWeight="bold" color="black" fontSize="lg" > 
        {props.song.name}
      </Text>

      {/* Artist Name */}
      <Text fontSize="sm" color="gray.600">
        {props.song.artists.map((artist) => artist.name).join(", ")}
      </Text>
    </Flex>
  );
}

export default Song;



{/* here's a link to all the things we can get from a song:
      https://developer.spotify.com/documentation/web-api/reference/get-several-tracks  */}

