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

export const amongUs: Game = {
  id: "among_us",
  name: "Among Us",
  imageUrl:
    "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
  description:
    "Play with 4-10 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone! Originally created as a party game, we recommend playing with friends at a LAN party or online using voice chat. Enjoy cross-platform play between Android, iOS and PC.",
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

export const terraformingMars: Game = {
  id: "terraforming_mars",
  name: "Terraforming Mars",
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/I/91RdR7olLsL._AC_SL1500_.jpg",
  description:
    "In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, the oxygen level, and the ocean coverage until the environment is habitable. In Terraforming Mars, you play one of those corporations and work together in the terraforming process, but compete for getting victory points that are awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system, and doing other commendable things.",
  matches: faker.random.number(1000),
};

export const games: Game[] = [hitler, codenames, terraformingMars, amongUs];
