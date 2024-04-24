import React, { useState, useEffect, useContext } from "react";
import {
  VStack,
  HStack,
  Box,
  Image,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import ReviewItem from "./ReviewItem/";
import CreateReview from "./CreateReview";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAccessToken from "../../api/getAccessToken";
import useTracks from "../../api/getTracks";
import Song from "../Song";

export default function Details() {
  const { songId } = useParams(); // Extract songid from URL params
  const [token, setToken] = useState("");
  // const [song, setSong] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [displayCreateReview, setDisplayCreateReview] = useState(false);
  // const [tracks, setTracks] = useState([]);

  // useEffect(() => {
  //   async function getAccessToken() {
  //     try {
  //       await fetch("https://accounts.spotify.com/api/token", {
  //         body: "grant_type=client_credentials&client_id=2825a9fb713340c784dddba2c67a5213&client_secret=fea9bac4ca6f4988a89b76ead0579514",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         method: "POST",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setToken(data.access_token);
  //         });
  //       // Fetch reviews for the song using songid
  //       console.log("token" + token);
  //     } catch (error) {
  //       console.error("Error fetching access token:", error);
  //     }
  //   }

  //   async function fetchReviews() {
  //     try {
  //       // Fetch reviews for the song using songid
  //       const reviews = await axios.get(
  //         `http://localhost:4000/api/reviews/songs/${songId}`
  //       );
  //       setReviewList(reviews.data);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     }
  //   }

  //   async function getTracks() {
  //     console.error("get tracks : token: " + token);
  //     if (token) {
  //       await fetch(`https://api.spotify.com/v1/tracks?ids=${[songId]}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setTracks(data.tracks);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching tracks:", error);
  //         });
  //     }
  //   }

  //   getAccessToken();
  //   fetchReviews();
  //   getTracks();
  // }, []);

  useEffect(() => {
    // const getProfile = async () => {
    //   try {
    //     const res = await axios.post("http://localhost:4000/api/users/profile");
    //     const isUser = res.data;
    //     if (isUser) {
    //       setUser(isUser);
    //       setTopSongs(isUser.songs);
    //       setIsLoggedIn(true);
    //       LogoutEmitter.on("loggedOut", logout);
    //     } else {
    //       setIsLoggedIn(false);
    //     }
    //   } catch (error) {
    //     setIsLoggedIn(false);
    //     console.error("Error fetching user profile:", error);
    //   }
    // };
    // getProfile();
  }, []);
  const accessToken = useAccessToken();

  const tracks = useTracks(accessToken, [songId]);
  console.log(tracks);

  const createReviewButton = (
    <Button
      onClick={() => setDisplayCreateReview(true)}
      bg="green"
      color="white"
      mb="2em"
    >
      + Add a Review
    </Button>
  );

  function returnSong(tracks) {
    <Song key={songId} song={tracks} />;
  }

  return (
    <VStack p="4">
      {tracks && (
        <HStack mt="2em">
          <Box width="18em" height="20em" bg="white" p="4" borderRadius="1em">
            {tracks.length > 0 ? (
              tracks.map((song) => {
                return <Song key={song.song_id} song={song} />;
              })
            ) : (
              <Text color="white">No songs available.</Text>
            )}
          </Box>
          <Box color="green" p="3" ml="5em">
            <Text>
              Song Details:
              <br />
              <br />
              {/* {song.artists.join(", ")} <br />
              {song.duration_ms} ms <br />
              {song.genres.join(", ")} <br />
              {song.release_date} <br /> */}
            </Text>
          </Box>
          {createReviewButton}
        </HStack>
      )}

      <VStack>
        {displayCreateReview && <CreateReview user={"user1"} track={songId} />}
        <Text mt="2em" color="white">
          Reviews
          <Text
            ml="1em"
            as="span"
            bg="pink"
            color="red"
            h="1"
            borderRadius="50%"
            p="1"
          >
            {reviewList.length}
          </Text>
        </Text>
        {reviewList.length > 0 ? (
          reviewList.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <Text color="white">No reviews available.</Text>
        )}
      </VStack>
    </VStack>
  );
}
