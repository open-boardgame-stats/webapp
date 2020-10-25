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
import PeopleIcon from "@material-ui/icons/People";

import { Community } from ".";
import { Link } from "react-router-dom";

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
  community: Community;
}

const CommunityCard = ({ community }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Link}
        to={`/community/${community.id}`}
        className={classes.action}
      >
        <CardHeader
          subheader={
            <Box display="flex" flexDirection="row">
              <PeopleIcon />
              <Typography>{community.members}</Typography>
            </Box>
          }
          title={community.name}
        />
        <CardMedia image={community.imageUrl} className={classes.media} />
        <CardContent>
          <Typography>{community.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CommunityCard;
