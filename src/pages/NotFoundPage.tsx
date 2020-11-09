import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import Layout from "../components/Layout";

const useStyles = makeStyles({
  root: {
    minHeight: "100%",
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div>
          <Typography variant="h4">Not found</Typography>
          <Typography variant="body1">
            Page you were looking for is not found. Most likely, it is simply
            not implemented yet.
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
