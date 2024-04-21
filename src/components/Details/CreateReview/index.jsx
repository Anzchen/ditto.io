import React, { useState } from "react";
import { Button, Text, Box, Input } from "@chakra-ui/react";
import CreateStarRating from "./createStarRating";
import { useNavigate } from "react-router-dom";
import * as client from "../../../client.ts";

export default function CreateReview() {
  const navigate = useNavigate();
  const [rating, setRating] = useState();
  const [error, setError] = useState("");
  const [review, setReview] = useState({ star_rating: "", text: "" });

const createReview = async () => {
    try {
        await client.createReview(review);
        navigate("//api/reviews");
    } catch (err) {
        setError(err.response.data.message);
    }
    };

  return (
    <Box ml="2em" as="b" bg="white" w="100%" borderRadius=".5em">
      <Text color="black">
        Add your Rating & Review!
      </Text>
      <Input
          placeholder="Star Rating"
          variant="filled"
          size="md"
          mb="4"
          value={review.star_rating}
          onChange={(e) =>
            setReview({
              ...review,
              star_rating: e.target.value,
            })
          }
        />
        <Input
          variant="filled"
          size="md"
          mb="6"
          value={review.text}
          onChange={(e) =>
            setReview({
              ...review,
              text: e.target.value,
            })
          }
        />
        <Button colorScheme="purple" size="md" onClick={createReview} mb="4">
          Submit Review
        </Button>
      {/* <CreateStarRating rating={rating} setRating={setRating}/> */}
    </Box>
  );
}
