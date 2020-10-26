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
