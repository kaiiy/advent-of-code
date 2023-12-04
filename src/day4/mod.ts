// https://adventofcode.com/2023/day/4

interface Card {
  readonly id: number;
  readonly winning: number[];
  readonly having: number[];
}

interface MatchedCard extends Card {
  readonly matched: number;
}

interface CardWithNum extends MatchedCard {
  num: number;
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

const setMatched = (card: Readonly<Card>): MatchedCard => {
  const { winning, having } = card;
  const _set = new Set(having);
  const common = new Set(winning.filter((value) => _set.has(value)));
  const matched = common.size;
  return { ...card, matched };
};

const setNums = (cards: Readonly<MatchedCard[]>): CardWithNum[] => {
  const _cards: CardWithNum[] = cards.map((card) => ({ ...card, num: 1 }));

  for (const card of cards) {
    const { matched } = card;
    if (matched === 0) {
      continue;
    } else {
      const { matched } = card;
      for (let i = 0; i < matched; i++) {
        _cards[i + card.id].num += _cards[card.id - 1].num;
      }
    }
  }

  return _cards;
};

const solvePart1 = (matchedCards: Readonly<MatchedCard[]>): number => {
  return matchedCards.map((card) => card.matched).reduce(
    (a, b) => {
      if (b === 0) {
        return a;
      }
      return a + 2 ** (b - 1);
    },
    0,
  );
};

const solvePart2 = (cards: Readonly<CardWithNum[]>): number => {
  return cards.map((card) => card.num).reduce((a, b) => a + b, 0);
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const cards = parseCards(input);
  const matchedCards = cards.map(setMatched);
  const cardsWithNum = setNums(matchedCards);

  const answerPart1 = solvePart1(matchedCards);
  const answerPart2 = solvePart2(cardsWithNum);

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
