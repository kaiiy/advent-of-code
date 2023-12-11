// https://adventofcode.com/2023/day/10

import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";

// type Point = "north" | "east" | "south" | "west";
// type char = "L" | "J" | "7" | "F" | "." | "S" | "|" | "-";

interface CellBase {
  readonly x: number;
  readonly y: number;
}

interface NS extends CellBase {
  readonly char: "|";
  readonly connections: ["north", "south"];
}

interface EW extends CellBase {
  readonly char: "-";
  readonly connections: ["east", "west"];
}

interface NE extends CellBase {
  readonly char: "L";
  readonly connections: ["north", "east"];
}

interface NW extends CellBase {
  readonly char: "J";
  readonly connections: ["north", "west"];
}

interface SW extends CellBase {
  readonly char: "7";
  readonly connections: ["south", "west"];
}

interface SE extends CellBase {
  readonly char: "F";
  readonly connections: ["south", "east"];
}

interface Ground extends CellBase {
  readonly char: ".";
}

interface Start extends CellBase {
  readonly char: "S";
}

type Cell = NS | EW | NE | NW | SW | SE | Ground | Start;

interface Board {
  x: number;
  y: number;
  cells: Cell[][];
}

const createCell = (x: number, y: number, char: string): Cell => {
  if (char === "L") {
    return { x, y, char, connections: ["north", "east"] };
  } else if (char === "J") {
    return { x, y, char, connections: ["north", "west"] };
  } else if (char === "7") {
    return { x, y, char, connections: ["south", "west"] };
  } else if (char === "F") {
    return { x, y, char, connections: ["south", "east"] };
  } else if (char === ".") {
    return { x, y, char };
  } else if (char === "S") {
    return { x, y, char };
  } else if (char === "|") {
    return { x, y, char, connections: ["north", "south"] };
  } else if (char === "-") {
    return { x, y, char, connections: ["east", "west"] };
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

type Command = "north" | "south" | "west" | "east";

const nextCell = (
  board: Board,
  prev: Command,
  cell: Cell,
): Cell | null | "start" => {
  // out of bounds
  if (prev === "north" && cell.y === 0) return null;
  if (prev === "south" && cell.y === board.y - 1) return null;
  if (prev === "west" && cell.x === 0) return null;
  if (prev === "east" && cell.x === board.x - 1) return null;

  // start
  if (cell.char === "S") {
    return "start";
  } // ground
  if (cell.char === ".") {
    return null;
  }
  // pipe
  if (cell.char === "|") {
    if (prev === "north") {
      return board.cells[cell.y - 1][cell.x];
    } else if (prev === "south") {
      return board.cells[cell.y + 1][cell.x];
    } else {
      return null;
    }
  }
  if (cell.char === "-") {
    if (prev === "west") {
      return board.cells[cell.y][cell.x - 1];
    } else if (prev === "east") {
      return board.cells[cell.y][cell.x + 1];
    } else {
      return null;
    }
  }
  if (cell.char === "L") {
    if (prev === "north") {
      return board.cells[cell.y - 1][cell.x];
    } else if (prev === "east") {
      return board.cells[cell.y][cell.x + 1];
    } else {
      return null;
    }
  }
  if (cell.char === "J") {
    if (prev === "north") {
      return board.cells[cell.y - 1][cell.x];
    } else if (prev === "west") {
      return board.cells[cell.y][cell.x - 1];
    } else {
      return null;
    }
  }
  if (cell.char === "7") {
    if (prev === "south") {
      return board.cells[cell.y + 1][cell.x];
    } else if (prev === "west") {
      return board.cells[cell.y][cell.x - 1];
    } else {
      return null;
    }
  }
  if (cell.char === "F") {
    if (prev === "south") {
      return board.cells[cell.y + 1][cell.x];
    } else if (prev === "east") {
      return board.cells[cell.y][cell.x + 1];
    } else {
      return null;
    }
  }

  throw new Error("Invalid input");
};

const solvePart1 = (board: Board): number => {
  const start = board.cells.find((row) => {
    return row.find((cell) => cell.char === "S");
  })?.find((cell) => cell.char === "S");
  assert(start !== undefined, "Start not found");

  let loopLength = 0;
  let agent = start;

  const firstCommands = ["south", "east", "north", "west"] as const;
  for (const first of firstCommands) {
    let command: Command = first;

    while (true) {
      const next = nextCell(board, command, agent);
      if (next === null) break;
      if (next === "start") {
        loopLength++;
        return Math.floor(loopLength / 2);
      }

      agent = next;
      command = next.connections.find((c) => c !== command);
      loopLength++;
    }
  }
  console.log(start);
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

  const answerPart1 = solvePart1(board);
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
