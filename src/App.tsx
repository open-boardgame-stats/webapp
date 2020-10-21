import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import "./App.css";
import Home from "./pages/Home";
import theme from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
