const alphabets = {
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
							romanji: "si",
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
							letter: "か",
						},
						{
							romanji: "hi",
							letter: "ひ",
						},
						{
							romanji: "hu",
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
	],
};
const cheerStrings = {
	negative: ["Nope!", "Try again!", "Not like this!"],
	positive: ["Good job!", "Correct!", "Nice!"],
};
let currentAlphabet = "hiragana";
