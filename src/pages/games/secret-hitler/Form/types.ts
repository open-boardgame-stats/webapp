export type Player = {
  name: string;
  party: "liberal" | "fascist" | "hitler";
};

export type FormData = {
  players: Array<null | Player>;
  won?: string;
};

export interface SHFormProps {
  initialValues?: FormData;
}
