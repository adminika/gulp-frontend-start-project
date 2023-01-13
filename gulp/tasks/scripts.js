import pkg from "gulp";
const { src, dest } = pkg;
import webpack from "webpack";
import webpackStream from "webpack-stream";
import plumber from "gulp-plumber";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import debug from "gulp-debug";

import config from "../config.js";
import webpackConfig from "../../webpack.config.cjs";

webpackConfig.mode = config.isProd ? "production" : "development";
webpackConfig.devtool = config.isProd ? false : "source-map";

const scripts = () =>
	src(config.src.scripts)
		.pipe(plumber())
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(
			gulpif(
				config.isProd,
				rename({
					suffix: ".min",
				})
			)
		)
		.pipe(dest(config.dest.scripts))
		.pipe(
			debug({
				title: "JS files",
			})
		)
		.pipe(browserSync.stream());

export default scripts;
