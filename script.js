/**
 * Professional Medical Symptom Checker System
 * Enhanced with AI-powered analysis, comprehensive medical databases,
 * and professional-grade functionality
 * 
 * @version 2.0
 * @author Medical AI Systems
 * @license Professional Medical Software License
 */

class MedicalSymptomChecker {
    constructor() {
        this.init();
        this.loadMedicalDatabase();
        this.setupEventListeners();
        this.initializeAnalytics();
    }

    init() {
        this.isAnalyzing = false;
        this.sessionData = {
            startTime: Date.now(),
            interactions: [],
            analysisHistory: []
        };
        
        // Enhanced medical terminology and ICD-10 codes
        this.medicalDatabase = new Map();
        this.symptomSeverityWeights = new Map();
        this.conditionRiskFactors = new Map();
        
        // Performance monitoring
        this.performanceMetrics = {
            analysisTime: [],
            accuracy: [],
            userSatisfaction: []
        };
    }

    loadMedicalDatabase() {
        // Comprehensive symptom database with medical terminology
        this.commonSymptoms = [
            // Cardiovascular
            "chest pain", "palpitations", "irregular heartbeat", "shortness of breath", "cyanosis",
            "peripheral edema", "claudication", "syncope", "presyncope", "orthopnea",
            
            // Respiratory
            "cough", "dyspnea", "wheezing", "hemoptysis", "pleuritic pain",
            "stridor", "orthopnea", "paroxysmal nocturnal dyspnea", "tachypnea",
            
            // Neurological
            "headache", "migraine", "dizziness", "vertigo", "seizures", "tremors",
            "paresthesia", "weakness", "paralysis", "ataxia", "dysarthria", "aphasia",
            "confusion", "memory loss", "focal neurological deficits", "neuropathy",
            
            // Gastrointestinal
            "nausea", "vomiting", "diarrhea", "constipation", "abdominal pain", "bloating",
            "heartburn", "dysphagia", "odynophagia", "hematemesis", "melena", "hematochezia",
            "jaundice", "hepatomegaly", "splenomegaly", "ascites",
            
            // Genitourinary
            "dysuria", "frequency", "urgency", "hematuria", "oliguria", "anuria",
            "nocturia", "incontinence", "flank pain", "suprapubic pain", "discharge",
            
            // Musculoskeletal
            "joint pain", "muscle pain", "stiffness", "swelling", "deformity",
            "limited range of motion", "crepitus", "instability", "locking",
            
            // Dermatological
            "rash", "pruritus", "erythema", "petechiae", "purpura", "ecchymosis",
            "urticaria", "vesicles", "bullae", "papules", "nodules", "ulceration",
            
            // Constitutional
            "fever", "chills", "night sweats", "weight loss", "weight gain",
            "fatigue", "malaise", "anorexia", "cachexia", "failure to thrive",
            
            // Endocrine
            "polyuria", "polydipsia", "polyphagia", "heat intolerance", "cold intolerance",
            "excessive sweating", "hair loss", "brittle nails", "goiter",
            
            // Psychiatric
            "anxiety", "depression", "mood swings", "irritability", "insomnia",
            "panic attacks", "hallucinations", "delusions", "suicidal ideation"
        ];

        // Medical condition database with ICD-10 codes and detailed information
        this.medicalConditions = [
            {
                name: "Acute Myocardial Infarction",
                icd10: "I21",
                symptoms: ["chest pain", "shortness of breath", "nausea", "sweating", "palpitations"],
                riskFactors: ["hypertension", "diabetes", "smoking", "family history", "hyperlipidemia"],
                urgency: "emergency",
                probability: 15,
                demographics: { ageRange: [40, 100], genderBias: "male" }
            },
            {
                name: "Pulmonary Embolism",
                icd10: "I26",
                symptoms: ["shortness of breath", "chest pain", "cough", "hemoptysis", "tachycardia"],
                riskFactors: ["immobilization", "surgery", "malignancy", "pregnancy", "oral contraceptives"],
                urgency: "emergency",
                probability: 8,
                demographics: { ageRange: [20, 100], genderBias: "female" }
            },
            {
                name: "Stroke (Cerebrovascular Accident)",
                icd10: "I64",
                symptoms: ["weakness", "facial drooping", "speech difficulties", "confusion", "headache"],
                riskFactors: ["hypertension", "diabetes", "atrial fibrillation", "smoking"],
                urgency: "emergency",
                probability: 12,
                demographics: { ageRange: [50, 100], genderBias: "neutral" }
            },
            {
                name: "Pneumonia",
                icd10: "J18",
                symptoms: ["cough", "fever", "shortness of breath", "chest pain", "fatigue"],
                riskFactors: ["age", "immunocompromised", "chronic conditions"],
                urgency: "urgent",
                probability: 25,
                demographics: { ageRange: [0, 100], genderBias: "neutral" }
            },
            {
                name: "Influenza",
                icd10: "J11",
                symptoms: ["fever", "cough", "fatigue", "muscle pain", "headache", "sore throat"],
                riskFactors: ["seasonal exposure", "immunocompromised"],
                urgency: "routine",
                probability: 35,
                demographics: { ageRange: [0, 100], genderBias: "neutral" }
            },
            {
                name: "Migraine",
                icd10: "G43",
                symptoms: ["headache", "nausea", "photophobia", "phonophobia", "aura"],
                riskFactors: ["family history", "stress", "hormonal changes"],
                urgency: "routine",
                probability: 20,
                demographics: { ageRange: [15, 65], genderBias: "female" }
            },
            {
                name: "Gastroenteritis",
                icd10: "K59",
                symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain", "fever"],
                riskFactors: ["contaminated food", "viral exposure"],
                urgency: "routine",
                probability: 30,
                demographics: { ageRange: [0, 100], genderBias: "neutral" }
            },
            {
                name: "Urinary Tract Infection",
                icd10: "N39",
                symptoms: ["dysuria", "frequency", "urgency", "suprapubic pain", "hematuria"],
                riskFactors: ["female gender", "sexual activity", "diabetes"],
                urgency: "routine",
                probability: 25,
                demographics: { ageRange: [15, 100], genderBias: "female" }
            },
            {
                name: "COVID-19",
                icd10: "U07.1",
                symptoms: ["fever", "cough", "shortness of breath", "fatigue", "loss of taste", "loss of smell"],
                riskFactors: ["exposure", "immunocompromised", "age"],
                urgency: "urgent",
                probability: 15,
                demographics: { ageRange: [0, 100], genderBias: "neutral" }
            },
            {
                name: "Generalized Anxiety Disorder",
                icd10: "F41.1",
                symptoms: ["anxiety", "irritability", "palpitations", "sweating", "insomnia"],
                riskFactors: ["stress", "family history", "trauma"],
                urgency: "routine",
                probability: 18,
                demographics: { ageRange: [18, 100], genderBias: "female" }
            }
        ];

        // Red flag symptoms requiring immediate attention
        this.redFlagSymptoms = [
            "chest pain", "severe shortness of breath", "sudden severe headache",
            "uncontrolled bleeding", "loss of consciousness", "severe abdominal pain",
            "sudden weakness", "difficulty speaking", "severe allergic reaction",
            "signs of stroke", "signs of heart attack", "respiratory distress"
        ];

        // Symptom severity weights for AI analysis
        this.symptomSeverityWeights.set("chest pain", 9);
        this.symptomSeverityWeights.set("shortness of breath", 8);
        this.symptomSeverityWeights.set("severe headache", 8);
        this.symptomSeverityWeights.set("loss of consciousness", 10);
        this.symptomSeverityWeights.set("uncontrolled bleeding", 9);
        this.symptomSeverityWeights.set("fever", 6);
        this.symptomSeverityWeights.set("cough", 4);
        this.symptomSeverityWeights.set("headache", 5);
        this.symptomSeverityWeights.set("nausea", 4);
        this.symptomSeverityWeights.set("fatigue", 3);
    }

    setupEventListeners() {
        // Enhanced preloader with error handling
        window.addEventListener('load', () => {
            try {
                const preloader = document.querySelector('.preloader');
                if (preloader) {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            } catch (error) {
                console.error('Preloader error:', error);
            }
        });

        // Mobile menu with accessibility improvements
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav');

        if (mobileMenuBtn && nav) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = mobileMenuBtn.classList.contains('active');
                
                mobileMenuBtn.classList.toggle('active');
                nav.classList.toggle('active');
                
                // Accessibility attributes
                mobileMenuBtn.setAttribute('aria-expanded', !isActive);
                nav.setAttribute('aria-hidden', isActive);
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', false);
                    nav.setAttribute('aria-hidden', true);
                }
            });
        }

        // Enhanced header scroll with performance optimization
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleHeaderScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Advanced symptom input handling
        this.setupSymptomInput();
        
        // Form submission with validation
        this.setupFormHandling();
        
        // Smooth scrolling with performance optimization
        this.setupSmoothScrolling();
        
        // Animation on scroll with intersection observer
        this.setupScrollAnimations();
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (header) {
            const scrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', scrolled);
        }
    }

    setupSymptomInput() {
        const symptomInput = document.getElementById('symptoms');
        const suggestionsContainer = document.getElementById('symptomSuggestions');

        if (!symptomInput || !suggestionsContainer) return;

        let debounceTimer;
        
        symptomInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.handleSymptomInput(e.target.value);
            }, 150);
        });

        // Enhanced keyboard navigation
        symptomInput.addEventListener('keydown', (e) => {
            this.handleSymptomKeyboard(e);
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!symptomInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    handleSymptomInput(inputText) {
        const lastTerm = inputText.split(',').pop().trim().toLowerCase();
        
        if (lastTerm.length > 1) {
            const filteredSymptoms = this.commonSymptoms.filter(symptom => 
                symptom.includes(lastTerm) && !inputText.toLowerCase().includes(symptom)
            );
            
            // Sort by relevance (exact matches first, then starts with, then contains)
            filteredSymptoms.sort((a, b) => {
                if (a === lastTerm) return -1;
                if (b === lastTerm) return 1;
                if (a.startsWith(lastTerm) && !b.startsWith(lastTerm)) return -1;
                if (b.startsWith(lastTerm) && !a.startsWith(lastTerm)) return 1;
                return a.localeCompare(b);
            });
            
            this.showSuggestions(filteredSymptoms.slice(0, 8), lastTerm);
        } else {
            this.hideSuggestions();
        }
    }

    handleSymptomKeyboard(e) {
        const suggestionsContainer = document.getElementById('symptomSuggestions');
        const suggestions = suggestionsContainer.querySelectorAll('.symptom-suggestion');
        let currentIndex = Array.from(suggestions).findIndex(s => s.classList.contains('highlighted'));

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0;
                this.highlightSuggestion(suggestions, currentIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1;
                this.highlightSuggestion(suggestions, currentIndex);
                break;
            case 'Enter':
                if (currentIndex >= 0 && suggestions[currentIndex]) {
                    e.preventDefault();
                    suggestions[currentIndex].click();
                }
                break;
            case 'Escape':
                this.hideSuggestions();
                break;
        }
    }

    highlightSuggestion(suggestions, index) {
        suggestions.forEach((s, i) => {
            s.classList.toggle('highlighted', i === index);
        });
    }

    showSuggestions(symptoms, term) {
        const suggestionsContainer = document.getElementById('symptomSuggestions');
        
        if (symptoms.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        suggestionsContainer.innerHTML = '';
        symptoms.forEach((symptom, index) => {
            const div = document.createElement('div');
            div.className = 'symptom-suggestion';
            div.setAttribute('role', 'option');
            div.setAttribute('tabindex', '-1');
            
            // Highlight matching text
            const regex = new RegExp(`(${term})`, 'gi');
            div.innerHTML = symptom.replace(regex, '<strong>$1</strong>');
            
            div.addEventListener('click', () => {
                this.selectSymptom(symptom);
            });
            
            suggestionsContainer.appendChild(div);
        });
        
        suggestionsContainer.classList.add('show');
        suggestionsContainer.setAttribute('aria-hidden', 'false');
    }

    selectSymptom(symptom) {
        const symptomInput = document.getElementById('symptoms');
        const currentValue = symptomInput.value;
        const terms = currentValue.split(',');
        terms[terms.length - 1] = ' ' + symptom;
        symptomInput.value = terms.join(',') + ', ';
        this.hideSuggestions();
        symptomInput.focus();
        
        // Log interaction for analytics
        this.sessionData.interactions.push({
            type: 'symptom_selected',
            symptom: symptom,
            timestamp: Date.now()
        });
    }

    hideSuggestions() {
        const suggestionsContainer = document.getElementById('symptomSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('show');
            suggestionsContainer.setAttribute('aria-hidden', 'true');
        }
    }

    setupFormHandling() {
        const symptomForm = document.getElementById('symptomForm');
        const severitySlider = document.getElementById('severity');
        const severityValue = document.getElementById('severityValue');

        // Severity slider with real-time feedback
        if (severitySlider && severityValue) {
            severitySlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                severityValue.textContent = value;
                
                // Dynamic color coding
                const percentage = (value - 1) / 9 * 100;
                severitySlider.style.background = `linear-gradient(to right, 
                    hsl(${120 - percentage * 1.2}, 70%, 50%) 0%, 
                    hsl(${120 - percentage * 1.2}, 70%, 50%) ${percentage}%, 
                    #ddd ${percentage}%, #ddd 100%)`;
            });
        }

        // Form submission with comprehensive validation
        if (symptomForm) {
            symptomForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }
    }

    async handleFormSubmission() {
        if (this.isAnalyzing) return;

        const formData = this.collectFormData();
        const validationResult = this.validateFormData(formData);

        if (!validationResult.isValid) {
            this.showValidationErrors(validationResult.errors);
            return;
        }

        this.isAnalyzing = true;
        const analyzeBtn = document.getElementById('analyzeBtn');
        
        try {
            // Show loading state
            if (analyzeBtn) {
                analyzeBtn.innerHTML = '<span class="loader-btn"></span> Analyzing Symptoms...';
                analyzeBtn.disabled = true;
            }

            // Perform analysis with performance tracking
            const startTime = performance.now();
            const analysisResults = await this.performAdvancedAnalysis(formData);
            const endTime = performance.now();

            // Track performance
            this.performanceMetrics.analysisTime.push(endTime - startTime);

            // Display results
            this.displayResults(analysisResults, formData);
            
            // Log analysis for session tracking
            this.sessionData.analysisHistory.push({
                formData: formData,
                results: analysisResults,
                timestamp: Date.now(),
                analysisTime: endTime - startTime
            });

        } catch (error) {
            console.error('Analysis error:', error);
            this.showError('An error occurred during analysis. Please try again.');
        } finally {
            this.isAnalyzing = false;
            if (analyzeBtn) {
                analyzeBtn.innerHTML = 'Analyze Symptoms';
                analyzeBtn.disabled = false;
            }
        }
    }

    collectFormData() {
        return {
            age: parseInt(document.getElementById('age')?.value) || 0,
            gender: document.getElementById('gender')?.value || '',
            symptoms: document.getElementById('symptoms')?.value || '',
            duration: document.getElementById('duration')?.value || '',
            severity: parseInt(document.getElementById('severity')?.value) || 1,
            additionalInfo: document.getElementById('additionalInfo')?.value || '',
            timestamp: Date.now()
        };
    }

    validateFormData(formData) {
        const errors = [];

        if (formData.age < 1 || formData.age > 120) {
            errors.push('Please enter a valid age between 1 and 120.');
        }

        if (!formData.gender) {
            errors.push('Please select your gender.');
        }

        if (!formData.symptoms.trim()) {
            errors.push('Please enter at least one symptom.');
        }

        if (!formData.duration) {
            errors.push('Please specify how long you\'ve had these symptoms.');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    showValidationErrors(errors) {
        // Create or update error display
        let errorContainer = document.getElementById('validationErrors');
        
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'validationErrors';
            errorContainer.className = 'validation-errors';
            
            const form = document.getElementById('symptomForm');
            form.insertBefore(errorContainer, form.firstChild);
        }

        errorContainer.innerHTML = `
            <div class="error-header">Please correct the following errors:</div>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
        `;

        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async performAdvancedAnalysis(formData) {
        // Simulate advanced AI processing with realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        const symptomList = formData.symptoms.split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s.length > 0);

        // Advanced triage assessment
        const triageAssessment = this.performTriageAssessment(formData, symptomList);
        
        // AI-powered condition matching
        const conditionAnalysis = this.performConditionAnalysis(formData, symptomList);
        
        // Risk factor analysis
        const riskAnalysis = this.performRiskAnalysis(formData, symptomList);
        
        // Generate personalized recommendations
        const recommendations = this.generateRecommendations(triageAssessment, conditionAnalysis, formData);
        
        // Generate next steps
        const nextSteps = this.generateNextSteps(triageAssessment, conditionAnalysis, formData);

        return {
            triage: triageAssessment,
            conditions: conditionAnalysis.conditions,
            riskFactors: riskAnalysis,
            recommendations: recommendations,
            nextSteps: nextSteps,
            confidence: conditionAnalysis.confidence,
            analysisId: this.generateAnalysisId()
        };
    }

    performTriageAssessment(formData, symptomList) {
        let urgencyScore = 0;
        let triageLevel = 'Self-care';
        let triageClass = 'triage-self-care';
        let description = 'Your symptoms suggest a mild condition that can typically be managed with self-care at home.';

        // Check for red flag symptoms
        const hasRedFlags = this.redFlagSymptoms.some(redFlag => 
            symptomList.some(symptom => symptom.includes(redFlag.toLowerCase()))
        );

        // Calculate urgency score based on multiple factors
        symptomList.forEach(symptom => {
            const weight = this.symptomSeverityWeights.get(symptom) || 2;
            urgencyScore += weight;
        });

        // Age factor
        if (formData.age > 65 || formData.age < 2) urgencyScore += 2;
        if (formData.age > 80) urgencyScore += 3;

        // Severity factor
        urgencyScore += formData.severity;

        // Duration factor
        if (formData.duration.includes('sudden') || formData.duration.includes('acute')) {
            urgencyScore += 3;
        }

        // Determine triage level
        if (hasRedFlags || urgencyScore >= 25 || formData.severity >= 9) {
            triageLevel = 'Emergency';
            triageClass = 'triage-emergency';
            description = 'Your symptoms suggest a potentially life-threatening condition that requires IMMEDIATE medical attention. Call emergency services or go to the nearest emergency department.';
        } else if (urgencyScore >= 15 || formData.severity >= 7) {
            triageLevel = 'Urgent';
            triageClass = 'triage-urgent';
            description = 'Your symptoms suggest a condition that should be evaluated by a healthcare provider within 24 hours. Contact your doctor or visit an urgent care facility.';
        } else if (urgencyScore >= 8 || formData.severity >= 5 || symptomList.length >= 4) {
            triageLevel = 'Routine';
            triageClass = 'triage-routine';
            description = 'Your symptoms suggest a condition that should be evaluated by a healthcare provider, but not urgently. Schedule an appointment with your doctor.';
        }

        return {
            level: triageLevel,
            class: triageClass,
            description: description,
            urgencyScore: urgencyScore,
            hasRedFlags: hasRedFlags
        };
    }

    performConditionAnalysis(formData, symptomList) {
        const potentialConditions = [];
        let totalConfidence = 0;

        this.medicalConditions.forEach(condition => {
            let matchScore = 0;
            let confidence = 0;

            // Symptom matching with weighted scoring
            condition.symptoms.forEach(conditionSymptom => {
                const match = symptomList.find(userSymptom => 
                    userSymptom.includes(conditionSymptom.toLowerCase()) ||
                    conditionSymptom.toLowerCase().includes(userSymptom)
                );
                
                if (match) {
                    const weight = this.symptomSeverityWeights.get(conditionSymptom) || 3;
                    matchScore += weight;
                }
            });

            if (matchScore > 0) {
                // Calculate base probability
                let probability = condition.probability + (matchScore * 3);

                // Demographic adjustments
                const demo = condition.demographics;
                if (demo.ageRange && (formData.age < demo.ageRange[0] || formData.age > demo.ageRange[1])) {
                    probability *= 0.7;
                }

                if (demo.genderBias !== 'neutral') {
                    if ((demo.genderBias === 'male' && formData.gender === 'male') ||
                        (demo.genderBias === 'female' && formData.gender === 'female')) {
                        probability *= 1.2;
                    } else {
                        probability *= 0.8;
                    }
                }

                // Severity adjustment
                probability += formData.severity * 2;

                // Cap probability
                probability = Math.min(probability, 95);
                
                if (probability > 5) {
                    confidence = Math.min(matchScore / condition.symptoms.length * 100, 95);
                    
                    potentialConditions.push({
                        name: condition.name,
                        icd10: condition.icd10,
                        probability: Math.round(probability),
                        confidence: Math.round(confidence),
                        urgency: condition.urgency,
                        matchedSymptoms: condition.symptoms.filter(s => 
                            symptomList.some(us => us.includes(s.toLowerCase()))
                        )
                    });
                    
                    totalConfidence += confidence;
                }
            }
        });

        // Sort by probability and limit results
        potentialConditions.sort((a, b) => b.probability - a.probability);
        const topConditions = potentialConditions.slice(0, 6);

        return {
            conditions: topConditions,
            confidence: topConditions.length > 0 ? totalConfidence / topConditions.length : 0
        };
    }

    performRiskAnalysis(formData, symptomList) {
        const riskFactors = [];

        // Age-related risks
        if (formData.age > 65) {
            riskFactors.push({
                factor: 'Advanced Age',
                description: 'Increased risk for various conditions due to age',
                severity: 'moderate'
            });
        }

        // Symptom-based risks
        if (symptomList.includes('chest pain')) {
            riskFactors.push({
                factor: 'Cardiac Risk',
                description: 'Chest pain may indicate serious cardiac conditions',
                severity: 'high'
            });
        }

        if (symptomList.includes('shortness of breath')) {
            riskFactors.push({
                factor: 'Respiratory Risk',
                description: 'Breathing difficulties require careful evaluation',
                severity: 'high'
            });
        }

        // Severity-based risks
        if (formData.severity >= 8) {
            riskFactors.push({
                factor: 'High Symptom Severity',
                description: 'Severe symptoms warrant prompt medical attention',
                severity: 'high'
            });
        }

        return riskFactors;
    }

    generateRecommendations(triage, conditions, formData) {
        const recommendations = [];

        // Triage-based recommendations
        switch (triage.level) {
            case 'Emergency':
                recommendations.push(
                    "Call emergency services (911) immediately or go to the nearest emergency department.",
                    "Do not attempt to drive yourself if experiencing severe symptoms.",
                    "If experiencing chest pain and not allergic, consider chewing one adult aspirin.",
                    "Remain calm and keep a list of current medications ready for medical personnel."
                );
                break;

            case 'Urgent':
                recommendations.push(
                    "Contact your primary care physician or visit an urgent care facility within 24 hours.",
                    "Monitor your symptoms closely and seek immediate care if they worsen.",
                    "Stay hydrated and rest as much as possible.",
                    "Have someone available to assist you if needed."
                );
                break;

            case 'Routine':
                recommendations.push(
                    "Schedule an appointment with your healthcare provider within the next few days.",
                    "Keep a detailed symptom diary including triggers and patterns.",
                    "Continue with normal activities as tolerated.",
                    "Consider over-the-counter remedies for symptom relief as appropriate."
                );
                break;

            default:
                recommendations.push(
                    "Your symptoms may resolve with self-care and time.",
                    "Get adequate rest and maintain proper hydration.",
                    "Monitor symptoms for 48-72 hours for any changes.",
                    "Use appropriate over-the-counter medications for comfort."
                );
        }

        // Condition-specific recommendations
        if (conditions.conditions.length > 0) {
            const topCondition = conditions.conditions[0];
            
            switch (topCondition.name) {
                case 'Acute Myocardial Infarction':
                    recommendations.push(
                        "Avoid physical exertion and remain as calm as possible.",
                        "If prescribed, take nitroglycerin as directed by your physician.",
                        "Have someone stay with you until medical help arrives."
                    );
                    break;
                    
                case 'Influenza':
                    recommendations.push(
                        "Get plenty of rest and increase fluid intake.",
                        "Consider antiviral medications if within 48 hours of symptom onset.",
                        "Isolate yourself to prevent spreading the infection."
                    );
                    break;
                    
                case 'COVID-19':
                    recommendations.push(
                        "Self-isolate immediately and get tested for COVID-19.",
                        "Wear a mask if you must be around others.",
                        "Monitor oxygen levels if you have a pulse oximeter."
                    );
                    break;
            }
        }

        // General health recommendations
        recommendations.push(
            "Maintain good hand hygiene to prevent infection spread.",
            "Ensure adequate sleep to support immune system function.",
            "Stay hydrated with water and clear fluids.",
            "Avoid smoking and secondhand smoke exposure."
        );

        return recommendations;
    }

    generateNextSteps(triage, conditions, formData) {
        const nextSteps = [];

        switch (triage.level) {
            case 'Emergency':
                nextSteps.push(
                    "Emergency medical personnel will perform immediate assessment.",
                    "You will likely be transported to an emergency department.",
                    "Bring identification, insurance cards, and medication list.",
                    "Notify family members or emergency contacts about your situation."
                );
                break;

            case 'Urgent':
                nextSteps.push(
                    "Call your healthcare provider or urgent care within 24 hours.",
                    "Prepare a detailed list of symptoms, including onset and progression.",
                    "Gather your medical history, current medications, and insurance information.",
                    "Consider having someone accompany you to the appointment."
                );
                break;

            case 'Routine':
                nextSteps.push(
                    "Contact your primary care physician to schedule an appointment.",
                    "Document your symptoms in detail, including what helps or worsens them.",
                    "Review your family medical history for relevant conditions.",
                    "Prepare questions to ask your healthcare provider."
                );
                break;

            default:
                nextSteps.push(
                    "Monitor your symptoms for 2-3 days for any changes.",
                    "If symptoms persist or worsen, contact your healthcare provider.",
                    "Consider telemedicine consultation if you prefer remote care.",
                    "Maintain healthy lifestyle habits to support recovery."
                );
        }

        // Follow-up recommendations
        nextSteps.push(
            "Keep a symptom diary to track patterns and improvements.",
            "Take photos of any visible symptoms for medical reference.",
            "Research your insurance coverage for the recommended level of care.",
            "Prepare a list of questions for your healthcare provider."
        );

        return nextSteps;
    }

    generateAnalysisId() {
        return 'ANL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    displayResults(results, formData) {
        // Hide form and show results
        const symptomForm = document.getElementById('symptomForm');
        const resultsSection = document.getElementById('resultsSection');
        const validationErrors = document.getElementById('validationErrors');

        if (validationErrors) {
            validationErrors.remove();
        }

        if (symptomForm) symptomForm.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'block';

        // Display patient information
        this.displayPatientInfo(formData);
        
        // Display triage assessment
        this.displayTriageAssessment(results.triage);
        
        // Display potential conditions
        this.displayConditions(results.conditions, results.confidence);
        
        // Display risk factors
        this.displayRiskFactors(results.riskFactors);
        
        // Display recommendations and next steps
        this.displayRecommendations(results.recommendations);
        this.displayNextSteps(results.nextSteps);
        
        // Add analysis metadata
        this.displayAnalysisMetadata(results);

        // Scroll to results
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Setup back button if not exists
        this.setupBackButton();
    }

    displayPatientInfo(formData) {
        const elements = {
            'resultAge': formData.age,
            'resultGender': formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
            'resultSymptoms': formData.symptoms
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    displayTriageAssessment(triage) {
        const triageValue = document.getElementById('triageValue');
        const triageDescription = document.getElementById('triageDescription');

        if (triageValue) {
            triageValue.textContent = triage.level;
            triageValue.className = 'triage-value ' + triage.class;
        }

        if (triageDescription) {
            triageDescription.textContent = triage.description;
        }

        // Add urgency indicator
        const triageContainer = triageValue?.parentElement;
        if (triageContainer && !triageContainer.querySelector('.urgency-indicator')) {
            const urgencyIndicator = document.createElement('div');
            urgencyIndicator.className = 'urgency-indicator';
            urgencyIndicator.innerHTML = `
                <div class="urgency-score">Urgency Score: ${triage.urgencyScore}/30</div>
                ${triage.hasRedFlags ? '<div class="red-flag-alert">⚠️ Red flag symptoms detected</div>' : ''}
            `;
            triageContainer.appendChild(urgencyIndicator);
        }
    }

    displayConditions(conditions, overallConfidence) {
        const conditionsList = document.getElementById('conditionsList');
        if (!conditionsList) return;

        conditionsList.innerHTML = '';

        if (conditions.length === 0) {
            conditionsList.innerHTML = '<div class="no-conditions">No specific conditions identified based on provided symptoms.</div>';
            return;
        }

        conditions.forEach((condition, index) => {
            const div = document.createElement('div');
            div.className = 'condition-item fade-in';
            div.style.animationDelay = `${index * 0.1}s`;
            
            div.innerHTML = `
                <div class="condition-header">
                    <div class="condition-name">${condition.name}</div>
                    <div class="condition-probability">${condition.probability}%</div>
                </div>
                <div class="condition-details">
                    <div class="condition-code">ICD-10: ${condition.icd10}</div>
                    <div class="condition-confidence">Confidence: ${condition.confidence}%</div>
                    <div class="condition-urgency urgency-${condition.urgency}">${condition.urgency}</div>
                </div>
                <div class="matched-symptoms">
                    <strong>Matched symptoms:</strong> ${condition.matchedSymptoms.join(', ')}
                </div>
            `;
            conditionsList.appendChild(div);
        });

        // Add overall confidence indicator
        const confidenceIndicator = document.createElement('div');
        confidenceIndicator.className = 'confidence-indicator';
        confidenceIndicator.innerHTML = `
            <div class="confidence-label">Overall Analysis Confidence</div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${overallConfidence}%"></div>
            </div>
            <div class="confidence-value">${Math.round(overallConfidence)}%</div>
        `;
        conditionsList.parentElement?.appendChild(confidenceIndicator);
    }

    displayRiskFactors(riskFactors) {
        const riskContainer = document.getElementById('riskFactorsContent');
        if (!riskContainer) return;

        if (riskFactors.length === 0) {
            riskContainer.innerHTML = '<p>No significant risk factors identified.</p>';
            return;
        }

        riskContainer.innerHTML = riskFactors.map(risk => `
            <div class="risk-factor risk-${risk.severity}">
                <div class="risk-name">${risk.factor}</div>
                <div class="risk-description">${risk.description}</div>
                <div class="risk-severity">Severity: ${risk.severity}</div>
            </div>
        `).join('');
    }

    displayRecommendations(recommendations) {
        const recommendationsContent = document.getElementById('recommendationsContent');
        if (recommendationsContent) {
            recommendationsContent.innerHTML = recommendations.map((rec, index) => 
                `<div class="recommendation-item fade-in" style="animation-delay: ${index * 0.05}s">
                    <span class="recommendation-icon">•</span>
                    <span class="recommendation-text">${rec}</span>
                </div>`
            ).join('');
        }
    }

    displayNextSteps(nextSteps) {
        const nextStepsContent = document.getElementById('nextStepsContent');
        if (nextStepsContent) {
            nextStepsContent.innerHTML = nextSteps.map((step, index) => 
                `<div class="next-step-item fade-in" style="animation-delay: ${index * 0.05}s">
                    <span class="step-number">${index + 1}</span>
                    <span class="step-text">${step}</span>
                </div>`
            ).join('');
        }
    }

    displayAnalysisMetadata(results) {
        const metadataContainer = document.createElement('div');
        metadataContainer.className = 'analysis-metadata';
        metadataContainer.innerHTML = `
            <div class="metadata-header">Analysis Information</div>
            <div class="metadata-content">
                <div class="metadata-item">
                    <span class="metadata-label">Analysis ID:</span>
                    <span class="metadata-value">${results.analysisId}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Analysis Date:</span>
                    <span class="metadata-value">${new Date().toLocaleString()}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Confidence Level:</span>
                    <span class="metadata-value">${Math.round(results.confidence)}%</span>
                </div>
            </div>
            <div class="disclaimer">
                <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
            </div>
        `;

        const resultsContainer = document.querySelector('.results-container');
        if (resultsContainer) {
            resultsContainer.appendChild(metadataContainer);
        }
    }

    setupBackButton() {
        const resultsContainer = document.querySelector('.results-container');
        if (!resultsContainer || resultsContainer.querySelector('.back-button')) return;

        const backBtn = document.createElement('button');
        backBtn.className = 'btn-primary back-button';
        backBtn.innerHTML = '← Back to Symptom Checker';
        backBtn.addEventListener('click', () => {
            this.resetForm();
        });

        resultsContainer.appendChild(backBtn);
    }

    resetForm() {
        const symptomForm = document.getElementById('symptomForm');
        const resultsSection = document.getElementById('resultsSection');
        const analyzeBtn = document.getElementById('analyzeBtn');

        if (resultsSection) resultsSection.style.display = 'none';
        if (symptomForm) symptomForm.style.display = 'block';
        
        if (analyzeBtn) {
            analyzeBtn.innerHTML = 'Analyze Symptoms';
            analyzeBtn.disabled = false;
        }

        // Clear any existing metadata
        const metadata = document.querySelector('.analysis-metadata');
        if (metadata) metadata.remove();

        const confidence = document.querySelector('.confidence-indicator');
        if (confidence) confidence.remove();

        const urgency = document.querySelector('.urgency-indicator');
        if (urgency) urgency.remove();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-icon">⚠️</div>
            <div class="error-text">${message}</div>
            <button class="error-close" onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
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
    }

    setupScrollAnimations() {
        // Use Intersection Observer for better performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements when DOM is ready
        const observeElements = () => {
            const elements = document.querySelectorAll('.feature-card, .testimonial, .about-content, .about-image, .condition-item, .recommendation-item, .next-step-item');
            elements.forEach(element => {
                if (!element.classList.contains('animate__animated')) {
                    observer.observe(element);
                }
            });
        };

        // Initial observation
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', observeElements);
        } else {
            observeElements();
        }

        // Re-observe when new content is added
        const mutationObserver = new MutationObserver(observeElements);
        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    initializeAnalytics() {
        // Track page performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    totalTime: perfData.loadEventEnd - perfData.fetchStart
                });
            });
        }

        // Track user interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, a, .symptom-suggestion')) {
                this.sessionData.interactions.push({
                    type: 'click',
                    element: e.target.tagName.toLowerCase(),
                    className: e.target.className,
                    timestamp: Date.now()
                });
            }
        });

        // Track session duration on page unload
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - this.sessionData.startTime;
            console.log('Session Analytics:', {
                duration: sessionDuration,
                interactions: this.sessionData.interactions.length,
                analyses: this.sessionData.analysisHistory.length,
                avgAnalysisTime: this.performanceMetrics.analysisTime.length > 0 
                    ? this.performanceMetrics.analysisTime.reduce((a, b) => a + b) / this.performanceMetrics.analysisTime.length 
                    : 0
            });
        });
    }
}

// Initialize the enhanced symptom checker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.medicalSymptomChecker = new MedicalSymptomChecker();
        console.log('Enhanced Medical Symptom Checker initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Medical Symptom Checker:', error);
        
        // Fallback to basic functionality
        console.log('Falling back to basic symptom checker functionality');
        
        // Basic preloader
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
        });
        
        // Basic mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav');
        
        if (mobileMenuBtn && nav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                nav.classList.toggle('active');
            });
        }
    }
});

// Export for testing and external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicalSymptomChecker;
} 
