  // Cek login status
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userName = localStorage.getItem("userName");
      const navMenu = document.getElementById("navLinks");

      if (isLoggedIn === "true" && userName) {
        navMenu.innerHTML = `
          <button class="close-btn" onclick="closeMenu()">×</button>
          <li><a href="../index.html">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="./loginfitur/contact.html">Contact</a></li>
          <li class="mobile-search">
          <input type="text" placeholder="Search...">
           </li>
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
   
      // navabr
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
  }
// akhir navbar
  

  // Tombol Belanja Sekarang di index.html
document.getElementById("shop-now-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    alert("Silakan login terlebih dahulu");
    window.location.href = "./loginfitur/login.html";
  } else {
    // Scroll ke bagian Recommended Products
    const recommendedSection = document.getElementById("recommended-products");
    if (recommendedSection) {
      recommendedSection.scrollIntoView();
    };
  }
});

// Tambah ke cart
const addToCartButtons = document.querySelectorAll(".product-card button");

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

    // Ambil harga  class "price"
    const priceText = productCard.querySelector(".price").textContent
      .replace("Rp", "")
      .replace(/\./g, "")
      .trim();

    const price = parseInt(priceText) || 0;
    const image = productCard.querySelector("img").src;

    // Buat objek produk
    const product = { name, price, image };

    // Ambil cart lama
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);

    // Simpan lagi ke localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update count di navbar
    document.getElementById("cart-count").textContent = cart.length;

    alert(`${name} berhasil ditambahkan ke keranjang!`);
  });
});

// akhir fitur keranjang


  
  
  // Cek login sebelum kirim pesan
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn !== "true") {
        alert("Anda harus login terlebih dahulu sebelum menghubungi kami.");
        window.location.href = "./login.html";
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Harap lengkapi semua data sebelum mengirim pesan.");
        return;
      }

      alert(`Terima kasih ${name}, pesan Anda telah dikirim!`);
      contactForm.reset();
    });