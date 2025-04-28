// AI Symptom Analysis Engine
function analyzeSymptoms(age, gender, symptoms, duration, severity, additional) {
    // This is a simplified version - in a real app, this would connect to a proper AI/ML model
    
    // Convert age to number
    age = parseInt(age);
    
    // Analyze symptoms text for keywords
    const symptomText = symptoms.toLowerCase();
    
    // Initialize results object
    const results = {
        triage: {
            level: 'Self-care',
            warning: ''
        },
        possibleConditions: [],
        recommendations: '',
        nextSteps: ''
    };
    
    // Check for emergency symptoms
    const emergencyKeywords = [
        'chest pain', 'difficulty breathing', 'shortness of breath', 
        'severe pain', 'unconscious', 'bleeding heavily', 
        'sudden weakness', 'slurred speech', 'severe headache',
        'suicidal', 'homicidal', 'severe burn', 'broken bone',
        'seizure', 'choking', 'allergic reaction', 'anaphylaxis'
    ];
    
    const hasEmergency = emergencyKeywords.some(keyword => symptomText.includes(keyword));
    
    if (hasEmergency) {
        results.triage.level = 'Emergency';
        results.triage.warning = 'You may be experiencing a medical emergency that requires immediate attention.';
    }
    
    // Check for urgent symptoms if not emergency
    const urgentKeywords = [
        'high fever', 'vomiting blood', 'severe abdominal pain',
        'head injury', 'confusion', 'sudden vision changes',
        'pain when urinating', 'unusual bleeding', 'swelling',
        'rash with fever', 'dehydration', 'worsening symptoms'
    ];
    
    if (!hasEmergency && urgentKeywords.some(keyword => symptomText.includes(keyword))) {
        results.triage.level = 'Urgent';
    }
    
    // Determine possible conditions based on symptoms
    const conditions = getPossibleConditions(symptomText, age, gender);
    results.possibleConditions = conditions;
    
    // Generate recommendations based on triage level and conditions
    results.recommendations = generateRecommendations(results.triage.level, conditions, duration, severity);
    
    // Generate next steps
    results.nextSteps = generateNextSteps(results.triage.level, conditions);
    
    return results;
}

function getPossibleConditions(symptoms, age, gender) {
    // This would normally come from a medical knowledge base or ML model
    const conditions = [];
    
    // Common conditions
    if (symptoms.includes('headache')) {
        if (symptoms.includes('fever') && symptoms.includes('stiff neck')) {
            conditions.push({ name: 'Meningitis', likelihood: 'Low probability' });
        } else if (symptoms.includes('blurred vision') || symptoms.includes('nausea')) {
            conditions.push({ name: 'Migraine', likelihood: 'Moderate probability' });
        } else {
            conditions.push({ name: 'Tension headache', likelihood: 'High probability' });
        }
    }
    
    if (symptoms.includes('fever') && symptoms.includes('cough')) {
        if (symptoms.includes('shortness of breath')) {
            conditions.push({ name: 'Pneumonia', likelihood: 'Moderate probability' });
        } else if (symptoms.includes('runny nose') || symptoms.includes('sore throat')) {
            conditions.push({ name: 'Common cold', likelihood: 'High probability' });
            conditions.push({ name: 'Flu (Influenza)', likelihood: 'Moderate probability' });
        }
    }
    
    if (symptoms.includes('stomach pain')) {
        if (symptoms.includes('diarrhea') || symptoms.includes('vomiting')) {
            conditions.push({ name: 'Gastroenteritis', likelihood: 'High probability' });
        } else if (symptoms.includes('right side') && age < 50) {
            conditions.push({ name: 'Appendicitis', likelihood: 'Moderate probability' });
        }
    }
    
    if (symptoms.includes('rash')) {
        conditions.push({ name: 'Allergic reaction', likelihood: 'Moderate probability' });
        conditions.push({ name: 'Contact dermatitis', likelihood: 'High probability' });
    }
    
    // If no conditions found, add general ones
    if (conditions.length === 0) {
        conditions.push({ name: 'Viral infection', likelihood: 'Possible' });
        conditions.push({ name: 'Stress-related symptoms', likelihood: 'Possible' });
    }
    
    // Limit to top 3 most likely
    return conditions.slice(0, 3);
}

function generateRecommendations(triageLevel, conditions, duration, severity) {
    let recommendations = '';
    
    if (triageLevel === 'Emergency') {
        recommendations = `
            <p><strong>Call emergency services (911 or local emergency number) immediately.</strong></p>
            <p>Do not delay seeking medical care for these symptoms. Some of the possible conditions require immediate treatment.</p>
            <ul>
                <li>Do not drive yourself to the hospital</li>
                <li>If alone, call for help immediately</li>
                <li>Follow any first aid instructions from emergency operators</li>
            </ul>
        `;
    } else if (triageLevel === 'Urgent') {
        recommendations = `
            <p><strong>Seek medical care within 24 hours.</strong> These symptoms should be evaluated by a healthcare provider soon.</p>
            <p>Possible approaches:</p>
            <ul>
                <li>Visit an urgent care clinic</li>
                <li>Contact your primary care provider for same-day appointment</li>
                <li>If after hours, consider a telemedicine consultation</li>
            </ul>
            <p>For symptom relief until you can be seen:</p>
            <ul>
                <li>Rest and stay hydrated</li>
                <li>Use over-the-counter pain relievers as needed</li>
                <li>Monitor symptoms for worsening</li>
            </ul>
        `;
    } else {
        recommendations = `
            <p><strong>Self-care recommendations:</strong></p>
            <p>Based on your symptoms, these conditions can typically be managed at home with self-care measures.</p>
            <ul>
                <li>Rest and stay hydrated</li>
                <li>Use over-the-counter medications as needed for symptom relief</li>
                <li>Monitor symptoms for improvement or worsening</li>
            </ul>
            <p>Seek medical attention if:</p>
            <ul>
                <li>Symptoms worsen or don't improve in ${duration === '2+ weeks' ? 'a few more days' : '3-4 days'}</li>
                <li>You develop new concerning symptoms</li>
                <li>You have underlying health conditions that may complicate recovery</li>
            </ul>
        `;
    }
    
    // Add condition-specific recommendations
    if (conditions.some(c => c.name.includes('Migraine'))) {
        recommendations += `
            <div class="condition-specific">
                <h5>For Migraine:</h5>
                <ul>
                    <li>Rest in a quiet, dark room</li>
                    <li>Apply cold compress to forehead or neck</li>
                    <li>Consider OTC migraine medication if available</li>
                    <li>Avoid triggers like bright lights, strong smells</li>
                </ul>
            </div>
        `;
    }
    
    if (conditions.some(c => c.name.includes('cold') || c.name.includes('flu'))) {
        recommendations += `
            <div class="condition-specific">
                <h5>For Cold/Flu:</h5>
                <ul>
                    <li>Drink plenty of fluids</li>
                    <li>Use throat lozenges for sore throat</li>
                    <li>Consider decongestants or antihistamines</li>
                    <li>Get extra rest</li>
                </ul>
            </div>
        `;
    }
    
    return recommendations;
}

function generateNextSteps(triageLevel, conditions) {
    let nextSteps = '';
    
    if (triageLevel === 'Emergency') {
        nextSteps = `
            <p><strong>Immediate next steps:</strong></p>
            <ol>
                <li>Call emergency services now</li>
                <li>If alone, contact someone who can help</li>
                <li>Follow any first aid instructions while waiting for help</li>
                <li>Prepare your ID and insurance information</li>
            </ol>
        `;
    } else if (triageLevel === 'Urgent') {
        nextSteps = `
            <p><strong>Recommended next steps:</strong></p>
            <ol>
                <li>Contact your healthcare provider or visit urgent care</li>
                <li>Monitor symptoms closely for any changes</li>
                <li>Follow self-care recommendations until you can be seen</li>
                <li>Prepare a list of your symptoms, duration, and any medications</li>
            </ol>
        `;
    } else {
        nextSteps = `
            <p><strong>Suggested next steps:</strong></p>
            <ol>
                <li>Implement the self-care recommendations</li>
                <li>Monitor your symptoms daily</li>
                <li>If symptoms persist or worsen, contact your healthcare provider</li>
                <li>Consider scheduling a routine appointment if symptoms don't resolve</li>
            </ol>
        `;
    }
    
    return nextSteps;
}
