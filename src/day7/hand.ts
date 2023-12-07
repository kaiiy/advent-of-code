import {
  compareHands,
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isHighCard,
  isOnePair,
  isThreeOfAKind,
  isTwoPair,
} from "./type.ts";

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

const CARD_RANK = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  "9": 7,
  "8": 6,
  "7": 5,
  "6": 4,
  "5": 3,
  "4": 2,
  "3": 1,
  "2": 0,
} as const;

const TYPE_RANK = {
  "Five of a Kind": 6,
  "Four of a Kind": 5,
  "Full House": 4,
  "Three of a Kind": 3,
  "Two Pair": 2,
  "One Pair": 1,
  "High Card": 0,
};

type Card = typeof CARDS[number];

type Type =
  | "Five of a Kind"
  | "Four of a Kind"
  | "Full House"
  | "Three of a Kind"
  | "Two Pair"
  | "One Pair"
  | "High Card";

interface HandBase {
  readonly cards: [Card, Card, Card, Card, Card];
  readonly bit: number;
  num: {
    [key in Card]: number;
  };
}

interface Hand extends HandBase {
  type: Type;
  rank: number;
}

const parseHandBases = (input: string): HandBase[] => {
  const isValidCard = (card: string): card is Card => {
    for (const c of CARDS) {
      if (card === c) {
        return true;
      }
    }
    return false;
  };

  const _hands: HandBase[] = input.split("\n").map((hand) => {
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
      num: {
        A: 0,
        K: 0,
        Q: 0,
        J: 0,
        T: 0,
        "9": 0,
        "8": 0,
        "7": 0,
        "6": 0,
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
      },
    };
  });

  const hands = _hands.map(setHandNums);
  return hands;
};

const setHandNums = (hand: Readonly<HandBase>): HandBase => {
  const _hand = { ...hand };

  for (const card of _hand.cards) {
    _hand.num[card] += 1;
  }

  return _hand;
};

const setHandType = (hand: Readonly<Hand>): Hand => {
  if (isFiveOfAKind(hand)) {
    return {
      ...hand,
      type: "Five of a Kind",
    };
  }

  if (isFourOfAKind(hand)) {
    return {
      ...hand,
      type: "Four of a Kind",
    };
  }

  if (isFullHouse(hand)) {
    return {
      ...hand,
      type: "Full House",
    };
  }

  if (isThreeOfAKind(hand)) {
    return {
      ...hand,
      type: "Three of a Kind",
    };
  }

  if (isTwoPair(hand)) {
    return {
      ...hand,
      type: "Two Pair",
    };
  }

  if (isOnePair(hand)) {
    return {
      ...hand,
      type: "One Pair",
    };
  }

  if (isHighCard(hand)) {
    return {
      ...hand,
      type: "High Card",
    };
  } else {
    throw new Error("Invalid hand");
  }
};

const setHandsRank = (hands: Readonly<Hand[]>): Hand[] => {
  const _hands = hands.toSorted((a, b) => compareHands(a, b));

  for (let i = 0; i < _hands.length; i++) {
    _hands[i].rank = i + 1;
  }

  return _hands;
};

const extendHandsPart1 = (hands: Readonly<HandBase[]>): Hand[] => {
  const _hands: Hand[] = hands.map((hand) => ({
    ...hand,
    type: "High Card",
    rank: -1,
  }));
  // set types
  const handsTypes = _hands.map(setHandType);
  // set ranks
  const handsRanks = setHandsRank(handsTypes);

  return handsRanks;
};

// TODO: JOKER拡張
const extendHandsPart2 = (hands: Readonly<HandBase[]>): Hand[] => {
  const _hands: Hand[] = hands.map((hand) => ({
    ...hand,
    type: "High Card",
    rank: -1,
  }));
  // set types
  const handsTypes = _hands.map(setHandType);
  // set ranks
  const handsRanks = setHandsRank(handsTypes);

  return handsRanks;
};

export {
  CARD_RANK,
  CARDS,
  extendHandsPart1,
  extendHandsPart2,
  type Hand,
  type HandBase,
  parseHandBases,
  TYPE_RANK,
};
