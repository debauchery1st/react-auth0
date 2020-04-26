import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Callback = props => {
  useEffect(() => {
    // handle authentication if expected values are in the url
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }, [props]);
  return <CircularProgress color="secondary" />;
};

export default Callback;
