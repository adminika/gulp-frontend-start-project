import pkg from "gulp";
const { src, dest, parallel } = pkg;
import svgSprite from "gulp-svg-sprite";
// import svgmin from "gulp-svgmin";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import config from "../config.js";

const spriteMono = () => {
	const options = {
		shape: {
			dimension: {
				maxWidth: 500,
				maxHeight: 500,
			},
			spacing: {
				padding: 0,
			},
			transform: [
				{
					svgmin: {
						plugins: [
							{
								removeAttrs: {
									attrs: ["class", "data-name", "fill.*", "stroke.*"],
								},
							},
						],
					},
				},
			],
		},
		mode: {
			symbol: {
				dest: ".",
				sprite: "s-mono.svg",
			},
		},
	};
	return (
		src(config.src.spritesMono, { cwd: "" })
			.pipe(plumber())
			// .pipe(
			// 	svgmin({
			// 		plugins: [
			// 			{
			// 				removeAttrs: {
			// 					attrs: ["class", "data-name", "fill.*", "stroke.*"],
			// 				},
			// 			},
			// 		],
			// 	})
			// )
			.pipe(svgSprite(options))
			.on("error", (error) => {
				console.log(error);
			})
			.pipe(dest(config.dest.sprites))
			.on("end", browsersync.reload)
	);
};

const spriteMulti = () => {
	const options = {
		shape: {
			dimension: {
				maxWidth: 500,
				maxHeight: 500,
			},
			spacing: {
				padding: 0,
			},
			transform: [
				{
					svgmin: {
						plugins: [
							{ removeAttrs: { attrs: ["class", "data-name"] } },
							{ removeUselessStrokeAndFill: false },
							{ inlineStyles: true },
						],
					},
				},
			],
		},
		mode: {
			symbol: {
				dest: ".",
				sprite: "s-multi.svg",
			},
		},
	};
	return src(config.src.spritesMulti, { cwd: "" })
		.pipe(plumber())
		.pipe(svgSprite(options))
		.on("error", (error) => {
			console.log(error);
		})
		.pipe(dest(config.dest.sprites))
		.on("end", browsersync.reload);
};

const sprites = parallel(spriteMono, spriteMulti);

export default sprites;
