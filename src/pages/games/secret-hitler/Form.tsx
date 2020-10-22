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
  const [playersNum, setPlayersNum] = React.useState(6);

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
      {Array.from(Array(playersNum).keys()).map((playerNum) => (
        <PlayerRow label={`Player #${playerNum + 1}`} key={playerNum} />
      ))}
      <Box mt={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Who won?</FormLabel>
          <RadioGroup>
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
