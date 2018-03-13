window.customElements.define('login-form', class extends HTMLElement {
	constructor() {
		super();
		var fadesIn = this.hasAttribute("fade-in");
		var elements = [
			["input-group username-group", `<stacked-input type="username" label="Usuário"></stacked-input>`],
			["input-group password-group", `<stacked-input type="password" label="Senha"></stacked-input>`],
			["login-message centerize fade-out", `<h4>Erro de Login</h4><div>Não foi possivel efetuar o login</div>`],
			["input-group actions-group", `<button class='material' color="green">Acessar</button>`]
		].map(config => {
			var element = document.createElement("div");
			element.setAttribute("class", config[0]);
			element.innerHTML = config[1];
			this.appendChild(element);
			return element;
		});
		if (fadesIn) {
			this.style.opacity = "0";
			requestAnimationFrame(()=>requestAnimationFrame(() => {
				this.style.opacity = "1";
			}));
		}
		elements[1].children[0].addEventListener("keyup", (evt)=>(evt.code==="Enter" || evt.code==="NumpadEnter")&&(this.submit.call(this)));
		elements[3].children[0].addEventListener("click", this.submit.bind(this));
		this.elements = elements;

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
		`);
*/
	}
	hideInputs() {
		this.elements[0].classList.add("fade-out");
		this.elements[1].classList.add("fade-out");
	}
	showInputs() {
		this.elements[0].classList.remove("fade-out");
		this.elements[1].classList.remove("fade-out");
	}
	showLoginLoading() {
		document.querySelector(".startup-loader").style.opacity = "1";
	}
	hideLoginLoading() {

	}
	showLoginError(title, message) {
		var loginMessage = this.elements[2];
		loginMessage.classList.remove("fade-out");
		if (title) {
			loginMessage.children[0].innerText = title;
		}
		if (message) {
			loginMessage.children[1].innerHTML = message;
		}
		if (loginMessage.height < loginMessage.scrollHeight) {
			var difference = loginMessage.scrollHeight-loginMessage.height;
			console.log("Didn't fit for ",difference,'px');
		} else {
			console.log("Fit:",loginMessage.height,loginMessage.scrollHeight,loginMessage)
		}
	}
	hideLoginError() {
		this.elements[2].classList.add("fade-out");
	}
	validateUsername(value) {
		if (value == "") {
			return "Campo usuário está em branco";
		}
		if (value.charAt(0) == " " || value.substr(-1) == " ") {
			return "Usuário não pode começar ou terminar em espaço";
		}
		return true;
	}
	validatePassword(value) {
		return "Senha não pode estar em branco";
		return false;
	}
	submit(event) {
		var btn = event.target;
		var label = btn.innerText.toLowerCase()
		if (label === "acessar") {
			this.hideInputs();
			var username = this.querySelector(".username-group input").value;
			var password = this.querySelector(".password-group input").value;
			var validationList = [this.validateUsername(username), this.validatePassword(username)];
			if (validationList.every(validation => validation === true)) {

			} else {
				var message = "<ul>"+validationList.map(validation => (validation===true)?"":((validation===false)?"<li>Erro desconhecido</li>":"<li>"+validation+"</li>")).join("\n");
				btn.innerText = "Continuar";
				btn.setAttribute("color", "orange");
				this.showLoginError("Erro de Validação", message);
			}
		} else if (label === "continuar") {
			this.hideLoginError();
			btn.setAttribute("color", "green");
			btn.innerText = "Acessar";
			this.showInputs();
		} else {
			this.showLoginError("Erro de Botão", "Ação '"+label+"' não foi reconhecida");
		}
	}
});