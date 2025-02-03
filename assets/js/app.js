let shoppingCart;

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <button class="btn btn-primary" onclick="shoppingCart.addItem(${product.id})">
                Agregar al carrito
            </button>
        </div>
    `).join('');
}

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

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    shoppingCart = new ShoppingCart();
    renderProducts();
});