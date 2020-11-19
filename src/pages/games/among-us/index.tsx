import {
  Button,
  Box,
  Modal,
  Typography,
  makeStyles,
  TextField,
  Fade,
  createStyles,
  Theme,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import faker from "faker";

import {
  getStorage,
  getStorageString,
  importStorage,
} from "./localStorageManage";
import { amongUs } from "../../../components/Game";
import Layout from "../../../components/Layout";
import MatchList from "../../../components/Match/List";
import { FormData, Match as AmongUsMatch, Player } from "./Form/types";
import Match from "../../../types/Match";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const AmongUs = () => {
  const store: AmongUsMatch<FormData>[] = getStorage();
  const players: Record<string, object> = {};

  const matches: Match[] = store
    .map((match) => {
      return {
        id: match.id,
        game: amongUs,
        players: match.players.map((player) => {
          if (player) {
            players[player.name] = {};
          }
          return {
            id: faker.random.uuid(),
            name: player?.name || "unknown",
          };
        }),
        createdAt: new Date(match.createdAt),
      };
    })
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const [openCalcWinrate, setOpenCalcWinrate] = React.useState(false);

  const [json, setJson] = React.useState("");
  const [calcInfo, setCalcInfo] = React.useState(<></>);

  const calc = () => {
    const setResult = (
      data: number[][],
      party: "crewmate" | "imposter",
      isWin: boolean
    ) => {
      data[party === "crewmate" ? 0 : 1][isWin ? 0 : 1]++;
    };
    const total = [
      [0, 0],
      [0, 0],
    ];
    const mates: Record<string, number[][]> = {};

    store.forEach((match: AmongUsMatch<FormData>) => {
      const player = match.players.find(
        (item) => item && item.name.toLowerCase() === nickname.toLowerCase()
      );

      if (player) {
        const curMates = match.players.filter(
          (item) => item && item.party === player.party
        ) as Player[];

        const isWon = match.won === player.party;

        if (match.won) {
          setResult(total, player.party, isWon);

          curMates.forEach((mate) => {
            const name = mate.name.toLowerCase();
            if (name === player.name.toLowerCase()) return;
            if (mate.party === player.party) {
              if (!mates[name]) {
                mates[name] = [
                  [0, 0],
                  [0, 0],
                ];
              }
              setResult(mates[name], mate.party, isWon);
            }
          });
        }
      }
    });
    const Info = (
      <>
        <p>total</p>
        <ul>
          <li>{`crewmate win/lose: ${total[0][0]} / ${total[0][1]}`}</li>
          <li>{`imposter win/lose: ${total[1][0]} / ${total[1][1]}`}</li>
        </ul>
        {Object.keys(mates).map((key) => {
          const one = mates[key];
          return (
            <p>
              {`${key} crewmate (${one[0][0]} / ${one[0][1]}) imposter (${one[1][0]} / ${one[1][1]})`}
            </p>
          );
        })}
      </>
    );
    setCalcInfo(Info);
  };

  return (
    <Layout>
      <Typography variant="h4">{amongUs.name}</Typography>
      <Typography>{amongUs.description}</Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setJson(getStorageString());
          setOpen(true);
        }}
      >
        import
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setOpenCalcWinrate(true);
        }}
      >
        calc winrate
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <TextField
              placeholder="Insert json"
              defaultValue={json}
              onChange={(e) => setJson(e.target.value)}
            />
            <Button onClick={() => importStorage(json)}> set </Button>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openCalcWinrate}
        onClose={() => setOpenCalcWinrate(false)}
        closeAfterTransition
      >
        <Fade in={openCalcWinrate}>
          <div className={classes.paper}>
            <TextField
              placeholder="nickname"
              select
              defaultValue={nickname}
              onChange={(e) => setNickname(e.target.value)}
            >
              {Object.keys(players).map((nickname) => (
                <MenuItem key={nickname} value={nickname}>
                  {nickname}
                </MenuItem>
              ))}
            </TextField>
            <Button onClick={() => calc()}> cacl </Button>
            {calcInfo}
          </div>
        </Fade>
      </Modal>
      <Box mt={3}>
        <MatchList matches={matches} game={amongUs} />
      </Box>
    </Layout>
  );
};

export default AmongUs;
