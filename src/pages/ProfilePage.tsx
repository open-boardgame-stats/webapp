import React from "react";
import {
  Avatar,
  Box,
  Container,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import faker from "faker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

import Layout from "../components/Layout";

const recentGames = Array(5)
  .fill(1)
  .map(() => ({
    name: faker.company.bsNoun(),
    timesPlayed: faker.random.number(9) + 1,
  }))
  .sort((a, b) => b.timesPlayed - a.timesPlayed);

const winrate = Array(5)
  .fill(1)
  .map(() => ({
    name: faker.company.bsNoun(),
    winrate: faker.random.number(60) + 40,
  }))
  .sort((a, b) => b.winrate - a.winrate);

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginRight: theme.spacing(5),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Layout>
      <Container className={classes.root} maxWidth="md">
        <Box display="flex" flexDirection="row">
          <Tooltip title="This is you">
            <Avatar
              variant="rounded"
              className={classes.avatar}
              src={faker.image.avatar()}
            />
          </Tooltip>
          <Box display="flex" flexDirection="column" flex="1">
            <Typography variant="h3">{faker.name.firstName()}</Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Typography variant="h5">Games played recently:</Typography>
              <Typography variant="h5">Overall winrate:</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <ResponsiveContainer height={200}>
                <BarChart data={recentGames} layout="vertical">
                  <Label>Games played:</Label>
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={false}
                    width={10}
                  />
                  <XAxis type="number" interval="preserveStartEnd" />
                  <ChartTooltip />
                  <Bar
                    dataKey="timesPlayed"
                    name="Times played"
                    fill={theme.palette.primary.dark}
                  />
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer height={200}>
                <BarChart data={winrate} layout="vertical">
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={false}
                    width={10}
                  />
                  <XAxis domain={[0, 100]} type="number" unit="%" />
                  <ChartTooltip />
                  <Bar
                    dataKey="winrate"
                    name="Winrate"
                    fill={theme.palette.primary.dark}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
