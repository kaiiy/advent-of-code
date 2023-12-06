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

interface Section {
  readonly start: number;
  readonly length: number;
}

interface SectionWithNext extends Section {
  readonly next: boolean;
}

interface AlmanacSection {
  readonly seeds: Section[];
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

const divideSection = (
  section: Section,
  numMap: Readonly<NumMap>,
): SectionWithNext[] => {
  const sectionStart = section.start;
  const sectionEnd = section.start + section.length - 1;
  const numMapStart = numMap.src;
  const numMapEnd = numMap.src + numMap.range - 1;
  if (numMapStart <= sectionStart && sectionEnd <= numMapEnd) {
    return [{
      start: mapNum(sectionStart, [numMap]),
      length: section.length,
      next: false,
    }];
  } else if (sectionEnd < numMapStart || numMapEnd < sectionStart) {
    return [{
      ...section,
      next: true,
    }];
  } else if (sectionStart < numMapStart && numMapEnd < sectionEnd) {
    return [
      {
        start: sectionStart,
        length: numMapStart - sectionStart + 1,
        next: true,
      },
      {
        start: mapNum(numMapStart, [numMap]),
        length: numMap.range - 1,
        next: false,
      },
      {
        start: numMapEnd + 1,
        length: sectionEnd - numMapEnd,
        next: true,
      },
    ];
  } else {
    if (sectionStart < numMapStart) {
      return [
        {
          start: sectionStart,
          length: numMapStart - sectionStart + 1,
          next: true,
        },
        {
          start: mapNum(numMapStart, [numMap]),
          length: sectionEnd - numMapStart,
          next: false,
        },
      ];
    } else {
      return [
        {
          start: mapNum(sectionStart, [numMap]),
          length: numMapEnd - sectionStart + 1,
          next: false,
        },
        {
          start: numMapEnd + 1,
          length: sectionEnd - numMapEnd,
          next: true,
        },
      ];
    }
  }
};

const mapSection = (
  section: Section,
  numMaps: Readonly<NumMap[]>,
): Section[] => {
  let sections: SectionWithNext[] = [];
  let nextSections: SectionWithNext[] = [{ ...section, next: true }];
  const finished: SectionWithNext[] = [];
  for (const numMap of numMaps) {
    sections = nextSections;
    nextSections = [];
    for (const section of sections) {
      const dividedSections = divideSection(section, numMap);
      finished.push(...dividedSections.filter((section) => !section.next));
      nextSections.push(...dividedSections.filter((section) => section.next));
    }
  }
  finished.push(...nextSections);
  return finished.filter((section) => section.length > 0).map((section) => ({
    start: section.start,
    length: section.length,
  }));
};

const convertAlmanacSection = (almanac: Almanac): AlmanacSection => {
  const length = Math.floor(almanac.seeds.length / 2);
  const seeds: Section[] = [];
  for (let i = 0; i < length; i++) {
    seeds.push({
      start: almanac.seeds[i * 2],
      length: almanac.seeds[i * 2 + 1],
    });
  }
  const maps = almanac.maps;
  return { seeds, maps };
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

const solvePart2 = (almanacSection: AlmanacSection): number => {
  const START_KEY = "seed";
  const END_KEY = "location";

  let currSrc = START_KEY;
  let currDst = "";

  let sections = almanacSection.seeds;
  let nextSections: Section[] = [];
  const maps = almanacSection.maps;

  while (currDst !== END_KEY) {
    const map = maps.find((map) => map.src === currSrc);
    if (!map) {
      throw new Error(`No map found for ${currSrc}`);
    }
    const numMaps = map.numMaps;
    sections.forEach((section) => {
      nextSections.push(...mapSection(section, numMaps));
    });

    sections = nextSections;
    nextSections = [];
    currDst = map.dst;
    currSrc = currDst;
  }

  return Math.min(...sections.map((section) => section.start));
};

const solve = async (file: string): Promise<[number, number]> => {
  const input = await Deno.readTextFile(
    new URL(import.meta.resolve(file)),
  );

  const almanac = parseAlmanac(input);
  const almanacSection = convertAlmanacSection(almanac);

  const answerPart1 = solvePart1(almanac);
  const answerPart2 = solvePart2(almanacSection);

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
