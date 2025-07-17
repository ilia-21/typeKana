import type { stats } from "./actualTest";
import { alphabets } from "./consts";
import { rankPrefix, ranks, rankSuffix } from "./ranks";
import { selectedGroups } from "./startPage";

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
export const calculateRank = (stats: stats, rankElement?: HTMLElement) => {
	let finalRank = "";
	for (const r of ranks) {
		if (r.condition(stats)) {
			finalRank = r.text;
			break;
		}
	}
	for (const p of rankPrefix) {
		if (stats.failed) break;
		if (p.condition(stats)) {
			finalRank = `${p.text} ${finalRank}`;
			rankElement && (rankElement.style = p.style as string);
			break;
		}
	}
	for (const s of rankSuffix) {
		if (stats.failed) break;
		if (finalRank.startsWith("Ascended")) {
			finalRank.trimEnd();
			break;
		}
		if (s.condition(stats)) {
			finalRank = finalRank + s.text;
			break;
		}
	}

	rankElement && (rankElement.innerHTML = finalRank);
	return finalRank;
};
export const toggleAll = () => {
	// Whatever, just check one character, it doesn't need to be complicated
	document.querySelector(".alphabetSubGroup")?.classList.contains("selected") ? switchAll("off") : switchAll("on");
};
export const switchAll = (what: "on" | "off") => {
	document.querySelectorAll(".alphabetSubGroup").forEach((e) => {
		const letter = e.children[0].innerHTML.split(" ")[0];
		if (what == "off") {
			e.classList.remove("selected");
			selectedGroups.clear();
		} else {
			e.classList.add("selected");
			selectedGroups.add(letter);
		}
	});
};
/* const detectTimeTrials = (stats: stats): number | boolean => {
	// Even if TT wasn't enabled this will check if you had no mistakes and finished in time
	let longest = 0;
	for (const stat of Object.keys(stats.characters)) {
		const currentStat = stats.characters[stat];
		if (currentStat.mistakes > 0) return false;
		if (currentStat.time / 1000 > longest / 1000) longest = currentStat.time / 1000;
	}
	return longest;
}; */
