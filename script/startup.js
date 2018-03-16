function startup() {
	var content = document.querySelector(".content");
	content.style.width = "100px";
	content.style.height = "100px";
	requestAnimationFrame(()=>requestAnimationFrame(() => {
		content.style.width = "300px";
		content.style.height = "274px";
		content.style.borderRadius = "6px";
		document.querySelector(".startup-loader").style.opacity = "0";
		content.innerHTML = (`
			<card-header class="center-text" data-background-color="orange" fade-in><h4 class="card-title">Login</h4></card-header>
			<card-content><login-form fade-in></login-form></card-content>
		`);
		setTimeout(()=>content.classList.add("fast-transition"),900);
	}));
}

window.addEventListener("load", function() {
	var ms = performance.now();
	var loadAtLeast = 2000;
	if (ms < loadAtLeast) {
		setTimeout(startup, loadAtLeast-ms);
	} else {
		startup();
	}
});