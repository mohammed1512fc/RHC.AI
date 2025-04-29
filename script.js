document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded - initializing symptom checker');
    
    // Initialize symptom checker
    if (document.getElementById('symptomForm')) {
        initSymptomChecker();
    }
    
    // Initialize severity slider
    const severitySlider = document.getElementById('severity');
    const severityValue = document.getElementById('severityValue');
    
    if (severitySlider && severityValue) {
        severityValue.textContent = severitySlider.value + '/10';
        severitySlider.addEventListener('input', function() {
            severityValue.textContent = this.value + '/10';
        });
    }
});

function initSymptomChecker() {
    const symptomForm = document.getElementById('symptomForm');
    
    symptomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Analysis started');
        
        // Show loading overlay
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.remove('hidden');
        
        // Get form values
        const formData = {
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            symptoms: document.getElementById('symptoms').value,
            duration: document.getElementById('duration').value,
            severity: document.getElementById('severity').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };
        
        // Validate required fields
        if (!formData.symptoms || !formData.age || !formData.gender || !formData.duration) {
            loadingOverlay.classList.add('hidden');
            alert('Please fill in all required fields');
            return;
        }
        
        // Process after short delay (simulating AI processing)
        setTimeout(() => {
            try {
                const results = analyzeSymptoms(formData);
                displayResults(results);
                console.log('Analysis completed successfully');
            } catch (error) {
                console.error('Analysis error:', error);
                alert('Analysis failed. Please try again.');
            } finally {
                loadingOverlay.classList.add('hidden');
            }
        }, 1500);
    });
}

function analyzeSymptoms(formData) {
    // Process symptoms into array
    const symptoms = formData.symptoms.split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s !== '');
    
    // Get possible conditions based on symptoms
    const possibleConditions = getPossibleConditions(symptoms, formData);
    
    // Determine triage level
    const triageLevel = getTriageLevel(possibleConditions, formData);
    
    // Generate recommendations
    const recommendations = getRecommendations(possibleConditions, triageLevel);
    
    // Calculate confidence score
    const confidence = calculateConfidence(symptoms);
    
    return {
        possibleConditions,
        triageLevel,
        recommendations,
        confidence
    };
}

function getPossibleConditions(symptoms, formData) {
    // Condition database with symptom matches
    const conditions = [
        {
            name: "Common Cold",
            matches: ["cough", "sore throat", "runny nose", "congestion"],
            triage: "mild"
        },
        {
            name: "Influenza (Flu)",
            matches: ["fever", "chills", "body aches", "fatigue"],
            triage: formData.age > 65 ? "urgent" : "routine"
        },
        {
            name: "Migraine",
            matches: ["headache", "nausea", "light sensitivity"],
            triage: "routine"
        },
        {
            name: "Urinary Tract Infection",
            matches: ["painful urination", "frequent urination"],
            triage: "routine"
        },
        {
            name: "COVID-19",
            matches: ["fever", "cough", "loss of taste", "shortness of breath"],
            triage: formData.severity > 7 ? "urgent" : "routine"
        },
        {
            name: "Acute Appendicitis",
            matches: ["abdominal pain", "nausea", "vomiting", "fever"],
            triage: "emergency"
        }
    ];

    // Calculate matching conditions
    const matchedConditions = conditions.map(condition => {
        const matchedSymptoms = symptoms.filter(symptom => 
            condition.matches.some(match => match.includes(symptom) || 
            symptom.includes(match)
        );
        return {
            name: condition.name,
            score: matchedSymptoms.length / condition.matches.length,
            triage: condition.triage
        };
    }).filter(cond => cond.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return matchedConditions.map(cond => cond.name);
}

function getTriageLevel(conditions, formData) {
    if (conditions.includes("Acute Appendicitis")) {
        return {
            level: "emergency",
            description: "Seek emergency care immediately"
        };
    }
    
    if (conditions.includes("COVID-19") && formData.severity >= 7) {
        return {
            level: "urgent",
            description: "Seek medical care within 24 hours"
        };
    }
    
    return {
        level: "routine",
        description: "Schedule a doctor's appointment"
    };
}

function getRecommendations(conditions, triage) {
    const recommendations = [];
    
    // Add triage recommendation
    recommendations.push(`<strong>Triage Level:</strong> ${triage.description}`);
    
    // Add general recommendations
    recommendations.push("<strong>General Advice:</strong>");
    recommendations.push("- Stay hydrated and get plenty of rest");
    
    // Add condition-specific recommendations
    if (conditions.includes("Common Cold")) {
        recommendations.push("<strong>For Cold:</strong> Use OTC cold remedies as needed");
    }
    if (conditions.includes("Influenza (Flu)")) {
        recommendations.push("<strong>For Flu:</strong> Consider antiviral medication if early in illness");
    }
    if (conditions.includes("COVID-19")) {
        recommendations.push("<strong>For COVID-19:</strong> Isolate and get tested");
    }
    
    return recommendations;
}

function calculateConfidence(symptoms) {
    // More symptoms = higher confidence (capped at 95%)
    return Math.min(0.7 + (symptoms.length * 0.05), 0.95).toFixed(2);
}

function displayResults(results) {
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');
    
    // Set triage level
    const triageElement = document.getElementById('triageLevel');
    triageElement.textContent = results.triageLevel.level.toUpperCase();
    triageElement.className = 'triage-level ' + `triage-${results.triageLevel.level}`;
    
    // Set possible conditions
    const conditionsList = document.getElementById('possibleConditions');
    conditionsList.innerHTML = '';
    results.possibleConditions.forEach(condition => {
        const li = document.createElement('li');
        li.textContent = condition;
        conditionsList.appendChild(li);
    });
    
    // Set recommendations
    const recommendationsElement = document.getElementById('recommendations');
    recommendationsElement.innerHTML = '';
    results.recommendations.forEach(rec => {
        const p = document.createElement('p');
        p.innerHTML = rec;
        recommendationsElement.appendChild(p);
    });
    
    // Set confidence meter
    const confidenceBar = document.getElementById('confidenceBar');
    if (confidenceBar) {
        confidenceBar.style.width = `${results.confidence * 100}%`;
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
} 
