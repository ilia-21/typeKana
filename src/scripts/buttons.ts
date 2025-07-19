import { startTest } from "./actualTest";
import { generateAlphabetToggleString, Screen, setScreen, showPopup, switchAlphabet } from "./utils";

export const helpPageContainer = document.getElementById("helpPage")! as HTMLDivElement;
export const modsPopup = document.getElementById("modsScreen")! as HTMLDivElement;

export const setButtons = () => {
	document.getElementById("startBtn")!.addEventListener("click", () => {
		startTest();
	});
	document.getElementById("helpBtn")!.addEventListener("click", () => {
		showPopup(helpPageContainer);
	});
	document.getElementById("statsBtn")!.addEventListener("click", () => {
		setScreen(Screen.STATS);
	});
	document.getElementById("modsBtn")!.addEventListener("click", () => {
		showPopup(modsPopup);
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
	document.getElementById("resetStatsPopup")!.addEventListener("click", () => {
		localStorage.removeItem("statsInfoSeen");
	});
};
