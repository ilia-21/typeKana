import { showResultsScreen, startTest, stats } from "./actualTest";
import { helpPageContainer, modsPopup } from "./buttons";
import { alphabets, changeAlphabetIndex, currentAlphabet, currentAlphabetIndex } from "./consts";
import { selectedGroups } from "./startPage";
import { currentScreen, setScreen, switchAll, toggleAll } from "./utils";

const sequence: string[] = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let seqIndex = 0;
export const subGroupKeybinds: { [title: string]: { [title: string]: () => void } } = {};
export const groupKeybinds: { [title: string]: (() => void)[] } = {};
export let capsLockLock = false;
export const setkeybinds = () => {
	document.addEventListener("keydown", (e) => {
		//console.log(e);

		// Keybinds for rows of letters
		for (const subGroup of Object.keys(subGroupKeybinds[currentAlphabet])) {
			if (currentScreen == "main") {
				if (e.key == subGroup) subGroupKeybinds[currentAlphabet][subGroup]();
				if (subGroup.startsWith("S") && e.shiftKey && e.key.toLowerCase() == subGroup.charAt(1)) subGroupKeybinds[currentAlphabet][subGroup]();
			}
		}

		switch (currentScreen) {
			// ==========================================================================================================
			case "main":
				switch (e.code) {
					case "Enter":
						startTest();
						break;
					case "Escape":
						if (!helpPageContainer.classList.contains("hidden")) helpPageContainer.classList.add("hidden");
						if (!modsPopup.classList.contains("hidden")) modsPopup.classList.add("hidden");
						break;
					case "Space":
						toggleAll();
						break;
					case "F2":
						modsPopup.classList.toggle("hidden");
						break;
					// CapsLock to switch alphabets
					case "CapsLock":
						const keys = Object.keys(alphabets);
						const newIndex = currentAlphabetIndex + 1 > keys.length - 1 ? 0 : currentAlphabetIndex + 1;
						if (!capsLockLock) {
							changeAlphabetIndex(newIndex);
							document.querySelectorAll(".alphabet").forEach((e) => {
								e.classList.add("hidden");
							});
							document.getElementById(`${keys[newIndex]}Alphabet`)!.classList.remove("hidden");
							selectedGroups.clear();
							switchAll("off");
						}
						capsLockLock = !capsLockLock;

						document.getElementById("alphabetBtn")!.innerHTML = `${capsLockLock ? "Press it again" : "Switch <br />[CapsLock]"}`;
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
			case "test":
				// Exit to results screen if Zen is enabled
				if (e.code == "Escape") {
					stats.mods.includes("ZE") ? showResultsScreen() : setScreen("main");
				}
				break;
			// ==========================================================================================================
			case "results":
				if (e.code == "Tab") {
					// I FORGOT ABOUT preventDefault() LOL
					// Literally added only on last day
					e.preventDefault();
					startTest();
				}
				if (e.code == "Escape") setScreen("main");
				break;
		}

		if (seqIndex > 0 && e.key != sequence[seqIndex]) seqIndex = 0;
		if (e.key == sequence[seqIndex]) seqIndex++;
		if (seqIndex >= sequence.length) {
			//@ts-ignore
			window.forceX = true;
			seqIndex = 0;
		}
	});
};
