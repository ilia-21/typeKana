import { startTest } from "./actualTest";
import { setScreen } from "./utils";

const helpPageContainer = document.getElementById("helpPageContainer")!;

export const setButtons = () => {
	document.getElementById("helpBtn")!.addEventListener("click", () => {
		helpPageContainer.classList.toggle("hidden");
	});
	document.getElementById("startBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("resultsRetryBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("resultsBackBtn")!.addEventListener("click", () => {
		setScreen("main");
	});
};
