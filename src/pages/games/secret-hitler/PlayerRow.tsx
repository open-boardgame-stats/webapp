import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@material-ui/core";

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

type Player = {
  name: string;
  party: "liberal" | "fascist" | "hitler";
};

type Props = {
  label: string;
};

const PlayerRow: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [party, setParty] = useState<Player["party"]>("liberal");

  return (
    <Box mt={2}>
      <TextField
        label={`Player #`}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        name="name"
        value={name}
      />
      <TextField
        select
        label="Role"
        name="party"
        value={party}
        onChange={(e) => {
          setParty(e.target.value as Player["party"]);
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
};

export default PlayerRow;
