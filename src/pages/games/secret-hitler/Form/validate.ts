import { FormData } from "./types";

export default async function validate(values: FormData) {
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

  if (
    playersError.players.some((error) => error && Object.keys(error).length > 0)
  ) {
    return playersError;
  }

  if (counters[partyMatch.hitler] !== 1) {
    return { ruleError: "There are must be exactly one hitler" };
  }

  if (
    counters[partyMatch.fascist] >
    rolesByPlayerNum[playerNum][partyMatch.fascist]
  ) {
    return { ruleError: "There are too many fascist" };
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
    return { won: "choose winner party" };
  }
}
