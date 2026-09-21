class ReplyBar extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEvents();
    }
  }

  setupEvents() {
    // Handle Camera Click
    const cameraBtn = this.querySelector('[data-action="camera"]');
    if (cameraBtn) {
      cameraBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('camera-click', { bubbles: true }));
      });
    }

    // Handle Mic Click
    const micBtn = this.querySelector('[data-action="mic"]');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('mic-click', { bubbles: true }));
      });
    }

    // Handle Send Button Click
    const sendBtn = this.querySelector('.send');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('send', { bubbles: true }));
      });
    }
  }

  render() {
    const placeholder = this.getAttribute('placeholder') || 'Reply to Capsule';
    const isDisabled = this.hasAttribute('disabled');

    // Clean innerHTML matching your CSS classes directly
    this.innerHTML = `
      <div class="reply-bar ${isDisabled ? 'is-disabled' : ''}">
        <button class="icon-button" data-action="camera" aria-label="Camera" ${isDisabled ? 'disabled' : ''}>
          <img src="../Icons/Icon Name=Camera.svg" alt="Camera">
        </button>
        <button class="icon-button" data-action="mic" aria-label="Microphone" ${isDisabled ? 'disabled' : ''}>
          <img src="../Icons/Icon Name=Microphone.svg" alt="Microphone">
        </button>
        <span class="placeholder">${placeholder}</span>
        <button class="icon-button send" data-action="send" aria-label="Send" ${isDisabled ? 'disabled' : ''}>
          <img src="../Icons/Icon Name=Send.svg" alt="Send">
        </button>
      </div>
    `;
  }
}

customElements.define('reply-bar', ReplyBar);