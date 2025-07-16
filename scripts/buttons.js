const helpPageContainer = document.getElementById("helpPageContainer");

document.getElementById("helpBtn").addEventListener("click", (e) => {
	helpPageContainer.classList.toggle("hidden");
});
document.getElementById("startBtn").addEventListener("click", (e) => {
	startTest();
});

document.addEventListener("keydown", (e) => {
	if (e.code == "Escape") {
		if (!helpPageContainer.classList.contains("hidden")) {
			helpPageContainer.classList.add("hidden");
		}
		if (!document.getElementById("actualTest").classList.contains("hidden")) {
			document.getElementById("actualTest").classList.add("hidden");
			document.getElementById("content").classList.remove("hidden");
		}
	}
});
