import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from "../../consts";
import { useNavigate, Link as ReachLink, Outlet } from "react-router-dom";
import { HStack, Button, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const { isOpen: searchOpen, onToggle: toggleSearch } = useDisclosure();

  const getProfile = () => {
    fetch(`${API_URL}/profile`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
    .then(user => {
      setUser(user);
    });
  }

  const getAuth = () => {
    fetch(`${API_URL}/auth`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
    .then(auth => {
      setAuth(auth);
    });
  }

  const logout = () => {
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => navigate(''))
    .then(res => {
      window.location.reload();
    });
  }

  const login = () => {
    navigate('/login');
  }

  const signup = () => {
    navigate('/register');
  }

  const profile = () => {
    navigate('/profile');
  }

  const details = () => {
    navigate('/details');
  }

  useEffect(getAuth, [navigate]);
  useEffect(getProfile, [navigate]);

  const button = auth ? (
    <Button bg="transparent" color="lightgray" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button bg="transparent" color="lightgray" onClick={login}>
      Login 
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
    <HStack position="relative" left="70em">
      {searchOpen && (
        <InputGroup position="fixed" width="50em" left="0" ml="10em">
          <InputLeftElement
            pointerEvents="none"
            children={<FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />}
          />
          <Input 
            placeholder="Search for a song..."
            bg="white"
            borderRadius="2em"
          />
        </InputGroup>
      )}
      {searchButton}
      {detailsButton}
      {button}
      {register}
    </HStack>
    <Outlet />
    </>
  );
}

export default Header;
