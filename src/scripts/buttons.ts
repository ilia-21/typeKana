import { startTest } from "./actualTest";
import { generateAlphabetToggleString, Screen, setScreen, switchAlphabet } from "./utils";

export const helpPageContainer = document.getElementById("helpPageContainer")!;
export const modsPopup = document.getElementById("modsPopup")!;

export const setButtons = () => {
	document.getElementById("startBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("helpBtn")!.addEventListener("click", () => {
		helpPageContainer.classList.toggle("hidden");
	});
	document.getElementById("statsBtn")!.addEventListener("click", () => {
		setScreen(Screen.STATS);
	});
	document.getElementById("modsBtn")!.addEventListener("click", () => {
		modsPopup.classList.toggle("hidden");
	});
	document.getElementById("alphabetBtn")!.addEventListener("click", () => {
		switchAlphabet();
		document.getElementById("alphabetBtn")!.innerHTML = `${generateAlphabetToggleString()}<br>[Caps Lock]`;
	});
	document.getElementById("resultsRetryBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("resultsBackBtn")!.addEventListener("click", () => {
		setScreen(Screen.MAIN);
	});

	// Dev panel buttons
	document.getElementById("wipeHistory")!.addEventListener("click", () => {
		localStorage.removeItem("history");
	});
	document.getElementById("devForceAscend")!.addEventListener("click", () => {
		//@ts-ignore
		window.forceX = true;
	});
};
