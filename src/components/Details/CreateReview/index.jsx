import React, { useState } from "react";
import { Button, Text, Box, Input, HStack, Radio } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import * as client from "../../../client.ts";
import { nanoid } from "nanoid";
import LogoutEmitter from "../../../emit/LogoutEmitter.js";
export default function CreateReview(props) {
  const [rating, setRating] = useState();
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState({
    song_id: props.track,
    star_rating: "",
    reviewer: props.user,
    text: "",
    review_id: nanoid(),
  });

  const createReview = async () => {
    try {
      await client.createReview(review);
      setCreated(true);
      LogoutEmitter.emit("createdReview");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Box
      align="center"
      ml="2em"
      as="b"
      bg="white"
      h="10em "
      w="69em"
      borderRadius=".5em"
    >
      {!created ? (
        <>
          <Text color="black">Add your Rating & Review!</Text>
          <HStack ml="29em" spacing={"2px"}>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <Box
                  as="label"
                  key={index}
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
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
                    size={35}
                    transition="color 200ms"
                  />
                </Box>
              );
            })}
          </HStack>
          <Input
            variant="filled"
            size="md"
            width="60em"
            mb="3"
            value={review.text}
            onChange={(e) =>
              setReview({
                ...review,
                text: e.target.value,
              })
            }
          />
          <Button colorScheme="blue" width="60em" onClick={createReview} mb="4">
            Submit Review
          </Button>
        </>
      ) : (
        <Text mt="5em" color="Black">
          Review Submitted!
        </Text>
      )}
    </Box>
  );
}
