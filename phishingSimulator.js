// phishingSimulator.js

const scenarios = [
    {
        text: "Anda menerima email dari bank yang meminta Anda untuk memverifikasi informasi login Anda melalui tautan yang disediakan.",
        type: "phishing"
    },
    {
        text: "Anda mendapatkan email dari teman yang berisi tautan ke artikel berita populer.",
        type: "safe"
    },
    {
        text: "Pesan dari perusahaan besar meminta Anda untuk mengonfirmasi informasi akun melalui tautan.",
        type: "phishing"
    },
    {
        text: "Notifikasi dari media sosial yang menginformasikan tentang update keamanan tanpa meminta tindakan lebih lanjut.",
        type: "safe"
    },
    {
        text: "Pesan mendesak yang mengklaim bahwa akun Anda telah dikompromikan, meminta Anda untuk segera login melalui tautan.",
        type: "phishing"
    }
];

let currentScenarioIndex = 0;
let correctResponses = 0;

function startSimulation() {
    currentScenarioIndex = 0;
    correctResponses = 0;
    document.getElementById('phishing-intro').style.display = 'none';
    document.getElementById('phishing-scenario').style.display = 'block';
    loadScenario();
}

function loadScenario() {
    if (currentScenarioIndex < scenarios.length) {
        const scenario = scenarios[currentScenarioIndex];
        document.getElementById('scenario-text').textContent = scenario.text;
        document.getElementById('response-feedback').textContent = '';
    } else {
        endSimulation();
    }
}

function submitResponse(response) {
    const scenario = scenarios[currentScenarioIndex];
    const feedbackElement = document.getElementById('response-feedback');

    if (response === scenario.type) {
        feedbackElement.textContent = "Jawaban Anda benar!";
        feedbackElement.style.color = "green";
        correctResponses++;
    } else {
        feedbackElement.textContent = `Jawaban Anda salah. Ini sebenarnya ${scenario.type === 'phishing' ? 'phishing' : 'aman'}.`;
        feedbackElement.style.color = "red";
    }

    currentScenarioIndex++;
    setTimeout(loadScenario, 2000); // Berikan jeda sebelum skenario berikutnya
}

function endSimulation() {
    document.getElementById('phishing-scenario').style.display = 'none';
    document.getElementById('phishing-result').style.display = 'block';

    const resultText = document.getElementById('result-text');
    const totalScenarios = scenarios.length;
    const score = (correctResponses / totalScenarios) * 100;

    resultText.textContent = `Anda berhasil menjawab ${correctResponses} dari ${totalScenarios} skenario dengan benar. Skor Anda: ${score}%.`;

    if (score === 100) {
        resultText.style.color = "green";
        resultText.textContent += " Luar biasa! Anda sangat waspada terhadap phishing.";
    } else if (score >= 70) {
        resultText.style.color = "orange";
        resultText.textContent += " Bagus, tetapi tetaplah waspada terhadap tanda-tanda phishing.";
    } else {
        resultText.style.color = "red";
        resultText.textContent += " Anda perlu lebih berhati-hati. Pelajari lebih lanjut tentang tanda-tanda phishing.";
    }
}

function restartSimulation() {
    document.getElementById('phishing-result').style.display = 'none';
    document.getElementById('phishing-intro').style.display = 'block';
}
