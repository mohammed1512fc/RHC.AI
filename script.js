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

// Symptom Checker Form Submission
const symptomForm = document.getElementById('symptomForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');

// Configuration - Replace with your actual OpenAI API key
const OPENAI_API_KEY = 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

; // Replace with your actual key
const AI_ENABLED = true; // Set to false to use the simulated version

symptomForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    analyzeBtn.innerHTML = '<span class="loader-btn"></span> Analyzing...';
    analyzeBtn.disabled = true;
    
    try {
        if (AI_ENABLED && OPENAI_API_KEY && OPENAI_API_KEY !== 'your-api-key-here') {
            await processSymptomsWithAI();
        } else {
            // Fallback to simulated version if AI is disabled or no API key
            setTimeout(() => {
                processSymptoms();
            }, 1500);
        }
        
        // Hide form and show results
        symptomForm.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error analyzing symptoms:', error);
        analyzeBtn.innerHTML = 'Analyze Symptoms';
        analyzeBtn.disabled = false;
        
        // Show error message to user
        alert('There was an error analyzing your symptoms. Please try again later.');
    }
});

async function processSymptomsWithAI() {
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
    
    // Prepare the prompt for OpenAI
    const prompt = `Act as a medical professional analyzing patient symptoms. Provide a detailed analysis in JSON format with the following structure:
    {
        "triage": {
            "level": "Emergency/Urgent/Routine/Self-care",
            "description": "Detailed explanation of triage level",
            "urgency": "How quickly medical attention is needed"
        },
        "potential_conditions": [
            {
                "name": "Condition name",
                "probability": "low/medium/high or percentage",
                "description": "Brief description",
                "common_symptoms": ["list of matching symptoms"]
            }
        ],
        "recommendations": ["list of recommendations"],
        "next_steps": ["list of next steps"],
        "warning_signs": ["list of warning signs to watch for"]
    }
    
    Patient details:
    - Age: ${age}
    - Gender: ${gender}
    - Symptoms: ${symptoms}
    - Duration: ${duration}
    - Severity: ${severity}/10
    - Additional info: ${additionalInfo || 'None provided'}`;
    
    // Call OpenAI API
    const response = await callOpenAI(prompt);
    
    // Parse the response (assuming it's in JSON format)
    let analysisResults;
    try {
        // Try to extract JSON from the response
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}') + 1;
        const jsonString = response.slice(jsonStart, jsonEnd);
        analysisResults = JSON.parse(jsonString);
    } catch (e) {
        console.error('Error parsing AI response:', e);
        // Fallback to simulated version if parsing fails
        analysisResults = analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo);
    }
    
    // Display triage level
    const triageValue = document.getElementById('triageValue');
    triageValue.textContent = analysisResults.triage.level;
    
    // Determine class based on triage level
    let triageClass = 'triage-self-care';
    if (analysisResults.triage.level.toLowerCase().includes('emergency')) {
        triageClass = 'triage-emergency';
    } else if (analysisResults.triage.level.toLowerCase().includes('urgent')) {
        triageClass = 'triage-urgent';
    } else if (analysisResults.triage.level.toLowerCase().includes('routine')) {
        triageClass = 'triage-routine';
    }
    
    triageValue.className = 'triage-value ' + triageClass;
    document.getElementById('triageDescription').textContent = analysisResults.triage.description;
    
    // Display potential conditions
    const conditionsList = document.getElementById('conditionsList');
    conditionsList.innerHTML = '';
    
    const conditions = analysisResults.potential_conditions || analysisResults.conditions || [];
    conditions.forEach(condition => {
        const div = document.createElement('div');
        div.className = 'condition-item fade-in';
        
        // Handle different probability formats (low/medium/high or percentage)
        let probabilityText = condition.probability;
        if (typeof condition.probability === 'number') {
            probabilityText = `${condition.probability}%`;
        } else if (!['low', 'medium', 'high'].includes(condition.probability.toLowerCase())) {
            probabilityText = 'Medium'; // Default if format is unexpected
        }
        
        div.innerHTML = `
            <div class="condition-name">${condition.name}</div>
            <div class="condition-probability">Probability: ${probabilityText}</div>
            ${condition.description ? `<div class="condition-description">${condition.description}</div>` : ''}
        `;
        conditionsList.appendChild(div);
    });
    
    // Display recommendations
    const recommendationsContent = document.getElementById('recommendationsContent');
    const recommendations = analysisResults.recommendations || [];
    recommendationsContent.innerHTML = recommendations.map(rec => 
        `<p>• ${rec}</p>`
    ).join('');
    
    // Display next steps
    const nextStepsContent = document.getElementById('nextStepsContent');
    const nextSteps = analysisResults.next_steps || analysisResults.nextSteps || [];
    nextStepsContent.innerHTML = nextSteps.map(step => 
        `<p>• ${step}</p>`
    ).join('');
    
    // Display warning signs if available
    const warningSignsContent = document.getElementById('warningSignsContent');
    if (analysisResults.warning_signs) {
        document.getElementById('warningSigns').style.display = 'block';
        warningSignsContent.innerHTML = analysisResults.warning_signs.map(sign => 
            `<p>• ${sign}</p>`
        ).join('');
    } else {
        document.getElementById('warningSigns').style.display = 'none';
    }
    
    // Reset button state
    analyzeBtn.innerHTML = 'Analyze Symptoms';
    analyzeBtn.disabled = false;
}

async function callOpenAI(prompt) {
    // Show loading state
    analyzeBtn.innerHTML = '<span class="loader-btn"></span> Consulting AI...';
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // or "gpt-4" if you have access
                messages: [
                    {
                        role: "system",
                        content: "You are a medical professional analyzing patient symptoms. Provide accurate, helpful information in JSON format. Include triage level, potential conditions with probabilities, recommendations, and next steps."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.3, // Lower temperature for more focused responses
                max_tokens: 1000
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        // Fallback to simulated version
        return JSON.stringify(analyzeSymptoms(
            document.getElementById('age').value,
            document.getElementById('gender').value,
            document.getElementById('symptoms').value,
            document.getElementById('duration').value,
            document.getElementById('severity').value,
            document.getElementById('additionalInfo').value
        ));
    }
}

// Fallback symptom analysis (simulated)
function processSymptoms() {
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
    
    // Process symptoms with AI (simulated)
    const analysisResults = analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo);
    
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
    
    // Reset button state
    analyzeBtn.innerHTML = 'Analyze Symptoms';
    analyzeBtn.disabled = false;
}

// Advanced AI Symptom Analysis (simulated)
function analyzeSymptoms(age, gender, symptoms, duration, severity, additionalInfo) {
    // Convert symptoms to array
    const symptomList = symptoms.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
    
    // Determine triage level based on symptoms and severity
    let triageLevel = 'Self-care';
    let triageClass = 'triage-self-care';
    let triageDescription = 'Your symptoms suggest a mild condition that can typically be managed with self-care at home.';
    
    // Emergency conditions
    const emergencyKeywords = ['chest pain', 'shortness of breath', 'severe headache', 'uncontrolled bleeding', 'sudden weakness', 'difficulty speaking'];
    if (emergencyKeywords.some(keyword => symptoms.toLowerCase().includes(keyword)) || severity >= 9) {
        triageLevel = 'Emergency';
        triageClass = 'triage-emergency';
        triageDescription = 'Your symptoms suggest a potentially life-threatening condition that requires IMMEDIATE medical attention. Call emergency services or go to the nearest emergency department.';
    }
    // Urgent conditions
    else if (symptomList.includes('high fever') || symptomList.includes('severe pain') || severity >= 7) {
        triageLevel = 'Urgent';
        triageClass = 'triage-urgent';
        triageDescription = 'Your symptoms suggest a condition that should be evaluated by a healthcare provider within 24 hours. Contact your doctor or visit an urgent care facility.';
    }
    // Routine conditions
    else if (symptomList.length >= 3 || severity >= 5) {
        triageLevel = 'Routine';
        triageClass = 'triage-routine';
        triageDescription = 'Your symptoms suggest a condition that should be evaluated by a healthcare provider, but not urgently. Schedule an appointment with your doctor.';
    }
    
    // Generate potential conditions based on symptoms
    const conditions = [];
    
    // Common condition database
    const conditionDatabase = [
        { name: "Common Cold", symptoms: ["cough", "sore throat", "runny nose", "congestion", "sneezing"], probability: 30 },
        { name: "Influenza (Flu)", symptoms: ["fever", "cough", "fatigue", "muscle pain", "headache"], probability: 25 },
        { name: "Migraine", symptoms: ["headache", "nausea", "dizziness", "sensitivity to light"], probability: 20 },
        { name: "Sinusitis", symptoms: ["facial pain", "congestion", "headache", "postnasal drip"], probability: 15 },
        { name: "Allergic Rhinitis", symptoms: ["sneezing", "runny nose", "itchy eyes", "congestion"], probability: 15 },
        { name: "Gastroenteritis", symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain"], probability: 15 },
        { name: "Urinary Tract Infection", symptoms: ["painful urination", "frequent urination", "abdominal pain"], probability: 10 },
        { name: "Tension Headache", symptoms: ["headache", "stress", "neck pain"], probability: 10 },
        { name: "COVID-19", symptoms: ["fever", "cough", "shortness of breath", "fatigue", "loss of taste or smell"], probability: 10 },
        { name: "Anxiety Disorder", symptoms: ["anxiety", "irritability", "palpitations", "sweating"], probability: 5 }
    ];
    
    // Match symptoms to conditions
    conditionDatabase.forEach(condition => {
        const matchingSymptoms = condition.symptoms.filter(symptom => 
            symptomList.includes(symptom.toLowerCase())
        ).length;
        
        if (matchingSymptoms > 0) {
            // Calculate probability based on symptom matches and severity
            let probability = condition.probability + (matchingSymptoms * 5) + (severity * 2);
            probability = Math.min(probability, 95); // Cap at 95%
            
            conditions.push({
                name: condition.name,
                probability: probability
            });
        }
    });
    
    // Sort conditions by probability
    conditions.sort((a, b) => b.probability - a.probability);
    
    // Limit to top 5 conditions
    const topConditions = conditions.slice(0, 5);
    
    // Generate recommendations based on triage level
    let recommendations = [];
    let nextSteps = [];
    
    if (triageLevel === 'Emergency') {
        recommendations = [
            "Call emergency services (911 or local emergency number) immediately.",
            "Do not attempt to drive yourself to the hospital.",
            "If experiencing chest pain, chew one adult aspirin (unless allergic).",
            "Remain calm and try to stay still while waiting for help."
        ];
        
        nextSteps = [
            "Emergency medical team will assess your condition upon arrival.",
            "You will likely be transported to the nearest emergency department.",
            "Bring a list of any medications you're currently taking.",
            "Notify family members or friends about your situation."
        ];
    } 
    else if (triageLevel === 'Urgent') {
        recommendations = [
            "Contact your primary care physician or visit an urgent care facility within 24 hours.",
            "Rest and stay hydrated.",
            "Monitor your symptoms closely for any worsening.",
            "Take over-the-counter pain relievers as needed (following package instructions)."
        ];
        
        nextSteps = [
            "Prepare a list of your symptoms, including when they started and what makes them better or worse.",
            "Bring your insurance information and photo ID to your appointment.",
            "Be ready to provide your medical history, including any chronic conditions and medications.",
            "Consider having someone accompany you to your appointment."
        ];
    }
    else if (triageLevel === 'Routine') {
        recommendations = [
            "Schedule an appointment with your healthcare provider in the next few days.",
            "Keep a symptom diary to track patterns or triggers.",
            "Get plenty of rest and maintain good hydration.",
            "Use over-the-counter remedies as appropriate for symptom relief."
        ];
        
        nextSteps = [
            "Call your doctor's office to schedule an appointment.",
            "Write down any questions you have for your healthcare provider.",
            "Check if you need any lab tests or imaging before your appointment.",
            "Review your family medical history for relevant conditions."
        ];
    }
    else {
        recommendations = [
            "Your symptoms may resolve with self-care and time.",
            "Get plenty of rest and stay hydrated.",
            "Use over-the-counter medications as needed for symptom relief.",
            "Practice good hygiene to prevent spreading illness if contagious."
        ];
        
        nextSteps = [
            "Monitor your symptoms for 48 hours.",
            "If symptoms persist beyond 3-5 days or worsen, contact your healthcare provider.",
            "Consider telemedicine options if you want professional advice without an office visit.",
            "Maintain a healthy diet and light activity as tolerated."
        ];
    }
    
    // Add general health recommendations
    recommendations.push(
        "Wash your hands frequently to prevent spreading or catching infections.",
        "Get adequate sleep to support your immune system.",
        "Consider using a humidifier if you have respiratory symptoms.",
        "Avoid smoking and secondhand smoke exposure."
    );
    
    // Add COVID-19 specific advice if relevant
    if (symptomList.some(s => ["fever", "cough", "shortness of breath", "loss of taste", "loss of smell"].includes(s))) {
        recommendations.push(
            "Consider getting tested for COVID-19.",
            "Self-isolate until you can be tested or symptoms improve.",
            "Wear a mask if you must be around others."
        );
    }
    
    return {
        triage: {
            level: triageLevel,
            class: triageClass,
            description: triageDescription
        },
        conditions: topConditions,
        recommendations: recommendations,
        nextSteps: nextSteps
    };
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
