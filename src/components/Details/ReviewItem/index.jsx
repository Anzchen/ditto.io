import React, { useState } from "react";
import { Text, Box } from "@chakra-ui/react";
import StarRating from "./starRating";

function ReviewItem(props) {
  //set rating to a value of zero (0)
  const [rating, setRating] = useState(0);

  return (
    <Box ml="2em" as="b" bg="white" w="100%" borderRadius=".5em">
      <Text color="black">
        {props.review.data[0].reviewer}
        <br />
      </Text>
      <StarRating rating={rating} setRating={setRating} />
      <Text color="black">
        {props.review.data[0].text}
        <br />
      </Text>
    </Box>
  );
}
export default ReviewItem;
