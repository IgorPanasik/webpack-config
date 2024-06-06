import { App } from "@/components/App";
import { LazyAbout } from "@/pages/about/About.lazy";
import { Shop } from "@/pages/shop";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}
// Создание роутера
const router = createBrowserRouter([
	{
		// Главная страница компонента App
		path: "/",
		element: <App />,
		// Подроутеры для отдельных страниц
		children: [
			{
				path: "/about",
				element: (
					<Suspense fallback={"Loading..."}>
						<LazyAbout />
					</Suspense>
				),
			},
			{
				path: "/shop",
				element: (
					<Suspense fallback={"Loading..."}>
						<Shop />
					</Suspense>
				),
			},
		],
	},
]);
const container = createRoot(root);
container.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
