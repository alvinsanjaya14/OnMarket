// Login
const isLoggedIn = localStorage.getItem("isLoggedIn");
const userName = localStorage.getItem("userName");
const navMenu = document.getElementById("navLinks");

if (isLoggedIn === "true" && userName && navMenu) {
  navMenu.innerHTML = `
    <button class="close-btn" onclick="closeMenu()">×</button>
    <li><a href="../index.html">Home</a></li>
    <li><a href="../loginfitur/contact.html">Contact</a></li>
    <li><h1 class="btn-rush">${userName}</h1></li>
    <li><a href="#" class="btn-out">Logout</a></li>
  `;

  document.querySelector(".btn-out").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItems");
    alert("Anda sudah logout.");
    window.location.href = "../loginfitur/login.html";
  });
}

// Mobile
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
function closeMenu() {
  document.getElementById("navLinks").classList.remove("active");
}

const checkoutSummary = document.getElementById("checkout-summary");
const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

function renderCheckoutSummary() {
  if (!checkoutItems.length) {
    checkoutSummary.innerHTML = `<p>Keranjang kosong. Silakan kembali belanja.</p>`;
    return;
  }

  let total = 0;
  let html = `<h2>Ringkasan Pesanan</h2>`;

  checkoutItems.forEach(item => {
    const price = parseInt(item.price) || 0;
    const qty = item.quantity || 1;
    const subTotal = price * qty;
    total += subTotal;

    html += `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}" class="summary-img">
        <div class="summary-info">
          <p><strong>${item.name}</strong> (x${qty})</p>
          <p>Rp ${price.toLocaleString()}</p>
        </div>
      </div>
    `;
  });

  html += `<hr><h3>Total: Rp ${total.toLocaleString()}</h3>`;
  checkoutSummary.innerHTML = html;
}

renderCheckoutSummary();

const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const selected = document.querySelector('input[name="payment"]:checked');
  const detailBox = document.getElementById("paymentDetails");

  if (!selected) {
    alert("Silakan pilih metode pembayaran.");
    return;
  }

  const method = selected.value;
  detailBox.style.display = "block";

  if (method === "transfer") {
    const va = "8808" + Math.floor(100000000 + Math.random() * 900000000);
    detailBox.innerHTML = `
      <h3>Transfer Bank</h3>
      <p>Silakan transfer ke nomor Virtual Account berikut:</p>
      <div class="va-box">
        <p><b>Bank BNI</b></p>
        <p>No. VA: <span id="vaNumber">${va}</span></p>
      </div>
      <button class="copy-btn" onclick="copyVA()">Salin Nomor VA</button>
      <p class="note">Setelah pembayaran, pesanan akan diproses.</p>
    `;
  } else if (method === "ewallet") {
    detailBox.innerHTML = `
      <h3>Pembayaran via E-Wallet</h3>
      <p>Pilih E-Wallet:</p>
      <ul class="ewallet-list">
        <li><b>OVO</b>: 0852-1234-5678</li>
        <li><b>GoPay</b>: 0813-9876-5432</li>
        <li><b>Dana</b>: 0899-5555-2222</li>
      </ul>
      <p class="note">Nama penerima: <b>OnMarket Official</b></p>
    `;
  } else if (method === "cod") {
    detailBox.innerHTML = `
      <h3>COD (Bayar di Tempat)</h3>
      <p>Pesanan akan dikirim ke alamat Anda.</p>
      <p class="note">Pastikan alamat & nomor telepon benar.</p>
    `;
  }

  setTimeout(() => {
    alert("✅ Pembayaran Berhasil! Terima kasih sudah belanja.");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItems");
    window.location.href = "../index.html";
  }, 1500);
});

// Copy VA
function copyVA() {
  const va = document.getElementById("vaNumber").textContent;
  navigator.clipboard.writeText(va);
  alert("Nomor Virtual Account disalin:\n" + va);
}
