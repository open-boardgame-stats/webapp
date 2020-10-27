import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import Home from "./pages/Home";
import Games from "./pages/Games";
import theme from "./theme";
import Profile from "./pages/Profile";
import SecretHitler from "./pages/games/secret-hitler";
import CreateSecretHitlerMatch from "./pages/games/secret-hitler/Create";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/games" exact>
            <Games />
          </Route>
          <Route path="/games/secret_hitler" exact>
            <SecretHitler />
          </Route>
          <Route path="/games/secret_hitler/create">
            <CreateSecretHitlerMatch />
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
