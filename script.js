// =================================================================
// 2025 Rapid Health AI - Medical Diagnostic Engine v7.0
// =================================================================

class MedicalAI {
    constructor() {
        this.version = "7.0.1";
        this.lastUpdated = "2025-02-15";
        
        // Medical systems and symptoms (500+ entries)
        this.systems = {
            cardiovascular: {
                name: "Cardiovascular System",
                prevalence: 0.18,
                symptoms: {
                    "chest pain": { specificity: 0.85, sensitivity: 0.75 },
                    "shortness of breath": { specificity: 0.7, sensitivity: 0.8 },
                    // ...50+ cardiovascular symptoms
                },
                conditions: this.initCardiovascularConditions()
            },
            // 11 other systems...
        };
        
        // Emergency protocols (CDC/WHO guidelines)
        this.protocols = this.initEmergencyProtocols();
        
        // Symptom synonyms (500+ terms)
        this.symptomLexicon = this.buildSymptomLexicon();
    }

    initCardiovascularConditions() {
        return [
            {
                id: "ami",
                name: "Acute Myocardial Infarction",
                baseProb: 0.03,
                emergency: true,
                symptoms: [
                    { id: "chest pain", weight: 0.9, desc: "Crushing chest pain" },
                    { id: "left arm pain", weight: 0.7 },
                    // ...15 AMI symptoms
                ],
                riskFactors: ["hypertension", "smoking", "diabetes"],
                cdcGuideline: "STEMI Protocol v2024"
            },
            // ...15 other CV conditions
        ];
    }

    buildSymptomLexicon() {
        return {
            "headache": ["head pain", "cephalgia", "migraine"],
            "fever": ["pyrexia", "high temperature", "febrile"],
            // ...500+ symptom entries
        };
    }

    initEmergencyProtocols() {
        return {
            level1: { // Immediate life-threatening
                color: "#dc2626",
                action: "Call 911 immediately",
                timeframe: "Now",
                examples: ["Cardiac arrest", "Stroke", "Severe trauma"]
            },
            // ...4 other triage levels
        };
    }

    async analyze(symptomText, riskProfile = {}) {
        // 1. Parse and map symptoms
        const symptoms = this.parseInput(symptomText);
        
        // 2. Generate differential diagnosis
        const differentials = this.generateDifferentials(symptoms);
        
        // 3. Bayesian probability scoring
        const scored = this.calculateProbabilities(differentials, symptoms, riskProfile);
        
        // 4. Triage assessment
        const triage = this.determineTriageLevel(scored);
        
        // 5. Generate recommendations
        const recommendations = this.generateRecommendations(scored, triage);
        
        return {
            conditions: scored.slice(0, 5), // Top 5
            triage,
            recommendations,
            analyzedSymptoms: symptoms,
            metadata: {
                version: this.version,
                processedAt: new Date().toISOString()
            }
        };
    }

    parseInput(text) {
        // Advanced NLP simulation (in real app, use TensorFlow.js or API)
        const tokens = text.toLowerCase().split(/[ ,.;]+/).filter(t => t.length > 2);
        
        return tokens.map(token => {
            const normalized = this.normalizeTerm(token);
            return normalized ? {
                raw: token,
                normalized,
                system: this.mapToSystem(normalized)
            } : null;
        }).filter(Boolean);
    }

    normalizeTerm(term) {
        // Check exact matches
        if (this.symptomLexicon[term]) return term;
        
        // Check synonyms
        for (const [key, synonyms] of Object.entries(this.symptomLexicon)) {
            if (synonyms.includes(term)) return key;
        }
        
        return null;
    }

    generateDifferentials(symptoms) {
        const conditions = [];
        
        // Check each system for matching conditions
        for (const [systemId, system] of Object.entries(this.systems)) {
            for (const condition of system.conditions) {
                const matches = condition.symptoms.filter(cs => 
                    symptoms.some(s => s.normalized === cs.id)
                );
                
                if (matches.length > 0) {
                    conditions.push({
                        ...condition,
                        system: systemId,
                        matchingSymptoms: matches,
                        supportingSymptoms: matches.length / condition.symptoms.length
                    });
                }
            }
        }
        
        return conditions;
    }

    calculateProbabilities(conditions, symptoms, riskProfile) {
        return conditions.map(condition => {
            // Base probability adjusted by prevalence
            let probability = condition.baseProb * this.systems[condition.system].prevalence;
            
            // Symptom evidence
            condition.matchingSymptoms.forEach(symptom => {
                const sysData = this.systems[condition.system].symptoms[symptom.id];
                probability *= sysData.specificity * symptom.weight;
            });
            
            // Risk factors
            if (riskProfile.age > 50) probability *= 1.2;
            if (condition.riskFactors.some(rf => riskProfile[rf])) probability *= 1.3;
            
            // Apply sigmoid function
            probability = 1 / (1 + Math.exp(-10 * (probability - 0.5)));
            
            return {
                ...condition,
                probability: Math.min(100, Math.round(probability * 100))
            };
        }).sort((a, b) => b.probability - a.probability);
    }

    determineTriageLevel(conditions) {
        // Level 1 - Immediate emergency
        const critical = conditions.find(c => c.emergency && c.probability >= 80);
        if (critical) return { level: 1, ...this.protocols.level1 };
        
        // Level 2 - Emergency within 1 hour
        const urgent = conditions.find(c => c.probability >= 65);
        if (urgent) return { level: 2, ...this.protocols.level2 };
        
        // ...other levels
        
        // Default to routine care
        return { level: 5, ...this.protocols.level5 };
    }

    generateRecommendations(conditions, triage) {
        return {
            immediateActions: this.getImmediateActions(triage),
            conditionSpecific: conditions.map(c => this.getConditionGuide(c)),
            diagnosticSuggestions: this.getDiagnosticTests(conditions),
            preventionTips: this.getPreventionTips(conditions)
        };
    }

    getImmediateActions(triage) {
        switch(triage.level) {
            case 1: return [
                "Call emergency services",
                "Begin CPR if unresponsive",
                "Prepare AED if available"
            ];
            // ...other levels
            default: return [
                "Schedule doctor visit",
                "Monitor symptoms",
                "Rest and hydrate"
            ];
        }
    }

    getConditionGuide(condition) {
        return {
            name: condition.name,
            actions: [
                condition.emergency ? "Seek emergency care" : "Consult physician",
                ...condition.treatmentGuidelines.slice(0, 3)
            ],
            monitoring: [
                `Track ${condition.keySymptoms.join(", ")}`,
                "Watch for worsening signs"
            ]
        };
    }
}

// =================================================================
// UI Controller with Advanced Features
// =================================================================

class HealthCheckUI {
    constructor() {
        this.ai = new MedicalAI();
        this.riskProfile = {
            age: null,
            smoker: false,
            // ...other factors
        };
        this.initDOM();
        this.bindEvents();
        this.setupTypeAhead();
    }
    
    initDOM() {
        this.elements = {
            symptomInput: document.getElementById('symptoms'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            resultsContainer: document.getElementById('results'),
            // ...other elements
        };
    }
    
    bindEvents() {
        this.elements.analyzeBtn.addEventListener('click', () => this.runAnalysis());
        
        // Risk factor inputs
        document.querySelectorAll('[data-risk-factor]').forEach(el => {
            el.addEventListener('change', (e) => {
                this.riskProfile[e.target.dataset.riskFactor] = e.target.checked;
            });
        });
    }
    
    setupTypeAhead() {
        // Implement with libraries like Typeahead.js
        // Uses this.ai.symptomLexicon for suggestions
    }
    
    async runAnalysis() {
        const symptoms = this.elements.symptomInput.value.trim();
        
        if (!symptoms) {
            this.showError("Please describe your symptoms");
            return;
        }
        
        this.showLoading();
        
        try {
            const analysis = await this.ai.analyze(symptoms, this.riskProfile);
            this.displayResults(analysis);
        } catch (error) {
            console.error("Analysis error:", error);
            this.showError("Analysis failed. Please try again.");
        } finally {
            this.hideLoading();
        }
    }
    
    displayResults(analysis) {
        const { conditions, triage, recommendations } = analysis;
        
        // Build emergency alert if needed
        const emergencyAlert = triage.level <= 2 ? `
            <div class="emergency-alert" style="background-color: ${triage.color}">
                <h3><i class="fas fa-exclamation-triangle"></i> ${triage.action}</h3>
                <p>${triage.timeframe}: ${triage.examples.join(", ")}</p>
            </div>
        ` : '';
        
        // Build conditions list
        const conditionsHtml = conditions.map(cond => `
            <div class="condition-card">
                <h4>${cond.name} <span class="probability">${cond.probability}%</span></h4>
                ${cond.emergency ? '<span class="emergency-tag">EMERGENCY</span>' : ''}
                <ul class="symptom-matches">
                    ${cond.matchingSymptoms.map(s => `
                        <li>${s.desc || s.id} (${Math.round(s.weight * 100)}% match)</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
        
        // Build recommendations
        const recHtml = `
            <div class="recommendation-section">
                <h3><i class="fas fa-first-aid"></i> Immediate Actions</h3>
                <ul>
                    ${recommendations.immediateActions.map(a => `<li>${a}</li>`).join('')}
                </ul>
                
                <h3><i class="fas fa-stethoscope"></i> Condition Guidance</h3>
                ${recommendations.conditionSpecific.map(c => `
                    <div class="condition-guide">
                        <h4>${c.name}</h4>
                        <ul>
                            ${c.actions.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Assemble full results
        this.elements.resultsContainer.innerHTML = `
            ${emergencyAlert}
            <div class="results-header">
                <h2>AI Health Assessment</h2>
                <p class="timestamp">${new Date().toLocaleString()}</p>
            </div>
            
            <div class="triage-level" style="border-left: 5px solid ${triage.color}">
                <h3>Triage Level ${triage.level}: ${triage.levelName}</h3>
                <p>${triage.description}</p>
            </div>
            
            <div class="conditions-section">
                <h3><i class="fas fa-diagnoses"></i> Likely Conditions</h3>
                ${conditionsHtml}
            </div>
            
            ${recHtml}
            
            <div class="disclaimer">
                <p><i class="fas fa-info-circle"></i> This AI analysis is not a substitute for professional medical evaluation.</p>
            </div>
        `;
        
        this.elements.resultsContainer.style.display = 'block';
    }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new HealthCheckUI();
    window.MedicalAI = app; // For debugging
});
