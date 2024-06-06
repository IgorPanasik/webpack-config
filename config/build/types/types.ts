export type BuildMode = "production" | "development"; // Типизируем режим , который может быть либо DEV or PROD
export type BuildPlatform = "mobile" | "desktop"; // Типизируем платформы

// Типизация путей к входной, выходной и к файлу index.html
export interface BuildPaths {
	entry: string;
	html: string;
	output: string;
	public: string;
	src: string; // Для alias
}

// Типизация порта, мода, и путей
export interface BuildOptions {
	port: number;
	paths: BuildPaths;
	mode: BuildMode;
	platform: BuildPlatform;
	analyzer?: boolean;
}
