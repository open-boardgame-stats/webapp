import faker from "faker";

export interface Community {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  members: number;
}

export const generate = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
  description: faker.lorem.paragraph(5),
  imageUrl: faker.image.abstract(640, 480),
  members: faker.random.number(1000),
});

export const generateMultiple = (n: number) =>
  Array(n)
    .fill(1)
    .map(() => generate());
