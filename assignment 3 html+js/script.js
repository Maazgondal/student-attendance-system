document.getElementById("attendanceForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
  
    if (name && roll) {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${name}</td>
        <td>${roll}</td>
        <td>Present</td>
      `;
  
      document.getElementById("recordTable").appendChild(row);
  
      this.reset(); // Clear input fields
    }
  });
  