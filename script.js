document.addEventListener('DOMContentLoaded', function() {
    // Initialize the symptom checker functionality
    initSymptomChecker();
    
    // Initialize other page elements
    initPageElements();
});

function initPageElements() {
    // Severity slider value display
    const severitySlider = document.getElementById('severity');
    const severityValue = document.getElementById('severityValue');
    
    if (severitySlider && severityValue) {
        severityValue.textContent = severitySlider.value;
        
        severitySlider.addEventListener('input', function() {
            severityValue.textContent = this.value;
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

function initSymptomChecker() {
    const symptomForm = document.getElementById('symptomForm');
    if (!symptomForm) return;
    
    symptomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        
        // Simulate API call delay
        setTimeout(() => {
            analyzeSymptoms();
            
            // Reset button
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Symptoms';
        }, 1500);
    });
}

function analyzeSymptoms() {
    // Get form values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    
    // Process symptoms (split by commas and trim whitespace)
    const symptomsList = symptoms.split(',').map(s => s.trim()).filter(s => s !== '');
    
    // Call AI analysis function with the collected data
    const analysisResults = runAIAnalysis({
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

function runAIAnalysis(data) {
    // This is where we would normally call an actual AI/ML API
    // For this demo, we'll simulate the AI analysis with predefined logic
    
    // Extract keywords for analysis
    const symptomKeywords = data.symptoms.map(s => s.toLowerCase());
    const additionalKeywords = data.additionalInfo.toLowerCase().split(' ');
    
    // Medical knowledge base (simplified for demo)
    const medicalKnowledge = {
        // Conditions database
        conditions: {
            'common cold': {
                symptoms: ['cough', 'sore throat', 'runny nose', 'congestion', 'sneezing', 'mild fever'],
                triage: 'routine',
                recommendations: [
                    'Rest and drink plenty of fluids',
                    'Over-the-counter cold medications may help relieve symptoms',
                    'See a doctor if symptoms persist for more than 10 days or worsen'
                ],
                keywords: ['cold', 'flu', 'congested', 'stuffy']
            },
            'influenza': {
                symptoms: ['fever', 'chills', 'muscle aches', 'fatigue', 'headache', 'cough'],
                triage: data.age > 65 || data.age < 2 ? 'urgent' : 'routine',
                recommendations: [
                    'Rest and stay hydrated',
                    'Antiviral medications may be prescribed if caught early',
                    'Seek medical attention if having difficulty breathing or persistent high fever'
                ],
                keywords: ['flu', 'influenza', 'aches', 'chills']
            },
            'migraine': {
                symptoms: ['headache', 'nausea', 'sensitivity to light', 'sensitivity to sound', 'aura'],
                triage: 'routine',
                recommendations: [
                    'Rest in a quiet, dark room',
                    'Over-the-counter pain relievers may help',
                    'Consider prescription medications if migraines are frequent'
                ],
                keywords: ['migraine', 'throbbing', 'headache', 'light sensitivity']
            },
            'urinary tract infection': {
                symptoms: ['painful urination', 'frequent urination', 'urge to urinate', 'lower abdominal pain'],
                triage: 'routine',
                recommendations: [
                    'Drink plenty of water',
                    'See a doctor for antibiotic treatment',
                    'Untreated UTIs can lead to kidney infections'
                ],
                keywords: ['uti', 'urinary', 'burning', 'peeing']
            },
            'acute appendicitis': {
                symptoms: ['abdominal pain', 'nausea', 'vomiting', 'loss of appetite', 'fever'],
                triage: 'emergency',
                recommendations: [
                    'This is a medical emergency - seek immediate care',
                    'Do not eat or drink anything',
                    'Surgery is typically required'
                ],
                keywords: ['appendicitis', 'right lower pain', 'rebound tenderness']
            },
            'myocardial infarction': {
                symptoms: ['chest pain', 'shortness of breath', 'nausea', 'lightheadedness', 'arm pain'],
                triage: 'emergency',
                recommendations: [
                    'This is a medical emergency - call emergency services immediately',
                    'Chew aspirin if available and not allergic',
                    'Do not attempt to drive yourself to the hospital'
                ],
                keywords: ['heart attack', 'chest pain', 'pressure', 'crushing']
            },
            'COVID-19': {
                symptoms: ['fever', 'cough', 'shortness of breath', 'fatigue', 'loss of taste or smell'],
                triage: data.age > 60 || data.severity > 7 ? 'urgent' : 'routine',
                recommendations: [
                    'Self-isolate immediately',
                    'Get tested for COVID-19',
                    'Seek emergency care if having difficulty breathing'
                ],
                keywords: ['covid', 'coronavirus', 'loss of smell', 'shortness']
            }
        },
        
        // Triage levels
        triageLevels: {
            'emergency': {
                level: 'Emergency',
                description: 'Requires immediate medical attention - call emergency services',
                color: 'triage-emergency'
            },
            'urgent': {
                level: 'Urgent',
                description: 'Should be evaluated today - go to urgent care or ER if after hours',
                color: 'triage-urgent'
            },
            'routine': {
                level: 'Routine',
                description: 'Schedule an appointment with your doctor in the next few days',
                color: 'triage-routine'
            },
            'mild': {
                level: 'Mild',
                description: 'Can likely be managed with self-care at home',
                color: 'triage-mild'
            }
        }
    };
    
    // AI analysis logic
    let possibleConditions = [];
    let triageLevel = 'mild';
    let emergencyWarning = null;
    
    // Match symptoms to conditions
    for (const [condition, info] of Object.entries(medicalKnowledge.conditions)) {
        // Check for symptom matches
        const symptomMatches = info.symptoms.filter(symptom => 
            symptomKeywords.some(kw => symptom.toLowerCase().includes(kw))
        );
        
        // Check for keyword matches in additional info
        const keywordMatches = info.keywords.filter(keyword => 
            additionalKeywords.some(kw => keyword.includes(kw))
        );
        
        // If we have matches, add to possible conditions
        if (symptomMatches.length > 0 || keywordMatches.length > 0) {
            possibleConditions.push(condition);
            
            // Upgrade triage level if this condition is more serious
            if (info.triage === 'emergency') {
                triageLevel = 'emergency';
                emergencyWarning = `Based on your symptoms (${symptomMatches.join(', ')}), you may be experiencing ${condition} which requires immediate medical attention.`;
            } else if (info.triage === 'urgent' && triageLevel !== 'emergency') {
                triageLevel = 'urgent';
            } else if (info.triage === 'routine' && triageLevel === 'mild') {
                triageLevel = 'routine';
            }
        }
    }
    
    // If no conditions matched, provide general advice
    if (possibleConditions.length === 0) {
        possibleConditions = ['General viral illness', 'Stress-related symptoms'];
        
        // Adjust triage based on severity
        if (data.severity >= 8) {
            triageLevel = 'urgent';
        } else if (data.severity >= 5) {
            triageLevel = 'routine';
        }
    }
    
    // Prepare recommendations based on triage level
    let recommendations = [];
    const triageInfo = medicalKnowledge.triageLevels[triageLevel];
    
    recommendations.push(`<strong>Triage Level:</strong> ${triageInfo.description}`);
    
    // Add general recommendations
    recommendations.push('<strong>General Advice:</strong>');
    recommendations.push('- Stay hydrated and get plenty of rest');
    
    if (triageLevel === 'emergency' || triageLevel === 'urgent') {
        recommendations.push('- Seek medical attention as soon as possible');
    } else if (triageLevel === 'routine') {
        recommendations.push('- Schedule an appointment with your healthcare provider');
    } else {
        recommendations.push('- Monitor your symptoms and seek care if they worsen');
    }
    
    // Add condition-specific recommendations
    if (possibleConditions.length > 0) {
        recommendations.push('<strong>Condition-specific advice:</strong>');
        
        possibleConditions.forEach(condition => {
            if (medicalKnowledge.conditions[condition]) {
                medicalKnowledge.conditions[condition].recommendations.forEach(rec => {
                    recommendations.push(`- (${condition}) ${rec}`);
                });
            }
        });
    }
    
    return {
        possibleConditions,
        triageLevel,
        triageInfo,
        recommendations,
        emergencyWarning
    };
}

function displayResults(results) {
    const resultsSection = document.getElementById('resultsSection');
    const conditionsList = document.getElementById('possibleConditions');
    const recommendationsDiv = document.getElementById('recommendations');
    const triageLevelDiv = document.getElementById('triageLevel');
    const emergencyWarningDiv = document.getElementById('emergencyWarning');
    
    // Show results section
    resultsSection.classList.remove('hidden');
    
    // Display possible conditions
    conditionsList.innerHTML = '';
    results.possibleConditions.forEach(condition => {
        const li = document.createElement('li');
        li.textContent = condition;
        conditionsList.appendChild(li);
    });
    
    // Display triage level
    triageLevelDiv.textContent = results.triageInfo.level;
    triageLevelDiv.className = 'triage-level ' + results.triageInfo.color;
    
    // Display recommendations
    recommendationsDiv.innerHTML = '';
    results.recommendations.forEach(rec => {
        const p = document.createElement('p');
        p.innerHTML = rec;
        recommendationsDiv.appendChild(p);
    });
    
    // Display emergency warning if needed
    if (results.emergencyWarning) {
        emergencyWarningDiv.classList.remove('hidden');
        document.getElementById('emergencyMessage').textContent = results.emergencyWarning;
        
        // Add pulse animation to emergency warning
        emergencyWarningDiv.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
    } else {
        emergencyWarningDiv.classList.add('hidden');
    }
    
    // Add some animations
    resultsSection.classList.add('animate__animated', 'animate__fadeInUp');
} 
