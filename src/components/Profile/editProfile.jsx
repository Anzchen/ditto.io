import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as client from "../../client.js";

function EditProfile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    phone_number: "",
  });

  const [editableFields] = useState(["username", "password", "phone_number"]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
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

  const saveProfile = async () => {
    try {
      const updatedProfile = profile;
      // editableFields.forEach((field) => {
      //   updatedProfile[field] = profile[field];
      // });
      console.log(updatedProfile);
      await client.updateUser(updatedProfile);
      toast({
        title: "Success",
        description: "Profile updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out.",
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
      <form onSubmit={(e) => e.preventDefault()}>
        {editableFields.map((field) => (
          <FormControl key={field} mb="4">
            <FormLabel>
              {field === "username"
                ? "Username"
                : field === "password"
                ? "Password"
                : "Phone Number"}
            </FormLabel>
            {field === "password" ? (
              <InputGroup>
                <Input
                  variant="filled"
                  size="md"
                  type={showPassword ? "text" : "password"}
                  value={profile[field]}
                  onChange={(e) =>
                    setProfile({ ...profile, [field]: e.target.value })
                  }
                  color="purple.800" // Set text color to dark purple
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            ) : (
              <Input
                variant="filled"
                size="md"
                type={field === "password" ? "password" : "text"}
                value={profile[field]}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                color="purple.800" // Set text color to dark purple
              />
            )}
            <FormHelperText>
              {field === "password"
                ? "Leave blank to keep current password"
                : null}
            </FormHelperText>
          </FormControl>
        ))}
        <Button colorScheme="green" size="md" onClick={saveProfile} mr="4">
          Save
        </Button>
        <Button colorScheme="red" size="md" onClick={signout}>
          Sign out
        </Button>
      </form>
    </Box>
  );
}

export default EditProfile;
