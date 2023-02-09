export type BuildMode = "production" | "development"

export interface BuildPatch {
  entry: string,
  build: string,
  html: string
}

export interface BuildEnv {
  mode: BuildMode,
  port: number | string
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPatch,
  isDev: boolean
  port: number | string
}
