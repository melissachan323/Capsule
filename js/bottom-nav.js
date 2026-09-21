class BottomNav extends HTMLElement {
  static get observedAttributes() {
    return ['active-tab'];
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
    // Handle Capsules tab navigation
    const capsulesSlot = this.querySelector('.nav-slot.capsules');
    if (capsulesSlot) {
      capsulesSlot.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'capsule.html'; // Match your actual capsule filename
      });
    }

    // Handle Camera tab navigation
    const cameraSlot = this.querySelector('.nav-slot.capture');
    if (cameraSlot) {
      cameraSlot.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'camera.html';
      });
    }

    // Handle Chats tab navigation
    const chatsSlot = this.querySelector('.nav-slot.chats');
    if (chatsSlot) {
      chatsSlot.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'chat.html'; // Match your actual chat filename
      });
    }

    // General tab state handling for other interactive slots
    this.querySelectorAll('.nav-slot[data-tab]').forEach(slot => {
      slot.addEventListener('click', () => {
        const tab = slot.dataset.tab;
        if (tab && tab !== 'capture' && tab !== 'chats' && tab !== 'capsules') {
          this.setAttribute('active-tab', tab);
          this.dispatchEvent(new CustomEvent('tab-change', {
            detail: { tab },
            bubbles: true,
            composed: true
          }));
        }
      });
    });
  }

  render() {
    const activeTab = this.getAttribute('active-tab') || 'capsules';

    this.innerHTML = `
      <nav class="bottom-nav">
        <!-- Capsules Tab -->
        <div class="nav-slot capsules ${activeTab === 'capsules' ? 'active' : 'inactive'}" data-tab="capsules">
          <img class="icon" src="../Icons/Icon Name=Capsule.svg" alt="Capsules">
          <div class="label">Capsules</div>
        </div>

        <!-- Capture Trigger Slot -->
        <div class="nav-slot capture" data-tab="capture">
          <div class="outer-ring">
            <div class="inner-ring">
              <div class="center-disc"></div>
            </div>
          </div>
        </div>

        <!-- Chats Tab -->
        <div class="nav-slot chats ${activeTab === 'chats' ? 'active' : 'inactive'}" data-tab="chats">
          <img class="icon" src="../Icons/Icon Name=Chats.svg" alt="Chats">
          <div class="label">Chats</div>
        </div>
      </nav>
    `;
  }
}

customElements.define('bottom-nav', BottomNav);