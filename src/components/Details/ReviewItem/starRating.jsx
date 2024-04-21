import React from "react";
import { FaStar } from "react-icons/fa";
import { HStack, Box } from "@chakra-ui/react";

export default function StarRating({ rating, setRating, count }) {
  return (
    <HStack spacing={"2px"}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        setRating(ratingValue)
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          >
            <FaStar
              size={20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}