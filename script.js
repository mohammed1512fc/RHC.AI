document.addEventListener('DOMContentLoaded', function () {
    initSymptomChecker();
    initPageElements();
    initAIAssistant();
});

function initPageElements() {
    const severitySlider = document.getElementById('severity');
    const severityValue = document.getElementById('severityValue');
    if (severitySlider && severityValue) {
        severityValue.textContent = severitySlider.value + '/10';
        severitySlider.addEventListener('input', function () {
            severityValue.textContent = this.value + '/10';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initAIAssistant() {
    const aiButton = document.querySelector('.ai-button');
    if (aiButton) {
        aiButton.addEventListener('click', () => {
            alert('AI Health Assistant: How can I help you today?');
        });
    }
}

function initSymptomChecker() {
    const form = document.getElementById('symptomForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analyzing...';

        setTimeout(() => {
            const analysis = analyzeSymptoms();
            displayResults(analysis);
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze Symptoms';
        }, 1800);
    });
}

function analyzeSymptoms() {
    const age = parseInt(document.getElementById('age').value) || 30;
    const gender = document.getElementById('gender').value || 'unknown';
    const symptomsInput = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value || 'unknown';
    const severity = parseInt(document.getElementById('severity').value) || 5;
    const additionalInfo = document.getElementById('additionalInfo').value || '';

    const symptomsList = symptomsInput
        .toLowerCase()
        .split(',')
        .map(s => s.trim())
        .filter(s => s);

    const inputData = { age, gender, duration, severity, additionalInfo, symptoms: symptomsList };

    return runAdvancedMatcher(inputData);
}

function runAdvancedMatcher(data) {
    const kb = getKnowledgeBase();
    let bestMatch = null;
    let bestScore = -1;

    for (const [condition, details] of Object.entries(kb)) {
        let score = 0;

        for (const userSymptom of data.symptoms) {
            if (details.symptoms.includes(userSymptom)) score += 3;
            else if (details.keywords.includes(userSymptom)) score += 2;
            else if (userSymptom.includes(details.name.toLowerCase())) score += 1;
        }

        if (data.severity >= 7 && ['urgent', 'emergency'].includes(details.triage)) score += 1;
        if (data.age > 65 && details.ageRisk) score += 1;

        if (score > bestScore) {
            bestScore = score;
            bestMatch = {
                condition: condition,
                confidence: Math.min(1, score / (details.symptoms.length * 3)),
                triage: details.triage,
                recommendations: details.recommendations
            };
        }
    }

    return bestMatch || {
        condition: 'No Clear Match Found',
        confidence: 0.4,
        triage: 'unknown',
        recommendations: [
            'Consider refining your symptoms.',
            'Contact a healthcare provider for further evaluation.'
        ]
    };
}

function displayResults(result) {
    const container = document.getElementById('resultsContainer');
    const section = document.getElementById('resultsSection');
    if (!container || !section) return;

    container.innerHTML = `
        <div class="result-card">
            <h2>Possible Condition: ${result.condition}</h2>
            <p><strong>Confidence:</strong> ${(result.confidence * 100).toFixed(1)}%</p>
            <p><strong>Triage:</strong> ${result.triage}</p>
            <h3>Recommendations:</h3>
            <ul>
                ${result.recommendations.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>
    `;
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth' });
}

function getKnowledgeBase() {
    return {
        'Common Cold': {
            name: 'Common Cold',
            symptoms: ['cough', 'sore throat', 'runny nose', 'congestion', 'sneezing'],
            keywords: ['cold', 'congested', 'sniffles'],
            triage: 'mild',
            confidence: 0.85,
            ageRisk: false,
            recommendations: [
                'Rest and drink fluids',
                'Use OTC medications',
                'Consult doctor if over 10 days'
            ]
        },
        'Influenza': {
            name: 'Influenza',
            symptoms: ['fever', 'chills', 'fatigue', 'headache', 'muscle aches'],
            keywords: ['flu', 'influenza', 'body aches'],
            triage: 'routine',
            confidence: 0.88,
            ageRisk: true,
            recommendations: [
                'Take antivirals if early',
                'Stay isolated',
                'Seek care if respiratory symptoms worsen'
            ]
        },
        'COVID-19': {
            name: 'COVID-19',
            symptoms: ['fever', 'cough', 'fatigue', 'loss of taste', 'shortness of breath'],
            keywords: ['covid', 'coronavirus', 'loss of smell'],
            triage: 'urgent',
            confidence: 0.90,
            ageRisk: true,
            recommendations: [
                'Self-isolate and test',
                'Contact doctor',
                'Go to ER if breathing worsens'
            ]
        },
        'Pneumonia': {
            name: 'Pneumonia',
            symptoms: ['cough', 'fever', 'chest pain', 'fatigue', 'shortness of breath'],
            keywords: ['lung infection', 'productive cough'],
            triage: 'urgent',
            confidence: 0.78,
            ageRisk: true,
            recommendations: [
                'Seek urgent evaluation',
                'Chest X-ray may be needed',
                'Antibiotics if bacterial'
            ]
        },
        'Appendicitis': {
            name: 'Appendicitis',
            symptoms: ['abdominal pain', 'nausea', 'vomiting', 'fever', 'loss of appetite'],
            keywords: ['rlq pain', 'rebound tenderness'],
            triage: 'emergency',
            confidence: 0.92,
            ageRisk: false,
            recommendations: [
                'Seek emergency care',
                'Do not eat or drink',
                'CT scan may confirm diagnosis'
            ]
        },
        'Migraine': {
            name: 'Migraine',
            symptoms: ['headache', 'nausea', 'light sensitivity', 'aura', 'vomiting'],
            keywords: ['migraine', 'throbbing pain'],
            triage: 'routine',
            confidence: 0.84,
            ageRisk: false,
            recommendations: [
                'Rest in dark room',
                'Use prescribed meds',
                'Identify and avoid triggers'
            ]
        },
        'Heart Attack': {
            name: 'Heart Attack',
            symptoms: ['chest pain', 'shortness of breath', 'nausea', 'jaw pain', 'sweating'],
            keywords: ['myocardial infarction', 'heart', 'tight chest'],
            triage: 'emergency',
            confidence: 0.95,
            ageRisk: true,
            recommendations: [
                'CALL 911 IMMEDIATELY',
                'Chew aspirin (if not allergic)',
                'Stay calm and seated'
            ]
        },
        // Add 40+ more here...
    };
}
