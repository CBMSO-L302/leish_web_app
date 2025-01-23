class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div id="phone-mail">
          <span>
              <img src="../img/icons/email.png" alt="Mail" class="icon">
              <a href="mailto:leish-esp@cbm.csic.es">leish-esp@cbm.csic.es</a>
          </span>
        </div>
    
        <span id="map">
          <img src="../img/icons/map.png" alt="Location" class="icon">
          <a href="https://maps.app.goo.gl/Jsv6mqWxq4KYtYbq8" target="_blank">Nicolás Cabrera, 1, Fuencarral-El Pardo, 28049 Madrid</a>
        </span>
    
        <div id="social-media">
          <a href="https://x.com/WHO" target="_blank"><img src="../img/icons/twitter.png" alt="Twitter"></a>
          <a href="https://www.youtube.com/@who" target="_blank"><img src="../img/icons/youtube.png" alt="YouTube"></a>
          <a href="https://www.instagram.com/who" target="_blank"><img src="../img/icons/instagram.png" alt="Instagram"></a>
          <a href="https://www.linkedin.com/company/world-health-organization" target="_blank"><img src="../img/icons/linkedin.png" alt="LinkedIn"></a>
        </div>
    
        <div id="government-logos">
          <img src="../img/logos/1-CSIC-Logotipo--Web-Gob-Min-CSIC--COLOR--PNG-RGB-300ppp.png" alt="Spanish Government, Science Ministry and CSIC logos">
          <img src="../img/logos/Combo-CBMExcelencia.png " alt="CBM and Excellency logos">
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
