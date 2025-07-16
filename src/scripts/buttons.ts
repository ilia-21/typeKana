import { startTest } from "./actualTest";
import { setScreen } from "./utils";

export const helpPageContainer = document.getElementById("helpPageContainer")!;
export const modsPopup = document.getElementById("modsPopup")!;

export const setButtons = () => {
	document.getElementById("helpBtn")!.addEventListener("click", () => {
		helpPageContainer.classList.toggle("hidden");
	});
	document.getElementById("startBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("modsBtn")!.addEventListener("click", () => {
		modsPopup.classList.toggle("hidden");
	});
	document.getElementById("resultsRetryBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("resultsBackBtn")!.addEventListener("click", () => {
		setScreen("main");
	});
};
