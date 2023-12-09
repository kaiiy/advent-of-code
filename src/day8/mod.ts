// https://adventofcode.com/2023/day/7

type LR = "left" | "right";

interface Map {
  node: string;
  left: string;
  right: string;
}

interface Input {
  instructions: LR[];
  maps: Map[];
}

const parseInput = (input: string): Input => {
  const split = input.split("\n");
  const instructions: LR[] = split[0].trim().split("").map((x) => {
    if (x === "L") return "left";
    if (x === "R") return "right";
    throw new Error("Invalid input");
  });
  const maps = split.slice(2).map((x) => {
    const matched = x.trim().match(
      /([A-Z]{3})\s+=\s+\(([A-Z]{3}),\s+([A-Z]{3})\)/,
    );
    if (!matched) throw new Error("Invalid input");
    const [, node, left, right] = matched;
    return { node, left, right };
  });

  const parsed: Input = {
    instructions,
    maps,
  };

  return parsed;
};

const solvePart1 = (parsed: Input): number => {
  return 0;
};

const solvePart2 = (): number => {
  return 0;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const parsed = parseInput(input);

  const answerPart1 = solvePart1(parsed);
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
