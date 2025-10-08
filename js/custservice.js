// navabr
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
  }
// akhir navbar

// Fungsi Search FAQ
    function filterFAQ() {
      const searchValue = document.getElementById("faqSearch").value.toLowerCase();
      const details = document.querySelectorAll(".faq-section details");
      details.forEach(item => {
        const summaryText = item.querySelector("summary").textContent.toLowerCase();
        const contentText = item.querySelector("p").textContent.toLowerCase();
        item.style.display =
          summaryText.includes(searchValue) || contentText.includes(searchValue)
            ? "block"
            : "none";
      });
    }

// Balik langsung ke halaman signup
function goBackToSignup() {
  window.location.href = "./signup.html";
}
