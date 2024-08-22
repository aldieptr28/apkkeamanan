// securityAssessment.js

function startAssessment() {
    document.getElementById('assessment-intro').style.display = 'none';
    document.getElementById('security-questions').style.display = 'block';
}

document.getElementById('assessment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const answers = {
        question1: document.getElementById('question-1').value,
        question2: document.getElementById('question-2').value,
        question3: document.getElementById('question-3').value,
        question4: document.getElementById('question-4').value,
        question5: document.getElementById('question-5').value
    };

    evaluateSecurity(answers);
});

function evaluateSecurity(answers) {
    let score = 0;
    let suggestions = [];

    if (answers.question1 === 'yes') score++;
    else suggestions.push("Pertimbangkan untuk mengatur akun media sosial Anda menjadi privat.");

    if (answers.question2 === 'yes') score++;
    else suggestions.push("Aktifkan autentikasi dua faktor di akun penting Anda.");

    if (answers.question3 === 'yes') score++;
    else suggestions.push("Hindari mengklik tautan mencurigakan di email atau pesan.");

    if (answers.question4 === 'yes') score++;
    else suggestions.push("Gunakan VPN saat mengakses Wi-Fi publik untuk keamanan lebih.");

    if (answers.question5 === 'yes') score++;
    else suggestions.push("Pastikan perangkat lunak Anda selalu diperbarui.");

    displayResult(score, suggestions);
}

function displayResult(score, suggestions) {
    const resultText = document.getElementById('result-text');
    const suggestionsText = document.getElementById('suggestions-text');
    document.getElementById('security-questions').style.display = 'none';
    document.getElementById('assessment-result').style.display = 'block';

    resultText.textContent = `Anda menjawab ${score} dari 5 pertanyaan dengan benar.`;

    if (score === 5) {
        resultText.style.color = "green";
        suggestionsText.textContent = "Keamanan online Anda sangat baik!";
    } else if (score >= 3) {
        resultText.style.color = "orange";
        suggestionsText.textContent = "Keamanan online Anda cukup baik, namun perhatikan saran berikut:\n" + suggestions.join("\n");
    } else {
        resultText.style.color = "red";
        suggestionsText.textContent = "Keamanan online Anda perlu ditingkatkan. Perhatikan saran berikut:\n" + suggestions.join("\n");
    }
}

function restartAssessment() {
    document.getElementById('assessment-result').style.display = 'none';
    document.getElementById('assessment-intro').style.display = 'block';
}
