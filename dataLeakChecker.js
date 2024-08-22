// dataLeakChecker.js

async function checkDataLeak() {
    const email = document.getElementById('email').value;
    const leakResult = document.getElementById('leak-result');
    const breachDetails = document.getElementById('breach-details');
    const apiKey = '6f3be5c3f5mshbf78b4627040e24p1d6eb7jsn6e116d9aeecc'; // Ganti dengan API key Anda
    const url = `https://breachdirectory.p.rapidapi.com/?func=auto&term=${encodeURIComponent(email)}`;

    // Reset hasil sebelumnya
    leakResult.textContent = "Memeriksa, mohon tunggu...";
    leakResult.style.color = "orange";
    breachDetails.innerHTML = '';

    try {
        const response = await fetch(url, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'breachdirectory.p.rapidapi.com'
            }
        });

        const data = await response.json();

        if (data.success) {
            if (data.found) {
                displayBreaches(data.data);
                leakResult.textContent = "Alamat email Anda ditemukan dalam kebocoran data.";
                leakResult.style.color = "red";
                document.getElementById('leak-checker-intro').style.display = 'none';
                document.getElementById('leak-details').style.display = 'block';
            } else {
                leakResult.textContent = "Alamat email Anda aman, tidak ditemukan dalam kebocoran data.";
                leakResult.style.color = "green";
            }
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        leakResult.textContent = `Terjadi kesalahan: ${error.message}`;
        leakResult.style.color = "red";
    }
}

function displayBreaches(breaches) {
    const breachDetails = document.getElementById('breach-details');
    breachDetails.innerHTML = '';

    breaches.forEach(breach => {
        const breachCard = document.createElement('div');
        breachCard.classList.add('breach-card');

        const title = document.createElement('h3');
        title.textContent = breach.title;

        const domain = document.createElement('p');
        domain.innerHTML = `<strong>Domain:</strong> ${breach.domain}`;

        const date = document.createElement('p');
        date.innerHTML = `<strong>Tanggal Kebocoran:</strong> ${new Date(breach.breach_date).toLocaleDateString()}`;

        const description = document.createElement('p');
        description.innerHTML = `<strong>Deskripsi:</strong> ${breach.description}`;

        const compromisedData = document.createElement('p');
        compromisedData.innerHTML = `<strong>Data yang Terkompromi:</strong> ${breach.data_classes.join(', ')}`;

        breachCard.appendChild(title);
        breachCard.appendChild(domain);
        breachCard.appendChild(date);
        breachCard.appendChild(description);
        breachCard.appendChild(compromisedData);

        breachDetails.appendChild(breachCard);
    });
}

function restartLeakCheck() {
    document.getElementById('leak-details').style.display = 'none';
    document.getElementById('leak-checker-intro').style.display = 'block';
    document.getElementById('leak-result').textContent = '';
    document.getElementById('email').value = '';
}
