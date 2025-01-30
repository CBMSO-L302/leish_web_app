class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `      
      <header>
      <!--Logo and title-->
      <div class="logo">
        <a href="./index.html"><img src="../img/logos/leish_lab_logo.png" alt="Leish-Lab Logo"></a>
        <div>
          <h1>Leish-ESP</h1>
          <h4><i id="lang_genome_decoding">Genome decoding</i></h4>
        </div>
      </div>
      <!--Dropdown menu-->
      <nav>
        <div class="dropdown">
          <a href="#" id="lang_about_us">About Us</a>
          <div class="dropdown-content">
            <a href="./mission.html" id="lang_mission">Mission</a>
            <a href="./team.html" id="lang_team">Team</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="#" id="lang_species">Species</a>
          <div class="dropdown-content">
            <a href="./infantum.html" id="lang_L_infantum"><i>L. infantum</i></a>
            <a href="./major.html" id="lang_L_major"><i>L. major</i></a>
            <a href="./donovani.html" id="lang_L_donovani"><i>L. donovani</i></a>
            <a href="./braziliensis.html" id="lang_L_braziliensis"><i>L. braziliensis</i></a>
          </div>
        </div>
        <div class="dropdown">
          <a href="#" id="lang_downloads">Downloads</a>
          <div class="dropdown-content">
            <a href="#" id="lang_reports">Reports</a>
            <a href="#" id="lang_datasets">Datasets</a>
            <a href="#" id="lang_software">Software</a>
          </div>
        </div>
      </nav>
      <!--Language selector-->
      <div id="language-selector" class="language-selector">
        <label for="language-dropdown"></label><select id="language-dropdown" onchange="changeLanguage(this.value)">
        <option value="eng" data-flag="../img/flags/english.png">ENG</option>
        <option value="esp" data-flag="../img/flags/spanish.png">ESP</option>
      </select>
        <img id="selected-flag" src="../img/flags/english.png" alt="Selected Language">
      </div>
      </header>
    `;
  }
}

customElements.define('header-component', Header);