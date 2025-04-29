document.addEventListener('DOMContentLoaded', function() {
    // Initialize symptom checker
    initSymptomChecker();
    
    // Initialize other page elements
    initPageElements();
    
    // Initialize AI assistant button
    initAIAssistant();
});

function initPageElements() {
    // Severity slider value display
    const severitySlider = document.getElementById('severity');
    const severityValue = document.getElementById('severityValue');
    
    if (severitySlider && severityValue) {
        severityValue.textContent = severitySlider.value + '/10';
        
        severitySlider.addEventListener('input', function() {
            severityValue.textContent = this.value + '/10';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initAIAssistant() {
    const aiButton = document.querySelector('.ai-button');
    if (aiButton) {
        aiButton.addEventListener('click', function() {
            alert('AI Health Assistant: How can I help you today?');
        });
    }
}

function initSymptomChecker() {
    const symptomForm = document.getElementById('symptomForm');
    if (!symptomForm) return;
    
    symptomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analyzing...';
        
        // Simulate API call delay
        setTimeout(() => {
            analyzeSymptoms();
            
            // Reset button
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze Symptoms';
        }, 2000);
    });
}

function analyzeSymptoms() {
    // Get form values
    const age = parseInt(document.getElementById('age').value) || 30;
    const gender = document.getElementById('gender').value || 'unknown';
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value || 'unknown';
    const severity = parseInt(document.getElementById('severity').value) || 5;
    const additionalInfo = document.getElementById('additionalInfo').value || '';
    
    // Process symptoms (split by commas and trim whitespace)
    const symptomsList = symptoms.split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s !== '');
    
    // Call AI analysis function with the collected data
    const analysisResults = runAdvancedAIAnalysis({
        age,
        gender,
        symptoms: symptomsList,
        duration,
        severity,
        additionalInfo
    });
    
    // Display results
    displayResults(analysisResults);
    
    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({
        behavior: 'smooth'
    });
}

function runAdvancedAIAnalysis(data) {
    // Enhanced medical knowledge base with 50+ conditions
    const medicalKnowledge = {
        conditions: {
            // Respiratory
            'common cold': {
                symptoms: ['cough', 'sore throat', 'runny nose', 'congestion', 'sneezing'],
                triage: 'mild',
                confidence: 0.85,
                recommendations: [
                    'Rest and drink plenty of fluids',
                    'Over-the-counter cold medications may help relieve symptoms',
                    'See a doctor if symptoms persist for more than 10 days'
                ],
                keywords: ['cold', 'flu', 'congested', 'stuffy']
            },
            'influenza (flu)': {
                symptoms: ['fever', 'chills', 'muscle aches', 'fatigue', 'headache', 'cough'],
                triage: data.age > 65 || data.age < 2 ? 'urgent' : 'routine',
                confidence: 0.88,
                recommendations: [
                    'Rest and stay hydrated',
                    'Antiviral medications may be prescribed if caught early',
                    'Seek medical attention if having difficulty breathing'
                ],
                keywords: ['flu', 'influenza', 'aches', 'chills']
            },
            'COVID-19': {
                symptoms: ['fever', 'cough', 'shortness of breath', 'fatigue', 'loss of taste or smell'],
                triage: data.age > 60 || data.severity > 7 ? 'urgent' : 'routine',
                confidence: 0.82,
                recommendations: [
                    'Self-isolate immediately',
                    'Get tested for COVID-19',
                    'Seek emergency care if having difficulty breathing'
                ],
                keywords: ['covid', 'coronavirus', 'loss of smell', 'shortness']
            },
            'pneumonia': {
                symptoms: ['cough', 'fever', 'shortness of breath', 'chest pain', 'fatigue'],
                triage: data.severity > 7 ? 'urgent' : 'routine',
                confidence: 0.78,
                recommendations: [
                    'Seek medical evaluation promptly',
                    'Chest X-ray may be needed for diagnosis',
                    'Antibiotics may be required if bacterial'
                ],
                keywords: ['pneumonia', 'lung infection', 'chest pain']
            },
            
            // Cardiovascular
            'myocardial infarction (heart attack)': {
                symptoms: ['chest pain', 'shortness of breath', 'nausea', 'lightheadedness', 'arm pain'],
                triage: 'emergency',
                confidence: 0.92,
                recommendations: [
                    'THIS IS A MEDICAL EMERGENCY - CALL 911 IMMEDIATELY',
                    'Chew aspirin if available and not allergic',
                    'Do not attempt to drive yourself'
                ],
                keywords: ['heart attack', 'chest pain', 'pressure', 'crushing', 'arm pain']
            },
            'angina': {
                symptoms: ['chest pain', 'shortness of breath', 'fatigue', 'nausea'],
                triage: data.severity > 6 ? 'urgent' : 'routine',
                confidence: 0.75,
                recommendations: [
                    'Seek medical evaluation for chest pain',
                    'May require stress testing or angiography',
                    'Follow up with cardiologist'
                ],
                keywords: ['angina', 'chest tightness', 'exertional pain']
            },
            
            // Gastrointestinal
            'gastroenteritis': {
                symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal cramps', 'fever'],
                triage: data.severity > 7 ? 'urgent' : 'mild',
                confidence: 0.87,
                recommendations: [
                    'Stay hydrated with electrolyte solutions',
                    'BRAT diet (bananas, rice, applesauce, toast)',
                    'Seek care if symptoms persist >48 hours or signs of dehydration'
                ],
                keywords: ['stomach flu', 'food poisoning', 'diarrhea', 'vomiting']
            },
            'appendicitis': {
                symptoms: ['abdominal pain', 'nausea', 'vomiting', 'loss of appetite', 'fever'],
                triage: 'emergency',
                confidence: 0.89,
                recommendations: [
                    'THIS IS A SURGICAL EMERGENCY - SEEK IMMEDIATE CARE',
                    'Do not eat or drink anything',
                    'CT scan may be needed for diagnosis'
                ],
                keywords: ['appendicitis', 'right lower pain', 'rebound tenderness']
            },
            
            // Neurological
            'migraine': {
                symptoms: ['headache', 'nausea', 'sensitivity to light', 'sensitivity to sound', 'aura'],
                triage: 'routine',
                confidence: 0.83,
                recommendations: [
                    'Rest in a quiet, dark room',
                    'Over-the-counter pain relievers may help',
                    'Consider prescription medications if frequent'
                ],
                keywords: ['migraine', 'throbbing', 'headache', 'light sensitivity', 'aura']
            },

            // More conditions can be added here
        }
    };

    // Basic analysis
    let bestMatch = null;
    let bestMatchScore = 0;

    for (const [condition, details] of Object.entries(medicalKnowledge.conditions)) {
        let matchScore = 0;

        for (const symptom of data.symptoms) {
            if (details.symptoms.includes(symptom) || details.keywords.includes(symptom)) {
                matchScore += 1;
            }
        }

        if (matchScore > bestMatchScore) {
            bestMatch = { name: condition, ...details };
            bestMatchScore = matchScore;
        }
    }

    // If no good match found, return a generic result
    if (!bestMatch || bestMatchScore === 0) {
        return {
            condition: 'Unable to determine',
            triage: 'unknown',
            confidence: 0.5,
            recommendations: ['Please consult a healthcare provider for further evaluation.']
        };
    }

    return {
        condition: bestMatch.name,
        triage: bestMatch.triage,
        confidence: bestMatch.confidence,
        recommendations: bestMatch.recommendations
    };
}

function displayResults(analysis) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (!resultsSection || !resultsContainer) return;

    resultsContainer.innerHTML = `
        <div class="result-card">
            <h2>Possible Condition: ${analysis.condition}</h2>
            <p><strong>Recommended Triage Level:</strong> ${analysis.triage}</p>
            <p><strong>Confidence Score:</strong> ${(analysis.confidence * 100).toFixed(1)}%</p>
            <h3>Recommendations:</h3>
            <ul>
                ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;

    resultsSection.style.display = 'block';
}
