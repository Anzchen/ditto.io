import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./components/Header";
import Details from "./components/Details/";
import Home from "./components/Home/";
import Login from "./components/Login/";
import Navigation from "./components/Navigation/";
import Profile from "./components/Profile/";
import Search from "./components/Search/";

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
          <Routes>
            <Route path="/" element={<Header/>} />
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home/>} />
            <Route path="details" element={<Details/>} />
            <Route path="navigation" element={<Navigation/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="login" element={<Login/>} />
            <Route path="search" element={<Search/>} />
          </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;