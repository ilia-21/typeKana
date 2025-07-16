const selectedGroups = new Set();

function createSubGroupElement(subGroup) {
	const subGroupDiv = document.createElement("div");
	subGroupDiv.classList.add("alphabetSubGroup");

	const subGroupTitle = document.createElement("p");
	subGroupTitle.textContent = `${subGroup.title} (${subGroup.letters[0].letter})`;
	subGroupDiv.appendChild(subGroupTitle);

	subGroupDiv.addEventListener("click", () => {
		const isSelected = subGroupDiv.classList.toggle("selected");
		if (isSelected) {
			selectedGroups.add(subGroup.title);
		} else {
			selectedGroups.delete(subGroup.title);
			subGroupDiv.parentNode.classList.remove("selected");
		}
	});

	return subGroupDiv;
}

function createGroupElement(group) {
	const groupDiv = document.createElement("div");
	groupDiv.classList.add("alphabetGroup");

	const groupTitle = document.createElement("p");
	groupTitle.textContent = group.title;
	groupDiv.appendChild(groupTitle);

	for (const subGroup of group.groups) {
		const subGroupElement = createSubGroupElement(subGroup);
		groupDiv.appendChild(subGroupElement);
	}

	groupTitle.addEventListener("click", () => {
		const isSelected = groupDiv.classList.toggle("selected");
		for (sg of groupDiv.children) {
			if (!sg.classList.contains("alphabetSubGroup")) continue;
			if (isSelected) {
				sg.classList.add("selected");
				selectedGroups.add(sg.children[0].innerText.split(" ")[0]);
			} else {
				selectedGroups.delete(sg.children[0].innerText.split(" ")[0]);
				sg.classList.remove("selected");
			}
		}
	});

	return groupDiv;
}

function createAlphabetSection(title, groups) {
	const alphabetDiv = document.createElement("div");
	alphabetDiv.classList.add("alphabet");

	const alphabetTitle = document.createElement("p");
	alphabetTitle.textContent = title;
	alphabetDiv.appendChild(alphabetTitle);

	for (const group of groups) {
		const groupElement = createGroupElement(group);
		alphabetDiv.appendChild(groupElement);
	}

	return alphabetDiv;
}

// Main rendering
const contentDiv = document.getElementById("content");
const disclaimerText = document.getElementById("disclaimer");
for (const alphabetName of Object.keys(alphabets)) {
	const alphabetSection = createAlphabetSection(alphabetName, alphabets[alphabetName]);
	contentDiv.insertBefore(alphabetSection, disclaimerText);
}
