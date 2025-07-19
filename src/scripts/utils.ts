import type { stats } from "./actualTest";
import { alphabets, changeAlphabetIndex, currentAlphabet, currentAlphabetIndex } from "./consts";
import { rankPrefix, ranks, rankSuffix } from "./ranks";
import type { characterPerformance } from "./resultsScreen";
import { selectedGroups } from "./startPage";
import { buildStats, type run } from "./statsScreen";

export const shuffleArray = (array: any[]) => {
	let currentIndex = array.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
};
export const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
export enum Screen {
	MAIN = 0,
	TEST = 1,
	RESULTS = 2,
	STATS = 3,
}
export let currentScreen: number = Screen.MAIN;
const screenElemets = [document.getElementById("content")!, document.getElementById("actualTest")!, document.getElementById("resultsScreen"), document.getElementById("statsScreen")];
export const setScreen = (screen: Screen) => {
	screenElemets.forEach((e) => {
		e?.classList.add("hidden");
	});
	currentScreen = screen;

	screenElemets[screen]?.classList.remove("hidden");
	if (screen == Screen.STATS) buildStats();
};
export const convertCharacter = (to: "romanji" | "letter", character: string, alphabet?: string): string => {
	// holy shit this is SO bad
	if (!alphabet) alphabet = currentAlphabet;
	for (const g of alphabets[alphabet]) {
		for (const sg of g.groups) {
			for (const l of sg.letters) {
				if (to == "letter" && l.romanji == character) return l.letter;
				if (to == "romanji" && l.letter == character) return l.romanji;
			}
		}
	}
	return "?";
};
export const calculateRank = (stats: stats | run, mini?: boolean): { style: string; string: string } => {
	let finalRank = "";
	let style = "";
	for (const r of ranks) {
		if (r.condition(stats)) {
			finalRank = r.text;
			break;
		}
	}
	if (mini) return { style: style, string: finalRank };
	for (const p of rankPrefix) {
		if (stats.failed) break;
		if (p.condition(stats)) {
			finalRank = `${p.text} ${finalRank}`;
			style = p.style as string;
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
	return { style: style, string: finalRank };
};
export const toggleAll = () => {
	// Whatever, just check one character, it doesn't need to be complicated
	document.querySelector(".alphabetSubGroup")?.classList.contains("selected") ? switchAll("off") : switchAll("on");
};
export const generateAlphabetToggleString = () => {
	const keys = Object.keys(alphabets);
	const nextAlphabetIndex = currentAlphabetIndex + 1 >= keys.length ? 0 : currentAlphabetIndex + 1;
	const first = alphabets[currentAlphabet][0].groups[0].letters[0].letter;
	const second = alphabets[keys[nextAlphabetIndex]][0].groups[0].letters[0].letter;
	return `${first} -> ${second}`;
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
export const switchAlphabet = () => {
	const keys = Object.keys(alphabets);
	const newIndex = currentAlphabetIndex + 1 > keys.length - 1 ? 0 : currentAlphabetIndex + 1;
	changeAlphabetIndex(newIndex);
	document.querySelectorAll(".alphabet").forEach((e) => {
		e.classList.add("hidden");
	});
	document.getElementById(`${keys[newIndex]}Alphabet`)!.classList.remove("hidden");
	selectedGroups.clear();
	switchAll("off");
};
export const loadRuns = (): run[] => {
	return JSON.parse(localStorage.getItem("history") || "[]") as run[];
};
export const storeRun = (stats: stats, performances: characterPerformance[], alphabet: string) => {
	const pastRuns: run[] = JSON.parse(localStorage.getItem("history") || "[]") as run[];
	pastRuns.push({ ...stats, performance: performances, alphabet: alphabet });
	localStorage.setItem("history", JSON.stringify(pastRuns));
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
