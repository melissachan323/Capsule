class SearchField extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'placeholder'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const input = this.querySelector('input');
      if (!input) return;

      if (name === 'value') {
        input.value = newValue || '';
      } else if (name === 'placeholder') {
        input.placeholder = newValue || 'Search Friends';
      }
    }
  }

  render() {
    const value = this.getAttribute('value') || '';
    const placeholder = this.getAttribute('placeholder') || 'Search Friends';

    this.innerHTML = `
      <div class="search-field">
        <div class="search-icon">
          <img src="../Icons/Icon Name=Search.svg" alt="Search">
        </div>
        <input type="text" placeholder="${placeholder}" value="${value}">
      </div>
    `;
  }
}

customElements.define('search-field', SearchField);