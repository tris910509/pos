// Helper Functions
const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const generateId = (prefix) => `${prefix}-${Date.now()}`;
const showSection = (sectionId) => {
    document.querySelectorAll('.section').forEach(section => section.classList.add('d-none'));
    document.getElementById(sectionId).classList.remove('d-none');
};

// Pelanggan
function addCustomer() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const id = generateId('CUST');

    if (!name || !phone || !address || !email) {
        alert('Semua field wajib diisi!');
        return;
    }

    if (!/^\d+$/.test(phone)) {
        alert('Nomor Handphone harus berupa angka!');
        return;
    }

    const customers = getFromLocalStorage('customers');
    customers.push({ id, name, phone, address, email });
    saveToLocalStorage('customers', customers);
    displayCustomers();
    document.getElementById('customerForm').reset();
}

function displayCustomers(customers = getFromLocalStorage('customers')) {
    const list = document.getElementById('customerList');
    list.innerHTML = customers.map(c => `
        <div class="d-flex justify-content-between align-items-center mb-2 border p-2 rounded">
            <span>${c.id} - ${c.name} (${c.phone}, ${c.email}, ${c.address})</span>
            <div>
                <button class="btn btn-sm btn-warning me-1" onclick="editCustomer('${c.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCustomer('${c.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

function searchCustomer() {
    const query = document.getElementById('searchCustomer').value.toLowerCase();
    const customers = getFromLocalStorage('customers');
    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.phone.toLowerCase().includes(query)
    );
    displayCustomers(filtered);
}

// Edit and Delete Customer (similar functions for products, suppliers, transactions)
function editCustomer(id) {
    // Edit logic
}

function deleteCustomer(id) {
    const customers = getFromLocalStorage('customers');
    const updatedCustomers = customers.filter(c => c.id !== id);
    saveToLocalStorage('customers', updatedCustomers);
    displayCustomers();
}

// Similar CRUD functions for categories, suppliers, products, transactions
// Add reporting and stock management functions as outlined earlier