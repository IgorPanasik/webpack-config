import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import {
	BuildMode,
	BuildPaths,
	BuildPlatform,
} from "./config/build/types/types";

// env - Переменная окружения предназначены для передачи пользовательских параметров в конфигурационный файл Webpack

interface EnvVariables {
	mode?: BuildMode;
	port?: number;
	analyzer?: boolean;
	platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		// Указываем пути к build/index.tsx/index.html
		output: path.resolve(__dirname, "build"), // path: path.resolve(__dirname, "build"): Это указывает Webpack, куда поместить собранный bundle. __dirname - это глобальная переменная в Node.js, которая указывает на текущую директорию. path.resolve преобразует путь в абсолютный
		entry: path.resolve(__dirname, "src", "index.tsx"), // Склеиваем участки пути через path.resolve, __dirname - текущая директория = Входной путь к entry файлу(Точка входа в приложение)
		html: path.resolve(__dirname, "public", "index.html"),
		public: path.resolve(__dirname, "public"), // Путь к FAVICON
		src: path.resolve(__dirname, "src"), // Alias
	};

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths,
		analyzer: env.analyzer, // npm run build:prod -- --env analyzer=true
		platform: env.platform ?? "desktop",
	});

	return config;
};
