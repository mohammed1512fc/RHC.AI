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

// Extensive list of common symptoms
const commonSymptoms = [
    "headache", "fever", "cough", "fatigue", "nausea", "dizziness", 
    "shortness of breath", "chest pain", "abdominal pain", "back pain",
    "joint pain", "muscle pain", "sore throat", "runny nose", "congestion",
    "sneezing", "rash", "itching", "swelling", "redness", "bruising",
    "bleeding", "diarrhea", "constipation", "vomiting", "loss of appetite",
    "weight loss", "weight gain", "insomnia", "anxiety", "depression",
    "irritability", "confusion", "memory loss", "blurred vision", "eye pain",
    "ear pain", "hearing loss", "tinnitus", "nasal congestion", "nosebleed",
    "toothache", "jaw pain", "neck pain", "shoulder pain", "arm pain",
    "hand pain", "finger pain", "hip pain", "leg pain", "knee pain",
    "ankle pain", "foot pain", "toe pain", "numbness", "tingling",
    "weakness", "paralysis", "seizures", "tremors", "palpitations",
    "irregular heartbeat", "high blood pressure", "low blood pressure",
    "fainting", "lightheadedness", "dehydration", "excessive thirst",
    "excessive hunger", "frequent urination", "painful urination",
    "blood in urine", "difficulty urinating", "incontinence", "swollen lymph nodes",
    "night sweats", "chills", "hot flashes", "cold intolerance", "heat intolerance",
    "hair loss", "brittle nails", "dry skin", "oily skin", "acne",
    "hives", "blisters", "ulcers", "sores", "warts", "moles", "freckles",
    "birthmarks", "stretch marks", "varicose veins", "swollen ankles",
    "swollen feet", "swollen hands", "swollen face", "puffiness",
    "jaundice", "pale skin", "flushing", "cyanosis", "clubbing"
];

symptomInput.addEventListener('input', function() {
    const inputText = this.value.toLowerCase();
    const lastTerm = inputText.split(',').pop().trim();
    
    if (lastTerm.length > 1) {
        const filteredSymptoms = commonSymptoms.filter(symptom => 
            symptom.startsWith(lastTerm) && !inputText.includes(symptom)
        );
        
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
            terms[terms.length - 1] = ' ' + symptom;
            symptomInput.value = terms.join(',') + ', ';
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
    if (e.target !== symptomInput) {
        hideSuggestions();
    }
});

// Severity Slider
const severitySlider = document.getElementById('severity');
const severityValue = document.getElementById('severityValue');

severitySlider.addEventListener('input', function() {
    severityValue.textContent = this.value;
});

// Gemini API Integration
const GEMINI_API_KEY = 'AIzaSyChqoxkLn5RviAleTg1-rONge4HFwH2pZU'; // ⚠️ WARNING: Only for development!
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Symptom Checker Form Submission
const symptomForm = document.getElementById('symptomForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');

symptomForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    analyzeBtn.innerHTML = '<span class="loader-btn"></span> Analyzing...';
    analyzeBtn.disabled = true;
    
    try {
        await processSymptoms();
        
        // Hide form and show results
        symptomForm.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
        analyzeBtn.innerHTML = 'Try Again';
        analyzeBtn.disabled = false;
        alert('There was an error analyzing your symptoms. Please try again.');
    }
});

async function processSymptoms() {
    // Get form values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    
    // Display user info in results
    document.getElementById('resultAge').textContent = age;
    document.getElementById('resultGender').textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
    document.getElementById('resultSymptoms').textContent = symptoms;
    
    try {
        // Try Gemini API first
        const analysisResults = await analyzeWithGemini(age, gender, symptoms, duration, severity, additionalInfo);
        displayResults(analysisResults);
    } catch (apiError) {
        console.warn('API failed, using fallback:', apiError);
        // Fallback to local analysis
        const analysisResults = analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo);
        displayResults(analysisResults);
        
        // Show warning to user
        const warning = document.createElement('div');
        warning.className = 'api-warning';
        warning.innerHTML = '<p>⚠️ Showing results from our local database. For more accurate analysis, please try again later.</p>';
        resultsSection.prepend(warning);
    }
}

async function analyzeWithGemini(age, gender, symptoms, duration, severity, additionalInfo) {
    const prompt = `You are a medical triage assistant. Analyze these symptoms and provide:
1. Triage level (Emergency, Urgent, Routine, or Self-care)
2. Top 3-5 potential conditions with probability percentages
3. Practical recommendations
4. Clear next steps

Patient details:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms}
- Duration: ${duration}
- Severity: ${severity}/10
- Additional info: ${additionalInfo || 'none'}

Format your response as valid JSON with this exact structure:
{
    "triage": {
        "level": "Emergency/Urgent/Routine/Self-care",
        "description": "1-2 sentence explanation"
    },
    "conditions": [
        {
            "name": "condition name",
            "probability": "percentage"
        }
    ],
    "recommendations": [
        "array of recommendations"
    ],
    "nextSteps": [
        "array of next steps"
    ]
}

Only respond with the JSON object.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;
    
    try {
        // Clean the response and parse JSON
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}') + 1;
        const jsonResponse = JSON.parse(responseText.slice(jsonStart, jsonEnd));
        
        // Add triage class
        jsonResponse.triage.class = getTriageClass(jsonResponse.triage.level);
        return jsonResponse;
    } catch (parseError) {
        console.error('Failed to parse response:', responseText);
        throw new Error('Could not parse API response');
    }
}

function getTriageClass(level) {
    level = level.toLowerCase();
    if (level.includes('emergency')) return 'triage-emergency';
    if (level.includes('urgent')) return 'triage-urgent';
    if (level.includes('routine')) return 'triage-routine';
    return 'triage-self-care';
}

function displayResults(analysisResults) {
    // Display triage level
    const triageValue = document.getElementById('triageValue');
    triageValue.textContent = analysisResults.triage.level;
    triageValue.className = 'triage-value ' + analysisResults.triage.class;
    document.getElementById('triageDescription').textContent = analysisResults.triage.description;
    
    // Display potential conditions
    const conditionsList = document.getElementById('conditionsList');
    conditionsList.innerHTML = '';
    analysisResults.conditions.forEach(condition => {
        const div = document.createElement('div');
        div.className = 'condition-item fade-in';
        div.innerHTML = `
            <div class="condition-name">${condition.name}</div>
            <div class="condition-probability">Probability: ${condition.probability}%</div>
        `;
        conditionsList.appendChild(div);
    });
    
    // Display recommendations
    const recommendationsContent = document.getElementById('recommendationsContent');
    recommendationsContent.innerHTML = analysisResults.recommendations.map(rec => 
        `<p>• ${rec}</p>`
    ).join('');
    
    // Display next steps
    const nextStepsContent = document.getElementById('nextStepsContent');
    nextStepsContent.innerHTML = analysisResults.nextSteps.map(step => 
        `<p>• ${step}</p>`
    ).join('');
}

// Local fallback analysis
function analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo) {
    // ... (keep your existing analyzeSymptoms function exactly as is) ...
}

// Back button functionality for results page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultsSection')) {
        const backBtn = document.createElement('button');
        backBtn.className = 'btn-primary';
        backBtn.textContent = 'Back to Symptom Checker';
        backBtn.style.marginTop = '20px';
        backBtn.addEventListener('click', function() {
            document.getElementById('resultsSection').style.display = 'none';
            document.getElementById('symptomForm').style.display = 'block';
            document.getElementById('analyzeBtn').innerHTML = 'Analyze Symptoms';
            document.getElementById('analyzeBtn').disabled = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.appendChild(backBtn);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .testimonial, .about-content, .about-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
// Initial check in case elements are already in view
animateOnScroll();
