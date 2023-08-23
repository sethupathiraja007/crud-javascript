const form = document.getElementById("student-form");
const tbody = document.getElementById("tbody");
const table = document.getElementById("table");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAndAdd();
});

function validateAndAdd() {
  // Validation
  const inputs = ["firstname", "lastname", "dob", "rollno", "email", "mobilenumber"];
  let valid = true;

  inputs.forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(id.charAt(0)); // Corresponding error element
    if (!input.value) {
      error.style.display = "block";
      valid = false;
    } else {
      error.style.display = "none";
    }
  });

  if (!valid) {
    return;
  }

  // Add to table
  const row = document.createElement("tr");
  inputs.forEach(id => {
    const value = document.getElementById(id).value;
    const col = document.createElement("td");
    col.textContent = value;
    row.appendChild(col);
  });

  const actionCol = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    tbody.removeChild(row);
    if (tbody.childElementCount === 0) {
      table.style.display = "none";
    }
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    // Extract the row data for editing
    const cells = row.querySelectorAll("td");
    inputs.forEach((id, index) => {
      document.getElementById(id).value = cells[index].textContent;
    });

    tbody.removeChild(row);
    if (tbody.childElementCount === 0) {
      table.style.display = "none";
    }
  });

  actionCol.appendChild(deleteBtn);
  actionCol.appendChild(editBtn); // Add the Edit button to the actionCol
  row.appendChild(actionCol);

  tbody.appendChild(row);
  table.style.display = "block";

  form.reset();
}
