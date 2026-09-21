class UserCard extends HTMLElement {
  connectedCallback() {
    const username = this.getAttribute('username');
    const time = this.getAttribute('time');
    const avatar = this.getAttribute('avatar');

    this.innerHTML = `
      <div class="user-card">
        <div>
          <img src="${avatar}" alt="${username}" class="avatar">
        </div>
        <div class="info">
          <h3>${username}</h3>
          <p class="text-caption">${time}</p>
        </div>
        <button class="button-primary">ADD FRIEND</button>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);