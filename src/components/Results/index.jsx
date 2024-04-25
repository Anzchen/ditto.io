import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Text, Button, VStack, Image, Flex } from "@chakra-ui/react";
import useAccessToken from "../../api/getAccessToken";
import SearchTrack from "../../api/findTrack";
import axios from "axios";
import LogoutEmitter from "../../emit/LogoutEmitter";
import * as client from "../../client.ts";

function Results() {
  const [user, setUser] = useState({});
  const [topSongs, setTopSongs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (query) window.location.reload();
    setQuery(new URLSearchParams(location.search).get("query"));
    if (new URLSearchParams(location.search).get("query") === "")
      setQuery("hehe");

    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        if (isUser) {
          setUser(isUser);
          setTopSongs(isUser.songs);
          setIsLoggedIn(true);
          LogoutEmitter.on("loggedOut", logout);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error fetching user profile:", error);
      }
    };
    getProfile();
  }, [location.search, setUser]);

  function logout() {
    setIsLoggedIn(false);
    LogoutEmitter.removeListener("loggedOut", logout);
  }

  const addToFavorite = async (songId) => {
    try {
      await client.addToFavorite(songId);
      LogoutEmitter.emit("addedFavorite");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const accessToken = useAccessToken();
  const results = SearchTrack(accessToken, query).items;

  return (
    <VStack ml={40} spacing={4} mt="4em" align="stretch" maxW="80%">
      <Text as="h2" size="md" mt={20} ml={40} color="white">
        Showing Search Results for "{query}"
      </Text>
      {results ? (
        results.map((song) => (
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

            {user.songs && !user.songs.includes(song.id) ? (
              <Button
                colorScheme="purple"
                color="white"
                size="sm"
                mt={2}
                ml="1em"
                onClick={() => addToFavorite(song.id)}
              >
                Add as favorite
              </Button>
            ) : (
              <></>
            )}
          </Box>
        ))
      ) : (
        <></>
      )}
    </VStack>
  );
}

export default Results;
