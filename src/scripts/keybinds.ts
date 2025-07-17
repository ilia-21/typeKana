import { startTest } from "./actualTest";
import { helpPageContainer, modsPopup } from "./buttons";
import { currentScreen, setScreen } from "./utils";

const sequence: string[] = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let seqIndex = 0;
export const subGroupKeybinds: { [title: string]: () => void } = {};
export const groupKeybinds: (() => void)[] = [];
export const setkeybinds = () => {
	document.addEventListener("keydown", (e) => {
		//console.log(e);

		// Keybinds for rows of letters
		for (const subGroup of Object.keys(subGroupKeybinds)) {
			if (e.key == subGroup) subGroupKeybinds[subGroup]();
		}

		if (e.code == "Escape") {
			// Esc when Help page is visible
			if (!helpPageContainer.classList.contains("hidden")) helpPageContainer.classList.add("hidden");
			if (!modsPopup.classList.contains("hidden")) modsPopup.classList.add("hidden");

			// Esc to exit test
			if (currentScreen == "test" || currentScreen == "results") setScreen("main");
		}
		if ((currentScreen == "results" && e.shiftKey && e.code == "R") || (currentScreen == "main" && e.code == "Space")) startTest();

		// Shift+[1,2,3] Select alphabet groups
		if (e.shiftKey && e.code.startsWith("Digit")) {
			groupKeybinds[Number(e.code.slice(-1))]();
		}

		// Shift+M mods
		if (e.shiftKey && e.key == "M") {
			modsPopup.classList.toggle("hidden");
		}
		// [1,2,3,4] Mods selection
		if (!modsPopup.classList.contains("hidden") && e.code.startsWith("Digit") && document.getElementById("TTSeconds")! != document.activeElement) {
			const modID = Number(e.code.slice(-1));
			if (modID > 4) return;
			(document.getElementsByClassName(`Mod${modID}`)[0] as HTMLInputElement).checked = true;
			if (modID == 4) {
				//Disable all other mods for zen
				for (let i = 0; i <= 3; i++) {
					(document.getElementsByClassName(`Mod${i}`)[0] as HTMLInputElement).checked = false;
				}
			}
		}
		// Time trials
		if (!modsPopup.classList.contains("hidden") && e.key == "`") {
			const element = document.getElementById("TTSeconds")! as HTMLInputElement;
			element.focus();
			// It puts ` into the input field sometimes
			element.value = element.value.replaceAll("`", "");
		}

		if (e.key == sequence[seqIndex]) seqIndex++;
		//@ts-ignore
		if (seqIndex >= sequence.length) window.forceX = true;
	});
};
