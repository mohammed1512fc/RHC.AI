// script.js - Ultra Advanced Rapid Health Checker AI

// Grab DOM elements
const analyzeBtn = document.getElementById('analyze-btn');
const symptomsInput = document.getElementById('symptoms-input');
const resultsContainer = document.getElementById('results');
const loader = document.getElementById('loader');

// Symptom dictionary grouped by categories
const symptomKeywords = {
    "Emergency": [
        "chest pain", "shortness of breath", "severe bleeding", "loss of consciousness", "seizure",
        "stroke", "paralysis", "numbness", "severe allergic reaction", "anaphylaxis", "severe burn",
        "severe head injury", "uncontrolled bleeding", "difficulty breathing", "spinal injury",
        "open fracture", "major trauma", "vision loss", "confusion", "unresponsiveness"
    ],
    "Urgent": [
        "high fever", "severe pain", "persistent vomiting", "deep cut", "serious burn", "broken bone",
        "infected wound", "sudden weakness", "abnormal heartbeat", "severe dehydration", "abdominal swelling",
        "difficulty urinating", "severe migraine", "persistent diarrhea", "unexplained severe weight loss"
    ],
    "General": [
        "cough", "headache", "sore throat", "stomachache", "back pain", "fatigue", "runny nose",
        "nausea", "diarrhea", "mild fever", "joint pain", "rash", "mild swelling", "earache",
        "nasal congestion", "toothache", "sneezing", "chills", "muscle aches", "mild dizziness",
        "irritated eyes", "dry throat", "sinus pressure", "bruises", "itchy skin", "hair loss"
    ],
    "Mental Health": [
        "anxiety", "depression", "insomnia", "panic attack", "feeling hopeless", "extreme sadness",
        "thoughts of self-harm", "excessive fear", "difficulty concentrating", "social withdrawal",
        "loss of interest", "agitation", "mood swings", "chronic stress", "emotional numbness"
    ],
    "Respiratory": [
        "difficulty breathing", "wheezing", "persistent cough", "choking", "tightness in chest",
        "productive cough", "bloody sputum", "asthma attack", "shortness of breath during exertion",
        "nighttime coughing", "hoarseness", "prolonged sore throat"
    ],
    "Digestive": [
        "abdominal pain", "constipation", "bloating", "loss of appetite", "acid reflux",
        "bloody stool", "yellowing skin (jaundice)", "indigestion", "heartburn", "nausea after eating",
        "vomiting blood", "painful swallowing", "frequent gas", "diarrhea with mucus"
    ],
    "Cardiovascular": [
        "palpitations", "chest tightness", "cold sweats", "swollen legs", "blue lips",
        "irregular heartbeat", "dizziness when standing", "fainting spells", "sharp chest pain",
        "rapid heartbeat", "slow heartbeat"
    ],
    "Neurological": [
        "tingling", "numbness in limbs", "memory loss", "confusion", "difficulty speaking",
        "unsteady gait", "loss of coordination", "muscle weakness", "sudden vision changes",
        "sudden hearing loss", "vertigo", "tremors"
    ],
    "Infectious Diseases": [
        "persistent cough", "fever with chills", "night sweats", "skin lesions", "swollen lymph nodes",
        "sudden rash", "painful urination", "white patches in mouth", "unexplained fever",
        "prolonged diarrhea", "redness around wound"
    ],
    "Musculoskeletal": [
        "joint swelling", "joint redness", "restricted movement", "muscle cramp", "bone pain",
        "stiffness in joints", "muscle soreness", "knee locking", "shoulder dislocation", "tendonitis symptoms"
    ],
    "Dermatological": [
        "rash", "hives", "eczema", "acne", "dry skin", "peeling skin", "skin infection",
        "itching", "skin blister", "dark mole", "sudden mole growth", "skin discoloration",
        "skin ulcers"
    ],
    "Urinary": [
        "frequent urination", "painful urination", "blood in urine", "incomplete bladder emptying",
        "lower abdominal pressure", "foul-smelling urine", "urinary urgency", "incontinence"
    ],
    "Reproductive": [
        "pelvic pain", "abnormal bleeding", "missed periods", "painful periods", "unusual vaginal discharge",
        "testicular pain", "erectile dysfunction", "breast lump", "breast tenderness"
    ]
};

// Recommendations based on triage
const recommendations = {
    "Emergency": "⚠️ Seek immediate medical attention. Call 911 or go to the nearest emergency room.",
    "Urgent": "🚑 Visit an urgent care center or contact your doctor as soon as possible.",
    "General": "🏥 Monitor symptoms. Rest, stay hydrated, and consult your doctor if symptoms worsen.",
    "Mental Health": "🧠 Please consider reaching out to a mental health professional.",
    "Respiratory": "🌬️ Seek care if breathing issues worsen.",
    "Digestive": "🍽️ Follow a gentle diet. Consult your doctor if symptoms persist."
};

// Handle analyze button click
analyzeBtn.addEventListener('click', function () {
    const symptomsText = symptomsInput.value.trim().toLowerCase();
    if (symptomsText.length === 0) {
        alert('Please enter your symptoms to analyze.');
        return;
    }

    // Show loading spinner
    resultsContainer.innerHTML = '';
    loader.style.display = 'block';

    setTimeout(() => {
        const analysisResult = analyzeSymptoms(symptomsText);
        displayResults(analysisResult);
    }, 1500); // Simulate AI thinking delay
});

// Analyze symptoms smartly
function analyzeSymptoms(text) {
    let detected = [];
    let emergencyCount = 0;
    let urgentCount = 0;
    let generalCount = 0;

    // Loop through all categories
    for (const [category, keywords] of Object.entries(symptomKeywords)) {
        for (const keyword of keywords) {
            if (text.includes(keyword)) {
                detected.push({ keyword, category });

                if (category === "Emergency") emergencyCount++;
                else if (category === "Urgent") urgentCount++;
                else generalCount++;
            }
        }
    }

    let triage = "General";
    if (emergencyCount > 0) triage = "Emergency";
    else if (urgentCount > 0) triage = "Urgent";

    return {
        detected,
        triage,
        recommendation: recommendations[triage],
        totalMatches: detected.length
    };
}

// Display the analysis results
function displayResults(result) {
    loader.style.display = 'none';
    resultsContainer.innerHTML = `
        <h2>Analysis Result</h2>
        <p><strong>Triage Level:</strong> ${result.triage}</p>
        <p><strong>Recommendation:</strong> ${result.recommendation}</p>
        <h3>Detected Symptoms:</h3>
        <ul>
            ${result.detected.map(d => `<li>${d.keyword} (${d.category})</li>`).join('')}
        </ul>
        <p><strong>Total Matched Symptoms:</strong> ${result.totalMatches}</p>
    `;
} 
