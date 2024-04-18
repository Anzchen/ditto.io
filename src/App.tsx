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
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="#1A1A2E">
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
    </ChakraProvider>
  );
}

export default App;