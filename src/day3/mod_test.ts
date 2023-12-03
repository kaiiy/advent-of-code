import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { parseBoard, solvePart1, solvePart2 } from "./mod.ts";

const input = await Deno.readTextFile(
  new URL(import.meta.resolve("./sample.txt")),
);

const board = parseBoard(input);

Deno.test("part1", () => {
  const actual = solvePart1(board);
  const expected = 4361;
  assertEquals(actual, expected);
});

Deno.test("part2", () => {
  const actual = solvePart2(board);
  const expected = 467835;
  assertEquals(actual, expected);
});
