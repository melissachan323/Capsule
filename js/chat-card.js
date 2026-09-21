class ChatCard extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'title', 'time', 'members', 'message', 'unread-count', 'avatars', 'avatar', 'status-icon'];
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback() {
    this.render();
  }

  setupEvents() {
    // Add click handler to navigate to chat.html when the card is clicked
    this.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Optional: You can extract a specific chat ID or data attribute if needed
      // const chatId = this.getAttribute('chat-id');
      
      window.location.href = 'chat.html';
    });
  }

  render() {
    const isGroup = this.getAttribute('type') === 'group' || this.hasAttribute('avatars');
    const title = this.getAttribute('title') || '';
    const time = this.getAttribute('time') || '';
    const members = this.getAttribute('members') || '';
    const message = this.getAttribute('message') || '';
    
    // Unread state calculation
    const unreadCount = parseInt(this.getAttribute('unread-count') || '0', 10);
    const isUnread = unreadCount > 0 || this.hasAttribute('unread');

    // Avatar configuration
    const avatarsAttr = this.getAttribute('avatars') || '';
    const avatarList = avatarsAttr ? avatarsAttr.split(',').map(s => s.trim()) : [];
    const singleAvatar = this.getAttribute('avatar') || '';
    const statusIcon = this.getAttribute('status-icon') || '';

    // 1. Dynamic Avatar Rendering
    let avatarHTML = '';

    if (isGroup && avatarList.length > 0) {
      // GROUP CHAT: Leverages your existing .avatar.small class (24px)
      const visible = avatarList.slice(0, 2);
      const extra = avatarList.length > 2 ? avatarList.length - 2 : 0;
      const stepOffset = 20;
      const avatarSize = 24;
      
      let stackItems = visible.map((src, i) => 
        `<img src="${src}" class="avatar small" style="position: absolute; left: ${i * stepOffset}px; top: 0; z-index: ${i + 1};">`
      ).join('');

      if (extra > 0) {
        stackItems += `
          <div class="avatar small avatar-badge" style="position: absolute; left: ${visible.length * stepOffset}px; top: 0; z-index: 3;">
            +${extra}
          </div>`;
      }
      
      const containerWidth = avatarSize + (visible.length * stepOffset);
      avatarHTML = `<div style="position: relative; width: ${containerWidth}px; height: ${avatarSize}px; flex-shrink: 0;">${stackItems}</div>`;

    } else {
      // SOLO CHAT: Full-size 48px avatar with status badge
      const avatarSize = 48;
      avatarHTML = `
        <div style="position: relative; width: ${avatarSize}px; height: ${avatarSize}px; flex-shrink: 0;">
          <img src="${singleAvatar}" class="avatar" style="width: ${avatarSize}px; height: ${avatarSize}px; border-radius: 50%; object-fit: cover; display: block;">
          ${statusIcon ? `<span style="position: absolute; right: -2px; bottom: -2px; font-size: 13px; line-height: 1;">${statusIcon}</span>` : ''}
        </div>`;
    }

    // 2. Unread Dot & Count Badge
    const dotHTML = isUnread ? `<span class="unread-dot"></span>` : '';
    const countHTML = unreadCount > 0 ? `<span class="count-badge">${unreadCount}</span>` : '';

    // Render component structure
    this.innerHTML = `
      <div class="card card-padded ${isUnread ? 'is-unread' : ''}" style="display: flex; flex-direction: column;">
        
        <!-- Top Row: Avatar & Metadata -->
        <div style="display: flex; gap: var(--space-4, 12px); margin-bottom: var(--space-2, 8px); align-items: flex-start; width: 100%;">
          ${avatarHTML}

          <div style="display: flex; flex-direction: column; flex: 1; min-width: 0;">
            <div class="flex-between">
              <h3 style="margin: 0;">${title}</h3>
              <p class="text-caption-2" style="margin: 0;">${time}</p>
            </div>
            ${members ? `<p class="text-caption" style="margin: 2px 0 0 0;">${members}</p>` : ''}
          </div>
        </div>

        <!-- Bottom Row: Preview Message & Count Badge -->
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; overflow: hidden;">
            ${dotHTML}
            <p class="text-body message-text" style="margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${message}
            </p>
          </div>
          ${countHTML}
        </div>

      </div>
    `;
  }
}

customElements.define('chat-card', ChatCard);