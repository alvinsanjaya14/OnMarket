// Login Akun js
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userName = localStorage.getItem("userName");
      const navMenu = document.getElementById("navLinks");

      if (isLoggedIn === "true" && userName) {
        navMenu.innerHTML = `
          <button class="close-btn" onclick="closeMenu()">×</button>
          <li><a href="../index.html">Home</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><h1 class="btn-rush"> ${userName}</h1></li>
          <li><a href="#" class="btn-out">Logout</a></li>
        `;

        document.querySelector(".btn-out").addEventListener("click", function(e) {
          e.preventDefault();
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userName");
          localStorage.removeItem("cartCount");
          alert("Anda sudah logout.");
          window.location.href = "./loginfitur/login.html"; // Redirect to Login page after logout
        });

      };


// Load cart dari localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemPrice = parseInt(item.price) || 0;
    total += itemPrice;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="60">
      <div>
        <h4>${item.name}</h4>
        <p>Rp ${itemPrice.toLocaleString()}</p>
      </div>
      <button onclick="removeItem(${index})">Hapus</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = total.toLocaleString();
  if (cartCount) cartCount.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// render pertama kali
renderCart();

// Checkout
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "./payment.html";
  });
}

// akhir fitur cart
