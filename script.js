document.addEventListener('DOMContentLoaded', function() {
    // Initialize Medical AI
    const medicalAI = new MedicalAI();
    
    // Form submission handler
    const symptomForm = document.getElementById('symptomForm');
    if (symptomForm) {
        symptomForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) return;
            
            // Show loading state
            setLoadingState(true);
            
            try {
                // Get form data
                const patientData = {
                    symptomText: document.getElementById('symptoms').value,
                    age: document.getElementById('age').value,
                    gender: document.getElementById('gender').value,
                    // Additional fields
                };
                
                // Analyze with AI
                const results = await medicalAI.analyzeSymptoms(patientData);
                
                // Display results
                displayResults(results);
            } catch (error) {
                showError("Analysis failed. Please try again.");
            } finally {
                setLoadingState(false);
            }
        });
    }
    
    function validateForm() {
        // Professional validation logic
        return true;
    }
    
    function setLoadingState(isLoading) {
        const form = document.getElementById('symptomForm');
        const loader = document.getElementById('loadingIndicator');
        const results = document.getElementById('resultsContainer');
        
        if (isLoading) {
            form.style.display = 'none';
            loader.style.display = 'block';
            results.style.display = 'none';
        } else {
            form.style.display = 'block';
            loader.style.display = 'none';
        }
    }
    
    function displayResults(results) {
        // Professional results display logic
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.style.display = 'block';
        
        // Update DOM with results
        // ...
        
        // Smooth scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showError(message) {
        // Professional error display
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        document.querySelector('.checker-form-container').prepend(errorEl);
        
        // Auto-remove after delay
        setTimeout(() => errorEl.remove(), 5000);
    }
}); 
