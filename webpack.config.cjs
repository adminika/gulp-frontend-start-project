const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/scripts/index.js",
	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
		path: path.resolve(__dirname, "dist/js"),
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin([
				{
					terserOptions: {
						format: {
							comments: false,
						},
					},
					extractComments: false,
				},
			]),
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};
