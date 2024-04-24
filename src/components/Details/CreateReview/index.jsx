import React, { useState } from "react";
import { Button, Text, Box, Input, HStack, Radio } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import * as client from "../../../client.ts";

export default function CreateReview(props) {
//   const navigate = useNavigate();
  const [rating, setRating] = useState();
  const [error, setError] = useState("");
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState({song_id: props.track, star_rating: "", reviewer: props.user, text: "" });

const createReview = async () => {
    console.log(review)
    try {
        await client.createReview(review);
    } catch (err) {
        setError(err.response.data.message);
    }
    };

  return (
    <Box align="center" ml="2em" as="b" bg="white" w="100%" borderRadius=".5em">
      <Text color="black">
        Add your Rating & Review!
      </Text>
      <HStack ml="2em" spacing={"2px"}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={(e) => {
                setRating(ratingValue); 
                setReview({
                ...review,
                star_rating: e.target.value,
            });
            }}
              value={ratingValue}
              display="none"
            ></Radio>
            <FaStar
              cursor={"pointer"}
              size={20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
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
        <Button colorScheme="blue" width="80em" onClick={createReview} mb="4">
          Submit Review
        </Button>
    </Box>
  );
}
