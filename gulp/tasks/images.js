import pkg from "gulp";
const { src, dest, parallel } = pkg;
import path from "path";
// import gulpIf from "gulp-if";
import changed from "gulp-changed";
import squoosh from "gulp-squoosh";
import imagemin, { svgo } from "gulp-imagemin";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import config from "../config.js";

const imgConvert = () =>
	src(config.src.images)
		.pipe(changed(config.dest.images))
		.pipe(
			squoosh(({ filePath }) => ({
				encodeOptions: {
					webp: { level: 2 },
					avif: { level: 2 },
					...(path.extname(filePath) === ".png"
						? { oxipng: { level: 2 } }
						: { mozjpeg: { level: 2 } }),
				},
			}))
		)
		.pipe(
			debug({
				title: "Images",
			})
		)
		.pipe(dest(config.dest.images))
		.pipe(browsersync.stream());

const imgSVG = () =>
	src(config.src.imagesSVG)
		.pipe(changed(config.dest.images))
		.pipe(
			imagemin([
				svgo({
					plugins: [
						{
							name: "removeViewBox",
							active: true,
						},
						{
							name: "cleanupIDs",
							active: false,
						},
					],
				}),
			])
		)
		.pipe(
			debug({
				title: "Images",
			})
		)
		.pipe(dest(config.dest.images))
		.pipe(browsersync.stream());

const images = parallel(imgConvert, imgSVG);

export default images;
