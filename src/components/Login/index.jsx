import React, { useState } from "react";
import { Box, Heading, Input, Button, Link, Flex } from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/profile"); // redirect to profile page on successful login
          return res.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        // handle login error (ex. display error message)
      });
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
    >
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
        <Button
          colorScheme="purple"
          size="md"
          onClick={handleLogin}
          mb="4" 
        >
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