class FriendRequestCard extends HTMLElement {
  connectedCallback() {
    // Read attributes passed to the component tag
    const avatar = this.getAttribute('avatar') || '';
    const username = this.getAttribute('username') || '';
    const timeAgo = this.getAttribute('time-ago') || '';
    const localTime = this.getAttribute('local-time') || '';

    this.classList.add('friend-request-card', 'card-padded');

    this.innerHTML = `
      <!-- Top Profile Section -->
      <div class="info">
        <img src="${avatar}" class="avatar" alt="${username}">
        
        <div class="details">
          <div class="username-header">
            <h3>${username}</h3>
            <span class="text-caption-2">${timeAgo}</span>
          </div>
          <p class="text-caption">${localTime}</p>
        </div>
      </div>

      <!-- Bottom Action Buttons -->
      <div class="button-group mt-4">
        <button class="button-primary flex-2 btn-accept">ACCEPT</button>
        <button class="button-secondary flex-1 btn-decline">DECLINE</button>
      </div>
    `;

    // Attach click event handlers
    this.querySelector('.btn-accept').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('accept', { detail: { username }, bubbles: true }));
    });

    this.querySelector('.btn-decline').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('decline', { detail: { username }, bubbles: true }));
    });
  }
}

// Register the custom HTML element
customElements.define('friend-request-card', FriendRequestCard);