class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
    <style>
        #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0,0,0,0.75);
            z-index: 10;
            opacity: 0;
            pointer-events: none;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal {
            opacity: 1;
            pointer-events: all;
        }

        #modal {
            position: fixed;
            top: 15vh;
            left:25%;
            width: 50%;
            z-index: 100;
            background: white;            
            border-radius: 3px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.26);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity: 0;
        }
        header{
            padding: 1rem;
        }

        header h1{
            font-size: 1.25rem;
        }

        #actions{
            border-top:1px solid #ccc;
            padding: 1rem;
            display: flex;
            justify-content: flex-end;
        }
        #actions button{
            margin: 0 0.25rem;
        }

        #main {
            padding: 1rem;
        }

        ::slotted(h1) {
            font-size: 2rem;
        }

    </style>
    <div id="backdrop"></div>
    <div id="modal">    
        <header>
            <slot name="title">Please Confirm Payment</slot>
        </header>
        <section id="main">
            <slot name="main"></slot>
        </section>
        <section id="actions">
            <button id="cancel-btn">Cancel</button>
            <button id="confirm-btn">Confirm</button>
        </section>
    </div>
    `;

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1].assignedNodes());
    });

    const cancelButton = this.shadowRoot.querySelector("#cancel-btn");
    const confirmButton = this.shadowRoot.querySelector("#confirm-btn");
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
  }

  // Umas das formas de fazer
  attributeChangedCallback(name, oldValue, newValue) {
    /* if ((name = "opened")) { */
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
      /* this.shadowRoot.querySelector("#backdrop").style.opacity = 1;
        this.shadowRoot.querySelector("#backdrop").style.pointerevents = "all";
        this.shadowRoot.querySelector("#modal").style.opacity = 1;
        this.shadowRoot.querySelector("#modal").style.pointerevents = "all"; */
    } else {
      this.isOpen = false;
    }
  }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
    console.log(this.isOpen);
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false
  }

  _cancel(){
      this.hide()
      console.log('cancelling...')
  }
  _confirm(){
      this.hide()
      console.log('confirmming...')
  }
}

customElements.define("uc-modal", Modal);
