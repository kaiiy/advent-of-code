import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { parseCards, solvePart1, solvePart2 } from "./mod.ts";

const input = await Deno.readTextFile(
  new URL(import.meta.resolve("./sample.txt")),
);

const cards = parseCards(input);

Deno.test("part1", () => {
  const actual = solvePart1(cards);
  const expected = 13;
  assertEquals(actual, expected);
});

Deno.test("part1", () => {
  const actual = solvePart2(cards);
  const expected = 30;
  assertEquals(actual, expected);
});
