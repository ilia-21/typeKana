let lettersArray = [];

let currentCharacterID = 0;
let stats = {
	startTime: 0,
	currentCombo: 0,
	longestCombo: 0,
	characters: {},
};

const startTest = () => {
	lettersArray = [];
	//Build array of characters
	for (group of alphabets[currentAlphabet]) {
		for (subGroup of group.groups) {
			if (!selectedGroups.has(subGroup.title)) continue;
			for (letter of subGroup.letters) {
				lettersArray.push([letter.romanji, letter.letter]);
			}
		}
	}
	if (lettersArray.length == 0) return;

	//Prepare test
	document.getElementById("actualTest").children[0].children[0].innerHTML = lettersArray[0][1];
	document.getElementById("actualTest").children[0].children[1].focus();
	document.getElementById("actualTest").children[0].children[1].value = "";
	stats.startTime = Date.now();

	//Switch screen to test
	document.getElementById("content").classList.add("hidden");
	document.getElementById("actualTest").classList.remove("hidden");
};
document.getElementById("romanjiInput").addEventListener("keydown", (e) => {
	if (e.code == "Space" || e.code == "Enter") nextCharacter();
});
const testDiv = document.getElementById("actualTest");
const showCheer = (isNegative, text) => {
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
	const currCard = document.getElementById("current");
	const comboText = document.getElementById("comboText");
	const inputField = currCard.children[1];
	const timeTook = Date.now() - stats.startTime;
	stats.characters[lettersArray[currentCharacterID][0]] = { time: timeTook };

	stats.startTime = Date.now();
	inputField.value == lettersArray[currentCharacterID][0] ? triggerCorrect() : triggerIncorrect();

	comboText.innerHTML = `Combo:${stats.currentCombo}`;

	// Transition
	currCard.style.marginLeft = "-110%";
	currCard.addEventListener("transitionend", function handleTransition() {
		currCard.removeEventListener("transitionend", handleTransition);

		if (currentCharacterID + 1 >= lettersArray.length) {
			showResultsScreen();
			return;
		}

		currCard.children[0].innerHTML = lettersArray[++currentCharacterID][1];
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
	const resultsScreen = document.getElementById("resultsScreen");
	const addResultNote = (text) => {
		const element = document.createElement("p");
		element.innerHTML = text;
		resultsScreen.append(element);
	};
	//Switch screen to test
	document.getElementById("actualTest").classList.add("hidden");
	resultsScreen.classList.remove("hidden");

	//Generate results
	addResultNote(`You longest combo was: ${stats.longestCombo}`);
	for (stat of Object.keys(stats.characters)) {
		addResultNote(`${stat} took you ${stats.characters[stat].time / 1000}s`);
	}
};
//Mods:
//Perfect: restart on incorrect
//Time limit
//Retry: keep retrying character instead of sending to the end
//Shuffle
