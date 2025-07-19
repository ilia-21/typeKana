import type { stats } from "./actualTest";
import { heatmapTemplate } from "./consts";
import { getColor, normalize, type characterPerformance } from "./resultsScreen";
import { convertCharacter, loadRuns } from "./utils";

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
const findWeights = (history: run[]): { max: number; min: number } => {
	//@ts-ignore
	let weights = [].concat(...history.map((h) => h.performance.map((p) => p.weight)));
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
const buildHeatmap = (data: heatmapData[], alphabet: string) => {
	const table = document.createElement("div");
	//Empty element to shift header
	table.prepend(document.createElement("div"));
	heatmapTemplate.forEach((row: string[], i: number) => {
		if (i == 0) {
			// top header
			row.forEach((cell: string, j: number) => {
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
	document.getElementById("statsHeatmap")!.appendChild(table);
};
export const buildStats = () => {
	const data = loadRuns();
	console.log(findWeights(data));
	buildHeatmap(calculateHeatmap(data, "hiragana"), "hiragana");
	buildHeatmap(calculateHeatmap(data, "katakana"), "katakana");
};
