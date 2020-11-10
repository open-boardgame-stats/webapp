import React from "react";
import { Box, Button, MenuItem, Typography } from "@material-ui/core";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Radios, TextField } from "mui-rff";
import faker from "faker";

import PlayerRow from "./PlayerRow";
import validate from "./validate";
import { FormData, MAP, Match } from "./types";
import { saveNewMatch } from "../localStorageManage";

const defaultInitialValues: FormData = {
  map: MAP.THE_SKELD,
  players: Array(10).fill({ party: "crewmate" }),
  // players: [
  //   { name: "SesH", party: "crewmate" },
  //   { name: "MrSugar", party: "crewmate" },
  //   { name: "Vincent", party: "crewmate" },
  //   { name: "MOZGIII", party: "crewmate" },
  //   { name: "Five", party: "crewmate" },
  //   { name: "Ali", party: "crewmate" },
  //   { name: "Graf", party: "crewmate" },
  //   { name: "NastyaZu", party: "crewmate" },
  //   { name: "Fapo4ka", party: "crewmate" },
  //   { name: "irobotbender", party: "crewmate" },
  // ],
};

const maps = [
  {
    value: MAP.THE_SKELD,
    label: "THE SKELD",
  },
  {
    value: MAP.MIRAHQ,
    label: "MIRAHQ",
  },
  {
    value: MAP.POLUS,
    label: "POLUS",
  },
];

const AmongUsForm: React.FC = () => {
  async function onSubmit(values: Match<FormData>) {
    saveNewMatch({
      ...values,
      id: faker.random.uuid(),
      createdAt: new Date(),
    });
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={defaultInitialValues}
      validate={validate}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        handleSubmit,
        submitting,
        form: {
          mutators: { push },
        },
        errors,
        values,
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box ml={2} mt={2}>
            <Box mb={2}>
              <Typography variant="h4">Among Us</Typography>
            </Box>
            {errors.ruleError && (
              <Typography variant="h5" color="error">
                {errors.ruleError}
              </Typography>
            )}
            <TextField
              style={{ width: "auto", minWidth: "100px" }}
              select
              label="Map"
              name={"map"}
              required={true}
            >
              {maps.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
            <FieldArray name="players">
              {({ fields }) => {
                return fields.map((name, index) => (
                  <PlayerRow
                    index={index}
                    name={name}
                    key={index}
                    remove={() => {
                      fields.remove(index);
                    }}
                    removable={values.players.length > 4}
                  />
                ));
              }}
            </FieldArray>
            <Box mt={2}>
              <Button
                onClick={() => {
                  push("players", null);
                }}
                disabled={values.players.length >= 10}
              >
                Add player
              </Button>
            </Box>
            <Box mt={2}>
              <Radios
                label="Who won?"
                name="won"
                required={true}
                data={[
                  { label: "Crewmate party", value: "crewmate" },
                  { label: "Imposter party", value: "imposter" },
                ]}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitting}
            >
              Save Game
            </Button>
          </Box>
          <span>{JSON.stringify(errors)}</span>
        </form>
      )}
    />
  );
};

export default AmongUsForm;
