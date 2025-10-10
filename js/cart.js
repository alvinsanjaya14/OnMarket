// Login Akun js
const isLoggedIn = localStorage.getItem("isLoggedIn");
const userName = localStorage.getItem("userName");
const navMenu = document.getElementById("navLinks");

if (isLoggedIn === "true" && userName) {
  navMenu.innerHTML = `
    <button class="close-btn" onclick="closeMenu()">×</button>
    <li><a href="../index.html">Home</a></li>
    <li><a href="../loginfitur/contact.html">Contact</a></li>
    <li><h1 class="btn-rush">${userName}</h1></li>
    <li><a href="#" class="btn-out">Logout</a></li>
  `;

  document.querySelector(".btn-out").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("cartCount");
    alert("Anda sudah logout.");
    window.location.href = "./loginfitur/login.html";
  });
}

// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemPrice = parseInt(item.price) || 0;
    const itemQuantity = item.quantity || 1;
    const subTotal = itemPrice * itemQuantity;
    total += subTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="60">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>Rp ${itemPrice.toLocaleString()}</p>
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${index})">−</button>
          <span>${itemQuantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
        <p><strong>Subtotal: Rp ${subTotal.toLocaleString()}</strong></p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Hapus</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = total.toLocaleString();
  if (cartCount) cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function increaseQuantity(index) {
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

renderCart();

// Checkout
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "./payment.html";
  });
}
