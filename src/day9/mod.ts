// https://adventofcode.com/2023/day/9

type Sequence = number[];

const parseInput = (input: string): Sequence[] => {
  const lines = input.split("\n");
  const sequences = lines.map((x) => {
    const sequence = x.trim().split(/\s+/).map((x) => parseInt(x));
    return sequence;
  });

  return sequences;
};

const diffSequence = (sequence: Sequence): number[] => {
  const diffs = [];
  for (let i = 1; i < sequence.length; i++) {
    diffs.push(sequence[i] - sequence[i - 1]);
  }
  return diffs;
};

const isAllZero = (sequence: number[]): boolean => {
  return sequence.every((x) => x === 0);
};

const nextNumber = (sequence: number[]): number => {
  const lastNumbers: number[] = [];
  let diffs = sequence;
  while (!isAllZero(diffs)) {
    lastNumbers.push(diffs[diffs.length - 1]);
    diffs = diffSequence(diffs);
  }
  return lastNumbers.reduce((a, b) => a + b, 0);
};

const previousNumber = (sequence: number[]): number => {
  const firstNumbers: number[] = [];
  let diffs = sequence;
  while (!isAllZero(diffs)) {
    firstNumbers.push(diffs[0]);
    diffs = diffSequence(diffs);
  }
  let result = 0;
  for (let i = 0; i < firstNumbers.length; i++) {
    if (i % 2 === 0) {
      result += firstNumbers[i];
    } else {
      result -= firstNumbers[i];
    }
  }
  return result;
};

const solvePart1 = (sequences: Sequence[]): number => {
  const result = sequences.map((x) => nextNumber(x)).reduce((a, b) => a + b, 0);
  return result;
};

const solvePart2 = (sequences: Sequence[]): number => {
  const result = sequences.map((x) => previousNumber(x)).reduce(
    (a, b) => a + b,
    0,
  );
  return result;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const parsed = parseInput(input);

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

// 10 - (3 - (0 - 2)) = 10 -3 + 0 - 2 = 5
