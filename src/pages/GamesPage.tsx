import React from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import theme from "../theme";
import { games } from "../components/Game";
import GameCard from "../components/Game/Card";

const useStyles = makeStyles({
  search: {
    marginRight: theme.spacing(3),
  },
  grid: {
    display: "flex",
    padding: theme.spacing(1),
  },
});

const GamesPage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Typography variant="h4">Games:</Typography>
        <Box>
          <TextField
            className={classes.search}
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<GroupAddIcon />}
            component={Link}
            to="/game/create"
          >
            Create a game
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flex="1"
        flexWrap="wrap"
        mt={2}
        mb={2}
      >
        <Grid container>
          {games.map((g, i) => (
            <Grid item key={i} lg={3} md={4} xs={12} className={classes.grid}>
              <GameCard game={g} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination page={1} count={10} />
    </Layout>
  );
};

export default GamesPage;
