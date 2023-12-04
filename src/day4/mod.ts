// https://adventofcode.com/2023/day/4

interface Card {
  readonly id: number;
  readonly winning: number[];
  readonly having: number[];
}

const parseCards = (input: string): Card[] => {
  const cardLines = input.split("\n");
  return cardLines.map((line) => {
    const [idPart, winningPart, havingPart] = line.split(/:|\|/).map((part) =>
      part.trim()
    );
    const id = parseInt(idPart.split(/\s+/)[1]);
    const winning = winningPart.split(/\s+/).map(Number);
    const having = havingPart.split(/\s+/).map(Number);
    return { id, winning, having };
  });
};

const solvePart1 = (cards: Readonly<Card[]>): number => {
  return cards.map((card) => {
    const { winning, having } = card;
    const _set = new Set(having);
    const common = new Set(winning.filter((value) => _set.has(value)));
    const cnt = common.size;
    if (cnt <= 0) {
      return 0;
    }
    return 2 ** (cnt - 1);
  }).reduce((a, b) => a + b, 0);
};

const solvePart2 = (cards: Readonly<Card[]>): number => {
  return 0;
};

const main = async () => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve("./input.txt")),
  );

  const cards = parseCards(input);
  // console.log(cards.slice(0, 3));
  const answerPart1 = solvePart1(cards);
  const answerPart2 = solvePart2(cards);

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

if (import.meta.main) {
  await main();
}

export { parseCards, solvePart1, solvePart2 };
