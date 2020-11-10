import { FormData, MAP } from "./types";

export default async function validate(values: FormData) {
  let counters = [0, 0];

  const partyMatch = {
    imposter: 0,
    crewmate: 1,
  };

  let rolesByImposterNum: Record<number, number[]> = {
    1: [3, 10],
    2: [7, 10],
    3: [9, 10],
  };

  const playersError: {
    players: Array<null | { name?: string; party?: string }>;
  } = {
    players: [],
  };

  values.players.forEach((player) => {
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

  if (!rolesByImposterNum[counters[partyMatch.imposter]]) {
    return { ruleError: "There are too many imposters" };
  }

  if (counters[partyMatch.imposter] === 0) {
    return { ruleError: "There are not enough imposters" };
  }

  if (
    counters[partyMatch.crewmate] >
    rolesByImposterNum[counters[partyMatch.imposter]][1]
  ) {
    return { ruleError: "There are too many crewmates" };
  }

  if (
    counters[partyMatch.crewmate] <
    rolesByImposterNum[counters[partyMatch.imposter]][0]
  ) {
    return { ruleError: "There are not enough crewmates" };
  }

  if (values.map === undefined || !Object.values(MAP).includes(values.map)) {
    return { won: "set map" };
  }

  if (
    values.won === undefined ||
    !["crewmate", "imposter"].includes(values.won)
  ) {
    return { won: "choose winner party" };
  }
}
