import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import PlayerRow from "./PlayerRow";

const Form = () => {
  const [blueTeamPlayersNum, setBlueTeamPlayersNum] = React.useState(2);
  const [redTeamPlayersNum, setRedTeamPlayersNum] = React.useState(2);

  return (
    <Box ml={2} mt={2}>
      <Box mb={2}>
        <Typography variant="h4">Codenames</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h5">Blue Team</Typography>
      </Box>
      <TextField
        label="Number of players"
        value={blueTeamPlayersNum}
        onChange={(e) => setBlueTeamPlayersNum(parseInt(e.currentTarget.value))}
        type="number"
      />
      {Array.from(Array(blueTeamPlayersNum).keys()).map((playerNum) => (
        <PlayerRow label={`Player #${playerNum + 1}`} key={playerNum} />
      ))}
      <Box mb={2} mt={2}>
        <Typography variant="h5">Red Team</Typography>
      </Box>
      <TextField
        label="Number of players"
        value={redTeamPlayersNum}
        onChange={(e) => setRedTeamPlayersNum(parseInt(e.currentTarget.value))}
        type="number"
      />
      {Array.from(Array(redTeamPlayersNum).keys()).map((playerNum) => (
        <PlayerRow label={`Player #${playerNum + 1}`} key={playerNum} />
      ))}

      <Box mt={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Who won?</FormLabel>
          <RadioGroup>
            <FormControlLabel
              value="blue"
              control={<Radio />}
              label="Blue Team"
            />
            <FormControlLabel
              value="red"
              control={<Radio />}
              label="Red Team"
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
