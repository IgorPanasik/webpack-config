import { lazy } from "react";

export const LazyAbout = lazy(
	() => import(/* webpackChunkName: "about" */ "./About")
);

// Благодаря комментарию /* webpackChunkName: "about" */ мы можем именовать CHUNKS
