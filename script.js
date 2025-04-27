// =================================================================
// 2025 Rapid Health AI - Medical Diagnostic Engine v6.0
// =================================================================

class MedicalAI {
    constructor() {
        this.version = "6.0.3";
        this.lastUpdated = "2025-01-20";
        
        // Initialize knowledge base
        this.medicalKnowledge = this.initializeKnowledgeBase();
        
        // Emergency protocols
        this.emergencyProtocols = {
            critical: {
                recommendation: "🚨 EMERGENCY: Call emergency services immediately",
                actions: [
                    "Call local emergency number (911/112/999)",
                    "Do not drive yourself to hospital",
                    "If unconscious, place in recovery position",
                    "Perform CPR if no pulse (if trained)"
                ],
                monitoring: [
                    "Check breathing every minute",
                    "Monitor consciousness level",
                    "Note time symptoms started"
                ]
            },
            high: {
                recommendation: "Urgent: Seek medical care within 2 hours",
                actions: [
                    "Contact your doctor or visit urgent care",
                    "Have someone accompany you",
                    "Bring all current medications"
                ],
                monitoring: [
                    "Check temperature every 2 hours",
                    "Monitor symptom progression"
                ]
            },
            medium: {
                recommendation: "Schedule doctor visit within 24-48 hours",
                actions: [
                    "Make appointment with primary care physician",
                    "Rest and stay hydrated",
                    "Use over-the-counter remedies as directed"
                ],
                monitoring: [
                    "Track symptoms twice daily",
                    "Watch for worsening symptoms"
                ]
            },
            low: {
                recommendation: "Self-care recommended",
                actions: [
                    "Rest and stay hydrated",
                    "Use OTC medications as needed",
                    "Try home remedies (saltwater gargle, etc.)"
                ],
                monitoring: [
                    "Monitor for 3 days",
                    "Seek care if symptoms persist"
                ]
            }
        };
    }

    initializeKnowledgeBase() {
        return {
            cardiovascular: {
                name: "Cardiovascular",
                conditions: [
                    {
                        id: "ami",
                        name: "Acute Myocardial Infarction",
                        baseProbability: 0.05,
                        emergency: true,
                        symptoms: [
                            { id: "chest pain", weight: 0.9, description: "Crushing or pressure-like chest pain" },
                            { id: "left arm pain", weight: 0.7 },
                            { id: "shortness of breath", weight: 0.6 },
                            { id: "nausea", weight: 0.4 },
                            { id: "cold sweat", weight: 0.5 }
                        ]
                    },
                    // More conditions...
                ]
            },
            neurological: {
                name: "Neurological",
                conditions: [
                    {
                        id: "stroke",
                        name: "Acute Stroke",
                        baseProbability: 0.04,
                        emergency: true,
                        symptoms: [
                            { id: "facial droop", weight: 0.8 },
                            { id: "arm weakness", weight: 0.8 },
                            { id: "speech difficulty", weight: 0.9 }
                        ]
                    },
                    // More conditions...
                ]
            },
            // More systems...
        };
    }

    async analyzeSymptoms(text, riskFactors = {}) {
        // 1. Parse input
        const symptoms = this.parseSymptomText(text);
        
        // 2. Generate differential diagnosis
        const differentials = this.generateDifferentials(symptoms);
        
        // 3. Score conditions
        const scoredConditions = this.scoreConditions(differentials, symptoms, riskFactors);
        
        // 4. Determine urgency
        const urgency = this.determineUrgency(scoredConditions);
        
        // 5. Prepare results
        return {
            conditions: scoredConditions.slice(0, 5), // Top 5 conditions
            urgency,
            protocols: this.emergencyProtocols[urgency],
            analyzedSymptoms: symptoms,
            metadata: {
                version: this.version,
                processedAt: new Date().toISOString()
            }
        };
    }

    parseSymptomText(text) {
        // Simple tokenization - replace with proper NLP in production
        const tokens = text.toLowerCase().split(/[ ,.]+/).filter(t => t.length > 2);
        
        // Map to known symptoms
        return tokens.map(token => {
            return {
                raw: token,
                normalized: this.normalizeSymptom(token),
                count: 1
            };
        }).filter(s => s.normalized);
    }

    normalizeSymptom(term) {
        // Simple synonym mapping - expand this
        const synonyms = {
            "headache": "headache",
            "head pain": "headache",
            "fever": "fever",
            "temp": "fever",
            // Expand this dictionary
        };
        
        return synonyms[term] || null;
    }

    generateDifferentials(symptoms) {
        // Get all conditions that match any symptom
        const conditions = [];
        
        for (const system in this.medicalKnowledge) {
            for (const condition of this.medicalKnowledge[system].conditions) {
                const matchingSymptoms = condition.symptoms.filter(cs => 
                    symptoms.some(s => s.normalized === cs.id)
                );
                
                if (matchingSymptoms.length > 0) {
                    conditions.push({
                        ...condition,
                        system,
                        matchingSymptoms
                    });
                }
            }
        }
        
        return conditions;
    }

    scoreConditions(conditions, symptoms, riskFactors) {
        return conditions.map(condition => {
            // Start with base probability
            let score = condition.baseProbability;
            
            // Add symptom weights
            condition.matchingSymptoms.forEach(symptom => {
                score += symptom.weight * 0.1; // Adjust weighting factor as needed
            });
            
            // Apply risk factors
            if (riskFactors.age > 50) score *= 1.2;
            if (riskFactors.smoker) score *= 1.3;
            // Add other risk factors
            
            // Cap at 95%
            score = Math.min(score, 0.95);
            
            return {
                ...condition,
                probability: Math.round(score * 100)
            };
        }).sort((a, b) => b.probability - a.probability);
    }

    determineUrgency(conditions) {
        // Check for critical conditions
        const critical = conditions.find(c => c.emergency && c.probability > 75);
        if (critical) return "critical";
        
        // Check for high urgency
        const high = conditions.find(c => c.probability > 50);
        if (high) return "high";
        
        // Default to medium/low
        return conditions.some(c => c.probability > 30) ? "medium" : "low";
    }
}

// =================================================================
// UI Controller
// =================================================================

class SymptomCheckerUI {
    constructor() {
        this.ai = new MedicalAI();
        this.riskFactors = {};
        this.initElements();
        this.bindEvents();
    }
    
    initElements() {
        this.elements = {
            symptomInput: document.getElementById('symptoms'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            buttonText: document.getElementById('buttonText'),
            buttonSpinner: document.getElementById('buttonSpinner'),
            resultsContainer: document.getElementById('results'),
            riskFactorInputs: {
                travel: document.getElementById('travel'),
                conditions: document.getElementById('conditions'),
                medications: document.getElementById('medications'),
                allergies: document.getElementById('allergies')
            }
        };
    }
    
    bindEvents() {
        this.elements.analyzeBtn.addEventListener('click', () => this.runAnalysis());
        
        // Bind risk factor changes
        for (const [key, element] of Object.entries(this.elements.riskFactorInputs)) {
            element.addEventListener('change', (e) => {
                this.riskFactors[key] = e.target.checked;
            });
        }
    }
    
    async runAnalysis() {
        const symptoms = this.elements.symptomInput.value.trim();
        
        if (!symptoms) {
            this.showError("Please describe your symptoms");
            return;
        }
        
        this.showLoading();
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const analysis = await this.ai.analyzeSymptoms(symptoms, this.riskFactors);
            this.displayResults(analysis);
        } catch (error) {
            console.error("Analysis error:", error);
            this.showError("Analysis failed. Please try again.");
        } finally {
            this.hideLoading();
        }
    }
    
    showLoading() {
        this.elements.analyzeBtn.disabled = true;
        this.elements.buttonText.textContent = "Analyzing...";
        this.elements.buttonSpinner.style.display = "inline-block";
    }
    
    hideLoading() {
        this.elements.analyzeBtn.disabled = false;
        this.elements.buttonText.textContent = "Analyze Symptoms";
        this.elements.buttonSpinner.style.display = "none";
    }
    
    showError(message) {
        alert(message); // Replace with prettier error display
    }
    
    displayResults(analysis) {
        const { conditions, urgency, protocols } = analysis;
        
        // Format conditions list
        const conditionsHtml = conditions.map(condition => `
            <div class="condition-item">
                <div class="condition-info">
                    <span class="condition-name">${condition.name}</span>
                    ${condition.emergency ? '<span class="emergency-tag">EMERGENCY</span>' : ''}
                </div>
                <span class="condition-prob">${condition.probability}%</span>
            </div>
        `).join('');
        
        // Format actions
        const actionsHtml = protocols.actions.map(action => `
            <li class="action-item">${action}</li>
        `).join('');
        
        // Format monitoring
        const monitoringHtml = protocols.monitoring.map(item => `
            <li class="action-item">${item}</li>
        `).join('');
        
        // Set urgency indicator
        const urgencyClass = `severity-${urgency}`;
        const urgencyPercentage = 
            urgency === 'critical' ? 100 :
            urgency === 'high' ? 75 :
            urgency === 'medium' ? 50 : 25;
        
        // Build full results HTML
        this.elements.resultsContainer.innerHTML = `
            <div class="result-header">
                <h3><i class="fas fa-diagnoses"></i> AI Health Assessment</h3>
                <span class="result-timestamp">${new Date().toLocaleString()}</span>
            </div>
            
            <div class="condition-list">
                ${conditionsHtml}
            </div>
            
            <div class="severity-section ${urgencyClass}">
                <div class="severity-header">
                    <h4><i class="fas fa-triage"></i> Urgency Assessment</h4>
                </div>
                <div class="severity-indicator">
                    <div class="severity-bar" style="width: ${urgencyPercentage}%"></div>
                </div>
                <div class="severity-labels">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                    <span>Critical</span>
                </div>
                <div class="urgency-recommendation">
                    <p><strong>${protocols.recommendation}</strong></p>
                </div>
            </div>
            
            <div class="recommendation-card">
                <h4><i class="fas fa-first-aid"></i> Recommended Actions</h4>
                <ul class="action-list">
                    ${actionsHtml}
                </ul>
            </div>
            
            <div class="recommendation-card">
                <h4><i class="fas fa-heartbeat"></i> Monitoring Guidance</h4>
                <ul class="action-list">
                    ${monitoringHtml}
                </ul>
            </div>
            
            <div class="disclaimer">
                <p><i class="fas fa-exclamation-triangle"></i> <strong>Disclaimer:</strong> This AI tool provides preliminary health information only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
            </div>
        `;
        
        // Show results with animation
        this.elements.resultsContainer.style.display = 'block';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new SymptomCheckerUI();
    
    // For debugging/development
    window.HealthAI = app;
}); 
