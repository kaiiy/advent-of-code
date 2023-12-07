// https://adventofcode.com/2023/day/7

import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";

const CARDS = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

type Card = typeof CARDS[number];

type Type =
  | "Five of a Kind"
  | "Four of a Kind"
  | "Full House"
  | "Three of a Kind"
  | "Two Pair"
  | "One Pair"
  | "High Card";

interface Hand {
  readonly cards: [Card, Card, Card, Card, Card];
  readonly bit: number;
  type?: Type;
  rank?: number;
}

const isValidCard = (card: string): card is Card => {
  for (const c of CARDS) {
    if (card === c) {
      return true;
    }
  }
  return false;
};

const parseHands = (input: string): Hand[] => {
  return input.split("\n").map((hand) => {
    const split = hand.split(/\s+/);
    const _cards = split[0].split("");

    if (_cards.length !== 5 || !_cards.every(isValidCard)) {
      throw new Error("Invalid card input");
    }

    return {
      cards: [_cards[0], _cards[1], _cards[2], _cards[3], _cards[4]] as [
        Card,
        Card,
        Card,
        Card,
        Card,
      ],
      bit: Number.parseInt(split[1]),
    };
  });
};

const solvePart1 = (): number => {
  return 0;
};

const solvePart2 = (): number => {
  return 0;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const hands = parseHands(input);
  console.log(hands);

  const answerPart1 = solvePart1();
  const answerPart2 = solvePart2();

  return [answerPart1, answerPart2];
};

const main = async () => {
  const [answerPart1, answerPart2] = await solve("./input.txt");

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

if (import.meta.main) {
  await main();
}

export { solve };
