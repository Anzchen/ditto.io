import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import * as client from "../../client.ts";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    followers: [],
    following: [],
    role: "USER",
  });

  const [ourprofile, setourprofile] = useState({});

  const { username } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const fetchProfile = async (username) => {
    try {
      const userProfile = await client.getUserByUsername(username);
      setProfile(userProfile);
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

  const fetchOurProfile = async () => {
    try {
      const userProfile = await client.profile();
      setourprofile(userProfile);
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

  useEffect(() => {
    fetchProfile(username);
    fetchOurProfile();
  }, [username]);

  const handleProfileClick = (clickedUsername) => {
    console.log(`Navigating to profile: ${clickedUsername}`);
    navigate(`/profile/${clickedUsername}`);
  };

  const isCurrentUser = ourprofile.username === username; // Replace 'current_user_username' with actual username

  console.log("Profile state:", profile);

  return (
    <Box p="8" bg="transparent" color="white">
      <Heading as="h2" size="lg" mb="6">
        @{username}'s Profile
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
            <ListItem key={followingUser}>
              <Text>{followingUser}</Text>
              {isCurrentUser ? <Button ml={2}>unfollow</Button> : <></>}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mb="4">
        <strong>Role:</strong> {profile.role}
      </Box>
      {/* Conditionally render Edit Profile button for the current user */}
      {isCurrentUser && (
        <Button
          colorScheme="purple"
          size="md"
          onClick={() => navigate("/edit-profile")}
          mr="4"
        >
          Edit Profile
        </Button>
      )}
    </Box>
  );
}

export default Profile;
