// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Load tips keamanan atau informasi lain jika diperlukan di sini
});

function displayResult(elementId, message, color) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = color;
}
