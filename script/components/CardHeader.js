window.customElements.define('card-header', class extends HTMLElement {
  constructor() {
    super();
    if (this.hasAttribute("fade-in")) {
    	this.style.opacity = "0";
    	requestAnimationFrame(()=>requestAnimationFrame(() => {
			this.style.opacity = "1";
		}));
    }
  }
});
