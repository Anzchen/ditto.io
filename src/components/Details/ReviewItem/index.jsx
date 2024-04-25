import React, { useState, useEffect } from "react";
import { Text, Box, Button } from "@chakra-ui/react";
import StarRating from "./starRating";
import { useNavigate } from "react-router-dom";
import * as client from "../../../client.ts";
import axios from "axios";
import LogoutEmitter from "../../../emit/LogoutEmitter.js";
export default function ReviewItem(props) {
  let [rating, setRating] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  rating = props.review.star_rating;
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        if (isUser && isUser.role === "ADMIN") {
          setIsAdmin(true);
          // setIsLoggedIn(true);
          // LogoutEmitter.on("loggedOut", logout);
        } else {
          // setIsLoggedIn(false);
        }
      } catch (error) {
        // setIsLoggedIn(false);
        console.error("Error fetching user profile:", error);
      }
    };
    getProfile();
  }, []);
  // setProfile((prevProfile) => ({
  //   ...prevProfile,
  //   following: prevProfile.following.filter((user) => user !== username),
  // }));
  const handleProfileClick = (clickedUsername) => {
    console.log(`Navigating to profile: ${clickedUsername}`);
    navigate(`/profile/${clickedUsername}`);
  };

  function handleDeleteReview(reviewId) {
    client.deleteReview(reviewId);
    LogoutEmitter.emit("deletedReview");
  }

  return (
    <Box ml="2em" as="b" bg="white" w="69em" borderRadius=".5em">
      <Text
        onClick={() => handleProfileClick(props.review.reviewer)}
        cursor="pointer"
        _hover={{ textDecoration: "underline" }}
      >
        {props.review.reviewer}
      </Text>
      <StarRating rating={rating} setRating={setRating} />
      <Text color="black">
        {props.review.text}
        <br />
      </Text>
      {isAdmin && (
        <Button onClick={() => handleDeleteReview(props.review.review_id)}>
          Delete Review
        </Button>
      )}
    </Box>
  );
}
