import React from "react";
import { Text, Box } from "@chakra-ui/react"

function Message(user) {
  return (
    <Box ml="2em" as="b" color="white" w="14em">
      <Text>Hello, {user.first_name}!<br/></Text>
      <Text><br/>
        Here are your Top 4 Songs!
        Click on any of the songs below to write a Review.
      </Text>
    </Box>
    );
  }
export default Message;