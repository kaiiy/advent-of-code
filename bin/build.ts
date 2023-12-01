import { build, BuildOptions } from "esbuild";
import { green } from "console-log-colors";

const options: BuildOptions = {
  entryPoints: ["./src/**/index.ts"],
  minify: true,
  bundle: true,
  outdir: "./dist",
  target: "node20",
  platform: "node",
  format: "esm",
  sourcemap: false,
};

// Log success message
const logSuccess = () => {
  console.log(green("\u{2714} Finished successfully!"));
};

// Build and log result
build(options)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(logSuccess);
