import Game from "./Game";
import Player from "./Player";

interface Match {
  id: string;
  game: Game;
  players: Player[];
  createdAt: Date;
}

export default Match;
