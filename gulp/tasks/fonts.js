import pkg from "gulp";
const { src, dest } = pkg;
import debug from "gulp-debug";
import config from "../config.js";

const fonts = () =>
	src(config.src.fonts)
		.pipe(dest(config.dest.fonts))
		.pipe(
			debug({
				title: "Fonts",
			})
		);

export default fonts;
