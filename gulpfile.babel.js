import pkg from "gulp";
const { parallel, series } = pkg;
import clean from "./gulp/tasks/clean.js";
import views from "./gulp/tasks/views.js";
import styles from "./gulp/tasks/styles.js";
import scripts from "./gulp/tasks/scripts.js";
import images from "./gulp/tasks/images.js";
import sprites from "./gulp/tasks/sprites.js";
import fonts from "./gulp/tasks/fonts.js";
import favicons from "./gulp/tasks/favicons.js";
import server from "./gulp/tasks/server.js";
import config from "./gulp/config.js";

config.setEnv();

export const development = series(
	clean,
	parallel(views, styles, images, scripts, sprites, fonts, favicons),
	parallel(server)
);

export const prod = series(
	clean,
	parallel(views, styles, images, scripts, sprites, fonts, favicons)
);

export default development;
