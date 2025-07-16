import { alphabets } from "./consts";

export const shuffleArray = (array: any[]) => {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
};
export const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
export type screen = "main" | "test" | "results";
export let currentScreen: screen = "main";
const Screens = { MAIN: 0, TEST: 1, RESULTS: 2 };
const screenElemets = [document.getElementById("content")!, document.getElementById("actualTest")!, document.getElementById("resultsScreen")];
export const setScreen = (screen: screen) => {
	screenElemets.forEach((e) => {
		e?.classList.add("hidden");
	});
	currentScreen = screen;
	switch (screen) {
		case "main":
			screenElemets[Screens.MAIN]?.classList.remove("hidden");
			break;
		case "test":
			screenElemets[Screens.TEST]?.classList.remove("hidden");
			break;
		case "results":
			screenElemets[Screens.RESULTS]?.classList.remove("hidden");
			break;
	}
};
export const convertCharacter = (to: "romanji" | "letter", character: string) => {
	// holy shit this is SO bad
	for (const a of Object.keys(alphabets)) {
		for (const g of alphabets[a]) {
			for (const sg of g.groups) {
				for (const l of sg.letters) {
					if (to == "letter" && l.romanji == character) return l.letter;
					if (to == "romanji" && l.letter == character) return l.romanji;
				}
			}
		}
	}
};
