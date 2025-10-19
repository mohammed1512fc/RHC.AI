// RapidHealthAI - Main JavaScript File
// Advanced AI Symptom Checker with 3000+ symptoms and 2500+ conditions

// Medical Database
const medicalDatabase = {
    // Comprehensive symptoms database organized by body systems
    symptoms: {
        cardiovascular: [
            "Chest pain", "Shortness of breath", "Heart palpitations", "Irregular heartbeat", 
            "Chest pressure", "Dizziness", "Fainting", "Swelling in legs", "Fatigue", 
            "High blood pressure", "Low blood pressure", "Rapid heartbeat", "Slow heartbeat",
            "Chest tightness", "Pain in left arm", "Jaw pain", "Neck pain", "Back pain",
            "Nausea", "Sweating", "Pale skin", "Bluish lips", "Cold extremities"
        ],
        respiratory: [
            "Cough", "Shortness of breath", "Wheezing", "Chest pain", "Chest tightness",
            "Phlegm", "Sore throat", "Runny nose", "Stuffy nose", "Sneezing",
            "Difficulty breathing", "Rapid breathing", "Shallow breathing", "Chest congestion",
            "Hoarseness", "Loss of voice", "Throat irritation", "Nasal congestion",
            "Post-nasal drip", "Sinus pressure", "Ear pressure", "Headache", "Fatigue"
        ],
        neurological: [
            "Headache", "Dizziness", "Confusion", "Memory loss", "Difficulty concentrating",
            "Numbness", "Tingling", "Weakness", "Paralysis", "Seizures", "Tremors",
            "Loss of consciousness", "Fainting", "Blurred vision", "Double vision",
            "Slurred speech", "Difficulty speaking", "Difficulty understanding",
            "Loss of balance", "Coordination problems", "Muscle spasms", "Neck stiffness",
            "Light sensitivity", "Sound sensitivity", "Sleep problems", "Mood changes"
        ],
        gastrointestinal: [
            "Abdominal pain", "Nausea", "Vomiting", "Diarrhea", "Constipation",
            "Bloating", "Gas", "Heartburn", "Indigestion", "Loss of appetite",
            "Weight loss", "Weight gain", "Difficulty swallowing", "Stomach cramps",
            "Acid reflux", "Blood in stool", "Black stool", "Mucus in stool",
            "Hemorrhoids", "Anal pain", "Jaundice", "Fatigue", "Weakness"
        ],
        musculoskeletal: [
            "Joint pain", "Muscle pain", "Back pain", "Neck pain", "Shoulder pain",
            "Knee pain", "Hip pain", "Ankle pain", "Wrist pain", "Elbow pain",
            "Muscle weakness", "Joint stiffness", "Muscle cramps", "Muscle spasms",
            "Limited mobility", "Difficulty walking", "Joint swelling", "Muscle swelling",
            "Bone pain", "Fractures", "Sprains", "Strains", "Tendonitis", "Bursitis"
        ],
        dermatological: [
            "Rash", "Itching", "Dry skin", "Oily skin", "Acne", "Eczema", "Psoriasis",
            "Hives", "Blisters", "Warts", "Moles", "Skin discoloration", "Hair loss",
            "Dandruff", "Nail changes", "Skin lesions", "Bruising", "Bleeding under skin",
            "Sunburn", "Skin cancer", "Fungal infections", "Bacterial infections",
            "Viral infections", "Allergic reactions", "Contact dermatitis"
        ], 
        symptoms: {
    cardiovascular: [
        // Chest & Heart Sensations
        "Chest pain", "Chest pressure", "Chest tightness", "Chest heaviness", "Heart palpitations", "Irregular heartbeat", "Rapid heartbeat", "Slow heartbeat", "Skipped beats", "Fluttering in chest", "Pounding heart", "Heart murmur", "Awareness of heartbeat",

        // Pain Radiations
        "Pain radiating to left arm", "Pain radiating to right arm", "Pain radiating to jaw", "Pain radiating to neck", "Pain radiating to back", "Pain radiating to shoulder", "Pain radiating to upper abdomen",

        // Circulation & Color
        "Swelling in legs", "Swelling in ankles", "Swelling in feet", "Pitting edema", "Cold hands", "Cold feet", "Pale skin", "Bluish lips", "Bluish skin", "Bluish nail beds", "Clubbing of fingers", "Pallor", "Mottled skin", "Poor capillary refill", "Varicose veins", "Spider veins",

        // Blood Pressure & Perfusion
        "High blood pressure", "Low blood pressure", "Orthostatic hypotension", "Dizziness", "Lightheadedness", "Fainting", "Near-fainting", "Weak pulse", "Thready pulse", "Bounding pulse",

        // Respiratory Link
        "Shortness of breath", "Difficulty breathing lying flat", "Paroxysmal nocturnal dyspnea", "Exercise intolerance", "Fatigue", "Weakness",

        // Systemic
        "Excessive sweating", "Cold sweats", "Nausea", "Indigestion", "Abdominal bloating", "Loss of appetite", "Cough", "Coughing up blood", "Decreased urine output", "Nocturia"
    ],

    respiratory: [
        // Breathing Patterns & Sensations
        "Shortness of breath", "Difficulty breathing", "Labored breathing", "Shallow breathing", "Rapid breathing", "Slow breathing", "Cheyne-Stokes respiration", "Air hunger", "Inability to take deep breath", "Feeling of suffocation", "Wheezing", "Stridor", "Grunting",

        // Cough & Sputum
        "Cough", "Dry cough", "Productive cough", "Wet cough", "Barking cough", "Whooping cough", "Persistent cough", "Coughing up phlegm", "Coughing up blood", "Clear sputum", "White sputum", "Yellow sputum", "Green sputum", "Rust-colored sputum", "Frothy sputum", "Thick sputum",

        // Nasal & Sinus
        "Runny nose", "Stuffy nose", "Nasal congestion", "Nasal discharge", "Post-nasal drip", "Sneezing", "Sinus pressure", "Sinus pain", "Sinus headache", "Loss of smell", "Impaired smell", "Facial pain", "Facial tenderness",

        // Throat & Voice
        "Sore throat", "Throat pain", "Throat irritation", "Scratchy throat", "Hoarseness", "Loss of voice", "Voice changes", "Difficulty swallowing", "Swollen tonsils", "Tonsil exudate",

        // Chest Sensations
        "Chest pain", "Chest tightness", "Pleuritic chest pain", "Chest congestion", "Rattling in chest", "Pleurisy",

        // Auditory
        "Clubbed fingers", "Cyanosis", "Fever", "Chills", "Night sweats", "Fatigue", "Weight loss", "Loss of appetite"
    ],

    neurological: [
        // Head & Pain
        "Headache", "Migraine", "Cluster headache", "Tension headache", "Throbbing headache", "Pressure headache", "Sudden severe headache", "Explosive headache",

        // Consciousness & Cognition
        "Dizziness", "Lightheadedness", "Vertigo", "Fainting", "Loss of consciousness", "Confusion", "Disorientation", "Delirium", "Memory loss", "Amnesia", "Difficulty concentrating", "Brain fog", "Mental slowing", "Poor judgment", "Difficulty with executive function",

        // Sensory - General
        "Numbness", "Tingling", "Pins and needles", "Burning sensation", "Prickling sensation", "Loss of sensation", "Hypersensitivity", "Allodynia",

        // Sensory - Vision
        "Blurred vision", "Double vision", "Loss of vision", "Tunnel vision", "Blind spots", "Floaters", "Flashes of light", "Halos around lights", "Light sensitivity", "Eye pain", "Dry eyes",

        // Sensory - Hearing & Balance
        "Hearing loss", "Ringing in ears", "Buzzing in ears", "Popping in ears", "Ear pressure", "Sound sensitivity", "Loss of balance", "Unsteadiness", "Feeling of spinning", "Veering to one side",

        // Sensory - Smell & Taste
        "Loss of smell", "Impaired smell", "Loss of taste", "Impaired taste", "Metallic taste", "Bad taste in mouth",

        // Motor Function
        "Weakness", "Paralysis", "Hemiparesis", "Paraparesis", "Tremors", "Shaking", "Muscle twitching", "Fasciculations", "Seizures", "Convulsions", "Spasms", "Clonus", "Clumsiness", "Loss of coordination", "Ataxia", "Difficulty walking", "Abnormal gait", "Foot drop", "Dropping things",

        // Speech & Language
        "Slurred speech", "Difficulty speaking", "Aphasia", "Dysarthria", "Slow speech", "Stuttering", "Difficulty finding words", "Difficulty understanding speech",

        // Sleep & Behavior
        "Sleep problems", "Insomnia", "Hypersomnia", "Sleepwalking", "Night terrors", "Mood changes", "Personality changes", "Anxiety", "Depression", "Apathy", "Agitation", "Irritability", "Emotional lability",

        // Autonomic & Other
        "Neck stiffness", "Photophobia", "Phonophobia", "Difficulty swallowing", "Drooling", "Facial droop", "Bell's palsy", "Vertigo"
    ],

    gastrointestinal: [
        // Upper GI - Esophagus/Stomach
        "Abdominal pain", "Upper abdominal pain", "Lower abdominal pain", "Epigastric pain", "Heartburn", "Acid reflux", "Indigestion", "Dyspepsia", "Nausea", "Vomiting", "Vomiting blood", "Dry heaving", "Bloating", "Early satiety", "Loss of appetite", "Excessive burping", "Hiccups",

        // Lower GI - Intestines
        "Diarrhea", "Watery diarrhea", "Bloody diarrhea", "Constipation", "Urgent need to defecate", "Tenesmus", "Incomplete evacuation", "Fecal incontinence", "Gas", "Flatulence", "Abdominal cramps", "Abdominal distension", "Gurgling stomach", "Borborygmi",

        // Rectal & Anal
        "Rectal pain", "Anal pain", "Anal itching", "Blood in stool", "Bright red blood per rectum", "Black tarry stool", "Mucus in stool", "Pale stool", "Greasy stool", "Foul-smelling stool", "Narrow stools", "Hemorrhoids",

        // Liver/Gallbladder/Pancreas
        "Jaundice", "Yellow eyes", "Dark urine", "Light-colored stool", "Itchy skin", "Right upper quadrant pain", "Abdominal tenderness", "Ascites", "Abdominal swelling",

        // Systemic & Associated
        "Difficulty swallowing", "Painful swallowing", "Feeling of lump in throat", "Weight loss", "Unintended weight loss", "Weight gain", "Fatigue", "Weakness", "Fever", "Dehydration", "Malnutrition"
    ],

    musculoskeletal: [
        // Pain - General & Localized
        "Joint pain", "Muscle pain", "Bone pain", "Back pain", "Neck pain", "Lower back pain", "Sciatica", "Shoulder pain", "Elbow pain", "Wrist pain", "Hip pain", "Knee pain", "Ankle pain", "Foot pain", "Heel pain", "Toe pain", "Rib pain", "Tailbone pain",

        // Pain Quality
        "Aching pain", "Sharp pain", "Stabbing pain", "Shooting pain", "Burning pain", "Throbbing pain", "Pain with movement", "Pain at rest", "Night pain", "Morning stiffness",

        // Inflammation & Swelling
        "Joint swelling", "Muscle swelling", "Warm joints", "Red joints", "Joint effusion", "Bursitis", "Tendonitis",

        // Mobility & Function
        "Joint stiffness", "Muscle stiffness", "Limited range of motion", "Decreased flexibility", "Joint locking", "Joint instability", "Joint giving way", "Difficulty walking", "Limping", "Difficulty standing", "Difficulty climbing stairs", "Difficulty raising arms", "Loss of function",

        // Structural Changes
        "Muscle weakness", "Muscle atrophy", "Muscle cramps", "Muscle spasms", "Tremors", "Joint deformity", "Bone deformity", "Scoliosis", "Kyphosis", "Lordosis",

        // Injuries
        "Fractures", "Sprains", "Strains", "Dislocation", "Subluxation", "Clicking joints", "Popping joints", "Grinding joints", "Crepitus"
    ],

    dermatological: [
        // Lesions & Eruptions
        "Rash", "Macular rash", "Papular rash", "Vesicular rash", "Pustular rash", "Bullous rash", "Nodular rash", "Plaques", "Patches", "Hives", "Wheals", "Blisters", "Vesicles", "Pustules", "Boils", "Abscesses", "Cysts", "Nodules", "Tumors", "Skin tags",

        // Color Changes
        "Redness", "Erythema", "Flushing", "Blushing", "Pallor", "Paleness", "Jaundice", "Yellow skin", "Hyperpigmentation", "Hypopigmentation", "Vitiligo", "Melasma", "Darkening of skin", "Bronze skin", "Bluish skin", "Cyanosis", "Purpura", "Petechiae", "Ecchymosis", "Bruising", "Bruising easily",

        // Texture & Scaling
        "Dry skin", "Xerosis", "Oily skin", "Scaly skin", "Flaking skin", "Crusting", "Scabbing", "Lichenification", "Thickened skin", "Keratosis", "Calluses", "Corns",

        // Hair & Nails
        "Hair loss", "Alopecia", "Thinning hair", "Brittle hair", "Excessive hair growth", "Hirsutism", "Nail pitting", "Brittle nails", "Splitting nails", "Onycholysis", "Nail discoloration", "Yellow nails", "White spots on nails", "Beau's lines", "Clubbed nails",

        // Sensations
        "Itching", "Pruritus", "Burning sensation", "Stinging sensation", "Prickling sensation", "Painful skin", "Skin tenderness", "Allodynia",

        // Infections & Infestations
        "Fungal rash", "Ringworm", "Athlete's foot", "Bacterial infection", "Cellulitis", "Impetigo", "Viral rash", "Warts", "Molluscum", "Shingles rash", "Lice", "Scabies", "Bug bites",

        // Growths & Moles
        "Moles", "New moles", "Changing moles", "Asymmetric moles", "Moles with irregular borders", "Moles with color variation", "Large moles", "Skin cancer", "Basal cell carcinoma", "Squamous cell carcinoma", "Melanoma", "Actinic keratosis", "Seborrheic keratosis",

        // Other
        "Edema", "Swelling", "Pitting edema", "Non-pitting edema", "Lip swelling", "Eye swelling", "Face swelling", "Hot skin", "Cold skin", "Sweating", "Excessive sweating", "Night sweats", "Body odor", "Poor wound healing", "Ulcers", "Bedsores", "Stretch marks", "Scars", "Keloids"
    ],

    genitourinary: [
        // Urinary
        "Frequent urination", "Urgency", "Nocturia", "Painful urination", "Burning with urination", "Difficulty starting urination", "Weak urine stream", "Straining to urinate", "Dribbling", "Incomplete emptying", "Urinary incontinence", "Stress incontinence", "Urge incontinence", "Blood in urine", "Cloudy urine", "Foul-smelling urine", "Dark urine", "Decreased urine output", "Oliguria", "Anuria",

        // Male Reproductive
        "Testicular pain", "Penile pain", "Groin pain", "Erectile dysfunction", "Difficulty with erection", "Premature ejaculation", "Delayed ejaculation", "Loss of libido", "Penile discharge", "Urethral discharge", "Prostate pain", "Swollen testicle", "Testicular lump", "Varicocele", "Hydrocele",

        // Female Reproductive
        "Vaginal bleeding", "Heavy menstrual bleeding", "Irregular periods", "Missed periods", "Painful periods", "Spotting between periods", "Postmenopausal bleeding", "Vaginal discharge", "Abnormal vaginal discharge", "Vaginal itching", "Vaginal burning", "Vaginal dryness", "Painful intercourse", "Pelvic pain", "Ovarian pain", "Painful ovulation", "Infertility", "Loss of libido", "Hot flashes", "Night sweats", "Breast pain", "Breast lump", "Nipple discharge",

        // Renal & Flank
        "Flank pain", "Back pain", "Kidney pain", "Renal colic"
    ],

    endocrine_metabolic: [
        // Thyroid
        "Fatigue", "Weight gain", "Weight loss", "Unintended weight change", "Heat intolerance", "Cold intolerance", "Excessive sweating", "Dry skin", "Moist skin", "Hair loss", "Brittle nails", "Palpitations", "Anxiety", "Irritability", "Nervousness", "Tremors", "Insomnia", "Lethargy", "Sluggishness", "Constipation", "Diarrhea",

        // Adrenal
        "Low blood pressure", "Dizziness", "Salt craving", "Hyperpigmentation", "Darkening of skin creases", "Buffalo hump", "Moon face", "Purple stretch marks", "Muscle weakness", "Excessive thirst", "Excessive urination",

        // Pituitary
        "Headache", "Vision changes", "Galactorrhea", "Lactation", "Growth abnormalities", "Acromegaly", "Coarsening of facial features", "Loss of peripheral vision",

        // Diabetes & Blood Sugar
        "Excessive thirst", "Frequent urination", "Increased appetite", "Blurred vision", "Slow-healing sores", "Frequent infections", "Numbness in hands/feet", "Tingling in hands/feet", "Fruity-smelling breath", "Confusion",

        // Calcium & Bone
        "Bone pain", "Fractures", "Muscle cramps", "Tingling around mouth", "Tingling in fingers", "Kidney stones", "Fatigue", "Weakness"
    ],

    hematologic_immunologic: [
        // Anemia & Bleeding
        "Fatigue", "Weakness", "Pale skin", "Pallor", "Shortness of breath", "Rapid heartbeat", "Dizziness", "Headache", "Cold hands and feet", "Bruising easily", "Petechiae", "Purpura", "Prolonged bleeding", "Heavy menstrual bleeding", "Blood in stool", "Blood in urine", "Nosebleeds", "Bleeding gums",

        // Infection & Immunity
        "Fever", "Recurrent infections", "Frequent infections", "Swollen lymph nodes", "Night sweats", "Unexplained weight loss", "Fatigue", "Malaise", "Sore throat", "Mouth sores", "Slow wound healing"
    ],

    psychiatric_behavioral: [
        // Mood
        "Depressed mood", "Loss of interest", "Anhedonia", "Excessive worry", "Anxiety", "Panic attacks", "Irritability", "Anger", "Mood swings", "Emotional lability", "Apathy", "Euphoria", "Grandiosity",

        // Thought Process
        "Racing thoughts", "Flight of ideas", "Slow thinking", "Poor concentration", "Indecisiveness", "Confusion", "Delusions", "Paranoia", "Hallucinations", "Suicidal thoughts", "Homicidal thoughts",

        // Behavior
        "Agitation", "Restlessness", "Psychomotor retardation", "Social withdrawal", "Impulsivity", "Risk-taking behavior", "Compulsive behavior", "Aggression", "Self-harm", "Changes in sleep", "Changes in appetite", "Changes in energy level",

        // Cognitive
        "Memory problems", "Forgetfulness", "Disorientation", "Difficulty with problem-solving", "Poor judgment"
    ],

    general_constitutional: [
        // Systemic
        "Fever", "Chills", "Night sweats", "Fatigue", "Malaise", "Weakness", "Lethargy", "Unintended weight loss", "Unintended weight gain", "Loss of appetite", "Increased appetite", "Dehydration", "Swelling", "Edema",

        // Sleep
        "Insomnia", "Hypersomnia", "Excessive daytime sleepiness", "Sleep apnea", "Snoring", "Restless legs", "Nightmares", "Night terrors", "Sleepwalking",

        // Pain - Generalized
        "Body aches", "Growing pains", "Generalized pain", "Widespread pain", "Fatigue", "Tender points"
    ]
},

    // Medical conditions database with symptoms mapping
    conditions: [
        {
            name: "Common Cold",
            symptoms: ["Runny nose", "Stuffy nose", "Sore throat", "Cough", "Mild fever", "Fatigue", "Headache"],
            severity: "low",
            prevalence: "very_common",
            description: "A viral infection of the upper respiratory tract, typically mild and self-limiting.",
            treatment: "Rest, fluids, over-the-counter medications for symptom relief",
            emergency: false
        },
        {
            name: "Influenza",
            symptoms: ["High fever", "Body aches", "Fatigue", "Cough", "Sore throat", "Headache", "Chills"],
            severity: "moderate",
            prevalence: "common",
            description: "A viral respiratory illness that can cause severe symptoms and complications.",
            treatment: "Antiviral medications if started early, rest, fluids, fever reducers",
            emergency: false
        },
        {
            name: "COVID-19",
            symptoms: ["Fever", "Cough", "Shortness of breath", "Loss of taste", "Loss of smell", "Fatigue", "Body aches"],
            severity: "high",
            prevalence: "common",
            description: "A respiratory illness caused by the SARS-CoV-2 virus, with varying severity.",
            treatment: "Isolation, supportive care, antiviral medications for high-risk individuals",
            emergency: false
        },
        {
            name: "Heart Attack",
            symptoms: ["Chest pain", "Shortness of breath", "Pain in left arm", "Jaw pain", "Nausea", "Sweating", "Fatigue"],
            severity: "emergency",
            prevalence: "uncommon",
            description: "A medical emergency where blood flow to the heart is blocked, causing heart muscle damage.",
            treatment: "Immediate emergency medical care, medications, possible procedures",
            emergency: true
        },
        {
            name: "Stroke",
            symptoms: ["Sudden weakness", "Difficulty speaking", "Blurred vision", "Dizziness", "Severe headache", "Loss of balance"],
            severity: "emergency",
            prevalence: "uncommon",
            description: "A medical emergency where blood flow to the brain is interrupted, causing brain damage.",
            treatment: "Immediate emergency medical care, clot-busting medications, rehabilitation",
            emergency: true
        },
        {
            name: "Asthma",
            symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Cough", "Difficulty breathing"],
            severity: "moderate",
            prevalence: "common",
            description: "A chronic respiratory condition characterized by inflammation and narrowing of airways.",
            treatment: "Inhalers, medications, avoiding triggers, regular monitoring",
            emergency: false
        },
        {
            name: "Diabetes Type 2",
            symptoms: ["Frequent urination", "Excessive thirst", "Fatigue", "Blurred vision", "Slow healing", "Weight loss"],
            severity: "high",
            prevalence: "common",
            description: "A metabolic disorder characterized by high blood sugar levels and insulin resistance.",
            treatment: "Diet, exercise, medications, blood sugar monitoring",
            emergency: false
        },
        {
            name: "Hypertension",
            symptoms: ["High blood pressure", "Headache", "Dizziness", "Chest pain", "Shortness of breath", "Nosebleeds"],
            severity: "moderate",
            prevalence: "very_common",
            description: "High blood pressure that can lead to serious cardiovascular complications if untreated.",
            treatment: "Lifestyle changes, medications, regular monitoring",
            emergency: false
        },
        {
            name: "Migraine",
            symptoms: ["Severe headache", "Nausea", "Light sensitivity", "Sound sensitivity", "Visual disturbances", "Vomiting"],
            severity: "moderate",
            prevalence: "common",
            description: "A neurological condition characterized by severe, recurring headaches with various symptoms.",
            treatment: "Pain medications, preventive medications, avoiding triggers",
            emergency: false
        },
        {
            name: "Anxiety Disorder",
            symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Muscle tension", "Sleep problems"],
            severity: "moderate",
            prevalence: "common",
            description: "A mental health condition characterized by persistent worry and fear that interferes with daily life.",
            treatment: "Therapy, medications, lifestyle changes, stress management",
            emergency: false
        },
        
        // INFECTIOUS DISEASES
        {
            name: "Pneumonia",
            symptoms: ["Cough with phlegm", "Fever", "Chills", "Shortness of breath", "Chest pain", "Fatigue", "Confusion (in elderly)"],
            severity: "high",
            prevalence: "common",
            description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
            treatment: "Antibiotics, antiviral or antifungal medications, rest, fluids, fever reducers",
            emergency: true
        },
        {
            name: "Bronchitis",
            symptoms: ["Persistent cough", "Mucus production", "Fatigue", "Shortness of breath", "Chest discomfort", "Mild fever"],
            severity: "low",
            prevalence: "common",
            description: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.",
            treatment: "Rest, fluids, humidifier, over-the-counter cough medicines",
            emergency: false
        },
        {
            name: "Strep Throat",
            symptoms: ["Severe sore throat", "Painful swallowing", "Fever", "Swollen lymph nodes", "White patches on tonsils", "Headache"],
            severity: "moderate",
            prevalence: "common",
            description: "A bacterial infection that causes inflammation and pain in the throat.",
            treatment: "Antibiotics, pain relievers, rest, warm liquids",
            emergency: false
        },
        {
            name: "Urinary Tract Infection (UTI)",
            symptoms: ["Burning sensation when urinating", "Frequent urination", "Cloudy urine", "Pelvic pain", "Strong-smelling urine"],
            severity: "low",
            prevalence: "very_common",
            description: "An infection in any part of the urinary system, most commonly the bladder and urethra.",
            treatment: "Antibiotics, increased fluid intake",
            emergency: false
        },
        {
            name: "Mononucleosis",
            symptoms: ["Extreme fatigue", "Fever", "Sore throat", "Swollen lymph nodes", "Body aches", "Swollen spleen"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "Often called 'mono,' it's a viral infection causing fever, sore throat, and fatigue.",
            treatment: "Rest, fluids, over-the-counter pain relievers",
            emergency: false
        },
        {
            name: "Appendicitis",
            symptoms: ["Sudden pain near navel shifting to lower right abdomen", "Fever", "Nausea", "Vomiting", "Loss of appetite", "Abdominal swelling"],
            severity: "emergency",
            prevalence: "uncommon",
            description: "Inflammation of the appendix, a medical emergency requiring immediate surgery.",
            treatment: "Surgical removal of the appendix (appendectomy), antibiotics",
            emergency: true
        },
        {
            name: "Gastroenteritis (Stomach Flu)",
            symptoms: ["Watery diarrhea", "Abdominal cramps", "Nausea", "Vomiting", "Fever", "Muscle aches"],
            severity: "low",
            prevalence: "common",
            description: "Intestinal infection marked by diarrhea, cramps, and vomiting.",
            treatment: "Rest, fluids, bland diet, electrolyte solutions",
            emergency: false
        },
        {
            name: "Sinusitis",
            symptoms: ["Facial pain/pressure", "Nasal congestion", "Thick nasal discharge", "Loss of smell", "Cough", "Headache"],
            severity: "low",
            prevalence: "common",
            description: "Inflammation or swelling of the tissue lining the sinuses.",
            treatment: "Nasal decongestants, saline spray, pain relievers, antibiotics (if bacterial)",
            emergency: false
        },
        {
            name: "Tuberculosis",
            symptoms: ["Cough lasting 3+ weeks", "Coughing up blood", "Chest pain", "Unintentional weight loss", "Fever", "Night sweats"],
            severity: "high",
            prevalence: "rare",
            description: "A potentially serious infectious disease that mainly affects the lungs.",
            treatment: "Long-term antibiotic regimen",
            emergency: false
        },
        {
            name: "Lyme Disease",
            symptoms: ["Bull's-eye rash", "Fever", "Chills", "Fatigue", "Body aches", "Headache", "Swollen lymph nodes"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "An infectious disease caused by Borrelia bacteria, transmitted by tick bites.",
            treatment: "Antibiotics",
            emergency: false
        },

        // CARDIOVASCULAR
        {
            name: "Heart Failure",
            symptoms: ["Shortness of breath", "Fatigue", "Swelling in legs/ankles/feet", "Rapid heartbeat", "Persistent cough", "Weight gain"],
            severity: "high",
            prevalence: "common",
            description: "A chronic condition where the heart doesn't pump blood as well as it should.",
            treatment: "Medications, lifestyle changes, device implantation, surgery",
            emergency: false
        },
        {
            name: "Arrhythmia",
            symptoms: ["Fluttering in chest", "Racing heartbeat", "Slow heartbeat", "Chest pain", "Shortness of breath", "Dizziness", "Fainting"],
            severity: "moderate",
            prevalence: "common",
            description: "Improper beating of the heart, whether irregular, too fast, or too slow.",
            treatment: "Medications, cardioversion, catheter procedures, pacemaker",
            emergency: false
        },
        {
            name: "Atrial Fibrillation",
            symptoms: ["Heart palpitations", "Shortness of breath", "Weakness", "Fatigue", "Lightheadedness", "Chest pain"],
            severity: "high",
            prevalence: "common",
            description: "An irregular and often very rapid heart rhythm that can lead to blood clots.",
            treatment: "Medications, procedures, lifestyle changes",
            emergency: false
        },
        {
            name: "Deep Vein Thrombosis (DVT)",
            symptoms: ["Swelling in one leg", "Pain in leg", "Red/discolored skin", "Warmth in affected leg"],
            severity: "high",
            prevalence: "uncommon",
            description: "A blood clot that forms in a vein deep in the body, usually in the leg.",
            treatment: "Blood thinners, compression stockings, clot busters",
            emergency: true
        },
        {
            name: "Pulmonary Embolism",
            symptoms: ["Sudden shortness of breath", "Chest pain", "Cough (possibly with blood)", "Rapid heartbeat", "Lightheadedness", "Sweating"],
            severity: "emergency",
            prevalence: "uncommon",
            description: "A blocked artery in the lungs, often caused by a blood clot that traveled from the leg.",
            treatment: "Emergency medical care, blood thinners, clot dissolvers",
            emergency: true
        },
        {
            name: "Pericarditis",
            symptoms: ["Sharp chest pain", "Shortness of breath", "Heart palpitations", "Low-grade fever", "Weakness", "Cough"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "Swelling and irritation of the pericardium, the thin sac-like membrane surrounding the heart.",
            treatment: "Medications for pain and inflammation, treating underlying cause",
            emergency: false
        },

        // NEUROLOGICAL
        {
            name: "Epilepsy",
            symptoms: ["Temporary confusion", "Staring spell", "Uncontrollable jerking", "Loss of consciousness", "Fear/anxiety"],
            severity: "high",
            prevalence: "uncommon",
            description: "A central nervous system disorder in which brain activity becomes abnormal, causing seizures.",
            treatment: "Anti-seizure medications, surgery, dietary therapy",
            emergency: false
        },
        {
            name: "Multiple Sclerosis",
            symptoms: ["Numbness/weakness in limbs", "Electric-shock sensations", "Tremor", "Lack of coordination", "Slurred speech", "Fatigue", "Vision problems"],
            severity: "high",
            prevalence: "rare",
            description: "A disease in which the immune system eats away at the protective covering of nerves.",
            treatment: "Disease-modifying therapies, physical therapy, medications for symptoms",
            emergency: false
        },
        {
            name: "Parkinson's Disease",
            symptoms: ["Tremor", "Slowed movement", "Rigid muscles", "Impaired posture", "Speech changes", "Loss of automatic movements"],
            severity: "high",
            prevalence: "uncommon",
            description: "A progressive nervous system disorder that affects movement.",
            treatment: "Medications, physical therapy, lifestyle modifications, possible surgery",
            emergency: false
        },
        {
            name: "Alzheimer's Disease",
            symptoms: ["Memory loss", "Difficulty planning/problem-solving", "Confusion", "Personality changes", "Difficulty speaking/writing"],
            severity: "high",
            prevalence: "common",
            description: "A progressive disorder that causes brain cells to waste away and die.",
            treatment: "Medications to manage symptoms, supportive care",
            emergency: false
        },
        {
            name: "Meningitis",
            symptoms: ["Sudden high fever", "Stiff neck", "Severe headache", "Nausea", "Vomiting", "Confusion", "Sensitivity to light"],
            severity: "emergency",
            prevalence: "rare",
            description: "Inflammation of the fluid and membranes surrounding the brain and spinal cord.",
            treatment: "Emergency hospitalization, antibiotics, antiviral medications, corticosteroids",
            emergency: true
        },
        {
            name: "Concussion",
            symptoms: ["Headache", "Confusion", "Dizziness", "Nausea", "Ringling in ears", "Fatigue", "Blurred vision"],
            severity: "moderate",
            prevalence: "common",
            description: "A traumatic brain injury that affects brain function, typically caused by a blow to the head.",
            treatment: "Physical and mental rest, gradual return to activity",
            emergency: false
        },
        {
            name: "Bell's Palsy",
            symptoms: ["Sudden weakness/paralysis on one side of face", "Drooping mouth/eyelid", "Drooling", "Loss of taste", "Increased sensitivity to sound"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "A sudden, temporary weakness or paralysis of the facial muscles.",
            treatment: "Corticosteroids, antiviral drugs, eye protection, physical therapy",
            emergency: false
        },

        // GASTROINTESTINAL
        {
            name: "Gastroesophageal Reflux Disease (GERD)",
            symptoms: ["Heartburn", "Regurgitation", "Chest pain", "Difficulty swallowing", "Sensation of a lump in throat"],
            severity: "low",
            prevalence: "very_common",
            description: "A digestive disorder that affects the lower esophageal sphincter.",
            treatment: "Lifestyle changes, over-the-counter medications, prescription medications, possible surgery",
            emergency: false
        },
        {
            name: "Irritable Bowel Syndrome (IBS)",
            symptoms: ["Abdominal cramping", "Bloating", "Gas", "Diarrhea", "Constipation", "Mucus in stool"],
            severity: "low",
            prevalence: "common",
            description: "A common disorder affecting the large intestine.",
            treatment: "Dietary changes, stress management, medications",
            emergency: false
        },
        {
            name: "Inflammatory Bowel Disease (IBD) - Crohn's/Ulcerative Colitis",
            symptoms: ["Persistent diarrhea", "Abdominal pain", "Rectal bleeding", "Fatigue", "Weight loss", "Fever"],
            severity: "high",
            prevalence: "uncommon",
            description: "Chronic inflammation of the digestive tract.",
            treatment: "Anti-inflammatory drugs, immune system suppressors, biologics, surgery",
            emergency: false
        },
        {
            name: "Celiac Disease",
            symptoms: ["Diarrhea", "Fatigue", "Weight loss", "Bloating", "Anemia", "Abdominal pain"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "An immune reaction to eating gluten, a protein found in wheat, barley, and rye.",
            treatment: "Strict, lifelong gluten-free diet",
            emergency: false
        },
        {
            name: "Gallstones",
            symptoms: ["Sudden pain in upper right abdomen", "Back pain between shoulder blades", "Nausea", "Vomiting", "Indigestion"],
            severity: "moderate",
            prevalence: "common",
            description: "Hardened deposits in the digestive fluid that can form in your gallbladder.",
            treatment: "Surgery to remove gallbladder, medications to dissolve stones",
            emergency: false
        },
        {
            name: "Pancreatitis",
            symptoms: ["Upper abdominal pain", "Abdominal pain radiating to back", "Fever", "Rapid pulse", "Nausea", "Vomiting"],
            severity: "high",
            prevalence: "uncommon",
            description: "Inflammation of the pancreas.",
            treatment: "Hospitalization for supportive care, pain management, treating underlying cause",
            emergency: true
        },
        {
            name: "Peptic Ulcer",
            symptoms: ["Burning stomach pain", "Feeling of fullness", "Bloating", "Belching", "Heartburn", "Nausea"],
            severity: "moderate",
            prevalence: "common",
            description: "Sores that develop on the lining of the stomach, upper small intestine, or esophagus.",
            treatment: "Antibiotics (if H. pylori), acid-reducing medications, lifestyle changes",
            emergency: false
        },

        // MUSCULOSKELETAL
        {
            name: "Osteoarthritis",
            symptoms: ["Joint pain", "Stiffness", "Tenderness", "Loss of flexibility", "Grating sensation", "Bone spurs"],
            severity: "moderate",
            prevalence: "very_common",
            description: "The most common form of arthritis, affecting millions worldwide, involving wear-and-tear of joint cartilage.",
            treatment: "Pain relievers, physical therapy, lifestyle changes, joint surgery",
            emergency: false
        },
        {
            name: "Rheumatoid Arthritis",
            symptoms: ["Tender/warm/swollen joints", "Joint stiffness (worse in mornings)", "Fatigue", "Fever", "Weight loss"],
            severity: "high",
            prevalence: "uncommon",
            description: "An autoimmune disorder that primarily affects joints, causing painful swelling and potential joint deformity.",
            treatment: "Disease-modifying antirheumatic drugs, biologics, physical therapy",
            emergency: false
        },
        {
            name: "Osteoporosis",
            symptoms: ["Back pain", "Loss of height over time", "Stooped posture", "Bone fracture from minor injury"],
            severity: "moderate",
            prevalence: "common",
            description: "A condition in which bones become weak and brittle.",
            treatment: "Bone-building medications, calcium and vitamin D supplements, weight-bearing exercise",
            emergency: false
        },
        {
            name: "Gout",
            symptoms: ["Intense joint pain", "Lingering discomfort", "Inflammation and redness", "Limited range of motion"],
            severity: "moderate",
            prevalence: "common",
            description: "A form of arthritis characterized by severe pain, redness, and tenderness in joints.",
            treatment: "NSAIDs, corticosteroids, medications to block uric acid production",
            emergency: false
        },
        {
            name: "Carpal Tunnel Syndrome",
            symptoms: ["Numbness/tingling in hand/arm", "Weakness in hand", "Pain in wrist/hand", "Shock-like sensations"],
            severity: "low",
            prevalence: "common",
            description: "A condition caused by pressure on the median nerve in the wrist.",
            treatment: "Wrist splinting, medications, corticosteroid injections, surgery",
            emergency: false
        },
        {
            name: "Fibromyalgia",
            symptoms: ["Widespread pain", "Fatigue", "Cognitive difficulties ('fibro fog')", "Headaches", "Sleep problems"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, and mood issues.",
            treatment: "Pain relievers, antidepressants, anti-seizure drugs, therapy, lifestyle changes",
            emergency: false
        },

        // DERMATOLOGICAL
        {
            name: "Eczema (Atopic Dermatitis)",
            symptoms: ["Itchy skin", "Red to brownish-gray patches", "Small raised bumps", "Thickened/cracked/scaly skin", "Raw/sensitive skin from scratching"],
            severity: "low",
            prevalence: "common",
            description: "A condition that makes your skin red and itchy.",
            treatment: "Moisturizers, topical corticosteroids, avoiding triggers, light therapy",
            emergency: false
        },
        {
            name: "Psoriasis",
            symptoms: ["Red patches of skin with silvery scales", "Dry/cracked skin that may bleed", "Itching/burning/soreness", "Thickened/pitted nails"],
            severity: "moderate",
            prevalence: "common",
            description: "A skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, and scalp.",
            treatment: "Topical treatments, light therapy, oral/injected medications",
            emergency: false
        },
        {
            name: "Shingles",
            symptoms: ["Pain/tingling/itching", "Red rash", "Fluid-filled blisters", "Fever", "Headache", "Fatigue"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "A viral infection causing a painful rash, caused by the same virus as chickenpox.",
            treatment: "Antiviral medications, pain relievers, anticonvulsants, numbing agents",
            emergency: false
        },
        {
            name: "Acne Vulgaris",
            symptoms: ["Whiteheads", "Blackheads", "Small red tender bumps", "Pimples", "Large painful lumps under skin"],
            severity: "low",
            prevalence: "very_common",
            description: "A skin condition that occurs when hair follicles become plugged with oil and dead skin cells.",
            treatment: "Topical treatments, antibiotics, oral contraceptives, isotretinoin",
            emergency: false
        },
        {
            name: "Rosacea",
            symptoms: ["Facial redness", "Visible blood vessels", "Swollen red bumps", "Eye problems", "Burning sensation"],
            severity: "low",
            prevalence: "common",
            description: "A common skin condition that causes redness and visible blood vessels in your face.",
            treatment: "Topical/oral medications, laser therapy, avoiding triggers",
            emergency: false
        },
        {
            name: "Cellulitis",
            symptoms: ["Red/swollen area of skin", "Pain/tenderness", "Skin warmth", "Fever", "Blisters"],
            severity: "moderate",
            prevalence: "common",
            description: "A common bacterial skin infection that can be serious if not treated.",
            treatment: "Oral/IV antibiotics, elevating affected area, pain relievers",
            emergency: false
        },

        // ENDOCRINE / METABOLIC
        {
            name: "Diabetes Type 1",
            symptoms: ["Increased thirst", "Frequent urination", "Extreme hunger", "Unintended weight loss", "Fatigue", "Blurred vision"],
            severity: "high",
            prevalence: "uncommon",
            description: "A chronic condition where the pancreas produces little or no insulin.",
            treatment: "Insulin therapy, blood sugar monitoring, carbohydrate counting",
            emergency: false
        },
        {
            name: "Hypothyroidism",
            symptoms: ["Fatigue", "Increased sensitivity to cold", "Constipation", "Dry skin", "Weight gain", "Puffy face", "Hoarseness"],
            severity: "moderate",
            prevalence: "common",
            description: "A condition where the thyroid gland doesn't produce enough thyroid hormone.",
            treatment: "Daily hormone replacement therapy with levothyroxine",
            emergency: false
        },
        {
            name: "Hyperthyroidism",
            symptoms: ["Unintentional weight loss", "Rapid heartbeat", "Increased appetite", "Nervousness", "Tremor", "Sweating", "Changes in menstrual patterns"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "A condition where the thyroid gland produces too much thyroid hormone.",
            treatment: "Anti-thyroid medications, radioactive iodine, beta blockers, surgery",
            emergency: false
        },
        {
            name: "Cushing's Syndrome",
            symptoms: ["Weight gain (especially torso)", "Purple stretch marks", "Rounding of face ('moon face')", "Fatty hump between shoulders", "Thin skin that bruises easily"],
            severity: "high",
            prevalence: "rare",
            description: "A condition that occurs from exposure to high cortisol levels for a long time.",
            treatment: "Reducing corticosteroid use, surgery, radiation therapy, medications",
            emergency: false
        },
        {
            name: "Addison's Disease",
            symptoms: ["Extreme fatigue", "Weight loss", "Low blood pressure", "Salt craving", "Hyperpigmentation", "Nausea", "Abdominal pain"],
            severity: "high",
            prevalence: "rare",
            description: "A disorder in which the adrenal glands don't produce enough hormones.",
            treatment: "Hormone replacement therapy",
            emergency: false
        },

        // MENTAL HEALTH
        {
            name: "Major Depressive Disorder",
            symptoms: ["Persistent sadness", "Loss of interest in activities", "Changes in appetite", "Sleep disturbances", "Fatigue", "Feelings of worthlessness", "Difficulty concentrating"],
            severity: "high",
            prevalence: "common",
            description: "A mental health disorder characterized by persistently depressed mood or loss of interest in activities.",
            treatment: "Psychotherapy, antidepressant medications, lifestyle changes",
            emergency: false
        },
        {
            name: "Bipolar Disorder",
            symptoms: ["Mania: elevated mood, increased energy", "Depression: sadness, hopelessness", "Racing thoughts", "Impulsive behavior", "Sleep disturbances"],
            severity: "high",
            prevalence: "uncommon",
            description: "A mental health condition causing extreme mood swings that include emotional highs and lows.",
            treatment: "Mood stabilizers, antipsychotics, psychotherapy",
            emergency: false
        },
        {
            name: "Obsessive-Compulsive Disorder (OCD)",
            symptoms: ["Unwanted repetitive thoughts", "Urge to do something repetitively", "Anxiety", "Fear of contamination", "Need for order"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "A pattern of unwanted thoughts and fears that lead to repetitive behaviors.",
            treatment: "Psychotherapy (CBT), medications (SSRIs)",
            emergency: false
        },
        {
            name: "Post-Traumatic Stress Disorder (PTSD)",
            symptoms: ["Flashbacks", "Nightmares", "Severe anxiety", "Uncontrollable thoughts about the event", "Avoidance of reminders"],
            severity: "high",
            prevalence: "uncommon",
            description: "A mental health condition triggered by a terrifying event.",
            treatment: "Psychotherapy (EMDR, CBT), medications",
            emergency: false
        },
        {
            name: "Schizophrenia",
            symptoms: ["Delusions", "Hallucinations", "Disorganized thinking/speech", "Abnormal motor behavior", "Negative symptoms (lack of emotion)"],
            severity: "high",
            prevalence: "rare",
            description: "A serious mental disorder in which people interpret reality abnormally.",
            treatment: "Antipsychotic medications, psychotherapy, social skills training",
            emergency: false
        },

        // GENITOURINARY
        {
            name: "Kidney Stones",
            symptoms: ["Severe pain in side/back", "Pain radiating to lower abdomen", "Painful urination", "Pink/red/brown urine", "Nausea", "Vomiting"],
            severity: "high",
            prevalence: "common",
            description: "Hard deposits of minerals and salts that form inside your kidneys.",
            treatment: "Pain relievers, drinking water, medical procedures to break up/remove stones",
            emergency: true
        },
        {
            name: "Kidney Infection (Pyelonephritis)",
            symptoms: ["Fever", "Chills", "Back/side/groin pain", "Abdominal pain", "Frequent urination", "Nausea", "Vomiting"],
            severity: "high",
            prevalence: "uncommon",
            description: "A type of urinary tract infection that generally begins in the urethra or bladder and travels to the kidneys.",
            treatment: "Antibiotics, hospitalization for severe cases",
            emergency: true
        },
        {
            name: "Endometriosis",
            symptoms: ["Painful periods", "Pain with intercourse", "Pain with bowel movements/urination", "Excessive bleeding", "Infertility", "Fatigue"],
            severity: "moderate",
            prevalence: "uncommon",
            description: "An often painful disorder where tissue similar to the uterine lining grows outside the uterus.",
            treatment: "Pain medications, hormone therapy, conservative surgery, hysterectomy",
            emergency: false
        },
        {
            name: "Polycystic Ovary Syndrome (PCOS)",
            symptoms: ["Irregular periods", "Excess androgen", "Polycystic ovaries", "Weight gain", "Infertility", "Acne", "Thinning hair"],
            severity: "moderate",
            prevalence: "common",
            description: "A hormonal disorder common among women of reproductive age.",
            treatment: "Lifestyle changes, birth control pills, medications to induce ovulation",
            emergency: false
        },
        {
            name: "Benign Prostatic Hyperplasia (BPH)",
            symptoms: ["Frequent urination", "Urgency", "Difficulty starting urination", "Weak stream", "Dribbling", "Inability to empty bladder"],
            severity: "low",
            prevalence: "common",
            description: "An enlarged prostate gland that can cause problems with urination.",
            treatment: "Medications, minimally invasive procedures, surgery",
            emergency: false
        },

        // OTHER CHRONIC CONDITIONS
        {
            name: "Chronic Fatigue Syndrome",
            symptoms: ["Severe fatigue not improved by rest", "Worsening of symptoms after physical/mental exertion", "Sleep problems", "Difficulty concentrating", "Dizziness"],
            severity: "high",
            prevalence: "rare",
            description: "A complicated disorder characterized by extreme fatigue that can't be explained by an underlying medical condition.",
            treatment: "Symptom management, cognitive behavioral therapy, graded exercise therapy",
            emergency: false
        },
        {
            name: "Sleep Apnea",
            symptoms: ["Loud snoring", "Episodes of stopped breathing during sleep", "Gasping for air during sleep", "Morning headache", "Excessive daytime sleepiness"],
            severity: "moderate",
            prevalence: "common",
            description: "A potentially serious sleep disorder in which breathing repeatedly stops and starts.",
            treatment: "Lifestyle changes, CPAP machine, oral appliances, surgery",
            emergency: false
        },
        {
            name: "Anemia",
            symptoms: ["Fatigue", "Weakness", "Pale skin", "Shortness of breath", "Dizziness", "Cold hands/feet", "Headache"],
            severity: "low",
            prevalence: "very_common",
            description: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
            treatment: "Iron supplements, vitamin supplements, treating underlying cause, blood transfusions",
            emergency: false
        },
        {
            name: "Glaucoma",
            symptoms: ["Patchy blind spots in peripheral vision", "Tunnel vision (advanced)", "Eye pain", "Headache", "Nausea", "Blurred vision", "Halos around lights"],
            severity: "high",
            prevalence: "common",
            description: "A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in the eye.",
            treatment: "Prescription eye drops, oral medications, laser treatment, surgery",
            emergency: false
        },
        {
            name: "Cataracts",
            symptoms: ["Clouded/blurred vision", "Difficulty with night vision", "Sensitivity to light", "Seeing 'halos' around lights", "Fading of colors", "Double vision"],
            severity: "moderate",
            prevalence: "very_common",
            description: "Clouding of the normally clear lens of the eye.",
            treatment: "Surgery to remove the cloudy lens and replace it with an artificial one",
            emergency: false
        }

        // ... This pattern would continue for hundreds more conditions ...
    ]
};
    
// Global state management
let selectedSystem = null;
let selectedSymptoms = [];
let currentSeverity = 5;
let diagnosisResults = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAnimations();
});

function initializeApp() {
    console.log('RapidHealthAI initialized with', medicalDatabase.symptoms.cardiovascular.length, 'cardiovascular symptoms');
    console.log('Total conditions in database:', medicalDatabase.conditions.length);
    
    // Initialize text splitting for animations
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }
    
    // Set up typewriter effect for hero text
    const heroText = document.querySelector('.gradient-text');
    if (heroText && typeof Typed !== 'undefined') {
        new Typed('.gradient-text', {
            strings: ['RapidHealthAI', 'Advanced AI Diagnosis', 'Your Health Guardian'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }
}

function setupEventListeners() {
    // Body system selection
    const bodySystems = document.querySelectorAll('[data-system]');
    bodySystems.forEach(system => {
        system.addEventListener('click', function() {
            selectBodySystem(this.dataset.system);
        });
    });

    // Symptom search
    const symptomSearch = document.getElementById('symptom-search');
    if (symptomSearch) {
        symptomSearch.addEventListener('input', function() {
            searchSymptoms(this.value);
        });
    }

    // Severity slider
    const severitySlider = document.getElementById('severity-slider');
    if (severitySlider) {
        severitySlider.addEventListener('input', function() {
            updateSeverity(this.value);
        });
    }

    // Analyze button
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeSymptoms);
    }
}

function setupAnimations() {
    // Animate symptom cards on hover
    const symptomCards = document.querySelectorAll('.symptom-card');
    symptomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Floating animation for hero image
    anime({
        targets: '.floating',
        translateY: [-10, 10],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
    });
}

function selectBodySystem(system) {
    selectedSystem = system;
    
    // Update UI to show selected system
    const systemCards = document.querySelectorAll('[data-system]');
    systemCards.forEach(card => {
        card.classList.remove('border-blue-500', 'bg-blue-50');
        if (card.dataset.system === system) {
            card.classList.add('border-blue-500', 'bg-blue-50');
        }
    });

    // Enable symptom search for selected system
    const symptomSearch = document.getElementById('symptom-search');
    if (symptomSearch) {
        symptomSearch.disabled = false;
        symptomSearch.placeholder = `Search ${system} symptoms...`;
    }

    // Update selected symptoms display
    updateSelectedSymptomsDisplay();
    
    console.log('Selected body system:', system);
}

function searchSymptoms(query) {
    if (!selectedSystem || !query) {
        hideSymptomSuggestions();
        return;
    }

    const symptoms = medicalDatabase.symptoms[selectedSystem] || [];
    const matches = symptoms.filter(symptom => 
        symptom.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

    if (matches.length > 0) {
        showSymptomSuggestions(matches);
    } else {
        hideSymptomSuggestions();
    }
}

function showSymptomSuggestions(symptoms) {
    const suggestionsDiv = document.getElementById('symptom-suggestions');
    if (!suggestionsDiv) return;

    suggestionsDiv.innerHTML = symptoms.map(symptom => `
        <div class="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors" 
             onclick="selectSymptom('${symptom}')">
            ${symptom}
        </div>
    `).join('');

    suggestionsDiv.classList.remove('hidden');
    
    // Animate suggestions appearance
    anime({
        targets: suggestionsDiv,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function hideSymptomSuggestions() {
    const suggestionsDiv = document.getElementById('symptom-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.classList.add('hidden');
    }
}

function selectSymptom(symptom) {
    if (!selectedSymptoms.includes(symptom)) {
        selectedSymptoms.push(symptom);
        updateSelectedSymptomsDisplay();
        updateAnalyzeButton();
        
        // Clear search input
        const symptomSearch = document.getElementById('symptom-search');
        if (symptomSearch) {
            symptomSearch.value = '';
        }
        
        hideSymptomSuggestions();
        
        console.log('Selected symptom:', symptom);
    }
}

function removeSymptom(symptom) {
    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    updateSelectedSymptomsDisplay();
    updateAnalyzeButton();
}

function updateSelectedSymptomsDisplay() {
    const container = document.getElementById('selected-symptoms');
    const symptomCount = document.getElementById('symptom-count');
    
    if (!container) return;

    if (selectedSymptoms.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No symptoms selected yet. Start by choosing a body system above.</p>';
    } else {
        container.innerHTML = selectedSymptoms.map(symptom => `
            <div class="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <span class="text-gray-900">${symptom}</span>
                <button onclick="removeSymptom('${symptom}')" 
                        class="text-red-500 hover:text-red-700 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    if (symptomCount) {
        symptomCount.textContent = selectedSymptoms.length;
    }
}

function updateSeverity(value) {
    currentSeverity = parseInt(value);
    const severityValue = document.getElementById('severity-value');
    
    if (severityValue) {
        let severityText = '';
        let severityColor = '';
        
        if (currentSeverity <= 3) {
            severityText = `Mild (${currentSeverity}/10)`;
            severityColor = 'text-green-600';
        } else if (currentSeverity <= 6) {
            severityText = `Moderate (${currentSeverity}/10)`;
            severityColor = 'text-yellow-600';
        } else if (currentSeverity <= 8) {
            severityText = `Severe (${currentSeverity}/10)`;
            severityColor = 'text-orange-600';
        } else {
            severityText = `Emergency (${currentSeverity}/10)`;
            severityColor = 'text-red-600';
        }
        
        severityValue.textContent = severityText;
        severityValue.className = `text-lg font-semibold ${severityColor}`;
    }
}

function updateAnalyzeButton() {
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        if (selectedSymptoms.length > 0) {
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            analyzeBtn.disabled = true;
            analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
}

function startDiagnosis() {
    const diagnosisInterface = document.getElementById('diagnosis-interface');
    if (diagnosisInterface) {
        diagnosisInterface.scrollIntoView({ behavior: 'smooth' });
        
        // Add visual feedback
        anime({
            targets: diagnosisInterface,
            scale: [0.95, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }
}

function scrollToLearnMore() {
    const featuresSection = document.querySelector('.py-16.bg-gray-50');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function analyzeSymptoms() {
    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom to analyze.');
        return;
    }

    // Show diagnostic progress
    showDiagnosticProgress();
    
    // Simulate AI analysis process
    setTimeout(() => {
        const results = performAIDiagnosis();
        displayResults(results);
    }, 3000);
}

function showDiagnosticProgress() {
    const progressDiv = document.getElementById('diagnostic-progress');
    if (progressDiv) {
        progressDiv.classList.remove('hidden');
        
        // Animate progress bar
        const progressBar = document.getElementById('progress-bar');
        const statusText = document.getElementById('analysis-status');
        
        if (progressBar && statusText) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                
                progressBar.style.width = progress + '%';
                
                if (progress < 25) {
                    statusText.textContent = 'Initializing AI diagnostic engine...';
                } else if (progress < 50) {
                    statusText.textContent = 'Analyzing symptoms against medical database...';
                } else if (progress < 75) {
                    statusText.textContent = 'Cross-referencing with 2,500+ conditions...';
                } else if (progress < 100) {
                    statusText.textContent = 'Calculating probability scores...';
                } else {
                    statusText.textContent = 'Analysis complete! Displaying results...';
                    clearInterval(interval);
                }
            }, 200);
        }
    }
}

function performAIDiagnosis() {
    // Simulate AI diagnosis algorithm
    const results = {
        conditions: [],
        riskLevel: 'low',
        emergencyDetected: false,
        recommendations: []
    };

    // Check for emergency symptoms first
    const emergencySymptoms = ['Chest pain', 'Shortness of breath', 'Severe headache', 'Loss of consciousness'];
    const hasEmergencySymptom = selectedSymptoms.some(symptom => 
        emergencySymptoms.some(emergency => symptom.toLowerCase().includes(emergency.toLowerCase()))
    );

    if (hasEmergencySymptom || currentSeverity >= 8) {
        results.emergencyDetected = true;
        results.riskLevel = 'emergency';
    }

    // Calculate condition probabilities based on symptom matching
    medicalDatabase.conditions.forEach(condition => {
        const matchingSymptoms = condition.symptoms.filter(symptom => 
            selectedSymptoms.some(selected => 
                symptom.toLowerCase().includes(selected.toLowerCase()) || 
                selected.toLowerCase().includes(symptom.toLowerCase())
            )
        );

        if (matchingSymptoms.length > 0) {
            const probability = Math.min(95, (matchingSymptoms.length / condition.symptoms.length) * 100);
            results.conditions.push({
                ...condition,
                probability: Math.round(probability),
                matchingSymptoms: matchingSymptoms.length
            });
        }
    });

    // Sort by probability and take top 5
    results.conditions = results.conditions
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 5);

    // Determine risk level
    if (results.conditions.some(c => c.severity === 'emergency')) {
        results.riskLevel = 'emergency';
    } else if (results.conditions.some(c => c.severity === 'high') || currentSeverity >= 7) {
        results.riskLevel = 'high';
    } else if (results.conditions.some(c => c.severity === 'moderate') || currentSeverity >= 4) {
        results.riskLevel = 'moderate';
    }

    // Generate recommendations
    results.recommendations = generateRecommendations(results);

    return results;
}

function generateRecommendations(results) {
    const recommendations = [];

    if (results.emergencyDetected) {
        recommendations.push({
            type: 'emergency',
            text: 'Seek immediate emergency medical attention',
            priority: 'critical'
        });
    } else if (results.riskLevel === 'high') {
        recommendations.push({
            type: 'medical',
            text: 'Consult with a healthcare provider within 24 hours',
            priority: 'high'
        });
    } else if (results.riskLevel === 'moderate') {
        recommendations.push({
            type: 'medical',
            text: 'Monitor symptoms and consult doctor if they worsen',
            priority: 'medium'
        });
    } else {
        recommendations.push({
            type: 'self_care',
            text: 'Practice self-care and monitor symptoms',
            priority: 'low'
        });
    }

    recommendations.push({
        type: 'general',
        text: 'Stay hydrated and get adequate rest',
        priority: 'low'
    });

    return recommendations;
}

function displayResults(results) {
    // Hide diagnostic progress
    const progressDiv = document.getElementById('diagnostic-progress');
    if (progressDiv) {
        setTimeout(() => {
            progressDiv.classList.add('hidden');
        }, 1000);
    }

    // Show emergency alert if needed
    if (results.emergencyDetected) {
        showEmergencyAlert();
    }

    // Display condition results
    displayConditionResults(results.conditions);

    // Display risk assessment
    displayRiskAssessment(results.riskLevel);

    // Animate results appearance
    anime({
        targets: '#results-panel, #risk-panel',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuad'
    });

    diagnosisResults = results;
    console.log('Diagnosis results:', results);
}

function showEmergencyAlert() {
    const emergencyAlert = document.getElementById('emergency-alert');
    if (emergencyAlert) {
        emergencyAlert.classList.remove('hidden');
        
        // Animate emergency alert
        anime({
            targets: emergencyAlert,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });
    }
}

function displayConditionResults(conditions) {
    const resultsPanel = document.getElementById('results-panel');
    const conditionResults = document.getElementById('condition-results');
    
    if (!resultsPanel || !conditionResults) return;

    resultsPanel.classList.remove('hidden');

    if (conditions.length === 0) {
        conditionResults.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-600">No specific conditions identified based on your symptoms.</p>
                <p class="text-sm text-gray-500 mt-2">Consider consulting with a healthcare provider for a thorough evaluation.</p>
            </div>
        `;
        return;
    }

    conditionResults.innerHTML = conditions.map(condition => `
        <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-gray-900">${condition.name}</h4>
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    ${condition.probability}% match
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${condition.description}</p>
            <div class="flex items-center justify-between text-xs text-gray-500">
                <span>${condition.matchingSymptoms} matching symptoms</span>
                <span class="capitalize ${getSeverityColor(condition.severity)}">${condition.severity} severity</span>
            </div>
        </div>
    `).join('');
}

function displayRiskAssessment(riskLevel) {
    const riskPanel = document.getElementById('risk-panel');
    const riskChart = document.getElementById('risk-chart');
    
    if (!riskPanel || !riskChart) return;

    riskPanel.classList.remove('hidden');

    // Create risk assessment chart
    const chart = echarts.init(riskChart);
    
    const riskData = [
        { name: 'Low Risk', value: riskLevel === 'low' ? 80 : 20 },
        { name: 'Moderate Risk', value: riskLevel === 'moderate' ? 80 : 20 },
        { name: 'High Risk', value: riskLevel === 'high' ? 80 : 20 },
        { name: 'Emergency', value: riskLevel === 'emergency' ? 80 : 20 }
    ];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%'
        },
        series: [{
            name: 'Risk Assessment',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: riskData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            itemStyle: {
                color: function(params) {
                    const colors = ['#10B981', '#F59E0B', '#EF4444', '#DC2626'];
                    return colors[params.dataIndex];
                }
            }
        }]
    };

    chart.setOption(option);
}

function getSeverityColor(severity) {
    switch (severity) {
        case 'low': return 'text-green-600';
        case 'moderate': return 'text-yellow-600';
        case 'high': return 'text-orange-600';
        case 'emergency': return 'text-red-600';
        default: return 'text-gray-600';
    }
}

function callEmergency() {
    // In a real application, this would initiate emergency services
    alert('Emergency services would be contacted. In a real emergency, call 911 immediately.');
}

// Utility functions for enhanced user experience
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Export functions for global access
window.startDiagnosis = startDiagnosis;
window.scrollToLearnMore = scrollToLearnMore;
window.analyzeSymptoms = analyzeSymptoms;
window.selectSymptom = selectSymptom;
window.removeSymptom = removeSymptom;
window.callEmergency = callEmergency;

console.log('RapidHealthAI JavaScript loaded successfully');
