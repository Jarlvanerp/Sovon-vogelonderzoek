// Aantal huisjes op het dashboard
const totalHouses = 32;
const dashboard = document.getElementById("dashboard");

// Functie om een huisje-element te maken
function createHouseElement(index) {
  const houseDiv = document.createElement("div");
  houseDiv.classList.add("house");

  const title = document.createElement("h2");
  title.textContent = "Huisje " + (index + 1);
  houseDiv.appendChild(title);

  const birdLabel = document.createElement("label");
  birdLabel.textContent = "Vogelsoort:";
  const birdInput = document.createElement("input");
  birdInput.type = "text";
  birdInput.placeholder = "Typ hier de vogelsoort...";
  birdInput.id = "bird-" + index;
  houseDiv.appendChild(birdLabel);
  houseDiv.appendChild(birdInput);

  const statusLabel = document.createElement("label");
  statusLabel.textContent = "Status:";
  const statusInput = document.createElement("input");
  statusInput.type = "text";
  statusInput.placeholder = "Typ hier de status...";
  statusInput.id = "status-" + index;
  houseDiv.appendChild(statusLabel);
  houseDiv.appendChild(statusInput);

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Datum:";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "date-" + index;
  houseDiv.appendChild(dateLabel);
  houseDiv.appendChild(dateInput);

  return houseDiv;
}

// Functie om het dashboard te vullen met huisjes
function renderDashboard() {
  if (!dashboard) {
    console.error("Dashboard element niet gevonden!");
    return;
  }

  dashboard.innerHTML = ""; // Reset de inhoud

  for (let i = 0; i < totalHouses; i++) {
    const houseElement = createHouseElement(i);
    dashboard.appendChild(houseElement);
  }

  console.log(`Totaal aantal huisjes: ${totalHouses}`); // Debugging: Totaal aantal huisjes loggen
}

// Functie om gegevens op te slaan
function saveData() {
  let newData = {};
  for (let i = 0; i < totalHouses; i++) {
    const bird = document.getElementById("bird-" + i)?.value || "";
    const status = document.getElementById("status-" + i)?.value || "";
    const date = document.getElementById("date-" + i)?.value || "";

    newData[i] = { bird, status, date };
  }

  console.log("Gegevens verzameld:", newData); // Debugging: Laat de gegevens zien in de console

  const gekozenWeek = prompt("Voer de week in waarvoor je de gegevens wilt opslaan:");
  if (!gekozenWeek) {
    alert("Opslaan geannuleerd. Geen week ingevuld.");
    return;
  }

  console.log("Data opgeslagen voor week " + gekozenWeek);
  alert("Gegevens succesvol opgeslagen!");
}

// Functie om de velden leeg te maken
function clearFields() {
  for (let i = 0; i < totalHouses; i++) {
    document.getElementById("bird-" + i).value = "";
    document.getElementById("status-" + i).value = "";
    document.getElementById("date-" + i).value = "";
  }
}

// Functie om gegevens naar Excel te exporteren
function exportToExcel() {
  // Vraag het weeknummer aan de gebruiker
  const weekNumber = prompt("Voer het weeknummer in:");

  if (!weekNumber) {
    alert("Geen weeknummer ingevoerd. Export afgebroken.");
    return;
  }

  let dataToExport = [];
  
  // Voeg de data van de huisjes toe aan het exportbestand
  for (let i = 0; i < totalHouses; i++) {
    const bird = document.getElementById("bird-" + i)?.value || "";
    const status = document.getElementById("status-" + i)?.value || "";
    const date = document.getElementById("date-" + i)?.value || "";
    
    dataToExport.push({
      Huisje: i + 1,
      Vogelsoort: bird,
      Status: status,
      Datum: date
    });
  }

  // Maak een werkblad van de data
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  
  // Maak een werkmap en voeg het werkblad toe
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Vogelhuisjes");

  // Exporteer het bestand als een .xlsx bestand met weeknummer in de naam
  XLSX.writeFile(wb, `Vogelhuisjes_Data_Week_${weekNumber}.xlsx`);
}

// Eventlistener voor de "Exporteer naar Excel" knop
document.addEventListener("DOMContentLoaded", function () {
  const exportButton = document.getElementById("exportToExcel");
  if (exportButton) {
    exportButton.addEventListener("click", exportToExcel);
  }
});

// Functie om alle velden leeg te maken
function clearAllFields() {
  for (let i = 0; i < totalHouses; i++) {
    const birdInput = document.getElementById("bird-" + i);
    const statusInput = document.getElementById("status-" + i);
    const dateInput = document.getElementById("date-" + i);

    if (birdInput && statusInput && dateInput) {
      birdInput.value = "";
      statusInput.value = "";
      dateInput.value = "";
    }
  }
}

// Eventlistener voor de "Leeg alle velden" knop
document.addEventListener("DOMContentLoaded", function () {
  const clearAllButton = document.getElementById("clearAll");
  if (clearAllButton) {
    clearAllButton.addEventListener("click", clearAllFields);
  }
});

// Eventlistener voor de opslaan-knop
document.getElementById("saveAll").addEventListener("click", saveData);

// Render het dashboard wanneer de pagina geladen is
document.addEventListener("DOMContentLoaded", renderDashboard);

