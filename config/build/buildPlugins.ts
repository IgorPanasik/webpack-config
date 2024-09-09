import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin"; // Плагин, который позволяет динамически встраивать скрипт из bundle из сборки в путь <script src="./build/main.3d71215f3f9223c6035f"></script>
import MiniCssExtractPlugin from "mini-css-extract-plugin"; // Плагин для отдельного файла css в папке build
import path from "path";
import webpack, { DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/types";

export function buildPlugins({
	mode,
	paths,
	analyzer,
	platform,
}: BuildOptions):  webpack.WebpackPluginInstance[] {
	const isDev = mode === "development";
	const isProd = mode === "production";
	// Режим сборки DEVELOPMENT и PRODUCTION в DEV моде код будет не оптимизирован и нужен только на стадии разработки PROD - оптимизированный, сжатый, лаконичный

	const plugins:  webpack.WebpackPluginInstance[] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(path.resolve(paths.public, "favicon.ico")),
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
		}),
		// Плагин, который выносит проверку типов в отдельный процесс, не нагружая основную сборку.
	];

	if (isDev) {
		plugins.push(new ForkTsCheckerWebpackPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
	} // Plugins для DEVMode

	if (isProd) {
		// Plugins для PRODMode
		plugins.push(
			new MiniCssExtractPlugin({
				//Для основного css файла
				filename: "css/[name].[contenthash:8].css", // css/- это каталог, в котором будут сохранены файлы CSS. [name] - это название chunk. [contenthash:8] - Хеш фала до 8 символов, изменится при изменении в файле css
				chunkFilename: "css/[name].[contenthash:8].css", // Для отдельно разбитых на фрагменты css файлов
			})
		);
		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, "locales"),
						to: path.resolve(paths.output, "locales"),
					}, // Откуда и Куда перемещаем кусок проекта
				],
			})
		);
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}
