import React from "react";
import { Box, MenuItem } from "@material-ui/core";
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

const PlayerRow: React.FC<Props> = ({
  name,
  index,
  remove,
  removable = false,
}) => {
  return (
    <Box mt={2} alignItems="center" textAlign="center" display="flex">
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
      {removable && <RemoveCircleOutlineIcon onClick={remove} />}
    </Box>
  );
};

export default PlayerRow;
