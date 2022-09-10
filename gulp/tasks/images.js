import { src, dest } from "gulp";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import gulpif from "gulp-if";
import config from "../config";

const images = () =>
	src(config.src.images)
		.pipe(changed(config.dest.images))
		.pipe(
			gulpif(
				config.isProd,
				imagemin([
					imagemin.mozjpeg({ quality: 80 }),
					pngquant({ quality: [0.8, 0.9] }),
					imagemin.svgo({
						plugins: [
							{ removeViewBox: false },
							{ removeUnusedNS: false },
							{ removeUselessStrokeAndFill: false },
							{ cleanupIDs: false },
							{ removeComments: true },
							{ removeEmptyAttrs: true },
							{ removeEmptyText: true },
							{ collapseGroups: true },
						],
					}),
				])
			)
		)
		.pipe(dest(config.dest.images))
		.pipe(
			debug({
				title: "Images",
			})
		)
		.pipe(browsersync.stream());

export default images;
