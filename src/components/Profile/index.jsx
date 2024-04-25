import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Button,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as client from "../../client.ts";
import ReviewItem from "../Details/ReviewItem/index.jsx";
import LogoutEmitter from "../../emit/LogoutEmitter";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    followers: [],
    following: [],
    role: "USER",
    reviews: [],
  });

  const [ourProfile, setourProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function logout() {
    navigate("/");
    LogoutEmitter.removeListener("loggedOut", logout);
  }

  const { username } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const fetchProfile = async (username) => {
    try {
      const userProfile = await client.getUserByUsername(username);
      setProfile(userProfile);
      fetchourProfile();
      console.log("our profile: " + JSON.stringify(ourProfile));
      if (ourProfile.following && ourProfile.following.length > 0) {
        const isUserFollowing = ourProfile.following.includes(username);
        setIsFollowing(isUserFollowing);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchourProfile = async () => {
    try {
      const userProfile = await client.profile();
      setourProfile(userProfile);
      LogoutEmitter.on("loggedOut", logout);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchReviews = async () => {
    try {
      // Fetch reviews for the song using username
      const reviews = await client.getUserReviews(username);
      console.log("Reviews:" + JSON.stringify(reviews));
      setReviewList(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchProfile(username);
    fetchourProfile();
    fetchReviews();
  }, [username]);

  const handleProfileClick = (clickedUsername) => {
    console.log(`Navigating to profile: ${clickedUsername}`);
    navigate(`/profile/${clickedUsername}`);
  };

  const handleUnfollow = async (username) => {
    try {
      // Call API to unfollow the user
      await client.unfollowUser(username);
      // Update local state to remove the user from following list
      setProfile((prevProfile) => ({
        ...prevProfile,
        following: prevProfile.following.filter((user) => user !== username),
      }));
      toast({
        title: "Success",
        description: `You have unfollowed ${username}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast({
        title: "Error",
        description: "Failed to unfollow user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await client.unfollowUser(username);
        setIsFollowing(false);
        toast({
          title: "Success",
          description: `You have unfollowed ${username}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Follow the user
        await client.followUser(username);
        setIsFollowing(true);
        toast({
          title: "Success",
          description: `You are now following ${username}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      toast({
        title: "Error",
        description: "Failed to toggle follow status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isCurrentUser = ourProfile.username === username; // Replace 'current_user_username' with actual username

  console.log("Profile state:", profile);

  return (
    <Box p="20" bg="transparent" color="white">
      <Heading as="h2" size="lg" mb="6">
        @{username}'s Profile
        {/* Conditionally render Edit Profile button for the current user */}
      {isCurrentUser && (
        <Button
          colorScheme="purple"
          size="md"
          onClick={() => navigate("/edit-profile")}
          ml="4"
        >
          Edit Profile
        </Button>
      )}
        {!isCurrentUser && (
          <Button
            size="lg"
            colorScheme={isFollowing ? "red" : "green"}
            onClick={handleToggleFollow}
            ml="4"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Heading>
      <Box mb="4">
        <strong>Followers:</strong>
        <List>
          {profile.followers.map((follower) => (
            <ListItem key={follower} display="flex" alignItems="center">
              <Text
                onClick={() => handleProfileClick(follower)}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                {follower}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mb="4">
        <strong>Following:</strong>
        <List>
          {profile.following.map((followingUser) => (
            <ListItem key={followingUser} display="flex" alignItems="center">
              <Text
                onClick={() => handleProfileClick(followingUser)}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                {followingUser}
              </Text>
              {isCurrentUser && (
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleUnfollow(followingUser)}
                  ml="4"
                >
                  {" "}
                  Unfollow{" "}
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mb="4">
        <strong>Role:</strong> {profile.role}
      </Box>
      <Box mb="4">
        <strong>Reviews: {reviewList.length} </strong>
      <VStack align="flex-start" spacing="4" w="100%" ml="-8" mt="4">
        {reviewList.length > 0 ? (
          reviewList.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <Text color="white">No reviews available.</Text>
        )}
      </VStack>
      </Box>
    </Box>
  );
}

export default Profile;
