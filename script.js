document.addEventListener('DOMContentLoaded', function() {
    // Initialize the symptom checker form
    const symptomForm = document.getElementById('symptomForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading indicator
            symptomForm.style.display = 'none';
            loadingIndicator.style.display = 'block';
            
            // Simulate AI processing (in a real app, this would be an API call)
            setTimeout(function() {
                processSymptoms();
                
                // Hide loading indicator and show results
                loadingIndicator.style.display = 'none';
                resultsContainer.style.display = 'block';
            }, 2000);
        });
    }
    
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

function processSymptoms() {
    // Get form values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;
    const additional = document.getElementById('additional').value;
    
    // Call the AI engine to analyze symptoms
    const analysisResults = analyzeSymptoms(age, gender, symptoms, duration, severity, additional);
    
    // Display results
    displayResults(analysisResults);
}

function displayResults(results) {
    // Triage level
    document.getElementById('triageLevel').textContent = results.triage.level;
    const triageIndicator = document.getElementById('triageIndicator');
    
    // Set triage indicator color based on level
    switch(results.triage.level.toLowerCase()) {
        case 'emergency':
            triageIndicator.style.backgroundColor = 'var(--emergency-red)';
            break;
        case 'urgent':
            triageIndicator.style.backgroundColor = 'var(--warning-orange)';
            break;
        case 'seek care':
            triageIndicator.style.backgroundColor = 'var(--caution-yellow)';
            break;
        case 'self-care':
            triageIndicator.style.backgroundColor = 'var(--ok-green)';
            break;
        default:
            triageIndicator.style.backgroundColor = 'var(--primary-color)';
    }
    
    // Possible conditions
    const conditionsList = document.getElementById('possibleConditions');
    conditionsList.innerHTML = '';
    results.possibleConditions.forEach(condition => {
        const li = document.createElement('li');
        li.textContent = `${condition.name} (${condition.likelihood})`;
        conditionsList.appendChild(li);
    });
    
    // Recommendations
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = results.recommendations;
    
    // Next steps
    const nextSteps = document.getElementById('nextSteps');
    nextSteps.innerHTML = results.nextSteps;
    
    // Emergency warning if needed
    const emergencyWarning = document.getElementById('emergencyWarning');
    const emergencyMessage = document.getElementById('emergencyMessage');
    
    if (results.triage.level.toLowerCase() === 'emergency') {
        emergencyWarning.style.display = 'flex';
        emergencyMessage.textContent = results.triage.warning || 'You may be experiencing a medical emergency. Seek immediate medical attention.';
    } else {
        emergencyWarning.style.display = 'none';
    }
} 
