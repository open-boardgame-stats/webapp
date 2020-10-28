import { Box, Typography } from "@material-ui/core";
import React from "react";
import faker from "faker";

import { codenames } from "../../../components/Game";
import Layout from "../../../components/Layout";
import MatchList from "../../../components/Match/List";
import Match from "../../../types/Match";

const SecretHilter = () => {
  const matches: Match[] = Array(20)
    .fill(1)
    .map(() => ({
      game: codenames,
      id: faker.random.uuid(),
      players: Array(faker.random.number(6) + 4)
        .fill(1)
        .map(() => ({
          id: faker.random.uuid(),
          name: faker.name.firstName(),
        })),
      createdAt: faker.date.past(1),
    }))
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

  return (
    <Layout>
      <Typography variant="h4">{codenames.name}</Typography>
      <Typography>{codenames.description}</Typography>
      <Box mt={3}>
        <MatchList matches={matches} game={codenames} />
      </Box>
    </Layout>
  );
};

export default SecretHilter;
