import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders(): webpack.RuleSetRule[] {

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader"
    ]
  };

  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/
  };

  const pugLoader = {
    test: /\.pug$/,
    loader: "@webdiscus/pug-loader"
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: "file-loader"
      }
    ]
  };

  return [
    cssLoaders,
    typeScriptLoader,
    pugLoader,
    fileLoader
  ];
}
