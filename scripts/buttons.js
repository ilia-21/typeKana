const helpPageContainer = document.getElementById("helpPageContainer");

document.getElementById("helpBtn").addEventListener("click", (e) => {
	helpPageContainer.classList.toggle("hidden");
});
document.getElementById("startBtn").addEventListener("click", (e) => {
	startTest();
});
