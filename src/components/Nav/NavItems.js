import React from "react";
import Tab from "@material-ui/core/Tab";

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const renderRoutes = ({ state, history, auth }) => {
  return [
    ...Object.keys(state.routes).map(
      (name, idx) =>
        !state.exclude.includes(name) && (
          <LinkTab
            key={idx}
            name={name}
            label={name}
            onClick={() => history.push(state.routes[name])}
            {...a11yProps(idx)}
          />
        )
    ),
    <LinkTab
      key={state.routes.length + 1}
      name="Logout"
      label="Logout"
      onClick={auth.logout}
      {...a11yProps(state.routes.length + 1)}
    />
  ];
};

const renderLogin = ({ state, auth }) => (
  <LinkTab
    key={state.routes.length + 1}
    name="Login"
    label="Login"
    onClick={auth.login}
    {...a11yProps(state.routes.length + 1)}
  />
);

export { renderLogin, renderRoutes };
