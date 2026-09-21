class HorizontalCarousel extends HTMLElement {
  static get observedAttributes() { return []; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._boundScrollHandler = this._onScroll.bind(this);
    this._boundKeyHandler    = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    this.render();
    const container = this.shadowRoot.querySelector('.carousel-container');
    container.addEventListener('scroll', this._boundScrollHandler);
    container.addEventListener('keydown', this._boundKeyHandler);
    
    // Apply layout classes to light-DOM children
    this._applyItemClasses();
    
    // Update active main card on mount
    requestAnimationFrame(() => this._updateMainCard());
  }

  disconnectedCallback() {
    const container = this.shadowRoot.querySelector('.carousel-container');
    if (container) {
      container.removeEventListener('scroll', this._boundScrollHandler);
      container.removeEventListener('keydown', this._boundKeyHandler);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import '../assets/css/design-tokens.css';
        @import '../assets/css/shared-components.css';

        :host {
          display: block;
          width: 100%;
          overflow: hidden;
          background: transparent !important;
        }

        .carousel-container {
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          gap: 16px;
          padding: 16px;
          box-sizing: border-box;
          outline: none;
          background: transparent !important;
          
          /* Hide scrollbars */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .carousel-container::-webkit-scrollbar {
          display: none;
        }

        /* Enforce transparent backgrounds on slotted child elements */
        ::slotted(*) {
          flex: 0 0 300px;
          scroll-snap-align: center;
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0.7;
          transform: scale(0.94);
          background-color: transparent !important;
          background: none !important;
        }

        /* Active centered item styling */
        ::slotted(.main) {
          opacity: 1;
          transform: scale(1);
        }
      </style>

      <div
        class="carousel-container"
        role="region"
        aria-label="Horizontal carousel of capsules"
        tabindex="0"
      >
        <slot></slot>
      </div>
    `;
  }

  /** Scroll handler – find the card nearest to the center and update classes */
  _onScroll() {
    requestAnimationFrame(() => this._updateMainCard());
  }

  /** Keyboard support – ArrowLeft/Right to scroll */
  _onKeyDown(e) {
    const container = this.shadowRoot.querySelector('.carousel-container');
    if (!container) return;
    const amount = container.clientWidth * 0.8;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      container.scrollBy({ left: amount, behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      container.scrollBy({ left: -amount, behavior: 'smooth' });
    }
  }

  /** Ensure each light-DOM child has the carousel-item class for styling */
  _applyItemClasses() {
    for (const el of this.children) {
      el.classList.add('carousel-item');
    }
  }

  /** Determine which slot element is closest to the container's visual center */
  _updateMainCard() {
    const container = this.shadowRoot.querySelector('.carousel-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centreX = containerRect.left + containerRect.width / 2;

    let bestEl = null;
    let bestDist = Infinity;

    const elements = Array.from(this.children);

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const elCentreX = rect.left + rect.width / 2;
      const dist = Math.abs(elCentreX - centreX);
      if (dist < bestDist) {
        bestDist = dist;
        bestEl = el;
      }
    }

    elements.forEach(el => el.classList.toggle('main', el === bestEl));

    if (bestEl && bestEl.hasAttribute('timestamp')) {
      const timestamp = bestEl.getAttribute('timestamp');
      this.dispatchEvent(new CustomEvent('capsule-changed', {
        detail: { timestamp },
        bubbles: true,
        composed: true
      }));
    }
  }
}

customElements.define('horizontal-carousel', HorizontalCarousel);