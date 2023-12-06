// https://adventofcode.com/2023/day/5

interface NumMap {
  readonly src: number;
  readonly dst: number;
  readonly range: number;
}

interface AlmanacMap {
  readonly src: string;
  readonly dst: string;
  readonly numMaps: NumMap[];
}

interface Almanac {
  readonly seeds: number[];
  readonly maps: AlmanacMap[];
}

const parseAlmanac: (input: string) => Almanac = (input) => {
  const lines = input.split("\n").map((line) => line.trim()).filter((line) =>
    line.length > 0
  );
  const almanac: Almanac = {
    seeds: lines[0].split(":")[1].trim().split(/\s+/).map(Number),
    maps: [],
  };

  // Parse maps
  let currentMap: AlmanacMap | null = null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].endsWith("map:")) {
      if (currentMap) {
        almanac.maps.push(currentMap);
      }
      const mapNames = lines[i].split("-to-");
      currentMap = {
        src: mapNames[0],
        dst: mapNames[1].split(/\s+/)[0],
        numMaps: [],
      };
    } else {
      const [dst, src, range] = lines[i].split(/\s+/).map(Number);
      currentMap?.numMaps.push({ src, dst, range });
    }
  }
  if (currentMap) {
    almanac.maps.push(currentMap);
  }

  return almanac;
};

const mapNum = (num: number, numMaps: Readonly<NumMap[]>): number => {
  let _num = num;
  for (const numMap of numMaps) {
    if (numMap.src <= _num && _num < numMap.src + numMap.range) {
      _num = numMap.dst + (_num - numMap.src);
      break;
    }
  }
  return _num;
};

const solvePart1 = (almanac: Readonly<Almanac>): number => {
  const START_KEY = "seed";
  const END_KEY = "location";

  let currSrc = START_KEY;
  let currDst = "";

  const nums = almanac.seeds;
  const maps = almanac.maps;

  while (currDst !== END_KEY) {
    const map = maps.find((map) => map.src === currSrc);
    if (!map) {
      throw new Error(`No map found for ${currSrc}`);
    }
    const numMaps = map.numMaps;
    nums.forEach((num, index) => {
      nums[index] = mapNum(num, numMaps);
    });
    currDst = map.dst;
    currSrc = currDst;
  }

  return Math.min(...nums);
};

const solvePart2 = (): number => {
  return 0;
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const almanac = parseAlmanac(input);

  const answerPart1 = solvePart1(almanac);
  const answerPart2 = solvePart2();

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
