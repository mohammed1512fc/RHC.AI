document.addEventListener('DOMContentLoaded', function() {
    console.log('RapidHealth AI initialized');
    
    // Initialize symptom checker
    const symptomForm = document.getElementById('symptomForm');
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            analyzeSymptoms();
        });
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

function analyzeSymptoms() {
    console.log('Starting analysis...');
    
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
        showError("Please fill in all required fields");
        loadingOverlay.classList.add('hidden');
        return;
    }
    
    // Process symptoms after short delay (simulating AI processing)
    setTimeout(() => {
        try {
            const results = processSymptoms(formData);
            displayResults(results);
        } catch (error) {
            console.error("Analysis error:", error);
            showError("Analysis failed. Please try again.");
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    }, 1500);
}

function processSymptoms(formData) {
    console.log('Processing symptoms:', formData);
    
    // Convert symptoms to array
    const symptomsList = formData.symptoms.split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s !== '');
    
    // Get possible conditions
    const possibleConditions = getPossibleConditions(symptomsList, formData);
    
    // Determine triage level
    const triageLevel = determineTriageLevel(possibleConditions, formData);
    
    // Generate recommendations
    const recommendations = generateRecommendations(possibleConditions, triageLevel);
    
    // Calculate confidence
    const confidence = calculateConfidence(symptomsList);
    
    return {
        possibleConditions,
        triageLevel,
        recommendations,
        confidence
    };
}

function getPossibleConditions(symptoms, formData) {
    // Enhanced condition database
    const conditions = 

    // Calculate match scores
    const scoredConditions = conditions.map(condition => {
        const matchedSymptoms = symptoms.filter(symptom => 
            condition.symptoms.some(cs => cs.includes(symptom) || symptom.includes(cs))
        );
        return {
            ...condition,
            score: matchedSymptoms.length / condition.symptoms.length
        };
    });

    // Filter and sort conditions
    return scoredConditions
        .filter(c => c.score > 0.3)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(c => c.name);
}

function determineTriageLevel(conditions, formData) {
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

function generateRecommendations(conditions, triage) {
    const recommendations = [];
    
    // Triage recommendation
    recommendations.push(`<strong>Triage Level:</strong> ${triage.description}`);
    
    // General recommendations
    recommendations.push("<strong>General Advice:</strong>");
    recommendations.push("- Stay hydrated");
    recommendations.push("- Rest as needed");
    
    // Condition-specific recommendations
    if (conditions.includes("Common Cold")) {
        recommendations.push("<strong>For Cold:</strong> Use OTC cold remedies");
    }
    if (conditions.includes("Influenza (Flu)")) {
        recommendations.push("<strong>For Flu:</strong> Consider antiviral medication");
    }
    
    return recommendations;
}

function calculateConfidence(symptoms) {
    return Math.min(0.7 + (symptoms.length * 0.05), 0.95).toFixed(2);
}

function displayResults(results) {
    console.log('Displaying results:', results);
    
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
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function showError(message) {
    alert("Error: " + message);
} 
