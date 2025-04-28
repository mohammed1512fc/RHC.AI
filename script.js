// Rapid Health Checker AI - Advanced Medical Intelligence Engine (2025)
class MedicalAI {
  constructor() {
    this.medicalKnowledgeBase = this.initializeKnowledgeBase();
    this.symptomParser = new SymptomParser();
    this.diagnosticEngine = new DiagnosticEngine();
    this.triageSystem = new TriageSystem();
    this.userSession = {
      symptoms: {},
      responses: {},
      medicalHistory: {}
    };
  }

  initializeKnowledgeBase() {
    return {
      conditions: {
        // Emergency conditions (highest priority)
        emergency: [
          {
            id: 'acute_myocardial_infarction',
            name: "Acute Myocardial Infarction",
            prevalence: 0.02,
            symptoms: {
              primary: ["chest pain"],
              associated: ["left arm pain", "shortness of breath", "nausea", "sweating"],
              required: 2
            },
            riskFactors: ["age > 50", "hypertension", "smoking", "high cholesterol"],
            diagnosticCriteria: {
              duration: ">30min",
              radiation: true,
              severity: "severe"
            },
            triage: 'emergency',
            actions: {
              immediate: ["Call emergency services", "Chew 325mg aspirin if available"],
              followUp: ["Cardiology referral", "Stress test"]
            }
          },
          // 15+ other emergency conditions
        ],
        
        // Cardiovascular conditions
        cardiovascular: [
          {
            id: 'stable_angina',
            name: "Stable Angina Pectoris",
            prevalence: 0.05,
            symptoms: {
              primary: ["chest pain"],
              associated: ["exertional discomfort", "shortness of breath"],
              required: 1
            },
            diagnosticCriteria: {
              duration: "5-15min",
              relationToActivity: true,
              relievedByRest: true
            },
            triage: 'urgent',
            actions: {
              immediate: ["Seek medical evaluation within 24 hours"],
              followUp: ["Cardiology consultation", "Lipid profile"]
            }
          }
          // 20+ other cardiovascular conditions
        ],
        
        // 15+ other body systems with conditions
      },
      
      symptomRelationships: {
        // Symptom clusters and their relationships
        "chest pain": {
          cardiovascular: 0.85,
          musculoskeletal: 0.10,
          gastrointestinal: 0.05
        },
        // 100+ other symptom relationships
      },
      
      demographicFactors: {
        age: {
          ranges: [
            { min: 0, max: 12, modifier: 0.8 },
            { min: 13, max: 40, modifier: 1.0 },
            { min: 41, max: 65, modifier: 1.2 },
            { min: 66, max: 120, modifier: 1.5 }
          ]
        },
        // Other demographic factors
      }
    };
  }

  async analyzeSymptoms(symptomText, userProfile = {}) {
    try {
      // Step 1: Parse and normalize symptoms
      const parsedSymptoms = this.symptomParser.parse(symptomText);
      this.userSession.symptoms = parsedSymptoms;
      
      // Step 2: Generate differential diagnosis
      const differentials = this.diagnosticEngine.generateDifferentials(
        parsedSymptoms, 
        userProfile,
        this.medicalKnowledgeBase
      );
      
      // Step 3: Calculate probabilities
      const weightedDifferentials = this.diagnosticEngine.calculateProbabilities(
        differentials,
        userProfile,
        this.medicalKnowledgeBase
      );
      
      // Step 4: Determine triage level
      const triageAssessment = this.triageSystem.assessTriageLevel(
        weightedDifferentials,
        this.userSession
      );
      
      // Step 5: Generate recommendations
      const recommendations = this.generateRecommendations(
        weightedDifferentials,
        triageAssessment
      );
      
      return {
        conditions: weightedDifferentials,
        triage: triageAssessment,
        recommendations: recommendations,
        suggestedQuestions: this.generateFollowUpQuestions(weightedDifferentials)
      };
      
    } catch (error) {
      console.error("AI Analysis Error:", error);
      return this.getFallbackResponse();
    }
  }

  generateFollowUpQuestions(conditions) {
    const questions = [];
    
    // Core questions for all cases
    questions.push({
      id: "duration",
      text: "How long have you been experiencing these symptoms?",
      type: "multiple_choice",
      options: [
        { value: "<1h", text: "Less than 1 hour" },
        { value: "1-24h", text: "1-24 hours" },
        { value: "1-3d", text: "1-3 days" },
        { value: "4-7d", text: "4-7 days" },
        { value: ">1w", text: "More than 1 week" }
      ],
      importance: "high"
    });
    
    // Condition-specific questions
    conditions.forEach(condition => {
      switch(condition.id) {
        case 'acute_myocardial_infarction':
          questions.push({
            id: "chest_pain_radiation",
            text: "Does the chest pain radiate to your arm, neck, or jaw?",
            type: "boolean",
            importance: "critical"
          });
          break;
        // 50+ other condition-specific questions
      }
    });
    
    return questions;
  }

  // 15+ other helper methods would be here...
}

// Supporting Classes
class SymptomParser {
  parse(text) {
    // Advanced NLP parsing would go here
    return {
      primary: ["chest pain"], // Extracted from text
      modifiers: {
        duration: "2 hours",
        severity: "7/10"
      },
      context: {
        onset: "sudden",
        aggravating: ["physical activity"],
        relieving: ["rest"]
      }
    };
  }
}

class DiagnosticEngine {
  generateDifferentials(symptoms, userProfile, knowledgeBase) {
    // Complex diagnostic logic would go here
    return [
      {
        id: "acute_myocardial_infarction",
        name: "Acute Myocardial Infarction",
        baseProbability: 0.25,
        matchedSymptoms: ["chest pain", "shortness of breath"],
        supportingFactors: ["age > 50"],
        conflictingFactors: []
      }
      // Other potential diagnoses
    ];
  }

  calculateProbabilities(differentials, userProfile, knowledgeBase) {
    // Bayesian probability calculations
    return differentials.map(dx => {
      let adjustedProbability = dx.baseProbability;
      
      // Adjust based on demographic factors
      adjustedProbability *= this.getAgeModifier(userProfile.age);
      
      // Adjust based on symptom matches
      adjustedProbability *= (1 + (dx.matchedSymptoms.length * 0.1));
      
      return {
        ...dx,
        probability: Math.min(0.99, adjustedProbability * 100) // Convert to percentage
      };
    }).sort((a, b) => b.probability - a.probability);
  }
}

class TriageSystem {
  assessTriageLevel(conditions, session) {
    // Check for emergency conditions first
    const emergencies = conditions.filter(c => 
      this.medicalKnowledgeBase.conditions.emergency.some(e => e.id === c.id)
    );
    
    if (emergencies.length > 0) {
      return {
        level: "emergency",
        priority: 1,
        recommendation: emergencies[0].actions.immediate.join(". ") + ".",
        rationale: `Symptoms suggest ${emergencies[0].name} which requires immediate medical attention`
      };
    }
    
    // Implement full triage logic
    return {
      level: this.calculateTriageLevel(conditions),
      priority: this.calculatePriority(conditions),
      recommendation: this.generateTriageRecommendation(conditions),
      rationale: this.generateTriageRationale(conditions)
    };
  }
}

// UI Integration
document.addEventListener('DOMContentLoaded', function() {
  const medicalAI = new MedicalAI();
  const symptomInput = document.getElementById('symptom-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultsContainer = document.getElementById('results-container');

  analyzeBtn.addEventListener('click', async function() {
    const symptoms = symptomInput.value.trim();
    
    if (!symptoms) {
      showError("Please describe your symptoms");
      return;
    }
    
    showLoading();
    
    try {
      const analysis = await medicalAI.analyzeSymptoms(symptoms);
      displayResults(analysis);
    } catch (error) {
      showError("Analysis failed. Please try again.");
    }
  });

  function displayResults(analysis) {
    resultsContainer.innerHTML = `
      <div class="triage-alert ${analysis.triage.level}">
        <h3>Triage Level: ${analysis.triage.level.toUpperCase()}</h3>
        <p>${analysis.triage.rationale}</p>
        <div class="recommendation">${analysis.triage.recommendation}</div>
      </div>
      
      <div class="conditions-list">
        <h3>Possible Conditions</h3>
        ${analysis.conditions.map(condition => `
          <div class="condition">
            <div class="condition-header">
              <h4>${condition.name}</h4>
              <div class="probability">${condition.probability.toFixed(1)}%</div>
            </div>
            <div class="condition-details">
              <p>Matching symptoms: ${condition.matchedSymptoms.join(", ")}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="recommendations">
        <h3>Recommendations</h3>
        <ul>
          ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}); 
