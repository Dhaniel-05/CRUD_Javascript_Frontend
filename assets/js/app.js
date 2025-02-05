let shoppingCart;

// Función para renderizar productos
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <div class="product-buttons">
                <button class="btn btn-primary" onclick="shoppingCart.addItem(${product.id})">
                    Agregar al carrito
                </button>
                <button class="btn btn-secondary" onclick="showProductModal(${product.id})">
                    Ver
                </button>
            </div>
        </div>
    `).join('');
}

// Funciones para el carrito
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.getElementById('overlay');
    cartModal.classList.toggle('active');
    overlay.classList.toggle('active');
}

function checkout() {
    if (shoppingCart.cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const total = shoppingCart.getTotal();
    alert(`¡Gracias por tu compra! Total: $${total.toFixed(2)}`);
    shoppingCart.clearCart();
    toggleCart();
}

// Funciones para el modal de producto
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-product-details');

    modalContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <h2 class="modal-product-title">${product.name}</h2>
        <p class="modal-product-price">$${product.price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p class="modal-product-description">${product.description}</p>
        <button class="btn btn-primary" onclick="shoppingCart.addItem(${product.id}); hideProductModal();">
            Agregar al carrito
        </button>
    `;

    modal.style.display = 'block';
}

function hideProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

// Funciones para la búsqueda
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => `
                <div class="search-result-item" onclick="handleSearchResultClick(${product.id})">
                    ${product.name} - $${product.price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No se encontraron resultados</div>';
            searchResults.style.display = 'block';
        }
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
}

function handleSearchResultClick(productId) {
    showProductModal(productId);
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('search-input').value = '';
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    shoppingCart = new ShoppingCart();
    renderProducts();
    setupSearch();

    // Event listener para cerrar el modal
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('product-modal');
    
    closeModal.onclick = hideProductModal;
    modal.onclick = (e) => {
        if (e.target === modal) hideProductModal();
    };
});