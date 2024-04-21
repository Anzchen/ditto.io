import React, { useState, useEffect } from "react";
import { VStack, HStack, Box, Image, Text, Button } from "@chakra-ui/react";
import ReviewItem from "./ReviewItem/";
import CreateReview from "./CreateReview";
import axios from "axios";

// Need to get Song Information from parent component
export default function Details(props) {
  const songid = "7ouMYWpwJ422jRcDASZB7P";
  const [reviewList, setReviewList] = useState([]);
  const [displayCreateReview, setDisplayCreateReview] = useState(false);

  useEffect(() => {
    async function getReviews() {
      const reviews = await axios.get(
        `http://localhost:4000/api/reviews/songs/${songid}`
      );
      setReviewList(reviews.data[0]);
    }
    getReviews();
  }, []);

  const createReviewButton = (
    <Button onClick={() => setDisplayCreateReview(true)} bg="green" color="white" mb="7em" ml="20em">
    + Add a Review
    </Button>
  );

  return (
    <VStack p="4">
      <HStack mt="7em">
        <Box width="18em" height="20em" bg="white" p="4" borderRadius="1em">
          {/* Replace the following using song: images*/}
          <Image height="12em" p="1" src="images/discover.png" />
          {/* Replace the following using song: name*/}
          <Text align="center">Song Title</Text>
        </Box>
        <Box color="green" p="3" ml="5em">
          <Text>
            Song Details:
            <br />
          </Text>
          {/* Replace using song: artists, duration_ms, genres, release_date */}
          <Text>
            <br />
            artists <br />
            duration_ms <br />
            genres <br />
            release_date <br />
          </Text>
        </Box>
        {createReviewButton}
      </HStack>
      <VStack>
        {/* have to pass song_id and username to CreateReview */}
      {displayCreateReview && <CreateReview user={"user1"} track={songid}/>}
        <Text mt="5em" mr="60em" color="white">
          Reviews
          <Text ml="1em" as="span" bg="pink" color="red" h="1" borderRadius="50%" p="1">
            {Array(reviewList).length}
          </Text>
        </Text>
        {console.log(reviewList)}
        {console.log(Array(reviewList).length)}
        {Array(reviewList).length > 0 ? (
          Array(reviewList).map((review) => {
            return <ReviewItem review={review} />;
          })
        ) : (
          <Text color="white">No reviews available.</Text>
        )}
      </VStack>
    </VStack>
  );
}
