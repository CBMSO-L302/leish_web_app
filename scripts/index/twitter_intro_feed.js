function openTwitter(evt, twitterName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(twitterName).style.display = "block";
    evt.currentTarget.className += " active";
  
    // Load Twitter widgets
    if (typeof twttr !== 'undefined' && twttr.widgets) {
      twttr.widgets.load();
    }
  }
  
  // Default open tab
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tab button").click();
  });
  