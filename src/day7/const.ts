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

const CARD_RANK_JOKER = {
  A: 12,
  K: 11,
  Q: 10,
  J: -1,
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

export {
  type Card,
  CARD_RANK,
  CARD_RANK_JOKER,
  CARDS,
  type Hand,
  type HandBase,
  type Type,
  TYPE_RANK,
};
