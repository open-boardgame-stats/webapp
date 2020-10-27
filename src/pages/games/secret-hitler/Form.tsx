import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import PlayerRow from "./PlayerRow";

import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Radios } from "mui-rff";

const initialValues = { players: [null, null, null, null, null] };

type Player = {
  name: string;
  party: "liberal" | "fascist" | "hitler";
};

type FormData = {
  players: Array<null | Player>;
  won?: string;
};

interface SHFormProps {
  initialValues: FormData;
}

function FormComponent() {
  return <SHForm initialValues={initialValues} />;
}
const SHForm = (props: SHFormProps) => {
  const { initialValues } = props;

  async function onSubmit(values: FormData) {
    console.log(values);
  }

  async function validate(values: FormData) {
    console.log("validate -> values", values);
    const playerNum = values.players.length;
    let counters = [0, 0, 0];
    const partyMatch = {
      hitler: 0,
      fascist: 1,
      liberal: 2,
    };

    let rolesByPlayerNum: Record<number, number[]> = {
      5: [1, 1, 3],
      6: [1, 1, 4],
      7: [1, 2, 4],
      8: [1, 2, 5],
      9: [1, 3, 5],
      10: [1, 3, 6],
    };

    const playersError: {
      players: Array<null | { name?: string; party?: string }>;
    } = {
      players: [],
    };

    values.players.forEach((player, index) => {
      if (player) {
        counters[partyMatch[player.party]]++;

        const error: typeof playersError["players"][0] = {};
        if (!player.name || player.name.length === 0) {
          error.name = "required";
        }

        if (!player.party) {
          error.party = "required";
        }
        playersError.players.push(error);
      } else {
        playersError.players.push({ name: "required", party: "required" });
      }
    });

    console.log("validate -> playersError", playersError);
    if (playersError.players.length > 0) {
      return playersError;
    }
    console.log("validate -> counters", counters);

    if (counters[partyMatch.hitler] !== 1) {
      return { ruleError: "Hitler must be only one" };
    }

    if (
      counters[partyMatch.fascist] >
      rolesByPlayerNum[playerNum][partyMatch.fascist]
    ) {
      return { ruleError: "There are too many farcists" };
    }

    if (
      counters[partyMatch.fascist] <
      rolesByPlayerNum[playerNum][partyMatch.fascist]
    ) {
      return { ruleError: "There are not enough fascists" };
    }

    if (
      counters[partyMatch.liberal] >
      rolesByPlayerNum[playerNum][partyMatch.liberal]
    ) {
      return { ruleError: "There are too many liberals" };
    }

    if (
      counters[partyMatch.liberal] <
      rolesByPlayerNum[playerNum][partyMatch.liberal]
    ) {
      return { ruleError: "There are not enough liberals" };
    }

    if (
      values.won === undefined ||
      !["liberal", "fascist"].includes(values.won)
    ) {
      return { won: "Who won?" };
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
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
                console.log("SHForm -> meta", meta);
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
              disabled={Object.keys(errors).length > 0}
            >
              Save Game
            </Button>
            <pre>{JSON.stringify(values)}</pre>
            <pre>{JSON.stringify(errors)}</pre>
          </Box>
        </form>
      )}
    />
  );
};

export default FormComponent;
