window.customElements.define('stacked-input', class extends HTMLElement {
  constructor() {
    super();
    if (this.hasAttribute("fade-in")) {
    	this.style.opacity = "0";
    	requestAnimationFrame(()=>requestAnimationFrame(() => {
			this.style.opacity = "1";
		}));
    }
    var label = document.createElement("label");
    label.appendChild(document.createTextNode(this.getAttribute("label")));
    if (this.hasAttribute("name")) {
    	this.label.setAttribute("for", this.getAttribute("name"));
    }
    this.appendChild(label);
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    if (this.hasAttribute("name")) {
    	input.setAttribute("name", this.getAttribute("name"));
    }
    if (this.hasAttribute("value")) {
    	input.value = this.getAttribute("value");
    	this.classList.add("has-content");
    }
    this.appendChild(input);
    input.addEventListener("focus", ()=>this.classList.add("is-focused"));
    input.addEventListener("blur", ()=>this.classList.remove("is-focused"));
    input.addEventListener("change", ()=>this.classList[input.value?"add":"remove"].call(this.classList, "has-content"));
  }
});
