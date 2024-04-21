import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react"
import StarRating from "./starRating";

function ReviewItem(review) {
    //set rating to a value of zero (0)
    const [rating, setRating] = useState(0);

  return (
    <Box ml="2em" as="b" bg="white" w="100%" borderRadius=".5em">
      <Text color="black">{review.reviewer}<br/></Text>
      <StarRating rating={rating} setRating={setRating} />
      <Text color="black">{review.text}<br/></Text>
    </Box>
    );
  }
export default ReviewItem;