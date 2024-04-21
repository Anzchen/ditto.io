import React, { useState } from "react";
import { Box, Heading, Input, Button, Link, Flex } from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import * as client from "../../client.ts";

function Register() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone_number: "",
    role: "",
    songs: [],
    following: [],
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/profile");
    } catch (err) {
      setError(JSON.stringify(err));
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box
        width="400px"
        p="8"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb="6" color="#13294C">
          Register
        </Heading>
        {error && <Box color="red">{error}</Box>}
        <Input
          placeholder="Username"
          variant="filled"
          size="md"
          mb="4"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          variant="filled"
          size="md"
          mb="6"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
        <Input
          type="number"
          placeholder="Phone Number"
          variant="filled"
          size="md"
          mb="6"
          value={user.phone_number}
          onChange={(e) =>
            setUser({
              ...user,
              phone_number: e.target.value,
            })
          }
        />
        <Input
          placeholder="songs"
          variant="filled"
          size="md"
          mb="6"
          value={user.songs}
          onChange={(e) =>
            setUser({
              ...user,
              songs: e.target.value,
            })
          }
        />
        <Button colorScheme="purple" size="md" onClick={signup} mb="4">
          Register
        </Button>
        <Box>
          <Link color="purple.800" href="/login">
            Already have an account? Log in here
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Register;
