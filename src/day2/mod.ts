// https://adventofcode.com/2023/day/2

const CUBE_NUM = {
  RED: 12,
  GREEN: 13,
  BLUE: 14,
} as const;

interface GameSet {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  sets: GameSet[];
}

const parseGames = (input: string): Game[] => {
  return input.split("\n").map((line) => {
    const match = /^Game\s+(\d+):\s*(.*)/.exec(line);
    if (!match) {
      throw new Error("Invalid input format");
    }

    const id = parseInt(match[1]);
    const sets = match[2].split(";").map((setString) => {
      const gameSet: GameSet = { red: 0, green: 0, blue: 0 };
      const colorMap: { [key: string]: keyof GameSet } = {
        red: "red",
        green: "green",
        blue: "blue",
      };

      for (const part of setString.trim().split(",")) {
        const colorMatch = /(\d+)\s*(red|green|blue)/.exec(part.trim());
        if (!colorMatch) {
          throw new Error("Invalid set format");
        }

        const count = parseInt(colorMatch[1]);
        const color = colorMatch[2];
        if (color in colorMap) {
          gameSet[colorMap[color]] += count;
        } else {
          throw new Error("Unknown color");
        }
      }

      return gameSet;
    });

    return { id, sets };
  });
};

const solvePart1 = (games: Game[]): number =>
  games.filter((game) => {
    for (const set of game.sets) {
      if (
        set.red > CUBE_NUM.RED || set.green > CUBE_NUM.GREEN ||
        set.blue > CUBE_NUM.BLUE
      ) {
        return false;
      }
    }
    return true;
  }).reduce((acc, game) => acc + game.id, 0);

const solvePart2 = (games: Game[]): number => {
  return games.map((game) => {
    const maxValues = game.sets.reduce((max, set) => {
      return {
        red: Math.max(max.red, set.red),
        green: Math.max(max.green, set.green),
        blue: Math.max(max.blue, set.blue),
      };
    }, { red: 0, green: 0, blue: 0 });

    return maxValues.red * maxValues.green * maxValues.blue;
  }).reduce((acc, game) => acc + game, 0);
};

const main = async () => {
  const input = await Deno.readTextFile(
    new URL("input.txt", import.meta.url).pathname,
  );
  const games = parseGames(input);
  const answerPart1 = solvePart1(games);
  const answerPart2 = solvePart2(games);

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

main();
