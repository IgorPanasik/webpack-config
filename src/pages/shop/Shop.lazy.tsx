import { lazy } from "react";

export const LazyShop = lazy(
	() => import(/* webpackChunkName: "shop" */ "./Shop")
);

// Благодаря комментарию /* webpackChunkName: "shop" */ мы можем именовать CHUNKS
