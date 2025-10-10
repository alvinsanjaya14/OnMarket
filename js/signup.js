// sign up js
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      alert("Email sudah terdaftar! Silakan login.");
      window.location.href = "./login.html";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "./login.html";
  });