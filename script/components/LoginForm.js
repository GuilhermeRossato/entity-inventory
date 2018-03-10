window.customElements.define('login-form', class extends HTMLElement {
	constructor() {
		super();
		var fadesIn = this.hasAttribute("fade-in");
		var elements = [
			["input-group username-group", `<stacked-input label="Username"></stacked-input>`],
			["input-group password-group", `<stacked-input label="Password"></stacked-input>`],
			["input-group actions-group", `<button class='material' color="green">Login</button>`]
		].map(config => {
			var element = document.createElement("div");
			element.setAttribute("class", config[0]);
			element.innerHTML = config[1];
			if (fadesIn) {
				element.style.opacity = "0";
			}
			this.appendChild(element);
			return element;
		});
		if (fadesIn) {
			requestAnimationFrame(()=>requestAnimationFrame(() => {
				elements.forEach(element => element.style.opacity = "1");
			}));
		}

/*
		this.innerHTML = (`
		<div class="input-group username-group">
			<stacked-input label="Username"></stacked-input>
		</div>
		<div class="input-group password-group">
			<stacked-input label="Password"></stacked-input>
		</div>
		<div class="input-group actions-group">
			<button class='material' color="green">Login</button>
		</div>
		`);*/
	}
});