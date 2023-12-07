import {
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isHighCard,
  isOnePair,
  isThreeOfAKind,
  isTwoPair,
} from "./type.ts";
import { compareHands } from "./compare.ts";

import { type Card, CARDS, type Hand, type HandBase } from "./const.ts";

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

const setHandType = (hand: Readonly<Hand>, joker = false): Hand => {
  const _hand = { ...hand };
  if (joker && _hand.num["J"] > 0) {
    let maxKey: Card = "A";
    let maxVal = 0;

    for (const [key, val] of Object.entries(_hand.num)) {
      if (key === "J") {
        continue;
      }

      if (maxVal < val) {
        maxKey = key as Card;
        maxVal = val;
      }
    }

    _hand.num[maxKey] += _hand.num["J"];
    _hand.num["J"] = 0;
  }

  if (isFiveOfAKind(_hand)) {
    return {
      ...hand,
      type: "Five of a Kind",
    };
  }

  if (isFourOfAKind(_hand)) {
    return {
      ...hand,
      type: "Four of a Kind",
    };
  }

  if (isFullHouse(_hand)) {
    return {
      ...hand,
      type: "Full House",
    };
  }

  if (isThreeOfAKind(_hand)) {
    return {
      ...hand,
      type: "Three of a Kind",
    };
  }

  if (isTwoPair(_hand)) {
    return {
      ...hand,
      type: "Two Pair",
    };
  }

  if (isOnePair(_hand)) {
    return {
      ...hand,
      type: "One Pair",
    };
  }

  if (isHighCard(_hand)) {
    return {
      ...hand,
      type: "High Card",
    };
  } else {
    throw new Error("Invalid hand");
  }
};

const setHandsRank = (hands: Readonly<Hand[]>, joker = false): Hand[] => {
  const _hands = hands.toSorted((a, b) => compareHands(a, b, joker));

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
  const handsTypes = _hands.map((hand) => setHandType(hand, false));
  // set ranks
  const handsRanks = setHandsRank(handsTypes, false);

  return handsRanks;
};

const extendHandsPart2 = (hands: Readonly<HandBase[]>): Hand[] => {
  const _hands: Hand[] = hands.map((hand) => ({
    ...hand,
    type: "High Card",
    rank: -1,
  }));
  // set types
  const handsTypes = _hands.map((hand) => setHandType(hand, true));
  // set ranks
  const handsRanks = setHandsRank(handsTypes, true);

  return handsRanks;
};

export { extendHandsPart1, extendHandsPart2, parseHandBases };
