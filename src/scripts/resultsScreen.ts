import type { stats } from "./actualTest";
import { currentAlphabet } from "./consts";
import { calculateRank, convertCharacter, Screen, setScreen, storeRun } from "./utils";
export type characterPerformance = {
	key: string;
	character: string;
	mistakes: number;
	time: number;
	weight: number;
	encounters: number;
};
let performances: characterPerformance[] = [];
const resultNotes = document.getElementById("resultsNotes") as HTMLDivElement;
const accuracyText = document.getElementById("accuracyText")!;
const rankText = document.getElementById("resultsRank") as HTMLHeadingElement;
const addResultNote = (args: { type: "character" | "note"; text: string; color?: string; isPerfect?: boolean }) => {
	const { type, text, color, isPerfect } = args;
	const insertIndex = type == "character" ? 0 : 1;
	const element = document.createElement("p");
	element.innerHTML = text;
	if (color) element.style.color = color;
	if (isPerfect && color) element.style.textShadow = `${color} 0 0 8px`;
	resultNotes.children[insertIndex].append(element);
};
export const normalize = (w: number, maxWeight: number, minWeight: number): number => {
	if (maxWeight === minWeight) return 0;
	return (w - minWeight) / (maxWeight - minWeight);
};

export const getColor = (normalized: number): string => {
	const r1 = 0xf3,
		g1 = 0x8b,
		b1 = 0xa8; // red
	const r2 = 0xa6,
		g2 = 0xe3,
		b2 = 0xa1; // green

	const r = Math.round(r2 + (r1 - r2) * normalized);
	const g = Math.round(g2 + (g1 - g2) * normalized);
	const b = Math.round(b2 + (b1 - b2) * normalized);

	return `rgb(${r},${g},${b})`;
};
export const showResultsScreen = (stats: stats) => {
	// Zen mod allows stopping at any time. If the run is empty show main screen insteada
	if (stats.mods.includes("ZE") && stats.longestCombo < 1) {
		setScreen(Screen.MAIN);
		return;
	}
	// Clear old results
	resultNotes.children[0].innerHTML = "";
	resultNotes.children[1].innerHTML = "";
	performances = [];
	// Switch screen to test
	setScreen(Screen.RESULTS);

	stats.timestamp = Date.now();

	const rank = calculateRank(stats);
	rankText.style = rank.style;
	rankText.innerHTML = rank.string;
	if (stats.failed) {
		addResultNote({ type: "note", text: "You failed" });
		return;
	}

	// Generate results
	let hardest: { character: string; mistakes: number } = { character: "none", mistakes: 0 };

	for (const key of Object.keys(stats.characters)) {
		const character = convertCharacter("letter", key) as string;
		const stat = stats.characters[key];
		if (!stat.encounters) stat.encounters = 1;
		const safeTime = Math.max(stat.time / 1000 / (stats.mods.includes("ZE") ? stat.encounters! : 1), 0.02); // just in case someone is fast enough :skull:
		const mistakes = stat.mistakes;
		const weight = Math.pow(safeTime, 1 + Math.pow(mistakes, 1.5));
		// Weight formula: Time^(1+(Mistakes^1.5))
		// More weight = worse result
		performances.push({
			key,
			character: character,
			mistakes,
			time: safeTime,
			weight,
			encounters: stat.encounters,
		});
		// While we are going through all the characters find the one with most mistakes
		if (stat.mistakes > hardest.mistakes) hardest = { character: character, mistakes: stat.mistakes };
	}
	storeRun(stats, performances, currentAlphabet);
	const weights = performances.map((p) => p.weight);
	const minWeight = Math.min(...weights);
	const maxWeight = Math.max(5, ...weights); // Be generous, everything that's fast enough SHOULD be green
	performances.sort((a, b) => a.weight - b.weight);
	for (const perf of performances) {
		const normalized = normalize(perf.weight, maxWeight, minWeight);
		const color = getColor(normalized);
		const acc = (((perf.encounters - perf.mistakes) / perf.encounters) * 100).toFixed(2);
		const accDetailed = perf.mistakes > 0 ? `(${perf.encounters - perf.mistakes}/${perf.encounters})` : "";
		if (stats.mods.includes("ZE")) {
			// Show average time instead if Zen is enabled
			addResultNote({ type: "character", text: `${perf.character}:  ~${perf.time.toFixed(2)}s ${acc}% ${accDetailed}`, color: color, isPerfect: perf.mistakes <= 0 });
		} else {
			addResultNote({ type: "character", text: `${perf.character}: ${perf.time.toFixed(2)}s ${perf.mistakes > 0 ? `(${perf.mistakes}✗)` : ""}`, color: color, isPerfect: perf.mistakes <= 0 });
		}
	}
	addResultNote({ type: "note", text: `Max combo: ${stats.longestCombo} ${hardest.mistakes == 0 ? "(Full combo)" : ""}` });
	addResultNote({ type: "note", text: `Accuracy: ${accuracyText.innerHTML}` });

	// Results: character with most mistakes
	if (hardest.mistakes > 0) {
		addResultNote({ type: "note", text: `Hardest character: ${convertCharacter("letter", hardest.character)} (${hardest.mistakes + 1} tries)` });
	}
};
