import { parallel, watch } from "gulp";
import browserSync from "browser-sync";
import views from "./views";
import styles from "./styles";
import scripts from "./scripts";
import images from "./images";
import webp from "./webp";
import sprites from "./sprites";
import fonts from "./fonts";
import config from "../config";

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
	watch(config.watch.webp, webp);
	watch(config.watch.fonts, parallel(fonts));
	callback();
};

export default server;
