class CapsuleCard extends HTMLElement {
  static get observedAttributes() {
    return ['avatar-src', 'avatar-alt', 'name', 'photo-src', 'photo-alt'];
  }

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = '100%';

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const avatarSrc = this.getAttribute('avatar-src') || '../Avatar/Photo by Matas Katinas.png';
    const avatarAlt = this.getAttribute('avatar-alt') || 'User Avatar';
    const name = this.getAttribute('name') || 'Elena';
    const photoSrc = this.getAttribute('photo-src') || '../images/Camera.png';
    const photoAlt = this.getAttribute('photo-alt') || 'Capsule Photo';

    this.innerHTML = `
      <div class="capsule-card-wrapper" style="width: 100%; display: flex; flex-direction: column;">
        <!-- Sender Row -->
        <div class="mb-4" style="display: flex; align-items: center; gap: var(--space-2);">
          <img src="${avatarSrc}" alt="${avatarAlt}" class="avatar small">
          <p class="text-body">${name}</p>
        </div>

        <!-- Capsule Photo (Fixed 300px Height) -->
        <div class="card mb-4" style="height: 300px; position: relative; overflow: hidden; width: 100%;">
          <div style="width: 100%; height: 100%;">
            <img src="${photoSrc}" alt="${photoAlt}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('capsule-card', CapsuleCard);