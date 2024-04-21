import React, { useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";

function Message(props) {
  useEffect(() => {
    // This effect will run whenever the loggedIn or user prop changes
    // You can perform any necessary actions or state updates here
    console.log("Props changed:", props.isLoggedIn, props.user);
  }, [props.isLoggedIn, props.user]);

  return (
    <>
      {props.isLoggedIn ? (
        <Box ml="2em" as="b" color="white" w="14em">
          <Text>
            Hello, {props.user.username}!<br />
          </Text>
          <Text>
            <br />
            Here are your Top 3 Songs! Click on any of the songs below to write
            a Review.
          </Text>
        </Box>
      ) : (
        <Box ml="2em" as="b" color="white" w="14em">
          <Text color="white">Here are the Top 3 Songs on Spotify today!</Text>
        </Box>
      )}
    </>
  );
}

export default Message;
