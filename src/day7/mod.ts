// https://adventofcode.com/2023/day/7

import {
  extendHandsPart1,
  extendHandsPart2,
  type Hand,
  type HandBase,
  parseHandBases,
} from "./hand.ts";

const solvePart1 = (
  handBases: HandBase[],
  extendHands: (handBases: HandBase[]) => Hand[],
): number => {
  const hands = extendHands(handBases);
  return hands.reduce((acc, hand) => {
    return acc + hand.rank * hand.bit;
  }, 0);
};

const solvePart2 = (
  handBases: HandBase[],
  extendHands: (handBases: HandBase[]) => Hand[],
): number => {
  const hands = extendHands(handBases);
  return hands.reduce((acc, hand) => {
    return acc + hand.rank * hand.bit;
  }, 0);
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const handBases = parseHandBases(input);

  const answerPart1 = solvePart1(handBases, extendHandsPart1);
  const answerPart2 = solvePart2(handBases, extendHandsPart2);

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
