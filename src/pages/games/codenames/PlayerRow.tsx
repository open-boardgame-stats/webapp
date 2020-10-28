import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";

type Props = {
  label: string;
};

const PlayerRow: React.FC<Props> = ({ label }) => {
  const [name, setName] = useState("");

  return (
    <Box>
      <TextField
        label={label}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        name="name"
        value={name}
      />
    </Box>
  );
};

export default PlayerRow;
