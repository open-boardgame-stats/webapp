import User from "./User";

interface Player {
  id: string;
  name: string;
  user?: User;
}

export default Player;
