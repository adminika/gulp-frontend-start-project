import pkg from "gulp";
const { src, dest } = pkg;
import gfavicons from "gulp-favicons";
import filter from "gulp-filter";
import debug from "gulp-debug";
import config from "../config.js";

const favicons = () => {
	return src(config.src.favicons)
		.pipe(
			debug({
				title: "Favicons",
			})
		)
		.pipe(dest(config.dest.favicons))
		.pipe(
			gfavicons({
				icons: {
					favicons: true,
					appleIcon: true,
					android: true,
					windows: false,
					yandex: false,
					coast: false,
					firefox: false,
					appleStartup: false,
				},
				path: "img/favicons/",
			})
		)

		.pipe(dest(config.dest.favicons))
		.pipe(filter(["favicon.ico", "apple-touch-icon.png", "manifest.json"]))
		.pipe(dest(config.dest.root));
};

export default favicons;
