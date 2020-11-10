import React from "react";
import {
  AppBar,
  Box,
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
import { useSettings } from "../settings/Context";

const drawerWidth = 240;

const iconWidth = theme.spacing(7) + 1;

const ensureNumber = (input: number | string | undefined): number => {
  if (typeof input === "number") {
    return input;
  }
  throw new Error("not a number");
};

const useStyles = makeStyles((theme) => {
  const topbarOffset =
    ensureNumber(theme.mixins.toolbar.minHeight) + theme.spacing(1);
  return {
    root: {
      display: "flex",
      flexGrow: 1,
    },
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
      marginTop: topbarOffset,
      paddingTop: -topbarOffset,
      display: "flex",
      alignItems: "stretch",
    },
    page: {
      flexGrow: 1,
    },
  };
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const {
    settings: { drawerOpen },
    update,
  } = useSettings();

  const toggleDrawer = () => update({ drawerOpen: !drawerOpen });

  return (
    <div className={classes.root}>
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
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
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
        <Box pr={3} pl={3} pt={2} className={classes.page}>
          {children}
        </Box>
      </main>
    </div>
  );
};

export default Layout;
