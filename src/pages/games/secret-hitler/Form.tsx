import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

type ValueOf<T> = T[keyof T];
type Player = {
  name: string;
  party: "liberal" | "fascist" | "hitler";
};

const roles = [
  {
    value: "liberal",
    label: "Liberal",
  },
  {
    value: "fascist",
    label: "Fascist",
  },
  {
    value: "hitler",
    label: "Hitler",
  },
];
const emptyPlayer: Player = {
  name: "",
  party: "liberal",
};

const Form = () => {
  const [playersNum, setPlayersNum] = React.useState(6);
  const [players, setPlayers] = React.useState<Player[]>(
    Array(playersNum).fill(emptyPlayer)
  );

  const handlePlayerChange = (
    field: keyof Player,
    value: ValueOf<Player>,
    playerNum: number
  ) => {
    const newPlayers = [...players];
    newPlayers.splice(playerNum, 1, {
      ...newPlayers[playerNum],
      [field]: value,
    });

    setPlayers(newPlayers);
  };

  return (
    <Box ml={2} mt={2}>
      <Box mb={2}>
        <Typography variant="h4">Secret Hitler</Typography>
      </Box>
      <TextField
        label="Number of players"
        value={playersNum}
        onChange={(e) => setPlayersNum(parseInt(e.currentTarget.value))}
        type="number"
      />
      {Array.from(Array(playersNum).keys()).map((playerNum) => {
        return (
          <Box mt={2} key={playerNum}>
            <TextField
              label={`Player #${playerNum + 1}`}
              onChange={(e) => {
                handlePlayerChange(
                  "name",
                  e.currentTarget.value as Player["name"],
                  playerNum
                );
              }}
              value={players[playerNum]?.["name"] || ""}
            />
            <TextField
              label="Role"
              select
              value={players[playerNum]["party"]}
              onChange={(e) => {
                handlePlayerChange(
                  "party",
                  e.currentTarget.value as Player["party"],
                  playerNum
                );
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );
      })}
      <Box mt={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Who won?</FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
            <FormControlLabel
              value="liberal"
              control={<Radio />}
              label="Liberal party"
            />
            <FormControlLabel
              value="fascist"
              control={<Radio />}
              label="Fascist party"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button variant="contained" color="primary">
        Save Game
      </Button>
    </Box>
  );
};

export default Form;
