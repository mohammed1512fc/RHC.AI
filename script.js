const aiDatabase = [
  // --- CARDIOVASCULAR SYSTEM ---
  { keyword: ["chest pain", "tightness", "left arm pain", "jaw pain"], condition: "Possible Heart Attack", urgency: "🚨 Emergency", recommendation: "Call 911 immediately. Take aspirin if not allergic." },
  { keyword: ["irregular heartbeat", "palpitations"], condition: "Possible Arrhythmia", urgency: "⚠️ Moderate", recommendation: "Schedule cardiology evaluation." },
  { keyword: ["swollen legs", "swelling ankles"], condition: "Possible Congestive Heart Failure", urgency: "⚠️ Serious", recommendation: "Consult cardiologist immediately." },

  // --- RESPIRATORY SYSTEM ---
  { keyword: ["shortness of breath", "difficulty breathing"], condition: "Possible Asthma or COPD", urgency: "⚠️ Moderate to Emergency", recommendation: "Use rescue inhaler and seek medical attention." },
  { keyword: ["persistent cough", "blood cough"], condition: "Possible Lung Infection or Cancer", urgency: "⚠️ Urgent", recommendation: "See pulmonologist urgently." },
  { keyword: ["sudden breathing stop", "can't breathe"], condition: "Possible Airway Blockage or Severe Asthma", urgency: "🚨 Emergency", recommendation: "Call 911 immediately!" },

  // --- NEUROLOGICAL SYSTEM ---
  { keyword: ["seizure", "convulsion"], condition: "Possible Epilepsy or Acute Neurological Event", urgency: "🚨 Emergency", recommendation: "Protect head, call emergency services immediately." },
  { keyword: ["vision loss", "blurred vision", "double vision"], condition: "Possible Stroke or Eye Emergency", urgency: "🚨 Emergency", recommendation: "Call 911 immediately." },
  { keyword: ["loss of balance", "difficulty walking"], condition: "Possible Stroke or Brain Tumor", urgency: "⚠️ Urgent", recommendation: "Seek urgent neurological assessment." },
  { keyword: ["tremors", "shaking hands"], condition: "Possible Parkinson's Disease", urgency: "🧠 Important", recommendation: "See neurologist for evaluation." },

  // --- GASTROINTESTINAL SYSTEM ---
  { keyword: ["abdominal pain", "nausea", "vomiting"], condition: "Possible Appendicitis", urgency: "🚨 Emergency", recommendation: "Seek immediate ER care." },
  { keyword: ["bloody stool", "black stool"], condition: "Possible Gastrointestinal Bleeding", urgency: "⚠️ Serious", recommendation: "Go to emergency department." },
  { keyword: ["persistent diarrhea", "dehydration"], condition: "Possible Gastroenteritis", urgency: "🩺 Mild to Moderate", recommendation: "Hydrate and monitor." },
  { keyword: ["jaundice", "yellow skin"], condition: "Possible Liver Disease", urgency: "⚠️ Urgent", recommendation: "Seek specialist consultation." },

  // --- RENAL / URINARY SYSTEM ---
  { keyword: ["back pain", "painful urination", "blood urine"], condition: "Possible Kidney Infection or Stones", urgency: "⚠️ Moderate", recommendation: "Consult urologist." },
  { keyword: ["frequent urination", "increased thirst"], condition: "Possible Diabetes or Urinary Infection", urgency: "🩺 Mild to Moderate", recommendation: "Check blood sugar and consult physician." },

  // --- SKIN / IMMUNE SYSTEM ---
  { keyword: ["rash", "itchy skin", "hives"], condition: "Possible Allergic Reaction", urgency: "⚠️ Moderate", recommendation: "Take antihistamines and monitor." },
  { keyword: ["blistering rash", "severe skin pain"], condition: "Possible Shingles (Herpes Zoster)", urgency: "⚠️ Urgent", recommendation: "Antiviral treatment within 72 hours." },
  { keyword: ["open wound", "infected cut"], condition: "Possible Skin Infection", urgency: "⚠️ Moderate", recommendation: "Clean wound and seek medical attention if worsening." },

  // --- MUSCULOSKELETAL SYSTEM ---
  { keyword: ["joint pain", "swollen joints"], condition: "Possible Rheumatoid Arthritis", urgency: "🩺 Mild to Moderate", recommendation: "Consult rheumatologist." },
  { keyword: ["bone pain", "easy fractures"], condition: "Possible Osteoporosis", urgency: "🩺 Mild", recommendation: "Bone density scan recommended." },
  
  // --- ENDOCRINE SYSTEM ---
  { keyword: ["weight gain", "cold intolerance"], condition: "Possible Hypothyroidism", urgency: "🩺 Mild", recommendation: "Blood test for thyroid hormones." },
  { keyword: ["weight loss", "heat intolerance"], condition: "Possible Hyperthyroidism", urgency: "🩺 Mild to Moderate", recommendation: "Consult endocrinologist." },

  // --- MENTAL HEALTH / PSYCHIATRY ---
  { keyword: ["hopeless", "suicidal thoughts"], condition: "Mental Health Crisis", urgency: "🚨 Mental Health Emergency", recommendation: "Call crisis hotline or 911 immediately." },
  { keyword: ["anxiety attack", "panic attack"], condition: "Acute Anxiety Disorder", urgency: "⚠️ Moderate", recommendation: "Breathing exercises, seek mental health care." },
  { keyword: ["memory problems", "confusion"], condition: "Possible Early Dementia", urgency: "🧠 Important", recommendation: "Neurological evaluation recommended." },

  // --- PREGNANCY & WOMEN'S HEALTH ---
  { keyword: ["pregnant", "bleeding"], condition: "Possible Pregnancy Complication", urgency: "⚠️ Urgent", recommendation: "Obstetric emergency evaluation needed." },
  { keyword: ["severe cramps during period"], condition: "Possible Endometriosis", urgency: "🩺 Mild to Moderate", recommendation: "Consult gynecologist." },

  // --- GENERAL SYMPTOMS ---
  { keyword: ["fatigue", "tired all the time"], condition: "Possible Anemia or Chronic Fatigue Syndrome", urgency: "🩺 Mild to Moderate", recommendation: "General check-up and blood work recommended." },
  { keyword: ["night sweats", "unexplained weight loss"], condition: "Possible Lymphoma or TB", urgency: "⚠️ Serious", recommendation: "Urgent medical evaluation." },
  { keyword: ["frequent infections"], condition: "Possible Immune Deficiency", urgency: "⚠️ Serious", recommendation: "Immune function testing recommended." },
  { keyword: ["swollen lymph nodes"], condition: "Possible Infection or Cancer", urgency: "⚠️ Serious", recommendation: "Consult physician if persists beyond 2 weeks." },
  
  // --- BLOOD DISORDERS ---
  { keyword: ["easy bruising", "nosebleeds"], condition: "Possible Blood Clotting Disorder", urgency: "⚠️ Moderate", recommendation: "See hematologist for blood tests." },
]; 
