import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { Game } from ".";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  action: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "stretch",
    textAlign: "inherit",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Link}
        to={`/games/${game.id}`}
        className={classes.action}
      >
        <CardHeader
          subheader={
            <Box display="flex" flexDirection="row">
              <Typography>{game.matches}</Typography>
            </Box>
          }
          title={game.name}
        />
        <CardMedia image={game.imageUrl} className={classes.media} />
        <CardContent>
          <Typography>{game.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
