import type { stats } from "./actualTest";
import { alphabets, heatmapTemplate } from "./consts";
import { getColor, normalize, type characterPerformance } from "./resultsScreen";
import { calculateRank, convertCharacter, getProfile, loadRuns, showPopup } from "./utils";

export interface run extends stats {
	// Store pre-calculated performance stats
	performance: characterPerformance[];
	alphabet: string;
}
interface heatmapData {
	amount: number;
	value: number;
	character: string;
}
const findCharacter = (character: string, data: heatmapData[]) => {
	return data.find((d) => d.character === character);
};
const findWeights = (history: run[] | run): { max: number; min: number } => {
	//@ts-ignore
	let weights: number[] = [];
	if ((history as run[])[0]) {
		weights = weights.concat(...(history as run[]).map((h) => h.performance.map((p) => p.weight)));
	} else {
		weights = weights.concat(...(history as run).performance.map((p) => p.weight));
	}
	const minWeight = Math.min(...weights);
	const maxWeight = Math.max(5, ...weights);
	return { max: maxWeight, min: minWeight };
};
const calculateHeatmap = (history: run[], alphabet: string): heatmapData[] => {
	const heatmapData: heatmapData[] = [];
	history.forEach((run: run) => {
		if (run.alphabet != alphabet) return;
		run.performance.forEach((character: characterPerformance) => {
			const existingCharacter = heatmapData.find((data: heatmapData) => data.character === character.character);
			if (existingCharacter) {
				existingCharacter.amount++;
				existingCharacter.value += character.weight;
			} else {
				heatmapData.push({
					amount: 1,
					value: Math.round(character.weight * 100) / 100,
					character: convertCharacter("romanji", character.character, run.alphabet),
				});
			}
		});
	});
	const weights = findWeights(history);
	heatmapData.forEach((data: heatmapData) => {
		data.value = data.value / data.amount;
		data.value = normalize(data.value, weights.max, weights.min);
	});
	console.log(heatmapData);
	return heatmapData;
};
const buildHeatmap = (data: heatmapData[], alphabet: string, elementID: string) => {
	const table = document.createElement("div");
	//Empty element to shift header
	table.prepend(document.createElement("div"));
	heatmapTemplate.forEach((row: string[], i: number) => {
		if (i == 0) {
			// top header
			row.forEach((cell: string) => {
				const td = document.createElement("div");
				td.classList.add("heatmapHeader");
				td.innerHTML = cell.charAt(0);
				table.append(td);
			});
		}
		row.forEach((cell: string, j: number) => {
			if (j == 0) {
				// side header
				const td = document.createElement("div");
				td.classList.add("heatmapHeader");
				td.innerHTML = row[0].charAt(0);
				table.append(td);
			}
			const td = document.createElement("div");
			let color = "transparent";
			td.innerHTML = "";
			if (cell != "") {
				const character = findCharacter(cell, data);
				color = character ? getColor(character.value) : "var(--surface-2)";
				td.innerHTML = convertCharacter("letter", cell, alphabet);
				if (character) td.title = `` + character.value;
			}
			td.style.backgroundColor = color;
			table.append(td);
		});
	});
	// Will add heatmaps for each run later
	document.getElementById(elementID)!.appendChild(table);
};
const drawRun = (run: run) => {
	const runElement = document.createElement("div");
	runElement.classList.add("run");
	const timestamp = document.createElement("p");
	timestamp.classList.add("runTimestamp");
	timestamp.innerHTML = new Date(run.timestamp).toLocaleString("en-GB");
	runElement.append(timestamp);
	const alphabet = document.createElement("p");
	alphabet.classList.add("runAlphabet");
	alphabet.innerHTML = alphabets[run.alphabet][0].groups[0].letters[0].letter;
	runElement.append(alphabet);
	const details = document.createElement("div");
	details.classList.add("runDetails");
	const weights = findWeights(run);
	run.performance.forEach((p) => {
		const normalied = normalize(p.weight, weights.max, weights.min);
		const detail = document.createElement("p");
		detail.style.color = getColor(normalied);
		detail.innerHTML = p.character;
		detail.title = `~${p.time}s`;
		if (p.mistakes > 0) detail.title = `X${p.mistakes} ` + detail.title;
		details.append(detail);
	});
	runElement.append(details);
	const rank = document.createElement("p");
	rank.classList.add("runRank");
	const calculatedRank = calculateRank(run, true);
	rank.innerHTML = calculatedRank.string;
	rank.style = calculatedRank.style;
	runElement.append(rank);
	const stats = document.createElement("p");
	stats.classList.add("runStats");
	let acc = 0;
	run.history.forEach((r) => {
		acc += r.isCorrect ? 1 : 0;
	});
	acc = (acc / run.history.length) * 100;
	stats.innerHTML = `${acc.toFixed(2)}% ${run.longestCombo}x`;
	runElement.append(stats);

	document.getElementById("statsRuns")!.appendChild(runElement);
};
const clearStats = () => {
	document.getElementById("statsHeatmap")!.innerHTML = "";
	document.getElementById("statsRuns")!.innerHTML = "";
};
export const buildStatspage = () => {
	if (!localStorage.getItem("statsInfoSeen")) {
		showPopup(document.getElementById("statsNotice") as HTMLDivElement);
		localStorage.setItem("statsInfoSeen", "true");
	}
	clearStats();
	const data = loadRuns();
	console.log(findWeights(data));
	buildHeatmap(calculateHeatmap(data, "hiragana"), "hiragana", "statsHeatmap");
	buildHeatmap(calculateHeatmap(data, "katakana"), "katakana", "statsHeatmap");
	data.forEach((e) => drawRun(e));
	buildProfile();
};
const buildProfile = () => {
	if (localStorage.getItem("profile")) {
		const profile = getProfile();
		const pfp = document.getElementById("statsPfp") as HTMLImageElement;
		pfp.src = profile.pfp;
		const nickname = document.getElementById("statsNickname") as HTMLInputElement;
		nickname.value = profile.nickname;
		const slogan = document.getElementById("statsSlogan") as HTMLInputElement;
		slogan.value = profile.slogan;
	}
};
