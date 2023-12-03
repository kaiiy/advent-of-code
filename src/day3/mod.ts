// https://adventofcode.com/2023/day/3

interface Vec {
  x: number;
  y: number;
}

interface NumCell {
  type: "number";
  body: number;
  adjacent: boolean;
  gearAdjacent: boolean;
  gear: Vec;
}

interface SymbolCell {
  type: "symbol";
  body: string;
  adjacent: boolean;
  gearAdjacent: boolean;
  gear: Vec;
}

interface NoneCell {
  type: "none";
  adjacent: boolean;
  gearAdjacent: boolean;
  gear: Vec;
}

type Cell = NumCell | SymbolCell | NoneCell;

interface Board {
  x: number;
  y: number;
  cells: Cell[][];
}

const parseBoard = (input: string): Board => {
  const lines = input.split("\n");
  const x = lines[0].length;
  const y = lines.length;

  const cells: Cell[][] = [];
  for (let i = 0; i < y; i++) {
    cells.push([]);
    for (let j = 0; j < x; j++) {
      const cell: Cell = {
        type: "none",
        adjacent: false,
        gearAdjacent: false,
        gear: { x: -1, y: -1 },
      };
      cells[i].push(cell);
    }
  }

  for (let i = 0; i < y; i++) {
    const line = lines[i];
    for (let j = 0; j < x; j++) {
      const c = line[j];
      if (/^\d$/.test(c)) {
        cells[i][j] = {
          type: "number",
          body: parseInt(c),
          adjacent: cells[i][j].adjacent,
          gearAdjacent: cells[i][j].gearAdjacent,
          gear: cells[i][j].gear,
        };
      } else if (/^[^\d.]$/.test(c)) {
        cells[i][j] = {
          type: "symbol",
          body: c,
          adjacent: cells[i][j].adjacent,
          gearAdjacent: cells[i][j].gearAdjacent,
          gear: cells[i][j].gear,
        };
        for (
          const [dx, dy] of [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
          ]
        ) {
          const nx = j + dx;
          const ny = i + dy;
          if (nx >= 0 && nx < x && ny >= 0 && ny < y) {
            cells[ny][nx].adjacent = true;
            if (c === "*") {
              cells[ny][nx].gearAdjacent = true;
              cells[ny][nx].gear = { x: j, y: i };
            }
          }
        }
      }
    }
  }

  const _board = structuredClone({ x, y, cells });

  //   Find part numbers
  for (let i = 0; i < _board.y; i++) {
    for (let j = 0; j < _board.x; j++) {
      const cell = _board.cells[i][j];
      if (cell.type === "number" && (cell.adjacent || cell.gearAdjacent)) {
        if (j + 1 < _board.x) {
          const rightCell = _board.cells[i][j + 1];
          if (rightCell.type === "number") {
            rightCell.adjacent = cell.adjacent;
            rightCell.gearAdjacent = cell.gearAdjacent;
            if (cell.gearAdjacent) {
              rightCell.gear = cell.gear;
            }
          }
        }
      }
    }
  }
  for (let i = _board.y - 1; i >= 0; i--) {
    for (let j = _board.x - 1; j >= 0; j--) {
      const cell = _board.cells[i][j];
      if (cell.type === "number" && (cell.adjacent || cell.gearAdjacent)) {
        if (j - 1 >= 0) {
          const leftCell = _board.cells[i][j - 1];
          if (leftCell.type === "number") {
            leftCell.adjacent = cell.adjacent;
            leftCell.gearAdjacent = cell.gearAdjacent;
            if (cell.gearAdjacent) {
              leftCell.gear = cell.gear;
            }
          }
        }
      }
    }
  }

  return _board;
};

const solvePart1 = (board: Board): number => {
  const _board = structuredClone(board);

  let numBuffer: number[] = [];
  let numSum = 0;
  for (let i = 0; i < _board.y; i++) {
    for (let j = 0; j < _board.x; j++) {
      const cell = _board.cells[i][j];
      if (cell.type === "number" && cell.adjacent) {
        numBuffer.push(cell.body);
      } else {
        if (numBuffer.length > 0) {
          const num = Number.parseInt(numBuffer.join(""));
          numSum += num;
          numBuffer = [];
        }
      }
    }
  }
  return numSum;
};

interface GearNum {
  num: number;
  gear: Vec;
}

const solvePart2 = (board: Board): number => {
  const _board = structuredClone(board);
  const gearNums: GearNum[] = [];
  let numBuffer: number[] = [];

  for (let i = 0; i < _board.y; i++) {
    for (let j = 0; j < _board.x; j++) {
      const cell = _board.cells[i][j];
      if (cell.type === "number" && cell.gearAdjacent) {
        numBuffer.push(cell.body);
      } else {
        if (numBuffer.length > 0) {
          const num = Number.parseInt(numBuffer.join(""));
          numBuffer = [];
          gearNums.push({ num, gear: _board.cells[i][j - 1].gear });
        }
      }
    }
  }

  const length = gearNums.length;
  let sum = 0;
  for (let i = 0; i < length - 1; i++) {
    const pick = gearNums[i];
    const gearList = [pick.num];
    for (let j = i + 1; j < length; j++) {
      if (
        pick.gear.x === gearNums[j].gear.x &&
        pick.gear.y === gearNums[j].gear.y
      ) {
        gearList.push(gearNums[j].num);
      }
    }
    if (gearList.length === 2) {
      sum += gearList[0] * gearList[1];
    }
  }

  return sum;
};

const main = async () => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve("./input.txt")),
  );

  const board = parseBoard(input);
  //   console.log(board);
  const answerPart1 = solvePart1(board);
  const answerPart2 = solvePart2(board);

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

if (import.meta.main) {
  await main();
}

export { parseBoard, solvePart1, solvePart2 };
