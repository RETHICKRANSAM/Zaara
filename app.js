
// ZAARA Neural — Frontend Interface System
// Fully Ported to Single-Page Application (SPA) for GitHub Pages Hosting

const TEMPLATES = {
    'ai_engineer': [
        { t: 'AI Engineering Roadmap', d: 'Visual architecture for mastering Artificial Intelligence.', r: 'https://roadmap.sh/ai-engineer' },
        { t: 'Machine Learning Deep Dive', d: 'Hands-on guide to implementing core algorithms with Scikit-Learn.', r: 'https://machinelearningmastery.com/machine-learning-in-python-step-by-step/' },
        { t: 'DeepLearning.AI Essentials', d: 'Specialized training for Large Language Models and Vision.', r: 'https://www.deeplearning.ai/resources/' }
    ],
    'web_dev': [
        { t: 'Full-Stack Web Roadmap', d: 'A comprehensive path from frontend to backend logic.', r: 'https://roadmap.sh/full-stack' },
        { t: 'Modern Frontend Mastery', d: 'Advanced React, TypeScript, and state management hooks.', r: 'https://react.dev/learn' },
        { t: 'The Odin Project', d: 'Project-based curriculum for full-stack JavaScript mastery.', r: 'https://www.theodinproject.com' }
    ],
    'data_scientist': [
        { t: 'Data Science Roadmap', d: 'Visual guide to all tools and stats for Data Science.', r: 'https://roadmap.sh/ai-data-scientist' },
        { t: 'SQL for Data Science', d: 'Advanced queries, window functions, and database wrangling.', r: 'https://sqlbolt.com/' },
        { t: 'Visualization Theory', d: 'Storytelling through data using Matplotlib and D3.js.', r: 'https://matplotlib.org/stable/tutorials/index.html' }
    ],
    'cybersecurity': [
        { t: 'Cyber Security Roadmap', d: 'Comprehensive guide to offensive and defensive security.', r: 'https://roadmap.sh/cyber-security' },
        { t: 'Web Security Academy', d: 'Professional training for web application vulnerabilities.', r: 'https://portswigger.net/web-security' },
        { t: 'Linux Terminal Mastery', d: 'Official guide to command-line automation and security.', r: 'https://ubuntu.com/tutorials/command-line-for-beginners' }
    ],
    'cloud_engineer': [
        { t: 'Cloud (AWS) Roadmap', d: 'Role-based paths for becoming a Cloud Architect.', r: 'https://roadmap.sh/aws' },
        { t: 'Infrastructure as Code', d: 'Learning Terraform, Pulumi, and automation strategies.', r: 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started' },
        { t: 'Docker & Kubernetes', d: 'Containerization and orchestration for scalable apps.', r: 'https://roadmap.sh/kubernetes' }
    ],
    'mobile_dev': [
        { t: 'Mobile Architecture', d: 'Visual guide to cross-platform mobile app development.', r: 'https://roadmap.sh/android' },
        { t: 'Flutter Foundations', d: 'Building beautiful 3D-accelerated UIs with Dart.', r: 'https://docs.flutter.dev/get-started/codelab' }
    ],
    'devops': [
        { t: 'DevOps Roadmap', d: 'Guide to CI/CD, monitoring, and cloud automation.', r: 'https://roadmap.sh/devops' },
        { t: 'GitHub Actions Mastery', d: 'Automating deployment cycles with modern CI tools.', r: 'https://docs.github.com/en/actions/quickstart' }
    ],
    'game_dev': [
        { t: 'Game Development Roadmap', d: 'Path for mastering 3D engines and vertex logic.', r: 'https://roadmap.sh/game-developer' },
        { t: 'Unity Essentials', d: 'Professional-grade Unity training for all levels.', r: 'https://learn.unity.com/' }
    ],
    'blockchain': [
        { t: 'Blockchain Roadmap', d: 'Master Web3, Solidity, and DApp architecture.', r: 'https://roadmap.sh/blockchain' },
        { t: 'Ethereum Development', d: 'Building decentralized finance (DeFi) platforms.', r: 'https://ethereum.org/en/developers/' }
    ],
    'ui_ux': [
        { t: 'UX Design Roadmap', d: 'Guide to research, wireframing, and psychological design.', r: 'https://roadmap.sh/ux-design' },
        { t: 'Figma Mastery', d: 'Learning high-fidelity prototyping and design systems.', r: 'https://help.figma.com/hc/en-us' }
    ],
    'backend': [
        { t: 'Backend Engineering', d: 'Complete path for mastering server-side logic and systems.', r: 'https://roadmap.sh/backend' },
        { t: 'System Design Primer', d: 'Architecting for scalability and distributed systems.', r: 'https://github.com/donnemartin/system-design-primer' }
    ],
    'data_engineer': [
        { t: 'Data Engineer Roadmap', d: 'Building robust data pipelines and warehouses.', r: 'https://roadmap.sh/data-engineer' },
        { t: 'Apache Spark Guide', d: 'Distributed computing for large-scale data processing.', r: 'https://spark.apache.org/docs/latest/' }
    ],
    'software_engineer': [
        { t: 'Software Architecture', d: 'Path to mastering large-scale patterns and SOLID design.', r: 'https://roadmap.sh/software-architect' },
        { t: 'DSA & Algorithms', d: 'Mastering data structures for technical interview prep.', r: 'https://www.geeksforgeeks.org/data-structures/' }
    ],
    'internship': [
        { t: 'Internship Success Guide', d: 'How to pick a stack and land your first role.', r: 'https://roadmap.sh/' },
        { t: 'Portfolio Architecture', d: 'Building high-impact projects that attract recruiters.', r: 'https://dev.to/t/portfolio' }
    ],
    'freelance': [
        { t: 'Freelance Tech Roadmap', d: 'Guide to managing technical clients and solo projects.', r: 'https://roadmap.sh/full-stack' },
        { t: 'Personal Branding', d: 'Establishing a professional online identity as a dev.', r: 'https://dev.to/t/branding' }
    ],
    'embedded_systems': [
        { t: 'Embedded Systems Roadmap', d: 'Mastering the bridge between hardware and software.', r: 'https://roadmap.sh/cpp' },
        { t: 'Digital Electronics Core', d: 'Fundamentals of logic gates and circuit design.', r: 'https://www.allaboutcircuits.com/textbook/digital/' },
        { t: 'Microcontroller Architecture', d: 'Understanding CPU cores, memory mapping, and registers.', r: 'https://www.edx.org/learn/microcontrollers' }
    ],
    'medical_doctor': [
        { t: 'Advanced Clinical Anatomy', d: 'Deep dive into structural and functional human anatomy.', r: 'https://www.kenhub.com/' },
        { t: 'Pharmacology Fundamentals', d: 'Mechanisms of drug action and clinical applications.', r: 'https://www.osmosis.org/topics/pharmacology' },
        { t: 'Diagnostic Medicine', d: 'Core principles of differential diagnosis and imaging.', r: 'https://www.medscape.com/index/section_10123_0' },
        { t: 'Medical Research & PubMed', d: 'Navigating clinical trials and peer-reviewed journals.', r: 'https://pubmed.ncbi.nlm.nih.gov/' },
        { t: 'Telemedicine & Digital Health', d: 'Future of healthcare delivery and virtual diagnostics.', r: 'https://www.khanacademy.org/science/health-and-medicine' }
    ]
};

const LANGUAGE_EXTENSIONS = {
    'c': [
        { t: 'Embedded C Mastery', d: 'Pointer arithmetic and register-level programming.', r: 'https://www.learn-c.org/' },
        { t: 'Bare-Metal Driver Design', d: 'Writing your own I2C and UART drivers from scratch.', r: 'https://embedded-trainings.ferrous-systems.com/' }
    ],
    'cpp': [
        { t: 'Modern C++ for Embedded', d: 'Standard Template Library (STL) in constrained environments.', r: 'https://academy.nordicsemi.com/' },
        { t: 'OOP in Hardware', d: 'Class-based architecture for peripheral management.', r: 'https://www.cplusplus.com/doc/tutorial/' }
    ],
    'rust': [
        { t: 'The Embedded Rust Book', d: 'Safe systems programming for microcontrollers.', r: 'https://docs.rust-embedded.org/book/' },
        { t: 'PAC & HAL in Rust', d: 'Hardware Abstraction Layers and memory safety.', r: 'https://rust-embedded.github.io/book/intro/hardware.html' }
    ],
    'python': [
        { t: 'MicroPython Essentials', d: 'Rapid prototyping for hardware with Python.', r: 'https://docs.micropython.org/en/latest/' },
        { t: 'CircuitPython Workflow', d: 'Easy USB-level programming for sensors and I/O.', r: 'https://learn.adafruit.com/welcome-to-circuitpython' }
    ],
    'assembly': [
        { t: 'Instruction Set Theory', d: 'Direct CPU control and opcode optimization.', r: 'https://www.arm.com/resources/education/books/assembly-language-programming' },
        { t: 'Inline Assembly in C', d: 'Mixing low-level and high-level logic for speed.', r: 'https://www.tutorialspoint.com/assembly_programming/index.htm' }
    ]
};

const MEDICAL_SPECIALTIES = {
    'cardiologist': [
        { t: 'Cardiovascular Anatomy', d: 'Structure of the heart and circulatory system.', r: 'https://www.cvphysiology.com/' },
        { t: 'ECG Interpretation', d: 'Mastering heart rate and rhythm diagnostics.', r: 'https://litfl.com/ecg-library/' }
    ],
    'neurologist': [
        { t: 'Neuroanatomy Core', d: 'Central and peripheral nervous system mapping.', r: 'https://nba.uth.tmc.edu/neuroscience/' },
        { t: 'Neurological Diagnostics', d: 'MRI/CT scans of the brain and nerve function tests.', r: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics' }
    ],
    'dermatologist': [
        { t: 'Clinical Dermatology', d: 'Diagnosis and treatment of skin conditions.', r: 'https://www.msdmanuals.com/professional/dermatologic-disorders' },
        { t: 'Dermatopathology Basics', d: 'Histological analysis of skin biopsies.', r: 'https://dermnetnz.org/' }
    ],
    'gastroenterologist': [
        { t: 'Digestive System Physiology', d: 'Advanced GI tract function and disorders.', r: 'https://gi.org/patients/gi-health-and-disease/' },
        { t: 'Endoscopy & Procedures', d: 'Introduction to gastroenterological imaging.', r: 'https://medlineplus.gov/endoscopy.html' }
    ],
    'pulmonologist': [
        { t: 'Respiratory Pathophysiology', d: 'Lung disease management and critical care basics.', r: 'https://www.thoracic.org/patients/patient-resources/' },
        { t: 'Pulmonary Function Tests', d: 'Interpreting lung capacity and airflow metrics.', r: 'https://medlineplus.gov/ency/article/003853.htm' }
    ],
    'nephrologist': [
        { t: 'Renal Physiology', d: 'Kidney function and electrolyte balance control.', r: 'https://www.asnonline.org/education/' },
        { t: 'Clinical Nephrology', d: 'Chronic kidney disease and dialysis fundamentals.', r: 'https://www.kidney.org/professionals' }
    ]
};

function getMockInsights(goal) {
    const insights = {
        'ai_engineer': {
            identity: "Neural Architect & ML Optimizer",
            skills: ["Python Basics", "Linear Algebra & Calculus", "Neural Networks", "Transformer Architecture", "LLM Fine-tuning"],
            tools: ["PyTorch", "TensorFlow", "Hugging Face", "CUDA", "Scikit-Learn"],
            projects: ["Custom Sentiment Analyzer", "Image Classification API", "Retrieval-Augmented Generation (RAG) Chatbot"],
            ai_recommendation: "Focus heavily on foundational math before diving deep into complex architectures. The best AI Engineers understand the theory behind the framework."
        },
        'web_dev': {
            identity: "Full-Stack System Builder",
            skills: ["HTML/CSS/JS", "React/Vue Frontend", "Node.js/Python Backend", "Database Design", "System Architecture"],
            tools: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
            projects: ["E-Commerce Mockup", "Real-time Chat App", "Full-Stack SaaS Platform"],
            ai_recommendation: "Build consistently. A strong personal portfolio demonstrating complete end-to-end applications matters more than purely theoretical knowledge."
        },
        'data_scientist': {
            identity: "Data Storyteller & Statistical Analyst",
            skills: ["Data Wrangling", "Exploratory Data Analysis (EDA)", "Probability & Statistics", "Machine Learning Models", "Data Visualization"],
            tools: ["Pandas", "NumPy", "Jupyter", "Tableau", "SQL"],
            projects: ["Predictive Pricing Model", "Customer Churn Analysis", "Interactive Data Dashboard"],
            ai_recommendation: "Your core value is extracting actionable insights. Don't just build models—learn to communicate what the data actually means for a business."
        },
        'cybersecurity': {
            identity: "Security Analyst & Off/Def Specialist",
            skills: ["Networking Basics", "Linux Administration", "Ethical Hacking", "Cryptography", "Incident Response"],
            tools: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap"],
            projects: ["Vulnerability Scanner Tool", "Packet Analyzer", "Secure Home Network Setup"],
            ai_recommendation: "Adopt a 'hacker mindset'—always think about how systems can be broken. Validate your skills through hands-on labs like HackTheBox or TryHackMe."
        },
        'embedded_systems': {
            identity: "Hardware/Firmware Integrator",
            skills: ["Digital Logic", "C/C++", "Microcontroller Architecture", "RTOS", "Signal Processing"],
            tools: ["Oscilloscope", "STM32/Arduino", "PlatformIO", "KiCad", "Logic Analyzer"],
            projects: ["Custom Weather Station", "Automated Robot Arm", "Custom Keyboard PCB Firmware"],
            ai_recommendation: "The bridge between software and hardware requires immense patience. Learn to read technical datasheets thoroughly."
        },
        'medical_doctor': {
            identity: "Clinical Diagnostics Specialist",
            skills: ["Anatomy & Physiology", "Biochemistry", "Pathology", "Pharmacology", "Clinical Reasoning"],
            tools: ["Stethoscope", "Electronic Health Records (EHR)", "Diagnostic Imaging (MRI/CT/X-Ray)", "Differential Diagnosis Matrix"],
            projects: ["Clinical Case Studies", "Research Meta-Analysis", "Medical Volunteer Rotation"],
            ai_recommendation: "Medicine is a marathon of continuous learning. Focus heavily on mastering the fundamentals of anatomy and pathology before specializing."
        }
    };
    
    return insights[goal] || {
        identity: "Advanced Systems Specialist",
        skills: ["Core Fundamentals", "Advanced Logic", "System Design", "Security Practices", "Optimization & Scale"],
        tools: ["Git/GitHub", "Docker", "Linux Terminal", "Cloud Platforms", "CI/CD"],
        projects: ["Automated Process Script", "CRUD Platform System", "Fully Deployed Scalable Application"],
        ai_recommendation: "Consistency and deep fundamental understanding will guarantee your success in this chosen technical domain."
    };
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#landing-view header, #landing-view .glass-panel').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (i * 100));
    });
});

async function generate() {
    const goalEl = document.getElementById('career-goal');
    const errObj = document.getElementById('form-error');

    if (!goalEl.value) {
        goalEl.style.borderColor = 'red';
        errObj.innerText = "ERROR: Please select a career path to proceed.";
        errObj.classList.remove('hidden');
        return;
    }
    goalEl.style.borderColor = '';
    errObj.classList.add('hidden');

    const skill = document.getElementById('skill-level').value;
    const goal = goalEl.value;
    const language = document.getElementById('preferred-language').value;
    const specialty = document.getElementById('medical-specialty').value;
    const duration = document.querySelector('input[name="duration"]:checked').value;
    
    document.getElementById('landing-view').classList.add('hidden');
    document.getElementById('roadmap-view').classList.add('hidden');
    
    const loaderView = document.getElementById('loader-view');
    const loaderText = document.getElementById('loader-text');
    const loaderSubtext = document.getElementById('loader-subtext');
    const loaderFill = document.getElementById('loader-progress-fill');
    const loaderPercent = document.getElementById('loader-percent');
    loaderView.classList.remove('hidden');
    loaderView.style.display = 'flex';
    
    // Reset loader state
    loaderText.innerText = "Initializing Neural Engine...";
    if (loaderSubtext) loaderSubtext.innerText = 'ZAARA NEURAL ENGINE v2.0';
    if (loaderFill) loaderFill.style.width = '0%';
    if (loaderPercent) loaderPercent.innerText = '0%';
    document.querySelectorAll('.loader-phase').forEach(p => { p.className = 'loader-phase'; p.querySelector('i').className = 'fa-solid fa-clock'; });

    // Phase animation sequence
    const phases = [
        { id: 'phase-1', text: 'Scanning career database...', pct: 15, mainText: 'Analyzing your career path...' },
        { id: 'phase-2', text: 'Mapping skill dependencies...', pct: 35, mainText: 'Mapping skill graph...' },
        { id: 'phase-3', text: 'Curating learning resources...', pct: 55, mainText: 'Curating resources...' },
        { id: 'phase-4', text: 'Building personalized matrix...', pct: 80, mainText: 'Building your matrix...' },
        { id: 'phase-5', text: 'Finalizing AI recommendations...', pct: 100, mainText: 'Finalizing recommendations...' },
    ];

    let currentPhase = 0;
    function advancePhase() {
        if (currentPhase > 0) {
            const prev = document.getElementById(phases[currentPhase - 1].id);
            prev.classList.remove('active');
            prev.classList.add('done');
            prev.querySelector('i').className = 'fa-solid fa-check';
        }
        if (currentPhase < phases.length) {
            const phase = phases[currentPhase];
            const el = document.getElementById(phase.id);
            el.classList.add('active');
            el.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';
            if (loaderFill) loaderFill.style.width = phase.pct + '%';
            if (loaderPercent) loaderPercent.innerText = phase.pct + '%';
            loaderText.innerText = phase.mainText;
            currentPhase++;
        }
    }

    advancePhase();
    setTimeout(() => advancePhase(), 600);
    setTimeout(() => advancePhase(), 1300);
    setTimeout(() => advancePhase(), 2000);
    setTimeout(() => advancePhase(), 2700);
    // Mark last phase done
    setTimeout(() => {
        const last = document.getElementById(phases[4].id);
        last.classList.remove('active');
        last.classList.add('done');
        last.querySelector('i').className = 'fa-solid fa-check';
        loaderText.innerText = 'Matrix Ready!';
        if (loaderSubtext) loaderSubtext.innerText = 'SEQUENCE COMPLETE';
    }, 3200);

    try {
        // --- OFFLINE AI LOGIC ENGINE ---
        let base = TEMPLATES[goal] || TEMPLATES['web_dev'];
        
        if (goal === 'embedded_systems' && LANGUAGE_EXTENSIONS[language]) {
            base = base.concat(LANGUAGE_EXTENSIONS[language]);
        }
        if (goal === 'medical_doctor' && MEDICAL_SPECIALTIES[specialty]) {
            base = base.concat(MEDICAL_SPECIALTIES[specialty]);
        }

        const roadmapData = [];
        const numDays = parseInt(duration, 10);
        for (let i = 1; i <= numDays; i++) {
            const templateItem = base[(i - 1) % base.length];
            roadmapData.push({
                day: i,
                topic: templateItem.t,
                description: templateItem.d,
                resource: templateItem.r
            });
        }
        
        let displayTitle = goal.replace(/_/g, ' ').toUpperCase();
        if (goal === 'embedded_systems') displayTitle += ` (${language.toUpperCase()})`;
        else if (goal === 'medical_doctor' && specialty !== 'general') displayTitle = `${specialty.replace(/_/g, ' ').toUpperCase()} Specialist`;
        
        const insights = getMockInsights(goal);
        
        const data = {
            status: 'success',
            title: `Your ${duration}-Day ${displayTitle} Path`,
            career_identity: insights.identity,
            skills_tree: insights.skills,
            tools_stack: insights.tools,
            projects: insights.projects,
            ai_recommendation: insights.ai_recommendation,
            roadmap: roadmapData
        };
        // -------------------------------
        
        setTimeout(() => {
            loaderView.style.display = 'none';
            loaderView.classList.add('hidden');
            
            if (data.status === 'success') {
                document.getElementById('roadmap-view').classList.remove('hidden');
                document.getElementById('roadmap-title').innerText = data.title;
                
                // Typing effect wrapper instead of direct assignment
                typewriterEffect('identity-text', data.career_identity || 'Specialist Mode Engaged');
                
                const ulSkills = document.getElementById('skill-tree-list');
                ulSkills.innerHTML = (data.skills_tree || []).map(s => `<div class="skill-item">${s}</div>`).join('');
                
                const ulTools = document.getElementById('tools-list');
                ulTools.innerHTML = (data.tools_stack || []).map(s => `<span class="tech-badge">${s}</span>`).join('');
                
                const ulProjects = document.getElementById('projects-list');
                ulProjects.innerHTML = (data.projects || []).map(p => `<li><strong class="text-purple-300">${p.split(':')[0] || p}</strong><p class="text-xs text-zinc-400 mt-1">Recommended hands-on implementation project.</p></li>`).join('');
                
                typewriterEffect('ai-rec-text', data.ai_recommendation || 'Consistency is key.');

                renderTimeline(data.roadmap);
                
                // Save to localStorage
                data.created_at = new Date().toISOString();
                localStorage.setItem('zaara_last_roadmap', JSON.stringify(data));
                showToast('\u2705 Neural Matrix deployed successfully.', 'success');
                
            } else {
                document.getElementById('landing-view').classList.remove('hidden');
                errObj.innerText = `Error: ${data.message}`;
                errObj.classList.remove('hidden');
            }
        }, 3600); // Extended for cinematic phases

    } catch (e) {
        setTimeout(() => {
            loaderView.style.display = 'none';
            loaderView.classList.add('hidden');
            document.getElementById('landing-view').classList.remove('hidden');
            errObj.innerText = "Connection Failed: AI Core is currently offline.";
            errObj.classList.remove('hidden');
        }, 1000);
    }
}

function renderTimeline(roadmap) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    // Load completion state
    const completionState = JSON.parse(localStorage.getItem('zaara_progress') || '{}');

    // Calculate current day based on roadmap creation date
    const saved = localStorage.getItem('zaara_last_roadmap');
    let currentDay = 1;
    if (saved) {
        try {
            const savedData = JSON.parse(saved);
            if (savedData.created_at) {
                const created = new Date(savedData.created_at);
                const now = new Date();
                const daysDiff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
                currentDay = Math.min(Math.max(daysDiff + 1, 1), roadmap.length);
            }
        } catch(e) {}
    }

    let scrollTarget = null;

    roadmap.forEach((item, i) => {
        const card = document.createElement('div');
        const isCompleted = completionState[`day_${item.day}`] === true;
        const isCurrentDay = item.day === currentDay && !isCompleted;
        const isUpcoming = item.day > currentDay && !isCompleted;
        
        let statusClass = '';
        if (isCompleted) statusClass = ' completed';
        else if (isCurrentDay) statusClass = ' current-day';
        
        card.className = `timeline-card slide-in-card mb-6 pl-8 ml-4 w-[calc(100%-1rem)] roadmap-section${statusClass}`;
        card.dataset.day = item.day;
        card.dataset.topic = item.topic.toLowerCase();
        card.dataset.description = item.description.toLowerCase();

        // Determine status badge
        let statusBadge = '';
        if (isCompleted) {
            statusBadge = '<span class="status-badge badge-completed"><i class="fa-solid fa-check"></i> Completed</span>';
        } else if (isCurrentDay) {
            statusBadge = '<span class="status-badge badge-in-progress"><i class="fa-solid fa-bolt"></i> In Progress</span>';
        } else if (isUpcoming) {
            statusBadge = '<span class="status-badge badge-upcoming"><i class="fa-regular fa-clock"></i> Upcoming</span>';
        } else {
            statusBadge = '<span class="status-badge badge-in-progress"><i class="fa-solid fa-bolt"></i> In Progress</span>';
        }

        card.innerHTML = `
            <div class="timeline-node"></div>
            ${isCurrentDay ? '<div class="current-day-arrow">YOU ▸</div>' : ''}
            <div class="completion-check" onclick="event.stopPropagation(); toggleCardCompletion(${item.day}, this)" title="${isCompleted ? 'Mark incomplete' : 'Mark complete'}">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="flex items-center gap-2 mb-2 border-b border-white/10 pb-2 flex-wrap">
                <span class="text-neon-purple text-[11px] font-bold tracking-wider">MONTH ${Math.ceil(item.day / 30) || 1} / STEP ${item.day}</span>
                ${statusBadge}
                <span class="font-bold text-[15px] gradient-text">${item.topic}</span>
            </div>
            <p class="text-zinc-400 text-sm mb-3 leading-relaxed">${item.description}</p>
            <a href="${item.resource}" target="_blank" class="inline-flex flex-col gap-1 mt-2 p-3 bg-black/40 rounded-lg border border-purple-900/30 hover:border-purple-500/50 transition-all font-mono">
                <div class="text-purple-300 text-xs font-bold"><i class="fa-solid fa-link"></i> Access Component</div>
            </a>
        `;
        timeline.appendChild(card);
        setTimeout(() => card.classList.add('animate'), i * 50);

        if (isCurrentDay) scrollTarget = card;
    });

    updateProgressBar();

    // Auto-scroll to current day after animation settles
    if (scrollTarget) {
        setTimeout(() => {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, roadmap.length * 50 + 500);
    }
}

function goHome() {
    document.getElementById('roadmap-view').classList.add('hidden');
    document.getElementById('landing-view').classList.remove('hidden');
    document.getElementById('timeline').innerHTML = '';
}

// Utility: Typing Effect
function typewriterEffect(elementId, text, speed = 15) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    el.classList.add('typing-cursor');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            el.classList.remove('typing-cursor');
            el.classList.add('crt-flicker'); // adding standard effect after typing
        }
    }
    typeWriter();
}

// Utility: Toast Notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle text-green-400' : 'fa-info-circle text-purple-400'}"></i> ${message}`;
    container.appendChild(toast);
    
    setTimeout(() => {
        if(toast.parentNode) {
            toast.remove();
        }
    }, 3500);
}

// Data Persistence: Load Previous Roadmap
function loadPreviousRoadmap() {
    const saved = localStorage.getItem('zaara_last_roadmap');
    if (!saved) {
        showToast('No previously saved roadmap found in local storage.', 'info');
        return;
    }
    
    try {
        const data = JSON.parse(saved);
        
        document.getElementById('landing-view').classList.add('hidden');
        document.getElementById('roadmap-view').classList.remove('hidden');
        
        document.getElementById('roadmap-title').innerText = data.title;
        
        typewriterEffect('identity-text', data.career_identity || 'Specialist Mode Engaged');
        
        const ulSkills = document.getElementById('skill-tree-list');
        ulSkills.innerHTML = (data.skills_tree || []).map(s => `<div class="skill-item">${s}</div>`).join('');
        
        const ulTools = document.getElementById('tools-list');
        ulTools.innerHTML = (data.tools_stack || []).map(s => `<span class="tech-badge">${s}</span>`).join('');
        
        const ulProjects = document.getElementById('projects-list');
        ulProjects.innerHTML = (data.projects || []).map(p => `<li><strong class="text-purple-300">${p.split(':')[0] || p}</strong><p class="text-xs text-zinc-400 mt-1">Recommended hands-on implementation project.</p></li>`).join('');
        
        typewriterEffect('ai-rec-text', data.ai_recommendation || 'Consistency is key.');

        renderTimeline(data.roadmap);
        
        showToast('Successfully loaded your previous career matrix.', 'success');
    } catch(e) {
        showToast('Data corrupted. Could not load previous roadmap.', 'error');
    }
}

// PDF Export — Full-Container Canvas Capture with Page Slicing
async function downloadPDF() {
    showToast('Preparing PDF document...', 'info');

    // ── 1. Pre-Capture DOM Preparation ──────────────────────────────
    document.body.classList.add('pdf-exporting');

    // Remove typing cursors
    const cursors = document.querySelectorAll('.typing-cursor');
    cursors.forEach(el => el.classList.remove('typing-cursor'));

    // Save originals
    const savedOverflow = document.body.style.overflow;
    const savedHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'visible';
    document.documentElement.style.overflow = 'visible';

    // Force ALL animated cards to be fully visible
    // This is critical: .slide-in-card starts at opacity:0
    const prepStyle = document.createElement('style');
    prepStyle.id = 'pdf-prep-style';
    prepStyle.textContent = `
        body.pdf-exporting .slide-in-card,
        body.pdf-exporting .fade-in {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
        }
        body.pdf-exporting #exportable-roadmap,
        body.pdf-exporting #exportable-roadmap * {
            overflow: visible !important;
        }
    `;
    document.head.appendChild(prepStyle);

    // Wait for repaint
    await new Promise(r => setTimeout(r, 500));

    const container = document.getElementById('exportable-roadmap');

    // DEBUG: log dimensions
    console.log('[PDF] Container offsetHeight:', container.offsetHeight);
    console.log('[PDF] Container scrollHeight:', container.scrollHeight);
    console.log('[PDF] .roadmap-section count:', container.querySelectorAll('.roadmap-section').length);

    try {
        // ── 2. Capture entire container as ONE canvas ────────────────
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: -window.scrollY,
            width: container.scrollWidth,
            height: container.scrollHeight,
            windowWidth: container.scrollWidth,
            windowHeight: container.scrollHeight,
        });

        console.log('[PDF] Canvas size:', canvas.width, 'x', canvas.height);

        // ── 3. Slice canvas into A4 pages ───────────────────────────
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        const PAGE_W = 210;
        const PAGE_H = 297;
        const M = 10; // margin mm

        const contentW = PAGE_W - M * 2;
        const contentH = PAGE_H - M * 2;

        // The full image scaled to A4 width
        const imgW = contentW;
        const imgH = (canvas.height / canvas.width) * contentW;

        // How many px of canvas correspond to one page of content
        const pxPerMm = canvas.width / contentW;
        const pageContentPx = contentH * pxPerMm;

        const totalPages = Math.ceil(canvas.height / pageContentPx);
        console.log('[PDF] Total pages to generate:', totalPages);

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            // Slice out a chunk of the canvas for this page
            const srcY = i * pageContentPx;
            const srcH = Math.min(pageContentPx, canvas.height - srcY);

            // Create a temporary canvas for this slice
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = srcH;
            const ctx = sliceCanvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
            ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

            const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.95);
            const sliceImgH = (srcH / canvas.width) * contentW;

            pdf.addImage(sliceData, 'JPEG', M, M, contentW, sliceImgH);

            // Header & footer
            pdf.setFontSize(7);
            pdf.setTextColor(160, 160, 160);
            pdf.text('ZAARA — Career Neural Matrix', M, 7);
            pdf.text(`Page ${i + 1} of ${totalPages}`, PAGE_W - M - 20, PAGE_H - 5);
        }

        // ── 3.5 Add Clickable Links ─────────────────────────────────
        const containerRect = container.getBoundingClientRect();
        const domToMm = contentW / containerRect.width;
        const links = container.querySelectorAll('a[href]');

        links.forEach(link => {
            const rect = link.getBoundingClientRect();
            const xPx = rect.left - containerRect.left;
            const yPx = rect.top - containerRect.top;

            const x_mm = xPx * domToMm;
            const y_mm = yPx * domToMm;
            const w_mm = rect.width * domToMm;
            const h_mm = rect.height * domToMm;

            const pageIndex = Math.floor(y_mm / contentH);
            const pageY = (y_mm % contentH) + M;

            if (pageIndex < totalPages) {
                pdf.setPage(pageIndex + 1);
                // jsPDF link overlay
                pdf.link(x_mm + M, pageY, w_mm, h_mm, { url: link.href });
            }
        });

        // ── 4. Save ─────────────────────────────────────────────────
        pdf.save('zaara-career-roadmap.pdf');
        showToast(`PDF exported — ${totalPages} pages`, 'success');

    } catch (err) {
        console.error('[PDF] Export error:', err);
        showToast('PDF export failed: ' + err.message, 'error');
    } finally {
        // ── 5. Restore DOM ──────────────────────────────────────────
        document.body.classList.remove('pdf-exporting');
        cursors.forEach(el => el.classList.add('typing-cursor'));
        document.body.style.overflow = savedOverflow;
        document.documentElement.style.overflow = savedHtmlOverflow;
        const s = document.getElementById('pdf-prep-style');
        if (s) s.remove();
    }
}

// ═══════════════════════════════════════════════════════════════════════
// ZAARA AI CAREER MENTOR — Intelligent Chatbot Engine v2.0
// ═══════════════════════════════════════════════════════════════════════

let chatOpen = false;
let chatHistory = [];
let userContext = { askedAbout: [], skillLevel: null, careerGoal: null };

// ── AI Chat Configuration ─────────────────────────────────────────────
let AI_ENABLED = false;
let AI_HAS_KEY = false;
let conversationMessages = [];
const AI_MODEL = 'gpt-4o-mini';
const MAX_HISTORY_MESSAGES = 20;

// ── Career Knowledge Base ─────────────────────────────────────────────
const CAREER_KB = {
    ai_engineer: {
        title: 'AI / ML Engineer',
        description: 'Build intelligent systems using machine learning, deep learning, and LLMs.',
        prerequisite: 'Strong Python skills + math fundamentals (linear algebra, calculus, probability)',
        roadmap: [
            '1. Master Python & core libraries (NumPy, Pandas)',
            '2. Learn math foundations — linear algebra, calculus, statistics',
            '3. Understand ML algorithms (regression, trees, SVMs, clustering)',
            '4. Dive into deep learning — CNNs, RNNs, Transformers',
            '5. Explore NLP & LLMs — Hugging Face, LangChain, RAG',
            '6. Build & deploy models — MLOps, Docker, cloud APIs'
        ],
        tools: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'CUDA', 'LangChain', 'Jupyter'],
        projects: [
            '• Sentiment Analysis API using BERT',
            '• Image classifier with custom CNN',
            '• RAG-based chatbot with LangChain',
            '• Recommendation engine for movies/books'
        ],
        salaryRange: '$95K - $180K+ (varies by experience & location)',
        timeToLearn: '6-12 months (dedicated full-time study)'
    },
    web_dev: {
        title: 'Full-Stack Web Developer',
        description: 'Build end-to-end web applications with modern frontend and backend technologies.',
        prerequisite: 'Basic HTML/CSS/JS knowledge is helpful but not required',
        roadmap: [
            '1. HTML5 & CSS3 fundamentals — semantic markup, Flexbox, Grid',
            '2. JavaScript deep dive — ES6+, DOM manipulation, async/await',
            '3. Learn a frontend framework — React, Vue, or Angular',
            '4. Backend with Node.js or Python (Django/Flask)',
            '5. Databases — PostgreSQL, MongoDB, Redis',
            '6. Deploy — Docker, CI/CD, cloud hosting (Vercel, AWS)'
        ],
        tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Git'],
        projects: [
            '• Personal portfolio website',
            '• E-commerce platform with payments',
            '• Real-time chat app with WebSockets',
            '• Full-stack SaaS dashboard'
        ],
        salaryRange: '$70K - $150K+',
        timeToLearn: '4-8 months (dedicated study)'
    },
    data_scientist: {
        title: 'Data Scientist',
        description: 'Extract insights from data using statistics, ML, and visualization.',
        prerequisite: 'Basic math/stats knowledge + Python or R basics',
        roadmap: [
            '1. Python + libraries (Pandas, NumPy, Matplotlib)',
            '2. Statistics & probability — distributions, hypothesis testing',
            '3. Data wrangling & EDA (Exploratory Data Analysis)',
            '4. Machine Learning models — supervised & unsupervised',
            '5. Data visualization — Tableau, Plotly, Seaborn',
            '6. Big Data tools — Spark, SQL, cloud platforms'
        ],
        tools: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'Tableau', 'SQL', 'Scikit-Learn', 'Matplotlib'],
        projects: [
            '• Customer churn prediction model',
            '• Sales forecasting dashboard',
            '• A/B test analysis pipeline',
            '• Interactive data storytelling notebook'
        ],
        salaryRange: '$85K - $160K+',
        timeToLearn: '5-10 months'
    },
    cybersecurity: {
        title: 'Cybersecurity Analyst',
        description: 'Protect systems and networks from digital threats.',
        prerequisite: 'Basic networking knowledge + comfort with command line',
        roadmap: [
            '1. Networking fundamentals — TCP/IP, DNS, HTTP, OSI model',
            '2. Linux administration & bash scripting',
            '3. Security principles — CIA triad, encryption, authentication',
            '4. Ethical hacking — OWASP Top 10, pen testing',
            '5. Tools mastery — Wireshark, Nmap, Burp Suite, Metasploit',
            '6. Certifications — CompTIA Security+, CEH, OSCP'
        ],
        tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Hashcat'],
        projects: [
            '• Build a vulnerability scanner',
            '• Set up a honeypot network',
            '• Capture-the-flag (CTF) challenges',
            '• Secure home lab configuration'
        ],
        salaryRange: '$75K - $140K+',
        timeToLearn: '6-12 months'
    },
    cloud_engineer: {
        title: 'Cloud Engineer (AWS/Azure)',
        description: 'Design and manage scalable cloud infrastructure.',
        prerequisite: 'Basic Linux + networking knowledge',
        roadmap: [
            '1. Linux & networking fundamentals',
            '2. Cloud platform basics — AWS/Azure/GCP core services',
            '3. Infrastructure as Code — Terraform, CloudFormation',
            '4. Containers — Docker & Kubernetes',
            '5. CI/CD pipelines & automation',
            '6. Certifications — AWS Solutions Architect, Azure Admin'
        ],
        tools: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Ansible', 'GitHub Actions'],
        projects: [
            '• Auto-scaling web app deployment',
            '• Multi-region disaster recovery setup',
            '• Serverless API with Lambda/Functions',
            '• Infrastructure automation pipeline'
        ],
        salaryRange: '$90K - $160K+',
        timeToLearn: '6-10 months'
    },
    mobile_dev: {
        title: 'Mobile App Developer',
        description: 'Build native & cross-platform mobile applications.',
        prerequisite: 'Basic programming knowledge in any language',
        roadmap: [
            '1. Choose your path — Flutter (Dart), React Native (JS), or native (Swift/Kotlin)',
            '2. UI/UX design principles for mobile',
            '3. State management & navigation',
            '4. API integration & local storage',
            '5. Testing & debugging on devices',
            '6. App Store / Play Store deployment'
        ],
        tools: ['Flutter', 'Dart', 'React Native', 'Xcode', 'Android Studio', 'Firebase'],
        projects: [
            '• Todo app with cloud sync',
            '• Weather app with live API',
            '• Social media feed clone',
            '• E-commerce mobile app'
        ],
        salaryRange: '$75K - $145K+',
        timeToLearn: '4-8 months'
    },
    devops: {
        title: 'DevOps Engineer',
        description: 'Automate development pipelines and manage infrastructure.',
        prerequisite: 'Linux basics + one scripting language (Python/Bash)',
        roadmap: [
            '1. Linux system administration',
            '2. Scripting — Bash, Python',
            '3. Version control — Git workflows',
            '4. CI/CD — Jenkins, GitHub Actions, GitLab CI',
            '5. Containers & orchestration — Docker, K8s',
            '6. Monitoring — Prometheus, Grafana, ELK Stack'
        ],
        tools: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Prometheus', 'Ansible'],
        projects: [
            '• Automated deployment pipeline',
            '• Kubernetes cluster setup',
            '• Monitoring dashboard with alerts',
            '• GitOps workflow implementation'
        ],
        salaryRange: '$85K - $155K+',
        timeToLearn: '5-9 months'
    },
    game_dev: {
        title: 'Game Developer',
        description: 'Create interactive games using engines and programming.',
        prerequisite: 'Basic programming skills + creativity',
        roadmap: [
            '1. Choose an engine — Unity (C#) or Unreal (C++)',
            '2. Learn game design principles',
            '3. 2D game development fundamentals',
            '4. 3D graphics & physics systems',
            '5. Multiplayer & networking',
            '6. Publishing & monetization'
        ],
        tools: ['Unity', 'Unreal Engine', 'C#', 'Blender', 'Photoshop', 'Git LFS'],
        projects: [
            '• 2D platformer game',
            '• 3D first-person explorer',
            '• Multiplayer card game',
            '• Mobile puzzle game'
        ],
        salaryRange: '$65K - $130K+',
        timeToLearn: '6-12 months'
    },
    blockchain: {
        title: 'Blockchain Developer',
        description: 'Build decentralized applications and smart contracts.',
        prerequisite: 'JavaScript + understanding of cryptography basics',
        roadmap: [
            '1. Blockchain fundamentals — distributed ledger, consensus',
            '2. Ethereum & Solidity smart contracts',
            '3. Web3.js / Ethers.js for DApp frontends',
            '4. DeFi protocols & token standards (ERC-20, ERC-721)',
            '5. Security auditing for smart contracts',
            '6. Layer 2 solutions & cross-chain development'
        ],
        tools: ['Solidity', 'Hardhat', 'Ethers.js', 'MetaMask', 'IPFS', 'OpenZeppelin'],
        projects: [
            '• ERC-20 token deployment',
            '• NFT minting DApp',
            '• Decentralized voting system',
            '• DeFi yield aggregator'
        ],
        salaryRange: '$90K - $175K+',
        timeToLearn: '5-10 months'
    },
    ui_ux: {
        title: 'UI/UX Designer',
        description: 'Design beautiful, user-friendly digital experiences.',
        prerequisite: 'Design curiosity + basic knowledge of any design tool',
        roadmap: [
            '1. Design thinking & UX research methods',
            '2. Wireframing & information architecture',
            '3. Figma / Sketch for high-fidelity mockups',
            '4. Prototyping & interaction design',
            '5. Design systems & component libraries',
            '6. Usability testing & iteration'
        ],
        tools: ['Figma', 'Adobe XD', 'Sketch', 'Miro', 'Maze', 'Framer'],
        projects: [
            'Redesign a popular mobile app UX',
            'Create a design system from scratch',
            'E-commerce checkout flow optimization',
            'Mobile app prototype with micro-animations'
        ],
        salaryRange: '$70K - $140K+',
        timeToLearn: '3-6 months'
    },
    backend: {
        title: 'Backend Engineer',
        description: 'Build robust server-side applications, APIs, and database systems.',
        prerequisite: 'Basic programming in any language + understanding of HTTP',
        roadmap: [
            '1. Master a backend language — Python, Node.js, Go, or Java',
            '2. Learn databases — SQL (PostgreSQL, MySQL) + NoSQL (MongoDB, Redis)',
            '3. Build RESTful APIs & understand GraphQL',
            '4. Authentication & security — JWT, OAuth, HTTPS',
            '5. System design — caching, load balancing, message queues',
            '6. Deploy & scale — Docker, Kubernetes, CI/CD, cloud'
        ],
        tools: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'GraphQL'],
        projects: [
            '• REST API with authentication & rate limiting',
            '• Real-time WebSocket chat server',
            '• Microservices architecture with message queue',
            '• URL shortener with analytics dashboard'
        ],
        salaryRange: '$80K - $160K+',
        timeToLearn: '5-10 months'
    },
    data_engineer: {
        title: 'Data Engineer',
        description: 'Design and build data pipelines, warehouses, and ETL systems.',
        prerequisite: 'SQL proficiency + Python basics + understanding of databases',
        roadmap: [
            '1. Master SQL & relational databases deeply',
            '2. Python for data processing — Pandas, PySpark',
            '3. ETL/ELT pipeline design & orchestration',
            '4. Data warehousing — Snowflake, BigQuery, Redshift',
            '5. Streaming data — Kafka, Apache Flink',
            '6. Cloud data platforms & infrastructure as code'
        ],
        tools: ['Apache Spark', 'Airflow', 'Kafka', 'Snowflake', 'dbt', 'Python', 'SQL'],
        projects: [
            '• End-to-end ETL pipeline with Airflow',
            '• Real-time streaming dashboard with Kafka',
            '• Data lake architecture on AWS/GCP',
            '• Data quality monitoring system'
        ],
        salaryRange: '$90K - $170K+',
        timeToLearn: '6-10 months'
    },
    software_engineer: {
        title: 'Software Engineer (Job Prep)',
        description: 'Prepare for software engineering roles with DSA, system design, and interview skills.',
        prerequisite: 'Proficiency in at least one programming language',
        roadmap: [
            '1. Data Structures — arrays, linked lists, trees, graphs, heaps',
            '2. Algorithms — sorting, searching, dynamic programming, greedy',
            '3. Problem solving — LeetCode (Easy → Medium → Hard)',
            '4. System Design — scalability, distributed systems, databases',
            '5. Object-Oriented Design & design patterns',
            '6. Behavioral interviews & resume optimization'
        ],
        tools: ['LeetCode', 'HackerRank', 'VS Code', 'Git', 'Excalidraw', 'Pramp'],
        projects: [
            '• Build your own HTTP server from scratch',
            '• Implement a key-value store (like Redis)',
            '• Design a URL shortener end-to-end',
            '• Open-source contribution to a real project'
        ],
        salaryRange: '$85K - $180K+',
        timeToLearn: '3-6 months (interview prep focus)'
    },
    embedded_systems: {
        title: 'Embedded Systems Engineer (ECE)',
        description: 'Bridge hardware and software — build firmware for microcontrollers and IoT devices.',
        prerequisite: 'Basic electronics knowledge + C programming fundamentals',
        roadmap: [
            '1. Digital electronics — logic gates, flip-flops, counters',
            '2. C/C++ programming for constrained environments',
            '3. Microcontroller architecture — ARM, AVR, registers, memory mapping',
            '4. Peripheral protocols — I2C, SPI, UART, GPIO',
            '5. RTOS concepts — FreeRTOS, scheduling, interrupts',
            '6. PCB design basics & hardware debugging tools'
        ],
        tools: ['STM32', 'Arduino', 'PlatformIO', 'KiCad', 'Oscilloscope', 'Logic Analyzer'],
        projects: [
            '• Custom weather station with sensors',
            '• Motor controller with PID feedback',
            '• IoT device with MQTT communication',
            '• Custom PCB keyboard firmware'
        ],
        salaryRange: '$75K - $140K+',
        timeToLearn: '8-14 months'
    },
    medical_doctor: {
        title: 'Medical Doctor / Specialist',
        description: 'Navigate the medical education pathway from fundamentals to specialization.',
        prerequisite: 'Strong foundation in biology, chemistry, and dedication to continuous learning',
        roadmap: [
            '1. Pre-med foundations — anatomy, physiology, biochemistry',
            '2. Clinical sciences — pathology, pharmacology, microbiology',
            '3. Clinical rotations & hands-on patient care',
            '4. Board exams & licensing (USMLE/NEET/PLAB)',
            '5. Residency & specialization training',
            '6. Continuous medical education & research'
        ],
        tools: ['Stethoscope', 'EHR Systems', 'Diagnostic Imaging (MRI/CT)', 'PubMed', 'UpToDate'],
        projects: [
            '• Clinical case study presentations',
            '• Research meta-analysis or literature review',
            '• Community health awareness campaign',
            '• Medical volunteer rotation'
        ],
        salaryRange: '$60K - $350K+ (varies by specialty)',
        timeToLearn: '8-15 years (medical education pipeline)'
    },
    internship: {
        title: 'Land an Internship',
        description: 'Strategic preparation to secure your first tech internship or entry-level role.',
        prerequisite: 'Basic programming skills + willingness to learn fast',
        roadmap: [
            '1. Pick a tech stack and build 2-3 solid projects',
            '2. Create a professional GitHub profile & portfolio site',
            '3. Craft a one-page resume highlighting projects & skills',
            '4. Practice DSA on LeetCode (Easy → Medium)',
            '5. Network on LinkedIn & apply strategically (startups + companies)',
            '6. Prepare for behavioral & technical interviews'
        ],
        tools: ['GitHub', 'LinkedIn', 'LeetCode', 'VS Code', 'Notion', 'AngelList'],
        projects: [
            '• Personal portfolio website with deployed projects',
            '• Full-stack CRUD application',
            '• Open-source contribution (even small ones count)',
            '• Hackathon participation project'
        ],
        salaryRange: '$15K - $50K (internship stipend varies)',
        timeToLearn: '2-4 months (focused prep)'
    },
    freelance: {
        title: 'Freelance Developer',
        description: 'Build a sustainable freelance career in tech with clients and recurring income.',
        prerequisite: 'Solid skills in one tech stack + basic business communication',
        roadmap: [
            '1. Pick a niche — web dev, mobile, automation, etc.',
            '2. Build a portfolio with 3-5 strong projects',
            '3. Set up profiles on Upwork, Fiverr, or Toptal',
            '4. Learn pricing, contracts, and client communication',
            '5. Build a personal brand on Twitter/X & LinkedIn',
            '6. Scale with referrals, retainers, and productized services'
        ],
        tools: ['Upwork', 'Fiverr', 'Notion', 'Stripe', 'Calendly', 'GitHub'],
        projects: [
            '• Client-ready portfolio website',
            '• Landing page template business',
            '• Automation tool for a specific niche',
            '• SaaS micro-product'
        ],
        salaryRange: '$30K - $150K+ (depends on niche & clients)',
        timeToLearn: '2-4 months (to land first client)'
    }
};

// ── Intent Classification Engine ──────────────────────────────────────
const INTENT_PATTERNS = [
    {
        intent: 'career_path',
        patterns: [
            /become\s+(an?\s+)?(.+)/i,
            /how\s+to\s+be(come)?\s+(an?\s+)?(.+)/i,
            /want\s+to\s+(be|become)\s+(an?\s+)?(.+)/i,
            /career\s+(in|as|path|for)\s+(.+)/i,
            /interested\s+in\s+(.+)/i,
            /get\s+into\s+(.+)/i,
            /about\s+(.+)/i,
            /tell\s+me\s+about\s+(.+)/i,
            /know\s+about\s+(.+)/i,
            /learn\s+about\s+(.+)/i,
            /explore\s+(.+)/i,
            /what\s+is\s+(.+)/i,
            /^(cybersecurity|cyber\s*security|ai|machine\s+learning|web\s+dev|data\s+scien|cloud|devops|blockchain|game\s+dev|mobile\s+dev|ui.?ux)/i
        ],
        handler: 'handleCareerPath'
    },
    {
        intent: 'roadmap',
        patterns: [/roadmap/i, /learning\s+path/i, /step.by.step/i, /where\s+to\s+start/i, /how\s+to\s+start/i, /what\s+to\s+learn/i, /guide\s+(me|for)/i, /learn\s+next/i, /what\s+should\s+i\s+learn/i, /next\s+step/i],
        handler: 'handleRoadmap'
    },
    {
        intent: 'skills',
        patterns: [/skills?\s+(needed|required|for|to)/i, /what\s+skills/i, /do\s+i\s+need/i, /prerequisites?/i, /requirements?\s+for/i],
        handler: 'handleSkills'
    },
    {
        intent: 'tools',
        patterns: [/tools?\s+(for|to|needed|used)/i, /what\s+tools/i, /tech\s*stack/i, /technologies?\s+(for|to|used)/i, /frameworks?\s+for/i, /software\s+(for|to)/i],
        handler: 'handleTools'
    },
    {
        intent: 'projects',
        patterns: [/project\s+(ideas?|for|to)/i, /what\s+projects?/i, /build\s+(something|a|an)/i, /portfolio/i, /hands?.?on/i, /practice/i, /what\s+to\s+build/i, /project\s+suggestion/i],
        handler: 'handleProjects'
    },
    {
        intent: 'salary',
        patterns: [/salary/i, /pay/i, /earn(ings?)?/i, /income/i, /how\s+much\s+(do|can|does)/i, /compensation/i, /money/i],
        handler: 'handleSalary'
    },
    {
        intent: 'time',
        patterns: [/how\s+long/i, /time\s+(to|it\s+take)/i, /duration/i, /months?\s+to/i, /years?\s+to/i, /quickly/i, /fast/i],
        handler: 'handleTime'
    },
    {
        intent: 'motivation',
        patterns: [/motivat/i, /overwhelm/i, /stuck/i, /give\s+up/i, /too\s+(hard|difficult|much)/i, /can'?t\s+do/i, /impossible/i, /discourage/i, /lost/i, /confused/i, /tired/i, /burnout/i, /impostor/i, /syndrome/i],
        handler: 'handleMotivation'
    },
    {
        intent: 'comparison',
        patterns: [/vs\.?|versus|or\s+|better|compare|difference\s+between/i, /which\s+(is|one|should)/i, /choose\s+between/i],
        handler: 'handleComparison'
    },
    {
        intent: 'python',
        patterns: [/python/i],
        handler: 'handlePython'
    },
    {
        intent: 'react',
        patterns: [/react/i, /reactjs/i, /react\.js/i],
        handler: 'handleReact'
    },
    {
        intent: 'javascript',
        patterns: [/javascript/i, /\bjs\b/i],
        handler: 'handleJavaScript'
    },
    {
        intent: 'website_help',
        patterns: [/how\s+(does|do)\s+(this|the)\s+(website|site|app|platform)/i, /what\s+(is|does)\s+(zaara|this)/i, /features?/i, /help\s+me\s+navigate/i, /how\s+to\s+use/i, /what\s+can\s+(you|zaara)/i, /explain\s+(zaara|this|the\s+site)/i],
        handler: 'handleWebsiteHelp'
    },
    {
        intent: 'greeting',
        patterns: [/^(hi|hello|hey|yo|sup|greetings|howdy|good\s+(morning|afternoon|evening))/i, /^what'?s?\s+up/i],
        handler: 'handleGreeting'
    },
    {
        intent: 'thanks',
        patterns: [/thank/i, /thanks/i, /thx/i, /appreciate/i, /helpful/i, /great/i, /awesome/i, /perfect/i, /amazing/i],
        handler: 'handleThanks'
    },
    {
        intent: 'internship',
        patterns: [/internship/i, /intern\b/i, /first\s+job/i, /entry.level/i, /no\s+experience/i, /fresher/i, /new\s+grad/i, /campus/i, /placement/i],
        handler: 'handleInternship'
    },
    {
        intent: 'freelance',
        patterns: [/freelanc/i, /remote\s+work/i, /work\s+from\s+home/i, /gig/i, /upwork/i, /fiverr/i, /client/i, /self.employ/i],
        handler: 'handleFreelance'
    },
    {
        intent: 'certification',
        patterns: [/certif/i, /certificate/i, /credential/i, /accredit/i, /exam/i],
        handler: 'handleCertification'
    }
];

// ── Response Handlers ─────────────────────────────────────────────────
const HANDLERS = {
    handleCareerPath(msg) {
        const career = detectCareer(msg);
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            userContext.careerGoal = career;
            userContext.askedAbout.push(career);
            return `Got it — you're exploring **${kb.title}** 🎯\n\n` +
                `📌 ${kb.description}\n\n` +
                `**Here's how you can start:**\n${kb.roadmap.slice(0, 4).map(s => '• ' + s.replace(/^\d+\.\s*/, '')).join('\n')}\n\n` +
                `🛠️ **Key Tools:** ${kb.tools.slice(0, 5).join(', ')}\n\n` +
                `🔑 **Prerequisite:** ${kb.prerequisite}\n\n` +
                `Do you want a **full roadmap**, **project ideas**, or **salary info**?`;
        }
        return `I'd love to help you explore a career path! 🚀\n\n` +
            `Which of these interests you most?\n` +
            `• 🤖 AI / ML Engineer\n• 🌐 Web Developer\n• 📊 Data Scientist\n• 🔒 Cybersecurity\n• ☁️ Cloud Engineer\n• 📱 Mobile Developer\n• ⚙️ DevOps\n• 🎮 Game Dev\n• ⛓️ Blockchain\n• 🎨 UI/UX Design\n\n` +
            `Just tell me which path excites you!`;
    },

    handleRoadmap(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            return `📍 **${kb.title} — Step-by-Step Roadmap:**\n\n${kb.roadmap.join('\n')}\n\n` +
                `⏱️ **Estimated Time:** ${kb.timeToLearn}\n\n` +
                `💡 Pro tip: Use ZAARA's roadmap generator above to get a **day-by-day personalized plan** with curated resources!`;
        }
        return `I can build you a detailed roadmap! First, tell me:\n\n` +
            `1️⃣ What career goal are you targeting?\n` +
            `2️⃣ What's your current skill level (beginner/intermediate)?\n\n` +
            `Or use the **roadmap generator** above — select your career goal and hit "Initialize Sequence" for a full day-by-day plan! 🎯`;
    },

    handleSkills(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            return `🧠 **Core Skills for ${kb.title}:**\n\n${kb.roadmap.map(r => `• ${r.split('—')[0].replace(/^\d+\.\s*/, '').trim()}`).join('\n')}\n\n` +
                `🔑 **Prerequisites:** ${kb.prerequisite}\n\n` +
                `Want me to suggest **specific projects** to build these skills?`;
        }
        return `To suggest the right skills, I need to know your career goal!\n\n` +
            `For example, try asking:\n• "What skills do I need for AI?"\n• "Skills required for web development"`;
    },

    handleTools(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            return `🛠️ **Recommended Tech Stack for ${kb.title}:**\n\n${kb.tools.map(t => `• ${t}`).join('\n')}\n\n` +
                `💡 Start with the first 2-3 tools and expand as you progress. Mastery > breadth!`;
        }
        return `Which career are you building your toolkit for? Let me know your path and I'll suggest the perfect tech stack! 🔧`;
    },

    handleProjects(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            return `🚀 **Project Ideas for ${kb.title}:**\n\n${kb.projects.join('\n')}\n\n` +
                `🎯 **Pro Tips:**\n• Push all projects to GitHub\n• Write a solid README for each\n• Deploy live demos when possible\n• Document your learning journey\n\nThese will make your **portfolio stand out** to recruiters!`;
        }
        return `Building projects is the #1 way to learn! 💪\n\n` +
            `Tell me your career goal and I'll suggest specific projects that'll impress recruiters.\n\n` +
            `For example: "project ideas for web development"`;
    },

    handleSalary(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            return `💰 **${kb.title} — Salary Range:**\n\n${kb.salaryRange}\n\n` +
                `📈 **Salary boosters:**\n• Strong portfolio & GitHub presence\n• Certifications & specialized skills\n• Open source contributions\n• Negotiation skills matter — always negotiate!\n\n` +
                `Remember: Your first role sets the trajectory. Focus on skill-building first, and the compensation will follow.`;
        }
        return `Salaries vary by role, experience, and location. Tell me which career you're curious about and I'll give you a range! 💰`;
    },

    handleTime(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        if (career && CAREER_KB[career]) {
            const kb = CAREER_KB[career];
            return `⏱️ **Time to Job-Ready for ${kb.title}:**\n\n${kb.timeToLearn}\n\n` +
                `📋 **This depends on:**\n• Your starting skill level\n• Hours dedicated per week\n• Quality of practice (projects > tutorials)\n• Consistency — daily practice beats weekend marathons\n\n` +
                `Use ZAARA's time commitment selector in the generator to get a plan tailored to YOUR schedule!`;
        }
        return `The timeline depends on the career path and your dedication!\n\n` +
            `As a rough guide:\n• **Beginner → Job-ready:** 4-12 months\n• **Part-time study:** Add 50-100% more time\n• **Full-time grind:** 3-6 months is realistic\n\nWhich career are you targeting? I'll give you a specific estimate.`;
    },

    handleMotivation(msg) {
        const motivationalResponses = [
            `I hear you, and what you're feeling is completely normal. 💛\n\n` +
            `Every expert was once a beginner. Here's what helps:\n\n` +
            `• **Break it down** — Don't look at the mountain, just take the next step\n` +
            `• **Celebrate small wins** — Finished a tutorial? That counts!\n` +
            `• **Compare to yesterday-you** — not to others online\n` +
            `• **Consistency > intensity** — 30 min/day beats 8-hour weekends\n` +
            `• **Build something fun** — Learning sticks when you enjoy it\n\n` +
            `You're already ahead of 90% of people because you started. Keep going! 🚀`,

            `Burnout and doubt hit everyone — it means you're pushing yourself, which is good! 🔥\n\n` +
            `**Quick recharge strategy:**\n` +
            `• Take a 24-hour break (seriously, step away)\n` +
            `• Then start ONE small task — just 15 minutes\n` +
            `• Reconnect with why you started this journey\n` +
            `• Join a community (Discord, Reddit, Twitter/X)\n\n` +
            `Remember: The roadmap is a guide, not a prison. Go at YOUR pace. You've got this! 💪`,

            `Impostor syndrome? That's actually a sign you're growing! Here's a secret: even senior engineers Google basic stuff daily. 🤫\n\n` +
            `**What really matters:**\n` +
            `• You're showing up and learning — that's rare\n` +
            `• Confusion is temporary, growth is permanent\n` +
            `• Every "stuck" moment teaches resilience\n` +
            `• Your unique background is your superpower\n\n` +
            `I believe in you. Now let's get back to building! 🚀`
        ];
        return motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
    },

    handleComparison(msg) {
        const msgLower = msg.toLowerCase();
        if (msgLower.includes('python') && msgLower.includes('javascript')) {
            return `**Python vs JavaScript — Quick Comparison:**\n\n` +
                `🐍 **Python:** Best for AI/ML, Data Science, automation, backend\n` +
                `⚡ **JavaScript:** Best for web dev (frontend + backend), mobile apps\n\n` +
                `**Choose Python if:** You want AI/ML, data, or scripting\n` +
                `**Choose JS if:** You love building websites and web apps\n\n` +
                `💡 Both are incredible languages. You can't go wrong! Start with whichever excites you more — motivation > "best language."`;
        }
        if (msgLower.includes('react') && (msgLower.includes('vue') || msgLower.includes('angular'))) {
            return `**React vs Vue vs Angular:**\n\n` +
                `⚛️ **React:** Most popular, huge ecosystem, JSX-based (by Meta)\n` +
                `💚 **Vue:** Easiest to learn, elegant, great docs (by Evan You)\n` +
                `🔴 **Angular:** Enterprise-grade, TypeScript-first (by Google)\n\n` +
                `**Recommendation:** Start with **React** for job market demand, or **Vue** if you want the gentlest learning curve.\n\n` +
                `All three will land you a job — pick one and master it! 🎯`;
        }
        return `I'd love to help you compare! Tell me specifically which two things you're comparing.\n\n` +
            `For example:\n• "Python vs JavaScript"\n• "React vs Vue"\n• "Web Dev vs Data Science"\n• "AWS vs Azure"`;
    },

    handlePython(msg) {
        return `🐍 **Python — The Swiss Army Knife of Programming:**\n\n` +
            `**Best for:** AI/ML, Data Science, Web Backend, Automation, Scripting\n\n` +
            `**Learning Path:**\n` +
            `1. Basics — variables, loops, functions, OOP\n` +
            `2. Libraries — NumPy, Pandas, Matplotlib\n` +
            `3. Frameworks — Django/Flask (web) or PyTorch (AI)\n` +
            `4. Projects — build real things!\n\n` +
            `**Free Resources:**\n` +
            `• python.org official tutorial\n` +
            `• Automate the Boring Stuff (free book)\n` +
            `• FreeCodeCamp Python course\n\n` +
            `Python is used by Google, Netflix, NASA, and countless AI startups. Excellent choice! 🚀`;
    },

    handleReact(msg) {
        return `⚛️ **React — #1 Frontend Framework:**\n\n` +
            `**Used by:** Meta, Netflix, Airbnb, Discord, and many more\n\n` +
            `**Learning Path:**\n` +
            `1. Master JS fundamentals first (ES6+)\n` +
            `2. Components, Props, State\n` +
            `3. Hooks — useState, useEffect, useContext\n` +
            `4. Routing with React Router\n` +
            `5. State management (Zustand or Redux)\n` +
            `6. Next.js for production apps\n\n` +
            `**Free Resources:**\n` +
            `• react.dev (official docs — best in class!)\n` +
            `• FreeCodeCamp React course\n\n` +
            `Start building small components from Day 1! 💡`;
    },

    handleJavaScript(msg) {
        return `⚡ **JavaScript — The Language of the Web:**\n\n` +
            `**Where it runs:** Browsers, servers (Node.js), mobile (React Native), desktop (Electron)\n\n` +
            `**Learning Path:**\n` +
            `1. Variables, data types, functions\n` +
            `2. DOM manipulation & events\n` +
            `3. ES6+ — arrow functions, destructuring, modules\n` +
            `4. Async programming — Promises, async/await\n` +
            `5. Pick a framework — React, Vue, or Svelte\n\n` +
            `**Free Resources:**\n` +
            `• javascript.info (amazing free tutorial)\n` +
            `• FreeCodeCamp JS curriculum\n` +
            `• The Odin Project\n\n` +
            `JS is the only language that runs natively in every browser — a superpower! 🌐`;
    },

    handleWebsiteHelp(msg) {
        return `🗺️ **How ZAARA Works — Your AI Career Architect:**\n\n` +
            `**Step 1:** Select your **skill level** (Beginner or Intermediate)\n` +
            `**Step 2:** Choose your **career goal** from 17+ career paths\n` +
            `**Step 3:** Set your **time commitment** and duration (30/60 days)\n` +
            `**Step 4:** Hit **"Initialize Sequence"** to generate your matrix!\n\n` +
            `**What you get:**\n` +
            `• 🧠 Career Identity profile\n` +
            `• 🔧 Recommended tech stack\n` +
            `• 🚀 Project ideas\n` +
            `• 📅 Day-by-day timeline with curated resources\n` +
            `• 📄 Export your roadmap as a **PDF**\n\n` +
            `**Pro Features:**\n` +
            `• Your roadmap is auto-saved to local storage\n` +
            `• Load previous roadmaps anytime\n` +
            `• Chat with me anytime for guidance! 💬\n\n` +
            `Try generating a roadmap now — you'll be amazed! ✨`;
    },

    handleGreeting(msg) {
        const greetings = [
            `Hey there! 👋 I'm your AI Career Mentor, ZAARA.\n\nI can help you with:\n• 🗺️ Career roadmaps\n• 🧠 Skill recommendations\n• 🔧 Tool suggestions\n• 💡 Project ideas\n• 🚀 Motivation & guidance\n\nWhat are you working on?`,
            `Hello! 🌟 Welcome to ZAARA — your neural career architect.\n\nTell me: What's your career dream? I'll help you build a path to get there!\n\nYou can ask me anything about tech careers, skills, or learning strategies.`,
            `Hi! 🚀 Great to have you here.\n\nI'm ZAARA — think of me as your personal AI career advisor. I know about 15+ career paths, hundreds of tools, and can build you a custom plan.\n\nWhat's on your mind?`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    },

    handleThanks(msg) {
        const replies = [
            `You're welcome! 🙌 That's what I'm here for.\n\nKeep pushing forward — you're building something amazing. Come back anytime you need guidance!`,
            `Happy to help! ✨ Remember, consistency beats intensity. Keep showing up daily and you'll surprise yourself.\n\nAnything else on your mind?`,
            `Glad I could help! 🚀 Your dedication to learning is what will set you apart. Don't stop now!\n\nFeel free to ask anything else whenever you need.`
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    },

    handleInternship(msg) {
        return `🎓 **Landing Your First Internship — Action Plan:**\n\n` +
            `**1. Build a Portfolio (Week 1-4):**\n• 2-3 solid projects on GitHub\n• Clean README files, deployed demos\n• Personal portfolio website\n\n` +
            `**2. Sharpen Your Resume (Week 2):**\n• One page, clean format\n• Lead with projects, not just coursework\n• Quantify impact where possible\n\n` +
            `**3. Apply Strategically (Week 3+):**\n• LinkedIn, AngelList, company career pages\n• Target startups — they hire more beginners\n• Apply to 5-10 roles per week minimum\n\n` +
            `**4. Prep for Interviews:**\n• Practice DSA on LeetCode (Easy → Medium)\n• Mock interviews with peers\n• Know your projects inside-out\n\n` +
            `💡 **Secret weapon:** Cold DM hiring managers on LinkedIn with a personalized message + link to your project. Works better than most applications!`;
    },

    handleFreelance(msg) {
        return `💸 **Freelancing as a Developer — Getting Started:**\n\n` +
            `**Step 1: Pick Your Niche**\n• Web development is the easiest entry point\n• Specialize — "React developer" > "I do everything"\n\n` +
            `**Step 2: Build Proof of Work**\n• 3-5 portfolio projects\n• Client testimonials (even from free projects)\n• Active GitHub profile\n\n` +
            `**Step 3: Find Clients**\n• Start on Upwork, Fiverr, or Toptal\n• Network on Twitter/X and LinkedIn\n• Join freelancer communities\n\n` +
            `**Step 4: Price Yourself Right**\n• Research market rates for your skill\n• Start slightly below market, raise after 5 clients\n• Always charge per project, not per hour\n\n` +
            `💡 The first client is the hardest. After that, referrals do the work for you! 🚀`;
    },

    handleCertification(msg) {
        const career = detectCareer(msg) || userContext.careerGoal || getActiveCareer();
        const certMap = {
            cloud_engineer: '• AWS Solutions Architect Associate\n• Azure AZ-104\n• Google Cloud Associate Engineer',
            cybersecurity: '• CompTIA Security+ (best starter)\n• CEH (Certified Ethical Hacker)\n• OSCP (advanced, highly respected)',
            devops: '• AWS DevOps Professional\n• CKA (Certified Kubernetes Admin)\n• HashiCorp Terraform Associate',
            data_scientist: '• Google Data Analytics Professional\n• IBM Data Science Professional\n• AWS Machine Learning Specialty',
            ai_engineer: '• Google TensorFlow Developer\n• AWS Machine Learning Specialty\n• DeepLearning.AI Specializations'
        };
        if (career && certMap[career]) {
            return `🏆 **Top Certifications for ${CAREER_KB[career]?.title || career}:**\n\n${certMap[career]}\n\n` +
                `💡 **Tips:**\n• Certifications supplement skills, they don't replace them\n• Real projects + certs = unstoppable combo\n• Free prep resources exist for most certs online`;
        }
        return `🏆 **Popular & Valuable Certifications:**\n\n` +
            `☁️ **Cloud:** AWS Solutions Architect, Azure AZ-104\n` +
            `🔒 **Security:** CompTIA Security+, CEH\n` +
            `📊 **Data:** Google Data Analytics\n` +
            `🤖 **AI:** TensorFlow Developer, DeepLearning.AI\n\n` +
            `Tell me your career goal and I'll recommend the most impactful ones! 🎯`;
    }
};

// ── Career Detection from Natural Language ────────────────────────────
function detectCareer(msg) {
    const m = msg.toLowerCase();
    const map = [
        { keys: ['artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'llm', 'nlp'], regex: [/\bai\b/, /\bml\b/], career: 'ai_engineer' },
        { keys: ['web dev', 'web develop', 'full stack', 'fullstack', 'frontend', 'front end', 'back end', 'web application'], regex: [/\bwebsite\b/], career: 'web_dev' },
        { keys: ['data scien', 'data analy', 'analytics', 'exploratory data', 'statistics'], regex: [/\beda\b/], career: 'data_scientist' },
        { keys: ['cybersecurity', 'cyber security', 'ethical hack', 'pen test', 'infosec', 'penetration test'], regex: [/\bhacking\b/], career: 'cybersecurity' },
        { keys: ['cloud engineer', 'cloud computing', 'google cloud'], regex: [/\baws\b/, /\bazure\b/, /\bgcp\b/], career: 'cloud_engineer' },
        { keys: ['mobile dev', 'mobile app', 'app develop', 'react native'], regex: [/\bandroid\b/, /\bios\b/, /\bflutter\b/], career: 'mobile_dev' },
        { keys: ['devops', 'dev ops', 'ci/cd', 'ci cd', 'continuous integration'], regex: [/\binfrastructure\b/], career: 'devops' },
        { keys: ['game dev', 'game develop', 'game design', 'unreal engine'], regex: [/\bunity\b/, /\bgodot\b/, /\bgaming\b/], career: 'game_dev' },
        { keys: ['blockchain', 'web3', 'solidity', 'smart contract', 'defi', 'decentralized'], regex: [/\bnft\b/, /\bcrypto\b/], career: 'blockchain' },
        { keys: ['ui/ux', 'ui ux', 'user interface', 'user experience', 'ux design', 'ui design'], regex: [/\bfigma\b/], career: 'ui_ux' },
        { keys: ['backend engineer', 'backend dev', 'server side', 'server-side', 'api develop'], regex: [/\bbackend\b/, /\brest\s*api\b/], career: 'backend' },
        { keys: ['data engineer', 'data pipeline', 'data warehouse', 'etl', 'data lake'], regex: [/\bairflow\b/, /\bspark\b/, /\bsnowflake\b/], career: 'data_engineer' },
        { keys: ['software engineer', 'swe prep', 'job prep', 'interview prep', 'dsa', 'data structure', 'leetcode', 'algorithm'], regex: [/\bswe\b/], career: 'software_engineer' },
        { keys: ['embedded system', 'embedded dev', 'firmware', 'microcontroller', 'iot', 'hardware program'], regex: [/\bece\b/, /\bstm32\b/, /\barduino\b/, /\brtos\b/], career: 'embedded_systems' },
        { keys: ['medical doctor', 'doctor', 'medicine', 'medical', 'mbbs', 'usmle', 'neet', 'clinical', 'surgeon'], regex: [/\bmd\b/], career: 'medical_doctor' },
        { keys: ['internship', 'intern', 'first job', 'entry level', 'entry-level', 'fresher', 'new grad', 'campus', 'placement'], regex: [], career: 'internship' },
        { keys: ['freelanc', 'remote work', 'work from home', 'gig', 'upwork', 'fiverr', 'self employ', 'client work'], regex: [], career: 'freelance' },
    ];
    for (const entry of map) {
        // Check full string keys first
        for (const key of entry.keys) {
            if (m.includes(key)) return entry.career;
        }
        // Then check regex patterns for short/ambiguous keywords
        if (entry.regex) {
            for (const rx of entry.regex) {
                if (rx.test(m)) return entry.career;
            }
        }
    }
    return null;
}

// ── Get Active Career from Generated Roadmap ──────────────────────────
function getActiveCareer() {
    const goalEl = document.getElementById('career-goal');
    if (goalEl && goalEl.value) return goalEl.value;
    // Check if a roadmap is currently displayed
    const saved = localStorage.getItem('zaara_last_roadmap');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.title) {
                // Try to detect career from title
                return detectCareer(data.title);
            }
        } catch(e) {}
    }
    return null;
}

// ── Main Intent Router ────────────────────────────────────────────────
function classifyAndRespond(message) {
    const msg = message.trim();
    
    // Try each intent pattern
    for (const intent of INTENT_PATTERNS) {
        for (const pattern of intent.patterns) {
            if (pattern.test(msg)) {
                const handler = HANDLERS[intent.handler];
                if (handler) {
                    chatHistory.push({ role: 'user', msg });
                    return handler(msg);
                }
            }
        }
    }
    
    // Safety net: if no intent matched but a career keyword is detected,
    // route to handleCareerPath instead of generic fallback
    const detectedCareer = detectCareer(msg);
    if (detectedCareer && CAREER_KB[detectedCareer]) {
        chatHistory.push({ role: 'user', msg });
        return HANDLERS.handleCareerPath(msg);
    }
    
    // Fallback — smart default based on context
    return getFallbackResponse(msg);
}

function getFallbackResponse(msg) {
    const activeCareer = getActiveCareer();
    if (activeCareer && CAREER_KB[activeCareer]) {
        return `I see you're exploring **${CAREER_KB[activeCareer].title}** — great choice! 🎯\n\n` +
            `Here's what I can help with:\n` +
            `• "Show me a roadmap"\n` +
            `• "What skills do I need?"\n` +
            `• "Suggest project ideas"\n` +
            `• "What tools should I learn?"\n` +
            `• "How long will it take?"\n\n` +
            `Just ask! I'm your AI career architect. 🚀`;
    }
    return `I'm here to help you navigate your career journey! 🧭\n\n` +
        `Try asking me:\n` +
        `• "I want to become an AI engineer"\n` +
        `• "What should I learn for web dev?"\n` +
        `• "Give me project ideas"\n` +
        `• "How does this website work?"\n` +
        `• "I'm feeling stuck" (I give great pep talks! 💪)\n\n` +
        `What would you like to explore?`;
}

// ── Toggle Chatbot ────────────────────────────────────────────────────
function toggleChatbot() {
    chatOpen = !chatOpen;
    const cw = document.getElementById('chatbot-window');
    const toggleIcon = document.querySelector('#chatbot-toggle-btn i');
    if (chatOpen) {
        cw.classList.add('open');
        toggleIcon.className = 'fa-solid fa-xmark';
        // Focus the input field
        setTimeout(() => document.getElementById('chatbot-input').focus(), 350);
    } else {
        cw.classList.remove('open');
        toggleIcon.className = 'fa-solid fa-message';
    }
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatbotMessage();
}

// ── Send Message — Routes to AI or Offline Engine ─────────────────────
function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;

    addChatMessage('user', text);
    input.value = '';
    input.focus();

    if (AI_ENABLED && AI_HAS_KEY) {
        sendAIMessage(text);
    } else {
        // Offline fallback engine
        const typingId = showTypingIndicator();
        const delay = 400 + Math.random() * 600;
        setTimeout(() => {
            removeTypingIndicator(typingId);
            const response = classifyAndRespond(text);
            addChatMessage('bot', response);
            showQuickActions(text);
        }, delay);
    }
}

// ── Typing Indicator ──────────────────────────────────────────────────
function showTypingIndicator() {
    const messages = document.getElementById('chatbot-messages');
    const indicator = document.createElement('div');
    const id = 'typing-' + Date.now();
    indicator.id = id;
    indicator.className = 'chat-msg bot typing-indicator';
    indicator.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    messages.appendChild(indicator);
    messages.scrollTop = messages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ── Quick Action Chips ────────────────────────────────────────────────
function showQuickActions(lastMsg) {
    const messages = document.getElementById('chatbot-messages');
    
    // Remove any existing chips
    const existing = messages.querySelector('.quick-actions');
    if (existing) existing.remove();
    
    const career = detectCareer(lastMsg) || userContext.careerGoal || getActiveCareer();
    
    let chips = [];
    if (career) {
        chips = [
            { label: '📍 Full Roadmap', msg: `Show me the full roadmap for ${career}` },
            { label: '🛠️ Tools', msg: `What tools do I need for ${career}?` },
            { label: '🚀 Projects', msg: `Project ideas for ${career}` },
            { label: '💰 Salary', msg: `What's the salary for ${career}?` }
        ];
    } else {
        chips = [
            { label: '🤖 AI Career', msg: 'I want to become an AI engineer' },
            { label: '🌐 Web Dev', msg: 'How to become a web developer?' },
            { label: '📊 Data Science', msg: 'Tell me about data science' },
            { label: '🗺️ How ZAARA works', msg: 'How does this website help me?' }
        ];
    }
    
    const container = document.createElement('div');
    container.className = 'quick-actions';
    chips.forEach(chip => {
        const btn = document.createElement('button');
        btn.className = 'quick-chip';
        btn.textContent = chip.label;
        btn.onclick = () => {
            container.remove();
            document.getElementById('chatbot-input').value = chip.msg;
            sendChatbotMessage();
        };
        container.appendChild(btn);
    });
    
    messages.appendChild(container);
    messages.scrollTop = messages.scrollHeight;
}

// ── Render Chat Messages with Markdown-like Formatting ────────────────
function addChatMessage(sender, text) {
    const messages = document.getElementById('chatbot-messages');
    
    // Remove quick actions on new message
    const existingChips = messages.querySelector('.quick-actions');
    if (existingChips) existingChips.remove();
    
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    
    if (sender === 'bot') {
        // Render simple markdown formatting
        div.innerHTML = renderChatMarkdown(text);
    } else {
        div.innerText = text;
    }
    
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// ── Simple Markdown Renderer for Chat ─────────────────────────────────
function renderChatMarkdown(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// ═══════════════════════════════════════════════════════════════════════
// AI CHAT ENGINE — OpenAI Streaming Integration
// ═══════════════════════════════════════════════════════════════════════

// ── Check AI Availability on Load ─────────────────────────────────────
async function checkAIStatus() {
    try {
        const res = await fetch('/api/chat/status');
        if (!res.ok) throw new Error('API not available');
        const data = await res.json();
        AI_ENABLED = data.available;

        // Check if server has key or if user has one in localStorage
        const localKey = localStorage.getItem('zaara_openai_key') || '';
        AI_HAS_KEY = data.has_server_key || !!localKey;

        updateAIStatusUI();
    } catch (e) {
        AI_ENABLED = false;
        AI_HAS_KEY = false;
        updateAIStatusUI();
    }
}

function updateAIStatusUI() {
    const indicator = document.getElementById('ai-status-indicator');
    if (!indicator) return;

    if (AI_ENABLED && AI_HAS_KEY) {
        indicator.innerHTML = '<span class="ai-status-dot connected"></span><span class="ai-status-label">GPT-4o Connected</span>';
        indicator.title = 'AI-powered responses active';
    } else if (AI_ENABLED && !AI_HAS_KEY) {
        indicator.innerHTML = '<span class="ai-status-dot needs-key"></span><span class="ai-status-label">API Key Needed</span>';
        indicator.title = 'Click the settings icon to add your OpenAI API key';
    } else {
        indicator.innerHTML = '<span class="ai-status-dot offline"></span><span class="ai-status-label">Offline Mode</span>';
        indicator.title = 'Using built-in career knowledge base';
    }
}

// ── Send Message via OpenAI Streaming API ─────────────────────────────
async function sendAIMessage(text) {
    // Add user message to conversation history
    conversationMessages.push({ role: 'user', content: text });

    // Trim history to prevent token overflow
    if (conversationMessages.length > MAX_HISTORY_MESSAGES) {
        conversationMessages = conversationMessages.slice(-MAX_HISTORY_MESSAGES);
    }

    // Gather platform context for richer AI responses
    const context = {
        skillLevel: document.getElementById('skill-level')?.value || 'unknown',
        careerGoal: document.getElementById('career-goal')?.value || '',
        activeRoadmap: localStorage.getItem('zaara_last_roadmap') ? 'yes' : 'no'
    };

    const typingId = showTypingIndicator();

    try {
        const apiKey = localStorage.getItem('zaara_openai_key') || '';

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: conversationMessages,
                context: context,
                model: AI_MODEL,
                api_key: apiKey
            })
        });

        removeTypingIndicator(typingId);

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || `Server error ${response.status}`);
        }

        // Create streaming bot message element
        const messages = document.getElementById('chatbot-messages');
        const existingChips = messages.querySelector('.quick-actions');
        if (existingChips) existingChips.remove();

        const div = document.createElement('div');
        div.className = 'chat-msg bot streaming';
        messages.appendChild(div);

        let fullResponse = '';

        // Read SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Keep incomplete line in buffer

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                try {
                    const data = JSON.parse(line.slice(6));
                    if (data.content) {
                        fullResponse += data.content;
                        div.innerHTML = renderChatMarkdown(fullResponse);
                        messages.scrollTop = messages.scrollHeight;
                    }
                    if (data.error) {
                        throw new Error(data.error);
                    }
                } catch (parseErr) {
                    if (parseErr.message && !parseErr.message.includes('JSON')) {
                        throw parseErr; // Re-throw actual API errors
                    }
                }
            }
        }

        // Finalize
        div.classList.remove('streaming');

        // Save assistant response to history
        if (fullResponse) {
            conversationMessages.push({ role: 'assistant', content: fullResponse });
        }

        // Show contextual quick actions
        showQuickActions(text);

    } catch (e) {
        removeTypingIndicator(typingId);
        console.error('[ZAARA AI] Chat error:', e.message);

        // Remove the failed user message from history
        conversationMessages.pop();

        // Fallback to offline engine
        const offlineResponse = classifyAndRespond(text);
        addChatMessage('bot', offlineResponse + '\n\n---\n*⚡ Using offline knowledge base — AI temporarily unavailable*');
        showQuickActions(text);
    }
}

// ── API Key Settings Panel ────────────────────────────────────────────
function toggleAISettings() {
    const panel = document.getElementById('ai-settings-panel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        const input = document.getElementById('ai-key-input');
        const stored = localStorage.getItem('zaara_openai_key') || '';
        if (stored) {
            input.value = stored.slice(0, 7) + '...' + stored.slice(-4);
            input.dataset.masked = 'true';
        }
    } else {
        panel.classList.add('hidden');
    }
}

function saveAIKey() {
    const input = document.getElementById('ai-key-input');
    let key = input.value.trim();

    // Don't save the masked version
    if (input.dataset.masked === 'true' && key.includes('...')) {
        toggleAISettings();
        return;
    }

    if (!key.startsWith('sk-')) {
        showToast('Invalid key format. OpenAI keys start with sk-', 'error');
        return;
    }

    localStorage.setItem('zaara_openai_key', key);
    AI_HAS_KEY = true;
    updateAIStatusUI();
    toggleAISettings();
    showToast('✅ API Key saved! AI mode activated.', 'success');
}

function clearAIKey() {
    localStorage.removeItem('zaara_openai_key');
    document.getElementById('ai-key-input').value = '';
    document.getElementById('ai-key-input').dataset.masked = 'false';
    AI_HAS_KEY = false;
    checkAIStatus(); // Re-check (server key might still exist)
    showToast('API Key removed.', 'info');
}

// ── Clear Conversation History ────────────────────────────────────────
function clearChatHistory() {
    conversationMessages = [];
    const messages = document.getElementById('chatbot-messages');
    messages.innerHTML = `<div class="chat-msg bot">Hey! 👋 I'm <strong>ZAARA</strong>, your AI Career Mentor.<br><br>I can help with:<br>• 🗺️ Career roadmaps<br>• 🧠 Skills & tools<br>• 🚀 Project ideas<br>• 💪 Motivation<br><br>What's your career goal?</div>`;
    showToast('Chat history cleared.', 'info');
}

// ── Initialize AI on Page Load ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    checkAIStatus();
});

// ═══════════════════════════════════════════════════════════════════════
// FEATURE: Progress Tracker
// ═══════════════════════════════════════════════════════════════════════

function toggleCardCompletion(day, el) {
    const state = JSON.parse(localStorage.getItem('zaara_progress') || '{}');
    const card = el.closest('.timeline-card');
    
    if (state[`day_${day}`]) {
        delete state[`day_${day}`];
        card.classList.remove('completed');
    } else {
        state[`day_${day}`] = true;
        card.classList.add('completed');
        // Play subtle completion sound
        if (typeof playSelect === 'function') playSelect();
    }
    
    localStorage.setItem('zaara_progress', JSON.stringify(state));
    updateProgressBar();
    logActivity(`Toggled Step ${day}`);
}

function updateProgressBar() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    
    const cards = timeline.querySelectorAll('.timeline-card');
    const completed = timeline.querySelectorAll('.timeline-card.completed');
    const total = cards.length;
    
    if (total === 0) return;
    
    const pct = Math.round((completed.length / total) * 100);
    
    const fill = document.getElementById('progress-bar-fill');
    const label = document.getElementById('progress-percent');
    const desc = document.getElementById('progress-label');
    
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
    if (desc) {
        if (pct === 100) desc.textContent = '🎉 All steps complete! You are unstoppable!';
        else if (pct >= 75) desc.textContent = `🔥 ${completed.length}/${total} — Almost there! Keep going!`;
        else if (pct >= 50) desc.textContent = `⚡ ${completed.length}/${total} — Halfway warrior!`;
        else if (pct > 0) desc.textContent = `📈 ${completed.length}/${total} — Great start! Keep pushing!`;
        else desc.textContent = 'Click timeline cards to mark them complete';
    }
    
    // Save completion rate for stats
    localStorage.setItem('zaara_completion_rate', pct);
}

// ═══════════════════════════════════════════════════════════════════════
// FEATURE: Search & Filter Timeline
// ═══════════════════════════════════════════════════════════════════════

function filterTimeline(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll('#timeline .timeline-card');
    
    cards.forEach(card => {
        const topic = card.dataset.topic || '';
        const desc = card.dataset.description || '';
        
        if (!q || topic.includes(q) || desc.includes(q)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════
// FEATURE: Career Comparison Modal
// ═══════════════════════════════════════════════════════════════════════

function openCompareModal() {
    document.getElementById('compare-modal').classList.remove('hidden');
    logActivity('Opened Career Comparison');
}

function closeCompareModal() {
    document.getElementById('compare-modal').classList.add('hidden');
}

function runComparison() {
    const a = document.getElementById('compare-career-1').value;
    const b = document.getElementById('compare-career-2').value;
    const container = document.getElementById('compare-result');
    
    if (!a || !b) {
        container.innerHTML = '<p class="text-zinc-500 text-sm text-center">Select two careers to compare</p>';
        return;
    }
    
    if (a === b) {
        container.innerHTML = '<p class="text-zinc-500 text-sm text-center">Please select two different careers</p>';
        return;
    }
    
    const kbA = CAREER_KB[a];
    const kbB = CAREER_KB[b];
    
    if (!kbA || !kbB) {
        container.innerHTML = '<p class="text-zinc-500 text-sm text-center">Career data not available</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="compare-table">
            <thead>
                <tr>
                    <th class="compare-label">Attribute</th>
                    <th>${kbA.title}</th>
                    <th>${kbB.title}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="compare-label">💰 Salary</td>
                    <td>${kbA.salaryRange}</td>
                    <td>${kbB.salaryRange}</td>
                </tr>
                <tr>
                    <td class="compare-label">⏱️ Time to Learn</td>
                    <td>${kbA.timeToLearn}</td>
                    <td>${kbB.timeToLearn}</td>
                </tr>
                <tr>
                    <td class="compare-label">🔑 Prerequisites</td>
                    <td>${kbA.prerequisite}</td>
                    <td>${kbB.prerequisite}</td>
                </tr>
                <tr>
                    <td class="compare-label">🛠️ Key Tools</td>
                    <td>${kbA.tools.slice(0, 4).join(', ')}</td>
                    <td>${kbB.tools.slice(0, 4).join(', ')}</td>
                </tr>
                <tr>
                    <td class="compare-label">📝 Steps</td>
                    <td>${kbA.roadmap.length} phases</td>
                    <td>${kbB.roadmap.length} phases</td>
                </tr>
                <tr>
                    <td class="compare-label">🚀 Top Projects</td>
                    <td>${kbA.projects.slice(0, 2).map(p => p.replace(/^•\s*/, '')).join('<br>')}</td>
                    <td>${kbB.projects.slice(0, 2).map(p => p.replace(/^•\s*/, '')).join('<br>')}</td>
                </tr>
            </tbody>
        </table>
    `;
}



// ═══════════════════════════════════════════════════════════════════════
// FEATURE: Stats Dashboard
// ═══════════════════════════════════════════════════════════════════════

function openStatsModal() {
    refreshStats();
    document.getElementById('stats-modal').classList.remove('hidden');
}

function closeStatsModal() {
    document.getElementById('stats-modal').classList.add('hidden');
}

function refreshStats() {
    const roadmapCount = parseInt(localStorage.getItem('zaara_roadmap_count') || '0');
    const completionRate = parseInt(localStorage.getItem('zaara_completion_rate') || '0');

    const streak = calculateStreak();
    
    // Animate counters
    animateCounter('stat-roadmaps', roadmapCount);
    animateCounter('stat-completion', completionRate, '%');

    document.getElementById('stat-streak').textContent = `${streak} 🔥`;
    
    // Populate activity log
    const log = JSON.parse(localStorage.getItem('zaara_activity_log') || '[]');
    const logContainer = document.getElementById('stats-activity-log');
    if (log.length === 0) {
        logContainer.innerHTML = '<p class="text-zinc-500 text-xs">No activity yet. Generate a roadmap to get started!</p>';
    } else {
        logContainer.innerHTML = log.slice(-10).reverse().map(entry => {
            const date = new Date(entry.timestamp);
            const timeStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
            return `<div class="flex justify-between items-center">
                <span class="text-zinc-300">${entry.action}</span>
                <span class="text-zinc-600 text-xs">${timeStr}</span>
            </div>`;
        }).join('');
    }
}

function animateCounter(elementId, target, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current + suffix;
    }, 30);
}

function calculateStreak() {
    const log = JSON.parse(localStorage.getItem('zaara_activity_log') || '[]');
    if (log.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get unique days
    const days = [...new Set(log.map(e => {
        const d = new Date(e.timestamp);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }))].sort((a, b) => b - a);
    
    let streak = 0;
    let checkDate = today.getTime();
    
    for (const day of days) {
        if (day === checkDate || day === checkDate - 86400000) {
            streak++;
            checkDate = day - 86400000;
        } else if (day < checkDate - 86400000) {
            break;
        }
    }
    
    return streak;
}

function logActivity(action) {
    const log = JSON.parse(localStorage.getItem('zaara_activity_log') || '[]');
    log.push({ action, timestamp: new Date().toISOString() });
    // Keep last 50 entries
    if (log.length > 50) log.splice(0, log.length - 50);
    localStorage.setItem('zaara_activity_log', JSON.stringify(log));
    
    // Update streak
    const today = new Date().toDateString();
    localStorage.setItem('zaara_last_active', today);
}

function resetStats() {
    if (!confirm('This will reset all your tracked stats. Are you sure?')) return;
    localStorage.removeItem('zaara_roadmap_count');
    localStorage.removeItem('zaara_completion_rate');
    localStorage.removeItem('zaara_activity_log');
    localStorage.removeItem('zaara_progress');
    localStorage.removeItem('zaara_last_active');
    refreshStats();
    showToast('All stats have been reset.', 'info');
}

// ═══════════════════════════════════════════════════════════════════════
// FEATURE: Share Roadmap
// ═══════════════════════════════════════════════════════════════════════

function shareRoadmap() {
    const saved = localStorage.getItem('zaara_last_roadmap');
    if (!saved) {
        showToast('Generate a roadmap first before sharing!', 'info');
        return;
    }
    
    try {
        const data = JSON.parse(saved);
        const skills = (data.skills_tree || []).join(', ');
        const tools = (data.tools_stack || []).join(', ');
        const projects = (data.projects || []).map(p => `• ${p}`).join('\n');
        
        const text = `🚀 My Career Roadmap (via ZAARA AI)\n\n` +
            `📌 ${data.title}\n` +
            `🧠 Identity: ${data.career_identity}\n\n` +
            `🔧 Skills: ${skills}\n\n` +
            `🛠️ Tools: ${tools}\n\n` +
            `💡 Projects:\n${projects}\n\n` +
            `✨ AI Tip: ${data.ai_recommendation}\n\n` +
            `Built with ZAARA — AI Career Neural Matrix 🤖`;
        
        navigator.clipboard.writeText(text).then(() => {
            showToast('📋 Roadmap copied to clipboard! Paste anywhere to share.', 'success');
            logActivity('Shared roadmap to clipboard');
        }).catch(() => {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            showToast('📋 Roadmap copied to clipboard!', 'success');
        });
    } catch(e) {
        showToast('Failed to generate shareable text.', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════
// FEATURE: Track Roadmap Generation Count
// ═══════════════════════════════════════════════════════════════════════

// Wrap the original generate to track stats
const _origGenerate = generate;
window._origGenerateWrapped = true;

// Patch: increment roadmap count on generation
document.addEventListener('DOMContentLoaded', () => {
    const origShowToast = showToast;
    const origSetItem = localStorage.setItem.bind(localStorage);
    
    // We watch for the roadmap save to increment count
    const _origLSSI = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        _origLSSI.call(this, key, value);
        if (key === 'zaara_last_roadmap') {
            const count = parseInt(localStorage.getItem('zaara_roadmap_count') || '0') + 1;
            _origLSSI.call(localStorage, 'zaara_roadmap_count', count.toString());
            logActivity('Generated a new roadmap');
        }
    };
});
