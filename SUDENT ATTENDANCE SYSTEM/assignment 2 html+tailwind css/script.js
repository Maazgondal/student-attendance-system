document.getElementById("attendanceForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
  
    if (name && roll) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border px-4 py-2">${name}</td>
        <td class="border px-4 py-2">${roll}</td>
        <td class="border px-4 py-2 text-green-600 font-semibold">Present</td>
      `;
      document.getElementById("recordTable").appendChild(row);
      this.reset();
    }
  });
  