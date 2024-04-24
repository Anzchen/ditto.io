import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Link,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import * as client from "../../client.ts";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const signin = async () => {
    try {
      await client.signin(username, password);
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Signin Failed",
        description: "Please check your credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
          Login
        </Heading>
        <Input
          placeholder="Username"
          variant="filled"
          size="md"
          mb="4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          variant="filled"
          size="md"
          mb="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="purple" size="md" onClick={signin} mb="4">
          Sign In
        </Button>
        <Flex justify="space-between">
          <Box>
            <Link color="purple.800" href="/register">
              Create an account
            </Link>
          </Box>
          <Box>
            <Link color="purple.800" href="/admin-login">
              Log in as Admin
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Login;
