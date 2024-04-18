import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from './components/Header/'
import Details from "./components/Details/";
import Home from "./components/Home/";
import Login from "./components/Login/";
import Register from "./components/Login/register";
import Profile from "./components/Profile/";
import Results from "./components/Results/";

function App() {
  const theme = extendTheme({
    fonts: {
      // Set the body font family to Roboto
      body: 'Roboto, system-ui, sans-serif',
      // Optionally set the heading font to the same or choose another
      heading: 'Roboto, Georgia, serif',
    },
  });
  
  return (
    <ChakraProvider>
      <Box minH="100vh" position="relative" bg="#1A1A2E">
        <Box 
          height="89vh" 
          position="absolute" 
          width="100%" 
          bottom="0" 
          borderTopRadius="1em" 
          bg="#2b2b3f"
        >
          <HashRouter>
              <Routes>
                <Route path="/" element={<Header/>} />
                <Route path="" element={<Home />} />
                <Route path="home" element={<Home/>} />
                <Route path="details" element={<Details/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="results" element={<Results/>} />
              </Routes>
          </HashRouter>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;