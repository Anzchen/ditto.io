import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { ChakraProvider } from '@chakra-ui/react'
import Ditto from "./Ditto/index.tsx";

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Ditto" />} />
            <Route path="/Ditto/*" element={<Ditto />} />
          </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;