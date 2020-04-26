import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { NavTabs, TabPanel } from "./components/Nav";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Auth, Callback } from "./auth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function App(props) {
  const [state] = useState({
    auth0: new Auth(props.history),
    routes: {
      Home: "/",
      Profile: "/profile",
      Callback: "/callback"
    },
    classes: useStyles()
  });
  return (
    <div className={state.classes.root}>
      <NavTabs
        linkRoutes={state.routes}
        auth={state.auth0}
        history={props.history}
        {...props}
      />
      <TabPanel>
        <Route
          path="/"
          exact
          render={props => <Home auth={state.auth0} {...props} />}
        />
        <Route
          path="/profile"
          render={props =>
            state.auth0.isAuthenticated() ? (
              <Profile auth={state.auth0} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/callback"
          render={props => <Callback auth={state.auth0} {...props} />}
        />
      </TabPanel>
    </div>
  );
}

export default App;
