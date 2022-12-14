import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import Home from "./pages/HomePage";
import Games from "./pages/GamesPage";
import theme from "./theme";
import Profile from "./pages/ProfilePage";

import SecretHitler from "./pages/games/secret-hitler";
import CreateSecretHitlerMatch from "./pages/games/secret-hitler/Create";
import Codenames from "./pages/games/codenames";
import CreateCodenamesMatch from "./pages/games/codenames/Create";
import TerraformingMars from "./pages/games/terraforming-mars";
import NotFoundPage from "./pages/NotFoundPage";
import TerraformingMarsMatch from "./pages/games/terraforming-mars/Match";
import SettingsProvider from "./settings/Context";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SettingsProvider>
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
            <Route path="/games/codenames" exact>
              <Codenames />
            </Route>
            <Route path="/games/codenames/create">
              <CreateCodenamesMatch />
            </Route>
            <Route path="/games/terraforming_mars" exact>
              <TerraformingMars />
            </Route>
            <Route path="/games/terraforming_mars/matches/:id">
              <TerraformingMarsMatch />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </SettingsProvider>
    </MuiThemeProvider>
  );
}

export default App;
