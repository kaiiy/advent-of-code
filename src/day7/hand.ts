import {
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
}

interface Hand extends HandBase {
  type: Type;
  rank: number;
  num: {
    [key in Card]: number;
  };
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

const setHandNums = (hand: Readonly<HandBase>): Hand => {
  const num: { [key in Card]: number } = {
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
  };

  for (const card of hand.cards) {
    num[card] += 1;
  }

  return {
    ...hand,
    type: "High Card",
    rank: -1,
    num,
  };
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

const extendHands = (hands: Readonly<HandBase[]>): Hand[] => {
  // set nums
  const _handsNums = hands.map(setHandNums);
  // set types
  const _hands = _handsNums.map(setHandType);

  return _hands;
};

const parseHands = (input: string): Hand[] => {
  const handBases = parseHandBases(input);
  const hands = extendHands(handBases);

  return hands;
};

export { CARDS, type Hand, parseHands };
