import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as client from "../../client.ts";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    followers: 0,
    following: 0,
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

  const goToEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <Box p="8" bg="transparent" color="white">
      <Heading as="h2" size="lg" mb="6">
        @{profile.username}'s Profile
      </Heading>
      <Box mb="4">
        <strong>Followers:</strong> {profile.followers}
      </Box>
      <Box mb="4">
        <strong>Following:</strong> {profile.following}
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