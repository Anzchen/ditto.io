import React, { useState, useEffect } from "react";
import { VStack, HStack, Box, Image, Text, Button } from "@chakra-ui/react";
import ReviewItem from "./ReviewItem";
import CreateReview from "./CreateReview";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
  const { songId } = useParams(); // Extract songId from URL parameters
  const [reviewList, setReviewList] = useState([]);
  const [displayCreateReview, setDisplayCreateReview] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axios.get(`http://localhost:4000/api/reviews/songs/${songId}`);
        setReviewList(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    getReviews();
  }, [songId]); // Fetch reviews whenever songId changes

  const handleCreateReview = () => {
    setDisplayCreateReview(true);
  };

  return (
    <VStack p="4">
      <HStack mt="7em">
        {/* Display song details */}
        <Box width="18em" height="20em" bg="white" p="4" borderRadius="1em">
          {/* Replace with actual song image */}
          <Image height="12em" p="1" src="images/discover.png" />
          {/* Replace with actual song title */}
          <Text align="center">Song Title</Text>
        </Box>
        <Box color="green" p="3" ml="5em">
          <Text>
            Song Details:
            <br />
            {/* Display actual song details */}
            {/* Example: artists, duration_ms, genres, release_date */}
            <br />
            artists <br />
            duration_ms <br />
            genres <br />
            release_date <br />
          </Text>
          {/* Button to trigger review creation */}
          <Button onClick={handleCreateReview} bg="green" color="white" mt="2em">
            + Add a Review
          </Button>
        </Box>
      </HStack>
      {/* Display CreateReview component if displayCreateReview is true */}
      {displayCreateReview && <CreateReview songId={songId} />}
      {/* Display reviews */}
      <VStack>
        <Text mt="5em" color="white">
          Reviews
          {/* Display number of reviews */}
          <Text as="span" bg="pink" color="red" borderRadius="50%" p="1">
            {reviewList.length}
          </Text>
        </Text>
        {reviewList.length > 0 ? (
          reviewList.map((review) => <ReviewItem key={review.id} review={review} />)
        ) : (
          <Text color="white">No reviews available.</Text>
        )}
      </VStack>
    </VStack>
  );
}