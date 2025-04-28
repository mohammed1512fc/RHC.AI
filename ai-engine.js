// Import medical database
const medicalDB = typeof medicalDatabase !== 'undefined' ? medicalDatabase : require('./medical-db');

// Advanced AI Symptom Analysis Engine
function analyzeSymptoms(age, gender, symptomsText, duration, severity, additionalInfo) {
    // Convert age to number
    age = parseInt(age);
    gender = gender.toLowerCase();
    
    // Preprocess symptom text
    const symptomText = symptomsText.toLowerCase();
    const additionalText = additionalInfo ? additionalInfo.toLowerCase() : '';
    
    // Extract symptoms from text using NLP (simplified for this example)
    const extractedSymptoms = extractSymptomsFromText(symptomText + ' ' + additionalText);
    
    // Check for emergency symptoms first
    const emergencyCheck = checkForEmergencies(extractedSymptoms, age, gender);
    if (emergencyCheck.isEmergency) {
        return emergencyCheck.result;
    }
    
    // Analyze symptom patterns
    const symptomPatterns = matchSymptomPatterns(extractedSymptoms);
    
    // Generate differential diagnosis
    const differentialDiagnosis = generateDifferentialDiagnosis(extractedSymptoms, age, gender, duration, severity);
    
    // Determine triage level
    const triageLevel = determineTriageLevel(differentialDiagnosis, extractedSymptoms, severity);
    
    // Generate recommendations
    const recommendations = generateClinicalRecommendations(differentialDiagnosis, triageLevel, age);
    
    // Generate next steps
    const nextSteps = generateNextSteps(triageLevel, differentialDiagnosis);
    
    // Prepare final results
    const results = {
        triage: {
            level: triageLevel.level,
            description: triageLevel.description,
            warning: triageLevel.warning
        },
        possibleConditions: differentialDiagnosis.map(condition => ({
            name: condition.name,
            likelihood: condition.likelihood,
            description: condition.description,
            matchingSymptoms: condition.matchingSymptoms
        })),
        recommendations: formatRecommendations(recommendations),
        nextSteps: formatNextSteps(nextSteps)
    };
    
    return results;
}

// Helper function to extract symptoms from text
function extractSymptomsFromText(text) {
    const symptoms = [];
    const words = text.toLowerCase().split(/\s+/);
    
    // Check against our medical database
    medicalDB.symptoms.forEach(symptom => {
        // Simple check for symptom in text (would use NLP in real implementation)
        if (text.includes(symptom.name) || 
            words.some(word => word.includes(symptom.name.split(' ')[0]))) {
            symptoms.push({
                name: symptom.name,
                categories: symptom.categories
            });
        }
    });
    
    // Additional processing for symptom modifiers
    const severityModifiers = ["severe", "mild", "moderate", "sharp", "dull", "throbbing"];
    const durationModifiers = ["constant", "intermittent", "worsening", "improving"];
    
    return symptoms;
}

// Check for emergency conditions
function checkForEmergencies(symptoms, age, gender) {
    const emergencyConditions = medicalDB.conditions.filter(c => c.triage === "emergency");
    const redFlagSymptoms = medicalDB.redFlagSymptoms;
    
    // Check for red flag symptoms
    const hasRedFlags = symptoms.some(s => 
        redFlagSymptoms.includes(s.name) || 
        s.name.includes('chest pain') || 
        s.name.includes('difficulty breathing'));
    
    if (hasRedFlags) {
        // Find most likely emergency condition
        const matchedEmergencies = emergencyConditions.filter(condition => 
            condition.symptoms.some(symptom => 
                symptoms.some(s => s.name === symptom)));
        
        if (matchedEmergencies.length > 0) {
            const mostLikelyEmergency = matchedEmergencies[0];
            
            return {
                isEmergency: true,
                result: {
                    triage: {
                        level: "Emergency",
                        description: "Potential life-threatening condition detected",
                        warning: `You may be experiencing ${mostLikelyEmergency.name}. This is a medical emergency requiring immediate attention.`
                    },
                    possibleConditions: [{
                        name: mostLikelyEmergency.name,
                        likelihood: "High probability",
                        description: mostLikelyEmergency.description,
                        matchingSymptoms: mostLikelyEmergency.symptoms.filter(s => 
                            symptoms.some(us => us.name === s))
                    }],
                    recommendations: `
                        <p><strong>EMERGENCY ALERT:</strong> Based on your symptoms, you may be experiencing ${mostLikelyEmergency.name} which requires immediate medical attention.</p>
                        <ul>
                            <li>Call emergency services (911 or local emergency number) immediately</li>
                            <li>Do not drive yourself to the hospital</li>
                            <li>If alone, call for help immediately</li>
                            <li>Follow any first aid instructions from emergency
                                                        <li>Follow any first aid instructions from emergency services if available</li>
                        </ul>
                    `, 
                    nextSteps: `Immediate medical attention is required. Please seek help from a healthcare professional as soon as possible.` 
                }
            };
        }
    }

    return { isEmergency: false };
}

// Match symptom patterns to potential conditions
function matchSymptomPatterns(symptoms) {
    // For this example, we'll simulate pattern matching (in real scenarios, this would use more sophisticated NLP or machine learning)
    const conditionPatterns = medicalDB.conditions.map(condition => {
        const matchingSymptoms = condition.symptoms.filter(s => 
            symptoms.some(us => us.name === s));

        return {
            name: condition.name,
            description: condition.description,
            matchingSymptoms: matchingSymptoms,
            likelihood: matchingSymptoms.length / condition.symptoms.length
        };
    });

    // Sort by likelihood, with most likely conditions at the top
    conditionPatterns.sort((a, b) => b.likelihood - a.likelihood);
    return conditionPatterns;
}

// Generate differential diagnosis
function generateDifferentialDiagnosis(symptoms, age, gender, duration, severity) {
    // Simulate differential diagnosis generation based on the symptoms and patient info
    const possibleConditions = medicalDB.conditions.filter(condition => 
        condition.symptoms.some(symptom => symptoms.some(s => s.name === symptom.name))
    );

    return possibleConditions.map(condition => ({
        name: condition.name,
        description: condition.description,
        symptoms: condition.symptoms.filter(s => symptoms.some(us => us.name === s)),
        likelihood: "Moderate" // This can be refined further based on symptom analysis
    }));
}

// Determine triage level based on severity and conditions
function determineTriageLevel(differentialDiagnosis, symptoms, severity) {
    // Check severity and duration to determine triage level
    let triageLevel = { level: "Low", description: "Routine care", warning: "" };

    const severeSymptoms = symptoms.some(symptom => 
        severity.includes("severe") || symptom.name.includes('chest pain') || symptom.name.includes('difficulty breathing'));
    
    if (severeSymptoms || differentialDiagnosis.some(d => d.likelihood === "High")) {
        triageLevel = {
            level: "High",
            description: "Requires immediate medical attention",
            warning: "There are high-risk conditions present that require immediate evaluation."
        };
    }

    return triageLevel;
}

// Generate clinical recommendations
function generateClinicalRecommendations(differentialDiagnosis, triageLevel, age) {
    // Generate clinical recommendations based on the differential diagnosis and triage level
    const recommendations = differentialDiagnosis.map(diagnosis => {
        if (triageLevel.level === "High") {
            return `Immediate medical intervention is recommended for ${diagnosis.name}.`;
        } else {
            return `Monitor symptoms for worsening. Consider seeing a healthcare provider for ${diagnosis.name}.`;
        }
    });

    return recommendations;
}

// Format recommendations for presentation
function formatRecommendations(recommendations) {
    return recommendations.join('<br>');
}

// Generate next steps based on triage level and differential diagnosis
function generateNextSteps(triageLevel, differentialDiagnosis) {
    const nextSteps = differentialDiagnosis.map(diagnosis => {
        if (triageLevel.level === "High") {
            return `Seek urgent care for ${diagnosis.name}.`;
        } else {
            return `Schedule a non-urgent appointment with a healthcare provider for ${diagnosis.name}.`;
        }
    });

    return nextSteps;
}

// Format next steps for presentation
function formatNextSteps(nextSteps) {
    return nextSteps.join('<br>');
}

// Example usage
const result = analyzeSymptoms(
    45, 
    'male', 
    "I've been feeling chest pain and difficulty breathing for the past two hours", 
    "2 hours", 
    "severe", 
    "I also have a history of hypertension"
);

console.log(result);
