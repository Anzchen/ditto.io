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

  const [ourprofile, setOurProfile] = useState({});
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
      setOurProfile(userProfile);
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

  const handleFollow = async (username) => {
    try {
      await client.followUser(username);
      setProfile((prevProfile) => ({
        ...prevProfile,
        following: [...prevProfile.following, username],
      }));
      toast({
        title: "Success",
        description: `You are now following ${username}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error following user:", error);
      toast({
        title: "Error",
        description: "Failed to follow user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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

  const isCurrentUser = ourprofile.username === username;

  const isFollowing = profile.following.includes(username);

  return (
    <Box p="8" bg="transparent" color="white">
      <Heading as="h2" size="lg" mb="6">
        @{username}'s Profile
      </Heading>
      <Box mb="4">
        <strong>Followers:</strong>
        <List>
          {profile.followers.map((follower) => (
            <ListItem
              key={follower}
              display="flex"
              alignItems="center"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => handleProfileClick(follower)}
            >
              <Text>{follower}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mb="4">
        <strong>Following:</strong>
        <List>
          <ListItem display="flex" alignItems="center">
            <Text>{username}</Text>
            {!isCurrentUser && (
              <Button
                size="sm"
                onClick={() => (isFollowing ? handleUnfollow(username) : handleFollow(username))}
                colorScheme={isFollowing ? "red" : "green"}
                ml="4"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </ListItem>
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
