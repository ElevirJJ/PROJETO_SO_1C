function toggleInfo(id) {
	var info = document.getElementById(id);
	if (info.style.display === "none") {
		info.style.display = "table-row";
	} else {
		info.style.display = "none";
	}
}
