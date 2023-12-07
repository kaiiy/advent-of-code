import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { solve } from "./mod.ts";

const [part1, part2] = await solve("./sample.txt");

Deno.test("part1", () => {
  assertEquals(part1, 288);
});

Deno.test("part2", () => {
  assertEquals(part2, 71503);
});
