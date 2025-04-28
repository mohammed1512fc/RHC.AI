// script.js (Hyper-Polished Rapid Health Checker AI)

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('symptomForm');
    const resultDiv = document.getElementById('result');
    const submitButton = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        analyzeSymptoms();
    });

    function analyzeSymptoms() {
        const symptomsInput = document.getElementById('symptoms').value.toLowerCase().trim();
        resultDiv.innerHTML = '';

        if (!symptomsInput) {
            return displayError('⚠️ Please describe your symptoms before analyzing.');
        }

        submitButton.disabled = true;
        submitButton.innerText = 'Analyzing...';

        setTimeout(() => {
            const analysis = performDeepAnalysis(symptomsInput);
            renderResults(analysis);
            submitButton.disabled = false;
            submitButton.innerText = 'Analyze';
        }, 800); // Slight delay to simulate thinking
    }

    function displayError(message) {
        resultDiv.innerHTML = `
            <div class="error-card fade-in-up">
                <p>${message}</p>
            </div>
        `;
    }

    function performDeepAnalysis(input) {
        const conditionsDB = [
            {
                name: "Influenza or COVID-19",
                keywords: ['fever', 'chills', 'cough', 'fatigue', 'body aches', 'loss of smell', 'breathless'],
                severity: 3,
                triage: "Primary Care / Urgent Care",
                recommendation: "Rest, monitor symptoms, consult a doctor if breathing worsens."
            },
            {
                name: "Heart Attack",
                keywords: ['chest pain', 'shortness of breath', 'sweating', 'nausea', 'jaw pain', 'left arm pain'],
                severity: 5,
                triage: "Emergency Room Required",
                recommendation: "Call 911 immediately. Do not delay."
            },
            {
                name: "Stroke",
                keywords: ['face drooping', 'speech problems', 'arm weakness', 'confusion', 'vision changes'],
                severity: 5,
                triage: "Emergency Stroke Care",
                recommendation: "Call emergency services immediately."
            },
            {
                name: "Severe Allergy (Anaphylaxis)",
                keywords: ['difficulty breathing', 'hives', 'swelling', 'throat closing'],
                severity: 5,
                triage: "Emergency Room Required",
                recommendation: "Use EpiPen if available. Call emergency services."
            },
            {
                name: "Migraine",
                keywords: ['headache', 'throbbing', 'sensitivity to light', 'nausea', 'aura'],
                severity: 2,
                triage: "Primary Care / Neurologist",
                recommendation: "Rest in dark room. Seek help if frequent or disabling."
            },
            {
                name: "Appendicitis",
                keywords: ['lower right abdominal pain', 'fever', 'nausea', 'vomiting'],
                severity: 4,
                triage: "Emergency Room - Surgical Evaluation",
                recommendation: "Immediate evaluation required to prevent rupture."
            },
            {
                name: "Food Poisoning",
                keywords: ['diarrhea', 'vomiting', 'abdominal cramps', 'nausea'],
                severity: 2,
                triage: "Self-care or Urgent Care",
                recommendation: "Stay hydrated. Seek care if symptoms are severe."
            },
            {
                name: "Mental Health Crisis",
                keywords: ['suicidal thoughts', 'hopelessness', 'persistent sadness', 'anxiety attacks'],
                severity: 5,
                triage: "Behavioral Health Urgent Help",
                recommendation: "Call crisis line or see emergency psychiatric care."
            }
        ];

        let matchedConditions = [];
        let totalSeverity = 0;

        conditionsDB.forEach(condition => {
            const foundKeywords = condition.keywords.filter(word => input.includes(word));
            if (foundKeywords.length > 0) {
                matchedConditions.push({
                    ...condition,
                    matchedKeywords: foundKeywords
                });
                totalSeverity += condition.severity;
            }
        });

        if (matchedConditions.length === 0) {
            return {
                diagnosis: "Unrecognized Symptoms",
                triage: "Primary Care Recommended",
                recommendation: "Please consult your doctor for a thorough evaluation.",
                severity: 2,
                matches: []
            };
        }

        const avgSeverity = totalSeverity / matchedConditions.length;
        const triageLevel = calculateTriage(avgSeverity);

        return {
            diagnosis: matchedConditions.map(c => c.name).join(', '),
            triage: triageLevel,
            recommendation: generateRecommendations(matchedConditions),
            severity: Math.round(avgSeverity),
            matches: matchedConditions
        };
    }

    function calculateTriage(severity) {
        if (severity >= 5) return "EMERGENCY - Immediate Care Needed";
        if (severity >= 4) return "URGENT - Seek Medical Care Soon";
        if (severity >= 3) return "PRIMARY CARE - Physician Visit Recommended";
        return "SELF-CARE or Routine Consultation";
    }

    function generateRecommendations(matches) {
        const uniqueRecs = new Set();
        matches.forEach(m => uniqueRecs.add(m.recommendation));
        return Array.from(uniqueRecs).join(' ');
    }

    function renderResults(analysis) {
        let matchDetails = '';
        if (analysis.matches.length > 0) {
            matchDetails = '<ul class="match-list">';
            analysis.matches.forEach(m => {
                matchDetails += `<li><strong>${m.name}:</strong> matched symptoms: ${m.matchedKeywords.join(', ')}</li>`;
            });
            matchDetails += '</ul>';
        }

        resultDiv.innerHTML = `
            <div class="result-card fade-in-up">
                <h2>🧠 Rapid Health Analysis</h2>
                <p><strong>🩺 Diagnosis:</strong> ${analysis.diagnosis}</p>
                <p><strong>🚑 Triage Recommendation:</strong> ${analysis.triage}</p>
                <p><strong>📋 Advice:</strong> ${analysis.recommendation}</p>
                <p><strong>⚡ Severity Score:</strong> ${analysis.severity}/5</p>
                ${matchDetails}
            </div>
        `;
    }
}); 
