import { alphabets, cheerStrings, currentAlphabet, type letterPair } from "./consts";
import { selectedGroups } from "./startPage";
import { convertCharacter, getRandomElement, setScreen } from "./utils";

let lettersArray: letterPair[] = [];

let currentCharacterID = 0;
interface stats {
	startTime: number;
	currentCombo: number;
	longestCombo: number;
	characters: {
		[title: string]: {
			mistakes: number;
			time: number;
		};
	};
}
let stats: stats = {
	startTime: 0,
	currentCombo: 0,
	longestCombo: 0,
	characters: {},
};
const comboText = document.getElementById("comboText")!;
const resultNotes = document.getElementById("resultsNotes") as HTMLDivElement;
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
	//Clear results screen
	resultNotes.innerHTML = "";
	//Prepare test
	stats = {
		startTime: Date.now(),
		currentCombo: 0,
		longestCombo: 0,
		characters: {},
	};
	const letterCard = document.getElementById("actualTest")!.children[0] as HTMLDivElement;
	const inputElement = letterCard.children[1] as HTMLInputElement;
	letterCard.children[0].innerHTML = lettersArray[0].letter;
	inputElement.value = "";

	letterCard.classList.add("no-transition");
	letterCard.style.marginLeft = "0%";
	comboText.innerHTML = `Combo:0`;

	void letterCard.offsetWidth;

	letterCard.classList.remove("no-transition");

	setScreen("test");
	inputElement.focus();
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
	if (inputField.value.replaceAll(" ", "") == currentCharacter.romanji) {
		triggerCorrect();
	} else {
		triggerIncorrect();
		stats.characters[currentCharacter.romanji].mistakes++;
	}

	comboText.innerHTML = `Combo:${stats.currentCombo}`;

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
	});
};

const triggerIncorrect = () => {
	showCheer(true, getRandomElement(cheerStrings.negative));
	stats.currentCombo = 0;
	const wrongCharacter = lettersArray[currentCharacterID];
	lettersArray.push(wrongCharacter);
};
const triggerCorrect = () => {
	showCheer(false, getRandomElement(cheerStrings.positive));
	stats.currentCombo++;
	if (stats.longestCombo < stats.currentCombo) stats.longestCombo = stats.currentCombo;
};

const showResultsScreen = () => {
	const resultsScreen = document.getElementById("resultsScreen") as HTMLDivElement;
	const addResultNote = (text: string) => {
		const element = document.createElement("p");
		element.innerHTML = text;
		resultNotes.append(element);
	};
	// Switch screen to test
	document.getElementById("actualTest")!.classList.add("hidden");
	resultsScreen.classList.remove("hidden");

	// Generate results
	addResultNote(`You longest combo was: ${stats.longestCombo}`);
	let hardest: { character: string; mistakes: number } = { character: "none", mistakes: 0 };
	for (const stat of Object.keys(stats.characters)) {
		const currentCharacter = stats.characters[stat];
		// Results: how much time it took for each character
		addResultNote(`${convertCharacter("letter", stat)} took you ${(currentCharacter.time / 1000).toFixed(2)}s${currentCharacter.mistakes > 0 ? ` and ${currentCharacter.mistakes}` : ""} tries`);

		// While we are going through all the characters find the one with most mistakes
		if (currentCharacter.mistakes > hardest.mistakes) hardest = { character: stat, mistakes: currentCharacter.mistakes };
	}
	// Results: character with most mistakes
	addResultNote(`Hardest character for you was ${convertCharacter("letter", hardest.character)}, you got it after ${hardest.mistakes} tries`);
	console.log(stats);
};
//Mods:
//Perfect: restart on incorrect
//Time limit
//Retry: keep retrying character instead of sending to the end
//Shuffle
