import webpack from "webpack";
import buildDevServer from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const { mode, paths } = options;
	const isDev = mode === "development";

	return {
		mode: mode ?? "development",
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: "[name].[contenthash].js" /* Путь сохранение файла 
		filename: "[name].[contenthash].js": Это шаблон для именования выходных файлов. [name] будет заменено на имя входной точки (например, “main” для main.js), а [contenthash] будет заменено на хеш от содержимого файла. Использование [contenthash] полезно для кеширования: если файл не изменяется, хеш остается тем же, и браузеры могут использовать сохраненную в кеше версию. Если файл изменяется, хеш тоже изменится, и браузер загрузит новую версию.
		*/,
			clean: true, // Очищает файлы, перед тем как сохранить
		},

		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev && "inline-source-map",
		devServer: isDev ? buildDevServer(options) : undefined,
	};
}
