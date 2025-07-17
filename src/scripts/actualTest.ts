import { alphabets, cheerStrings, comboMilestones, currentAlphabet, type letterPair } from "./consts";
import { selectedGroups } from "./startPage";
import { executeTranscendAnimation } from "./transcendAimation";
import { calculateRank, convertCharacter, getRandomElement, setScreen, shuffleArray } from "./utils";

let lettersArray: letterPair[] = [];

let currentCharacterID = 0;
export type mod = "KT" | "PF" | "R" | "TT" | "ZE" | string;
export interface stats {
	history: { character: string; isCorrect: boolean }[];
	startTime: number;
	currentCombo: number;
	longestCombo: number;
	characters: {
		[title: string]: {
			mistakes: number;
			time: number;
			encounters?: number;
		};
	};
	mods: mod[];
	timeTrials?: number;
	failed?: boolean;
}
export let stats: stats = {
	history: [],
	startTime: 0,
	currentCombo: 0,
	longestCombo: 0,
	characters: {},
	mods: [],
};
const comboText = document.getElementById("comboText")!;
const accuracyText = document.getElementById("accuracyText")!;
const resultNotes = document.getElementById("resultsNotes") as HTMLDivElement;
const modsDisplay = document.getElementById("modsDisplay")!;
const currCard = document.getElementById("current")!;

let timeoutId: number;
export const startTest = () => {
	lettersArray = [];
	currentCharacterID = 0;
	//Build array of characters
	for (const group of alphabets[currentAlphabet]) {
		for (const subGroup of group.groups) {
			if (!selectedGroups.has(subGroup.title)) continue;
			for (const letter of subGroup.letters) {
				lettersArray.push(letter);
			}
		}
	}
	if (lettersArray.length == 0) {
		setScreen("main");
		return;
	}

	// Clear results screen
	resultNotes.children[0].innerHTML = "";
	resultNotes.children[1].innerHTML = "";

	// Prepare test
	stats = {
		history: [],
		startTime: Date.now(),
		currentCombo: 0,
		longestCombo: 0,
		characters: {},
		mods: [],
	};
	// Prepare mods
	["KT", "PF", "R", "ZE"].forEach((m) => {
		if ((document.getElementById(m + "Selected") as HTMLInputElement).checked) stats.mods?.push(m);
	});
	const TT = Number((document.getElementById("TTSeconds") as HTMLInputElement).value);
	if (TT > 0) {
		stats.mods?.push("TT:" + TT);
		stats.timeTrials = TT;
	}
	if (stats.mods.includes("R") || stats.mods.includes("ZE")) shuffleArray(lettersArray);
	const letterCard = document.getElementById("actualTest")!.children[0] as HTMLDivElement;
	const inputElement = letterCard.children[1] as HTMLInputElement;
	letterCard.children[0].innerHTML = lettersArray[0].letter;
	inputElement.value = "";
	comboText.innerHTML = `0x`;
	comboText.classList = "";
	modsDisplay.innerHTML = ``;
	currCard.style.border = `none`;
	inputElement.value = "";

	stats.mods?.forEach((m) => {
		const modElement = document.createElement("p");
		modElement.innerHTML = m;
		modsDisplay?.append(modElement);
	});

	// Slide card to starting position
	letterCard.classList.add("no-transition");
	letterCard.style.marginLeft = "0%";
	void letterCard.offsetWidth;
	letterCard.classList.remove("no-transition");

	setScreen("test");
	inputElement.focus();
	if (stats.timeTrials) timeoutId = setTimeout(nextCharacter, stats.timeTrials * 1e3);
};
document.getElementById("romanjiInput")!.addEventListener("keydown", (e) => {
	if (e.code == "Space" || e.code == "Enter") nextCharacter();
});
const showCheer = (isNegative: boolean, text: string) => {
	const testDiv = document.getElementById("actualTest") as HTMLDivElement;
	const cheerElement = document.createElement("p");
	cheerElement.classList.add("cheer");
	cheerElement.innerHTML = text;
	cheerElement.style.color = isNegative ? "var(--red)" : "var(--green)";

	cheerElement.style.opacity = "100%";
	cheerElement.style.top = "20%";

	testDiv.append(cheerElement);

	requestAnimationFrame(() => {
		cheerElement.style.opacity = "0%";
		cheerElement.style.top = "0%";
	});

	cheerElement.addEventListener("transitionend", function handleTransition() {
		cheerElement.removeEventListener("transitionend", handleTransition);
		cheerElement.remove();
	});
};
const nextCharacter = () => {
	if (timeoutId) clearTimeout(timeoutId);
	const inputField = currCard.children[1] as HTMLInputElement;
	let timeTook = Date.now() - stats.startTime;
	const currentCharacter = lettersArray[currentCharacterID];
	const currentCharacterRomanji = stats.characters[currentCharacter.romanji];

	// Calculate stats for characters
	if (!currentCharacterRomanji) {
		stats.characters[currentCharacter.romanji] = { time: timeTook, mistakes: 0 };
	} else {
		stats.characters[currentCharacter.romanji].time += timeTook;
	}
	if (stats.mods.includes("ZE")) {
		stats.characters[currentCharacter.romanji].encounters ? stats.characters[currentCharacter.romanji].encounters!++ : (stats.characters[currentCharacter.romanji].encounters = 1);
	}

	stats.startTime = Date.now();
	//Sometimes theres a stray space in there
	const isCorrect = inputField.value.replaceAll(" ", "") == currentCharacter.romanji;
	stats.history.push({ character: currentCharacter.romanji, isCorrect: isCorrect });
	if (isCorrect) {
		triggerCorrect();
	} else {
		stats.characters[currentCharacter.romanji].mistakes++;
		triggerIncorrect();
		if (stats.mods.includes("KT")) {
			inputField.value = "";
			return;
		}
	}
	let accuracy: number = 0;
	for (const h of stats.history) {
		accuracy += h.isCorrect ? 1 : 0;
	}
	comboText.innerHTML = `${stats.currentCombo}x`;
	if (comboMilestones.includes(stats.currentCombo)) comboText.classList.add(`combo${stats.currentCombo}`);
	accuracyText.innerHTML = `${((accuracy / stats.history.length) * 100).toFixed(2)}%`;
	if (stats.mods.includes("ZE")) {
		let totalMistkes = 0;
		stats.history.forEach((h) => {
			if (!h.isCorrect) totalMistkes++;
		});
		accuracyText.innerHTML += ` (${stats.history.length - totalMistkes}/${stats.history.length})`;
	}

	// Execute animation early
	//@ts-ignore
	if ((currentCharacterID + 1 >= lettersArray.length && calculateRank(stats).startsWith("Ascended")) || window.forceX) {
		executeTranscendAnimation(stats);
		return;
	}

	// Transition
	currCard.style.border = `1px solid var(--${isCorrect ? "green" : "red"})`;
	currCard.style.marginLeft = "-110%";
	currCard.addEventListener("transitionend", function handleTransition() {
		currCard.removeEventListener("transitionend", handleTransition);

		if (currentCharacterID + 1 >= lettersArray.length) {
			if (stats.mods.includes("ZE")) {
				currentCharacterID = 0;
				shuffleArray(lettersArray);
			} else {
				showResultsScreen();
				return;
			}
		}

		currCard.children[0].innerHTML = lettersArray[++currentCharacterID].letter;
		inputField.value = "";
		inputField.focus();

		currCard.classList.add("no-transition");
		currCard.style.marginLeft = "110%";
		currCard.style.border = `none`;

		void currCard.offsetWidth; //Force browser update

		currCard.classList.remove("no-transition");

		currCard.style.marginLeft = "0%";
		if (stats.timeTrials) timeoutId = setTimeout(nextCharacter, stats.timeTrials * 1e3);
	});
};

const triggerIncorrect = () => {
	if (stats.mods.includes("PF")) {
		stats.failed = true;
		showResultsScreen();
	}
	showCheer(true, getRandomElement(cheerStrings.negative));
	stats.currentCombo = 0;
	comboText.classList = "";
	if (stats.mods.includes("KT")) return;
	const wrongCharacter = lettersArray[currentCharacterID];
	lettersArray.push(wrongCharacter);
};
const triggerCorrect = () => {
	showCheer(false, getRandomElement(cheerStrings.positive));
	stats.currentCombo++;
	if (stats.longestCombo < stats.currentCombo) stats.longestCombo = stats.currentCombo;
};

export const showResultsScreen = () => {
	const rankText = document.getElementById("resultsRank") as HTMLHeadingElement;
	const addResultNote = (type: "character" | "note", text: string) => {
		const insertIndex = type == "character" ? 0 : 1;
		const element = document.createElement("p");
		element.innerHTML = text;
		resultNotes.children[insertIndex].append(element);
	};
	// Switch screen to test
	setScreen("results");

	calculateRank(stats, rankText);
	if (stats.failed) {
		addResultNote("note", "You failed");
		return;
	}

	// Generate results
	let hardest: { character: string; mistakes: number } = { character: "none", mistakes: 0 };

	for (const stat of Object.keys(stats.characters)) {
		const currentCharacter = stats.characters[stat];
		// Results: how much time it took for each character
		if (stats.mods.includes("ZE")) {
			//Show average time instead if Zen is enabled
			if (!currentCharacter.encounters) currentCharacter.encounters = 1;
			addResultNote("character", `${convertCharacter("letter", stat)}: ${(currentCharacter.time / 1000 / currentCharacter.encounters).toFixed(2)}s avg (${currentCharacter.encounters}x)`);
		} else {
			addResultNote("character", `${convertCharacter("letter", stat)}: ${(currentCharacter.time / 1000).toFixed(2)}s${currentCharacter.mistakes > 0 ? ` (${currentCharacter.mistakes + 1}  tries)` : ""} `);
		}

		// While we are going through all the characters find the one with most mistakes
		if (currentCharacter.mistakes > hardest.mistakes) hardest = { character: stat, mistakes: currentCharacter.mistakes };
	}
	addResultNote("note", `Max combo: ${stats.longestCombo} ${hardest.mistakes == 0 ? "(Full combo)" : ""}`);
	addResultNote("note", `Accuracy: ${accuracyText.innerHTML}`);

	// Results: character with most mistakes
	if (hardest.mistakes > 0) {
		addResultNote("note", `Hardest character: ${convertCharacter("letter", hardest.character)} (${hardest.mistakes + 1} tries)`);
	}
	//console.log(stats);
};
