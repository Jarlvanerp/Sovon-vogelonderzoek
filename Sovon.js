document.addEventListener("DOMContentLoaded", function() {
    const birdSelect = document.getElementById("bird");
    const otherBirdDiv = document.getElementById("other-bird-div");
    const statusCheckboxes = document.querySelectorAll("#status-container input[type='checkbox']");
    const dynamicFields = {
      eitjes: document.getElementById("dynamic-eitjes"),
      kuikens: document.getElementById("dynamic-kuikens"),
      uitgevlogen: document.getElementById("dynamic-uitgevlogen"),
      anders: document.getElementById("dynamic-anders")
    };
  
    // Toon het dynamische veld voor andere vogelsoort als 'Anders' geselecteerd is
    birdSelect.addEventListener("change", function() {
      if (birdSelect.value === "Anders") {
        otherBirdDiv.style.display = "block";
      } else {
        otherBirdDiv.style.display = "none";
      }
    });
  
    // Toon of verberg de dynamische velden voor status opties
    statusCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", function() {
        const statusValue = checkbox.id.replace("status-", "");
        if (checkbox.checked) {
          dynamicFields[statusValue].style.display = "block";
        } else {
          dynamicFields[statusValue].style.display = "none";
        }
      });
    });
  
    // Opslaan van gegevens
    document.getElementById("saveAll").addEventListener("click", function() {
      const houseNumber = document.getElementById("house").value;
      const bird = document.getElementById("bird").value;
      const status = [];
      const date = document.getElementById("date").value;
  
      // Verzamel geselecteerde status
      statusCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          status.push(checkbox.id.replace("status-", ""));
        }
      });
  
      // Verzamel dynamische velden
      if (document.getElementById("eitjes").style.display === "block") {
        status.eitjes = document.getElementById("eitjes").value;
      }
      if (document.getElementById("kuikens").style.display === "block") {
        status.kuikens = document.getElementById("kuikens").value;
      }
      if (document.getElementById("uitgevlogen").style.display === "block") {
        status.uitgevlogen = document.getElementById("uitgevlogen").value;
      }
      if (document.getElementById("anders").style.display === "block") {
        status.anders = document.getElementById("anders").value;
      }
  
      // Opslaan naar server of lokale opslag
      const data = { houseNumber, bird, status, date };
      console.log(data);
  
      alert("Gegevens succesvol opgeslagen!");
    });
  });
  