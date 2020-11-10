import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Radios } from "mui-rff";

import PlayerRow from "./PlayerRow";
import validate from "./validate";
import { FormData } from "./types";

const defaultInitialValues = { players: [null, null, null, null, null] };

const SHForm: React.FC = () => {
  async function onSubmit(values: FormData) {}

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
              <Typography variant="h4">Secret Hitler</Typography>
            </Box>
            {errors.ruleError && (
              <Typography variant="h5" color="error">
                {errors.ruleError}
              </Typography>
            )}
            <FieldArray name="players">
              {({ fields, meta }) => {
                return fields.map((name, index) => (
                  <PlayerRow
                    index={index}
                    name={name}
                    key={index}
                    remove={() => {
                      fields.remove(index);
                    }}
                    removable={values.players.length > 5}
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
                  { label: "Liberal party", value: "liberal" },
                  { label: "Fascist party", value: "fascist" },
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
        </form>
      )}
    />
  );
};

export default SHForm;
