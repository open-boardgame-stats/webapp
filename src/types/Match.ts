import Game from "./Game";
import Player from "./Player";

interface Match {
  id: string;
  game: Game;
  players: Player[];
}

export default Match;
