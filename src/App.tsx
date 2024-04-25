import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import Header from "./components/Header";
import Details from "./components/Details";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Login/register";
import Profile from "./components/Profile";
import Results from "./components/Results";
import AdminLogin from "./components/Login/adminLogin";

import EditProfile from "./components/Profile/editProfile";

import useAccessToken from "./api/getAccessToken";

function App() {
  const theme = extendTheme({
    fonts: {
      body: "Poppins, system-ui, sans-serif",
      heading: "Poppins, Georgia, serif",
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" position="relative" bg="#1A1A2E">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="/details/:songId" element={<Details />} />
                <Route path="profile/:username" element={<Profile />} />
                <Route path="edit-profile" element={<EditProfile />} />

                <Route path="results" element={<Results />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
              <Route path="admin-login" element={<AdminLogin />} />
            </Routes>
          </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
