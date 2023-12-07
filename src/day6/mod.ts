// https://adventofcode.com/2023/day/5

import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";

interface Race {
  readonly time: number;
  readonly distance: number;
}

const parseRaces = (input: string): Race[] => {
  const split = input.split("\n");
  const times = split[0].replace("Time:", "").trim().split(/\s+/g).map(Number);
  const distances = split[1].replace("Distance:", "").trim().split(/\s+/g).map(
    Number,
  );

  assert(times.length === distances.length);
  const length = times.length;

  const races: Race[] = [];

  for (let i = 0; i < length; i++) {
    races.push({
      time: times[i],
      distance: distances[i],
    });
  }

  return races;
};

const solvePart1 = (races: Race[]): number => {
  return races.map((race) => {
    const c = race.time ** 2 - 4 * race.distance;
    assert(c > 0);

    const min = Math.ceil((race.time - Math.sqrt(c)) / 2);
    const max = Math.floor((race.time + Math.sqrt(c)) / 2);

    let ways = max - min + 1;
    for (const m of [min, max]) {
      if ((race.time - m) * m === race.distance) {
        ways--;
      }
    }
    return ways;
  }).reduce((a, b) => a * b, 1);
};

const solvePart2 = (): number => {
  return 0;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const races = parseRaces(input);

  const answerPart1 = solvePart1(races);
  const answerPart2 = solvePart2();

  return [answerPart1, answerPart2];
};

const main = async () => {
  const [answerPart1, answerPart2] = await solve("./input.txt");

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);

  // memo: (time-x) * x > distance
  // tx - x^2 > d
  // x^2 - tx + d < 0
};

if (import.meta.main) {
  await main();
}

export { solve };
