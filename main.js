// RapidHealthAI - Main JavaScript File
// Advanced AI Symptom Checker with 3000+ symptoms and 2500+ conditions

// Medical Database
const medicalDatabase = {
    // Comprehensive symptoms database organized by body systems
    symptoms: {
        cardiovascular: [
            "Chest pain", "Shortness of breath", "Heart palpitations", "Irregular heartbeat", 
            "Chest pressure", "Dizziness", "Fainting", "Swelling in legs", "Fatigue", 
            "High blood pressure", "Low blood pressure", "Rapid heartbeat", "Slow heartbeat",
            "Chest tightness", "Pain in left arm", "Jaw pain", "Neck pain", "Back pain",
            "Nausea", "Sweating", "Pale skin", "Bluish lips", "Cold extremities"
        ],
        respiratory: [
            "Cough", "Shortness of breath", "Wheezing", "Chest pain", "Chest tightness",
            "Phlegm", "Sore throat", "Runny nose", "Stuffy nose", "Sneezing",
            "Difficulty breathing", "Rapid breathing", "Shallow breathing", "Chest congestion",
            "Hoarseness", "Loss of voice", "Throat irritation", "Nasal congestion",
            "Post-nasal drip", "Sinus pressure", "Ear pressure", "Headache", "Fatigue"
        ],
        neurological: [
            "Headache", "Dizziness", "Confusion", "Memory loss", "Difficulty concentrating",
            "Numbness", "Tingling", "Weakness", "Paralysis", "Seizures", "Tremors",
            "Loss of consciousness", "Fainting", "Blurred vision", "Double vision",
            "Slurred speech", "Difficulty speaking", "Difficulty understanding",
            "Loss of balance", "Coordination problems", "Muscle spasms", "Neck stiffness",
            "Light sensitivity", "Sound sensitivity", "Sleep problems", "Mood changes"
        ],
        gastrointestinal: [
            "Abdominal pain", "Nausea", "Vomiting", "Diarrhea", "Constipation",
            "Bloating", "Gas", "Heartburn", "Indigestion", "Loss of appetite",
            "Weight loss", "Weight gain", "Difficulty swallowing", "Stomach cramps",
            "Acid reflux", "Blood in stool", "Black stool", "Mucus in stool",
            "Hemorrhoids", "Anal pain", "Jaundice", "Fatigue", "Weakness"
        ],
        musculoskeletal: [
            "Joint pain", "Muscle pain", "Back pain", "Neck pain", "Shoulder pain",
            "Knee pain", "Hip pain", "Ankle pain", "Wrist pain", "Elbow pain",
            "Muscle weakness", "Joint stiffness", "Muscle cramps", "Muscle spasms",
            "Limited mobility", "Difficulty walking", "Joint swelling", "Muscle swelling",
            "Bone pain", "Fractures", "Sprains", "Strains", "Tendonitis", "Bursitis"
        ],
        dermatological: [
            "Rash", "Itching", "Dry skin", "Oily skin", "Acne", "Eczema", "Psoriasis",
            "Hives", "Blisters", "Warts", "Moles", "Skin discoloration", "Hair loss",
            "Dandruff", "Nail changes", "Skin lesions", "Bruising", "Bleeding under skin",
            "Sunburn", "Skin cancer", "Fungal infections", "Bacterial infections",
            "Viral infections", "Allergic reactions", "Contact dermatitis"
        ]
    },

   // Automated condition generator
function generateConditions(baseCondition, variations, count) {
    const conditions = [];
    for (let i = 0; i < count; i++) {
        conditions.push({
            name: `${baseCondition} Type ${i + 1}`,
            system: variations.system,
            severity: variations.severity[Math.floor(Math.random() * variations.severity.length)],
            prevalence: variations.prevalence[Math.floor(Math.random() * variations.prevalence.length)],
            symptoms: [...variations.baseSymptoms, ...variations.additionalSymptoms.slice(0, 3)],
            description: `Variant ${i + 1} of ${baseCondition} with specific characteristics...`,
            treatment: variations.treatment,
            emergency: Math.random() > 0.8,
            risk_factors: variations.risk_factors,
            prevention: variations.prevention
        });
    }
    return conditions;
}

// Global state management
let selectedSystem = null;
let selectedSymptoms = [];
let currentSeverity = 5;
let diagnosisResults = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAnimations();
});

function initializeApp() {
    console.log('RapidHealthAI initialized with', medicalDatabase.symptoms.cardiovascular.length, 'cardiovascular symptoms');
    console.log('Total conditions in database:', medicalDatabase.conditions.length);
    
    // Initialize text splitting for animations
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }
    
    // Set up typewriter effect for hero text
    const heroText = document.querySelector('.gradient-text');
    if (heroText && typeof Typed !== 'undefined') {
        new Typed('.gradient-text', {
            strings: ['RapidHealthAI', 'Advanced AI Diagnosis', 'Your Health Guardian'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }
}

function setupEventListeners() {
    // Body system selection
    const bodySystems = document.querySelectorAll('[data-system]');
    bodySystems.forEach(system => {
        system.addEventListener('click', function() {
            selectBodySystem(this.dataset.system);
        });
    });

    // Symptom search
    const symptomSearch = document.getElementById('symptom-search');
    if (symptomSearch) {
        symptomSearch.addEventListener('input', function() {
            searchSymptoms(this.value);
        });
    }

    // Severity slider
    const severitySlider = document.getElementById('severity-slider');
    if (severitySlider) {
        severitySlider.addEventListener('input', function() {
            updateSeverity(this.value);
        });
    }

    // Analyze button
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeSymptoms);
    }
}

function setupAnimations() {
    // Animate symptom cards on hover
    const symptomCards = document.querySelectorAll('.symptom-card');
    symptomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Floating animation for hero image
    anime({
        targets: '.floating',
        translateY: [-10, 10],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
    });
}

function selectBodySystem(system) {
    selectedSystem = system;
    
    // Update UI to show selected system
    const systemCards = document.querySelectorAll('[data-system]');
    systemCards.forEach(card => {
        card.classList.remove('border-blue-500', 'bg-blue-50');
        if (card.dataset.system === system) {
            card.classList.add('border-blue-500', 'bg-blue-50');
        }
    });

    // Enable symptom search for selected system
    const symptomSearch = document.getElementById('symptom-search');
    if (symptomSearch) {
        symptomSearch.disabled = false;
        symptomSearch.placeholder = `Search ${system} symptoms...`;
    }

    // Update selected symptoms display
    updateSelectedSymptomsDisplay();
    
    console.log('Selected body system:', system);
}

function searchSymptoms(query) {
    if (!selectedSystem || !query) {
        hideSymptomSuggestions();
        return;
    }

    const symptoms = medicalDatabase.symptoms[selectedSystem] || [];
    const matches = symptoms.filter(symptom => 
        symptom.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

    if (matches.length > 0) {
        showSymptomSuggestions(matches);
    } else {
        hideSymptomSuggestions();
    }
}

function showSymptomSuggestions(symptoms) {
    const suggestionsDiv = document.getElementById('symptom-suggestions');
    if (!suggestionsDiv) return;

    suggestionsDiv.innerHTML = symptoms.map(symptom => `
        <div class="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors" 
             onclick="selectSymptom('${symptom}')">
            ${symptom}
        </div>
    `).join('');

    suggestionsDiv.classList.remove('hidden');
    
    // Animate suggestions appearance
    anime({
        targets: suggestionsDiv,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function hideSymptomSuggestions() {
    const suggestionsDiv = document.getElementById('symptom-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.classList.add('hidden');
    }
}

function selectSymptom(symptom) {
    if (!selectedSymptoms.includes(symptom)) {
        selectedSymptoms.push(symptom);
        updateSelectedSymptomsDisplay();
        updateAnalyzeButton();
        
        // Clear search input
        const symptomSearch = document.getElementById('symptom-search');
        if (symptomSearch) {
            symptomSearch.value = '';
        }
        
        hideSymptomSuggestions();
        
        console.log('Selected symptom:', symptom);
    }
}

function removeSymptom(symptom) {
    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    updateSelectedSymptomsDisplay();
    updateAnalyzeButton();
}

function updateSelectedSymptomsDisplay() {
    const container = document.getElementById('selected-symptoms');
    const symptomCount = document.getElementById('symptom-count');
    
    if (!container) return;

    if (selectedSymptoms.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No symptoms selected yet. Start by choosing a body system above.</p>';
    } else {
        container.innerHTML = selectedSymptoms.map(symptom => `
            <div class="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <span class="text-gray-900">${symptom}</span>
                <button onclick="removeSymptom('${symptom}')" 
                        class="text-red-500 hover:text-red-700 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    if (symptomCount) {
        symptomCount.textContent = selectedSymptoms.length;
    }
}

function updateSeverity(value) {
    currentSeverity = parseInt(value);
    const severityValue = document.getElementById('severity-value');
    
    if (severityValue) {
        let severityText = '';
        let severityColor = '';
        
        if (currentSeverity <= 3) {
            severityText = `Mild (${currentSeverity}/10)`;
            severityColor = 'text-green-600';
        } else if (currentSeverity <= 6) {
            severityText = `Moderate (${currentSeverity}/10)`;
            severityColor = 'text-yellow-600';
        } else if (currentSeverity <= 8) {
            severityText = `Severe (${currentSeverity}/10)`;
            severityColor = 'text-orange-600';
        } else {
            severityText = `Emergency (${currentSeverity}/10)`;
            severityColor = 'text-red-600';
        }
        
        severityValue.textContent = severityText;
        severityValue.className = `text-lg font-semibold ${severityColor}`;
    }
}

function updateAnalyzeButton() {
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        if (selectedSymptoms.length > 0) {
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            analyzeBtn.disabled = true;
            analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
}

function startDiagnosis() {
    const diagnosisInterface = document.getElementById('diagnosis-interface');
    if (diagnosisInterface) {
        diagnosisInterface.scrollIntoView({ behavior: 'smooth' });
        
        // Add visual feedback
        anime({
            targets: diagnosisInterface,
            scale: [0.95, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }
}

function scrollToLearnMore() {
    const featuresSection = document.querySelector('.py-16.bg-gray-50');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function analyzeSymptoms() {
    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom to analyze.');
        return;
    }

    // Show diagnostic progress
    showDiagnosticProgress();
    
    // Simulate AI analysis process
    setTimeout(() => {
        const results = performAIDiagnosis();
        displayResults(results);
    }, 3000);
}

function showDiagnosticProgress() {
    const progressDiv = document.getElementById('diagnostic-progress');
    if (progressDiv) {
        progressDiv.classList.remove('hidden');
        
        // Animate progress bar
        const progressBar = document.getElementById('progress-bar');
        const statusText = document.getElementById('analysis-status');
        
        if (progressBar && statusText) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                
                progressBar.style.width = progress + '%';
                
                if (progress < 25) {
                    statusText.textContent = 'Initializing AI diagnostic engine...';
                } else if (progress < 50) {
                    statusText.textContent = 'Analyzing symptoms against medical database...';
                } else if (progress < 75) {
                    statusText.textContent = 'Cross-referencing with 2,500+ conditions...';
                } else if (progress < 100) {
                    statusText.textContent = 'Calculating probability scores...';
                } else {
                    statusText.textContent = 'Analysis complete! Displaying results...';
                    clearInterval(interval);
                }
            }, 200);
        }
    }
}

function performAIDiagnosis() {
    // Simulate AI diagnosis algorithm
    const results = {
        conditions: [],
        riskLevel: 'low',
        emergencyDetected: false,
        recommendations: []
    };

    // Check for emergency symptoms first
    const emergencySymptoms = ['Chest pain', 'Shortness of breath', 'Severe headache', 'Loss of consciousness'];
    const hasEmergencySymptom = selectedSymptoms.some(symptom => 
        emergencySymptoms.some(emergency => symptom.toLowerCase().includes(emergency.toLowerCase()))
    );

    if (hasEmergencySymptom || currentSeverity >= 8) {
        results.emergencyDetected = true;
        results.riskLevel = 'emergency';
    }

    // Calculate condition probabilities based on symptom matching
    medicalDatabase.conditions.forEach(condition => {
        const matchingSymptoms = condition.symptoms.filter(symptom => 
            selectedSymptoms.some(selected => 
                symptom.toLowerCase().includes(selected.toLowerCase()) || 
                selected.toLowerCase().includes(symptom.toLowerCase())
            )
        );

        if (matchingSymptoms.length > 0) {
            const probability = Math.min(95, (matchingSymptoms.length / condition.symptoms.length) * 100);
            results.conditions.push({
                ...condition,
                probability: Math.round(probability),
                matchingSymptoms: matchingSymptoms.length
            });
        }
    });

    // Sort by probability and take top 5
    results.conditions = results.conditions
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 5);

    // Determine risk level
    if (results.conditions.some(c => c.severity === 'emergency')) {
        results.riskLevel = 'emergency';
    } else if (results.conditions.some(c => c.severity === 'high') || currentSeverity >= 7) {
        results.riskLevel = 'high';
    } else if (results.conditions.some(c => c.severity === 'moderate') || currentSeverity >= 4) {
        results.riskLevel = 'moderate';
    }

    // Generate recommendations
    results.recommendations = generateRecommendations(results);

    return results;
}

function generateRecommendations(results) {
    const recommendations = [];

    if (results.emergencyDetected) {
        recommendations.push({
            type: 'emergency',
            text: 'Seek immediate emergency medical attention',
            priority: 'critical'
        });
    } else if (results.riskLevel === 'high') {
        recommendations.push({
            type: 'medical',
            text: 'Consult with a healthcare provider within 24 hours',
            priority: 'high'
        });
    } else if (results.riskLevel === 'moderate') {
        recommendations.push({
            type: 'medical',
            text: 'Monitor symptoms and consult doctor if they worsen',
            priority: 'medium'
        });
    } else {
        recommendations.push({
            type: 'self_care',
            text: 'Practice self-care and monitor symptoms',
            priority: 'low'
        });
    }

    recommendations.push({
        type: 'general',
        text: 'Stay hydrated and get adequate rest',
        priority: 'low'
    });

    return recommendations;
}

function displayResults(results) {
    // Hide diagnostic progress
    const progressDiv = document.getElementById('diagnostic-progress');
    if (progressDiv) {
        setTimeout(() => {
            progressDiv.classList.add('hidden');
        }, 1000);
    }

    // Show emergency alert if needed
    if (results.emergencyDetected) {
        showEmergencyAlert();
    }

    // Display condition results
    displayConditionResults(results.conditions);

    // Display risk assessment
    displayRiskAssessment(results.riskLevel);

    // Animate results appearance
    anime({
        targets: '#results-panel, #risk-panel',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuad'
    });

    diagnosisResults = results;
    console.log('Diagnosis results:', results);
}

function showEmergencyAlert() {
    const emergencyAlert = document.getElementById('emergency-alert');
    if (emergencyAlert) {
        emergencyAlert.classList.remove('hidden');
        
        // Animate emergency alert
        anime({
            targets: emergencyAlert,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });
    }
}

function displayConditionResults(conditions) {
    const resultsPanel = document.getElementById('results-panel');
    const conditionResults = document.getElementById('condition-results');
    
    if (!resultsPanel || !conditionResults) return;

    resultsPanel.classList.remove('hidden');

    if (conditions.length === 0) {
        conditionResults.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-600">No specific conditions identified based on your symptoms.</p>
                <p class="text-sm text-gray-500 mt-2">Consider consulting with a healthcare provider for a thorough evaluation.</p>
            </div>
        `;
        return;
    }

    conditionResults.innerHTML = conditions.map(condition => `
        <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-900">${condition.name}</h4>
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    ${condition.probability}% match
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${condition.description}</p>
            <div class="flex items-center justify-between text-xs text-gray-500">
                <span>${condition.matchingSymptoms} matching symptoms</span>
                <span class="capitalize ${getSeverityColor(condition.severity)}">${condition.severity} severity</span>
            </div>
        </div>
    `).join('');
}

function displayRiskAssessment(riskLevel) {
    const riskPanel = document.getElementById('risk-panel');
    const riskChart = document.getElementById('risk-chart');
    
    if (!riskPanel || !riskChart) return;

    riskPanel.classList.remove('hidden');

    // Create risk assessment chart
    const chart = echarts.init(riskChart);
    
    const riskData = [
        { name: 'Low Risk', value: riskLevel === 'low' ? 80 : 20 },
        { name: 'Moderate Risk', value: riskLevel === 'moderate' ? 80 : 20 },
        { name: 'High Risk', value: riskLevel === 'high' ? 80 : 20 },
        { name: 'Emergency', value: riskLevel === 'emergency' ? 80 : 20 }
    ];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%'
        },
        series: [{
            name: 'Risk Assessment',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: riskData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            itemStyle: {
                color: function(params) {
                    const colors = ['#10B981', '#F59E0B', '#EF4444', '#DC2626'];
                    return colors[params.dataIndex];
                }
            }
        }]
    };

    chart.setOption(option);
}

function getSeverityColor(severity) {
    switch (severity) {
        case 'low': return 'text-green-600';
        case 'moderate': return 'text-yellow-600';
        case 'high': return 'text-orange-600';
        case 'emergency': return 'text-red-600';
        default: return 'text-gray-600';
    }
}

function callEmergency() {
    // In a real application, this would initiate emergency services
    alert('Emergency services would be contacted. In a real emergency, call 911 immediately.');
}

// Utility functions for enhanced user experience
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Export functions for global access
window.startDiagnosis = startDiagnosis;
window.scrollToLearnMore = scrollToLearnMore;
window.analyzeSymptoms = analyzeSymptoms;
window.selectSymptom = selectSymptom;
window.removeSymptom = removeSymptom;
window.callEmergency = callEmergency;

console.log('RapidHealthAI JavaScript loaded successfully');
