import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

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
          <IconButton className={classes.button}>
            <PersonIcon />
          </IconButton>
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
