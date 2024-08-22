// passwordManager.js

// Fungsi untuk memeriksa kekuatan kata sandi
function checkPassword() {
    const password = document.getElementById('password').value;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W]/.test(password)) score++;

    let message = "";
    let color = "";
    switch (score) {
        case 5:
            message = "Kata sandi sangat kuat!";
            color = "green";
            break;
        case 4:
            message = "Kata sandi kuat.";
            color = "blue";
            break;
        case 3:
            message = "Kata sandi cukup.";
            color = "orange";
            break;
        default:
            message = "Kata sandi lemah.";
            color = "red";
    }
    displayResult('password-result', message, color);
}

// Fungsi untuk menghasilkan kata sandi
function generatePassword() {
    const length = document.getElementById('password-length').value;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    displayResult('generated-password', `Kata sandi baru: ${password}`, 'green');
}

// Fungsi untuk menyimpan kata sandi di localStorage
function savePassword() {
    const serviceName = document.getElementById('service-name').value;
    const password = document.getElementById('password-to-save').value;

    if (!serviceName || !password) {
        displayResult('save-result', "Nama layanan dan kata sandi tidak boleh kosong.", 'red');
        return;
    }

    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || {};
    storedPasswords[serviceName] = password;
    localStorage.setItem('passwords', JSON.stringify(storedPasswords));

    displayResult('save-result', "Kata sandi berhasil disimpan.", 'green');
    loadSavedPasswords(); // Memperbarui daftar kata sandi yang tersimpan
}

// Fungsi untuk memuat kata sandi yang tersimpan dan menampilkannya
function loadSavedPasswords() {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || {};
    const passwordList = document.getElementById('saved-passwords-list');
    passwordList.innerHTML = '';

    for (let serviceName in storedPasswords) {
        const listItem = document.createElement('li');
        listItem.textContent = `${serviceName}: ${'*'.repeat(storedPasswords[serviceName].length)}`;
        listItem.onclick = function () {
            alert(`Kata sandi untuk ${serviceName}: ${storedPasswords[serviceName]}`);
        };
        passwordList.appendChild(listItem);
    }
}

// Fungsi untuk menampilkan hasil dengan pesan dan warna tertentu
function displayResult(elementId, message, color) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = color;
}

// Memuat kata sandi yang tersimpan saat halaman dimuat
window.onload = loadSavedPasswords;
