// Create JavaScript for:
// 1. Menu filtering by category and dietary preference
// 2. Add to cart functionality
// 3. LocalStorage for cart persistence
// 4. Cart total calculation
// 5. Checkout message
// Menu data
const menuItems = [
    { id: 1, name: 'Caesar Salad', category: 'salads', dietary: 'vegetarian', price: 12 },
    { id: 2, name: 'Grilled Chicken', category: 'mains', dietary: 'gluten-free', price: 18 },
    { id: 3, name: 'Pasta Carbonara', category: 'mains', dietary: 'vegetarian', price: 16 },
    { id: 4, name: 'Vegan Bowl', category: 'salads', dietary: 'vegan', price: 14 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Filter menu by category and dietary preference
function filterMenu(category, dietary) {
    return menuItems.filter(item => 
        (!category || item.category === category) &&
        (!dietary || item.dietary === dietary)
    );
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const cartItem = cart.find(ci => ci.id === itemId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Mobile menu toggle
function initMobileMenu() {
    const menuButton = document.querySelector('button.md\\:hidden');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            const navLinks = document.querySelector('.hidden.md\\:flex');
            if (navLinks) {
                navLinks.classList.toggle('hidden');
            }
        });
    }
}

// Contact button functionality
function initContactButton() {
    const contactLinks = document.querySelectorAll('a[href="contact.html"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Navigation will happen automatically, but you can add additional logic here
            console.log('Navigating to contact page');
        });
    });
}

// Initialize all event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactButton();
});

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    const total = getCartTotal();
    alert(`Thank you for your order! Total: $${total.toFixed(2)}`);
    cart = [];
    localStorage.removeItem('cart');
}