// https://adventofcode.com/2023/day/8

const LEFT = "left";
const RIGHT = "right";

type LR = typeof LEFT | typeof RIGHT;

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
  const lines = input.split("\n");
  const instructions: LR[] = lines[0].trim().split("").map((x) => {
    if (x === "L") return LEFT;
    if (x === "R") return RIGHT;
    throw new Error("Invalid input");
  });
  const maps = lines.slice(2).map((x) => {
    const matched = x.trim().match(
      /(\w{3})\s+=\s+\((\w{3}),\s+(\w{3})\)/,
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
  const start = "AAA";
  const end = "ZZZ";

  const { instructions, maps } = parsed;

  let step = 0;
  let current = start;
  while (current !== end) {
    const map = maps.find((x) => x.node === current);
    if (!map) throw new Error("Invalid input");

    const instruction = instructions[step % instructions.length];
    if (instruction === LEFT) {
      current = map.left;
    } else if (instruction === RIGHT) {
      current = map.right;
    } else {
      throw new Error("Invalid input");
    }

    step++;
  }

  return step;
};

const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return Math.floor(a / gcd(a, b)) * b;
};

const solvePart2 = (parsed: Input): number => {
  const { instructions, maps } = parsed;
  const startNodes = maps.filter((x) => x.node.endsWith("A"));

  const steps: number[] = [];
  for (const startNode of startNodes) {
    const start = startNode.node;

    let step = 0;
    let current = start;
    while (!current.endsWith("Z")) {
      const map = maps.find((x) => x.node === current);
      if (!map) throw new Error("Invalid input");

      const instruction = instructions[step % instructions.length];
      if (instruction === LEFT) {
        current = map.left;
      } else if (instruction === RIGHT) {
        current = map.right;
      } else {
        throw new Error("Invalid input");
      }

      step++;
    }

    steps.push(step);
  }

  let lcmStep = 1;
  for (const step of steps) {
    lcmStep = lcm(lcmStep, step);
  }

  return lcmStep;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const parsed = parseInput(input);
  // console.log(parsed);

  const answerPart1 = solvePart1(parsed);
  const answerPart2 = solvePart2(parsed);

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
