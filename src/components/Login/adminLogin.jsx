import React, { useState } from "react";
import { Box, Heading, Input, Button, Link, Flex } from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const handleAdminLogin = () => {
    fetch(`${API_URL}/admin-login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, adminKey }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/admin-dashboard"); // redirect to admin dashboard on successful login
        } else {
          throw new Error("Admin login failed");
        }
      })
      .catch((error) => {
        console.error("Admin login error:", error);
        // handle admin login error (ex. display error message)
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
          Admin Login
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
          mb="4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Admin Key (4 digits)"
          variant="filled"
          size="md"
          mb="6"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        />
        <Button
          colorScheme="purple" 
          size="md"
          onClick={handleAdminLogin}
          mb="4" 
        >
          Log In as Admin
        </Button>
        <Box>
          <Link color="purple.800" href="/login">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default AdminLogin;