import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import faker from "faker";

import Layout from "../../../components/Layout";
import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cyan, indigo, pink, purple, red } from "@material-ui/core/colors";
import { useRouteMatch } from "react-router-dom";
import theme from "../../../theme";
import { Rating } from "@material-ui/lab";

const metrics = [
  "terraform rating",
  "achievements",
  "awards",
  "cards",
  "cities",
  "forests",
];

interface ScoreByCategory {
  category: string;
  scores: {
    [player: string]: number;
  };
}

const createScore: (names: string[]) => ScoreByCategory[] = (names: string[]) =>
  metrics.map((metric) => ({
    category: metric,
    scores: {
      ...names
        .map((name) => ({ [name]: faker.random.number(100) }))
        .reduce((prev, current) => ({ ...prev, ...current })),
      totalAverage: faker.random.number(150),
    },
  }));

const players = ["Rifat", "Anton", "Max", "Alex", "Mike"];

const colors = [red[500], pink[500], purple[500], indigo[500], cyan[500]];

const byCategory = createScore(players);

const byPlayer = players.map((player) => ({
  name: player,
  scores: {
    ...byCategory
      .map((score) => ({ [score.category]: score.scores[player] }))
      .reduce((prev, current) => ({ ...prev, ...current })),
    totalAverage: faker.random.number(150),
  },
}));

const duration = () =>
  `${faker.random.number(24).toString().padStart(2, "0")}:${faker.random
    .number(59)
    .toString()
    .padStart(2, "0")}:${faker.random.number(59).toString().padStart(2, "0")}`;

interface Props {
  id: string;
}

const TerraformingMarsMatch: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Props>();
  return (
    <Layout>
      <Typography variant="h5">{id}</Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        <Box m={1}>
          <Paper>
            <RadarChart width={300} height={300} data={byCategory}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {players.map((player, i) => (
                <Radar
                  name={player}
                  dataKey={`scores.${player}`}
                  fill={colors[i]}
                  fillOpacity={0.6}
                  key={i}
                />
              ))}
              <Legend />
              <Tooltip />
            </RadarChart>
          </Paper>
        </Box>
        <Box m={1}>
          <Paper>
            <Box p={1}>
              <ComposedChart
                width={500}
                height={300 - theme.spacing(2)}
                data={byPlayer}
              >
                <XAxis name="Player" dataKey="name" />
                <YAxis />
                {metrics.map((metric, i) => (
                  <Bar
                    key={i}
                    dataKey={`scores.${metric}`}
                    name={metric}
                    stackId="x"
                    fill={colors[i]}
                  />
                ))}
                <Line
                  dataKey="scores.totalAverage"
                  type="monotone"
                  name="average"
                  stroke="black"
                  dot={false}
                  activeDot={false}
                />
                <Legend />
                <Tooltip />
              </ComposedChart>
            </Box>
          </Paper>
        </Box>
        <Box m={1}>
          <Paper>
            <Box
              p={1}
              height={300}
              width={300}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography variant="caption">Date played:</Typography>
              <Typography>
                {new Intl.DateTimeFormat().format(faker.date.recent(1))}
              </Typography>
              <Typography variant="caption">Game duration:</Typography>
              <Typography>{duration()}</Typography>
              <Typography variant="caption">Rating:</Typography>
              <Rating value={faker.random.number(5)} readOnly />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default TerraformingMarsMatch;
