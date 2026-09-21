class PhotoCard extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'alt', 'caption', 'subcaption', 'retake-label', 'variant', 'align'];
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
    const retakeBtn = this.querySelector('[data-action="retake"]');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('retake', { bubbles: true }));
      });
    }

    const trashBtn = this.querySelector('[data-action="trash"]');
    if (trashBtn) {
      trashBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('delete', { bubbles: true }));
      });
    }
  }

  render() {
    const src = this.getAttribute('src') || '../images/Camera.png';
    const alt = this.getAttribute('alt') || 'Photo';
    const caption = this.getAttribute('caption') || '';
    const subcaption = this.getAttribute('subcaption') || '';
    const retakeLabel = this.getAttribute('retake-label') || 'RETAKE';
    
    // Check reply mode and alignment direction (left | right)
    const isReply = this.getAttribute('variant') === 'reply' || this.hasAttribute('reply');
    const align = (this.getAttribute('align') || 'left').toLowerCase(); // 'left' or 'right'

    // Alignment CSS helpers
    const containerAlign = align === 'right' ? 'flex-end' : 'flex-start';
    const textAlign = align === 'right' ? 'right' : 'left';
    const captionTextClass = isReply ? 'text-caption-2 text-emphasis' : 'text-body text-emphasis';

    this.innerHTML = `
      <!-- Full-Width Container -->
      <div class="photo-card-wrapper" style="width: 100%; display: flex; flex-direction: column; align-items: ${containerAlign};">
        
        <!-- Photo Box Container (Fixed 300px x 300px) --> 
        <div class="card card-bordered" style="width: 300px; height: 300px; overflow: hidden; display: flex; flex-direction: column; position: relative;">
          
          <!-- Photo Media -->
          <div style="flex: 1; width: 100%; overflow: hidden;">
            <img src="${src}" alt="${alt}" style="object-fit: cover; width: 100%; height: 100%; display: block;">
          </div>

          <!-- Camera Header Overlay: Rendered ONLY if NOT reply variant -->
          ${!isReply ? `
            <div class="camera-header edit">
              <!-- Top-left overlay: Retake button -->
              <button class="icon-button with-text" data-action="retake" aria-label="Retake photo">
                <img src="../Icons/Icon Name=Retake.svg" alt="Retake">
                <span class="text-button" style="color: var(--color-text-emphasis);">${retakeLabel}</span>
              </button>

              <!-- Top-right overlay: Trash button -->
              <button class="icon-button" data-action="trash" aria-label="Delete photo">
                <img src="../Icons/Icon Name=Trash.svg" alt="Trash">
              </button>
            </div>
          ` : ''}

          <!-- Inner Caption Strip (Inside Photo Box) -->
          ${caption ? `
            <div style="background-color: var(--color-bg-component); padding: 8px 12px; display: flex; align-items: flex-start; gap: var(--space-2);">
              ${!isReply ? `<img src="../Icons/Icon Name=Caption.svg" alt="Caption">` : ''}
              <span class="${captionTextClass}">${caption}</span>
            </div>
          ` : ''}

        </div> <!-- End Photo Box -->
        
        <!-- Outer Subcaption Line: Rendered ONLY in Reply Variant -->
        ${isReply && subcaption ? `
          <div style="margin-top: 4px; width: 300px; text-align: ${textAlign};">
            <span class="text-caption-2" style="color: var(--color-text-caption, #8e8e93);">${subcaption}</span>
          </div>
        ` : ''}

      </div>
    `;
  }
}

customElements.define('photo-card', PhotoCard);