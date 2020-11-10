import React from "react";
import { Grid, makeStyles, MenuItem } from "@material-ui/core";
import { TextField } from "mui-rff";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

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
  return (
    <Grid>
      <TextField
        style={{ width: "auto" }}
        label={`Player #${index + 1}`}
        name={`${name}.name`}
        required={true}
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
