console.log("Welcome to Varnzz's placeee!");
// Utility Functions

function formatPrice(price) {
    return "$" + price.toFixed(2);
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
    localStorage.removeItem("cart");
}

// Cart Logic

function addItemToCart(name, price) {
    let cart = getCart();

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);
}

function removeItemFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

function updateQuantity(index, qty) {
    let cart = getCart();

    if (qty <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = qty;
    }

    saveCart(cart);
}

// Calculations

function calculateSubtotal(cart) {
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    return subtotal;
}

function calculateTax(amount) {
    return amount * 0.05;
}

function calculateTotal(cart) {
    let subtotal = calculateSubtotal(cart);
    let tax = calculateTax(subtotal);
    return subtotal + tax;
}

// UI Helpers

function updateCartCount() {
    let cart = getCart();

    let count = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    let element = document.getElementById("cart-count");

    if (element) {
        element.innerText = count;
    }
}

function showMessage(text) {
    console.log(text);
}

// Payment Flow

function savePaymentMethod(method) {
    localStorage.setItem("paymentMethod", method);
}

function getPaymentMethod() {
    return localStorage.getItem("paymentMethod");
}

// Fake Order System

function generateOrderNumber() {
    return "ORD-" + Math.floor(Math.random() * 1000000);
}

function generateTimestamp() {
    let now = new Date();
    return now.toLocaleString();
}

// Page Initialization

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

// Debug Helpers

function logCart() {
    console.log(getCart());
}

function clearAllData() {
    localStorage.clear();
}