// navabr
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
  }
// akhir navbar

// fitur keranjang (cart)

// Cek login pas buka cart.html
document.getElementById("cart-link").addEventListener("click", (e) => {
  e.preventDefault();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    alert("Silakan login terlebih dahulu untuk membuka Cart Page.");
    window.location.href = "./loginfitur/login.html";
  } else {
    window.location.href = "./loginfitur/cart.html";
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