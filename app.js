
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
    loaderView.classList.remove('hidden');
    loaderView.style.display = 'flex';
    
    loaderText.innerText = "Analyzing your career path...";
    setTimeout(() => loaderText.innerText = "Generating Career Matrix...", 800);
    setTimeout(() => loaderText.innerText = "Syncing with ZAARA R-7...", 1600);

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
                
                // Advanced Result Payload
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
                showToast('Roadmap automatically saved to Secure Matrix.', 'success');
                
            } else {
                document.getElementById('landing-view').classList.remove('hidden');
                errObj.innerText = `Error: ${data.message}`;
                errObj.classList.remove('hidden');
            }
        }, 2400); // 2.4s cinematic delay

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

    roadmap.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'timeline-card slide-in-card mb-6 pl-8 ml-4 w-[calc(100%-1rem)]';
        card.innerHTML = `
            <div class="timeline-node"></div>
            <div class="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                <span class="text-neon-purple text-[11px] font-bold tracking-wider">MONTH ${Math.ceil(item.day / 30) || 1} / STEP ${item.day}</span>
                <span class="font-bold text-[15px] gradient-text">${item.topic}</span>
            </div>
            <p class="text-zinc-400 text-sm mb-3 leading-relaxed">${item.description}</p>
            <a href="${item.resource}" target="_blank" class="inline-flex flex-col gap-1 mt-2 p-3 bg-black/40 rounded-lg border border-purple-900/30 hover:border-purple-500/50 transition-all font-mono">
                <div class="text-purple-300 text-xs font-bold"><i class="fa-solid fa-link"></i> Access Component</div>
            </a>
        `;
        timeline.appendChild(card);
        setTimeout(() => card.classList.add('animate'), i * 50);
    });
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

// PDF Export Function
function downloadPDF() {
    const element = document.getElementById('exportable-roadmap');
    const opt = {
        margin:       [10, 10, 10, 10],
        filename:     'zaara-career-roadmap.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff', windowWidth: 1200, scrollY: 0, scrollX: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    showToast('Initializing PDF rendering sequence...', 'info');
    
    // Temporarily apply PDF styling to the entire document
    document.body.classList.add('pdf-exporting');
    const cursors = element.querySelectorAll('.typing-cursor');
    cursors.forEach(el => el.classList.remove('typing-cursor'));
    
    html2pdf().set(opt).from(element).save().then(() => {
        document.body.classList.remove('pdf-exporting');
        cursors.forEach(el => el.classList.add('typing-cursor'));
        showToast('PDF successfully exported!', 'success');
    }).catch(err => {
        document.body.classList.remove('pdf-exporting');
        showToast('PDF Export encountered an error.', 'error');
    });
}

// Floating Chatbot Logic
let chatOpen = false;
function toggleChatbot() {
    chatOpen = !chatOpen;
    const cw = document.getElementById('chatbot-window');
    const toggleIcon = document.querySelector('#chatbot-toggle-btn i');
    if(chatOpen) {
        cw.classList.add('open');
        toggleIcon.className = 'fa-solid fa-xmark';
    } else {
        cw.classList.remove('open');
        toggleIcon.className = 'fa-solid fa-message';
    }
}

function handleChatKeyPress(e) {
    if(e.key === 'Enter') sendChatbotMessage();
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if(!text) return;
    
    addChatMessage('user', text);
    input.value = '';
    
    setTimeout(() => {
        const responses = [
            "Your career matrix is designed dynamically. Focusing on core fundamentals like data structures or architectural patterns will yield the highest ROI.",
            "I recommend starting with the 'Tools & Tech Stack' recommendations before jumping into the timeline.",
            "That's a great question. As an AI Architect, my directive is to guide you step-by-step. Keep following the monthly plan outlined.",
            "Networking is just as important as code. Don't forget to push your roadmap projects to GitHub and share your progress."
        ];
        const res = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage('bot', res);
    }, 800);
}

function addChatMessage(sender, text) {
    const messages = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
