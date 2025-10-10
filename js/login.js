// login js
 document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", foundUser.name);

      alert("Login berhasil! Selamat datang " + foundUser.name);
      window.location.href = "../index.html"; 
    } else {
      alert("Email atau password salah!");
    }
  });