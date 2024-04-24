import React, { useState, useEffect, useContext } from "react";
import { VStack, HStack, Box, Image, Text, Button } from "@chakra-ui/react";
import ReviewItem from "./ReviewItem/";
import CreateReview from "./CreateReview";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAccessToken from "../../api/getAccessToken";
import useTracks from "../../api/getTracks";
import Song from "../Song";

export default function Details() {
  const { songId } = useParams(); // Extract songid from URL params
  const [token, setToken] = useState(null);
  // const [song, setSong] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [displayCreateReview, setDisplayCreateReview] = useState(false);

  const accessToken = useAccessToken();

  const list = [songId];

  console.log(accessToken);
  const trackInfo = useTracks(accessToken, list);
  console.log(list);

  // useEffect(() => {
  // async function fetchSongDetails() {
  //   try {
  //     // Fetch song details using songid from API
  //     const response = await axios.get(`http://localhost:4000/api/songs/${songId}`);
  //     setSong(response.data);
  //   } catch (error) {
  //     console.error("Error fetching song details:", error);
  //   }
  // }
  useEffect(() => {
    // async function fetchSongDetails() {
    //   try {
    //     // Fetch song details using songid from API
    //     const response = await axios.get(`http://localhost:4000/api/songs/${songId}`);
    //     setSong(response.data);
    //   } catch (error) {
    //     console.error("Error fetching song details:", error);
    //   }
    // }

    async function getAccessToken() {
      try {
        // Fetch reviews for the song using songid
        const reviews = await axios.get(`http://localhost:4000/api/reviews/users/accessToken`);
        setToken(reviews.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    async function fetchReviews() {
      try {
        // Fetch reviews for the song using songid
        const reviews = await axios.get(`http://localhost:4000/api/reviews/songs/${songId}`);
        setReviewList(reviews.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    // if (songId) {
    //   // fetchSongDetails();
    //   fetchReviews();
    // }
  }, []);

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

  return (
    <VStack p="4">
      {trackInfo && (
        <HStack mt="2em">
          <Box width="18em" height="20em" bg="white" p="4" borderRadius="1em">
            {/* <Song key={songId} song={trackInfo} /> */}
            {/* <Image height="12em" p="1" src={song.images} alt={song.name} />
            <Text align="center">{song.name}</Text> */}
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
