/** @format */
import { faker } from "@faker-js/faker";
import { Cards } from "./types/Cards";

const generateCard = (): Cards => ({
  question: faker.word.verb(),
  answer: faker.word.adjective(),
});

export const generateCards = (count: number): Cards[] => {
  const cards: Cards[] = Array.from({ length: count }, generateCard);
  return cards;
};
