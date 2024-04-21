import React, { useState } from "react";
import { Box, Heading, Input, Button, Link, Flex } from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, username, password }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login"); // redirect to login page on successful registration
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // handle registration error (ex. display error message)
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
          Register
        </Heading>
        <Input
          placeholder="Full Name"
          variant="filled"
          size="md"
          mb="4"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          size="md"
          mb="4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          onClick={handleRegister}
          mb="4"
        >
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