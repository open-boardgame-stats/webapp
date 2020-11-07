import React from "react";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <Typography variant="h4">Not found</Typography>
          <Typography variant="body1">
            Page you were looking for is not found. Most likely, it is simply
            not implemented yet.
          </Typography>
        </div>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;
