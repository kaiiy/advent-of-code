import { CARDS, type Hand } from "./const.ts";

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

export {
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isHighCard,
  isOnePair,
  isThreeOfAKind,
  isTwoPair,
};
