import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import "./App.css";
import Home from "./pages/Home";
import Games from "./pages/Games";
import theme from "./theme";
import Profile from "./pages/Profile";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/games">
            <Games />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
