import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Text, Button, VStack, Image, Flex } from "@chakra-ui/react";
import useAccessToken from "../../api/getAccessToken";
import SearchTrack from "../../api/findTrack";

function Results({ searchQuery }) {
  const [songTitle, setSongTitle] = useState("");
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("query"));
    if (query === "")
      setQuery("hehe") // default
    else
      setSongTitle(query); // Set song title from URL query parameter
  }, [location.search]);

  const accessToken = useAccessToken();
  const results = SearchTrack(accessToken, query);
  console.log(results)

  return (
    <VStack ml={40} spacing={4} mt="4em" align="stretch" maxW="80%">
      {songTitle && (
        <Text as="h2" size="md" mt={20} ml={40} color="white">
          Showing Search Results for "{songTitle}"
        </Text>
      )}
      {results.items ? (
        results.items.map((song) => (
        <Box
          key={song.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.100"
        >
          <Flex align="center">
            <Image
              src={song.album.images[0].url}
              alt={song.album}
              boxSize="100px"
              objectFit="cover"
              mr={4}
            />

            <VStack spacing={2} align="flex-start">
              <Text fontSize="md" color="black">
                {song.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {song.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </VStack>
          </Flex>

          <Button colorScheme="purple" size="sm" mt={2} ml="auto">
            <Link
              to={`/details/${song.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              View Details
            </Link>
          </Button>
        </Box>
      ))
    ) : (<></>)}
    </VStack>
  );
}

export default Results;
