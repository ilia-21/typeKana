import type { stats } from "./actualTest";
import { alphabets, heatmapTemplate } from "./consts";
import { getColor, normalize, type characterPerformance } from "./resultsScreen";
import { calculateRank, convertCharacter, deleteRun, getProfile, loadRuns, showPopup } from "./utils";

export interface run extends stats {
	// Store pre-calculated performance stats
	performance: characterPerformance[];
	alphabet: string;
}
interface heatmapData {
	alphabet: string;
	data: heatmapEntry[];
}
interface heatmapEntry {
	amount: number;
	value: number;
	character: string;
}
const findCharacter = (character: string, data: heatmapData) => {
	return data.data.find((d) => d.character === character);
};
const findWeights = (why: "run" | "heatmapValue" | "heatmapAmount", history: run | heatmapData): { max: number; min: number } => {
	let weights: number[] = [];
	switch (why) {
		case "run":
			weights = weights.concat(...(history as run).performance.map((p) => p.weight));
			break;
		case "heatmapValue":
			weights = weights.concat(...(history as heatmapData).data.map((h) => h.value));
			break;
		case "heatmapAmount":
			weights = weights.concat(...(history as heatmapData).data.map((h) => h.amount));
			break;
	}
	let minWeight = Math.min(...weights);
	// Doing this so the lowest characters don't have completely transparent bg
	if (why == "heatmapAmount") minWeight = minWeight * 0.75;
	const maxWeight = Math.max(...weights);
	return { max: maxWeight, min: minWeight };
};
const calculateHeatmap = (history: run[], alphabet: string): heatmapData => {
	const heatmapData: heatmapData = {
		alphabet: alphabet,
		data: [],
	};
	history.forEach((run: run) => {
		if (run.longestCombo == 0) {
			// clear empty runs
			deleteRun(run.timestamp);
			return;
		}
		if (run.alphabet != alphabet) return;
		run.performance.forEach((character: characterPerformance) => {
			const existingCharacter = heatmapData.data.find((data) => data.character === convertCharacter("romanji", character.character, run.alphabet));
			if (existingCharacter) {
				existingCharacter.amount++;
				existingCharacter.value += character.weight;
			} else {
				heatmapData.data.push({
					amount: 1,
					value: character.weight,
					character: convertCharacter("romanji", character.character, run.alphabet),
				});
			}
		});
	});
	const weightsA = findWeights("heatmapValue", heatmapData);
	const weightsB = findWeights("heatmapAmount", heatmapData);
	heatmapData.data.forEach((data: heatmapEntry) => {
		data.value = normalize(data.value, weightsA.max, weightsA.min);
		data.amount = normalize(data.amount, weightsB.max, weightsB.min);
	});
	return heatmapData;
};
const buildHeatmap = (data: heatmapData, elementID: string) => {
	const table = document.createElement("div");
	const alphabet = data.alphabet;
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
				const scale = character ? 1 + Math.log10(character.amount) : 1;
				color = character ? getColor(character.value) : "var(--surface-2)";
				td.style.transform = `scale(${Math.max(scale, 0.1)})`;
				td.innerHTML = convertCharacter("letter", cell, alphabet);
				if (character?.value == 1) td.style.boxShadow = "0 0 10px var(--red)";
				if (character?.value == 0) td.style.boxShadow = "0 0 10px var(--green)";
				if (character) td.title = `value:${1 - character.value}, encounter rate:${character.amount}`;
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
	const weights = findWeights("run", run);
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

	document.getElementById("statsRuns")!.prepend(runElement);
};
const drawGraph = (data: heatmapData[]) => {
	const graph = document.getElementById("graph") as HTMLCanvasElement;
	debugger;
	graph.width = graph.parentElement!.parentElement!.clientWidth;
	graph.height = graph.width;
	const ctx = graph.getContext("2d");

	data.forEach((a) => {
		a.data.forEach((d) => {
			d.value = 1 - d.value;
			const x = graph.height * 0.05 + d.amount * graph.width * 0.9;
			const y = graph.height * 0.05 + (1 - d.value) * graph.height * 0.9;
			ctx!.fillStyle = getColor((1 - d.value + 1 - d.amount) * 0.5);
			ctx!.fillText(convertCharacter("letter", d.character, a.alphabet), x, y);
		});
	});
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
	const hiraganaHeatmap = calculateHeatmap(data, "hiragana");
	const katakanaHeatmap = calculateHeatmap(data, "katakana");
	buildHeatmap(hiraganaHeatmap, "statsHeatmap");
	buildHeatmap(katakanaHeatmap, "statsHeatmap");
	data.forEach((e) => drawRun(e));
	buildProfile();
	drawGraph([hiraganaHeatmap, katakanaHeatmap]);
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
