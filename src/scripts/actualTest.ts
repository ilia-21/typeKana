import { alphabets, cheerStrings, currentAlphabet, type letterPair } from "./consts";
import { selectedGroups } from "./startPage";
import { executeTranscendAnimation } from "./transcendAimation";
import { calculateRank, convertCharacter, getRandomElement, setScreen, shuffleArray } from "./utils";

let lettersArray: letterPair[] = [];

let currentCharacterID = 0;
export type mod = "KT" | "PF" | "R" | "TT" | string;
export interface stats {
	history: { character: string; isCorrect: boolean }[];
	startTime: number;
	currentCombo: number;
	longestCombo: number;
	characters: {
		[title: string]: {
			mistakes: number;
			time: number;
		};
	};
	mods: mod[];
	timeTrials?: number;
	failed?: boolean;
}
let stats: stats = {
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
	resultNotes.innerHTML = "";

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
	if ((document.getElementById("KTSelected") as HTMLInputElement).checked) stats.mods?.push("KT");
	if ((document.getElementById("PFSelected") as HTMLInputElement).checked) stats.mods?.push("PF");
	if ((document.getElementById("RSelected") as HTMLInputElement).checked) stats.mods?.push("R");
	const TT = Number((document.getElementById("TTSeconds") as HTMLInputElement).value);
	if (TT > 0) {
		stats.mods?.push("TT:" + TT);
		stats.timeTrials = TT;
	}
	if (stats.mods.includes("R")) shuffleArray(lettersArray);
	const letterCard = document.getElementById("actualTest")!.children[0] as HTMLDivElement;
	const inputElement = letterCard.children[1] as HTMLInputElement;
	letterCard.children[0].innerHTML = lettersArray[0].letter;
	inputElement.value = "";
	comboText.innerHTML = `Combo:0`;
	modsDisplay.innerHTML = ``;

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
	const currCard = document.getElementById("current")!;
	const inputField = currCard.children[1] as HTMLInputElement;
	let timeTook = Date.now() - stats.startTime;
	const currentCharacter = lettersArray[currentCharacterID];
	const currentCharacterRomanji = stats.characters[currentCharacter.romanji];

	if (!currentCharacterRomanji) {
		stats.characters[currentCharacter.romanji] = { time: timeTook, mistakes: 0 };
	} else {
		if (currentCharacterRomanji.mistakes > 0) {
			stats.characters[currentCharacter.romanji].time += timeTook;
		} else {
			currentCharacterRomanji.time = timeTook;
		}
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
	accuracyText.innerHTML = `${((accuracy / stats.history.length) * 100).toFixed(2)}%`;

	// Execute animation early
	if (calculateRank(stats).startsWith("Ascended")) {
		executeTranscendAnimation(stats);
		return;
	} else {
		console.log(calculateRank(stats));
	}

	// Transition
	currCard.style.marginLeft = "-110%";
	currCard.addEventListener("transitionend", function handleTransition() {
		currCard.removeEventListener("transitionend", handleTransition);

		if (currentCharacterID + 1 >= lettersArray.length) {
			showResultsScreen();
			return;
		}

		currCard.children[0].innerHTML = lettersArray[++currentCharacterID].letter;
		inputField.value = "";
		inputField.focus();

		currCard.classList.add("no-transition");
		currCard.style.marginLeft = "110%";

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
	if (stats.mods.includes("KT")) return;
	const wrongCharacter = lettersArray[currentCharacterID];
	lettersArray.push(wrongCharacter);
};
const triggerCorrect = () => {
	showCheer(false, getRandomElement(cheerStrings.positive));
	stats.currentCombo++;
	if (stats.longestCombo < stats.currentCombo) stats.longestCombo = stats.currentCombo;
};

const showResultsScreen = () => {
	const rankText = document.getElementById("resultsRank") as HTMLHeadingElement;
	const addResultNote = (text: string) => {
		const element = document.createElement("p");
		element.innerHTML = text;
		resultNotes.append(element);
	};
	// Switch screen to test
	setScreen("results");

	calculateRank(stats, rankText);
	if (stats.failed) {
		addResultNote("You failed");
		return;
	}

	// Generate results
	let hardest: { character: string; mistakes: number } = { character: "none", mistakes: 0 };

	for (const stat of Object.keys(stats.characters)) {
		const currentCharacter = stats.characters[stat];
		// Results: how much time it took for each character
		addResultNote(`${convertCharacter("letter", stat)}: ${(currentCharacter.time / 1000).toFixed(2)}s${currentCharacter.mistakes > 0 ? ` (${currentCharacter.mistakes + 1}  tries)` : ""} `);

		// While we are going through all the characters find the one with most mistakes
		if (currentCharacter.mistakes > hardest.mistakes) hardest = { character: stat, mistakes: currentCharacter.mistakes };
	}
	addResultNote(`Max combo: ${stats.longestCombo} ${hardest.mistakes == 0 ? "(Full combo)" : ""}`);
	addResultNote(`Accuracy: ${accuracyText.innerHTML}`);

	// Results: character with most mistakes
	if (hardest.mistakes > 0) {
		addResultNote(`Hardest character: ${convertCharacter("letter", hardest.character)} (${hardest.mistakes + 1} tries)`);
	}
	console.log(stats);
};
//Mods:
//Perfect: restart on incorrect
//Time Trials
//Keep Trying: keep retrying character instead of sending to the end
//Random
