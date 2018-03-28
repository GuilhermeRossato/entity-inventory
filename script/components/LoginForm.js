window.customElements.define('login-form', class LoginForm extends HTMLElement {
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
		setTimeout(() => {
			elements[0].children[0].check();
			elements[1].children[0].check();
		}, 1300);
		this.elements = elements;
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
	static toggleErrorData() {
		console.log("Hello");
	}
	showDataError(title, message, data, align="center") {
		this.showLoginError(title, "<div><p style='text-align:"+align+"'>"+message+"</p></div><div class='error-data'>"+data+"</div><button class='material toggle-error-data-btn' color='orange'>Mostrar Dados</button>");
		document.querySelectorAll(".toggle-error-data-btn").forEach(btn => (btn.onclick = function(event) {
			var element = event.target.parentNode.querySelector(".error-data");
			if (element.classList.contains("shown")) {
				element.classList.remove("shown");
			} else {
				element.classList.add("shown");
			}
		}));
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
		if (response.charAt(0) !== "{") {
			var responseAsText = response.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			return this.showDataError("Resposta Inválida", "O servidor retornou dados em um formato que não é aceito.", "<pre>"+responseAsText+"</pre>");
		}
	}
	send(username, password) {
		ServerHandler.send("login", {username, password}).then(response=>{
			this.handleResponse(response);
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
					console.error(err);
					this.showDataError("Erro na Requisição", "Não foi possivel concluir a requisição ao servidor", err.stack.replace(/\n/g, '<br>'));
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