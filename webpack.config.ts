import path from "path";
import webpack from "webpack";
import { buildWebPackConfig } from "./config/build/buildWebPackConfig";
import { BuildEnv, BuildPatch } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const paths: BuildPatch = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html")
  };

  const mode = env.mode || "development";
  const PORT = env.port || 3001;
  const isDev = mode === "development";

  const config: webpack.Configuration = buildWebPackConfig({
    mode,
    paths,
    isDev,
    port: PORT
  });
  return config;
};

