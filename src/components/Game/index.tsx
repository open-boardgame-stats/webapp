import faker from "faker";

import Game from "../../types/Game";

export const hitler: Game = {
  id: "secret_hitler",
  name: "Secret Hitler",
  imageUrl: "https://www.secrethitler.com/assets/social.jpg",
  description:
    "Secret Hitler is a social deduction game for 5-10 people about finding and stopping the Secret Hitler.",
  matches: faker.random.number(1000),
};

export const codenames: Game = {
  id: "codenames",
  name: "Codenames",
  imageUrl:
    "https://m.media-amazon.com/images/S/aplus-media/vc/a715d1db-0374-42b2-b164-99754c40eee7._SR300,300_.jpg",
  description:
    "Codenames is a social word game with a simple premise and challenging game play. Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their codenames. The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the table. Their teammates try to guess words of their color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin. The game works very well with 4 players if you prefer to guess without help. Or you can add more players if you prefer lively discussion. There is also a cooperative variant where a single team tries to achieve the highest score they can by playing against the game itself.",
  matches: faker.random.number(1000),
};

export const games: Game[] = [hitler, codenames];
