import React from "react";
import { Grid, makeStyles, MenuItem } from "@material-ui/core";
import { TextField } from "mui-rff";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { FormData, Match } from "./types";
import { getStorage } from "../localStorageManage";
import { Autocomplete } from "@material-ui/lab";

const roles = [
  {
    value: "imposter",
    label: "Imposter",
  },
  {
    value: "crewmate",
    label: "Crewmate",
  },
];

type Props = {
  index: number;
  name: string;
  remove: () => void;
  removable: boolean;
};

const useStyles = makeStyles((theme) => ({
  addIcon: {
    transform: "translateY(75%)",
  },
}));

const PlayerRow: React.FC<Props> = ({
  name,
  index,
  remove,
  removable = false,
}) => {
  const classes = useStyles();
  const [store] = React.useState<Match<FormData>[]>(getStorage());

  const players = React.useMemo(() => {
    const tmpPlayers = new Set<string>();
    store.forEach((match) => {
      match.players.forEach((player) => {
        if (player) {
          tmpPlayers.add(player.name);
        }
      });
    });
    return Array.from(tmpPlayers);
  }, [store]);

  return (
    <Grid style={{ display: "flex", flexDirection: "row" }}>
      <Autocomplete
        id="combo-box-demo"
        style={{ width: "auto", minWidth: "150px" }}
        options={players}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Player #${index + 1}`}
            name={`${name}.name`}
            required={true}
          />
        )}
      />

      <TextField
        style={{ width: "auto", minWidth: "100px" }}
        select
        label="Role"
        name={`${name}.party`}
        required={true}
      >
        {roles.map((role) => (
          <MenuItem key={role.value} value={role.value}>
            {role.label}
          </MenuItem>
        ))}
      </TextField>
      {removable && (
        <RemoveCircleOutlineIcon className={classes.addIcon} onClick={remove} />
      )}
    </Grid>
  );
};

export default PlayerRow;
