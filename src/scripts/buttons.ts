import { startTest } from "./actualTest";
import { generateAlphabetToggleString, Screen, setScreen, showPopup, switchAlphabet, updateProfile } from "./utils";

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
	document.getElementById("wipeProfile")!.addEventListener("click", () => {
		localStorage.removeItem("profile");
	});
	document.getElementById("statsPfp")!.addEventListener("click", () => {
		let input = document.createElement("input");
		input.type = "file";
		input.onchange = (_) => {
			//@ts-ignore
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				const base64String = reader.result;
				(document.getElementById("statsPfp")! as HTMLImageElement).src = `` + base64String;
				updateProfile("pfp", `` + base64String);
				console.log(base64String);
			};
			reader.readAsDataURL(file);
		};
		input.click();
	});
	document.getElementById("statsNickname")!.addEventListener("change", () => {
		// Why doesn't e.target work???
		updateProfile("nickname", (document.getElementById("statsNickname") as HTMLInputElement).value);
	});
	document.getElementById("statsSlogan")!.addEventListener("change", () => {
		updateProfile("slogan", (document.getElementById("statsSlogan") as HTMLInputElement).value);
	});
};
