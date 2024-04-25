import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Text, Button, VStack, Image, Flex } from "@chakra-ui/react";

function Results({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [songTitle, setSongTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      setSongTitle(query); // Set song title from URL query parameter
      handleSearch(query);
    } else {
      setSongTitle('');
      setSearchResults([]);
    }
  }, [location.search]);

  const handleSearch = (query) => {
    // Simulate fetching search results (replace with actual API call)
    const results = [
      { id: 1, title: "Song Title 1", artist: "Artist 1", album: "Album 1", image: "https://via.placeholder.com/100" },
      { id: 2, title: "Song Title 2", artist: "Artist 2", album: "Album 2", image: "https://via.placeholder.com/100" },
      { id: 3, title: "Song Title 3", artist: "Artist 3", album: "Album 3", image: "https://via.placeholder.com/100" },
    ];
    setSearchResults(results);
  };

  return (
    <div className="search-results">
      {songTitle && (
        <Text as="h2" size="md" mt={20} ml={40} color="white">
          Showing Search Results for "{songTitle}"
        </Text>
      )}

      <VStack mt={4} ml={40} spacing={4} align="stretch" maxW="80%">
        {searchResults.map((song) => (
          <Box key={song.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
            <Flex align="center">
              <Image src={song.image} alt={song.album} boxSize="100px" objectFit="cover" mr={4} />

              <VStack spacing={2} align="flex-start">
                <Text fontSize="md" color="black">{song.title}</Text>
                <Text fontSize="sm" color="gray.500">{song.artist}</Text>
              </VStack>
            </Flex>

            <Button colorScheme="purple" size="sm" mt={2} ml="auto">
            <Link to={`/details`} style={{ textDecoration: "none", color: "white" }}>
              {/* <Link to={`/details/${song.id}`} style={{ textDecoration: "none", color: "white" }}> */}
                View Details
              </Link>
            </Button>
          </Box>
        ))}
      </VStack>
    </div>
  );
}

export default Results;
