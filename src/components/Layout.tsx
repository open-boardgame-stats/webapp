import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  Link,
  List,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import clsx from "clsx";

import { ReactComponent as BoardIcon } from "../assets/icons/board.svg";
import theme from "../theme";
import ListItemLink from "./ListItemLink";

const drawerWidth = 240;

const iconWidth = theme.spacing(7) + 1;

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "auto",
    color: theme.palette.primary.contrastText,
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: iconWidth,
  },
  content: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed" color="primary" className={classes.appbar}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon className={classes.button} />
          </IconButton>
          <Link className={classes.button} component={RouterLink} to="/profile">
            <IconButton>
              <PersonIcon className={classes.button} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar />
        <List>
          <ListItemLink to="/" icon={<PeopleIcon />} primary="Communities" />
          <ListItemLink
            to="/games"
            icon={
              <BoardIcon
                width={24}
                height={24}
                fill={theme.palette.text.secondary}
              />
            }
            primary="Games"
          />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* wtf https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051 */}
        <>{children}</>
      </main>
    </div>
  );
};

export default Layout;
