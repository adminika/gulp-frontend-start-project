/* eslint-disable indent */
import { src, dest } from "gulp";
import fs from "fs";
import nunjucksRender from "gulp-nunjucks-render";
import data from "gulp-data";
import plumber from "gulp-plumber";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browserSync from "browser-sync";
import config from "../config";

const views = () =>
	src(config.src.views)
		.pipe(plumber())
		.pipe(
			data(function () {
				return JSON.parse(fs.readFileSync("./src/data/" + "globals" + ".json"));
			})
		)
		.pipe(
			nunjucksRender({
				path: ["src/views/", "src/blocks/", "build/img/"],
			})
		)
		.pipe(gulpif(config.isProd, replace(".css", ".min.css")))
		.pipe(gulpif(config.isProd, replace(".js", ".min.js")))
		.pipe(dest(config.dest.views))
		.pipe(browserSync.stream());

export default views;
