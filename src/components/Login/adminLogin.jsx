import React, { useState } from "react";
import { Box, Heading, Input, Button, Link, Flex } from "@chakra-ui/react";
import { API_URL } from "../../consts";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signup(user);
      navigate("/profile"); // whatever the admin page is supposed to look like
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const [adminKey, setAdminKey] = useState("");

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
          value={user.username} 
          onChange={(e) => setUser({
            ...user, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          variant="filled"
          size="md"
          mb="4"
          value={user.password} 
          onChange={(e) => setUser({
            ...user, password: e.target.value })}
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
          onClick={signin}
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