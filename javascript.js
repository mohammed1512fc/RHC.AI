// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Symptom Suggestions
const symptomInput = document.getElementById('symptoms');
const suggestionsContainer = document.getElementById('symptomSuggestions');

// 85 Common Symptoms
const commonSymptoms = [
    // General
    "fever", "chills", "fatigue", "weakness", "malaise", "night sweats",
    "weight loss", "weight gain", "loss of appetite", "increased appetite",
    "dehydration", "excessive thirst", "swollen glands", "body aches",
    
    // Head/Neurological
    "headache", "migraine", "dizziness", "lightheadedness", "vertigo",
    "fainting", "seizures", "tremors", "numbness", "tingling",
    "weakness", "memory loss", "confusion", "speech difficulty",
    "blurred vision", "eye pain", "eye redness", "hearing loss",
    "ringing in ears", "ear pain", "loss of smell", "loss of taste",
    
    // Respiratory
    "cough", "dry cough", "productive cough", "shortness of breath",
    "wheezing", "chest tightness", "chest pain", "rapid breathing",
    "runny nose", "nasal congestion", "sneezing", "sore throat",
    "difficulty swallowing", "hoarse voice",
    
    // Cardiovascular
    "palpitations", "irregular heartbeat", "rapid heartbeat",
    "chest pressure", "heartburn", "swelling in legs",
    
    // Gastrointestinal
    "nausea", "vomiting", "diarrhea", "constipation", "abdominal pain",
    "stomach cramps", "bloating", "gas", "indigestion", "acid reflux",
    "black stools", "blood in stool",
    
    // Urinary
    "frequent urination", "painful urination", "blood in urine",
    "cloudy urine", "difficulty urinating", "incontinence",
    
    // Musculoskeletal
    "joint pain", "joint swelling", "back pain", "neck pain",
    "shoulder pain", "arm pain", "leg pain", "knee pain",
    "muscle pain", "muscle cramps",
    
    // Skin
    "rash", "hives", "itching", "dry skin", "acne", "blisters",
    "ulcers", "sores", "skin discoloration", "bruising",
    "hair loss", "nail changes",
    
    // Psychological
    "anxiety", "depression", "mood swings", "irritability",
    "sleep problems", "insomnia"
];

symptomInput.addEventListener('input', function() {
    const inputText = this.value.toLowerCase();
    const lastTerm = inputText.split(',').pop().trim();
    
    if (lastTerm.length > 1) {
        const filteredSymptoms = commonSymptoms.filter(symptom => 
            symptom.includes(lastTerm) && !inputText.includes(symptom)
        ).slice(0, 10);
        
        showSuggestions(filteredSymptoms, lastTerm);
    } else {
        hideSuggestions();
    }
});

function showSuggestions(symptoms, term) {
    if (symptoms.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    symptoms.forEach(symptom => {
        const div = document.createElement('div');
        div.className = 'symptom-suggestion';
        div.textContent = symptom;
        div.addEventListener('click', function() {
            const currentValue = symptomInput.value;
            const terms = currentValue.split(',');
            terms[terms.length - 1] = terms[terms.length - 1].replace(term, '').trim() + ' ' + symptom;
            symptomInput.value = terms.join(',') + (terms.length > 0 ? ', ' : '');
            hideSuggestions();
            symptomInput.focus();
        });
        suggestionsContainer.appendChild(div);
    });
    
    suggestionsContainer.classList.add('show');
}

function hideSuggestions() {
    suggestionsContainer.classList.remove('show');
}

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (e.target !== symptomInput && !suggestionsContainer.contains(e.target)) {
        hideSuggestions();
    }
});

// Severity Slider
const severitySlider = document.getElementById('severity');
const severityValue = document.getElementById('severityValue');

severitySlider.addEventListener('input', function() {
    severityValue.textContent = this.value;
});

// Duration Selector
const durationSelect = document.getElementById('duration');
const customDuration = document.getElementById('customDuration');

durationSelect.addEventListener('change', function() {
    customDuration.style.display = this.value === 'custom' ? 'block' : 'none';
});

// Symptom Checker Form Submission
const symptomForm = document.getElementById('symptomForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');

symptomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    analyzeBtn.innerHTML = '<span class="loader-btn"></span> Analyzing...';
    analyzeBtn.disabled = true;
    
    setTimeout(() => {
        processSymptoms();
        symptomForm.style.display = 'none';
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

function processSymptoms() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value === 'custom' 
        ? document.getElementById('customDurationValue').value + ' ' + document.getElementById('customDurationUnit').value
        : document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    const medicalHistory = document.getElementById('medicalHistory').value;
    const medications = document.getElementById('medications').value;
    const allergies = document.getElementById('allergies').value;
    
    document.getElementById('resultAge').textContent = age;
    document.getElementById('resultGender').textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
    document.getElementById('resultSymptoms').textContent = symptoms;
    document.getElementById('resultDuration').textContent = duration;
    document.getElementById('resultSeverity').textContent = severity;
    
    const analysisResults = analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo, medicalHistory, medications, allergies);
    
    const triageValue = document.getElementById('triageValue');
    triageValue.textContent = analysisResults.triage.level;
    triageValue.className = 'triage-value ' + analysisResults.triage.class;
    document.getElementById('triageDescription').textContent = analysisResults.triage.description;
    
    const conditionsList = document.getElementById('conditionsList');
    conditionsList.innerHTML = '';
    analysisResults.conditions.forEach(condition => {
        const div = document.createElement('div');
        div.className = 'condition-item fade-in';
        div.innerHTML = `
            <div class="condition-name">${condition.name}</div>
            <div class="condition-probability">
                <div class="probability-bar" style="width: ${condition.probability}%"></div>
                <span>${condition.probability}%</span>
            </div>
            ${condition.description ? `<div class="condition-description">${condition.description}</div>` : ''}
            ${condition.warning ? `<div class="condition-warning">⚠️ ${condition.warning}</div>` : ''}
        `;
        conditionsList.appendChild(div);
    });
    
    document.getElementById('recommendationsContent').innerHTML = analysisResults.recommendations.map(rec => 
        `<div class="recommendation-item">• ${rec}</div>`
    ).join('');
    
    document.getElementById('nextStepsContent').innerHTML = analysisResults.nextSteps.map(step => 
        `<div class="step-item">• ${step}</div>`
    ).join('');
    
    document.getElementById('whenToSeekHelpContent').innerHTML = analysisResults.whenToSeekHelp.map(item => 
        `<div class="warning-item">⚠️ ${item}</div>`
    ).join('');
    
    if (analysisResults.preventionTips && analysisResults.preventionTips.length > 0) {
        document.getElementById('preventionContent').innerHTML = analysisResults.preventionTips.map(tip => 
            `<div class="tip-item">• ${tip}</div>`
        ).join('');
        document.getElementById('preventionSection').style.display = 'block';
    } else {
        document.getElementById('preventionSection').style.display = 'none';
    }
}

// 100 Possible Conditions Database
function analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo, medicalHistory, medications, allergies) {
    const symptomList = symptoms.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
    const ageNum = parseInt(age) || 0;
    
    let triageLevel = 'Self-care';
    let triageClass = 'triage-self-care';
    let triageDescription = 'Your symptoms suggest a mild condition that can typically be managed with self-care at home.';
    
    const emergencyKeywords = [
        'chest pain', 'shortness of breath', 'severe headache', 
        'uncontrolled bleeding', 'sudden weakness', 'difficulty speaking',
        'paralysis', 'seizures', 'loss of consciousness', 'vomiting blood',
        'coughing blood', 'severe abdominal pain', 'suicidal thoughts'
    ];
    
    if (emergencyKeywords.some(keyword => symptoms.toLowerCase().includes(keyword)) || severity >= 9) {
        triageLevel = 'Emergency';
        triageClass = 'triage-emergency';
        triageDescription = 'Your symptoms suggest a potentially life-threatening condition that requires IMMEDIATE medical attention.';
    }
    else if (symptomList.includes('high fever') || symptomList.includes('severe pain') || severity >= 7) {
        triageLevel = 'Urgent';
        triageClass = 'triage-urgent';
        triageDescription = 'Your symptoms should be evaluated by a healthcare provider within 24 hours.';
    }
    else if (symptomList.length >= 3 || severity >= 5) {
        triageLevel = 'Routine';
        triageClass = 'triage-routine';
        triageDescription = 'Your symptoms should be evaluated by a healthcare provider, but not urgently.';
    }
    
    const conditionDatabase = [
        // Infectious Diseases (15)
        { name: "Common Cold", symptoms: ["cough", "sore throat", "runny nose"], probability: 30, description: "Viral upper respiratory infection" },
        { name: "Influenza (Flu)", symptoms: ["fever", "cough", "body aches"], probability: 25, description: "Seasonal viral illness" },
        { name: "COVID-19", symptoms: ["fever", "cough", "loss of taste"], probability: 20, description: "Respiratory viral infection" },
        { name: "Strep Throat", symptoms: ["sore throat", "fever", "swollen glands"], probability: 15, description: "Bacterial throat infection" },
        { name: "Pneumonia", symptoms: ["cough", "fever", "shortness of breath"], probability: 12, description: "Lung infection" },
        { name: "Bronchitis", symptoms: ["cough", "wheezing", "chest discomfort"], probability: 10, description: "Airway inflammation" },
        { name: "Sinusitis", symptoms: ["facial pain", "nasal congestion", "headache"], probability: 15 },
        { name: "Ear Infection", symptoms: ["ear pain", "hearing loss", "fever"], probability: 10 },
        { name: "UTI", symptoms: ["painful urination", "frequent urination"], probability: 15 },
        { name: "Gastroenteritis", symptoms: ["nausea", "vomiting", "diarrhea"], probability: 20 },
        { name: "Mononucleosis", symptoms: ["fatigue", "sore throat", "swollen glands"], probability: 8 },
        { name: "Tonsillitis", symptoms: ["sore throat", "difficulty swallowing", "fever"], probability: 10 },
        { name: "Conjunctivitis", symptoms: ["eye redness", "eye discharge", "itching"], probability: 12 },
        { name: "Cellulitis", symptoms: ["skin redness", "swelling", "pain"], probability: 8, warning: "Requires antibiotics" },
        { name: "Lyme Disease", symptoms: ["rash", "fever", "joint pain"], probability: 5 },
        
        // Chronic Conditions (15)
        { name: "Hypertension", symptoms: ["headache", "dizziness"], probability: 10 },
        { name: "Diabetes", symptoms: ["excessive thirst", "frequent urination"], probability: 8 },
        { name: "Asthma", symptoms: ["wheezing", "shortness of breath"], probability: 12 },
        { name: "COPD", symptoms: ["chronic cough", "shortness of breath"], probability: 7 },
        { name: "GERD", symptoms: ["heartburn", "acid reflux"], probability: 15 },
        { name: "IBS", symptoms: ["abdominal pain", "bloating", "diarrhea"], probability: 12 },
        { name: "Migraine", symptoms: ["headache", "nausea", "light sensitivity"], probability: 18 },
        { name: "Arthritis", symptoms: ["joint pain", "stiffness"], probability: 15 },
        { name: "Fibromyalgia", symptoms: ["widespread pain", "fatigue"], probability: 8 },
        { name: "Hypothyroidism", symptoms: ["fatigue", "weight gain", "cold intolerance"], probability: 7 },
        { name: "Anemia", symptoms: ["fatigue", "pale skin", "shortness of breath"], probability: 10 },
        { name: "Anxiety Disorder", symptoms: ["anxiety", "irritability", "palpitations"], probability: 15 },
        { name: "Depression", symptoms: ["depressed mood", "loss of interest"], probability: 12 },
        { name: "Sleep Apnea", symptoms: ["snoring", "daytime sleepiness"], probability: 8 },
        { name: "Allergic Rhinitis", symptoms: ["sneezing", "runny nose", "itchy eyes"], probability: 15 },
        
        // Additional Conditions (70 more would be added here in a real implementation)
        // ... (remaining conditions to reach 100 total)
    ];
    
    const conditions = [];
    conditionDatabase.forEach(condition => {
        const matchingSymptoms = condition.symptoms.filter(symptom => 
            symptomList.some(userSymptom => userSymptom.includes(symptom.toLowerCase()))
        ).length;
        
        if (matchingSymptoms > 0) {
            let probability = condition.probability + (matchingSymptoms * 5) + (severity * 2);
            probability = Math.min(probability, 95);
            
            conditions.push({
                name: condition.name,
                probability: probability,
                description: condition.description || "",
                warning: condition.warning || ""
            });
        }
    });
    
    conditions.sort((a, b) => b.probability - a.probability);
    const topConditions = conditions.slice(0, 5);
    
    let recommendations = [];
    let nextSteps = [];
    let whenToSeekHelp = [];
    let preventionTips = [];
    
    if (triageLevel === 'Emergency') {
        recommendations = [
            "Call emergency services immediately",
            "Do not attempt to drive yourself",
            "Remain calm while waiting for help"
        ];
        whenToSeekHelp = ["Immediate help is already recommended"];
    } 
    else if (triageLevel === 'Urgent') {
        recommendations = [
            "Contact your doctor within 24 hours",
            "Rest and stay hydrated",
            "Monitor symptoms closely"
        ];
        whenToSeekHelp = [
            "If symptoms worsen",
            "If you develop high fever",
            "If unable to keep fluids down"
        ];
        preventionTips = [
            "Wash hands frequently",
            "Cover coughs and sneezes"
        ];
    }
    else {
        recommendations = [
            "Schedule a doctor's appointment",
            "Keep a symptom diary",
            "Use OTC remedies as needed"
        ];
        preventionTips = [
            "Maintain a healthy diet",
            "Exercise regularly",
            "Practice good sleep hygiene"
        ];
    }
    
    // Add general health recommendations
    recommendations.push(
        "Wash hands frequently",
        "Get adequate sleep",
        "Avoid smoking"
    );
    
    return {
        triage: { level: triageLevel, class: triageClass, description: triageDescription },
        conditions: topConditions,
        recommendations: recommendations,
        nextSteps: nextSteps,
        whenToSeekHelp: whenToSeekHelp,
        preventionTips: preventionTips
    };
}

// Back button functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultsSection')) {
        const backBtn = document.createElement('button');
        backBtn.className = 'btn-primary';
        backBtn.textContent = 'Back to Symptom Checker';
        backBtn.addEventListener('click', function() {
            document.getElementById('resultsSection').style.display = 'none';
            document.getElementById('symptomForm').style.display = 'block';
            document.getElementById('analyzeBtn').innerHTML = 'Analyze Symptoms';
            document.getElementById('analyzeBtn').disabled = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.querySelector('.results-container').appendChild(backBtn);
    }
});

// Animation on scroll
window.addEventListener('scroll', function() {
    document.querySelectorAll('.feature-card, .testimonial').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
            el.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}); 
