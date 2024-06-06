import { Configuration } from "webpack"; // Это импорт типа Configuration из библиотеки webpack. Configuration - это интерфейс, который определяет структуру объекта конфигурации Webpack. Он используется для типизации в TypeScript и помогает обеспечить, что ваш объект конфигурации соответствует ожидаемой структуре.
import { BuildOptions } from "./types/types";

export function buildResolvers(
	options: BuildOptions
): Configuration["resolve"] {
	return {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@": options.paths.src,
		},
	};
}
