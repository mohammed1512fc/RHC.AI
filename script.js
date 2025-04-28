document.addEventListener('DOMContentLoaded', function() {
    // Initialize the symptom checker form
    const symptomForm = document.getElementById('symptomForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsContainer = document.getElementById('resultsContainer');
    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    
    // Set current date for report
    const now = new Date();
    document.getElementById('reportDate').textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Generate random report ID
    document.getElementById('reportId').textContent = 'RHC-' + Math.floor(Math.random() * 1000000);
    
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show loading indicator
            symptomForm.style.display = 'none';
            loadingIndicator.style.display = 'block';
            
            // Animate process steps
            animateProcessSteps();
            
            // Process symptoms with AI
            setTimeout(function() {
                processSymptoms();
                
                // Hide loading indicator and show results
                loadingIndicator.style.display = 'none';
                resultsContainer.style.display = 'block';
                
                // Scroll to results
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }, 3000);
        });
    }
    
    if (newAnalysisBtn) {
        newAnalysisBtn.addEventListener('click', function() {
            // Reset form and show it again
            symptomForm.reset();
            resultsContainer.style.display = 'none';
            symptomForm.style.display = 'block';
            
            // Scroll to form
            symptomForm.scrollIntoView({ behavior: 'smooth' });
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
    
    // Initialize any tooltips
    initTooltips();
});

function validateForm() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;
    
    if (!age || !gender || !symptoms || !duration || !severity) {
        alert('Please fill in all required fields');
        return false;
    }
    
    if (age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120');
        return false;
    }
    
    if (symptoms.length < 10) {
        alert('Please describe your symptoms in more detail (at least 10 characters)');
        return false;
    }
    
    return true;
}

function animateProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    let delay = 0;
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            // Mark current step as active
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            // Update icon
            const icon = step.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-circle-notch fa-spin';
                
                // After animation completes, show checkmark
                if (index === steps.length - 1) {
                    setTimeout(() => {
                        icon.className = 'fas fa-check-circle';
                    }, 1000);
                }
            }
        }, delay);
        
        delay += 800;
    });
}

function processSymptoms() {
    // Get form values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const symptoms = document.getElementById('symptoms').value;
    const duration = document.getElementById('duration').value;
    const severity = document.getElementById('severity').value;
    const additional = document.getElementById('additional').value;
    
    // Display patient summary
    document.getElementById('resultAge').textContent = age;
    document.getElementById('resultGender').textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
    document.getElementById('resultSymptoms').textContent = symptoms;
    document.getElementById('resultDuration').textContent = duration;
    
    // Call the AI engine to analyze symptoms
    const analysisResults = analyzeSymptoms(age, gender, symptoms, duration, severity, additional);
    
    // Display results
    displayResults(analysisResults);
}

function displayResults(results) {
    // Triage level
    document.getElementById('triageLevel').textContent = results.triage.level;
    document.getElementById('triageDescription').textContent = results.triage.description;
    
    // Set triage indicator color and position
    const triageCard = document.getElementById('triageCard');
    const triageIcon = document.getElementById('triageIcon');
    const triageIndicatorBar = document.getElementById('triageIndicatorBar');
    
    let triageColor, triagePercent;
    
    switch(results.triage.level.toLowerCase()) {
        case 'emergency':
            triageColor = 'var(--emergency-red)';
            triagePercent = '100%';
            triageIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'urgent':
            triageColor = 'var(--warning-orange)';
            triagePercent = '75%';
            triageIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'seek care':
            triageColor = 'var(--caution-yellow)';
            triagePercent = '50%';
            triageIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
            break;
        case 'self-care':
            triageColor = 'var(--ok-green)';
            triagePercent = '25%';
            triageIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            break;
        default:
            triageColor = 'var(--primary-color)';
            triagePercent = '10%';
    }
    
    triageCard.style.borderLeft = `4px solid ${triageColor}`;
    triageIcon.style.backgroundColor = triageColor;
    triageIndicatorBar.style.backgroundColor = triageColor;
    
    // Animate the triage indicator
    setTimeout(() => {
        triageIndicatorBar.style.width = triagePercent;
    }, 100);
    
    // Possible conditions
    const conditionsGrid = document.getElementById('possibleConditions');
    conditionsGrid.innerHTML = '';
    
    results.possibleConditions.forEach(condition => {
        const conditionCard = document.createElement('div');
        conditionCard.className = 'condition-card';
        
        let likelihoodClass;
        if (condition.likelihood.toLowerCase().includes('high')) {
            likelihoodClass = 'likelihood-high';
        } else if (condition.likelihood.toLowerCase().includes('medium')) {
            likelihoodClass = 'likelihood-medium';
        } else {
            likelihoodClass = 'likelihood-low';
        }
        
        conditionCard.innerHTML = `
            <div class="condition-name">
                <span>${condition.name}</span>
                <span class="condition-likelihood ${likelihoodClass}">${condition.likelihood}</span>
            </div>
            <div class="condition-description">${condition.description}</div>
            <div class="condition-symptoms">Matching symptoms: ${condition.matchingSymptoms.join(', ')}</div>
        `;
        
        conditionsGrid.appendChild(conditionCard);
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
    
    if (results.triage.level.toLowerCase() === 'emergency' || results.triage.level.toLowerCase() === 'urgent') {
        emergencyWarning.style.display = 'flex';
        emergencyMessage.innerHTML = results.triage.warning || 
            '<strong>Warning:</strong> You may be experiencing a condition that requires prompt medical attention. ' + 
            'Based on your symptoms, we recommend seeking care immediately.';
    } else {
        emergencyWarning.style.display = 'none';
    }
}

function initTooltips() {
    // Initialize any tooltips needed
    // Could be implemented with a library like Tippy.js for production
} 
