import React from "react";
import { Box, Image, Heading } from '@chakra-ui/react';

function Discover() {
  return (
    <Box
      width="15em"
      height="10em"
      bg="white"
      p="4"
      borderRadius="1em"
    >
      <Image height="100%" src="images/discover.png"/>
    </Box>
    );
  }
export default Discover;