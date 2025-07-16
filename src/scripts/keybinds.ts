import { startTest } from "./actualTest";
import { currentScreen, setScreen } from "./utils";

export const setkeybinds = () => {
	document.addEventListener("keydown", (e) => {
		const helpPageContainer = document.getElementById("helpPageContainer")!;
		if (e.code == "Escape") {
			// Esc when Help page is visible
			if (!helpPageContainer.classList.contains("hidden")) {
				helpPageContainer.classList.add("hidden");
			}
			// Esc to exit test
			if (currentScreen == "test" || currentScreen == "results") setScreen("main");
		}
		if (currentScreen == "results") {
			if (e.code == "R") startTest();
		}
	});
};
