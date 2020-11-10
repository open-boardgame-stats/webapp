export enum MAP {
  THE_SKELD = "theSkeld",
  MIRAHQ = "mirahq",
  POLUS = "polus",
}
export type Player = {
  name: string;
  party: "crewmate" | "imposter";
};

export type FormData = {
  players: Array<null | Player>;
  map: MAP;
  won?: Player["party"];
};

export type Match<T> = T & {
  id: string;
  createdAt: Date;
};
