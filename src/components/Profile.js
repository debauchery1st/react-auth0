import React, { useState, useEffect, useCallback } from "react";

const Profile = ({ auth, ...props }) => {
  const [state, setState] = useState({
    profile: auth,
    error: ""
  });

  const loadUserProfile = () => {
    return auth.getProfile((profile, error) => setState({ profile, error }));
  };
  const cbUserProfile = useCallback(loadUserProfile, []);

  useEffect(() => {
    cbUserProfile();
  }, [cbUserProfile]);

  return (
    <div>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={state.profile.picture}
        alt="avatar"
      />
      <h4>{state.profile.nickname}</h4>
      {/* <pre>{JSON.stringify(state.profile, null, 2)}</pre> */}
    </div>
  );
};

export default Profile;
