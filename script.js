// script.js for Rapid Health Checker AI

document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyze-button');
    const symptomsInput = document.getElementById('symptoms');
    const resultContainer = document.getElementById('result-container');
    const conditionElement = document.getElementById('condition');
    const triageLevelElement = document.getElementById('triage-level');
    const recommendationsContainer = document.getElementById('recommendations');

    // --- SUPER STRONG AI CORE (Simplified Example) ---
    const healthDatabase = {
        "headache, fever, cough": {
            condition: "Possible Flu or Common Cold",
            triage: "Low to Medium - Monitor symptoms, rest, and consider over-the-counter medication. Consult a doctor if symptoms worsen or persist.",
            keywords: ["headache", "fever", "cough", "flu", "cold", "respiratory"],
            guide: "Ensure you get plenty of rest and stay hydrated. Over-the-counter pain relievers can help with headache and fever. Monitor your temperature and breathing. If you experience difficulty breathing, chest pain, or high fever that doesn't subside, seek medical attention immediately.",
            recommendations: ["Rest and hydration are crucial.", "Consider over-the-counter pain and fever medication.", "Monitor your symptoms closely.", "Isolate yourself to prevent spread if you suspect an infectious illness."]
        },
        "abdominal pain, vomiting, diarrhea": {
            condition: "Possible Gastroenteritis (Stomach Flu)",
            triage: "Medium - Stay hydrated with clear fluids. Seek medical attention if symptoms are severe, persist for more than 24-48 hours, or if you have signs of dehydration.",
            keywords: ["abdominal pain", "stomach ache", "vomiting", "diarrhea", "gastroenteritis", "nausea", "dehydration", "digestive"],
            guide: "Focus on staying hydrated by drinking small, frequent sips of clear fluids like water, broth, or electrolyte solutions. Avoid solid foods until vomiting and diarrhea subside. If you experience severe abdominal pain, bloody stool, high fever, or signs of dehydration (dizziness, reduced urination), consult a doctor immediately.",
            recommendations: ["Oral rehydration solutions are beneficial.", "Avoid dairy and greasy foods initially.", "Get plenty of rest.", "Wash your hands frequently to prevent further spread."]
        },
        "chest pain, shortness of breath": {
            condition: "Possible Cardiac Issue or Respiratory Distress",
            triage: "High - Seek immediate medical attention. Call emergency services or go to the nearest emergency room.",
            keywords: ["chest pain", "shortness of breath", "difficulty breathing", "chest tightness", "heart", "lung", "respiratory", "emergency"],
            guide: "This could be a sign of a serious medical condition. Do not delay seeking help. Call emergency services immediately. Try to remain calm while waiting for assistance.",
            recommendations: ["Call emergency services immediately.", "Do not drive yourself to the hospital if possible.", "Try to stay as still and calm as possible."]
        },
        "skin rash, itching": {
            condition: "Possible Allergic Reaction or Skin Condition",
            triage: "Low to Medium - Monitor the rash. If it spreads rapidly, causes difficulty breathing or swelling, seek immediate medical attention. Over-the-counter antihistamines might help with itching.",
            keywords: ["skin rash", "itching", "hives", "allergy", "dermatitis", "skin", "redness", "swelling"],
            guide: "Try to identify any potential triggers for the rash, such as new foods, medications, or environmental factors. Avoid scratching to prevent further irritation. Over-the-counter antihistamines can help relieve itching. If the rash is severe, widespread, blistering, or accompanied by difficulty breathing or swelling, seek medical attention promptly.",
            recommendations: ["Identify potential allergens.", "Avoid scratching the affected area.", "Consider over-the-counter antihistamines.", "Consult a doctor for severe or worsening rashes."]
        },
        "persistent fatigue, weight loss": {
            condition: "Possible Underlying Medical Condition",
            triage: "Medium - Consult a doctor for evaluation and diagnosis. Further testing may be required.",
            keywords: ["fatigue", "tiredness", "weight loss", "persistent", "underlying", "medical", "evaluation", "diagnosis"],
            guide: "Persistent fatigue and unexplained weight loss can be symptoms of various medical conditions. It's important to consult a doctor for a thorough evaluation, which may include blood tests and other diagnostic procedures. Keep track of your symptoms and any other changes you've noticed.",
            recommendations: ["Schedule an appointment with your primary care physician.", "Keep a detailed record of your symptoms.", "Be prepared to discuss your medical history."]
        },
        // --- LOTS AND LOTS OF KEYWORDS and more conditions ---
        "headache, nausea, dizziness": {
            condition: "Possible Migraine or Dehydration",
            triage: "Low to Medium - Rest in a dark, quiet room. Ensure adequate hydration. If symptoms are severe or frequent, consult a doctor.",
            keywords: ["headache", "nausea", "dizziness", "migraine", "dehydration", "light sensitivity", "throbbing"],
            guide: "Lie down in a dark, quiet room. Apply a cold compress to your forehead or temples. Drink plenty of water or electrolyte solutions. If your headaches are severe, frequent, or accompanied by other concerning symptoms like vision changes or weakness, consult a doctor.",
            recommendations: ["Rest in a dark, quiet place.", "Stay hydrated.", "Avoid potential migraine triggers (e.g., certain foods, stress).", "Consult a doctor for recurrent or severe headaches."]
        },
        "sore throat, difficulty swallowing": {
            condition: "Possible Sore Throat or Infection (e.g., Strep Throat)",
            triage: "Low to Medium - Gargle with warm salt water. Consider over-the-counter pain relievers. See a doctor if symptoms are severe or persist for more than a few days, especially with fever or white spots on the tonsils.",
            keywords: ["sore throat", "difficulty swallowing", "painful throat", "infection", "strep throat", "tonsils", "fever"],
            guide: "Gargle with warm salt water several times a day. Over-the-counter pain relievers can help with discomfort. If you have a high fever, difficulty breathing, or white spots on your tonsils, it's important to see a doctor to rule out a bacterial infection like strep throat, which may require antibiotics.",
            recommendations: ["Gargle with warm salt water.", "Use throat lozenges or sprays for temporary relief.", "Stay hydrated.", "Consult a doctor if symptoms worsen or don't improve."]
        },
        "back pain, radiating leg pain": {
            condition: "Possible Sciatica or Musculoskeletal Issue",
            triage: "Low to Medium - Rest and avoid activities that aggravate the pain. Over-the-counter pain relievers or anti-inflammatory medications may help. If the pain is severe, persistent, or accompanied by weakness or numbness in the legs, consult a doctor.",
            keywords: ["back pain", "leg pain", "sciatica", "nerve pain", "radiating pain", "musculoskeletal", "lower back"],
            guide: "Rest and avoid activities that worsen your pain. You can try applying heat or ice packs to the affected area. Over-the-counter pain relievers or nonsteroidal anti-inflammatory drugs (NSAIDs) may provide relief. If the pain is severe, doesn't improve with home care, or if you experience weakness, numbness, or loss of bowel or bladder control, seek medical attention.",
            recommendations: ["Rest and avoid strenuous activity.", "Apply heat or ice packs.", "Consider over-the-counter pain relievers.", "Consult a doctor for persistent or severe pain."]
        },
        "cough, wheezing, chest tightness": {
            condition: "Possible Asthma or Bronchitis",
            triage: "Medium - If you have a known history of asthma, use your inhaler. If symptoms are severe or you have difficulty breathing, seek immediate medical attention.",
            keywords: ["cough", "wheezing", "chest tightness", "asthma", "bronchitis", "respiratory", "breathing difficulty", "inhaler"],
            guide: "If you have asthma, use your prescribed inhaler as directed. Try to stay calm and sit upright. If your symptoms are severe, you are having significant difficulty breathing, or your lips or face are turning blue, seek emergency medical attention immediately.",
            recommendations: ["Use your asthma inhaler if prescribed.", "Avoid known triggers (e.g., allergens, smoke).", "Stay hydrated.", "Seek immediate medical help for severe breathing difficulties."]
        },
        "fatigue, pale skin, shortness of breath on exertion": {
            condition: "Possible Anemia",
            triage: "Low to Medium - Consult a doctor for blood tests to determine the cause of anemia and appropriate treatment.",
            keywords: ["fatigue", "pale skin", "shortness of breath", "exertion", "anemia", "iron deficiency", "blood", "tiredness"],
            guide: "These symptoms could indicate anemia, which can have various underlying causes, such as iron deficiency. It's important to see a doctor for blood tests to determine the specific type of anemia and receive appropriate treatment, which may include dietary changes or supplements.",
            recommendations: ["Schedule an appointment with your doctor for blood tests.", "Discuss your diet and potential need for supplements.", "Follow your doctor's recommendations for treatment."]
        },
        // ... (Imagine many more conditions, symptoms, keywords, guides, and recommendations here) ...
        "ankle swelling, leg pain after long flight": {
            condition: "Possible Deep Vein Thrombosis (DVT)",
            triage: "Medium to High - Consult a doctor immediately, especially if the swelling is in one leg, accompanied by pain, redness, or warmth.",
            keywords: ["ankle swelling", "leg swelling", "leg pain", "flight", "travel", "DVT", "deep vein thrombosis", "blood clot"],
            guide: "Swelling and pain in one leg, especially after a long period of immobility like a flight, could be a sign of a deep vein thrombosis (DVT), a serious condition involving a blood clot. Seek immediate medical attention for diagnosis and treatment.",
            recommendations: ["Consult a doctor immediately.", "Avoid massaging the affected leg.", "Follow medical advice regarding diagnosis and treatment."]
        },
        "sudden severe headache, stiff neck": {
            condition: "Possible Meningitis or Subarachnoid Hemorrhage",
            triage: "High - Seek immediate medical attention. This could be a sign of a serious neurological condition.",
            keywords: ["sudden headache", "severe headache", "stiff neck", "neurological", "emergency", "meningitis", "hemorrhage"],
            guide: "A sudden, severe headache accompanied by a stiff neck can be a sign of a serious neurological emergency. Seek immediate medical attention by calling emergency services or going to the nearest emergency room.",
            recommendations: ["Call emergency services immediately.", "Do not try to treat this at home.", "Follow the instructions of medical professionals."]
        },
        "frequent urination, excessive thirst": {
            condition: "Possible Diabetes",
            triage: "Medium - Consult a doctor for blood glucose testing and evaluation.",
            keywords: ["frequent urination", "polyuria", "excessive thirst", "polydipsia", "diabetes", "blood sugar", "glucose", "endocrine"],
            guide: "Frequent urination and excessive thirst are classic symptoms of diabetes. It's important to get your blood glucose levels checked by a doctor for diagnosis and management.",
            recommendations: ["Schedule an appointment with your doctor for blood glucose testing.", "Discuss your family history of diabetes.", "Be prepared to discuss your diet and lifestyle."]
        },
        "heartburn, regurgitation": {
            condition: "Possible Acid Reflux (GERD)",
            triage: "Low to Medium - Try over-the-counter antacids. Avoid trigger foods (e.g., spicy, fatty). Consult a doctor if symptoms are frequent or severe.",
            keywords: ["heartburn", "acid reflux", "regurgitation", "GERD", "indigestion", "stomach acid", "esophagus"],
            guide: "Over-the-counter antacids can provide temporary relief from heartburn. Identify and avoid foods that seem to trigger your symptoms. Eating smaller, more frequent meals and avoiding lying down immediately after eating can also help. If your symptoms are frequent, severe, or don't improve with home care, consult a doctor.",
            recommendations: ["Try over-the-counter antacids.", "Identify and avoid trigger foods.", "Eat smaller, more frequent meals.", "Consult a doctor for persistent symptoms."]
        },
        "joint pain, stiffness": {
            condition: "Possible Arthritis",
            triage: "Low to Medium - Over-the-counter pain relievers or anti-inflammatory medications may help. Consult a doctor for diagnosis and long-term management.",
            keywords: ["joint pain", "stiffness", "arthritis", "osteoarthritis", "rheumatoid arthritis", "inflammation", "mobility"],
            guide: "Over-the-counter pain relievers or nonsteroidal anti-inflammatory drugs (NSAIDs) can help manage joint pain and stiffness. Regular gentle exercise can also be beneficial for maintaining mobility. Consult a doctor for a proper diagnosis and long-term management plan, which may include physical therapy or prescription medications.",
            recommendations: ["Consider over-the-counter pain relievers or NSAIDs.", "Engage in gentle exercise.", "Consult a doctor for diagnosis and management."]
        },
        "mood swings, changes in appetite": {
            condition: "Possible Mood Disorder or Hormonal Imbalance",
            triage: "Medium - Consult a doctor or mental health professional for evaluation.",
            keywords: ["mood swings", "appetite changes", "anxiety", "depression", "mental health", "hormones", "emotional"],
            guide: "Significant mood swings and changes in appetite can be indicative of a mood disorder or a hormonal imbalance. It's important to seek professional help from a doctor or mental health professional for a thorough evaluation and appropriate support or treatment.",
            recommendations: ["Schedule an appointment with your doctor or a mental health professional.", "Keep track of your mood and appetite changes.", "Be open and honest about your symptoms."]
        },
        "vision changes, eye pain": {
            condition: "Possible Eye Condition",
            triage: "Medium - Consult an ophthalmologist for a comprehensive eye exam.",
            keywords: ["vision changes", "eye pain", "blurred vision", "double vision", "eye strain", "ophthalmology", "eyesight"],
            guide: "Any sudden or significant changes in vision or eye pain should be evaluated by an ophthalmologist. They can perform a comprehensive eye exam to diagnose any underlying conditions and recommend appropriate treatment.",
            recommendations: ["Schedule an appointment with an ophthalmologist.", "Avoid rubbing your eyes.", "Describe your symptoms in detail to the eye doctor."]
        },
        // ... EVEN MORE CONDITIONS AND KEYWORDS ...
        "swollen lymph nodes, night sweats": {
            condition: "Possible Infection or Lymphatic Issue",
            triage: "Medium - Consult a doctor for evaluation to determine the cause.",
            keywords: ["swollen lymph nodes", "night sweats", "infection", "lymphatic", "inflammation", "immune system"],
            guide: "Swollen lymph nodes and night sweats can be symptoms of an infection or a problem with the lymphatic system. It's important to see a doctor to determine the underlying cause and receive appropriate treatment.",
            recommendations: ["Schedule an appointment with your doctor.", "Note any other accompanying symptoms.", "Follow your doctor's recommendations for testing and treatment."]
        },
        "unexplained bruising, bleeding gums": {
            condition: "Possible Blood Disorder or Vitamin Deficiency",
            triage: "Medium - Consult a doctor for blood tests and evaluation.",
            keywords: ["bruising", "bleeding gums", "blood disorder", "vitamin deficiency", "platelets", "coagulation"],
            guide: "Unexplained bruising and bleeding gums can be signs of a blood disorder or a vitamin deficiency. It's important to consult a doctor for blood tests to determine the cause and receive appropriate treatment.",
            recommendations: ["Schedule an appointment with your doctor.", "Be prepared to discuss your medical history and diet.", "Follow your doctor's recommendations for testing and treatment."]
        },
        "tremors, slow movement": {
            condition: "Possible Neurological Condition (e.g., Parkinson's)",
            triage: "Medium to High - Consult a neurologist for evaluation.",
            keywords: ["tremors", "shaking", "slow movement", "bradykinesia", "neurology", "Parkinson's", "nervous system"],
            guide: "Tremors and slow movement can be symptoms of a neurological condition like Parkinson's disease. It's important to consult a neurologist for a thorough evaluation and diagnosis.",
            recommendations: ["Schedule an appointment with a neurologist.", "Note when the symptoms started and how they've progressed.", "Be prepared to discuss your family history."]
        },
        "jaundice (yellowing of skin and eyes)": {
            condition: "Possible Liver or Gallbladder Issue",
            triage: "High - Seek immediate medical attention.",
            keywords: ["jaundice", "yellow skin", "yellow eyes", "liver", "gallbladder", "bilirubin", "hepatic"],
            guide: "Jaundice, or the yellowing of the skin and eyes, can indicate a problem with the liver or gallbladder. Seek immediate medical attention for diagnosis and treatment.",
            recommendations: ["Seek immediate medical attention.", "Avoid alcohol and other substances that can affect the liver.", "Follow the advice of medical professionals."]
        },
        "sudden numbness or weakness on one side of the body": {
            condition: "Possible Stroke",
            triage: "High - Seek immediate medical attention. Call emergency services immediately.",
            keywords: ["numbness", "weakness", "one side", "stroke", "cerebrovascular", "neurological", "emergency"],
            guide: "Sudden numbness or weakness, especially on one side of the body, can be a sign of a stroke. Time is critical. Call emergency services immediately.",
            recommendations: ["Call emergency services immediately.", "Note the exact time the symptoms started.", "Try to remain calm while waiting for help."]
        },
        // ... AND SO ON! The more data, the "stronger" the simplified AI.
    };

    function analyzeSymptoms() {
        const symptomsText = symptomsInput.value.toLowerCase();
        const symptomList = symptomsText.split(/[\s,]+/); // Split by spaces and commas
        let bestMatch = null;
        let bestMatchScore = 0;

        for (const condition in healthDatabase) {
            const conditionData = healthDatabase[condition];
            let currentMatchScore = 0;
            const conditionKeywords = conditionData.keywords.map(keyword => keyword.toLowerCase());

            symptomList.forEach(symptom => {
                if (conditionKeywords.includes(symptom) && symptom.length > 2) { // Basic keyword matching, longer words are prioritized slightly
                    currentMatchScore++;
                }
            });

            // A slightly more sophisticated scoring: consider the number of matched keywords
            const normalizedScore = currentMatchScore / conditionKeywords.length;

            if (normalizedScore > bestMatchScore && currentMatchScore > 0) {
                bestMatchScore = normalizedScore;
                bestMatch = conditionData;
            }
        }

        resultContainer.style.display = 'block';
        recommendationsContainer.innerHTML = '<h4><i class="fas fa-lightbulb"></i> Guidance and Recommendations:</h4>'; // Reset recommendations

        if (bestMatch) {
            conditionElement.textContent = bestMatch.condition;
            triageLevelElement.textContent = bestMatch.triage;

            const guideParagraph = document.createElement('p');
            guideParagraph.textContent = bestMatch.guide;
            recommendationsContainer.appendChild(guideParagraph);

            if (bestMatch.recommendations && bestMatch.recommendations.length > 0) {
                const recommendationsList = document.createElement('ul');
                bestMatch.recommendations.forEach(recommendation => {
                    const listItem = document.createElement('li');
                    listItem.textContent = recommendation;
                    recommendationsList.appendChild(listItem);
                });
                recommendationsContainer.appendChild(recommendationsList);
            }
        } else {
            conditionElement.textContent = "No strong match found.";
            triageLevelElement.textContent = "Unable to determine triage level. Please provide more detailed symptoms or consult a medical professional.";
            const noMatchParagraph = document.createElement('p');
            noMatchParagraph.textContent = "Our AI couldn't find a strong match based on the symptoms you provided. This tool is for informational purposes only and should not replace professional medical advice. If you are concerned about your health, please consult a doctor.";
            recommendationsContainer.appendChild(noMatchParagraph);
        }

        // --- FANCY ANIMATIONS ON RESULTS ---
        resultContainer.classList.add('animated', 'fadeIn');
        setTimeout(() => {
            resultContainer.classList.remove('animated', 'fadeIn');
        }, 1000);
    }

    // --- KEYWORD GUIDE (More Keywords for the AI to Learn From) ---
    const keywordGuide = [
        "ache", "pain", "tired", "weak", "dizzy", "lightheaded", "sick", "ill",
        "swelling", "inflammation", "redness", "warmth", "pus", "discharge",
        "breathing", "coughing", "sneezing", "congestion", "runny nose", "sore",
        "stomach", "abdomen", "bowels", "digestion", "appetite", "thirst",
        "skin", "rash", "itch", "bumps", "blisters", "peeling",
        "head", "eyes", "vision", "ears", "hearing", "nose", "throat",
        "heart", "chest", "pulse", "blood pressure",
        "muscles", "joints", "bones", "movement", "stiffness",
        "mood", "emotions", "sleep", "energy", "concentration",
        // ... Hundreds more relevant medical keywords could be added here ...
        "malaise", "lethargy", "pallor", "cyanosis", "edema", "erythema",
        "pruritus", "urticaria", "vesicles", "pustules", "excoriation",
        "rhinorrhea", "pharyngitis", "laryngitis", "dyspnea", "tachypnea",
        "palpitations", "tachycardia", "bradycardia", "hypertension", "hypotension",
        "arthralgia", "myalgia", "crepitus", "effusion", "ataxia", "paresis",
        "anhedonia", "insomnia", "hypersomnia", "irritable", "euphoric",
        "diplopia", "photophobia", "tinnitus", "vertigo", "anosmia", "ageusia",
        // ... And even more specific medical terms ...
        "gastroesophageal reflux", "irritable bowel syndrome", "urinary tract infection",
        "pneumonia", "sinusitis", "otitis media", "conjunctivitis",
        "hypertension", "hyperlipidemia", "coronary artery disease",
        "osteoarthritis", "rheumatoid arthritis", "gout",
        "anxiety disorder", "major depressive disorder", "bipolar disorder",
        // ... And so on, to make the AI more comprehensive.
    ];

    // --- GUIDE AND RECOMMENDATIONS (More Detailed Information) ---
    const generalHealthGuide = {
        "rest": "Prioritize getting adequate sleep, typically 7-9 hours for adults, to allow your body to recover and function optimally.",
        "hydration": "Drink plenty of fluids, especially water, throughout the day. Dehydration can worsen many symptoms.",
        "nutrition": "Eat a balanced diet rich in fruits, vegetables, whole grains, and lean protein to support your immune system and overall health.",
        "over-the-counter medication": "For mild symptoms like pain or fever, consider using over-the-counter medications as directed on the packaging.",
        "monitor symptoms": "Pay close attention to how your symptoms change over time. Note any new symptoms or worsening of existing ones.",
        "seek medical advice": "If your symptoms are severe, persistent, or concerning, consult a doctor for professional medical advice and diagnosis."
        // ... More general health advice ...
    };

    // The 'healthDatabase' already contains specific guides and recommendations for each condition.
    // This 'generalHealthGuide' could be used for more general advice if no strong match is found.

    // --- FANCY ANIMATION LIBRARY INTEGRATION (Example with Animate.css) ---
    // You'd need to include the Animate.css library in your HTML's <head>:
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
}); 
