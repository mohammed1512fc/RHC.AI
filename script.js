// Rapid Health Checker AI - Advanced Symptom Checker
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const symptomDescription = document.getElementById('symptom-description');
    const charCount = document.getElementById('char-count');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const newAssessmentBtn = document.getElementById('new-assessment-btn');
    const downloadBtn = document.getElementById('download-btn');
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
    
    // Functions
    function updateCharCount() {
        const count = symptomDescription.value.length;
        charCount.textContent = count;
        
        if (count > 0) {
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }
    
    function setupEventListeners() {
        // Symptom description
        symptomDescription.addEventListener('input', updateCharCount);
        
        // Symptom tags
        symptomTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const currentText = symptomDescription.value;
                const tagText = tag.textContent;
                
                if (currentText.includes(tagText)) return;
                
                symptomDescription.value = currentText 
                    ? `${currentText}, ${tagText}`
                    : tagText;
                
                updateCharCount();
            });
        });
        
        // Navigation buttons
        nextBtn.addEventListener('click', goToStep2);
        backBtn.addEventListener('click', goBackToStep1);
        analyzeBtn.addEventListener('click', analyzeSymptoms);
        newAssessmentBtn.addEventListener('click', startNewAssessment);
        downloadBtn.addEventListener('click', downloadReport);
    }
    
    function goToStep2() {
        userSymptoms = symptomDescription.value.trim();
        
        if (!userSymptoms) return;
        
        // Show loading state
        questionsContainer.innerHTML = `
            <div class="loading-questions">
                <div class="spinner"></div>
                <p>Generating personalized questions based on your symptoms...</p>
            </div>
        `;
        
        // Simulate API call to generate questions
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
    
    function generateFollowUpQuestions() {
        // This would come from an actual API in production
        // For demo purposes, we're using mock questions based on symptoms
        const questions = getMockQuestions(userSymptoms);
        
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
                                   name="${questionId}" 
                                   value="${option.value}"
                                   ${option.value === userResponses[questionId] ? 'checked' : ''}>
                            <label for="${questionId}-${option.value}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Add event listeners to radio buttons
            const radioButtons = questionCard.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    userResponses[questionId] = e.target.value;
                });
            });
            
            questionsContainer.appendChild(questionCard);
        });
    }
    
    function analyzeSymptoms() {
        // Validate all questions are answered
        const unansweredQuestions = document.querySelectorAll('.question-card:not(:has(input[type="radio"]:checked))');
        
        if (unansweredQuestions.length > 0) {
            alert('Please answer all questions before analyzing.');
            return;
        }
        
        // Show loading state
        analyzeBtn.innerHTML = `<div class="spinner small"></div> Analyzing...`;
        analyzeBtn.disabled = true;
        
        // Simulate API call to analyze symptoms
        setTimeout(() => {
            aiAnalysis = getMockAnalysis(userSymptoms, userResponses);
            currentStep = 3;
            updateUI();
            displayResults();
        }, 2000);
    }
    
    function displayResults() {
        // Set report date and time
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
                        Probability: <span>${condition.probability}%</span>
                    </div>
                </div>
                <div class="condition-actions">
                    <button class="learn-more-btn" data-condition="${condition.name}">
                        Learn More
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
                <i class="fas ${rec.icon}"></i>
                <div class="recommendation-text">${rec.text}</div>
            `;
            recommendationsList.appendChild(recItem);
        });
    }
    
    function resetTriageLevels() {
        emergencyLevel.classList.add('hidden');
        urgentLevel.classList.add('hidden');
        routineLevel.classList.add('hidden');
        selfCareLevel.classList.add('hidden');
        emergencyWarning.classList.add('hidden');
    }
    
    function startNewAssessment() {
        // Reset everything
        currentStep = 1;
        userSymptoms = '';
        userResponses = {};
        aiAnalysis = null;
        
        // Clear inputs
        symptomDescription.value = '';
        questionsContainer.innerHTML = '';
        
        // Reset UI
        updateUI();
        updateCharCount();
        
        // Reset results
        conditionsList.innerHTML = '';
        recommendationsList.innerHTML = '';
        triageRecommendation.innerHTML = '';
        resetTriageLevels();
    }
    
    function downloadReport() {
        // In a real app, this would generate a PDF with all the analysis
        alert('In a production app, this would download a PDF report with your health assessment.');
    }
    
    function updateUI() {
        // Update active step
        descriptionStep.classList.toggle('active', currentStep === 1);
        questionsStep.classList.toggle('active', currentStep === 2);
        resultsStep.classList.toggle('active', currentStep === 3);
        
        // Update progress bar
        step1.classList.toggle('active', currentStep >= 1);
        step2.classList.toggle('active', currentStep >= 2);
        step3.classList.toggle('active', currentStep >= 3);
        
        // Reset button states
        if (currentStep === 2) {
            analyzeBtn.innerHTML = `Analyze Symptoms <i class="fas fa-bolt"></i>`;
            analyzeBtn.disabled = false;
        }
    }
    
    // Mock data functions (would be replaced with real API calls)
    function getMockQuestions(symptoms) {
        // In a real app, this would come from an AI API
        const commonQuestions = [
            {
                text: "How long have you been experiencing these symptoms?",
                id: "duration",
                options: [
                    { text: "Less than 24 hours", value: "<24h" },
                    { text: "1-3 days", value: "1-3d" },
                    { text: "4-7 days", value: "4-7d" },
                    { text: "More than 1 week", value: ">1w" }
                ]
            },
            {
                text: "How would you rate the severity of your symptoms?",
                id: "severity",
                options: [
                    { text: "Mild (noticeable but not bothersome)", value: "mild" },
                    { text: "Moderate (interferes with daily activities)", value: "moderate" },
                    { text: "Severe (prevents normal activities)", value: "severe" },
                    { text: "Worst possible", value: "extreme" }
                ]
            }
        ];
        
        // Add symptom-specific questions
        const symptomSpecific = [];
        
        if (symptoms.toLowerCase().includes('headache')) {
            symptomSpecific.push({
                text: "Where is your headache located?",
                id: "headache-location",
                options: [
                    { text: "One side of the head", value: "one-side" },
                    { text: "Both sides", value: "both-sides" },
                    { text: "Forehead", value: "forehead" },
                    { text: "Back of head", value: "back" }
                ]
            });
            
            symptomSpecific.push({
                text: "Does light or sound bother you more than usual when you have this headache?",
                id: "headache-sensitivity",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" },
                    { text: "I'm not sure", value: "unsure" }
                ]
            });
        }
        
        if (symptoms.toLowerCase().includes('fever')) {
            symptomSpecific.push({
                text: "Have you measured your temperature? If yes, what was it?",
                id: "fever-temp",
                options: [
                    { text: "Below 100°F (37.8°C)", value: "<100" },
                    { text: "100-102°F (37.8-38.9°C)", value: "100-102" },
                    { text: "Above 102°F (38.9°C)", value: ">102" },
                    { text: "I haven't measured", value: "unknown" }
                ]
            });
        }
        
        if (symptoms.toLowerCase().includes('chest pain')) {
            symptomSpecific.push({
                text: "Does the chest pain radiate to your arm, neck, or jaw?",
                id: "chest-pain-radiation",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" },
                    { text: "I'm not sure", value: "unsure" }
                ]
            });
            
            symptomSpecific.push({
                text: "Are you experiencing shortness of breath with the chest pain?",
                id: "chest-pain-breath",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" }
                ]
            });
        }
        
        return [...commonQuestions, ...symptomSpecific];
    }
    
    function getMockAnalysis(symptoms, responses) {
        // This would come from an AI API in production
        // For demo, we generate mock analysis based on symptoms and responses
        
        const hasEmergency = symptoms.toLowerCase().includes('chest pain') && 
                           responses['chest-pain-radiation'] === 'yes';
        
        const hasHeadache = symptoms.toLowerCase().includes('headache');
        const hasFever = symptoms.toLowerCase().includes('fever');
        
        const conditions = [];
        const recommendations = [];
        let triageLevel = 'self-care';
        let triageReason = '';
        let triageRec = '';
        
        // Determine conditions based on symptoms and responses
        if (hasEmergency) {
            conditions.push({
                name: "Possible Heart Attack",
                probability: "85",
                description: "Chest pain radiating to arm/jaw is a classic symptom of heart attack"
            });
            
            triageLevel = 'emergency';
            triageReason = 'Your symptoms suggest a possible heart attack which requires immediate medical attention.';
            triageRec = 'Call emergency services immediately. Do not drive yourself to the hospital. Chew one adult aspirin (325 mg) if available and you are not allergic.';
            
            recommendations.push(
                { icon: 'fa-ambulance', text: 'Call 911 or your local emergency number immediately' },
                { icon: 'fa-procedures', text: 'Do not attempt to drive yourself to the hospital' },
                { icon: 'fa-user-md', text: 'Inform emergency responders about your symptoms and that you may be having a heart attack' }
            );
        } 
        else if (hasHeadache && hasFever) {
            conditions.push(
                {
                    name: "Viral Infection",
                    probability: "65",
                    description: "Headache with fever is commonly caused by viral infections"
                },
                {
                    name: "Sinusitis",
                    probability: "45",
                    description: "Inflamed sinuses can cause headache and low-grade fever"
                },
                {
                    name: "Meningitis",
                    probability: "15",
                    description: "Serious infection of the brain and spinal cord lining"
                }
            );
            
            if (responses['headache-sensitivity'] === 'yes') {
                conditions.find(c => c.name === 'Meningitis').probability = '35';
                triageLevel = 'urgent';
                triageReason = 'Headache with fever and sensitivity to light could indicate meningitis.';
                triageRec = 'You should seek medical evaluation within the next 4-6 hours. If symptoms worsen, go to the emergency department immediately.';
                
                recommendations.push(
                    { icon: 'fa-calendar-plus', text: 'Schedule an urgent appointment with your doctor today' },
                    { icon: 'fa-prescription-bottle-alt', text: 'Take acetaminophen or ibuprofen for pain and fever as directed' },
                    { icon: 'fa-eye', text: 'Monitor for worsening symptoms like confusion, stiff neck, or rash' }
                );
            } else {
                triageLevel = 'routine';
                triageReason = 'Your symptoms are likely caused by a viral infection.';
                triageRec = 'Schedule an appointment with your doctor in the next 1-2 days if symptoms persist. Rest and stay hydrated.';
                
                recommendations.push(
                    { icon: 'fa-bed', text: 'Get plenty of rest and stay hydrated' },
                    { icon: 'fa-prescription-bottle-alt', text: 'Take acetaminophen or ibuprofen for pain and fever as directed' },
                    { icon: 'fa-calendar-check', text: 'See a doctor if symptoms last more than 3 days or worsen' }
                );
            }
        } 
        else if (hasHeadache) {
            conditions.push(
                {
                    name: "Tension Headache",
                    probability: "75",
                    description: "Most common type of headache, often stress-related"
                },
                {
                    name: "Migraine",
                    probability: "40",
                    description: "Recurrent headaches that can cause throbbing pain"
                },
                {
                    name: "Cluster Headache",
                    probability: "10",
                    description: "Severe headaches that occur in cyclical patterns"
                }
            );
            
            triageLevel = 'self-care';
            triageReason = 'Your headache is likely not serious, but monitor for changes.';
            triageRec = 'Try rest, hydration, and over-the-counter pain relievers. See a doctor if headaches persist or worsen.';
            
            recommendations.push(
                { icon: 'fa-glass-whiskey', text: 'Drink plenty of water to stay hydrated' },
                { icon: 'fa-prescription-bottle-alt', text: 'Take ibuprofen or acetaminophen as directed' },
                { icon: 'fa-bed', text: 'Rest in a quiet, dark room' },
                { icon: 'fa-calendar-check', text: 'See a doctor if headaches become frequent or severe' }
            );
        } 
        else {
            conditions.push({
                name: "Viral Upper Respiratory Infection",
                probability: "80",
                description: "Common cold caused by a virus"
            });
            
            triageLevel = 'self-care';
            triageReason = 'Your symptoms suggest a minor viral infection.';
            triageRec = 'Rest, stay hydrated, and use over-the-counter remedies as needed. See a doctor if symptoms persist beyond 10 days.';
            
            recommendations.push(
                { icon: 'fa-glass-whiskey', text: 'Drink plenty of fluids' },
                { icon: 'fa-bed', text: 'Get adequate rest' },
                { icon: 'fa-prescription-bottle-alt', text: 'Use over-the-counter cold remedies as needed' },
                { icon: 'fa-hand-sparkles', text: 'Wash hands frequently to prevent spreading' }
            );
        }
        
        // Add general recommendations
        recommendations.push(
            { icon: 'fa-notes-medical', text: 'Keep track of your symptoms and any changes' },
            { icon: 'fa-heartbeat', text: 'Monitor for new or worsening symptoms' }
        );
        
        return {
            symptoms: symptoms,
            responses: responses,
            conditions: conditions,
            recommendations: recommendations,
            triage: {
                level: triageLevel,
                reason: triageReason,
                recommendation: triageRec
            }
        };
    }
}); 
