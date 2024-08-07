import { List, ListSubheader } from "@mui/material";
import React from "react";

import NavLink from "./NavLink";
import { useAuth } from "modules/auth";

const NavBar = () => {
  const { authenticated } = useAuth();

  return (
    <List dense>
      <ListSubheader>OBGS</ListSubheader>
      <NavLink href="/">Home</NavLink>
      <ListSubheader>Players</ListSubheader>
      <NavLink href="/players" data-cy="playersNavTest">
        Browse
      </NavLink>
      {authenticated && (
        <>
          <NavLink href="/players/supervised">My players</NavLink>
          <NavLink href="/players/request-supervision">
            Request supervision
          </NavLink>
          <NavLink href="/players/incoming-requests">Incoming requests</NavLink>
          <NavLink href="/players/outgoing-requests">Outgoing requests</NavLink>
        </>
      )}
      <ListSubheader>Groups</ListSubheader>
      <NavLink href="/groups" data-cy="groupsNavTest">
        Browse
      </NavLink>
      <ListSubheader>Games</ListSubheader>
      <NavLink href="/games" data-cy="gamesNavTest">
        Browse
      </NavLink>
      <ListSubheader>Matches</ListSubheader>
      <NavLink href="/matches" data-cy="matchesNavTest">
        Browse
      </NavLink>
    </List>
  );
};

export default NavBar;
