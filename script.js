// ======================
// Medical AI Engine v3.1
// ======================

// Configuration
const AI_VERSION = "3.1.0";
const MOCK_AI_DELAY = 1800; // Simulate realistic API delay
const EMERGENCY_KEYWORDS = [
    "chest pain", "difficulty breathing", "severe pain", 
    "unconscious", "heavy bleeding", "sudden weakness",
    "stroke", "heart attack", "suicidal", "seizure"
];

// DOM Elements
const analyzeBtn = document.getElementById('analyzeBtn');
const buttonText = document.getElementById('buttonText');
const buttonSpinner = document.getElementById('buttonSpinner');
const symptomsInput = document.getElementById('symptoms');
const resultsDiv = document.getElementById('results');
const conditionsList = document.getElementById('conditionsList');
const severityIndicator = document.getElementById('severityIndicator');
const severityBar = document.getElementById('severityBar');
const severityRecommendation = document.getElementById('severityRecommendation');
const actionSteps = document.getElementById('actionSteps');
const monitoringGuidance = document.getElementById('monitoringGuidance');
const analysisTime = document.getElementById('analysisTime');
const recentTravel = document.getElementById('recentTravel');
const existingConditions = document.getElementById('existingConditions');

// Medical Knowledge Base
const MEDICAL_KNOWLEDGE = {
    // Respiratory
    respiratory: {
        patterns: ["cough", "shortness of breath", "difficulty breathing", "wheezing", "chest tightness"],
        conditions: [
            { name: "Common Cold", probability: 0.4, severity: "low" },
            { name: "Influenza (Flu)", probability: 0.3, severity: "medium" },
            { name: "COVID-19", probability: 0.25, severity: "high" },
            { name: "Asthma Exacerbation", probability: 0.2, severity: "medium" },
            { name: "Pneumonia", probability: 0.15, severity: "high" }
        ]
    },
    
    // Cardiovascular
    cardiovascular: {
        patterns: ["chest pain", "palpitations", "shortness of breath", "dizziness", "fainting"],
        conditions: [
            { name: "Anxiety/Panic Attack", probability: 0.35, severity: "medium" },
            { name: "Acid Reflux (GERD)", probability: 0.3, severity: "low" },
            { name: "Angina", probability: 0.2, severity: "high" },
            { name: "⚠️ Myocardial Infarction (Heart Attack)", probability: 0.1, severity: "critical", emergency: true }
        ]
    },
    
    // Gastrointestinal
    gastrointestinal: {
        patterns: ["abdominal pain", "nausea", "vomiting", "diarrhea", "constipation", "bloating"],
        conditions: [
            { name: "Gastroenteritis", probability: 0.5, severity: "low" },
            { name: "Food Poisoning", probability: 0.3, severity: "medium" },
            { name: "Irritable Bowel Syndrome", probability: 0.2, severity: "low" },
            { name: "Appendicitis", probability: 0.1, severity: "high", emergency: true }
        ]
    },
    
    // Neurological
    neurological: {
        patterns: ["headache", "dizziness", "confusion", "numbness", "tingling", "seizure"],
        conditions: [
            { name: "Migraine", probability: 0.4, severity: "medium" },
            { name: "Tension Headache", probability: 0.3, severity: "low" },
            { name: "⚠️ Stroke", probability: 0.15, severity: "critical", emergency: true },
            { name: "Concussion", probability: 0.1, severity: "high" }
        ]
    },
    
    // Musculoskeletal
    musculoskeletal: {
        patterns: ["joint pain", "back pain", "muscle pain", "swelling", "stiffness"],
        conditions: [
            { name: "Muscle Strain", probability: 0.5, severity: "low" },
            { name: "Arthritis", probability: 0.3, severity: "medium" },
            { name: "Herniated Disc", probability: 0.2, severity: "high" }
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
            "Perform CPR if no pulse (if trained)"
        ],
        monitoring: [
            "Check breathing every minute",
            "Monitor consciousness level",
            "Note time symptoms started"
        ]
    },
    high: {
        recommendation: "Urgent: Seek medical care within 2 hours",
        actions: [
            "Contact your doctor or visit urgent care",
            "Have someone accompany you",
            "Bring all current medications",
            "Avoid eating/drinking if surgery may be needed"
        ],
        monitoring: [
            "Check temperature every 2 hours",
            "Monitor symptom progression",
            "Note any new symptoms"
        ]
    },
    medium: {
        recommendation: "Schedule doctor visit within 24-48 hours",
        actions: [
            "Make appointment with primary care physician",
            "Rest and stay hydrated",
            "Use over-the-counter remedies as directed",
            "Avoid strenuous activity"
        ],
        monitoring: [
            "Track symptoms twice daily",
            "Note fever patterns if present",
            "Watch for worsening symptoms"
        ]
    },
    low: {
        recommendation: "Self-care recommended",
        actions: [
            "Rest and stay hydrated",
            "Use OTC medications as needed",
            "Apply warm/cold compresses",
            "Try home remedies (saltwater gargle, etc.)"
        ],
        monitoring: [
            "Monitor for 3 days",
            "Seek care if symptoms persist beyond 3 days",
            "Watch for secondary symptoms"
        ]
    }
};

// Enhanced AI Diagnostic Engine
function medicalAI(symptoms, hasTravelHistory, hasExistingConditions) {
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
                name: `⚠️ Emergency detected (${keyword})`,
                probability: 0.99,
                severity: "critical"
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
                    // Adjust probability based on symptom mentions
                    let adjustedProb = condition.probability;
                    const symptomKeywords = condition.name.toLowerCase().split(/[ ,]+/);
                    
                    symptomKeywords.forEach(keyword => {
                        if (symptomLower.includes(keyword)) {
                            adjustedProb += 0.15;
                        }
                    });
                    
                    // Adjust for risk factors
                    if (hasTravelHistory && condition.name.includes("COVID")) {
                        adjustedProb += 0.2;
                    }
                    
                    if (hasExistingConditions) {
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
        conditions: matchedConditions.slice(0, 5), // Top 5 conditions
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
            existingConditions.checked
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
