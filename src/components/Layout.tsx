import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    marginLeft: "auto",
  },
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.button} component={RouterLink} to="/profile">
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Box display="flex" flex="1">
        {/* wtf https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051 */}
        <>{children}</>
      </Box>
    </>
  );
};

export default Layout;
