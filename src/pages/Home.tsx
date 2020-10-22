import { Box } from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";

import SecretHitlerForm from "../pages/games/secret-hitler/Form";

const Home = () => {
  return (
    <Layout>
      <Box>
        <SecretHitlerForm />
      </Box>
    </Layout>
  );
};
export default Home;
