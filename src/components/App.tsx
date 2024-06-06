import ImageSVG from "@/assets/generic.svg";
import imageJPG from "@/assets/imageJPG.jpg";
import imagePNG from "@/assets/imagePNG.png";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import * as classes from "./App.module.scss";

export const App = () => {
	const [count, setCount] = useState<number>(0);
	const increment = () => setCount(prev => prev + 1);

	return (
		<div>
			<h1>PLATFORM={__PLATFORM__}</h1>
			<img src={imagePNG} alt="" />
			<img width={100} height={100} src={imageJPG} alt="" />
			<h2>sdasd</h2>
			<div>
				<ImageSVG color={"red"} width={120} height={120} />
			</div>
			<Link to={"/about"}>About</Link>
			<br />
			<Link to={"/shop"}>Shop</Link>
			<h1 className={classes.title}>{count}</h1>
			<button type="button" className={classes.btn} onClick={increment}>
				Increment <br />
				<span>Span</span>
			</button>
			<Outlet />
		</div>
	);
};
