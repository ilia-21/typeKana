import { startTest, stats } from "./actualTest";
import { modsPopup } from "./buttons";
import { currentAlphabet } from "./consts";
import { showResultsScreen } from "./resultsScreen";
import { currentScreen, generateAlphabetToggleString, Screen, setScreen, switchAlphabet, toggleAll } from "./utils";

const sequence: string[] = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let seqIndex = 0;
const preventDefaultList = ["Tab", "Escape", "Enter"];
export const subGroupKeybinds: { [title: string]: { [title: string]: () => void } } = {};
export const groupKeybinds: { [title: string]: (() => void)[] } = {};
export let capsLockLock = false;
export const closePopups = () => {
	const devTools = document.getElementById("devTools") as HTMLDivElement;
	const popupContainer = document.getElementById("popupContainer")!;
	let wasPopupClosed = !popupContainer.classList.contains("hidden") || !devTools.classList.contains("hidden");
	if (!popupContainer.classList.contains("hidden")) {
		popupContainer.classList.add("hidden");
	}
	if (!devTools.classList.contains("hidden")) devTools.classList.add("hidden");
	return wasPopupClosed;
};
export const setkeybinds = () => {
	document.addEventListener("keydown", (e) => {
		//console.log(e);

		// Keybinds for rows of letters
		for (const subGroup of Object.keys(subGroupKeybinds[currentAlphabet])) {
			if (currentScreen == Screen.MAIN) {
				if (e.key == subGroup) subGroupKeybinds[currentAlphabet][subGroup]();
				if (subGroup.startsWith("S") && e.shiftKey && e.key.toLowerCase() == subGroup.charAt(1)) subGroupKeybinds[currentAlphabet][subGroup]();
			}
		}

		// I FORGOT ABOUT preventDefault() LOL
		// Literally added only on last day
		if (preventDefaultList.includes(e.code)) e.preventDefault();

		switch (currentScreen) {
			// ==========================================================================================================
			case Screen.MAIN:
				switch (e.code) {
					case "Enter":
						closePopups();
						startTest();
						break;
					case "Escape":
						closePopups();
						break;
					case "Space":
						toggleAll();
						break;
					case "F1":
						setScreen(Screen.STATS);
						break;
					case "F2":
						modsPopup.classList.toggle("hidden");
						break;
					// CapsLock to switch alphabets
					case "CapsLock":
						if (capsLockLock) {
							switchAlphabet();
						}
						capsLockLock = !capsLockLock;

						document.getElementById("alphabetBtn")!.innerHTML = `${generateAlphabetToggleString()}<br>${capsLockLock ? "[Again]" : `[Caps Lock]`}`;
						break;
				}
				// [1,2,3,4] Mods selection
				if (!modsPopup.classList.contains("hidden") && e.code.startsWith("Digit") && document.getElementById("TTSeconds")! != document.activeElement) {
					const modID = Number(e.code.slice(-1));
					const toggle = (e: HTMLInputElement) => {
						e.checked = e.checked ? false : true;
					};
					if (modID > 4) return;
					toggle(document.getElementsByClassName(`Mod${modID}`)[0] as HTMLInputElement);
					if (modID == 4) {
						//Disable all other mods for zen
						for (let i = 0; i <= 3; i++) {
							toggle(document.getElementsByClassName(`Mod${i}`)[0] as HTMLInputElement);
						}
					}
				}
				if (e.shiftKey && e.code.startsWith("Digit")) {
					// Shift+[1,2,3] Select alphabet groups
					groupKeybinds[currentAlphabet][Number(e.code.slice(-1))]();
				}

				// Time trials
				if (!modsPopup.classList.contains("hidden") && e.key == "`") {
					const element = document.getElementById("TTSeconds")! as HTMLInputElement;
					element.focus();
					// It puts ` into the input field sometimes
					element.value = element.value.replaceAll("`", "");
				}
				break;
			// ==========================================================================================================
			case Screen.TEST:
				// Exit to results screen if Zen is enabled
				if (e.code == "Escape") {
					stats.mods.includes("ZE") ? showResultsScreen(stats) : setScreen(Screen.MAIN);
				}
				break;
			// ==========================================================================================================
			case Screen.RESULTS:
				switch (e.code) {
					case "Tab":
						startTest();
						break;
					case "Escape":
						setScreen(Screen.MAIN);
						break;
				}
				break;
			// ==========================================================================================================
			case Screen.STATS:
				switch (e.code) {
					case "F1":
					case "Escape":
						if (closePopups()) return;
						setScreen(Screen.MAIN);
						break;
				}
				break;
		}

		if (seqIndex > 0 && e.key != sequence[seqIndex]) seqIndex = 0;
		if (e.key == sequence[seqIndex]) seqIndex++;
		if (seqIndex >= sequence.length) {
			document.getElementById("devTools")!.classList.toggle("hidden");
			seqIndex = 0;
		}
	});
};
