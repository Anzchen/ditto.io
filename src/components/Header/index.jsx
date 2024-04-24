import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../consts";
import { useNavigate, Link as ReachLink, Outlet } from "react-router-dom";
import {
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const { isOpen: searchOpen, onToggle: toggleSearch } = useDisclosure();

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/users/signout");
      if (res.statusText === "OK") {
        setAuth(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/register");
  };

  const profile = () => {
    navigate("/profile");
  };

  const goHome = () => {
    navigate("/");
  };

  const details = () => {
    navigate("/details");
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.post("http://localhost:4000/api/users/profile");
        const isUser = res.data;
        if (isUser) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error(error);
        setAuth(false);
      }
    };
    getProfile();
  }, [navigate]);

  const button = auth ? (
    <Button bg="transparent" color="lightgray" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button bg="transparent" color="lightgray" onClick={login}>
      Login
    </Button>
  );

  const home = (
    <Button bg="transparent" color="lightgray" onClick={goHome}>
      Home
    </Button>
  );

  const register = auth ? (
    <Button bg="transparent" color="lightgray" onClick={profile}>
      Profile
    </Button>
  ) : (
    <Button bg="transparent" color="lightgray" onClick={signup}>
      SignUp
    </Button>
  );

  const detailsButton = (
    <Button onClick={details} bg="lightgray">
      Details
    </Button>
  );

  const searchButton = (
    <Button onClick={toggleSearch} bg="transparent">
      <FontAwesomeIcon icon={faMagnifyingGlass} color="lightgray" />
    </Button>
  );

  return (
    <>
      <HStack m="3" position="fixed" right="0">
        {searchOpen && (
          <InputGroup position="fixed" width="50em" left="0" ml="10em">
            <InputLeftElement
              pointerEvents="none"
              children={
                <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
              }
            />
            <Input
              placeholder="Search for a song..."
              bg="white"
              borderRadius="2em"
            />
          </InputGroup>
        )}
        {searchButton}
        {home}
        {/* {detailsButton} */}
        {button}
        {register}
      </HStack>
      <Outlet />
    </>
  );
}

export default Header;
