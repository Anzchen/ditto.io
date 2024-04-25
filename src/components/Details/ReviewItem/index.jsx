import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import StarRating from "./starRating";
import { useNavigate } from "react-router-dom";


export default function ReviewItem(props) {
  let [rating, setRating] = useState();
  rating = props.review.star_rating;
  const navigate = useNavigate();


  const handleProfileClick = (clickedUsername) => {
    console.log(`Navigating to profile: ${clickedUsername}`);
    navigate(`/profile/${clickedUsername}`);
  };

  return (
    <Box ml="2em" as="b" bg="white" w="69em" borderRadius=".5em">
        <Text
          onClick={() => handleProfileClick(props.review.reviewer)}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          {props.review.reviewer}
        </Text>
      <StarRating rating={rating} setRating={setRating}/>
      <Text color="black">
        {props.review.text}
        <br />
      </Text>
    </Box>
  );
}
