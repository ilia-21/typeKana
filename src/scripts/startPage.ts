import { alphabets, mods, type letterGroup, type letterSubGroup } from "./consts";
import { groupKeybinds, subGroupKeybinds } from "./keybinds";

export const selectedGroups = new Set();

function createSubGroupElement(subGroup: letterSubGroup) {
	const toggleSubGroup = () => {
		const isSelected = subGroupDiv.classList.toggle("selected");
		if (isSelected) {
			selectedGroups.add(subGroup.title);
		} else {
			selectedGroups.delete(subGroup.title);
			subGroupDiv.parentElement!.classList.remove("selected");
		}
	};
	const subGroupDiv = document.createElement("div")!;
	subGroupDiv.classList.add("alphabetSubGroup");

	const subGroupTitle = document.createElement("p");
	subGroupTitle.textContent = `${subGroup.title} (${subGroup.letters[0].letter})`;
	subGroupDiv.appendChild(subGroupTitle);

	subGroupDiv.addEventListener("click", () => {
		toggleSubGroup();
	});
	subGroupKeybinds[subGroup.title.charAt(0)] = toggleSubGroup;

	return subGroupDiv;
}

function createGroupElement(group: letterGroup, index: number) {
	const toggleGroup = () => {
		const isSelected = groupDiv.classList.toggle("selected");
		for (const sg of groupDiv.children) {
			if (!sg.classList.contains("alphabetSubGroup")) continue;

			if (isSelected) {
				sg.classList.add("selected");
				selectedGroups.add(sg.children[0].innerHTML.split(" ")[0]);
			} else {
				sg.classList.remove("selected");
				selectedGroups.delete(sg.children[0].innerHTML.split(" ")[0]);
			}
		}
	};
	const groupDiv = document.createElement("div");
	groupDiv.classList.add("alphabetGroup");

	const groupTitle = document.createElement("p");
	groupTitle.textContent = `${group.title} [Shift + ${index + 1}]`;
	groupDiv.appendChild(groupTitle);

	for (const subGroup of group.groups) {
		const subGroupElement = createSubGroupElement(subGroup);
		groupDiv.appendChild(subGroupElement);
	}
	groupTitle.addEventListener("click", () => {
		toggleGroup();
	});
	groupKeybinds[index + 1] = toggleGroup;

	return groupDiv;
}

function createAlphabetSection(title: string, groups: letterGroup[]) {
	const alphabetDiv = document.createElement("div");
	alphabetDiv.classList.add("alphabet");

	const alphabetTitle = document.createElement("p");
	alphabetTitle.textContent = title;
	alphabetDiv.appendChild(alphabetTitle);

	for (const groupIndex in groups) {
		const groupElement = createGroupElement(groups[groupIndex], Number(groupIndex));
		alphabetDiv.appendChild(groupElement);
	}

	return alphabetDiv;
}

// Main rendering
const contentDiv = document.getElementById("content")!;
const disclaimerText = document.getElementById("disclaimer")!;
for (const alphabetName of Object.keys(alphabets)) {
	const alphabetSection = createAlphabetSection(alphabetName, alphabets[alphabetName]);
	contentDiv.insertBefore(alphabetSection, disclaimerText);
}

// Generate mods
const modsDiv = document.getElementById("modsScreen")!;
for (const i in mods) {
	const mod = mods[i];
	if (mod.short == "TT") continue; // TT has special input, so skip it
	const modDiv = document.createElement("div");
	const modLeftContainer = document.createElement("div");

	const modTitleElement = document.createElement("p");
	modTitleElement.innerHTML = mod.title;
	modLeftContainer.append(modTitleElement);

	const modDescriptionElement = document.createElement("p");
	modDescriptionElement.innerHTML = `[${Number(i) + 1}]\n${mod.description}`;
	modLeftContainer.append(modDescriptionElement);

	modDiv.append(modLeftContainer);

	const modButton = document.createElement("input");
	modButton.type = "checkbox";
	modButton.id = `${mod.short}Selected`;
	modButton.classList.add(`Mod${Number(i) + 1}`);

	modDiv.append(modButton);
	modsDiv.append(modDiv);
}
