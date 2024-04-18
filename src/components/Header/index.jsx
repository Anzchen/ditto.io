import React, { useState, useEffect } from "react";
import { API_URL } from "../../consts";
import { useNavigate, Link as ReachLink } from "react-router-dom";
import { ChakraProvider, Box, Button } from '@chakra-ui/react'

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState();
  const [searchOpen, setSearchOpen] = useState(false);

  const getProfile = () => {
    fetch(`${API_URL}/profile`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
    .then(user => {
      setUser(user);
    })
  }

  const getAuth = () => {
    fetch(`${API_URL}/auth`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
    .then(auth => {
      setAuth(auth);
    })
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

  let button;
  let register;
  if (typeof(auth) == "boolean") {
    button = <Button m={3} onClick={ logout }>
      Logout
    </Button>
    register = <Button mr={3} bg="#7986e6" color="white"><ReachLink to="/profile">Profile</ReachLink></Button>
  }
  else {
    button = <Button m={3}>
      <ReachLink to="/login">Login</ReachLink>
    </Button>
    register = <Button mr={3} bg="#7986e6" color="white"><ReachLink to="/register">Register</ReachLink></Button>
  }
  return (
<></>
  );
  }
export default Header;