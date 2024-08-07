import { Box, Typography } from "@mui/material";
import React from "react";

import Search from "@/players/components/Search";

export const metadata = {
  title: "Browse players",
};

const Browse = () => {
  return (
    <Box>
      <Typography variant="body1">
        Players are the basic building blocks of you board game statistics.
        Users have a &quot;main player&quot; created for them as soon as they
        register with our app. This player is used to track <i>your</i>{" "}
        statistics. However, you can create other players for people that
        don&apos;t want to have an account at OBGS. These are called supervised
        players and all the management for them is done here.
      </Typography>
      <Search />
    </Box>
  );
};

export default Browse;
