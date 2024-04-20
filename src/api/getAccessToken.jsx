import { useState, useEffect } from 'react';

// For some reason grabbing from env not working
// ** TO BE IMPLEMENTED ** 
export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;

const useAccessToken = () => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        fetch("https://accounts.spotify.com/api/token", {
            body: 'grant_type=client_credentials&client_id=2825a9fb713340c784dddba2c67a5213&client_secret=fea9bac4ca6f4988a89b76ead0579514',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        .then(res => res.json())    
        .then(data => {
            setAccessToken(data.access_token);
            localStorage.setItem('access_token', data.access_token);
        })
    }, []);

    return accessToken;
};

export default useAccessToken;
