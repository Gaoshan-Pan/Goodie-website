// Function to send custom events to Google Analytics
function trackEvent(eventCategory, eventAction, eventLabel) {
    gtag('event', eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
    });
}

// Track mouse movement
document.addEventListener('mousemove', function (event) {
    trackEvent('Mouse Movement', 'Move', `X=${event.clientX}, Y=${event.clientY}`);
});

// Track clicks
document.addEventListener('click', function (event) {
    trackEvent('Mouse Click', 'Click', `Clicked at X=${event.clientX}, Y=${event.clientY}`);
});

// Track scroll events
document.addEventListener('scroll', function () {
    trackEvent('Page Interaction', 'Scroll', 'User scrolled the page');
});

// Add product to the cart
function addToCart(product, price) {
    // Retrieve the cart from localStorage or initialize an empty cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the selected product to the cart
    cart.push({ name: product, price });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show confirmation message
    alert(`${product} has been added to your cart!`);
}

// Render the cart items on the "Cart" page
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the cart display
    cartContainer.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach((item, index) => {
            // Create cart item elements
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeItem(${index})">Remove</button>
            `;

            // Append the item to the cart container
            cartContainer.appendChild(cartItem);
            total += item.price;
        });
    }

    // Update the total cost
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
}

// Remove an item from the cart
function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the selected item
    cartItems.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Re-render the cart
    renderCart();
}

// Clear the entire cart
function clearCart() {
    // Remove all items from localStorage
    localStorage.removeItem('cart');

    // Re-render the cart
    renderCart();
}

// Initialize the cart page
if (window.location.pathname.includes('cart.html')) {
    renderCart();
}


