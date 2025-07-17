import type { mod } from "./actualTest";

export interface letterPair {
	romanji: string;
	letter: string;
}
export interface letterSubGroup {
	title: string;
	letters: letterPair[];
}
export interface letterGroup {
	title: string;
	groups: letterSubGroup[];
}
export interface alphabets {
	[title: string]: letterGroup[];
}
export const alphabets: alphabets = {
	hiragana: [
		{
			title: "Main",
			groups: [
				{
					title: "a",
					letters: [
						{
							romanji: "a",
							letter: "あ",
						},
						{
							romanji: "i",
							letter: "い",
						},
						{
							romanji: "u",
							letter: "う",
						},
						{
							romanji: "e",
							letter: "え",
						},
						{
							romanji: "o",
							letter: "お",
						},
					],
				},
				{
					title: "k-",
					letters: [
						{
							romanji: "ka",
							letter: "か",
						},
						{
							romanji: "ki",
							letter: "き",
						},
						{
							romanji: "ku",
							letter: "く",
						},
						{
							romanji: "ke",
							letter: "け",
						},
						{
							romanji: "ko",
							letter: "こ",
						},
					],
				},
				{
					title: "s-",
					letters: [
						{
							romanji: "sa",
							letter: "さ",
						},
						{
							romanji: "shi",
							letter: "し",
						},
						{
							romanji: "su",
							letter: "す",
						},
						{
							romanji: "se",
							letter: "せ",
						},
						{
							romanji: "so",
							letter: "そ",
						},
					],
				},
				{
					title: "t-",
					letters: [
						{
							romanji: "ta",
							letter: "た",
						},
						{
							romanji: "chi",
							letter: "ち",
						},
						{
							romanji: "tsu",
							letter: "つ",
						},
						{
							romanji: "te",
							letter: "て",
						},
						{
							romanji: "to",
							letter: "と",
						},
					],
				},
				{
					title: "n-",
					letters: [
						{
							romanji: "na",
							letter: "な",
						},
						{
							romanji: "ni",
							letter: "に",
						},
						{
							romanji: "nu",
							letter: "ぬ",
						},
						{
							romanji: "ne",
							letter: "ね",
						},
						{
							romanji: "no",
							letter: "の",
						},
					],
				},
				{
					title: "h-",
					letters: [
						{
							romanji: "ha",
							letter: "は",
						},
						{
							romanji: "hi",
							letter: "ひ",
						},
						{
							romanji: "fu",
							letter: "ふ",
						},
						{
							romanji: "he",
							letter: "へ",
						},
						{
							romanji: "ho",
							letter: "ほ",
						},
					],
				},
				{
					title: "m-",
					letters: [
						{
							romanji: "ma",
							letter: "ま",
						},
						{
							romanji: "mi",
							letter: "み",
						},
						{
							romanji: "mu",
							letter: "む",
						},
						{
							romanji: "me",
							letter: "め",
						},
						{
							romanji: "mo",
							letter: "も",
						},
					],
				},
				{
					title: "y-",
					letters: [
						{
							romanji: "ya",
							letter: "や",
						},
						{
							romanji: "yu",
							letter: "ゆ",
						},
						{
							romanji: "yo",
							letter: "よ",
						},
					],
				},
				{
					title: "r-",
					letters: [
						{
							romanji: "ra",
							letter: "ら",
						},
						{
							romanji: "ri",
							letter: "り",
						},
						{
							romanji: "ru",
							letter: "る",
						},
						{
							romanji: "re",
							letter: "れ",
						},
						{
							romanji: "ro",
							letter: "ろ",
						},
					],
				},
				{
					title: "w-",
					letters: [
						{
							romanji: "wa",
							letter: "わ",
						},
						{
							romanji: "wo",
							letter: "を",
						},
					],
				},
				{
					title: "n",
					letters: [
						{
							romanji: "n",
							letter: "ん",
						},
					],
				},
			],
		},
		{
			title: "Modified",
			groups: [
				{
					title: "g-",
					letters: [
						{
							romanji: "ga",
							letter: "が",
						},
						{
							romanji: "gi",
							letter: "ぎ",
						},
						{
							romanji: "gu",
							letter: "ぐ",
						},
						{
							romanji: "ge",
							letter: "げ",
						},
						{
							romanji: "go",
							letter: "ご",
						},
					],
				},
				{
					title: "z-",
					letters: [
						{
							romanji: "za",
							letter: "ざ",
						},
						{
							romanji: "zi",
							letter: "じ",
						},
						{
							romanji: "zu",
							letter: "ず",
						},
						{
							romanji: "ze",
							letter: "ぜ",
						},
						{
							romanji: "zo",
							letter: "ぞ",
						},
					],
				},
				{
					title: "d-",
					letters: [
						{
							romanji: "da",
							letter: "だ",
						},
						{
							romanji: "di",
							letter: "ぢ",
						},
						{
							romanji: "du",
							letter: "づ",
						},
						{
							romanji: "de",
							letter: "で",
						},
						{
							romanji: "do",
							letter: "ど",
						},
					],
				},
				{
					title: "b-",
					letters: [
						{
							romanji: "ba",
							letter: "ば",
						},
						{
							romanji: "bi",
							letter: "び",
						},
						{
							romanji: "bu",
							letter: "ぶ",
						},
						{
							romanji: "be",
							letter: "べ",
						},
						{
							romanji: "bo",
							letter: "ぼ",
						},
					],
				},
				{
					title: "p-",
					letters: [
						{
							romanji: "pa",
							letter: "ぱ",
						},
						{
							romanji: "pi",
							letter: "ぴ",
						},
						{
							romanji: "pu",
							letter: "ぷ",
						},
						{
							romanji: "pe",
							letter: "ぺ",
						},
						{
							romanji: "po",
							letter: "ぽ",
						},
					],
				},
			],
		},
		{
			title: "Combined",
			groups: [
				{
					title: "ky-",
					letters: [
						{
							romanji: "kya",
							letter: "きゃ",
						},
						{
							romanji: "kyu",
							letter: "きゅ",
						},
						{
							romanji: "kyo",
							letter: "きょ",
						},
					],
				},
				{
					title: "sh-",
					letters: [
						{
							romanji: "sha",
							letter: "しゃ",
						},
						{
							romanji: "shu",
							letter: "しゅ",
						},
						{
							romanji: "sho",
							letter: "しょ",
						},
					],
				},
				{
					title: "ch-",
					letters: [
						{
							romanji: "cha",
							letter: "ちゃ",
						},
						{
							romanji: "chu",
							letter: "ちゅ",
						},
						{
							romanji: "cho",
							letter: "ちょ",
						},
					],
				},
				{
					title: "ny-",
					letters: [
						{
							romanji: "nya",
							letter: "にゃ",
						},
						{
							romanji: "nyu",
							letter: "にゅ",
						},
						{
							romanji: "nyo",
							letter: "にょ",
						},
					],
				},
				{
					title: "hy-",
					letters: [
						{
							romanji: "hya",
							letter: "ひゃ",
						},
						{
							romanji: "hyu",
							letter: "ひゅ",
						},
						{
							romanji: "hyo",
							letter: "ひょ",
						},
					],
				},
				{
					title: "my-",
					letters: [
						{
							romanji: "mya",
							letter: "みゃ",
						},
						{
							romanji: "myu",
							letter: "みゅ",
						},
						{
							romanji: "myo",
							letter: "みょ",
						},
					],
				},
				{
					title: "ry-",
					letters: [
						{
							romanji: "rya",
							letter: "りゃ",
						},
						{
							romanji: "ryu",
							letter: "りゅ",
						},
						{
							romanji: "ryo",
							letter: "りょ",
						},
					],
				},
				{
					title: "gy-",
					letters: [
						{
							romanji: "gya",
							letter: "ぎょ",
						},
						{
							romanji: "gyu",
							letter: "ぎゅ",
						},
						{
							romanji: "gyo",
							letter: "ぎょ",
						},
					],
				},
				{
					title: "jy-",
					letters: [
						{
							romanji: "jya",
							letter: "じゃ",
						},
						{
							romanji: "jyu",
							letter: "じゅ",
						},
						{
							romanji: "jyo",
							letter: "じょ",
						},
					],
				},
				{
					title: "by-",
					letters: [
						{
							romanji: "bya",
							letter: "びゃ",
						},
						{
							romanji: "byu",
							letter: "びゅ",
						},
						{
							romanji: "byo",
							letter: "びょ",
						},
					],
				},
				{
					title: "py-",
					letters: [
						{
							romanji: "pya",
							letter: "ぴゃ",
						},
						{
							romanji: "pyu",
							letter: "ぴゅ",
						},
						{
							romanji: "pyo",
							letter: "ぴょ",
						},
					],
				},
			],
		},
	],
	katakana: [
		{
			title: "Main",
			groups: [
				{
					title: "a",
					letters: [
						{
							letter: "ア",
							romanji: "a",
						},
						{
							letter: "イ",
							romanji: "i",
						},
						{
							letter: "ウ",
							romanji: "u",
						},
						{
							letter: "エ",
							romanji: "e",
						},
						{
							letter: "オ",
							romanji: "o",
						},
					],
				},
				{
					title: "k-",
					letters: [
						{
							letter: "カ",
							romanji: "ka",
						},
						{
							letter: "キ",
							romanji: "ki",
						},
						{
							letter: "ク",
							romanji: "ku",
						},
						{
							letter: "ケ",
							romanji: "ke",
						},
						{
							letter: "コ",
							romanji: "ko",
						},
					],
				},
				{
					title: "s-",
					letters: [
						{
							letter: "サ",
							romanji: "sa",
						},
						{
							letter: "シ",
							romanji: "shi",
						},
						{
							letter: "ス",
							romanji: "su",
						},
						{
							letter: "セ",
							romanji: "se",
						},
						{
							letter: "ソ",
							romanji: "so",
						},
					],
				},
				{
					title: "t-",
					letters: [
						{
							letter: "タ",
							romanji: "ta",
						},
						{
							letter: "チ",
							romanji: "chi",
						},
						{
							letter: "ツ",
							romanji: "tsu",
						},
						{
							letter: "テ",
							romanji: "te",
						},
						{
							letter: "ト",
							romanji: "to",
						},
					],
				},
				{
					title: "n-",
					letters: [
						{
							letter: "ナ",
							romanji: "na",
						},
						{
							letter: "ニ",
							romanji: "ni",
						},
						{
							letter: "ヌ",
							romanji: "nu",
						},
						{
							letter: "ネ",
							romanji: "ne",
						},
						{
							letter: "ノ",
							romanji: "no",
						},
					],
				},
				{
					title: "h-",
					letters: [
						{
							letter: "ハ",
							romanji: "ha",
						},
						{
							letter: "ヒ",
							romanji: "hi",
						},
						{
							letter: "フ",
							romanji: "fu",
						},
						{
							letter: "ヘ",
							romanji: "he",
						},
						{
							letter: "ホ",
							romanji: "ho",
						},
					],
				},
				{
					title: "m-",
					letters: [
						{
							letter: "マ",
							romanji: "ma",
						},
						{
							letter: "ミ",
							romanji: "mi",
						},
						{
							letter: "ム",
							romanji: "mu",
						},
						{
							letter: "メ",
							romanji: "me",
						},
						{
							letter: "モ",
							romanji: "mo",
						},
					],
				},
				{
					title: "y-",
					letters: [
						{
							letter: "ヤ",
							romanji: "ya",
						},
						{
							letter: "ユ",
							romanji: "yu",
						},
						{
							letter: "ヨ",
							romanji: "yo",
						},
					],
				},
				{
					title: "r-",
					letters: [
						{
							letter: "ラ",
							romanji: "ra",
						},
						{
							letter: "リ",
							romanji: "ri",
						},
						{
							letter: "ル",
							romanji: "ru",
						},
						{
							letter: "レ",
							romanji: "re",
						},
						{
							letter: "ロ",
							romanji: "ro",
						},
					],
				},
				{
					title: "w-",
					letters: [
						{
							letter: "ワ",
							romanji: "wa",
						},
						{
							letter: "ヲ",
							romanji: "wo",
						},
					],
				},
				{
					title: "n",
					letters: [
						{
							letter: "ン",
							romanji: "n",
						},
					],
				},
			],
		},
		{
			title: "Modified",
			groups: [
				{
					title: "g-",
					letters: [
						{
							letter: "ガ",
							romanji: "ga",
						},
						{
							letter: "ギ",
							romanji: "gi",
						},
						{
							letter: "グ",
							romanji: "gu",
						},
						{
							letter: "ゲ",
							romanji: "ge",
						},
						{
							letter: "ゴ",
							romanji: "go",
						},
					],
				},
				{
					title: "z-",
					letters: [
						{
							letter: "ザ",
							romanji: "za",
						},
						{
							letter: "ジ",
							romanji: "zi",
						},
						{
							letter: "ズ",
							romanji: "zu",
						},
						{
							letter: "ゼ",
							romanji: "ze",
						},
						{
							letter: "ゾ",
							romanji: "zo",
						},
					],
				},
				{
					title: "d-",
					letters: [
						{
							letter: "ダ",
							romanji: "da",
						},
						{
							letter: "ヂ",
							romanji: "di",
						},
						{
							letter: "ヅ",
							romanji: "du",
						},
						{
							letter: "デ",
							romanji: "de",
						},
						{
							letter: "ド",
							romanji: "do",
						},
					],
				},
				{
					title: "b-",
					letters: [
						{
							letter: "バ",
							romanji: "ba",
						},
						{
							letter: "ビ",
							romanji: "bi",
						},
						{
							letter: "ブ",
							romanji: "bu",
						},
						{
							letter: "ベ",
							romanji: "be",
						},
						{
							letter: "ボ",
							romanji: "bo",
						},
					],
				},
				{
					title: "p-",
					letters: [
						{
							letter: "パ",
							romanji: "pa",
						},
						{
							letter: "ピ",
							romanji: "pi",
						},
						{
							letter: "プ",
							romanji: "pu",
						},
						{
							letter: "ペ",
							romanji: "pe",
						},
						{
							letter: "ポ",
							romanji: "po",
						},
					],
				},
			],
		},
		{
			title: "Combined",
			groups: [
				{
					title: "ky-",
					letters: [
						{
							letter: "キャ",
							romanji: "kya",
						},
						{
							letter: "キュ",
							romanji: "kyu",
						},
						{
							letter: "キョ",
							romanji: "kyo",
						},
					],
				},
				{
					title: "sh-",
					letters: [
						{
							letter: "シャ",
							romanji: "sha",
						},
						{
							letter: "シュ",
							romanji: "shu",
						},
						{
							letter: "ショ",
							romanji: "sho",
						},
					],
				},
				{
					title: "ch-",
					letters: [
						{
							letter: "チャ",
							romanji: "cha",
						},
						{
							letter: "チュ",
							romanji: "chu",
						},
						{
							letter: "チョ",
							romanji: "cho",
						},
					],
				},
				{
					title: "ny-",
					letters: [
						{
							letter: "ニャ",
							romanji: "nya",
						},
						{
							letter: "ニュ",
							romanji: "nyu",
						},
						{
							letter: "ニョ",
							romanji: "nyo",
						},
					],
				},
				{
					title: "hy-",
					letters: [
						{
							letter: "ヒャ",
							romanji: "hya",
						},
						{
							letter: "ヒュ",
							romanji: "hyu",
						},
						{
							letter: "ヒョ",
							romanji: "hyo",
						},
					],
				},
				{
					title: "my-",
					letters: [
						{
							letter: "ミャ",
							romanji: "mya",
						},
						{
							letter: "ミュ",
							romanji: "myu",
						},
						{
							letter: "ミョ",
							romanji: "myo",
						},
					],
				},
				{
					title: "ry-",
					letters: [
						{
							letter: "リャ",
							romanji: "rya",
						},
						{
							letter: "リュ",
							romanji: "ryu",
						},
						{
							letter: "リョ",
							romanji: "ryo",
						},
					],
				},
				{
					title: "gy-",
					letters: [
						{
							letter: "ギャ",
							romanji: "gya",
						},
						{
							letter: "ギュ",
							romanji: "gyu",
						},
						{
							letter: "ギョ",
							romanji: "gyo",
						},
					],
				},
				{
					title: "jy-",
					letters: [
						{
							letter: "jヤ",
							romanji: "jya",
						},
						{
							letter: "jユ",
							romanji: "jyu",
						},
						{
							letter: "jヨ",
							romanji: "jyo",
						},
					],
				},
				{
					title: "by-",
					letters: [
						{
							letter: "ビャ",
							romanji: "bya",
						},
						{
							letter: "ビュ",
							romanji: "byu",
						},
						{
							letter: "ビョ",
							romanji: "byo",
						},
					],
				},
				{
					title: "py-",
					letters: [
						{
							letter: "ピャ",
							romanji: "pya",
						},
						{
							letter: "ピュ",
							romanji: "pyu",
						},
						{
							letter: "ピョ ",
							romanji: "pyo",
						},
					],
				},
			],
		},
	],
};
interface cheerStrings {
	negative: string[];
	positive: string[];
}
export const cheerStrings: cheerStrings = {
	negative: ["Nope!", "Try again!", "Not like this!"],
	positive: ["Good job!", "Correct!", "Nice!"],
};
export let currentAlphabetIndex = 0;
export let currentAlphabet = Object.keys(alphabets)[currentAlphabetIndex];
// Sorry for putting this function here, I don't know how else I can do it without screwing up whole code
export const changeAlphabetIndex = (i: number) => {
	currentAlphabetIndex = i;
	currentAlphabet = Object.keys(alphabets)[currentAlphabetIndex];
};
export const mods: { short: mod; title: string; description: string }[] = [
	{ short: "TT", title: "Time Trials", description: "Limit how much time you have to name a character. 0 to disable" },
	{ short: "KT", title: "Keep Trying", description: "Retry each character until you name it correctly" },
	{ short: "PF", title: "Perfect", description: "Restart if you make a single mistake" },
	{ short: "R", title: "Random", description: "Shuffle characters" },
	{ short: "ZE", title: "Zen", description: "Just type the charactes, forever. Always random" },
];
export const comboMilestones: number[] = [10, 25, 50, 75, 100];
