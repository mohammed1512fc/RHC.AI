// Rapid Health Checker AI - Advanced Medical Intelligence Engine
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const symptomDescription = document.getElementById('symptom-description');
    const charCount = document.getElementById('char-count');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const newAssessmentBtn = document.getElementById('new-assessment-btn');
    const downloadBtn = document.getElementById('download-report-btn');
    const descriptionStep = document.getElementById('description-step');
    const questionsStep = document.getElementById('questions-step');
    const resultsStep = document.getElementById('results-step');
    const questionsContainer = document.getElementById('questions-container');
    const conditionsList = document.getElementById('conditions-list');
    const recommendationsList = document.getElementById('recommendations-list');
    const triageRecommendation = document.getElementById('triage-recommendation');
    const emergencyWarning = document.getElementById('emergency-warning');
    const emergencyReason = document.getElementById('emergency-reason');
    const reportDate = document.getElementById('report-date');
    const reportTime = document.getElementById('report-time');
    const symptomTags = document.querySelectorAll('.symptom-tag');
    
    // Triage level elements
    const emergencyLevel = document.getElementById('emergency-level');
    const urgentLevel = document.getElementById('urgent-level');
    const routineLevel = document.getElementById('routine-level');
    const selfCareLevel = document.getElementById('selfcare-level');
    
    // Progress steps
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    
    // Current state
    let currentStep = 1;
    let userSymptoms = '';
    let userResponses = {};
    let aiAnalysis = null;
    
    // Initialize
    updateCharCount();
    setupEventListeners();
    
    // ========================
    // CORE FUNCTIONS
    // ========================
    
    function updateCharCount() {
        const count = symptomDescription.value.length;
        charCount.textContent = count;
        nextBtn.disabled = count === 0;
    }
    
    function setupEventListeners() {
        symptomDescription.addEventListener('input', updateCharCount);
        
        symptomTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const currentText = symptomDescription.value;
                const tagText = tag.textContent;
                
                if (!currentText.includes(tagText)) {
                    symptomDescription.value = currentText 
                        ? `${currentText}, ${tagText}`
                        : tagText;
                    updateCharCount();
                }
            });
        });
        
        nextBtn.addEventListener('click', goToStep2);
        backBtn.addEventListener('click', goBackToStep1);
        analyzeBtn.addEventListener('click', analyzeSymptoms);
        newAssessmentBtn.addEventListener('click', startNewAssessment);
        downloadBtn.addEventListener('click', generatePDFReport);
    }
    
    function goToStep2() {
        userSymptoms = symptomDescription.value.trim();
        
        if (!userSymptoms) return;
        
        // Show loading state
        questionsContainer.innerHTML = `
            <div class="loading-questions">
                <div class="spinner"></div>
                <p>Our AI is generating personalized questions based on your symptoms...</p>
            </div>
        `;
        
        // Simulate AI processing
        setTimeout(() => {
            generateFollowUpQuestions();
            currentStep = 2;
            updateUI();
        }, 1500);
    }
    
    function goBackToStep1() {
        currentStep = 1;
        updateUI();
    }
    
    function analyzeSymptoms() {
        const unansweredQuestions = document.querySelectorAll('.question-card:not(:has(input[type="radio"]:checked))');
        
        if (unansweredQuestions.length > 0) {
            showAlert('Please answer all questions before analyzing.');
            return;
        }
        
        // Show loading state
        analyzeBtn.innerHTML = `<div class="spinner small"></div> Analyzing with Medical AI...`;
        analyzeBtn.disabled = true;
        
        // Simulate AI processing
        setTimeout(() => {
            aiAnalysis = analyzeSymptomsWithAI(userSymptoms, userResponses);
            currentStep = 3;
            updateUI();
            displayResults();
        }, 2000);
    }
    
    function displayResults() {
        const now = new Date();
        reportDate.textContent = now.toLocaleDateString();
        reportTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Set triage level
        resetTriageLevels();
        switch(aiAnalysis.triage.level) {
            case 'emergency':
                emergencyLevel.classList.remove('hidden');
                emergencyWarning.classList.remove('hidden');
                emergencyReason.textContent = aiAnalysis.triage.reason;
                break;
            case 'urgent':
                urgentLevel.classList.remove('hidden');
                break;
            case 'routine':
                routineLevel.classList.remove('hidden');
                break;
            case 'self-care':
                selfCareLevel.classList.remove('hidden');
                break;
        }
        
        triageRecommendation.innerHTML = aiAnalysis.triage.recommendation;
        
        // Display possible conditions
        conditionsList.innerHTML = '';
        aiAnalysis.conditions.forEach(condition => {
            const conditionItem = document.createElement('div');
            conditionItem.className = 'condition-item';
            conditionItem.innerHTML = `
                <div class="condition-info">
                    <div class="condition-name">${condition.name}</div>
                    <div class="condition-probability">
                        <div class="probability-bar" style="width: ${condition.probability}%"></div>
                        <span>${condition.probability}% probability</span>
                    </div>
                    ${condition.description ? `<div class="condition-description">${condition.description}</div>` : ''}
                </div>
                <div class="condition-actions">
                    <button class="learn-more-btn" data-condition="${condition.name}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            `;
            conditionsList.appendChild(conditionItem);
        });
        
        // Display recommendations
        recommendationsList.innerHTML = '';
        aiAnalysis.recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = 'recommendation-item';
            recItem.innerHTML = `
                <div class="recommendation-icon">
                    <i class="fas ${rec.icon}"></i>
                </div>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.text}</p>
                    ${rec.details ? `<div class="recommendation-details">${rec.details}</div>` : ''}
                </div>
            `;
            recommendationsList.appendChild(recItem);
        });
        
        // Add event listeners to learn more buttons
        document.querySelectorAll('.learn-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const condition = e.target.closest('button').dataset.condition;
                showConditionDetails(condition);
            });
        });
    }
    
    function showConditionDetails(conditionName) {
        const condition = aiAnalysis.conditions.find(c => c.name === conditionName);
        if (!condition) return;
        
        const detailsHtml = `
            <div class="condition-details">
                <h3>${condition.name}</h3>
                <div class="probability-display">
                    <span class="probability-value">${condition.probability}%</span>
                    <span class="probability-label">Probability</span>
                </div>
                <div class="condition-description">
                    <h4>Description</h4>
                    <p>${condition.description || 'No additional description available.'}</p>
                </div>
                ${condition.causes ? `
                <div class="condition-causes">
                    <h4>Possible Causes</h4>
                    <ul>
                        ${condition.causes.map(cause => `<li>${cause}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                ${condition.when_to_see_doctor ? `
                <div class="condition-warning">
                    <h4>When to See a Doctor</h4>
                    <p>${condition.when_to_see_doctor}</p>
                </div>
                ` : ''}
                <button class="close-details-btn">Close</button>
            </div>
        `;
        
        showModal(detailsHtml);
    }
    
    function showModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                ${content}
            </div>
        `;
        
        modal.querySelector('.close-details-btn')?.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        document.body.appendChild(modal);
    }
    
    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert-message';
        alert.textContent = message;
        
        document.body.appendChild(alert);
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 3000);
    }
    
    function resetTriageLevels() {
        emergencyLevel.classList.add('hidden');
        urgentLevel.classList.add('hidden');
        routineLevel.classList.add('hidden');
        selfCareLevel.classList.add('hidden');
        emergencyWarning.classList.add('hidden');
    }
    
    function startNewAssessment() {
        currentStep = 1;
        userSymptoms = '';
        userResponses = {};
        aiAnalysis = null;
        symptomDescription.value = '';
        questionsContainer.innerHTML = '';
        updateUI();
        updateCharCount();
        conditionsList.innerHTML = '';
        recommendationsList.innerHTML = '';
        triageRecommendation.innerHTML = '';
        resetTriageLevels();
    }
    
    function generatePDFReport() {
        // In a real app, this would generate a PDF with jsPDF or similar
        showAlert('PDF report generation would be implemented in production');
    }
    
    function updateUI() {
        descriptionStep.classList.toggle('active', currentStep === 1);
        questionsStep.classList.toggle('active', currentStep === 2);
        resultsStep.classList.toggle('active', currentStep === 3);
        
        step1.classList.toggle('active', currentStep >= 1);
        step2.classList.toggle('active', currentStep >= 2);
        step3.classList.toggle('active', currentStep >= 3);
        
        if (currentStep === 2) {
            analyzeBtn.innerHTML = `Analyze Symptoms <i class="fas fa-bolt"></i>`;
            analyzeBtn.disabled = false;
        }
    }

    // ========================
    // MEDICAL AI ENGINE
    // ========================
    
    function analyzeSymptomsWithAI(symptoms, responses) {
        const symptomsLower = symptoms.toLowerCase();
        const analysis = {
            conditions: [],
            recommendations: [],
            triage: {
                level: 'self-care',
                reason: '',
                recommendation: ''
            }
        };

        // Medical knowledge base
        const CONDITIONS = {
            // Emergency conditions
            HEART_ATTACK: {
                name: "Acute Coronary Syndrome (Possible Heart Attack)",
                probability: 85,
                description: "Blockage of blood flow to the heart muscle causing chest pain and other symptoms",
                causes: [
                    "Coronary artery disease",
                    "Blood clot in coronary artery",
                    "Coronary artery spasm"
                ],
                when_to_see_doctor: "Immediately call emergency services if you experience chest pain with radiation to arm/jaw, shortness of breath, or nausea."
            },
            STROKE: {
                name: "Acute Ischemic Stroke",
                probability: 80,
                description: "Blockage of blood flow to part of the brain causing neurological symptoms",
                causes: [
                    "Blood clot in brain artery",
                    "Atherosclerosis in cerebral arteries",
                    "Cardioembolism from heart conditions"
                ],
                when_to_see_doctor: "Immediate emergency care required for any sudden neurological symptoms (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency)"
            },
            
            // Cardiovascular
            ANGINA: {
                name: "Stable Angina Pectoris",
                probability: 70,
                description: "Chest pain caused by reduced blood flow to the heart muscle",
                causes: [
                    "Coronary artery disease",
                    "Atherosclerosis",
                    "Coronary artery spasm"
                ],
                when_to_see_doctor: "Within 24 hours for new onset chest pain, or immediately if pain worsens"
            },
            ARRHYTHMIA: {
                name: "Cardiac Arrhythmia",
                probability: 65,
                description: "Abnormal heart rhythm that may cause palpitations, dizziness or chest discomfort",
                causes: [
                    "Electrical conduction system abnormalities",
                    "Heart disease",
                    "Electrolyte imbalances"
                ],
                when_to_see_doctor: "Within 24 hours for new palpitations with dizziness or chest pain"
            },
            
            // Neurological
            MIGRAINE: {
                name: "Vestibular Migraine",
                probability: 75,
                description: "Migraine variant causing dizziness and nausea, often without headache",
                causes: [
                    "Genetic predisposition",
                    "Triggers like stress, certain foods, or hormonal changes"
                ],
                when_to_see_doctor: "If symptoms are new, worsening, or don't respond to usual treatments"
            },
            BPPV: {
                name: "Benign Paroxysmal Positional Vertigo (BPPV)",
                probability: 80,
                description: "Inner ear disorder causing brief episodes of vertigo with head movements",
                causes: [
                    "Displaced otoconia in semicircular canals",
                    "Head trauma",
                    "Viral inner ear infection"
                ],
                when_to_see_doctor: "If vertigo persists beyond a few days or is accompanied by hearing loss"
            },
            
            // Gastrointestinal
            GASTROENTERITIS: {
                name: "Viral Gastroenteritis",
                probability: 85,
                description: "Stomach flu causing nausea, vomiting and diarrhea",
                causes: [
                    "Norovirus",
                    "Rotavirus",
                    "Foodborne pathogens"
                ],
                when_to_see_doctor: "If symptoms persist beyond 3 days or signs of dehydration appear"
            },
            GERD: {
                name: "Gastroesophageal Reflux Disease (GERD)",
                probability: 75,
                description: "Chronic acid reflux causing heartburn and nausea",
                causes: [
                    "Weak lower esophageal sphincter",
                    "Hiatal hernia",
                    "Dietary triggers"
                ],
                when_to_see_doctor: "If symptoms occur more than twice weekly or don't respond to antacids"
            },
            
            // Respiratory
            PNEUMONIA: {
                name: "Community-Acquired Pneumonia",
                probability: 70,
                description: "Lung infection causing cough, fever and difficulty breathing",
                causes: [
                    "Bacterial (e.g., Streptococcus pneumoniae)",
                    "Viral (e.g., influenza)",
                    "Fungal infections"
                ],
                when_to_see_doctor: "If fever >102°F (39°C), difficulty breathing, or symptoms worsen after initial improvement"
            },
            
            // Other
            ANXIETY: {
                name: "Anxiety/Panic Disorder",
                probability: 65,
                description: "Psychological condition causing physical symptoms including dizziness and chest discomfort",
                causes: [
                    "Genetic factors",
                    "Environmental stressors",
                    "Neurochemical imbalances"
                ],
                when_to_see_doctor: "If symptoms interfere with daily life or occur frequently"
            },
            DEHYDRATION: {
                name: "Moderate Dehydration",
                probability: 80,
                description: "Inadequate fluid intake causing dizziness, fatigue and dark urine",
                causes: [
                    "Insufficient water intake",
                    "Excessive sweating",
                    "Vomiting/diarrhea"
                ],
                when_to_see_doctor: "If unable to keep fluids down or signs of severe dehydration (no urine for 8+ hours, extreme weakness)"
            }
        };

        // Symptom pattern detection
        const symptomPatterns = [
            // Emergency patterns
            {
                pattern: (s) => s.includes('chest pain') && 
                        (responses['chest-pain-radiation'] === 'yes' || 
                         s.includes('shortness of breath')),
                condition: CONDITIONS.HEART_ATTACK,
                triage: {
                    level: 'emergency',
                    reason: 'Symptoms suggest possible acute coronary syndrome (heart attack)',
                    recommendation: 'Call emergency services immediately. Do not drive yourself. Chew 325mg aspirin if available and not allergic.'
                },
                recommendations: [
                    {
                        icon: 'fa-ambulance',
                        title: 'Emergency Action',
                        text: 'Call 911 or local emergency number immediately',
                        details: 'Describe your symptoms clearly to the dispatcher'
                    },
                    {
                        icon: 'fa-pills',
                        title: 'Medication',
                        text: 'Chew one adult aspirin (325mg) if available',
                        details: 'Only if not allergic to aspirin'
                    },
                    {
                        icon: 'fa-couch',
                        title: 'Positioning',
                        text: 'Sit or lie down while waiting for help',
                        details: 'Avoid unnecessary movement'
                    }
                ]
            },
            {
                pattern: (s) => (s.includes('dizziness') && s.includes('confusion')) ||
                               s.includes('slurred speech') || 
                               s.includes('facial droop'),
                condition: CONDITIONS.STROKE,
                triage: {
                    level: 'emergency',
                    reason: 'Neurological symptoms suggest possible stroke',
                    recommendation: 'Call emergency services immediately. Note time of symptom onset (critical for treatment).'
                },
                recommendations: [
                    {
                        icon: 'fa-ambulance',
                        title: 'Emergency Action',
                        text: 'Call emergency services immediately',
                        details: 'Use the word "stroke" when describing symptoms'
                    },
                    {
                        icon: 'fa-clock',
                        title: 'Time Tracking',
                        text: 'Note exact time symptoms began',
                        details: 'Critical for determining treatment options'
                    },
                    {
                        icon: 'fa-ban',
                        title: 'Precautions',
                        text: 'Do not eat or drink anything',
                        details: 'In case swallowing is affected'
                    }
                ]
            },
            
            // Cardiovascular patterns
            {
                pattern: (s) => s.includes('chest pain') && 
                               !s.includes('shortness of breath') &&
                               responses['chest-pain-duration'] === '<10min',
                condition: CONDITIONS.ANGINA,
                triage: {
                    level: 'urgent',
                    reason: 'Symptoms suggest possible angina',
                    recommendation: 'Seek medical evaluation within 4-6 hours. Avoid physical exertion.'
                },
                recommendations: [
                    {
                        icon: 'fa-calendar-plus',
                        title: 'Medical Evaluation',
                        text: 'See a doctor within 4-6 hours',
                        details: 'Urgent care or emergency department'
                    },
                    {
                        icon: 'fa-heartbeat',
                        title: 'Monitoring',
                        text: 'Watch for worsening symptoms',
                        details: 'Especially shortness of breath or pain lasting >10min'
                    },
                    {
                        icon: 'fa-couch',
                        title: 'Activity',
                        text: 'Rest until evaluated',
                        details: 'Avoid physical exertion'
                    }
                ]
            },
            {
                pattern: (s) => s.includes('dizziness') && 
                               s.includes('palpitations'),
                condition: CONDITIONS.ARRHYTHMIA,
                triage: {
                    level: 'urgent',
                    reason: 'Symptoms suggest possible cardiac arrhythmia',
                    recommendation: 'Seek medical evaluation within 4-6 hours. Try to document your pulse if possible.'
                },
                recommendations: [
                    {
                        icon: 'fa-heartbeat',
                        title: 'Pulse Check',
                        text: 'Try to measure your pulse rate',
                        details: 'Note if it feels regular or irregular'
                    },
                    {
                        icon: 'fa-calendar-plus',
                        title: 'Medical Evaluation',
                        text: 'See a doctor within 4-6 hours',
                        details: 'Cardiac evaluation recommended'
                    },
                    {
                        icon: 'fa-ban',
                        title: 'Avoid',
                        text: 'Avoid caffeine and stimulants',
                        details: 'These may worsen arrhythmias'
                    }
                ]
            },
            
            // Neurological patterns
            {
                pattern: (s) => s.includes('dizziness') && 
                               (s.includes('spinning') || s.includes('room spinning')) &&
                               responses['head-movement'] === 'yes',
                condition: CONDITIONS.BPPV,
                triage: {
                    level: 'routine',
                    reason: 'Symptoms suggest benign positional vertigo',
                    recommendation: 'See a doctor within 1-2 days. Try Epley maneuver if diagnosed.'
                },
                recommendations: [
                    {
                        icon: 'fa-bed',
                        title: 'Positioning',
                        text: 'Move slowly to avoid triggering dizziness',
                        details: 'Especially when turning in bed or looking up'
                    },
                    {
                        icon: 'fa-book-medical',
                        title: 'Treatment',
                        text: 'Research the Epley maneuver',
                        details: 'Only perform if properly diagnosed'
                    },
                    {
                        icon: 'fa-calendar-check',
                        title: 'Follow-up',
                        text: 'See a doctor if symptoms persist',
                        details: 'ENT or neurologist recommended'
                    }
                ]
            },
            {
                pattern: (s) => s.includes('dizziness') && 
                               s.includes('nausea') &&
                               !s.includes('chest pain'),
                condition: CONDITIONS.MIGRAINE,
                triage: {
                    level: 'routine',
                    reason: 'Symptoms suggest vestibular migraine',
                    recommendation: 'Consider migraine treatments if diagnosed. See doctor if symptoms persist.'
                },
                recommendations: [
                    {
                        icon: 'fa-pills',
                        title: 'Medication',
                        text: 'Consider OTC migraine relief',
                        details: 'If previously diagnosed with migraines'
                    },
                    {
                        icon: 'fa-cloud-sun',
                        title: 'Environment',
                        text: 'Rest in quiet, dark room',
                        details: 'Reduces sensory stimulation'
                    },
                    {
                        icon: 'fa-calendar-check',
                        title: 'Follow-up',
                        text: 'See doctor if symptoms persist',
                        details: 'Neurologist recommended for chronic cases'
                    }
                ]
            },
            
            // Gastrointestinal patterns
            {
                pattern: (s) => s.includes('nausea') && 
                               (s.includes('vomiting') || s.includes('diarrhea')),
                condition: CONDITIONS.GASTROENTERITIS,
                triage: {
                    level: 'self-care',
                    reason: 'Symptoms suggest viral gastroenteritis',
                    recommendation: 'Stay hydrated with small sips of clear fluids. Seek care if symptoms persist >3 days.'
                },
                recommendations: [
                    {
                        icon: 'fa-tint',
                        title: 'Hydration',
                        text: 'Drink small amounts of clear fluids frequently',
                        details: 'Water, broth, or oral rehydration solutions'
                    },
                    {
                        icon: 'fa-utensils',
                        title: 'Diet',
                        text: 'Follow BRAT diet when able to eat',
                        details: 'Bananas, rice, applesauce, toast'
                    },
                    {
                        icon: 'fa-ban',
                        title: 'Avoid',
                        text: 'Avoid dairy and fatty foods',
                        details: 'Until symptoms fully resolve'
                    }
                ]
            },
            {
                pattern: (s) => s.includes('nausea') && 
                               s.includes('heartburn'),
                condition: CONDITIONS.GERD,
                triage: {
                    level: 'routine',
                    reason: 'Symptoms suggest acid reflux',
                    recommendation: 'Try antacids and dietary changes. See doctor if symptoms persist.'
                },
                recommendations: [
                    {
                        icon: 'fa-pills',
                        title: 'Medication',
                        text: 'Try OTC antacids or H2 blockers',
                        details: 'Follow package instructions'
                    },
                    {
                        icon: 'fa-utensils',
                        title: 'Diet',
                        text: 'Avoid acidic/spicy foods',
                        details: 'Especially before bedtime'
                    },
                    {
                        icon: 'fa-bed',
                        title: 'Positioning',
                        text: 'Elevate head of bed',
                        details: 'Reduces nighttime reflux'
                    }
                ]
            },
            
            // Default pattern (viral URI)
            {
                pattern: () => true,
                condition: {
                    name: "Viral Upper Respiratory Infection",
                    probability: 60,
                    description: "Common cold caused by a virus"
                },
                triage: {
                    level: 'self-care',
                    reason: 'Symptoms suggest minor viral infection',
                    recommendation: 'Rest, stay hydrated, and use OTC remedies as needed. See doctor if symptoms persist >10 days.'
                },
                recommendations: [
                    {
                        icon: 'fa-bed',
                        title: 'Rest',
                        text: 'Get plenty of rest',
                        details: 'Adequate sleep supports immune function'
                    },
                    {
                        icon: 'fa-tint',
                        title: 'Hydration',
                        text: 'Stay well hydrated',
                        details: 'Water, tea, or broth recommended'
                    },
                    {
                        icon: 'fa-pills',
                        title: 'Symptom Relief',
                        text: 'Use OTC remedies as needed',
                        details: 'For fever, congestion, or sore throat'
                    }
                ]
            }
        ];

        // Find matching pattern
        const matchedPattern = symptomPatterns.find(p => p.pattern(symptomsLower));
        
        // Set analysis based on matched pattern
        analysis.conditions.push(matchedPattern.condition);
        analysis.triage = matchedPattern.triage;
        analysis.recommendations = matchedPattern.recommendations;

        // Add secondary conditions when appropriate
        if (symptomsLower.includes('fever') && symptomsLower.includes('cough')) {
            analysis.conditions.push({
                ...CONDITIONS.PNEUMONIA,
                probability: Math.min(60, matchedPattern.condition.probability - 15)
            });
        }

        if (symptomsLower.includes('dizziness') && symptomsLower.includes('anxiety'))) {
            analysis.conditions.push({
                ...CONDITIONS.ANXIETY,
                probability: Math.min(70, matchedPattern.condition.probability - 10)
            });
        }

        if (symptomsLower.includes('dizziness') && symptomsLower.includes('thirst'))) {
            analysis.conditions.push({
                ...CONDITIONS.DEHYDRATION,
                probability: Math.min(75, matchedPattern.condition.probability - 5)
            });
        }

        // Sort conditions by probability
        analysis.conditions.sort((a, b) => b.probability - a.probability);

        // Add standard recommendations
        analysis.recommendations.push(
            {
                icon: 'fa-notes-medical',
                title: 'Monitoring',
                text: 'Keep symptom diary',
                details: 'Track severity and frequency of symptoms'
            },
            {
                icon: 'fa-heartbeat',
                title: 'Follow-up',
                text: 'Monitor for changes',
                details: 'Seek care if symptoms worsen or new symptoms appear'
            }
        );

        return {
            symptoms: symptoms,
            responses: responses,
            ...analysis
        };
    }

    function generateFollowUpQuestions() {
        const symptomsLower = userSymptoms.toLowerCase();
        const questions = [];

        // Core questions
        questions.push({
            text: "How long have you been experiencing these symptoms?",
            id: "duration",
            options: [
                { text: "Less than 1 hour", value: "<1h" },
                { text: "1-24 hours", value: "1-24h" },
                { text: "1-3 days", value: "1-3d" },
                { text: "4-7 days", value: "4-7d" },
                { text: "More than 1 week", value: ">1w" }
            ]
        });

        questions.push({
            text: "How would you rate the severity of your symptoms?",
            id: "severity",
            options: [
                { text: "Mild (noticeable but not bothersome)", value: "mild" },
                { text: "Moderate (interferes with daily activities)", value: "moderate" },
                { text: "Severe (prevents normal activities)", value: "severe" },
                { text: "Worst possible", value: "extreme" }
            ]
        });

        // Symptom-specific questions
        if (symptomsLower.includes('chest pain')) {
            questions.push({
                text: "Does the chest pain radiate to your arm, neck, or jaw?",
                id: "chest-pain-radiation",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" },
                    { text: "I'm not sure", value: "unsure" }
                ]
            });

            questions.push({
                text: "How long does the chest pain typically last?",
                id: "chest-pain-duration",
                options: [
                    { text: "Less than 1 minute", value: "<1min" },
                    { text: "1-10 minutes", value: "1-10min" },
                    { text: "10-30 minutes", value: "10-30min" },
                    { text: "More than 30 minutes", value: ">30min" }
                ]
            });
        }

        if (symptomsLower.includes('dizziness')) {
            questions.push({
                text: "Does the dizziness feel like spinning or the room moving?",
                id: "spinning",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" },
                    { text: "I'm not sure", value: "unsure" }
                ]
            });

            questions.push({
                text: "Is the dizziness triggered by head movement?",
                id: "head-movement",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" },
                    { text: "Sometimes", value: "sometimes" }
                ]
            });
        }

        if (symptomsLower.includes('nausea')) {
            questions.push({
                text: "Have you vomited in the last 24 hours?",
                id: "vomiting",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" }
                ]
            });
        }

        if (symptomsLower.includes('headache')) {
            questions.push({
                text: "Where is your headache located?",
                id: "headache-location",
                options: [
                    { text: "One side of the head", value: "one-side" },
                    { text: "Both sides", value: "both-sides" },
                    { text: "Forehead", value: "forehead" },
                    { text: "Back of head", value: "back" }
                ]
            });
        }

        // Render questions
        questionsContainer.innerHTML = '';
        questions.forEach((question, index) => {
            const questionId = `question-${index}`;
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.innerHTML = `
                <div class="question-text">${question.text}</div>
                <div class="answer-options">
                    ${question.options.map(option => `
                        <div class="answer-option">
                            <input type="radio" 
                                   id="${questionId}-${option.value}" 
                                   name="${question.id}" 
                                   value="${option.value}"
                                   ${option.value === userResponses[question.id] ? 'checked' : ''}>
                            <label for="${questionId}-${option.value}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Add event listeners to radio buttons
            const radioButtons = questionCard.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    userResponses[question.id] = e.target.value;
                });
            });
            
            questionsContainer.appendChild(questionCard);
        });
    }
}); 
