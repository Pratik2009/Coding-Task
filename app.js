let chemicals = [];

// Fetch data from the JSON file
async function fetchData() {
    const response = await fetch('data.json');
    chemicals = await response.json();
    renderTable();
}

// Render the table 
function renderTable() {
    const tbBody = document.getElementById('tbBody');
    tbBody.innerHTML = '';

    chemicals.forEach((chemical, index) => {
        chemical.id = index + 1;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${chemical.id}</td>
            <td>${chemical.name}</td>
            <td>${chemical.vender}</td>
            <td>${chemical.density}</td>
            <td>${chemical.viscosity}</td>
            <td>${chemical.packaging}</td>
            <td>${chemical.packSize}</td>
            <td>${chemical.unit}</td>
            <td>${chemical.quantity}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditModal(${index})">Edit</button>
            </td>
        `;
        tbBody.appendChild(row);
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById("chemicalTable");
    const rows = Array.from(table.rows).slice(1);
    const isAscending = table.dataset.sortDirection === "asc";
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText;
        const cellB = rowB.cells[columnIndex].innerText;
        
        return isAscending 
            ? cellA.localeCompare(cellB, undefined, {numeric: true})
            : cellB.localeCompare(cellA, undefined, {numeric: true});
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));
    table.dataset.sortDirection = isAscending ? "desc" : "asc";
}

//for adding a new data
function openAddModal() {
    document.getElementById('EditModelLable').innerText = 'Add new Chemical';
    document.getElementById('chemicalForm').reset();
    document.getElementById('editId').value = '';
    $('#EditModal').modal('show');
}

//for editing an existing Data
function openEditModal(index) {
    const chemical = chemicals[index];
    document.getElementById('EditModelLable').innerText = 'Edit Chemical';
    document.getElementById('chemicalName').value = chemical.name;
    document.getElementById('Vender').value = chemical.vender;
    document.getElementById('Density').value = chemical.density;
    document.getElementById('Viscosity').value = chemical.viscosity;
    document.getElementById('Packaging').value = chemical.packaging;
    document.getElementById('packSize').value = chemical.packSize;
    document.getElementById('Unit').value = chemical.unit;
    document.getElementById('Quantity').value = chemical.quantity;
    document.getElementById('editId').value = index;
    $('#EditModal').modal('show');
}

// Close the modal
function closeModal() {
    $('#EditModal').modal('hide');
}

//form submition
document.getElementById('chemicalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const index = document.getElementById('editId').value;
    const newChemical = {
        id: chemicals.length + 1,
        name: document.getElementById('chemicalName').value,
        vendor: document.getElementById('Vender').value,
        density: document.getElementById('Density').value,
        viscosity: document.getElementById('Viscosity').value,
        packaging: document.getElementById('Packaging').value,
        packSize: document.getElementById('packSize').value,
        unit: document.getElementById('Unit').value,
        quantity: document.getElementById('Quantity').value,
    };

    if (index === '') {
        
        chemicals.push(newChemical);
    } else {
       
        chemicals[index] = { ...chemicals[index], ...newChemical };
    }

    closeModal();
    renderTable();
});

// Delete row
function deleteData(index) {
    chemicals.splice(index, 1);  
    renderTable();  
}

// Scroll up 
function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });  
}

// Scroll down
function scrollDown() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });  
}

// Refresh data
function refreshTable() {
    fetchData();
}

// Save data to a JSON file (requires server-side handling)
function saveData() {
    alert('Data saved successfully!');
}

// Initial data fetch
fetchData();
