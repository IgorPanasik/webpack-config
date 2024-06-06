import type { Configuration as DevServerConfiguration } from "webpack-dev-server"; // Плагин для загрузки порта с динамическим изменением
import { BuildOptions } from "./types/types";

// Экспортируем отдельную функцию для Порта
export default function buildDevServer(
	options: BuildOptions
): DevServerConfiguration {
	return {
		port: options.port ?? 3000, // npm run start -- --port=5000 or npm run start => 3000
		open: true,
		// Если раздавать статику через nginx, то нужно делать проксирование на index.html
		historyApiFallback: true,
		hot: true,
	};
}
