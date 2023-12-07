import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";
import {
  CARD_RANK,
  CARD_RANK_JOKER,
  CARDS,
  type Hand,
  TYPE_RANK,
} from "./const.ts";

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

const compareHands = (
  hand1: Readonly<Hand>,
  hand2: Readonly<Hand>,
  joker = false,
): number => {
  if (hand1.type !== hand2.type) {
    return TYPE_RANK[hand1.type] - TYPE_RANK[hand2.type];
  }

  const compareSecond = joker ? compareSecondHandsJoker : compareSecondHands;

  return compareSecond(hand1, hand2);
};

const compareSecondHandsJoker = (
  hand1: Readonly<Hand>,
  hand2: Readonly<Hand>,
): number => {
  assert(hand1.type === hand2.type);

  for (let i = 0; i < CARDS.length; i++) {
    if (hand1.cards[i] !== hand2.cards[i]) {
      return CARD_RANK_JOKER[hand1.cards[i]] - CARD_RANK_JOKER[hand2.cards[i]];
    }
  }

  return 0;
};

export { compareHands };
