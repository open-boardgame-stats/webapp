"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import ListIcon from "@mui/icons-material/List";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TableViewIcon from "@mui/icons-material/TableView";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import FindPlayerModal from "@/matches/components/FindPlayerModal";
import StatInput from "@/matches/components/StatInput";
import { FormValues, schema } from "@/matches/components/schema";
import GameAutocomplete from "components/GameAutocomplete";
import {
  PlayerFieldsFragment,
  StatDescriptionStatType,
  useCreateMatchMutation,
  StatInput as StatInputType,
  GameVersionFieldsFragment,
} from "graphql/generated";
import { parseEnumMetadata } from "modules/stats";
import { byOrderNumber } from "modules/stats/utils";
import { useSnackbarError } from "utils/apollo";
import { useUser } from "utils/user";

const steps = ["Select game", "Enter stats"];
const viewTypes = ["table", "list"] as const;

const Form = () => {
  const { user } = useUser();

  const [version, setVersion] = useState<
    GameVersionFieldsFragment | null | undefined
  >();
  const [players, setPlayers] = useState<PlayerFieldsFragment[]>([]);
  const form = useForm<FormValues>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [viewType, setViewType] = useState<typeof viewTypes[number]>(
    mobile ? "list" : "table"
  );
  useEffect(() => {
    setViewType(mobile ? "list" : "table");
  }, [mobile]);

  const { setValue, handleSubmit } = form;
  const statDescriptions = useMemo(
    () => version?.statDescriptions.slice().sort(byOrderNumber) || [],
    [version]
  );

  const createPlayerStats: () => Record<string, string> = useCallback(
    () =>
      statDescriptions?.reduce((acc, d) => {
        // aggregate stats are not editable and are calculated automatically on the server
        if (d.type === StatDescriptionStatType.Aggregate) return acc;
        return {
          ...acc,
          [d.id]:
            d.type === StatDescriptionStatType.Numeric
              ? "0"
              : d.type === StatDescriptionStatType.Enum && d.metadata
              ? parseEnumMetadata(d.metadata).possibleValues[0]
              : "",
        };
      }, {}) ?? {},
    [statDescriptions]
  );

  // add user's main player to the list of players
  useEffect(() => {
    if (!user?.mainPlayer || players.length || !version) return;
    setPlayers([user.mainPlayer]);
    setValue(user.mainPlayer.id, createPlayerStats());
  }, [user, version, players, createPlayerStats, setValue]);

  const [activeStep, setActiveStep] = useState(0);

  const [showFindPlayer, setShowFindPlayer] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const addPlayer = useCallback(
    (player: PlayerFieldsFragment) => {
      if (players.find((p) => p.id === player.id)) {
        enqueueSnackbar("Player already present", { variant: "warning" });
        return;
      }
      setPlayers([...players, player]);
      setValue(player.id, createPlayerStats());
      setShowFindPlayer(false);
    },
    [createPlayerStats, enqueueSnackbar, players, setValue]
  );

  const [createMatch, { error, loading }] = useCreateMatchMutation();
  useSnackbarError(error);

  const router = useRouter();
  const onSubmit = useCallback(
    async (values: FormValues) => {
      if (!version) return;
      await createMatch({
        variables: {
          input: {
            gameVersionId: version.id,
            playerIds: players.map((p) => p.id),
            stats: Object.entries(values).flatMap(
              ([playerId, playerStats]): StatInputType[] => {
                return Object.entries(playerStats).map(
                  ([statId, value]): StatInputType => ({
                    playerId,
                    statId,
                    value,
                  })
                );
              }
            ),
          },
        },
      });
      enqueueSnackbar("Match created", { variant: "success" });
      router.push("/matches");
    },
    [createMatch, enqueueSnackbar, players, router, version]
  );

  return (
    <Container>
      <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <GameAutocomplete onVersionChange={setVersion} />
          </Stack>
          <Button
            onClick={() => setActiveStep(1)}
            variant="contained"
            disabled={!version}
          >
            Continue
          </Button>
        </>
      )}
      {activeStep === 1 && (
        <FormProvider {...form}>
          <Toolbar>
            <Stack
              direction="row"
              spacing={2}
              sx={{ flexGrow: 1 }}
              justifyContent="flex-end"
            >
              <Tooltip title="List view">
                <IconButton onClick={() => setViewType("list")}>
                  <ListIcon
                    color={viewType === "list" ? "primary" : "inherit"}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Table view">
                <IconButton onClick={() => setViewType("table")}>
                  <TableViewIcon
                    color={viewType === "table" ? "primary" : "inherit"}
                  />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Add player">
                <IconButton onClick={() => setShowFindPlayer(true)}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
          <form onSubmit={handleSubmit(onSubmit)}>
            {viewType === "table" ? (
              <Table sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Player</TableCell>
                    {statDescriptions.map((d) => (
                      <TableCell key={d.id}>{d.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((player) => (
                    <TableRow hover key={player.id}>
                      <TableCell>
                        {player.id === user?.mainPlayer?.id
                          ? "You"
                          : player.name || player.owner?.name}
                      </TableCell>
                      {statDescriptions.map((d) => (
                        <TableCell key={d.id}>
                          <StatInput statDescription={d} playerId={player.id} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              statDescriptions.map((stat, i) => (
                <Box key={stat.id} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {stat.name}
                  </Typography>
                  <Stack spacing={2}>
                    {players.map((player) => (
                      <Grid
                        key={player.id}
                        container
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              height: "100%",
                              mr: 2,
                            }}
                          >
                            <Typography variant="body1">
                              {player.id === user?.mainPlayer?.id
                                ? "You"
                                : player.name || player.owner?.name}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <StatInput
                            statDescription={stat}
                            playerId={player.id}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Stack>
                  {i !== statDescriptions.length - 1 && (
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  )}
                </Box>
              ))
            )}

            <Stack direction="row" justifyContent="space-between">
              <Button onClick={() => setActiveStep(0)}>Back</Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit"
              >
                Create match
              </LoadingButton>
            </Stack>
            <FindPlayerModal
              open={showFindPlayer}
              onClose={() => setShowFindPlayer(false)}
              onConfirm={addPlayer}
            />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default Form;
