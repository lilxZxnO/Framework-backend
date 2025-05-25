let restaurantToEdit = null;

function showTab(tabName) {
    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}

async function loadRestaurants() {
    const response = await fetch('/api/restaurants');
    const restaurants = await response.json();
    const tbody = document.querySelector('#restaurantsTable tbody');
    tbody.innerHTML = '';
    restaurants.forEach(restaurant => {
        tbody.innerHTML += `
            <tr>
                <td>${restaurant.id}</td>
                <td>${restaurant.name}</td>
                <td>${restaurant.location}</td>
                <td>
                    <button onclick="editRestaurant(${restaurant.id}, '${restaurant.name.replace(/'/g, "&#39;")}', '${restaurant.location.replace(/'/g, "&#39;")}')">Modifier</button>
                    <button onclick="deleteRestaurant(${restaurant.id})">Supprimer</button>
                </td>
            </tr>
        `;
    });
    updateRestaurantSelect();
}

function editRestaurant(id, name, location) {
    document.getElementById('restaurantName').value = name;
    document.getElementById('restaurantAddress').value = location;
    restaurantToEdit = id;
    document.querySelector('#restaurantForm button[type="submit"]').textContent = "Mettre à jour";
}

async function addRestaurant(event) {
    event.preventDefault();
    const restaurant = {
        name: document.getElementById('restaurantName').value,
        location: document.getElementById('restaurantAddress').value
    };
    let response;
    if (restaurantToEdit) {
        response = await fetch(`/api/restaurants/${restaurantToEdit}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restaurant)
        });
        restaurantToEdit = null;
        document.querySelector('#restaurantForm button[type="submit"]').textContent = "Ajouter Restaurant";
    } else {
        response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(restaurant)
        });
    }
    if (response.ok) {
        document.getElementById('restaurantForm').reset();
        loadRestaurants();
    } else {
        alert("Erreur lors de l'enregistrement du restaurant");
    }
}

async function deleteRestaurant(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
        await fetch(`/api/restaurants/${id}`, { method: 'DELETE' });
        loadRestaurants();
    }
}

async function loadEmployees() {
    const response = await fetch('/api/employees');
    const employees = await response.json();
    const tbody = document.querySelector('#employeesTable tbody');
    tbody.innerHTML = '';
    employees.forEach(employee => {
        tbody.innerHTML += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.restaurant ? employee.restaurant.name : 'N/A'}</td>
                <td>
                    <button onclick="deleteEmployee(${employee.id})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

async function updateRestaurantSelect() {
    const response = await fetch('/api/restaurants');
    const restaurants = await response.json();
    const select = document.getElementById('employeeRestaurant');
    select.innerHTML = '';
    restaurants.forEach(restaurant => {
        select.innerHTML += `<option value="${restaurant.id}">${restaurant.name}</option>`;
    });
}

async function addEmployee(event) {
    event.preventDefault();
    const employee = {
        name: document.getElementById('employeeName').value,
        email: document.getElementById('employeeEmail').value,
        restaurant_id: document.getElementById('employeeRestaurant').value
    };
    await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
    document.getElementById('employeeForm').reset();
    loadEmployees();
}

async function deleteEmployee(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        await fetch(`/api/employees/${id}`, { method: 'DELETE' });
        loadEmployees();
    }
}


document.getElementById('restaurantForm').addEventListener('submit', addRestaurant);
document.getElementById('employeeForm').addEventListener('submit', addEmployee);


loadRestaurants();
loadEmployees(); 