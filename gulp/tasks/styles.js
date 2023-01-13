import pkg from "gulp";
const { src, dest } = pkg;
import dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import groupmedia from "postcss-sort-media-queries";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import config from "../config.js";

const sass = gulpSass(dartSass);

const styles = () => {
	const processors = [
		autoprefixer({
			cascade: false,
			grid: true,
		}),
		groupmedia({}),
	];
	return src(config.src.styles)
		.pipe(gulpif(!config.isProd, sourcemaps.init()))
		.pipe(
			sass({
				includePaths: ["node_modules"],
				outputStyle: "expanded",
			}).on("error", sass.logError)
		)
		.pipe(postcss(processors))
		.pipe(
			gulpif(
				config.isProd,
				postcss([
					cssnano({
						preset: ["default", { discardComments: { removeAll: true } }],
					}),
				])
			)
		)
		.pipe(
			gulpif(
				config.isProd,
				rename({
					suffix: ".min",
				})
			)
		)
		.pipe(gulpif(!config.isProd, sourcemaps.write("./maps/")))
		.pipe(dest(config.dest.styles))
		.pipe(browserSync.stream());
};
export default styles;
