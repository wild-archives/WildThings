// @ts-check

const path = require("node:path");

/** @type {import('@rspack/cli').Configuration} */
const config = {
	entry: {
		main: "./src/index.ts",
		auth: "./src/lib/auth.ts",
	},
	target: ["node"],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
						},
					},
				},
				type: "javascript/auto",
			},
			{
				test: /\.node$/,
				use: [
					{
						loader: "node-loader",
						options: {
							name: "[path][name].[ext]",
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		modules: ["node_modules"],
		extensionAlias: {
			".js": [".ts", ".js"],
		},
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].cjs",
	},
};

module.exports = config;
