const solvePart1 = (input: string): number => {
  const answer = input
    .split("\n")
    .map((str: string) => {
      let firstNum = -1;
      let lastNum = -1;

      for (const c of str) {
        if (/^[0-9]+$/.test(c) && firstNum === -1) {
          firstNum = Number.parseInt(c);
          break;
        }
      }

      for (let i = str.length - 1; i >= 0; i--) {
        if (/^[0-9]+$/.test(str[i]) && lastNum === -1) {
          lastNum = Number.parseInt(str[i]);
          break;
        }
      }

      return firstNum * 10 + lastNum;
    })
    .reduce((acc: number, curr: number) => acc + curr, 0);

  return answer;
};

const NUMS = [
  {
    name: 1,
    length: 3,
    reg: /one/g,
  },
  {
    name: 2,
    length: 3,
    reg: /two/g,
  },
  {
    name: 3,
    length: 5,
    reg: /three/g,
  },
  {
    name: 4,
    length: 4,
    reg: /four/g,
  },
  {
    name: 5,
    length: 4,
    reg: /five/g,
  },
  {
    name: 6,
    length: 3,
    reg: /six/g,
  },
  {
    name: 7,
    length: 5,
    reg: /seven/g,
  },
  {
    name: 8,
    length: 5,
    reg: /eight/g,
  },
  {
    name: 9,
    length: 4,
    reg: /nine/g,
  },
] as const;

const solvePart2 = (input: string): number => {
  const answer = input
    .split("\n")
    .map((str: string) => {
      const indexArr = [];
      for (const num of NUMS) {
        const reg = num.reg;
        const matched = str.matchAll(reg);
        for (const match of matched) {
          if (match.index !== undefined) {
            indexArr.push({
              index: match.index,
              lastIndex: match.index + num.length,
              length: num.length,
              name: num.name,
            });
          }
        }
      }

      const matched = str.matchAll(/[0-9]/g);
      for (const match of matched) {
        if (match.index !== undefined) {
          indexArr.push({
            index: match.index,
            lastIndex: match.index + match[0].length,
            length: 1,
            name: Number.parseInt(match[0]),
          });
        }
      }

      return indexArr;
    })
    .map((indexes) => {
      const firstNum = indexes.sort((a, b) => a.index - b.index)[0];
      const lastNum = indexes.sort((a, b) => b.lastIndex - a.lastIndex)[0];

      return firstNum.name * 10 + lastNum.name;
    })
    .reduce((acc: number, curr: number) => acc + curr, 0);

  return answer;
};

const main = async () => {
  const input = await Deno.readTextFile(
    `${new URL(".", import.meta.url).pathname}/input.txt`,
  );
  const answerPart1 = solvePart1(input);
  const answerPart2 = solvePart2(input);

  console.log(`Part 1: ${answerPart1}`);
  console.log(`Part 2: ${answerPart2}`);
};

main();
