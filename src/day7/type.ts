import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";
import { CARD_RANK, CARDS, type Hand, TYPE_RANK } from "./hand.ts";

const isFiveOfAKind = (hand: Readonly<Hand>): boolean => {
  for (const card of CARDS) {
    if (hand.num[card] === 5) {
      return true;
    }
  }
  return false;
};

const isFourOfAKind = (hand: Readonly<Hand>): boolean => {
  for (const card of CARDS) {
    if (hand.num[card] === 4) {
      return true;
    }
  }
  return false;
};

const isFullHouse = (hand: Readonly<Hand>): boolean => {
  let hasThree = false;
  let hasTwo = false;
  for (const card of CARDS) {
    if (hand.num[card] === 3) {
      hasThree = true;
    }
    if (hand.num[card] === 2) {
      hasTwo = true;
    }
  }
  return hasThree && hasTwo;
};

const isThreeOfAKind = (hand: Readonly<Hand>): boolean => {
  if (isFullHouse(hand)) {
    return false;
  }

  for (const card of CARDS) {
    if (hand.num[card] === 3) {
      return true;
    }
  }
  return false;
};

const isTwoPair = (hand: Readonly<Hand>): boolean => {
  let numPairs = 0;
  for (const card of CARDS) {
    if (hand.num[card] === 2) {
      numPairs += 1;
    }
  }
  return numPairs === 2;
};

const isOnePair = (hand: Readonly<Hand>): boolean => {
  if (isFullHouse(hand) || isTwoPair(hand)) {
    return false;
  }

  for (const card of CARDS) {
    if (hand.num[card] === 2) {
      return true;
    }
  }
  return false;
};

const isHighCard = (hand: Readonly<Hand>): boolean => {
  for (const card of CARDS) {
    if (hand.num[card] > 1) {
      return false;
    }
  }
  return true;
};

const compareSecondHands = (
  hand1: Readonly<Hand>,
  hand2: Readonly<Hand>,
): number => {
  assert(hand1.type === hand2.type);

  for (let i = 0; i < CARDS.length; i++) {
    if (hand1.cards[i] !== hand2.cards[i]) {
      return CARD_RANK[hand1.cards[i]] - CARD_RANK[hand2.cards[i]];
    }
  }

  return 0;
};
const compareHands = (hand1: Readonly<Hand>, hand2: Readonly<Hand>): number => {
  if (hand1.type !== hand2.type) {
    return TYPE_RANK[hand1.type] - TYPE_RANK[hand2.type];
  }

  return compareSecondHands(hand1, hand2);
};

export {
  compareHands,
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isHighCard,
  isOnePair,
  isThreeOfAKind,
  isTwoPair,
};
