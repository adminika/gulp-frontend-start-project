// Получаем имя папки проекта
import * as nodePath from "path";

const rootPath = nodePath.basename(nodePath.resolve());

const srcPath = "src";
const destPath = "build";

const config = {
	rootPath,
	dest: {
		root: `./${destPath}/`,
		views: `./${destPath}/`,
		styles: `./${destPath}/styles/`,
		scripts: `./${destPath}/js/`,
		images: `./${destPath}/img/`,
		imgConvert: `./${destPath}/img/`,
		sprites: `./${destPath}/img/sprites/`,
		fonts: `./${destPath}/fonts/`,
		favicons: `./${destPath}/img/favicons/`,
		gzip: `./${destPath}/`,
	},
	src: {
		root: `./${srcPath}/**/*.*`,
		views: [
			`./${srcPath}/views/index.{html,njk,nunjucks}`,
			`./${srcPath}/views/pages/*.{html,njk,nunjucks}`,
		],
		styles: `./${srcPath}/styles/main.{scss,sass}`,
		scripts: `./${srcPath}/scripts/index.js`,
		images: [
			`./${srcPath}/assets/images/**/*.{jpg,jpeg,png,webp,avif}`,
			`!./${srcPath}/assets/images/svg/**/*.svg`,
			`!./${srcPath}/assets/images/favicon/*.{jpg,jpeg,gif,png}`,
		],
		imagesSVG: [`./${srcPath}/assets/images/*.svg`],
		spritesMono: `./${srcPath}/assets/images/svg/mono/*.svg`,
		spritesMulti: `./${srcPath}/assets/images/svg/multi/*.svg`,
		fonts: `./${srcPath}/assets/fonts/**/*.{woff,woff2}`,
		favicons: `./${srcPath}/assets/images/favicon/favicon.{svg,png}`,
		gzip: `./${srcPath}/.htaccess`,
	},
	watch: {
		root: `./${srcPath}/**/*.*`,
		views: [
			`./${srcPath}/views/**/*.{html,njk,nunjucks}`,
			`./${srcPath}/blocks/**/*.{html,njk,nunjucks}`,
		],
		styles: [`./${srcPath}/styles/**/*.scss`, `./${srcPath}/blocks/**/*.scss`],
		scripts: [`./${srcPath}/scripts/**/*.js`, `./${srcPath}/blocks/**/*.js`],
		images: `./${srcPath}/assets/images/**/*.{jpg,jpeg,png,webp,avif,svg}`,
		sprites: `./${srcPath}/assets/images/svg/**/*.svg`,
		fonts: `./${srcPath}/assets/fonts/**/*.{woff,woff2}`,
		data: `./${srcPath}/data/*.json`,
	},
	setEnv() {
		this.isProd = process.argv.includes("--production");
		this.isDev = !this.isProd;
	},
};

export default config;
