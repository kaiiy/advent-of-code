// https://adventofcode.com/2023/day/10

import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";

const generateId = (
  x: number,
  y: number,
  maxX: number,
  maxY: number,
): number => {
  const maxDigits = Math.max(String(maxX).length, String(maxY).length);
  const xStr = String(x).padStart(maxDigits, "0");
  const yStr = String(y).padStart(maxDigits, "0");
  return Number(`${xStr}${yStr}`);
};

interface Normal {
  type: "normal";
  id: number;
  connections: number[];
}

interface Start {
  type: "start";
  id: number;
  connections: number[];
}

type Node = Normal | Start;

interface Network {
  nodes: Node[];
}

const parseNodes = (input: string) => {
  const lines = input.split("\n");
  const [maxX, maxY] = [lines[0].length, lines.length];
  const nodes: Node[] = [];

  // let y = 0;
  // for (const line of lines) {
  //   let x = 0;
  //   for (const char of line) {
  //     if (char === "#") {
  //       const id = generateId(x, y, lines[0].length, lines.length);
  //       nodes.push({
  //         type: "normal",
  //         id,
  //         connections: [],
  //       });
  //     }
  //     x++;
  //   }
  //   y++;
  // }

  return nodes;
};

const solvePart1 = (nodes: Node[]): number => {
  return 0;
};

const solvePart2 = (): number => {
  return 0;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const nodes = parseNodes(input);
  console.log(nodes);

  const answerPart1 = solvePart1(nodes);
  const answerPart2 = solvePart2();

  return [answerPart1, answerPart2];
};

const main = async () => {
  const [answerPart1, answerPart2] = await solve("./sample1.txt");

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

if (import.meta.main) {
  await main();
}

export { solve };
