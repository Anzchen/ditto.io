import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import StarRating from "./starRating";

export default function ReviewItem(props) {
  let [rating, setRating] = useState();
  rating = props.review.star_rating;

  return (
    <Box ml="2em" as="b" bg="white" w="69em" borderRadius=".5em">
      <Text color="black">
        {props.review.reviewer}
        <br />
      </Text>
      <StarRating rating={rating} setRating={setRating}/>
      <Text color="black">
        {props.review.text}
        <br />
      </Text>
    </Box>
  );
}
