class WaveBear extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = '<h1>dsasda</h1>'
    console.log(123);

  }
  connectedCallback() {
    console.log(123);
  }
}
customElements.define("wave-bear", WaveBear);
