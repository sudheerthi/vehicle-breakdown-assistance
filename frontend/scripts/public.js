const PUBLIC_API_URL = 'http://localhost:5000/api/public/mechanics1';

let allMechanics = []; // Add global storage for mechanics

(async () => {
    try {
        const response = await fetch(PUBLIC_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const mechanics = await response.json();
        allMechanics = mechanics; // Store all mechanics globally
        displayMechanics(mechanics); // Call display function
    } catch (error) {
        console.error('Error fetching mechanics:', error);
    }
})();

// Function to display mechanics (extracted to reuse)
function displayMechanics(mechanics) {
    const list = document.getElementById('mechanics-list');
    list.innerHTML = ''; // Clear current list

    mechanics.forEach((mechanic) => {
        const item = document.createElement('li');
        item.className = 'mechanic-list'; // Add class for filtering
        item.setAttribute('data-name', mechanic.shopName ? mechanic.shopName.toLowerCase() : ''); // Add data attributes
        item.setAttribute('data-location', mechanic.shopLocation ? mechanic.shopLocation.toLowerCase() : '');

        item.innerHTML = `
            <img src="${mechanic.shopImage || 'default-image.jpg'}" alt="Shop Image" style="max-width: 300px; height: auto; border: 1px solid #ccc; border-radius: 8px; margin-top: 10px;" /> 
            Name: ${mechanic.shopName || 'N/A'} <br>
            Email: ${mechanic.email || 'N/A'} <br>
            Contact: ${mechanic.phone || 'N/A'} <br>
            Location: ${mechanic.shopLocation || 'N/A'} <br>
            <div>
                <button onclick="window.location.href='user.html'">Request Service</button>
            </div>`;
        list.appendChild(item);
    });
}

// Filter function (unchanged but now should work)
function filterMechanics() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const mechanics = document.querySelectorAll('.mechanic-list');
    
    mechanics.forEach(mechanic => {
        const name = mechanic.getAttribute('data-name');
        const location = mechanic.getAttribute('data-location');
        const matchesSearch = (name && name.includes(searchInput)) || (location && location.includes(searchInput));
        mechanic.style.display = matchesSearch ? 'block' : 'none';
    });
}