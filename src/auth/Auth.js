import { useState } from "react";
import auth0 from "auth0-js";

/**
 * @param {*} history history object
 * @returns {Object} `{ login, handleAuthentication }`
 */
function Auth(history) {
  const [state, setState] = useState({
    auth0: new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      responseType: "token id_token",
      scope: "openid profile email"
    }),
    userProfile: undefined
  });
  const login = () => state.auth0.authorize();
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    state.auth0.logout({
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000/"
    });
    setState({ ...state, userProfile: undefined });
  };
  const setSession = authResult => {
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    console.log(authResult);
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };
  const handleAuthentication = () => {
    state.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        history.push("/");
      } else if (err) {
        history.push("/");
        alert(`Error: ${err.error}. Check the console for further details`);
        console.log(err);
      }
    });
  };
  const isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };
  const getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };
  const getProfile = cb => {
    if (state.userProfile) return cb(state.userProfile);
    state.auth0.client.userInfo(getAccessToken(), (err, profile) => {
      if (profile) setState({ ...state, userProfile: profile });
      cb(profile, err);
    });
  };
  return {
    handleAuthentication,
    isAuthenticated,
    login,
    logout,
    getProfile
  };
}

export default Auth;
