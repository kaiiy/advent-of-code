import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { solve } from "./mod.ts";

const [sample1] = await solve("./sample1.txt");
const [sample2] = await solve("./sample2.txt");

Deno.test("sample1 - part1", () => {
  assertEquals(sample1, 2);
});

Deno.test("sample2 - part1", () => {
  assertEquals(sample2, 6);
});
