// https://adventofcode.com/2023/day/10

// type Point = "north" | "east" | "south" | "west";
type char = "L" | "J" | "7" | "F" | "." | "S" | "|" | "-";

interface CellBase {
  x: number;
  y: number;
}

interface NS extends CellBase {
  char: "|";
  from: "north";
  to: "south";
}

interface EW extends CellBase {
  char: "-";
  from: "east";
  to: "west";
}

interface NE extends CellBase {
  char: "L";
  from: "north";
  to: "east";
}

interface NW extends CellBase {
  char: "J";
  from: "north";
  to: "west";
}

interface SW extends CellBase {
  char: "7";
  from: "south";
  to: "west";
}

interface SE extends CellBase {
  char: "F";
  from: "south";
  to: "east";
}

interface Ground extends CellBase {
  char: ".";
}

interface Start extends CellBase {
  char: "S";
}

type Cell = NS | EW | NE | NW | SW | SE | Ground | Start;

interface Board {
  x: number;
  y: number;
  cells: Cell[][];
}

const createCell = (x: number, y: number, char: string): Cell => {
  if (char === "L") {
    return { x, y, char, from: "north", to: "east" };
  } else if (char === "J") {
    return { x, y, char, from: "north", to: "west" };
  } else if (char === "7") {
    return { x, y, char, from: "south", to: "west" };
  } else if (char === "F") {
    return { x, y, char, from: "south", to: "east" };
  } else if (char === ".") {
    return { x, y, char };
  } else if (char === "S") {
    return { x, y, char };
  } else if (char === "|") {
    return { x, y, char, from: "north", to: "south" };
  } else if (char === "-") {
    return { x, y, char, from: "east", to: "west" };
  } else {
    throw new Error("Invalid input");
  }
};

const parseBoard = (input: string): Board => {
  const lines = input.split("\n");
  const y = lines.length;
  const x = lines[0].length;
  const cells: Cell[][] = [];
  for (let i = 0; i < y; i++) {
    cells[i] = [];
    for (let j = 0; j < x; j++) {
      const char = lines[i][j];
      cells[i][j] = createCell(j, i, char);
    }
  }

  const board: Board = {
    x,
    y,
    cells,
  };

  return board;
};

const solvePart1 = (): number => {
  return 0;
};

const solvePart2 = (): number => {
  return 0;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const board = parseBoard(input);
  console.log(board);

  const answerPart1 = solvePart1();
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
