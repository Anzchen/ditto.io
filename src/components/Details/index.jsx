import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import useAccessToken from "../../api/getAccessToken";
import useTracks from "../../api/getTracks";
import LogoutEmitter from "../../emit/LogoutEmitter";

export default function Details() {
  const { songId } = useParams(); // Extract songid from URL params
  const [reviewList, setReviewList] = useState([]);
  const [displayCreateReview, setDisplayCreateReview] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        if (isUser) {
          setAuth(true);
          setCurrentUser(isUser);
          LogoutEmitter.on("deletedReview", () => window.location.reload());
          LogoutEmitter.removeListener("deletedReview", () =>
            window.location.reload()
          );
          LogoutEmitter.on("createdReview", () => window.location.reload());
          LogoutEmitter.removeListener("deletedReview", () =>
            window.location.reload()
          );
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error(error);
        setAuth(false);
      }
    };

    async function fetchReviews() {
      try {
        // Fetch reviews for the song using songid
        const reviews = await axios.get(
          `http://localhost:4000/api/reviews/songs/${songId}`
        );
        setReviewList(reviews.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    getProfile();
    fetchReviews();
  }, [navigate]);

  async function fetchReviews() {
    try {
      // Fetch reviews for the song using songid
      const reviews = await axios.get(
        `http://localhost:4000/api/reviews/songs/${songId}`
      );
      setReviewList(reviews.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  const accessToken = useAccessToken();
  const tracks = useTracks(accessToken, [songId]);
  console.log(tracks);

  const createReviewButton = (
    <Button
      onClick={() => {
        if (auth) setDisplayCreateReview(true);
        else navigate("/login");
      }}
      bg="green"
      color="white"
      mb="5em"
      ml="30em"
      flexWrap="wrap"
    >
      + Add a Review
    </Button>
  );

  return (
    <VStack p="20" align="stretch">
      {tracks.length > 0 ? (
        tracks.map((track) => {
          console.log(track);
          return (
            <HStack key={track.id} spacing="4" flexWrap="wrap" justify="center">
              <Flex
                direction="column"
                align="center"
                margin="2em"
                bg="white"
                w="18em"
                h="22em"
                borderRadius="1em"
                p="4"
                boxShadow="md"
              >
                <Image
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  borderRadius=".5em"
                  mb="0.5em"
                />

                <Text fontWeight="bold" color="black" fontSize="lg">
                  {track.name}
                </Text>

                <Text fontSize="sm" color="gray.600">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </Text>
              </Flex>
              <Box color="white" p="3" maxWidth="300px">
  <Text fontSize="sm">
    <strong>Song Details:</strong>
    <br />
    <br />
    <strong>Artist(s):</strong> {track.artists.map((artist) => artist.name).join(", ")}
    <br />
    <strong>Duration:</strong> {(track.duration_ms)} 
    <br />
    <strong>Release Date:</strong> {(track.album.release_date)} 
  </Text>
</Box>
              {createReviewButton}
            </HStack>
          );
        })
      ) : (
        <Text color="white">No songs available.</Text>
      )}

      <VStack flexWrap="wrap">
        {displayCreateReview && <CreateReview user={user} track={songId} />}
        <Text mt="2em" mr="61em" color="white">
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
