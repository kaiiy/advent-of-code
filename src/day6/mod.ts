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

const convertRace = (races: Race[]) => {
  const [time, distance] = races.reduce((a, b) => {
    return [a[0] + b.time, a[1] + b.distance];
  }, ["", ""]).map((v) => Number(v));
  return { time, distance };
};

const calcWays = (race: Race) => {
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
};

const solvePart1 = (races: Race[]): number => {
  return races.map((race) => {
    return calcWays(race);
  }).reduce((a, b) => a * b, 1);
};

const solvePart2 = (race: Race): number => {
  return calcWays(race);
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const races = parseRaces(input);
  const race = convertRace(races);

  const answerPart1 = solvePart1(races);
  const answerPart2 = solvePart2(race);

  return [answerPart1, answerPart2];
};

const main = async () => {
  const [answerPart1, answerPart2] = await solve("./input.txt");

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

if (import.meta.main) {
  await main();
}

export { solve };
