import React, { useState, useEffect } from "react";
import { VStack, HStack, Box, Image, Text, Button } from "@chakra-ui/react"
import ReviewItem from "./ReviewItem/";
import axios from "axios";

// Need to get Song Information from parent component
function Details() {
  const songid = "7ouMYWpwJ422jRcDASZB7P";
  const [reviewList, setReviewList] = useState([
    // {
    //   song_id: "7ouMYWpwJ422jRcDASZB7P",
    //   star_rating: 5,
    //   timestamp: 1,
    //   reviewer: "Ant",
    //   text: "this song was great!",
    // }, 
    // {
    //   song_id: "7ouMYWpwJ422jRcDASZB7P",
    //   star_rating: 3,
    //   timestamp: 2,
    //   reviewer: "Aidan",
    //   text: "this song was great2!",
    // },
    // {
    //   song_id: "7ouMYWpwJ422jRcDASZB7P",
    //   star_rating: 2,
    //   timestamp: 3,
    //   reviewer: "Christina",
    //   text: "this song was great3!",
    // }
    ]);
  
  useEffect(() => {
    async function getReviews() {
      const reviews = await axios.get(`http://localhost:4000/api/reviews/songs/${songid}`)
      setReviewList(reviews)
    }
    getReviews();
  }, []) 

    return (
    <VStack p="4">
      <HStack mt="7em">
        <Box
        width="18em"
        height="20em"
        bg="white"
        p="4"
        borderRadius="1em"
        >
          {/* Replace the following using song: images*/}
          <Image height="12em" p="1" src="images/discover.png"/>
          {/* Replace the following using song: name*/}
          <Text align="center">Song Title</Text>
        </Box>
        <Box color="green" p="3" ml="5em">
          <Text>Song Details:<br/></Text>
          {/* Replace using song: artists, duration_ms, genres, release_date */}
          <Text><br/>
            artists <br/>
            duration_ms <br/>
            genres <br/>
            release_date <br/>
          </Text>
        </Box>
        <Button bg="green" color="white" mb="7em" ml="20em">+ Add a Review</Button>
      </HStack>
    <VStack>
      <Text mt="5em" mr="60em" color="white">Reviews <Text bg="pink" color="red" borderRadius="5em">{reviewList.length}</Text></Text>
      {
        reviewList.map(review => {
          return (
            <ReviewItem key={review.song_id} review={review}/>
          );
        })
      }
    </VStack>
  </VStack>
      );
    }
export default Details;