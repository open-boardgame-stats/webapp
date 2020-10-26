import faker from "faker";

import Community from "../../types/Community";

export const generate: () => Community = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
  description: faker.lorem.paragraph(5),
  imageUrl: faker.image.abstract(640, 480),
  members: faker.random.number(1000),
});

export const generateMultiple: (n: number) => Community[] = (n) =>
  Array(n)
    .fill(1)
    .map(() => generate());
