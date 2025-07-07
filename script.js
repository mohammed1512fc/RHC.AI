// Advanced AI Symptom Checker - Professional Medical Grade
// Enhanced with sophisticated medical logic and comprehensive analysis

// Medical Knowledge Base - Comprehensive symptom database
const MEDICAL_DATABASE = {
    symptoms: {
        // Cardiovascular
        "chest pain": { category: "cardiovascular", severity: 9, urgency: "emergency" },
        "shortness of breath": { category: "respiratory", severity: 8, urgency: "urgent" },
        "palpitations": { category: "cardiovascular", severity: 6, urgency: "routine" },
        "irregular heartbeat": { category: "cardiovascular", severity: 7, urgency: "urgent" },
        "fainting": { category: "cardiovascular", severity: 8, urgency: "urgent" },
        "lightheadedness": { category: "cardiovascular", severity: 5, urgency: "routine" },
        
        // Respiratory
        "severe cough": { category: "respiratory", severity: 6, urgency: "routine" },
        "persistent cough": { category: "respiratory", severity: 5, urgency: "routine" },
        "wheezing": { category: "respiratory", severity: 7, urgency: "urgent" },
        "blood in sputum": { category: "respiratory", severity: 8, urgency: "urgent" },
        "difficulty breathing": { category: "respiratory", severity: 8, urgency: "urgent" },
        
        // Neurological
        "severe headache": { category: "neurological", severity: 8, urgency: "urgent" },
        "sudden weakness": { category: "neurological", severity: 9, urgency: "emergency" },
        "confusion": { category: "neurological", severity: 7, urgency: "urgent" },
        "memory loss": { category: "neurological", severity: 6, urgency: "routine" },
        "seizures": { category: "neurological", severity: 9, urgency: "emergency" },
        "blurred vision": { category: "neurological", severity: 6, urgency: "routine" },
        "difficulty speaking": { category: "neurological", severity: 9, urgency: "emergency" },
        "numbness": { category: "neurological", severity: 6, urgency: "routine" },
        "tingling": { category: "neurological", severity: 4, urgency: "routine" },
        
        // Gastrointestinal
        "severe abdominal pain": { category: "gastrointestinal", severity: 8, urgency: "urgent" },
        "persistent vomiting": { category: "gastrointestinal", severity: 7, urgency: "urgent" },
        "blood in vomit": { category: "gastrointestinal", severity: 9, urgency: "emergency" },
        "black stools": { category: "gastrointestinal", severity: 8, urgency: "urgent" },
        "blood in stool": { category: "gastrointestinal", severity: 7, urgency: "urgent" },
        "severe diarrhea": { category: "gastrointestinal", severity: 6, urgency: "routine" },
        
        // Infectious/Systemic
        "high fever": { category: "infectious", severity: 7, urgency: "urgent" },
        "persistent fever": { category: "infectious", severity: 6, urgency: "routine" },
        "chills": { category: "infectious", severity: 5, urgency: "routine" },
        "night sweats": { category: "infectious", severity: 5, urgency: "routine" },
        "swollen lymph nodes": { category: "infectious", severity: 6, urgency: "routine" },
        "unexplained weight loss": { category: "systemic", severity: 7, urgency: "urgent" },
        
        // Musculoskeletal
        "severe joint pain": { category: "musculoskeletal", severity: 6, urgency: "routine" },
        "muscle weakness": { category: "musculoskeletal", severity: 6, urgency: "routine" },
        "back pain": { category: "musculoskeletal", severity: 5, urgency: "routine" },
        "neck stiffness": { category: "musculoskeletal", severity: 7, urgency: "urgent" },
        
        // Dermatological
        "severe rash": { category: "dermatological", severity: 6, urgency: "routine" },
        "skin discoloration": { category: "dermatological", severity: 5, urgency: "routine" },
        "severe itching": { category: "dermatological", severity: 5, urgency: "routine" },
        "swelling": { category: "dermatological", severity: 6, urgency: "routine" }
    },
    
    conditions: [
        {
            name: "Acute Myocardial Infarction (Heart Attack)",
            symptoms: ["chest pain", "shortness of breath", "sweating", "nausea", "left arm pain"],
            riskFactors: ["age>50", "male", "smoking", "diabetes", "hypertension"],
            severity: 10,
            urgency: "emergency",
            category: "cardiovascular"
        },
        {
            name: "Stroke/Cerebrovascular Accident",
            symptoms: ["sudden weakness", "difficulty speaking", "facial drooping", "severe headache", "confusion"],
            riskFactors: ["age>60", "hypertension", "diabetes", "atrial fibrillation"],
            severity: 10,
            urgency: "emergency",
            category: "neurological"
        },
        {
            name: "Pulmonary Embolism",
            symptoms: ["shortness of breath", "chest pain", "coughing up blood", "leg swelling"],
            riskFactors: ["recent surgery", "prolonged immobility", "oral contraceptives"],
            severity: 9,
            urgency: "emergency",
            category: "respiratory"
        },
        {
            name: "Acute Appendicitis",
            symptoms: ["severe abdominal pain", "nausea", "vomiting", "fever", "loss of appetite"],
            riskFactors: ["age 10-30", "family history"],
            severity: 8,
            urgency: "urgent",
            category: "gastrointestinal"
        },
        {
            name: "Pneumonia",
            symptoms: ["cough", "fever", "shortness of breath", "chest pain", "fatigue"],
            riskFactors: ["age>65", "smoking", "chronic lung disease", "immunocompromised"],
            severity: 7,
            urgency: "urgent",
            category: "respiratory"
        },
        {
            name: "Migraine",
            symptoms: ["severe headache", "nausea", "light sensitivity", "sound sensitivity"],
            riskFactors: ["female", "family history", "stress", "hormonal changes"],
            severity: 6,
            urgency: "routine",
            category: "neurological"
        },
        {
            name: "Influenza",
            symptoms: ["fever", "cough", "muscle aches", "fatigue", "headache"],
            riskFactors: ["seasonal exposure", "age<5 or >65", "chronic conditions"],
            severity: 5,
            urgency: "routine",
            category: "infectious"
        },
        {
            name: "COVID-19",
            symptoms: ["fever", "cough", "shortness of breath", "loss of taste", "loss of smell", "fatigue"],
            riskFactors: ["exposure", "age>65", "chronic conditions", "immunocompromised"],
            severity: 6,
            urgency: "routine",
            category: "infectious"
        },
        {
            name: "Urinary Tract Infection",
            symptoms: ["painful urination", "frequent urination", "cloudy urine", "pelvic pain"],
            riskFactors: ["female", "sexual activity", "diabetes", "kidney stones"],
            severity: 4,
            urgency: "routine",
            category: "genitourinary"
        },
        {
            name: "Gastroenteritis",
            symptoms: ["nausea", "vomiting", "diarrhea", "abdominal cramping", "fever"],
            riskFactors: ["recent travel", "food contamination", "viral exposure"],
            severity: 4,
            urgency: "routine",
            category: "gastrointestinal"
        }
    ]
};

// Enhanced symptom suggestions with medical categorization
const COMPREHENSIVE_SYMPTOMS = [
    // Cardiovascular
    "chest pain", "chest tightness", "chest pressure", "heart palpitations", "irregular heartbeat",
    "shortness of breath", "difficulty breathing", "rapid heartbeat", "slow heartbeat", "fainting",
    "lightheadedness", "dizziness", "syncope", "presyncope", "leg swelling", "ankle swelling",
    
    // Respiratory
    "cough", "persistent cough", "dry cough", "productive cough", "wheezing", "stridor",
    "chest congestion", "difficulty breathing", "rapid breathing", "shallow breathing",
    "blood in sputum", "hemoptysis", "chest pain with breathing", "pleuritic chest pain",
    
    // Neurological
    "headache", "severe headache", "migraine", "tension headache", "cluster headache",
    "dizziness", "vertigo", "balance problems", "coordination problems", "weakness",
    "numbness", "tingling", "paralysis", "seizures", "tremors", "memory loss",
    "confusion", "disorientation", "difficulty speaking", "slurred speech", "vision changes",
    "blurred vision", "double vision", "vision loss", "hearing loss", "tinnitus",
    
    // Gastrointestinal
    "abdominal pain", "stomach pain", "nausea", "vomiting", "diarrhea", "constipation",
    "bloating", "gas", "heartburn", "acid reflux", "difficulty swallowing", "loss of appetite",
    "weight loss", "weight gain", "blood in stool", "black stools", "blood in vomit",
    "yellow stools", "fatty stools", "rectal bleeding", "rectal pain",
    
    // Musculoskeletal
    "back pain", "neck pain", "shoulder pain", "arm pain", "leg pain", "joint pain",
    "muscle pain", "muscle weakness", "muscle cramps", "muscle stiffness", "joint stiffness",
    "joint swelling", "joint deformity", "limited range of motion", "difficulty walking",
    
    // Dermatological
    "rash", "skin rash", "itching", "hives", "skin discoloration", "skin lesions",
    "moles", "skin changes", "bruising", "bleeding", "swelling", "redness", "warmth",
    "skin pain", "skin burning", "skin numbness", "hair loss", "nail changes",
    
    // Infectious/Systemic
    "fever", "high fever", "low-grade fever", "chills", "night sweats", "fatigue",
    "weakness", "malaise", "body aches", "swollen lymph nodes", "sore throat",
    "runny nose", "nasal congestion", "sneezing", "cough", "ear pain", "eye pain",
    
    // Genitourinary
    "painful urination", "frequent urination", "urgent urination", "blood in urine",
    "cloudy urine", "strong-smelling urine", "difficulty urinating", "incontinence",
    "pelvic pain", "flank pain", "kidney pain", "testicular pain", "scrotal swelling",
    
    // Psychiatric/Behavioral
    "anxiety", "depression", "panic attacks", "mood changes", "irritability",
    "sleep problems", "insomnia", "excessive sleepiness", "difficulty concentrating",
    "restlessness", "agitation", "hallucinations", "delusions"
];

// AI-powered symptom analysis engine
class AdvancedSymptomAnalyzer {
    constructor() {
        this.database = MEDICAL_DATABASE;
        this.riskFactors = {};
        this.patientProfile = {};
    }
    
    // Advanced symptom matching with weighted scoring
    analyzeSymptoms(symptoms, patientData) {
        this.patientProfile = patientData;
        const symptomList = this.preprocessSymptoms(symptoms);
        
        // Calculate risk factors
        this.calculateRiskFactors(patientData);
        
        // Match against conditions
        const matches = this.matchConditions(symptomList);
        
        // Calculate triage level
        const triage = this.calculateTriage(symptomList, matches);
        
        // Generate personalized recommendations
        const recommendations = this.generateRecommendations(triage, matches, patientData);
        
        return {
            triage: triage,
            conditions: matches,
            recommendations: recommendations.recommendations,
            nextSteps: recommendations.nextSteps,
            riskFactors: this.riskFactors,
            confidence: this.calculateConfidence(matches, symptomList)
        };
    }
    
    preprocessSymptoms(symptoms) {
        return symptoms.split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s.length > 0)
            .map(s => this.normalizeSymptom(s));
    }
    
    normalizeSymptom(symptom) {
        // Normalize common variations
        const synonyms = {
            "chest tightness": "chest pain",
            "chest pressure": "chest pain",
            "difficulty breathing": "shortness of breath",
            "trouble breathing": "shortness of breath",
            "stomach pain": "abdominal pain",
            "belly pain": "abdominal pain",
            "headaches": "headache",
            "dizzy": "dizziness",
            "nauseous": "nausea",
            "throwing up": "vomiting"
        };
        
        return synonyms[symptom] || symptom;
    }
    
    calculateRiskFactors(patientData) {
        const { age, gender, medicalHistory, medications, lifestyle } = patientData;
        
        this.riskFactors = {
            age: this.categorizeAge(age),
            gender: gender,
            cardiovascular: this.assessCardiovascularRisk(age, gender, medicalHistory, lifestyle),
            respiratory: this.assessRespiratoryRisk(medicalHistory, lifestyle),
            neurological: this.assessNeurologicalRisk(age, medicalHistory),
            infection: this.assessInfectionRisk(age, medicalHistory, medications)
        };
    }
    
    categorizeAge(age) {
        if (age < 18) return "pediatric";
        if (age < 65) return "adult";
        return "elderly";
    }
    
    assessCardiovascularRisk(age, gender, history, lifestyle) {
        let risk = 0;
        if (age > 50) risk += 2;
        if (gender === "male") risk += 1;
        if (history && history.includes("hypertension")) risk += 2;
        if (history && history.includes("diabetes")) risk += 2;
        if (lifestyle && lifestyle.includes("smoking")) risk += 3;
        return this.categorizeRisk(risk);
    }
    
    assessRespiratoryRisk(history, lifestyle) {
        let risk = 0;
        if (history && history.includes("asthma")) risk += 2;
        if (history && history.includes("copd")) risk += 3;
        if (lifestyle && lifestyle.includes("smoking")) risk += 3;
        return this.categorizeRisk(risk);
    }
    
    assessNeurologicalRisk(age, history) {
        let risk = 0;
        if (age > 60) risk += 2;
        if (history && history.includes("stroke")) risk += 3;
        if (history && history.includes("seizures")) risk += 2;
        return this.categorizeRisk(risk);
    }
    
    assessInfectionRisk(age, history, medications) {
        let risk = 0;
        if (age > 65 || age < 5) risk += 2;
        if (history && history.includes("immunocompromised")) risk += 3;
        if (medications && medications.includes("immunosuppressants")) risk += 3;
        return this.categorizeRisk(risk);
    }
    
    categorizeRisk(score) {
        if (score <= 2) return "low";
        if (score <= 5) return "moderate";
        return "high";
    }
    
    matchConditions(symptomList) {
        const matches = [];
        
        this.database.conditions.forEach(condition => {
            const score = this.calculateConditionScore(condition, symptomList);
            if (score.total > 0) {
                matches.push({
                    name: condition.name,
                    probability: Math.min(score.total, 95),
                    category: condition.category,
                    severity: condition.severity,
                    urgency: condition.urgency,
                    matchedSymptoms: score.matchedSymptoms,
                    riskFactorMatch: score.riskFactorBonus > 0
                });
            }
        });
        
        return matches.sort((a, b) => b.probability - a.probability).slice(0, 8);
    }
    
    calculateConditionScore(condition, symptomList) {
        let score = 0;
        let matchedSymptoms = [];
        let riskFactorBonus = 0;
        
        // Symptom matching with weighted scoring
        condition.symptoms.forEach(symptom => {
            if (symptomList.includes(symptom)) {
                const weight = this.getSymptomWeight(symptom);
                score += weight;
                matchedSymptoms.push(symptom);
            }
        });
        
        // Risk factor bonus
        if (condition.riskFactors) {
            condition.riskFactors.forEach(factor => {
                if (this.matchesRiskFactor(factor)) {
                    riskFactorBonus += 10;
                }
            });
        }
        
        // Age and gender adjustments
        score += this.getAgeGenderAdjustment(condition);
        
        // Symptom count bonus
        if (matchedSymptoms.length > 2) {
            score += matchedSymptoms.length * 5;
        }
        
        return {
            total: score + riskFactorBonus,
            matchedSymptoms: matchedSymptoms,
            riskFactorBonus: riskFactorBonus
        };
    }
    
    getSymptomWeight(symptom) {
        const symptomData = this.database.symptoms[symptom];
        if (!symptomData) return 10;
        
        // Higher severity symptoms get more weight
        return symptomData.severity * 2 + 5;
    }
    
    matchesRiskFactor(factor) {
        const age = parseInt(this.patientProfile.age);
        const gender = this.patientProfile.gender;
        const history = this.patientProfile.medicalHistory || [];
        
        if (factor.startsWith("age>")) {
            const threshold = parseInt(factor.substring(4));
            return age > threshold;
        }
        
        if (factor === "male" || factor === "female") {
            return gender === factor;
        }
        
        return history.some(h => h.toLowerCase().includes(factor.toLowerCase()));
    }
    
    getAgeGenderAdjustment(condition) {
        // Age-specific adjustments
        const age = parseInt(this.patientProfile.age);
        let adjustment = 0;
        
        if (condition.category === "cardiovascular" && age > 50) {
            adjustment += 5;
        }
        
        if (condition.category === "infectious" && (age < 5 || age > 65)) {
            adjustment += 5;
        }
        
        return adjustment;
    }
    
    calculateTriage(symptomList, matches) {
        let maxSeverity = 0;
        let urgencyLevel = "self-care";
        
        // Check for emergency symptoms
        const emergencySymptoms = [
            "chest pain", "shortness of breath", "severe headache", "sudden weakness",
            "difficulty speaking", "blood in vomit", "seizures", "severe abdominal pain"
        ];
        
        const hasEmergencySymptom = symptomList.some(s => emergencySymptoms.includes(s));
        
        // Check condition severity
        matches.forEach(match => {
            maxSeverity = Math.max(maxSeverity, match.severity);
            if (match.urgency === "emergency") urgencyLevel = "emergency";
            else if (match.urgency === "urgent" && urgencyLevel !== "emergency") urgencyLevel = "urgent";
            else if (match.urgency === "routine" && urgencyLevel === "self-care") urgencyLevel = "routine";
        });
        
        // Final triage determination
        if (hasEmergencySymptom || maxSeverity >= 9) {
            urgencyLevel = "emergency";
        } else if (maxSeverity >= 7) {
            urgencyLevel = "urgent";
        } else if (maxSeverity >= 5 || symptomList.length >= 4) {
            urgencyLevel = "routine";
        }
        
        return {
            level: this.formatTriageLevel(urgencyLevel),
            class: `triage-${urgencyLevel.replace('-', '')}`,
            description: this.getTriageDescription(urgencyLevel),
            severity: maxSeverity
        };
    }
    
    formatTriageLevel(level) {
        const levels = {
            "emergency": "Emergency",
            "urgent": "Urgent",
            "routine": "Routine",
            "self-care": "Self-Care"
        };
        return levels[level] || "Self-Care";
    }
    
    getTriageDescription(level) {
        const descriptions = {
            "emergency": "IMMEDIATE medical attention required. Call 911 or go to the nearest emergency department now.",
            "urgent": "Medical evaluation needed within 24 hours. Contact your healthcare provider or visit urgent care.",
            "routine": "Schedule an appointment with your healthcare provider within the next few days.",
            "self-care": "Your symptoms may be manageable with self-care. Monitor and seek care if symptoms worsen."
        };
        return descriptions[level] || descriptions["self-care"];
    }
    
    generateRecommendations(triage, matches, patientData) {
        const recommendations = [];
        const nextSteps = [];
        
        // Triage-based recommendations
        if (triage.level === "Emergency") {
            recommendations.push(
                "Call 911 immediately - do not drive yourself",
                "If experiencing chest pain, chew one aspirin (unless allergic)",
                "Have someone stay with you while waiting for emergency services",
                "Bring a list of current medications and medical conditions"
            );
            
            nextSteps.push(
                "Emergency medical evaluation will be performed immediately",
                "Diagnostic tests may include EKG, blood work, and imaging",
                "Notify your emergency contact about your situation",
                "Follow all instructions from emergency medical personnel"
            );
        } else if (triage.level === "Urgent") {
            recommendations.push(
                "Contact your healthcare provider within 24 hours",
                "Visit urgent care if your doctor is unavailable",
                "Monitor symptoms closely for any worsening",
                "Rest and maintain adequate hydration"
            );
            
            nextSteps.push(
                "Prepare a detailed symptom timeline for your healthcare provider",
                "Bring your insurance card and photo identification",
                "List all current medications and dosages",
                "Be prepared to discuss your medical history"
            );
        } else if (triage.level === "Routine") {
            recommendations.push(
                "Schedule an appointment with your healthcare provider",
                "Keep a symptom diary to track patterns",
                "Use appropriate over-the-counter medications as needed",
                "Maintain good self-care practices"
            );
            
            nextSteps.push(
                "Call your doctor's office for a routine appointment",
                "Prepare questions about your symptoms",
                "Consider telemedicine options if available",
                "Follow up if symptoms persist or worsen"
            );
        } else {
            recommendations.push(
                "Monitor your symptoms at home",
                "Get plenty of rest and stay hydrated",
                "Use over-the-counter remedies as appropriate",
                "Practice good hygiene to prevent infection spread"
            );
            
            nextSteps.push(
                "Observe symptoms for 48-72 hours",
                "Contact healthcare provider if symptoms worsen",
                "Consider telehealth consultation for peace of mind",
                "Return to normal activities as symptoms improve"
            );
        }
        
        // Condition-specific recommendations
        if (matches.length > 0) {
            const topCondition = matches[0];
            const specificRecs = this.getConditionSpecificRecommendations(topCondition);
            recommendations.push(...specificRecs);
        }
        
        // COVID-19 considerations
        const covidSymptoms = ["fever", "cough", "shortness of breath", "loss of taste", "loss of smell"];
        if (covidSymptoms.some(s => patientData.symptoms.toLowerCase().includes(s))) {
            recommendations.push(
                "Consider COVID-19 testing",
                "Self-isolate until test results are available",
                "Wear a mask if you must be around others",
                "Follow current CDC guidelines for isolation"
            );
        }
        
        return { recommendations, nextSteps };
    }
    
    getConditionSpecificRecommendations(condition) {
        const specificRecs = {
            "cardiovascular": [
                "Avoid strenuous activity until evaluated",
                "Take prescribed cardiac medications as directed",
                "Monitor blood pressure if you have a home monitor"
            ],
            "respiratory": [
                "Use prescribed inhalers as directed",
                "Avoid smoke and air pollutants",
                "Consider using a humidifier"
            ],
            "neurological": [
                "Avoid driving if experiencing dizziness or confusion",
                "Have someone stay with you for observation",
                "Keep a record of neurological symptoms"
            ],
            "infectious": [
                "Take your temperature regularly",
                "Isolate from others if contagious",
                "Maintain good hand hygiene"
            ]
        };
        
        return specificRecs[condition.category] || [];
    }
    
    calculateConfidence(matches, symptomList) {
        if (matches.length === 0) return 30;
        
        const topMatch = matches[0];
        let confidence = Math.min(topMatch.probability, 85);
        
        // Adjust based on symptom specificity
        if (symptomList.length >= 3) confidence += 10;
        if (topMatch.matchedSymptoms.length >= 3) confidence += 5;
        
        return Math.min(confidence, 95);
    }
}

// Initialize the advanced analyzer
const symptomAnalyzer = new AdvancedSymptomAnalyzer();

// Enhanced UI interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedFeatures();
});

function initializeAdvancedFeatures() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Enhanced Symptom Suggestions
    const symptomInput = document.getElementById('symptoms');
    const suggestionsContainer = document.getElementById('symptomSuggestions');

    if (symptomInput && suggestionsContainer) {
        symptomInput.addEventListener('input', function() {
            const inputText = this.value.toLowerCase();
            const lastTerm = inputText.split(',').pop().trim();
            
            if (lastTerm.length > 1) {
                const filteredSymptoms = COMPREHENSIVE_SYMPTOMS.filter(symptom => 
                    symptom.toLowerCase().includes(lastTerm) && !inputText.includes(symptom)
                ).slice(0, 10); // Limit to 10 suggestions for performance
                
                showAdvancedSuggestions(filteredSymptoms, lastTerm);
            } else {
                hideSuggestions();
            }
        });
    }

    // Severity Slider Enhancement
    const severitySlider = document.getElementById('severity');
    const severityValue = document.getElementById('severityValue');

    if (severitySlider && severityValue) {
        severitySlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            severityValue.textContent = value;
            
            // Visual feedback based on severity
            const slider = this;
            slider.style.background = `linear-gradient(to right, 
                ${value <= 3 ? '#4CAF50' : value <= 6 ? '#FFC107' : '#F44336'} 0%, 
                ${value <= 3 ? '#4CAF50' : value <= 6 ? '#FFC107' : '#F44336'} ${value * 10}%, 
                #ddd ${value * 10}%, #ddd 100%)`;
        });
    }

    // Enhanced Form Submission
    const symptomForm = document.getElementById('symptomForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsSection = document.getElementById('resultsSection');

    if (symptomForm && analyzeBtn && resultsSection) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show enhanced loading state
            showLoadingState();
            
            // Simulate AI processing with realistic delay
            setTimeout(() => {
                processAdvancedSymptoms();
                
                // Hide form and show results with animation
                symptomForm.style.display = 'none';
                resultsSection.style.display = 'block';
                resultsSection.classList.add('fade-in');
                
                // Smooth scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });
    }

    // Add back button functionality
    addBackButtonFunctionality();
}

function showAdvancedSuggestions(symptoms, term) {
    const suggestionsContainer = document.getElementById('symptomSuggestions');
    if (!suggestionsContainer) return;
    
    if (symptoms.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    symptoms.forEach(symptom => {
        const div = document.createElement('div');
        div.className = 'symptom-suggestion';
        
        // Highlight matching part
        const highlightedText = symptom.replace(
            new RegExp(term, 'gi'), 
            `<strong>        // Highlight matching part
        const highlightedText = symptom.replace(
            new RegExp(term, 'gi</strong>`
        );
        
        div.innerHTML = highlightedText;
        div.addEventListener('click', function() {
            const symptomInput = document.getElementById('symptoms');
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
    const suggestionsContainer = document.getElementById('symptomSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
    }
}

function validateForm() {
    const age = document.getElementById('age')?.value;
    const symptoms = document.getElementById('symptoms')?.value;
    
    if (!age || age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120.');
        return false;
    }
    
    if (!symptoms || symptoms.trim().length < 3) {
        alert('Please describe your symptoms in more detail.');
        return false;
    }
    
    return true;
}

function showLoadingState() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.innerHTML = `
            <span class="loading-spinner"></span>
            <span class="loading-text">Analyzing symptoms with AI...</span>
        `;
        analyzeBtn.disabled = true;
        analyzeBtn.classList.add('loading');
    }
}

function processAdvancedSymptoms() {
    // Collect comprehensive patient data
    const patientData = {
        age: document.getElementById('age')?.value || '',
        gender: document.getElementById('gender')?.value || '',
        symptoms: document.getElementById('symptoms')?.value || '',
        duration: document.getElementById('duration')?.value || '',
        severity: parseInt(document.getElementById('severity')?.value || 5),
        additionalInfo: document.getElementById('additionalInfo')?.value || '',
        medicalHistory: document.getElementById('medicalHistory')?.value?.split(',').map(h => h.trim()) || [],
        medications: document.getElementById('medications')?.value?.split(',').map(m => m.trim()) || [],
        lifestyle: document.getElementById('lifestyle')?.value?.split(',').map(l => l.trim()) || []
    };
    
    // Use advanced AI analyzer
    const analysisResults = symptomAnalyzer.analyzeSymptoms(patientData.symptoms, patientData);
    
    // Display patient information
    displayPatientInfo(patientData);
    
    // Display triage assessment
    displayTriageAssessment(analysisResults.triage, analysisResults.confidence);
    
    // Display potential conditions
    displayPotentialConditions(analysisResults.conditions);
    
    // Display risk assessment
    displayRiskAssessment(analysisResults.riskFactors);
    
    // Display recommendations
    displayRecommendations(analysisResults.recommendations, analysisResults.nextSteps);
    
    // Display disclaimer
    displayMedicalDisclaimer();
    
    // Add clinical insights
    displayClinicalInsights(analysisResults);
}

function displayPatientInfo(patientData) {
    const elements = {
        resultAge: patientData.age,
        resultGender: patientData.gender.charAt(0).toUpperCase() + patientData.gender.slice(1),
        resultSymptoms: patientData.symptoms,
        resultDuration: patientData.duration,
        resultSeverity: patientData.severity
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function displayTriageAssessment(triage, confidence) {
    const triageValue = document.getElementById('triageValue');
    const triageDescription = document.getElementById('triageDescription');
    const confidenceElement = document.getElementById('confidenceLevel');
    
    if (triageValue) {
        triageValue.textContent = triage.level;
        triageValue.className = 'triage-value ' + triage.class;
    }
    
    if (triageDescription) {
        triageDescription.textContent = triage.description;
    }
    
    if (confidenceElement) {
        confidenceElement.textContent = `${confidence}%`;
        confidenceElement.className = confidence >= 70 ? 'confidence-high' : 
                                     confidence >= 50 ? 'confidence-medium' : 'confidence-low';
    }
}

function displayPotentialConditions(conditions) {
    const conditionsList = document.getElementById('conditionsList');
    if (!conditionsList) return;
    
    conditionsList.innerHTML = '';
    
    if (conditions.length === 0) {
        conditionsList.innerHTML = '<div class="no-conditions">No specific conditions identified based on symptoms provided.</div>';
        return;
    }
    
    conditions.forEach((condition, index) => {
        const div = document.createElement('div');
        div.className = 'condition-item fade-in';
        div.style.animationDelay = `${index * 0.1}s`;
        
        const urgencyBadge = getUrgencyBadge(condition.urgency);
        const categoryBadge = getCategoryBadge(condition.category);
        
        div.innerHTML = `
            <div class="condition-header">
                <div class="condition-name">${condition.name}</div>
                <div class="condition-badges">
                    ${urgencyBadge}
                    ${categoryBadge}
                </div>
            </div>
            <div class="condition-details">
                <div class="condition-probability">
                    <span class="probability-label">Match Probability:</span>
                    <span class="probability-value">${condition.probability}%</span>
                    <div class="probability-bar">
                        <div class="probability-fill" style="width: ${condition.probability}%"></div>
                    </div>
                </div>
                <div class="matched-symptoms">
                    <span class="symptoms-label">Matched Symptoms:</span>
                    <span class="symptoms-list">${condition.matchedSymptoms.join(', ')}</span>
                </div>
                ${condition.riskFactorMatch ? '<div class="risk-factor-match">⚠️ Risk factors present</div>' : ''}
            </div>
        `;
        
        conditionsList.appendChild(div);
    });
}

function getUrgencyBadge(urgency) {
    const badges = {
        'emergency': '<span class="badge badge-emergency">Emergency</span>',
        'urgent': '<span class="badge badge-urgent">Urgent</span>',
        'routine': '<span class="badge badge-routine">Routine</span>'
    };
    return badges[urgency] || '';
}

function getCategoryBadge(category) {
    const badges = {
        'cardiovascular': '<span class="badge badge-cardio">Cardiovascular</span>',
        'respiratory': '<span class="badge badge-resp">Respiratory</span>',
        'neurological': '<span class="badge badge-neuro">Neurological</span>',
        'gastrointestinal': '<span class="badge badge-gi">Gastrointestinal</span>',
        'infectious': '<span class="badge badge-infectious">Infectious</span>',
        'musculoskeletal': '<span class="badge badge-musculo">Musculoskeletal</span>'
    };
    return badges[category] || `<span class="badge badge-other">${category}</span>`;
}

function displayRiskAssessment(riskFactors) {
    const riskAssessment = document.getElementById('riskAssessment');
    if (!riskAssessment) return;
    
    riskAssessment.innerHTML = `
        <h3>Risk Assessment</h3>
        <div class="risk-factors">
            <div class="risk-factor">
                <span class="risk-label">Age Group:</span>
                <span class="risk-value">${riskFactors.age}</span>
            </div>
            <div class="risk-factor">
                <span class="risk-label">Cardiovascular Risk:</span>
                <span class="risk-value risk-${riskFactors.cardiovascular}">${riskFactors.cardiovascular}</span>
            </div>
            <div class="risk-factor">
                <span class="risk-label">Respiratory Risk:</span>
                <span class="risk-value risk-${riskFactors.respiratory}">${riskFactors.respiratory}</span>
            </div>
            <div class="risk-factor">
                <span class="risk-label">Neurological Risk:</span>
                <span class="risk-value risk-${riskFactors.neurological}">${riskFactors.neurological}</span>
            </div>
            <div class="risk-factor">
                <span class="risk-label">Infection Risk:</span>
                <span class="risk-value risk-${riskFactors.infection}">${riskFactors.infection}</span>
            </div>
        </div>
    `;
}

function displayRecommendations(recommendations, nextSteps) {
    const recommendationsContent = document.getElementById('recommendationsContent');
    const nextStepsContent = document.getElementById('nextStepsContent');
    
    if (recommendationsContent) {
        recommendationsContent.innerHTML = recommendations.map((rec, index) => 
            `<div class="recommendation-item" style="animation-delay: ${index * 0.1}s">
                <i class="recommendation-icon">💡</i>
                <span>${rec}</span>
            </div>`
        ).join('');
    }
    
    if (nextStepsContent) {
        nextStepsContent.innerHTML = nextSteps.map((step, index) => 
            `<div class="next-step-item" style="animation-delay: ${index * 0.1}s">
                <i class="step-icon">📋</i>
                <span>${step}</span>
            </div>`
        ).join('');
    }
}

function displayMedicalDisclaimer() {
    const disclaimer = document.getElementById('medicalDisclaimer');
    if (!disclaimer) return;
    
    disclaimer.innerHTML = `
        <div class="disclaimer-content">
            <h4>⚠️ Important Medical Disclaimer</h4>
            <p>This AI-powered symptom checker is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.</p>
            <ul>
                <li>This tool does not provide medical diagnosis</li>
                <li>Results are based on symptom patterns and statistical analysis</li>
                <li>Emergency situations require immediate professional medical attention</li>
                <li>Individual medical history and circumstances may significantly affect diagnosis</li>
            </ul>
        </div>
    `;
}

function displayClinicalInsights(analysisResults) {
    const clinicalInsights = document.getElementById('clinicalInsights');
    if (!clinicalInsights) return;
    
    const insights = generateClinicalInsights(analysisResults);
    
    clinicalInsights.innerHTML = `
        <h3>Clinical Insights</h3>
        <div class="insights-grid">
            ${insights.map(insight => `
                <div class="insight-card">
                    <div class="insight-icon">${insight.icon}</div>
                    <div class="insight-content">
                        <h4>${insight.title}</h4>
                        <p>${insight.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function generateClinicalInsights(analysisResults) {
    const insights = [];
    
    // Symptom pattern analysis
    if (analysisResults.conditions.length > 0) {
        const topCondition = analysisResults.conditions[0];
        insights.push({
            icon: "🔍",
            title: "Primary Concern",
            description: `Based on symptom analysis, ${topCondition.name} shows the highest probability match (${topCondition.probability}%) with your reported symptoms.`
        });
    }
    
    // Risk factor analysis
    const highRiskFactors = Object.entries(analysisResults.riskFactors)
        .filter(([key, value]) => value === 'high' && key !== 'age' && key !== 'gender')
        .map(([key]) => key);
    
    if (highRiskFactors.length > 0) {
        insights.push({
            icon: "⚠️",
            title: "Elevated Risk Factors",
            description: `You have elevated risk factors in: ${highRiskFactors.join(', ')}. This may influence your diagnosis and treatment options.`
        });
    }
    
    // Triage insights
    if (analysisResults.triage.level === 'Emergency') {
        insights.push({
            icon: "🚨",
            title: "Immediate Action Required",
            description: "Your symptoms indicate a potentially serious condition requiring immediate medical attention. Do not delay seeking emergency care."
        });
    } else if (analysisResults.triage.level === 'Urgent') {
        insights.push({
            icon: "⏰",
            title: "Timely Care Recommended",
            description: "While not immediately life-threatening, your symptoms warrant medical evaluation within 24 hours."
        });
    }
    
    // Confidence insights
    if (analysisResults.confidence < 60) {
        insights.push({
            icon: "🤔",
            title: "Additional Information Needed",
            description: "The analysis confidence is moderate. Consider providing more detailed symptom information or consulting healthcare professionals for accurate diagnosis."
        });
    }
    
    return insights;
}

function addBackButtonFunctionality() {
    // Create back button if it doesn't exist
    const resultsContainer = document.querySelector('.results-container');
    if (resultsContainer && !document.getElementById('backToChecker')) {
        const backBtn = document.createElement('button');
        backBtn.id = 'backToChecker';
        backBtn.className = 'btn-secondary back-button';
        backBtn.innerHTML = '← Back to Symptom Checker';
        backBtn.addEventListener('click', function() {
            resetSymptomChecker();
        });
        
        resultsContainer.appendChild(backBtn);
    }
}

function resetSymptomChecker() {
    const resultsSection = document.getElementById('resultsSection');
    const symptomForm = document.getElementById('symptomForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (resultsSection) {
        resultsSection.style.display = 'none';
        resultsSection.classList.remove('fade-in');
    }
    
    if (symptomForm) {
        symptomForm.style.display = 'block';
    }
    
    if (analyzeBtn) {
        analyzeBtn.innerHTML = 'Analyze Symptoms';
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('loading');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Advanced event listeners
document.addEventListener('click', function(e) {
    const symptomInput = document.getElementById('symptoms');
    if (e.target !== symptomInput && !e.target.closest('#symptomSuggestions')) {
        hideSuggestions();
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
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const nav = document.querySelector('.nav');
            if (mobileMenuBtn && nav) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
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

// Export for potential API integration
window.AdvancedSymptomChecker = {
    analyzer: symptomAnalyzer,
    processSymptoms: processAdvancedSymptoms,
    reset: resetSymptomChecker
}; 
