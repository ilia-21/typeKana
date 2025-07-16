import { startTest } from "./actualTest";
import { helpPageContainer, modsPopup } from "./buttons";
import { currentScreen, setScreen } from "./utils";

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
		if ((currentScreen == "results" && e.code == "R") || (currentScreen == "main" && e.code == "Space")) startTest();

		if (e.shiftKey && e.code.startsWith("Digit")) {
			groupKeybinds[Number(e.code.slice(-1))]();
		}
	});
};
