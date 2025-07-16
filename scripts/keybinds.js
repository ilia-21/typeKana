document.addEventListener("keydown", (e) => {
	if (e.code == "Escape") {
		// Esc when Help page is visible
		if (!helpPageContainer.classList.contains("hidden")) {
			helpPageContainer.classList.add("hidden");
		}
		// Esc to exit test
		if (!document.getElementById("actualTest").classList.contains("hidden")) {
			document.getElementById("actualTest").classList.add("hidden");
			document.getElementById("content").classList.remove("hidden");
		}
	}
});
