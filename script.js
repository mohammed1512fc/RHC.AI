// Rapid Health Checker AI - Medical Intelligence Engine (2025)
class MedicalAI {
  constructor() {
    this.medicalKnowledge = this.initializeKnowledgeBase();
    this.userSymptoms = {};
    this.userResponses = {};
  }

  initializeKnowledgeBase() {
    return {
      // Emergency conditions (highest priority)
      emergencyConditions: [
        {
          id: 'heart_attack',
          name: "Acute Myocardial Infarction (Heart Attack)",
          symptoms: ["chest pain", "left arm pain", "shortness of breath", "nausea", "sweating"],
          triggers: {
            chestPain: { duration: ">30min", radiation: true, severity: "severe" }
          },
          probability: 95,
          triage: 'emergency',
          recommendation: "Call emergency services immediately. Chew 325mg aspirin if available and not allergic."
        },
        {
          id: 'stroke',
          name: "Acute Ischemic Stroke",
          symptoms: ["facial droop", "arm weakness", "speech difficulty", "sudden dizziness", "vision loss"],
          triggers: {
            neurological: { sudden: true, multipleSymptoms: true }
          },
          probability: 90,
          triage: 'emergency',
          recommendation: "Call emergency services immediately. Note time of symptom onset."
        }
      ],

      // Systemic conditions
      systemicConditions: [
        {
          id: 'sepsis',
          name: "Sepsis",
          symptoms: ["fever", "chills", "rapid breathing", "confusion", "high heart rate"],
          triggers: {
            infection: { present: true, systemic: true }
          },
          probability: 85,
          triage: 'emergency',
          recommendation: "Seek immediate medical attention. This is a life-threatening condition."
        }
      ],

      // Cardiovascular conditions
      cardiovascular: [
        {
          id: 'angina',
          name: "Stable Angina Pectoris",
          symptoms: ["chest pain", "exertional discomfort", "shortness of breath"],
          triggers: {
            chestPain: { duration: "5-15min", relationToActivity: true }
          },
          probability: 75,
          triage: 'urgent',
          recommendation: "Seek medical evaluation within 24 hours. Avoid strenuous activity."
        }
      ],

      // Neurological conditions
      neurological: [
        {
          id: 'migraine',
          name: "Vestibular Migraine",
          symptoms: ["headache", "dizziness", "nausea", "light sensitivity"],
          triggers: {
            headache: { unilateral: true, throbbing: true }
          },
          probability: 80,
          triage: 'routine',
          recommendation: "Rest in quiet, dark environment. Consider OTC pain relievers."
        }
      ],

      // 200+ additional conditions would be listed here in a real implementation
      // Organized by body systems: respiratory, gastrointestinal, musculoskeletal, etc.
    };
  }

  analyzeSymptoms(symptomDescription, userResponses) {
    // Preprocess symptoms
    const symptoms = this.preprocessInput(symptomDescription);
    this.userSymptoms = symptoms;
    this.userResponses = userResponses;

    // Initialize results
    const analysis = {
      conditions: [],
      recommendations: [],
      triage: { level: 'self-care', reason: '', recommendation: '' }
    };

    // Check emergency conditions first
    const emergencyResults = this.checkEmergencyConditions();
    if (emergencyResults) return emergencyResults;

    // Check systemic conditions
    const systemicResults = this.checkSystemicConditions();
    if (systemicResults.triage.level === 'emergency') return systemicResults;

    // Check other body systems
    const fullAnalysis = this.comprehensiveAnalysis();
    
    // Combine results with proper prioritization
    return this.finalizeAnalysis(fullAnalysis);
  }

  checkEmergencyConditions() {
    const emergencyMatches = [];
    
    this.medicalKnowledge.emergencyConditions.forEach(condition => {
      const matchScore = this.calculateMatchScore(condition);
      if (matchScore > 80) {
        emergencyMatches.push({
          condition,
          score: matchScore
        });
      }
    });

    if (emergencyMatches.length > 0) {
      const topEmergency = emergencyMatches.sort((a, b) => b.score - a.score)[0];
      return {
        conditions: [{
          name: topEmergency.condition.name,
          probability: topEmergency.condition.probability,
          description: this.generateConditionDescription(topEmergency.condition)
        }],
        triage: {
          level: 'emergency',
          reason: `Symptoms suggest possible ${topEmergency.condition.name}`,
          recommendation: topEmergency.condition.recommendation
        },
        recommendations: this.generateEmergencyRecommendations(topEmergency.condition)
      };
    }
    return null;
  }

  comprehensiveAnalysis() {
    const allConditions = [
      ...this.medicalKnowledge.cardiovascular,
      ...this.medicalKnowledge.neurological,
      // Add all other condition categories
    ];

    const possibleConditions = allConditions.map(condition => {
      const matchScore = this.calculateMatchScore(condition);
      return {
        condition,
        score: matchScore
      };
    }).filter(item => item.score > 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Return top 5 matches

    // Determine triage level based on top conditions
    const triageLevel = this.determineTriageLevel(possibleConditions);

    return {
      conditions: possibleConditions.map(item => ({
        name: item.condition.name,
        probability: item.score,
        description: this.generateConditionDescription(item.condition)
      })),
      triage: {
        level: triageLevel,
        reason: this.generateTriageReason(triageLevel),
        recommendation: this.generateTriageRecommendation(triageLevel)
      },
      Recommendations: this.generateGeneralRecommendations(possibleConditions)
    };
  }

  // 20+ additional helper methods would be here in a full implementation
  // Including: calculateMatchScore, generateRecommendations, etc.
}

// UI Integration
document.addEventListener('DOMContentLoaded', function() {
  const medicalAI = new MedicalAI();
  
  // DOM elements
  const analyzeBtn = document.getElementById('analyze-btn');
  const symptomInput = document.getElementById('symptom-input');
  const resultsSection = document.getElementById('results-section');
  
  analyzeBtn.addEventListener('click', function() {
    const symptoms = symptomInput.value;
    const analysis = medicalAI.analyzeSymptoms(symptoms, {});
    
    // Display results
    displayResults(analysis);
  });
  
  function displayResults(analysis) {
    // Implementation would display the analysis results
  }
}); 
