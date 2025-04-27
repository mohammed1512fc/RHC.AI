// ======================
// Medical AI Engine v4.2
// ======================

// Configuration
const AI_VERSION = "4.2.0";
const MOCK_AI_DELAY = 1800; // Simulate realistic API delay
const EMERGENCY_KEYWORDS = [
    "chest pain", "difficulty breathing", "severe pain", 
    "unconscious", "heavy bleeding", "sudden weakness",
    "stroke", "heart attack", "suicidal", "seizure",
    "can't breathe", "paralysis", "severe burn",
    "crushing pain", "loss of vision"
];

// Medical Knowledge Base
const MEDICAL_KNOWLEDGE = {
    // Respiratory
    respiratory: {
        patterns: ["cough", "shortness of breath", "difficulty breathing", "wheezing", "chest tightness", "sputum"],
        conditions: [
            { name: "Common Cold (Viral URI)", probability: 0.4, severity: "low" },
            { name: "Influenza (Flu)", probability: 0.35, severity: "medium" },
            { name: "COVID-19", probability: 0.3, severity: "high" },
            { name: "Asthma Exacerbation", probability: 0.25, severity: "high" },
            { name: "Pneumonia", probability: 0.2, severity: "high" },
            { name: "Chronic Obstructive Pulmonary Disease (COPD)", probability: 0.15, severity: "high" },
            { name: "Pulmonary Embolism", probability: 0.1, severity: "critical", emergency: true }
        ]
    },
    
    // Cardiovascular
    cardiovascular: {
        patterns: ["chest pain", "palpitations", "shortness of breath", "dizziness", "fainting", "irregular heartbeat"],
        conditions: [
            { name: "Anxiety/Panic Attack", probability: 0.35, severity: "medium" },
            { name: "Acid Reflux (GERD)", probability: 0.3, severity: "low" },
            { name: "Angina Pectoris", probability: 0.25, severity: "high" },
            { name: "⚠️ Acute Myocardial Infarction (Heart Attack)", probability: 0.15, severity: "critical", emergency: true },
            { name: "Arrhythmia", probability: 0.2, severity: "high" },
            { name: "Hypertension Crisis", probability: 0.15, severity: "high" }
        ]
    },
    
    // Gastrointestinal
    gastrointestinal: {
        patterns: ["abdominal pain", "nausea", "vomiting", "diarrhea", "constipation", "bloating", "blood in stool"],
        conditions: [
            { name: "Gastroenteritis", probability: 0.5, severity: "low" },
            { name: "Food Poisoning", probability: 0.4, severity: "medium" },
            { name: "Irritable Bowel Syndrome (IBS)", probability: 0.3, severity: "low" },
            { name: "Gallstones", probability: 0.25, severity: "high" },
            { name: "⚠️ Appendicitis", probability: 0.2, severity: "critical", emergency: true },
            { name: "Peptic Ulcer", probability: 0.15, severity: "high" }
        ]
    },
    
    // Neurological
    neurological: {
        patterns: ["headache", "dizziness", "confusion", "numbness", "tingling", "seizure", "loss of consciousness"],
        conditions: [
            { name: "Migraine", probability: 0.4, severity: "medium" },
            { name: "Tension Headache", probability: 0.35, severity: "low" },
            { name: "⚠️ Stroke (CVA)", probability: 0.25, severity: "critical", emergency: true },
            { name: "Concussion", probability: 0.2, severity: "high" },
            { name: "Meningitis", probability: 0.15, severity: "critical", emergency: true },
            { name: "Brain Tumor", probability: 0.05, severity: "critical" }
        ]
    },
    
    // Musculoskeletal
    musculoskeletal: {
        patterns: ["joint pain", "back pain", "muscle pain", "swelling", "stiffness", "limited mobility"],
        conditions: [
            { name: "Muscle Strain", probability: 0.5, severity: "low" },
            { name: "Osteoarthritis", probability: 0.4, severity: "medium" },
            { name: "Rheumatoid Arthritis", probability: 0.3, severity: "high" },
            { name: "Herniated Disc", probability: 0.25, severity: "high" },
            { name: "⚠️ Fracture", probability: 0.2, severity: "high", emergency: true }
        ]
    },
    
    // Infectious Diseases
    infectious: {
        patterns: ["fever", "chills", "night sweats", "fatigue", "body aches", "rash"],
        conditions: [
            { name: "Viral Infection", probability: 0.5, severity: "low" },
            { name: "Bacterial Infection", probability: 0.4, severity: "medium" },
            { name: "Urinary Tract Infection (UTI)", probability: 0.35, severity: "medium" },
            { name: "⚠️ Sepsis", probability: 0.15, severity: "critical", emergency: true },
            { name: "HIV/AIDS", probability: 0.05, severity: "high" }
        ]
    }
};

// Emergency Protocols
const EMERGENCY_PROTOCOLS = {
    critical: {
        recommendation: "🚨 EMERGENCY: Call emergency services immediately",
        actions: [
            "Call local emergency number (911/112/999)",
            "Do not drive yourself to hospital",
            "If unconscious, place in recovery position",
            "Perform CPR if no pulse (if trained)",
            "Note time symptoms started for medical team"
        ],
        monitoring: [
            "Check breathing every minute",
            "Monitor consciousness level",
            "Do not give food or water",
            "Prepare medical history information"
        ],
        prevention: [
            "Regular health check-ups",
            "Manage chronic conditions",
            "Learn emergency response techniques",
            "Maintain emergency contacts"
        ]
    },
    high: {
        recommendation: "Urgent: Seek medical care within 2 hours",
        actions: [
            "Contact your doctor or visit urgent care",
            "Have someone accompany you",
            "Bring all current medications",
            "Avoid eating/drinking if surgery may be needed",
            "Prepare insurance information"
        ],
        monitoring: [
            "Check temperature every 2 hours",
            "Monitor symptom progression",
            "Note any new symptoms",
            "Track medication intake"
        ],
        prevention: [
            "Follow prescribed treatments",
            "Monitor vital signs regularly",
            "Stay hydrated",
            "Avoid known triggers"
        ]
    },
    medium: {
        recommendation: "Schedule doctor visit within 24-48 hours",
        actions: [
            "Make appointment with primary care physician",
            "Rest and stay hydrated",
            "Use over-the-counter remedies as directed",
            "Avoid strenuous activity",
            "Document symptom timeline"
        ],
        monitoring: [
            "Track symptoms twice daily",
            "Note fever patterns if present",
            "Watch for worsening symptoms",
            "Maintain symptom diary"
        ],
        prevention: [
            "Practice good hygiene",
            "Get recommended vaccinations",
            "Maintain healthy diet",
            "Exercise regularly"
        ]
    },
    low: {
        recommendation: "Self-care recommended",
        actions: [
            "Rest and stay hydrated",
            "Use OTC medications as needed",
            "Apply warm/cold compresses",
            "Try home remedies (saltwater gargle, etc.)",
            "Consider telehealth consultation"
        ],
        monitoring: [
            "Monitor for 3 days",
            "Seek care if symptoms persist beyond 3 days",
            "Watch for secondary symptoms",
            "Note improvement timeline"
        ],
        prevention: [
            "Wash hands frequently",
            "Get adequate sleep",
            "Manage stress levels",
            "Stay up-to-date with check-ups"
        ]
    }
};

// DOM Elements
const analyzeBtn = document.getElementById('analyzeBtn');
const buttonText = document.getElementById('buttonText');
const buttonSpinner = document.getElementById('buttonSpinner');
const symptomsInput = document.getElementById('symptoms');
const resultsDiv = document.getElementById('results');
const conditionsList = document.getElementById('conditionsList');
const severityBar = document.getElementById('severityBar');
const severityRecommendation = document.getElementById('severityRecommendation');
const actionSteps = document.getElementById('actionSteps');
const monitoringGuidance = document.getElementById('monitoringGuidance');
const preventionTips = document.getElementById('preventionTips');
const analysisTime = document.getElementById('analysisTime');
const recentTravel = document.getElementById('recentTravel');
const existingConditions = document.getElementById('existingConditions');
const recentInjury = document.getElementById('recentInjury');
const medications = document.getElementById('medications');

// Enhanced AI Diagnostic Engine
function medicalAI(symptoms, hasTravelHistory, hasExistingConditions, hasRecentInjury, takesMedications) {
    const symptomLower = symptoms.toLowerCase();
    let matchedConditions = [];
    let severityScore = 0;
    let isEmergency = false;
    
    // Check for emergency keywords first
    for (const keyword of EMERGENCY_KEYWORDS) {
        if (symptomLower.includes(keyword)) {
            isEmergency = true;
            severityScore = 100;
            matchedConditions.push({
                name: `⚠️ EMERGENCY DETECTED: ${keyword.toUpperCase()}`,
                probability: 0.99,
                severity: "critical",
                emergency: true
            });
            break;
        }
    }
    
    // If not emergency, proceed with normal analysis
    if (!isEmergency) {
        // Analyze each medical category
        for (const [category, data] of Object.entries(MEDICAL_KNOWLEDGE)) {
            // Check if symptoms match this category
            const matchesCategory = data.patterns.some(pattern => 
                symptomLower.includes(pattern)
            );
            
            if (matchesCategory) {
                // Add conditions with adjusted probabilities
                data.conditions.forEach(condition => {
                    // Base probability
                    let adjustedProb = condition.probability;
                    
                    // Symptom keyword boosting
                    const symptomKeywords = condition.name.toLowerCase()
                        .split(/[ ,()]+/)
                        .filter(word => word.length > 3);
                    
                    symptomKeywords.forEach(keyword => {
                        if (symptomLower.includes(keyword)) {
                            adjustedProb += 0.15;
                        }
                    });
                    
                    // Risk factor adjustments
                    if (hasTravelHistory && (condition.name.includes("COVID") || condition.name.includes("Malaria"))) {
                        adjustedProb += 0.2;
                    }
                    
                    if (hasExistingConditions) {
                        adjustedProb += 0.15;
                    }
                    
                    if (hasRecentInjury && condition.name.includes("Fracture")) {
                        adjustedProb += 0.25;
                    }
                    
                    if (takesMedications && condition.name.includes("Reaction")) {
                        adjustedProb += 0.1;
                    }
                    
                    // Cap at 0.95
                    adjustedProb = Math.min(adjustedProb, 0.95);
                    
                    matchedConditions.push({
                        ...condition,
                        probability: adjustedProb
                    });
                    
                    // Update severity score
                    severityScore += 
                        condition.severity === "critical" ? 90 :
                        condition.severity === "high" ? 70 :
                        condition.severity === "medium" ? 40 : 10;
                });
            }
        }
        
        // If no matches, provide generic advice
        if (matchedConditions.length === 0) {
            matchedConditions.push({
                name: "General Viral Infection",
                probability: 0.7,
                severity: "low"
            }, {
                name: "Stress-Related Symptoms",
                probability: 0.3,
                severity: "low"
            });
            
            severityScore = 15;
        }
    }
    
    // Sort conditions by probability
    matchedConditions.sort((a, b) => b.probability - a.probability);
    
    // Determine overall severity
    let overallSeverity;
    if (isEmergency) {
        overallSeverity = "critical";
    } else {
        const avgSeverity = severityScore / Math.max(1, matchedConditions.length);
        overallSeverity = 
            avgSeverity > 80 ? "critical" :
            avgSeverity > 60 ? "high" :
            avgSeverity > 30 ? "medium" : "low";
    }
    
    return {
        conditions: matchedConditions.slice(0, 6), // Top 6 conditions
        severity: overallSeverity,
        protocols: EMERGENCY_PROTOCOLS[overallSeverity]
    };
}

// UI Helpers
function showLoading() {
    buttonText.textContent = 'Analyzing Symptoms...';
    buttonSpinner.style.display = 'inline-block';
    analyzeBtn.disabled = true;
    symptomsInput.disabled = true;
}

function hideLoading() {
    buttonText.textContent = 'Re-analyze Symptoms';
    buttonSpinner.style.display = 'none';
    analyzeBtn.disabled = false;
    symptomsInput.disabled = false;
}

function formatProbability(prob) {
    return Math.round(prob * 100) + '%';
}

function displayResults(response) {
    // Set analysis timestamp
    analysisTime.textContent = new Date().toLocaleString();
    
    // Display conditions
    conditionsList.innerHTML = response.conditions
        .map(condition => `
            <div class="condition-item">
                <span class="condition-name">${condition.name}</span>
                <span class="condition-probability">${formatProbability(condition.probability)} likelihood</span>
            </div>
        `)
        .join('');
    
    // Display severity indicator
    severityBar.className = 'severity-bar';
    severityBar.classList.add(`severity-${response.severity}`);
    
    setTimeout(() => {
        severityBar.style.width = 
            response.severity === 'critical' ? '100%' :
            response.severity === 'high' ? '75%' :
            response.severity === 'medium' ? '50%' : '25%';
    }, 100);
    
    // Set recommendation
    severityRecommendation.textContent = response.protocols.recommendation;
    severityRecommendation.className = `severity-recommendation bg-${response.severity}-light`;
    
    // Display action steps
    actionSteps.innerHTML = `
        <ul class="action-steps-list">
            ${response.protocols.actions.map(action => `<li class="action-step">${action}</li>`).join('')}
        </ul>
    `;
    
    // Display monitoring guidance
    monitoringGuidance.innerHTML = `
        <ul class="monitoring-guidance-list">
            ${response.protocols.monitoring.map(item => `<li class="monitoring-item">${item}</li>`).join('')}
        </ul>
    `;
    
    // Display prevention tips
    preventionTips.innerHTML = `
        <ul class="prevention-tips-list">
            ${response.protocols.prevention.map(tip => `<li class="prevention-tip">${tip}</li>`).join('')}
        </ul>
    `;
    
    // Show results with animation
    resultsDiv.style.display = 'block';
    resultsDiv.classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// Event Listeners
analyzeBtn.addEventListener('click', async function() {
    const symptoms = symptomsInput.value.trim();
    
    if (!symptoms) {
        alert('Please describe your symptoms');
        return;
    }
    
    showLoading();
    resultsDiv.style.display = 'none';
    
    // Simulate API delay
    setTimeout(() => {
        const aiResponse = medicalAI(
            symptoms,
            recentTravel.checked,
            existingConditions.checked,
            recentInjury.checked,
            medications.checked
        );
        
        displayResults(aiResponse);
        hideLoading();
    }, MOCK_AI_DELAY);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('version').textContent = `v${AI_VERSION}`;
    console.log('Medical AI System initialized');
}); 
