import path from "node:path";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// NG: top-level await
// await sleep(0)

const main = async () => {
	path.isAbsolute("/") && (await sleep(0));
	console.log("Hello, world!");
};

main();
