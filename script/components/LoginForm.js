window.customElements.define('login-form', class extends HTMLElement {
	constructor() {
		super();
		var fadesIn = this.hasAttribute("fade-in");
		this.form = document.createElement("form");
		this.form.setAttribute("name", "login-form");
		this.form.setAttribute("onsubmit", "return false");
		var elements = [
			["input-group username-group", `<stacked-input type="username" label="Usuário"></stacked-input>`],
			["input-group password-group", `<stacked-input type="password" label="Senha"></stacked-input>`],
			["login-message centerize fade-out", `<h4>Erro de Login</h4><div>Não foi possivel efetuar o login</div>`],
			["input-group actions-group", `<button class='material' color="green">Acessar</button>`]
		].map(config => {
			var element = document.createElement("div");
			element.setAttribute("class", config[0]);
			element.innerHTML = config[1];
			this.form.appendChild(element);
			return element;
		});
		this.appendChild(this.form);
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
		document.querySelector(".startup-loader").style.opacity = "0";
	}
	showLoginError(title, message) {
		var btn = this.elements[3].querySelector("button.material");
		btn.innerText = "Continuar";
		btn.setAttribute("color", "orange");
		var loginMessage = this.elements[2];
		loginMessage.classList.remove("fade-out");
		if (title) {
			loginMessage.children[0].innerText = title;
		}
		if (message) {
			loginMessage.children[1].innerHTML = message;
		}
		if (loginMessage.clientHeight < loginMessage.scrollHeight) {
			var difference = loginMessage.scrollHeight-loginMessage.clientHeight;
			document.querySelector(".content").style.height = (parseInt(document.querySelector(".content").style.height)+difference)+"px";
			loginMessage.style.height = loginMessage.scrollHeight+"px";
		}
	}
	showDataError(title, message, data) {
		return this.showLoginError(title, "<div>"+message+"</div><div class='error-data'>"+data+"</div><button class='material' color='orange'>Mostrar Dados</button>");
	}
	hideLoginError() {
		this.elements[2].classList.add("fade-out");
		document.querySelector(".content").style.height = "274px";
		this.elements[2].style.height = "117px";
	}
	validateUsername(value) {
		if (!value) {
			return "Campo usuário está em branco";
		}
		if (value.charAt(0) == " " || value.substr(-1) == " ") {
			return "Usuário não pode começar ou terminar em espaço";
		}
		return true;
	}
	validatePassword(value) {
		if (!value) {
			return "Senha não pode estar em branco";
		}
		if (value.charAt(0) == " " || value.substr(-1) == " ") {
			return "Senha não pode começar ou terminar em espaço";
		}
		return true;
	}
	handleResponse(response) {
		this.hideLoginLoading();
		if (response.chatAt(0) !== "{") {
			return this.showDataError("Resposta Inválida", "O servidor retornou dados em um formato que não é aceito.", "sdfhadfkhladfh");
		}
	}
	send(username, password) {
		this.fetch("/", {
			method: "POST",
			body: {username, password},
			mode: "same-origin",
			credentials: "same-origin",
			cache: "force-cache",
		}).then((data)=>data.text()).then(response=>{
			handleResponse(response);
		});
	}
	submit(event) {
		var btn = event.target;
		var label = btn.innerText.toLowerCase()
		if (label === "acessar") {
			this.hideInputs();
			var username = this.querySelector(".username-group input").value;
			var password = this.querySelector(".password-group input").value;
			var validationList = [this.validateUsername(username), this.validatePassword(password)];
			if (validationList.every(validation => validation === true)) {
				try {
					this.send(username, password);
				} catch (err) {
					this.showDataError("Erro na Requisição", "<p style='text-align:center'>Não foi possivel concluir a requisição ao servidor</p>", err);
				}
			} else {
				var message = "<ul>"+validationList.map((validation, i) => (validation===true)?"":((validation===false)?("<li>Erro desconhecido de validação ["+i+"]</li>"):"<li>"+validation+"</li>")).join("\n");
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