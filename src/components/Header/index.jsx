import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from "../../consts";
import { useNavigate, Link as ReachLink, Outlet } from "react-router-dom";
import { HStack, Button, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';
import Results from '../Results'; 

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const { isOpen: searchOpen, onToggle: toggleSearch } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/results?query=${searchQuery}`);
    }
  };

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

  useEffect(getAuth, [navigate]);
  useEffect(getProfile, [navigate]);

  const button = auth ? (
    <Button bg="transparent" color="lightgray" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button bg="transparent" color="lightgray">
      <ReachLink to="/login">Login</ReachLink>
    </Button>
  );

  const register = (
    <Button bg="transparent" color="lightgray">
      <ReachLink to={auth ? "/profile" : "/register"}>{auth ? "Profile" : "Sign Up"}</ReachLink>
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
            children={<FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />}
          />
          <Input 
            placeholder="Search for a song..."
            bg="white"
            borderRadius="2em"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </InputGroup>
      )}
      {searchButton}
      {button}
      {register}
    </HStack>
    {/* {searchQuery && <Results searchQuery={searchQuery} />} */}
    <Outlet />
    </>
  );
}

export default Header;
