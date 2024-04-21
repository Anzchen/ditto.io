import React, { useState, useEffect } from "react";
import {
  HStack,
  Box,
  Heading,
  Button,
  useToast,
  List,
  ListItem,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as client from "../../client.ts";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    followers: [],
    following: [],
    role: "USER",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const fetchProfile = async () => {
    try {
      const userProfile = await client.profile();
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

  useEffect(() => {
    fetchProfile();
  }, []);

  // const { username } = useParams(); // Extract username from URL parameter

  // const fetchProfile = async (username) => {
  //   try {
  //     const userProfile = await client.getUserProfile(username);
  //     setProfile(userProfile);
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to fetch profile.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile(username); // Fetch profile based on extracted username
  // }, [username]); // Re-fetch profile when username changes

  const goToEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const handleUnfollow = async (username) => {
    try {
      await client.unfollowUser(username);
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

  return (
    <Box p="8" bg="transparent" color="white">
      <Heading as="h2" size="lg" mb="6">
        @{profile.username}'s Profile
      </Heading>
      <Box mb="4">
        <strong>Followers:</strong>
        <List>
          {profile.followers.map((follower) => (
            <ListItem key={follower}>
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
              <HStack>
                <Text
                  onClick={() => handleProfileClick(followingUser)}
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  {followingUser}
                </Text>
                <IconButton
                  // icon={<CloseIcon />}
                  aria-label="Unfollow"
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleUnfollow(followingUser)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mb="4">
        <strong>Role:</strong> {profile.role}
      </Box>
      <Button colorScheme="purple" size="md" onClick={goToEditProfile} mr="4">
        Edit Profile
      </Button>
    </Box>
  );
}

export default Profile;
