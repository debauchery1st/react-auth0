import AppBar from "@material-ui/core/AppBar";
import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import { renderLogin, renderRoutes } from "./NavItems";

export default function NavTabs({ linkRoutes, auth, location, history }) {
  const links = linkRoutes ? linkRoutes : {};
  const [state, setState] = useState({
    tab: Object.keys(links)[0],
    routes: linkRoutes,
    exclude: ["Callback"],
    value: 0,
    or: auth.isAuthenticated
  });

  const handleChange = (e, v) =>
    state.tab !== e.currentTarget.name &&
    setState({ ...state, tab: e.currentTarget.name, value: v });

  return (
    <AppBar position="static">
      <Tabs
        variant="fullWidth"
        value={state.value}
        onChange={handleChange}
        aria-label="nav tabs example"
      >
        {state.or()
          ? renderRoutes({ state, history, auth })
          : renderLogin({ state, auth })}
      </Tabs>
    </AppBar>
  );
}
