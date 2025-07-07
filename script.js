/**
 * Medical Symptom Checker Pro
 * 
 * A comprehensive, AI-powered symptom analysis tool for clinical use
 * Features: Advanced symptom analysis, triage recommendations, clinical decision support
 * 
 * @version 2.0
 * @license MIT
 */

// ==================== CONSTANTS AND CONFIGURATION ====================
const APP_CONFIG = {
    DEBUG_MODE: false,
    API_ENDPOINT: 'https://api.medical-symptom-checker/v1',
    LOCAL_STORAGE_KEY: 'msc_user_data',
    MAX_SYMPTOMS: 10,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    VERSION: '2.0.1'
};

// Enhanced symptom database with ICD-10 codes and categories
const SYMPTOM_DATABASE = {
    symptoms: [
        { id: 'SYM001', term: "headache", categories: ["neurological", "general"], icd10: "R51" },
        { id: 'SYM002', term: "fever", categories: ["general", "infectious"], icd10: "R50.9" },
        // ... (other symptoms from your list with enhanced metadata)
    ],
    conditions: [
        {
            id: 'CON001',
            name: "Common Cold",
            icd10: "J00",
            symptoms: ["SYM001", "SYM002", "SYM015", "SYM016", "SYM017"],
            riskFactors: ["age<12", "immunocompromised"],
            redFlags: ["fever>104", "duration>14days"],
            probability: 30
        },
        // ... other conditions
    ]
};

// ==================== APPLICATION STATE MANAGEMENT ====================
class AppState {
    constructor() {
        this.state = {
            userSession: null,
            currentSymptoms: [],
            medicalHistory: null,
            lastAnalysis: null
        };
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.setupSessionTimeout();
    }

    loadFromLocalStorage() {
        const savedData = localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                this.state = JSON.parse(savedData);
                if (APP_CONFIG.DEBUG_MODE) console.log('State loaded from localStorage');
            } catch (e) {
                console.error('Failed to parse saved state', e);
            }
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem(
                APP_CONFIG.LOCAL_STORAGE_KEY,
                JSON.stringify(this.state)
            );
        } catch (e) {
            console.error('Failed to save state', e);
        }
    }

    setupSessionTimeout() {
        clearTimeout(this.sessionTimeout);
        this.sessionTimeout = setTimeout(() => {
            this.clearSession();
            if (APP_CONFIG.DEBUG_MODE) console.log('Session timed out');
        }, APP_CONFIG.SESSION_TIMEOUT);
    }

    clearSession() {
        this.state.userSession = null;
        this.saveToLocalStorage();
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.saveToLocalStorage();
        this.setupSessionTimeout();
    }
}

const appState = new AppState();

// ==================== CORE FUNCTIONALITY ====================

/**
 * Initialize the application
 */
function initApplication() {
    setupPreloader();
    setupMobileMenu();
    setupHeaderEffects();
    setupSymptomInput();
    setupSeveritySlider();
    setupFormSubmission();
    setupNavigation();
    setupAnalytics();
    setupServiceWorker();
    
    if (APP_CONFIG.DEBUG_MODE) {
        console.log(`Medical Symptom Checker v${APP_CONFIG.VERSION} initialized`);
    }
}

// ==================== MODULE: PRELOADER ====================
function setupPreloader() {
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
            trackEvent('Preloader', 'Complete');
        }, 500);
    });
}

// ==================== MODULE: MOBILE MENU ====================
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-link');

    if (!mobileMenuBtn || !nav) return;

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        trackEvent('Navigation', 'MobileMenuToggle');
    });

    // Close menu when clicking on nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// ==================== MODULE: HEADER EFFECTS ====================
function setupHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled', 'scrolled-down');
        } else if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
            if (currentScroll > lastScroll) {
                header.classList.add('scrolled-down');
            } else {
                header.classList.remove('scrolled-down');
            }
        } else {
            header.classList.remove('scrolled', 'scrolled-down');
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== MODULE: SYMPTOM INPUT ====================
function setupSymptomInput() {
    const symptomInput = document.getElementById('symptoms');
    const suggestionsContainer = document.getElementById('symptomSuggestions');

    if (!symptomInput || !suggestionsContainer) return;

    // Enhanced input handling with debouncing
    symptomInput.addEventListener('input', debounce(function() {
        const inputText = this.value.toLowerCase();
        const lastTerm = inputText.split(',').pop().trim();
        
        if (lastTerm.length > 1) {
            const filteredSymptoms = SYMPTOM_DATABASE.symptoms
                .filter(symptom => 
                    symptom.term.startsWith(lastTerm) && 
                    !inputText.includes(symptom.term)
                .map(symptom => symptom.term);
            
            showSuggestions(filteredSymptoms, lastTerm);
        } else {
            hideSuggestions();
        }
    }, 300));

    // Keyboard navigation for suggestions
    symptomInput.addEventListener('keydown', function(e) {
        const activeSuggestion = suggestionsContainer.querySelector('.symptom-suggestion.highlighted');
        const allSuggestions = suggestionsContainer.querySelectorAll('.symptom-suggestion');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!activeSuggestion) {
                allSuggestions[0]?.classList.add('highlighted');
            } else {
                const next = activeSuggestion.nextElementSibling;
                if (next) {
                    activeSuggestion.classList.remove('highlighted');
                    next.classList.add('highlighted');
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeSuggestion) {
                const prev = activeSuggestion.previousElementSibling;
                if (prev) {
                    activeSuggestion.classList.remove('highlighted');
                    prev.classList.add('highlighted');
                }
            }
        } else if (e.key === 'Enter' && activeSuggestion) {
            e.preventDefault();
            selectSuggestion(activeSuggestion);
        }
    });
}

function showSuggestions(symptoms, term) {
    const suggestionsContainer = document.getElementById('symptomSuggestions');
    if (!suggestionsContainer) return;

    if (symptoms.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    symptoms.slice(0, 5).forEach(symptom => {
        const div = document.createElement('div');
        div.className = 'symptom-suggestion';
        div.textContent = symptom;
        div.addEventListener('click', function() {
            selectSuggestion(this);
            trackEvent('SymptomInput', 'SuggestionSelected', symptom);
        });
        suggestionsContainer.appendChild(div);
    });
    
    suggestionsContainer.classList.add('show');
}

function selectSuggestion(element) {
    const symptomInput = document.getElementById('symptoms');
    if (!symptomInput) return;

    const currentValue = symptomInput.value;
    const terms = currentValue.split(',');
    terms[terms.length - 1] = ' ' + element.textContent;
    symptomInput.value = terms.join(',') + ', ';
    hideSuggestions();
    symptomInput.focus();
}

function hideSuggestions() {
    const suggestionsContainer = document.getElementById('symptomSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
    }
}

// ==================== MODULE: SEVERITY SLIDER ====================
function setupSeveritySlider() {
    const severitySlider = document.getElementById('severity');
    const severityValue = document.getElementById('severityValue');

    if (!severitySlider || !severityValue) return;

    severitySlider.addEventListener('input', function() {
        severityValue.textContent = this.value;
        updateSeverityIndicator(this.value);
    });
}

function updateSeverityIndicator(value) {
    const indicator = document.querySelector('.severity-indicator');
    if (!indicator) return;

    // Update color based on severity
    let color;
    if (value < 4) color = '#4CAF50'; // Green
    else if (value < 7) color = '#FFC107'; // Yellow
    else color = '#F44336'; // Red

    indicator.style.backgroundColor = color;
}

// ==================== MODULE: FORM SUBMISSION ====================
function setupFormSubmission() {
    const symptomForm = document.getElementById('symptomForm');
    if (!symptomForm) return;

    symptomForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (!analyzeBtn) return;

        // Validate form
        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        analyzeBtn.innerHTML = '<span class="loader-btn"></span> Analyzing...';
        analyzeBtn.disabled = true;
        
        try {
            // In a real app, this would be an API call
            const formData = getFormData();
            const analysisResults = await analyzeSymptoms(formData);
            
            // Update application state
            appState.updateState({
                lastAnalysis: analysisResults,
                currentSymptoms: formData.symptoms.split(',').map(s => s.trim()).filter(s => s)
            });
            
            // Display results
            displayResults(analysisResults);
            
            // Track analysis completion
            trackEvent('Analysis', 'Complete', {
                symptomCount: appState.currentSymptoms.length,
                triageLevel: analysisResults.triage.level
            });
            
        } catch (error) {
            console.error('Analysis failed:', error);
            showToast('Analysis failed. Please try again.', 'error');
            trackError('AnalysisError', error);
        } finally {
            analyzeBtn.innerHTML = 'Analyze Symptoms';
            analyzeBtn.disabled = false;
        }
    });
}

function getFormData() {
    return {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        symptoms: document.getElementById('symptoms').value,
        duration: document.getElementById('duration').value,
        severity: document.getElementById('severity').value,
        additionalInfo: document.getElementById('additionalInfo').value,
        medicalHistory: document.getElementById('medicalHistory')?.value || '',
        medications: document.getElementById('medications')?.value || '',
        allergies: document.getElementById('allergies')?.value || ''
    };
}

function validateForm() {
    const requiredFields = ['age', 'gender', 'symptoms', 'duration'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// ==================== MODULE: SYMPTOM ANALYSIS ====================
async function analyzeSymptoms(formData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Process the symptoms
    const symptomList = formData.symptoms.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
    
    // Enhanced triage algorithm
    const triageResult = determineTriageLevel(symptomList, formData.severity, formData);
    
    // Enhanced condition matching
    const matchedConditions = matchConditions(symptomList, formData);
    
    // Generate recommendations
    const recommendations = generateRecommendations(triageResult.level, formData);
    
    return {
        triage: triageResult,
        conditions: matchedConditions,
        recommendations: recommendations.recommendations,
        nextSteps: recommendations.nextSteps,
        clinicalGuidelines: recommendations.clinicalGuidelines,
        timestamp: new Date().toISOString()
    };
}

function determineTriageLevel(symptoms, severity, formData) {
    // Emergency red flags
    const emergencyRedFlags = [
        { term: 'chest pain', description: 'Possible cardiac event' },
        { term: 'shortness of breath', description: 'Respiratory distress' },
        { term: 'severe headache', description: 'Possible stroke or aneurysm' },
        { term: 'uncontrolled bleeding', description: 'Hemorrhagic emergency' },
        { term: 'sudden weakness', description: 'Possible neurological event' },
        { term: 'difficulty speaking', description: 'Possible stroke' },
        { term: 'suicidal thoughts', description: 'Mental health emergency' }
    ];
    
    // Check for emergency conditions
    const foundEmergency = emergencyRedFlags.find(flag => 
        symptoms.some(s => s.includes(flag.term)) || 
        severity >= 9;
    
    if (foundEmergency) {
        return {
            level: 'Emergency',
            class: 'triage-emergency',
            description: 'Your symptoms suggest a potentially life-threatening condition that requires IMMEDIATE medical attention. Call emergency services or go to the nearest emergency department.',
            redFlags: emergencyRedFlags.filter(flag => 
                symptoms.some(s => s.includes(flag.term)))
        };
    }
    
    // Urgent conditions
    const urgentConditions = [
        { term: 'high fever', threshold: 102.5 }, // Fahrenheit
        { term: 'severe pain', severityThreshold: 7 },
        { term: 'confusion' },
        { term: 'persistent vomiting' }
    ];
    
    const foundUrgent = urgentConditions.some(condition => 
        (symptoms.some(s => s.includes(condition.term)) && 
        (!condition.threshold || formData.additionalInfo.includes(`>${condition.threshold}`)) &&
        (!condition.severityThreshold || severity >= condition.severityThreshold));
    
    if (foundUrgent || severity >= 7) {
        return {
            level: 'Urgent',
            class: 'triage-urgent',
            description: 'Your symptoms suggest a condition that should be evaluated by a healthcare provider within 24 hours. Contact your doctor or visit an urgent care facility.'
        };
    }
    
    // Routine conditions
    if (symptoms.length >= 3 || severity >= 5) {
        return {
            level: 'Routine',
            class: 'triage-routine',
            description: 'Your symptoms suggest a condition that should be evaluated by a healthcare provider, but not urgently. Schedule an appointment with your doctor.'
        };
    }
    
    // Self-care conditions
    return {
        level: 'Self-care',
        class: 'triage-self-care',
        description: 'Your symptoms suggest a mild condition that can typically be managed with self-care at home.'
    };
}

function matchConditions(symptoms, formData) {
    // Convert symptoms to symptom IDs
    const symptomIds = symptoms.map(symptom => {
        const found = SYMPTOM_DATABASE.symptoms.find(s => s.term === symptom);
        return found ? found.id : null;
    }).filter(id => id);
    
    // Score conditions based on symptom matches
    const scoredConditions = SYMPTOM_DATABASE.conditions.map(condition => {
        const matchingSymptoms = condition.symptoms.filter(symptomId => 
            symptomIds.includes(symptomId)).length;
        
        if (matchingSymptoms === 0) return null;
        
        // Base probability calculation
        let probability = condition.probability + (matchingSymptoms * 5) + (formData.severity * 2);
        
        // Adjust based on age
        if (formData.age < 18) probability *= 1.1; // Increase for pediatric cases
        else if (formData.age > 65) probability *= 1.15; // Increase for elderly
        
        // Cap probability
        probability = Math.min(probability, 95);
        
        return {
            id: condition.id,
            name: condition.name,
            icd10: condition.icd10,
            probability: Math.round(probability),
            matchingSymptoms: matchingSymptoms,
            totalSymptoms: condition.symptoms.length
        };
    }).filter(condition => condition !== null);
    
    // Sort by probability and limit to top 5
    return scoredConditions
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 5);
}

function generateRecommendations(triageLevel, formData) {
    const recommendations = [];
    const nextSteps = [];
    const clinicalGuidelines = [];
    
    // Base recommendations by triage level
    switch (triageLevel) {
        case 'Emergency':
            recommendations.push(
                "Call emergency services (911 or local emergency number) immediately.",
                "Do not attempt to drive yourself to the hospital.",
                "If experiencing chest pain, chew one adult aspirin (unless allergic).",
                "Remain calm and try to stay still while waiting for help."
            );
            
            nextSteps.push(
                "Emergency medical team will assess your condition upon arrival.",
                "You will likely be transported to the nearest emergency department.",
                "Bring a list of any medications you're currently taking.",
                "Notify family members or friends about your situation."
            );
            
            clinicalGuidelines.push(
                "Follow ACLS (Advanced Cardiac Life Support) protocols for cardiac emergencies",
                "Follow stroke protocol if neurological symptoms present (FAST assessment)"
            );
            break;
            
        case 'Urgent':
            recommendations.push(
                "Contact your primary care physician or visit an urgent care facility within 24 hours.",
                "Rest and stay hydrated.",
                "Monitor your symptoms closely for any worsening.",
                "Take over-the-counter pain relievers as needed (following package instructions)."
            );
            
            nextSteps.push(
                "Prepare a list of your symptoms, including when they started and what makes them better or worse.",
                "Bring your insurance information and photo ID to your appointment.",
                "Be ready to provide your medical history, including any chronic conditions and medications.",
                "Consider having someone accompany you to your appointment."
            );
            
            clinicalGuidelines.push(
                "Follow CDC guidelines for infectious disease evaluation",
                "Consider point-of-care testing based on symptoms (strep test, flu test, etc.)"
            );
            break;
            
        case 'Routine':
            recommendations.push(
                "Schedule an appointment with your healthcare provider in the next few days.",
                "Keep a symptom diary to track patterns or triggers.",
                "Get plenty of rest and maintain good hydration.",
                "Use over-the-counter remedies as appropriate for symptom relief."
            );
            
            nextSteps.push(
                "Call your doctor's office to schedule an appointment.",
                "Write down any questions you have for your healthcare provider.",
                "Check if you need any lab tests or imaging before your appointment.",
                "Review your family medical history for relevant conditions."
            );
            
            clinicalGuidelines.push(
                "Follow USPSTF guidelines for preventive care recommendations",
                "Consider differential diagnosis based on patient history"
            );
            break;
            
        default: // Self-care
            recommendations.push(
                "Your symptoms may resolve with self-care and time.",
                "Get plenty of rest and stay hydrated.",
                "Use over-the-counter medications as needed for symptom relief.",
                "Practice good hygiene to prevent spreading illness if contagious."
            );
            
            nextSteps.push(
                "Monitor your symptoms for 48 hours.",
                "If symptoms persist beyond 3-5 days or worsen, contact your healthcare provider.",
                "Consider telemedicine options if you want professional advice without an office visit.",
                "Maintain a healthy diet and light activity as tolerated."
            );
            
            clinicalGuidelines.push(
                "Follow general self-care guidelines for minor illnesses",
                "Consider patient education materials for home care"
            );
    }
    
    // Add general health recommendations
    recommendations.push(
        "Wash your hands frequently to prevent spreading or catching infections.",
        "Get adequate sleep to support your immune system.",
        "Consider using a humidifier if you have respiratory symptoms.",
        "Avoid smoking and secondhand smoke exposure."
    );
    
    // Add COVID-19 specific advice if relevant
    if (formData.symptoms.toLowerCase().includes('fever') || 
        formData.symptoms.toLowerCase().includes('cough') || 
        formData.symptoms.toLowerCase().includes('loss of taste') || 
        formData.symptoms.toLowerCase().includes('loss of smell')) {
        recommendations.push(
            "Consider getting tested for COVID-19.",
            "Self-isolate until you can be tested or symptoms improve.",
            "Wear a mask if you must be around others."
        );
        
        clinicalGuidelines.push(
            "Follow current CDC COVID-19 testing and isolation guidelines"
        );
    }
    
    return {
        recommendations,
        nextSteps,
        clinicalGuidelines
    };
}

// ==================== MODULE: RESULTS DISPLAY ====================
function displayResults(results) {
    const symptomForm = document.getElementById('symptomForm');
    const resultsSection = document.getElementById('resultsSection');
    
    if (!symptomForm || !resultsSection) return;
    
    // Hide form and show results
    symptomForm.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Display user info
    document.getElementById('resultAge').textContent = document.getElementById('age').value;
    document.getElementById('resultGender').textContent = 
        document.getElementById('gender').value.charAt(0).toUpperCase() + 
        document.getElementById('gender').value.slice(1);
    document.getElementById('resultSymptoms').textContent = 
        document.getElementById('symptoms').value;
    
    // Display triage level
    const triageValue = document.getElementById('triageValue');
    triageValue.textContent = results.triage.level;
    triageValue.className = 'triage-value ' + results.triage.class;
    document.getElementById('triageDescription').textContent = results.triage.description;
    
    // Display potential conditions
    const conditionsList = document.getElementById('conditionsList');
    conditionsList.innerHTML = '';
    results.conditions.forEach(condition => {
        const div = document.createElement('div');
        div.className = 'condition-item fade-in';
        div.innerHTML = `
            <div class="condition-name">${condition.name}</div>
            <div class="condition-probability">
                <div class="probability-bar" style="width: ${condition.probability}%"></div>
                <span>Probability: ${condition.probability}%</span>
            </div>
            ${condition.icd10 ? `<div class="condition-icd">ICD-10: ${condition.icd10}</div>` : ''}
        `;
        conditionsList.appendChild(div);
    });
    
    // Display recommendations
    const recommendationsContent = document.getElementById('recommendationsContent');
    recommendationsContent.innerHTML = results.recommendations.map(rec => 
        `<p>• ${rec}</p>`
    ).join('');
    
    // Display next steps
    const nextStepsContent = document.getElementById('nextStepsContent');
    nextStepsContent.innerHTML = results.nextSteps.map(step => 
        `<p>• ${step}</p>`
    ).join('');
    
    // Display clinical guidelines (for professional version)
    const guidelinesContent = document.getElementById('guidelinesContent');
    if (guidelinesContent) {
        guidelinesContent.innerHTML = results.clinicalGuidelines.map(guideline => 
            `<p>• ${guideline}</p>`
        ).join('');
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Setup back button
    setupBackButton();
}

function setupBackButton() {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;

    // Remove existing back button if any
    const existingBtn = resultsContainer.querySelector('.back-btn');
    if (existingBtn) existingBtn.remove();

    const backBtn = document.createElement('button');
    backBtn.className = 'btn-primary back-btn';
    backBtn.textContent = 'Back to Symptom Checker';
    backBtn.style.marginTop = '20px';
    backBtn.addEventListener('click', resetFormView);
    
    resultsContainer.appendChild(backBtn);
}

function resetFormView() {
    const resultsSection = document.getElementById('resultsSection');
    const symptomForm = document.getElementById('symptomForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (symptomForm) symptomForm.style.display = 'block';
    if (analyzeBtn) {
        analyzeBtn.innerHTML = 'Analyze Symptoms';
        analyzeBtn.disabled = false;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== MODULE: NAVIGATION ====================
function setupNavigation() {
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
                    document.body.classList.remove('no-scroll');
                }
                
                trackEvent('Navigation', 'AnchorLinkClick', targetId);
            }
        });
    });
    
    // Animation on scroll
    setupScrollAnimations();
}

function setupScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .testimonial, .about-content, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', throttle(animateOnScroll, 100));
    // Initial check in case elements are already in view
    animateOnScroll();
}

// ==================== MODULE: UTILITIES ====================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ==================== MODULE: ANALYTICS ====================
function setupAnalytics() {
    // In a real app, this would initialize Google Analytics or similar
    if (APP_CONFIG.DEBUG_MODE) {
        console.log('Analytics initialized');
    }
}

function trackEvent(category, action, label = '') {
    if (APP_CONFIG.DEBUG_MODE) {
        console.log(`Event tracked: ${category}, ${action}, ${label}`);
    }
    // In production: window.ga('send', 'event', category, action, label);
}

function trackError(errorType, error) {
    if (APP_CONFIG.DEBUG_MODE) {
        console.error(`Error tracked: ${errorType}`, error);
    }
    // In production: window.ga('send', 'exception', { exDescription: errorType });
}

// ==================== MODULE: SERVICE WORKER ====================
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                if (APP_CONFIG.DEBUG_MODE) {
                    console.log('ServiceWorker registration successful');
                }
            }).catch(err => {
                console.error('ServiceWorker registration failed:', err);
            });
        });
    }
}

// ==================== INITIALIZE APPLICATION ====================
document.addEventListener('DOMContentLoaded', initApplication); 
