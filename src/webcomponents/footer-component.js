class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #212529;
          color: white;
          text-align: center;
          padding: 1rem;
          margin-top: auto;
        }

        .footer-content {
          padding: 0.75rem;
        }

        .footer-link {
          color: #0d6efd;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #0b5ed7;
        }
      </style>
      
      <footer>
        <div class="footer-content">
          © ${new Date().getFullYear()} Copyright:
          <a class="footer-link" href="https://github.com/Pangolu" target="_blank" rel="noopener noreferrer">Pangolu</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);

export default FooterComponent;
