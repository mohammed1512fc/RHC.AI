 // Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 0);
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

symptomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    analyzeBtn.innerHTML = '<span class="loader-btn"></span> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        processSymptoms();
        
        // Hide form and show results
        symptomForm.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

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
       {  name: "Common Cold",  symptoms: ["cough", "sore throat", "runny nose", "congestion", "sneezing"], 
            probability: 30,
            description: "Viral infection of the upper respiratory tract",
            warning: "Seek care if symptoms last more than 10 days or worsen"
        },
           
        { 
            name: "Influenza (Flu)", 
            symptoms: ["fever", "cough", "fatigue", "muscle pain", "headache", "chills"], 
            probability: 25,
            description: "Viral infection affecting the respiratory system",
            warning: "Can lead to serious complications in high-risk groups"
        },
        { 
            name: "COVID-19", 
            symptoms: ["fever", "cough", "shortness of breath", "fatigue", "loss of taste", "loss of smell"], 
            probability: 15,
            description: "Respiratory illness caused by SARS-CoV-2 virus",
            warning: "Highly contagious - isolate and get tested"
        },
        { 
            name: "Strep Throat", 
            symptoms: ["sore throat", "fever", "swollen lymph nodes", "painful swallowing", "white patches on tonsils"], 
            probability: 10,
            description: "Bacterial infection of the throat and tonsils",
            warning: "Requires antibiotics to prevent complications"
        },
        { 
            name: "Pneumonia", 
            symptoms: ["cough", "fever", "shortness of breath", "chest pain", "fatigue"], 
            probability: 8,
            description: "Infection that inflames air sacs in one or both lungs",
            warning: "Can be life-threatening in severe cases"
        },
        
        // Neurological Conditions
        { 
            name: "Migraine", 
            symptoms: ["headache", "nausea", "sensitivity to light", "sensitivity to sound", "aura"], 
            probability: 20,
            description: "Recurrent headaches often accompanied by sensory disturbances"
        },
        { 
            name: "Tension Headache", 
            symptoms: ["headache", "stress", "neck pain", "pressure around forehead"], 
            probability: 25,
            description: "Common headache often related to stress or muscle tension"
        },
        { 
            name: "Concussion", 
            symptoms: ["headache", "confusion", "dizziness", "nausea", "memory problems", "recent head injury"], 
            probability: 5,
            description: "Mild traumatic brain injury",
            warning: "Requires immediate medical evaluation"
        },
        
        // Cardiovascular Conditions
        { 
            name: "Hypertension", 
            symptoms: ["high blood pressure", "headache", "dizziness", "blurred vision"], 
            probability: 15,
            description: "Chronic condition of elevated blood pressure",
            warning: "Silent condition that can lead to serious complications"
        },
        { 
            name: "Heart Attack", 
            symptoms: ["chest pain", "shortness of breath", "nausea", "sweating", "arm pain"], 
            probability: 3,
            description: "Blockage of blood flow to the heart muscle",
            warning: "MEDICAL EMERGENCY - call 911 immediately"
        },
        { 
            name: "Angina", 
            symptoms: ["chest pain", "chest pressure", "shortness of breath", "fatigue"], 
            probability: 5,
            description: "Reduced blood flow to the heart",
            warning: "May precede a heart attack"
        },
        
        // Gastrointestinal Conditions
        { 
            name: "Gastroenteritis", 
            symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain", "fever"], 
            probability: 20,
            description: "Inflammation of the stomach and intestines"
        },
        { 
            name: "GERD", 
            symptoms: ["heartburn", "acid reflux", "regurgitation", "chest pain"], 
            probability: 18,
            description: "Chronic acid reflux disease"
        },
        { 
            name: "Irritable Bowel Syndrome", 
            symptoms: ["abdominal pain", "bloating", "diarrhea", "constipation", "gas"], 
            probability: 12,
            description: "Chronic gastrointestinal disorder"
        },
        { 
            name: "Appendicitis", 
            symptoms: ["abdominal pain", "nausea", "vomiting", "loss of appetite", "fever"], 
            probability: 4,
            description: "Inflammation of the appendix",
            warning: "Requires immediate medical attention"
        },
        
        // Musculoskeletal Conditions
        { 
            name: "Osteoarthritis", 
            symptoms: ["joint pain", "joint stiffness", "swelling", "reduced range of motion"], 
            probability: 15,
            description: "Degenerative joint disease"
        },
        { 
            name: "Rheumatoid Arthritis", 
            symptoms: ["joint pain", "joint swelling", "morning stiffness", "fatigue"], 
            probability: 5,
            description: "Autoimmune inflammatory arthritis"
        },
        { 
            name: "Fibromyalgia", 
            symptoms: ["widespread pain", "fatigue", "sleep problems", "memory issues"], 
            probability: 6,
            description: "Chronic pain condition"
        },
        
        // Mental Health Conditions
        { 
            name: "Anxiety Disorder", 
            symptoms: ["anxiety", "worry", "irritability", "palpitations", "sweating"], 
            probability: 15,
            description: "Excessive and persistent worry and fear"
        },
        { 
            name: "Depression", 
            symptoms: ["depressed mood", "loss of interest", "fatigue", "sleep changes", "appetite changes"], 
            probability: 12,
            description: "Mood disorder causing persistent sadness"
        },
        
        // Endocrine Conditions
        { 
            name: "Diabetes Mellitus", 
            symptoms: ["excessive thirst", "frequent urination", "fatigue", "blurred vision"], 
            probability: 10,
            description: "Chronic metabolic disorder",
            warning: "Requires medical management"
        },
        { 
            name: "Hypothyroidism", 
            symptoms: ["fatigue", "weight gain", "cold intolerance", "dry skin", "constipation"], 
            probability: 8,
            description: "Underactive thyroid gland"
        },  
        // Respiratory Conditions
        { name: "Asthma", symptoms: ["wheezing", "shortness of breath", "chest tightness", "cough"], probability: 10 },
        { name: "Bronchitis", symptoms: ["cough", "sputum production", "fatigue", "shortness of breath"], probability: 12 },
        { name: "Chronic Obstructive Pulmonary Disease (COPD)", symptoms: ["shortness of breath", "chronic cough", "wheezing", "sputum production"], probability: 6 },
        { name: "Sinusitis", symptoms: ["facial pain", "nasal congestion", "headache", "postnasal drip"], probability: 15 },
        { name: "Allergic Rhinitis", symptoms: ["sneezing", "runny nose", "itchy eyes", "nasal congestion"], probability: 18 },
        
        // Skin Conditions
        { name: "Eczema", symptoms: ["itchy skin", "redness", "dry skin", "rash"], probability: 12 },
        { name: "Psoriasis", symptoms: ["red patches", "silvery scales", "itchy skin", "dry skin"], probability: 5 },
        { name: "Contact Dermatitis", symptoms: ["rash", "redness", "itching", "skin irritation"], probability: 10 },
        { name: "Acne Vulgaris", symptoms: ["pimples", "blackheads", "whiteheads", "oily skin"], probability: 15 },
        { name: "Urticaria (Hives)", symptoms: ["itchy welts", "red bumps", "skin swelling"], probability: 8 },
        
        // Eye Conditions
        { name: "Conjunctivitis (Pink Eye)", symptoms: ["eye redness", "eye itching", "eye discharge", "gritty feeling"], probability: 12 },
        { name: "Dry Eye Syndrome", symptoms: ["dry eyes", "eye irritation", "burning sensation", "blurred vision"], probability: 10 },
        { name: "Cataracts", symptoms: ["cloudy vision", "glare sensitivity", "poor night vision", "fading colors"], probability: 5 },
        
        // Ear Conditions
        { name: "Otitis Media (Ear Infection)", symptoms: ["ear pain", "hearing loss", "ear drainage", "fever"], probability: 8 },
        { name: "Tinnitus", symptoms: ["ringing in ears", "buzzing", "hissing", "roaring"], probability: 7 },
        { name: "Meniere's Disease", symptoms: ["vertigo", "tinnitus", "hearing loss", "ear fullness"], probability: 2 },
        
        // Urinary Conditions
        { name: "Urinary Tract Infection", symptoms: ["painful urination", "frequent urination", "urinary urgency", "cloudy urine"], probability: 15 },
        { name: "Kidney Stones", symptoms: ["severe flank pain", "blood in urine", "nausea", "urinary urgency"], probability: 6 },
        { name: "Benign Prostatic Hyperplasia", symptoms: ["difficulty urinating", "frequent urination", "weak urine stream", "urinary retention"], probability: 10 },
        
        // Women's Health
        { name: "Premenstrual Syndrome (PMS)", symptoms: ["mood swings", "bloating", "breast tenderness", "irritability"], probability: 15 },
        { name: "Endometriosis", symptoms: ["pelvic pain", "painful periods", "painful intercourse", "infertility"], probability: 8 },
        { name: "Polycystic Ovary Syndrome (PCOS)", symptoms: ["irregular periods", "excess hair growth", "acne", "weight gain"], probability: 7 },
        
        // Men's Health
        { name: "Erectile Dysfunction", symptoms: ["difficulty achieving erection", "difficulty maintaining erection", "reduced sexual desire"], probability: 8 },
        { name: "Prostatitis", symptoms: ["pelvic pain", "painful urination", "frequent urination", "sexual dysfunction"], probability: 5 },
        
        // Pediatric Conditions
        { name: "Hand, Foot and Mouth Disease", symptoms: ["fever", "mouth sores", "skin rash", "loss of appetite"], probability: 7 },
        { name: "Croup", symptoms: ["barking cough", "hoarse voice", "difficulty breathing", "stridor"], probability: 5 },
        { name: "Ear Infection (Pediatric)", symptoms: ["ear pain", "tugging at ear", "fever", "irritability"], probability: 12 },
        
        // Infectious Diseases
        { name: "Mononucleosis", symptoms: ["fatigue", "sore throat", "fever", "swollen lymph nodes"], probability: 6 },
        { name: "Lyme Disease", symptoms: ["bullseye rash", "fever", "fatigue", "joint pain"], probability: 3 },
        { name: "Tuberculosis", symptoms: ["chronic cough", "fever", "night sweats", "weight loss"], probability: 2 },
        
        // Autoimmune Conditions
        { name: "Lupus", symptoms: ["fatigue", "joint pain", "rash", "fever"], probability: 3 },
        { name: "Multiple Sclerosis", symptoms: ["numbness", "weakness", "vision problems", "balance problems"], probability: 2 },
        
        // Neurological Conditions
        { name: "Parkinson's Disease", symptoms: ["tremor", "stiffness", "slow movement", "balance problems"], probability: 2 },
        { name: "Alzheimer's Disease", symptoms: ["memory loss", "confusion", "difficulty with familiar tasks", "personality changes"], probability: 2 },
        
        // Cancer-related Conditions
        { name: "Breast Cancer", symptoms: ["breast lump", "breast pain", "nipple discharge", "skin changes"], probability: 1, warning: "Requires immediate medical evaluation" },
        { name: "Lung Cancer", symptoms: ["chronic cough", "coughing blood", "chest pain", "weight loss"], probability: 1, warning: "Requires immediate medical evaluation" },
        { name: "Colorectal Cancer", symptoms: ["rectal bleeding", "abdominal pain", "change in bowel habits", "weight loss"], probability: 1, warning: "Requires immediate medical evaluation" },
    
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
