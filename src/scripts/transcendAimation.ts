import type { stats } from "./actualTest";
import { calculateRank, convertCharacter, Screen, setScreen } from "./utils";

const comboText = document.getElementById("comboText")!;
const accuracyText = document.getElementById("accuracyText")!;
const modsDisplay = document.getElementById("modsDisplay")!;
const letterCard = document.getElementById("actualTest")!.children[0] as HTMLDivElement;
const rankText = document.getElementById("resultsRank") as HTMLHeadingElement;
const resultsButtons = document.getElementById("resultsButtons") as HTMLDivElement;
const resultNotes = document.getElementById("resultsNotes") as HTMLDivElement;
let delay = 1000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const animateResultsNote = (text: string) => {
	const element = document.createElement("p");
	element.innerHTML = text;
	element.style.opacity = "0";
	element.classList.add("yes-transition");
	element.classList.add("transcendedCharacter");
	resultNotes.children[0].append(element);
	requestAnimationFrame(() => {
		element.style.opacity = "1";
	});
};
export const executeTranscendAnimation = async (stats: stats) => {
	// Hide UI
	comboText.style.display = "none";
	accuracyText.style.display = "none";
	modsDisplay.style.display = "none";

	resultsButtons.style.opacity = "0%";
	resultsButtons.classList.add("yes-transition");
	rankText.style.opacity = "0%";
	rankText.classList.add("yes-transition");

	letterCard.style.transition = "all 2s ease-in-out";
	letterCard.classList.add("transcendedCard");
	letterCard.style.opacity = "0%";
	await sleep(2000);
	setScreen(Screen.RESULTS);
	for (const character of Object.keys(stats.characters)) {
		animateResultsNote(`${convertCharacter("letter", character)}: Perfect`);
		await sleep(delay);
		delay = Math.max(200, delay * 0.9);
	}

	const rank = calculateRank(stats);
	rankText.style = rank.style;
	rankText.innerHTML = rank.string;

	rankText.style.opacity = "100%";

	await sleep(1000);
	const notAcendedAnymore = () => {
		letterCard.removeAttribute("style");
		letterCard.classList.remove("transcendedCard");
		rankText.removeAttribute("style");
		comboText.removeAttribute("style");
		accuracyText.removeAttribute("style");
		modsDisplay.removeAttribute("style");
	};
	resultsButtons.style.opacity = "100%";
	resultsButtons.addEventListener("click", notAcendedAnymore);
};
