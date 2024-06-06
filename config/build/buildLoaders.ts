import MiniCssExtractPlugin from "mini-css-extract-plugin"; // Плагин для отдельного файла css в папке build
import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

// Экспортируем отдельную функцию для Loaders
export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	// ModuleOptions- это тип, определенный в библиотеке Webpack. Он используется для типизации конфигурации модулей в Webpack.
	// В данном контексте ModuleOptions["rules"] указывает на свойство rules внутри ModuleOptions. Это массив объектов, каждый из которых представляет собой правило для обработки определенного типа файлов. Каждое правило может содержать следующие свойства: test/use/exclude or include
	const isDev = options.mode === "development";

	const assetLoaders = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};

	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: "@svgr/webpack",
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: "convertColors",
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	};

	// Превращает svg в компонент react а также настройка icon в true позволяет работать как с icon

	const cssLoaderWithModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates style nodes from
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			cssLoaderWithModules,
			"sass-loader",
		],
	};

	// const tsLoader = {
	// 	// Установка Loader для обработки ts файлов
	// 	test: /\.tsx?$/,
	// 	use: "ts-loader",
	// 	exclude: /node_modules/,
	// };

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: isDev, // Используется для быстрой компиляции типов, не заботясь о проверки типов.
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				},
			},
		],
	};

	// babel для работы с ts
	// const babelLoader = buildBabelLoader(options);

	return [assetLoaders, scssLoader, tsLoader, svgrLoader];
}
