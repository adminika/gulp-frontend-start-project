import pkg from "gulp";
const { parallel, watch } = pkg;
import browserSync from "browser-sync";
import views from "./views.js";
import styles from "./styles.js";
import scripts from "./scripts.js";
import images from "./images.js";
import sprites from "./sprites.js";
import fonts from "./fonts.js";
import config from "../config.js";

const server = (callback) => {
	browserSync.init({
		server: {
			baseDir: config.dest.root,
		},
		port: 4000,
		open: false,
		notify: true,
	});

	watch(config.watch.views, views);
	watch(config.watch.data, views);
	watch(config.watch.styles, styles);
	watch(config.watch.scripts, scripts);
	watch(config.watch.images, images);
	watch(config.watch.sprites, sprites);
	watch(config.watch.fonts, parallel(fonts));
	callback();
};

export default server;
