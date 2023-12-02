// https://adventofcode.com/2023/day/2

const CUBE_NUM = {
  RED: 12,
  GREEN: 13,
  BLUE: 14,
} as const;

const solvePart1 = (input: string): number => {
  return 0;
};

const main = async () => {
  const input = await Deno.readTextFile(
    new URL("input.txt", import.meta.url).pathname,
  );
  const answerPart1 = solvePart1(input);
  //   const answerPart2 = solvePart2(input);

  console.log(`Part 1: ${answerPart1}`);
  //   console.log(`Part 2: ${answerPart2}`);
};

main();
