import { Typography, Box } from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <Box display="flex" flex="1" justifyContent="center" alignItems="center">
        <Typography variant="h3">Welcome</Typography>
      </Box>
    </Layout>
  );
};
export default Home;
