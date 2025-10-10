document.addEventListener("DOMContentLoaded", function () {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");
  const navMenu = document.getElementById("navLinks");

  if (navMenu && isLoggedIn === "true" && userName) {
    navMenu.innerHTML = `
      <button class="close-btn" onclick="closeMenu()">×</button>
      <li><a href="../index.html">Home</a></li>
      <li><a href="./loginfitur/aboutus.html">About</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="../loginfitur/contact.html" target="_blank">Contact Us</a></li>
      <li class="mobile-search">
        <input type="text" placeholder="Search...">
      </li>
      <li><h1 class="btn-rush">${userName}</h1></li>
      <li><a href="#" class="btn-out">Logout</a></li>
    `;

    const logoutBtn = document.querySelector(".btn-out");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("cartCount");
        alert("Anda sudah logout.");
        window.location.href = "../loginfitur/login.html";
      });
    }
  }

  window.toggleMenu = function () {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
      navLinks.classList.toggle("active");
    }
  };

  window.closeMenu = function () {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
      navLinks.classList.remove("active");
    }
  };

  const cartLink = document.getElementById("cart-link");
  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        alert("Silakan login terlebih dahulu untuk membuka Cart Page.");
        window.location.href = "../loginfitur/login.html";
      } else {
        window.location.href = "../loginfitur/cart.html";
      }
    });
  }

  const shopNowBtn = document.getElementById("shop-now-btn");
  if (shopNowBtn) {
    shopNowBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn !== "true") {
        alert("Silakan login terlebih dahulu");
        window.location.href = "../loginfitur/login.html";
      } else {
        const recommendedSection = document.getElementById("recommended-products");
        if (recommendedSection) {
          recommendedSection.scrollIntoView();
        }
      }
    });
  }

  const addToCartButtons = document.querySelectorAll(".product-card button");

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
          alert("Anda harus login terlebih dahulu untuk menambah ke keranjang.");
          window.location.href = "./loginfitur/login.html";
          return;
        }

        const productCard = e.target.closest(".product-card");
        const name = productCard.querySelector("h3").textContent;
        const priceText = productCard.querySelector(".price").textContent
          .replace("Rp", "")
          .replace(/\./g, "")
          .trim();

        const price = parseInt(priceText) || 0;
        const image = productCard.querySelector("img").src;
        const product = { name, price, image };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        const cartCount = document.getElementById("cart-count");
        if (cartCount) cartCount.textContent = cart.length;

        alert(`${name} berhasil ditambahkan ke keranjang!`);
      });
    });
  }

});
