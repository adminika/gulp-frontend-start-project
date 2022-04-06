// Получаем имя папки проекта
import * as nodePath from 'path';

const rootPath = nodePath.basename(nodePath.resolve());

const srcPath = 'src';
const destPath = 'build';

const config = {
  rootPath,
  dest: {
    root: `./${destPath}/`,
    views: `./${destPath}/`,
    styles: `./${destPath}/styles/`,
    scripts: `./${destPath}/js/`,
    images: `./${destPath}/img/`,
    webp: `./${destPath}/img/`,
    sprites: `./${destPath}/img/sprites/`,
    fonts: `./${destPath}/fonts/`,
    favicons: `./${destPath}/img/favicons/`,
    gzip: `./${destPath}/`
  },
  src: {
    root: `./${srcPath}/**/*.*`,
    views: [
      `./${srcPath}/views/index.html`,
      `./${srcPath}/views/pages/*.html`],
    styles: `./${srcPath}/styles/main.{scss,sass}`,
    scripts: `./${srcPath}/scripts/index.js`,
    images: [
      `./${srcPath}/assets/images/**/*.{jpg,jpeg,png,webp,gif,svg}`,
      `!./${srcPath}/assets/images/favicon/*.{jpg,jpeg,gif,png}`
    ],
    webp: [
      `./${srcPath}/assets/images/**/*.{jpg,jpeg,png}`,
      `!./${srcPath}/assets/images/favicon/*.{jpg,jpeg,png}`
    ],
    spritesMono: `./${srcPath}/assets/images/svg/mono/*.svg`,
    spritesMulti: `./${srcPath}/assets/images/svg/multi/*.svg`,
    fonts: `./${srcPath}/assets/fonts/**/*.{woff,woff2}`,
    favicons: `./${srcPath}/assets/images/favicon/*.{jpg,jpeg,png,gif}`,
    gzip: `./${srcPath}/.htaccess`
  },
  watch: {
    root: `./${srcPath}/**/*.*`,
    views: [
			`./${srcPath}/views/**/*.html`,
			`./${srcPath}/blocks/**/*.html`
		],
    styles: [
      `./${srcPath}/styles/**/*.{scss,sass}`,
			`./${srcPath}/blocks/**/*.{scss,sass}`
    ],
    scripts: [
			`./${srcPath}/scripts/**/*.js`,
			`./${srcPath}/blocks/**/*.js`
		],
    images: `./${srcPath}/assets/images/**/*.{jpg,jpeg,png,webp,gif,svg}`,
    webp: `./${srcPath}/assets/images/**/*.{jpg,jpeg,png}`,
    sprites: `./${srcPath}/assets/images/svg/**/*.svg`,
    fonts: `./${srcPath}/assets/fonts/**/*.{woff,woff2}`
  },
  setEnv() {
    this.isProd = process.argv.includes('--production');
    this.isDev = !this.isProd;
  }
};

export default config;
