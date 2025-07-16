import type { stats } from "./actualTest";
import { selectedGroups } from "./startPage";

interface rank {
	text: string;
	longText?: string;
	style?: string;
	condition: (stats: stats) => boolean;
}
const calculateAccuracy = (stats: stats) => {
	let accuracy = 0;
	for (const h of stats.history) {
		accuracy += h.isCorrect ? 1 : 0;
	}
	return (accuracy / stats.history.length) * 100;
};
// Order of ranks is important!
export const ranks: rank[] = [
	{
		text: "F",
		longText: "Fail",
		condition: (stats: stats) => {
			return stats.failed as boolean;
		},
	},
	{
		text: "",
		longText: "",
		condition: (stats: stats) => {
			//@ts-ignore
			if (window.forceX) return true;
			if (selectedGroups.size < 13) return false;
			for (const stat of Object.keys(stats.characters)) {
				if (stats.characters[stat].mistakes > 0) return false;
			}
			return true;
		},
	},
	{
		text: "SS",
		longText: "Perfect",
		condition: (stats: stats) => {
			for (const stat of Object.keys(stats.characters)) {
				if (stats.characters[stat].mistakes > 0) return false;
			}
			return true;
		},
	},
	{
		text: "S",
		longText: "Almost there",
		condition: (stats: stats) => {
			return calculateAccuracy(stats) > 95;
		},
	},
	{
		text: "A",
		longText: "Good job",
		condition: (stats: stats) => {
			return calculateAccuracy(stats) > 90;
		},
	},
	{
		text: "B",
		longText: "Keep going",
		condition: (stats: stats) => {
			return calculateAccuracy(stats) > 80;
		},
	},
	{
		text: "C",
		longText: "I'm done with long text for now",
		condition: (stats: stats) => {
			return calculateAccuracy(stats) > 70;
		},
	},
	{
		text: "D",
		longText: "I'm done with long text for now",
		condition: () => {
			return true;
		},
	},
];
export const rankSuffix: rank[] = [
	{
		text: "☆",
		condition: (stats: stats) => {
			if (stats.mods?.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "+",
		condition: (stats: stats) => {
			if (stats.mods?.includes("KT")) return true;
			return false;
		},
	},
	{
		text: "꩜",
		condition: (stats: stats) => {
			if (stats.mods?.includes("R")) return true;
			return false;
		},
	},
];
export const rankPrefix: rank[] = [
	{
		text: "Ascended",
		style: "font-size: 2.5rem;font-weight: 900;letter-spacing: 2px;text-transform: uppercase;background: linear-gradient(270deg, #00ffe0, #ff00c8, #ffd700, #00ffe0);background-size: 800% 800%;-webkit-background-clip: text;-webkit-text-fill-color: transparent;animation: pulseGradient 6s ease infinite, glowPulse 2s ease-in-out infinite;text-shadow:0 0 10px rgba(255,255,255,0.9),0 0 20px rgba(0,255,255,0.6),0 0 30px rgba(255,0,255,0.6);border: 2px solid rgba(255,255,255,0.2);border-radius: 12px;padding: 0.5rem 1rem;box-shadow:0 0 15px rgba(255,255,255,0.1),0 0 25px rgba(0,255,255,0.3);display: inline-block;",
		condition: (stats: stats) => {
			//@ts-ignore
			if (window.forceX) return true;
			if (selectedGroups.size >= 13 && stats.timeTrials && stats.timeTrials <= 1 && stats.mods.includes("PF") && stats.mods.includes("R") && stats.mods.includes("KT")) return true;
			return false;
		},
	},
	{
		text: "Divine",
		style: "font-weight: 800;background: linear-gradient(90deg, #ff6ec4, #7873f5, #4ac29a);-webkit-background-clip: text;-webkit-text-fill-color: transparent;animation: shine 3s infinite linear;text-shadow: 0 0 8px rgba(255,255,255,0.6);",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 2 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Mythical",
		style: "color: crimson; font-weight: bold; text-shadow: 0 0 8px red;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 2.5 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Godspeed",
		style: "color: #ff4081; font-style: italic; text-shadow: 0 0 5px #ff4081;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 3 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Elite",
		style: "color: gold; font-weight: bold; text-shadow: 1px 1px 4px #b8860b;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 4 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Sharp",
		style: "color: #4caf50; font-weight: 600; text-shadow: 0 0 5px #4caf50;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 5 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Swift",
		style: "color: #00bcd4; font-style: italic;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 7 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Quick",
		style: "color: #5bc0de; font-weight: bold;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 9 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
	{
		text: "Casual",
		style: "color: gray;",
		condition: (stats: stats) => {
			if (stats.timeTrials && stats.timeTrials <= 10 && stats.mods.includes("PF")) return true;
			return false;
		},
	},
];
