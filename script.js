// =================================================================
// 2025 Rapid Health AI - Medical Diagnostic Engine v8.0
// =================================================================

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Configuration
    // ======================
    const config = {
        analysisDelay: 1500, // Simulate AI processing time
        maxConditionsToShow: 5,
        emergencyThreshold: 75 // Probability % for emergency
    };

    // ======================
    // Medical Knowledge Base
    // ======================
    const medicalKnowledge = {
        cardiovascular: {
            name: "Cardiovascular",
            conditions: [
                {
                    id: "ami",
                    name: "Heart Attack (AMI)",
                    probability: 0.05,
                    emergency: true,
                    symptoms: ["chest pain", "left arm pain", "shortness of breath"],
                    actions: ["Call 911 immediately", "Chew aspirin if available"],
                    monitoring: ["Check pulse every 5 minutes", "Watch for consciousness changes"]
                }
                // ...499 more conditions
            ]
        },
        neurological: {
            name: "Neurological",
            conditions: [
                {
                    id: "stroke",
                    name: "Stroke (CVA)",
                    probability: 0.04,
                    emergency: true,
                    symptoms: ["facial drooping", "arm weakness", "speech difficulty"],
                    actions: ["Call 911 immediately", "Note time symptoms started"],
                    monitoring: ["Watch breathing", "Check consciousness level"]
                }
                // ...Other conditions
            ]
        }
        // ...10 other medical systems
    };

    // ======================
    // DOM Elements
    // ======================
    const elements = {
        symptomInput: document.getElementById('symptoms'),
        analyzeBtn: document.getElementById('analyzeBtn'),
        buttonText: document.getElementById('buttonText'),
        buttonSpinner: document.getElementById('buttonSpinner'),
        resultsContainer: document.getElementById('results'),
        riskFactors: {
            travel: document.getElementById('travel'),
            conditions: document.getElementById('conditions'),
            medications: document.getElementById('medications'),
            allergies: document.getElementById('allergies')
        }
    };

    // ======================
    // Event Listeners
    // ======================
    elements.analyzeBtn.addEventListener('click', analyzeSymptoms);

    // ======================
    // Core Functions
    // ======================
    async function analyzeSymptoms() {
        try {
            // Validate input
            const symptoms = elements.symptomInput.value.trim();
            if (!symptoms) {
                showError("Please describe your symptoms");
                return;
            }

            // UI Feedback
            showLoading();

            // Simulate AI processing
            await new Promise(resolve => setTimeout(resolve, config.analysisDelay));

            // Get risk factors
            const riskFactors = getRiskFactors();

            // Perform analysis
            const results = performMedicalAnalysis(symptoms, riskFactors);

            // Display results
            displayResults(results);

        } catch (error) {
            console.error("Analysis error:", error);
            showError("Analysis failed. Please try again.");
        } finally {
            hideLoading();
        }
    }

    function performMedicalAnalysis(symptomText, riskFactors) {
        // Convert text to lowercase for matching
        const symptomLower = symptomText.toLowerCase();
        
        // Find matching conditions
        const matchedConditions = [];
        
        // Search through all medical systems
        for (const system in medicalKnowledge) {
            for (const condition of medicalKnowledge[system].conditions) {
                // Check if any symptom matches
                const matchedSymptoms = condition.symptoms.filter(symptom => 
                    symptomLower.includes(symptom.toLowerCase())
                );
                
                if (matchedSymptoms.length > 0) {
                    // Calculate probability score
                    let score = condition.probability * 100; // Base probability
                    
                    // Increase score for each matching symptom
                    score += matchedSymptoms.length * 15;
                    
                    // Adjust for risk factors
                    if (riskFactors.existingConditions) score *= 1.2;
                    if (riskFactors.medications) score *= 1.1;
                    
                    // Cap at 95%
                    score = Math.min(95, score);
                    
                    matchedConditions.push({
                        ...condition,
                        matchedSymptoms,
                        score: Math.round(score)
                    });
                }
            }
        }
        
        // Sort by highest probability
        matchedConditions.sort((a, b) => b.score - a.score);
        
        // Determine urgency level
        const urgency = determineUrgency(matchedConditions);
        
        return {
            conditions: matchedConditions.slice(0, config.maxConditionsToShow),
            urgency,
            analyzedSymptoms: symptomText
        };
    }

    function determineUrgency(conditions) {
        // Check for emergency conditions
        const emergency = conditions.find(c => c.emergency && c.score >= config.emergencyThreshold);
        if (emergency) return {
            level: 1,
            name: "Emergency",
            color: "#dc2626",
            action: "Seek immediate medical attention"
        };

        // Check for urgent conditions
        const urgent = conditions.find(c => c.score >= 50);
        if (urgent) return {
            level: 2,
            name: "Urgent",
            color: "#ea580c",
            action: "See doctor within 24 hours"
        };

        // Default to routine
        return {
            level: 3,
            name: "Routine",
            color: "#2563eb",
            action: "Schedule doctor visit when convenient"
        };
    }

    function getRiskFactors() {
        return {
            travel: elements.riskFactors.travel.checked,
            existingConditions: elements.riskFactors.conditions.checked,
            medications: elements.riskFactors.medications.checked,
            allergies: elements.riskFactors.allergies.checked
        };
    }

    // ======================
    // UI Functions
    // ======================
    function displayResults(results) {
        const { conditions, urgency } = results;
        
        // Build conditions list
        const conditionsHtml = conditions.map(condition => `
            <div class="condition-card">
                <h4>${condition.name}</h4>
                <div class="condition-details">
                    <span class="probability">${condition.score}% likelihood</span>
                    ${condition.emergency ? '<span class="emergency-tag">EMERGENCY</span>' : ''}
                </div>
                <div class="matched-symptoms">
                    <strong>Matching symptoms:</strong> 
                    ${condition.matchedSymptoms.join(", ")}
                </div>
            </div>
        `).join('');
        
        // Build full results HTML
        const resultsHtml = `
            <div class="results-header">
                <h3><i class="fas fa-diagnoses"></i> AI Health Assessment</h3>
                <div class="urgency-level" style="border-left-color: ${urgency.color}">
                    <strong>${urgency.name}</strong>: ${urgency.action}
                </div>
            </div>
            
            <div class="conditions-list">
                ${conditionsHtml}
            </div>
            
            <div class="recommendations">
                <h4><i class="fas fa-first-aid"></i> Recommended Actions</h4>
                <ul>
                    ${conditions[0].actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
            
            <div class="monitoring">
                <h4><i class="fas fa-heartbeat"></i> Monitoring Guidance</h4>
                <ul>
                    ${conditions[0].monitoring.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="disclaimer">
                <p><i class="fas fa-info-circle"></i> This tool does not replace professional medical advice.</p>
            </div>
        `;
        
        // Display results
        elements.resultsContainer.innerHTML = resultsHtml;
        elements.resultsContainer.style.display = 'block';
        
        // Smooth scroll to results
        elements.resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function showLoading() {
        elements.analyzeBtn.disabled = true;
        elements.buttonText.textContent = "Analyzing...";
        elements.buttonSpinner.style.display = "inline-block";
    }

    function hideLoading() {
        elements.analyzeBtn.disabled = false;
        elements.buttonText.textContent = "Analyze Symptoms";
        elements.buttonSpinner.style.display = "none";
    }

    function showError(message) {
        // Create error element if it doesn't exist
        let errorElement = document.getElementById('error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'error-message';
            errorElement.className = 'error-message';
            elements.symptomInput.parentNode.insertBefore(errorElement, elements.symptomInput.nextSibling);
        }
        
        // Set error message
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorElement.style.opacity = '0';
            setTimeout(() => errorElement.remove(), 300);
        }, 5000);
    }
// Sample analysis flow:
1. User clicks "Analyze Symptoms"
2. Button shows loading state
3. AI processes symptoms (1500ms simulation)
4. Results appear with smooth animation
5. Error messages if input invalid
    // ======================
    // Initialization
    // ======================
    console.log("Medical AI System initialized successfully");
}); 
