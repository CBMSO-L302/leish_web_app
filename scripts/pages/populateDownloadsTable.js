// Locate the json files
document.addEventListener("DOMContentLoaded", function() {
  const pathMap = {
    infantum: '../data/downloads/infantum/infantum.json',
    donovani: '../data/downloads/donovani/donovani.json',
    major: '../data/downloads/major/major.json',
    braziliensis: '../data/downloads/braziliensis/braziliensis.json'
  };

  const species = window.location.pathname.split("/").pop().split(".")[0];

});