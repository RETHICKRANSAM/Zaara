from flask import Flask, request, jsonify, send_file, Response, stream_with_context
import os
import json

# OpenAI Integration
try:
    from openai import OpenAI
    OPENAI_LIB_AVAILABLE = True
except ImportError:
    OPENAI_LIB_AVAILABLE = False
    print("\n[WARNING] openai package not installed. Chat AI will be unavailable.")
    print("          Install it with: pip install openai\n")

app = Flask(__name__, static_folder=".", static_url_path="")

# ZAARA Brain: Roadmaps are now server-side for high-security and central stabilization
TEMPLATES = {
    'ai_engineer': [
        { 't': 'AI Engineering Roadmap', 'd': 'Visual architecture for mastering Artificial Intelligence.', 'r': 'https://roadmap.sh/ai-engineer' },
        { 't': 'Machine Learning Deep Dive', 'd': 'Hands-on guide to implementing core algorithms with Scikit-Learn.', 'r': 'https://machinelearningmastery.com/machine-learning-in-python-step-by-step/' },
        { 't': 'DeepLearning.AI Essentials', 'd': 'Specialized training for Large Language Models and Vision.', 'r': 'https://www.deeplearning.ai/resources/' }
    ],
    'web_dev': [
        { 't': 'Full-Stack Web Roadmap', 'd': 'A comprehensive path from frontend to backend logic.', 'r': 'https://roadmap.sh/full-stack' },
        { 't': 'Modern Frontend Mastery', 'd': 'Advanced React, TypeScript, and state management hooks.', 'r': 'https://react.dev/learn' },
        { 't': 'The Odin Project', 'd': 'Project-based curriculum for full-stack JavaScript mastery.', 'r': 'https://www.theodinproject.com' }
    ],
    'data_scientist': [
        { 't': 'Data Science Roadmap', 'd': 'Visual guide to all tools and stats for Data Science.', 'r': 'https://roadmap.sh/ai-data-scientist' },
        { 't': 'SQL for Data Science', 'd': 'Advanced queries, window functions, and database wrangling.', 'r': 'https://sqlbolt.com/' },
        { 't': 'Visualization Theory', 'd': 'Storytelling through data using Matplotlib and D3.js.', 'r': 'https://matplotlib.org/stable/tutorials/index.html' }
    ],
    'cybersecurity': [
        { 't': 'Cyber Security Roadmap', 'd': 'Comprehensive guide to offensive and defensive security.', 'r': 'https://roadmap.sh/cyber-security' },
        { 't': 'Web Security Academy', 'd': 'Professional training for web application vulnerabilities.', 'r': 'https://portswigger.net/web-security' },
        { 't': 'Linux Terminal Mastery', 'd': 'Official guide to command-line automation and security.', 'r': 'https://ubuntu.com/tutorials/command-line-for-beginners' }
    ],
    'cloud_engineer': [
        { 't': 'Cloud (AWS) Roadmap', 'd': 'Role-based paths for becoming a Cloud Architect.', 'r': 'https://roadmap.sh/aws' },
        { 't': 'Infrastructure as Code', 'd': 'Learning Terraform, Pulumi, and automation strategies.', 'r': 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started' },
        { 't': 'Docker & Kubernetes', 'd': 'Containerization and orchestration for scalable apps.', 'r': 'https://roadmap.sh/kubernetes' }
    ],
    'mobile_dev': [
        { 't': 'Mobile Architecture', 'd': 'Visual guide to cross-platform mobile app development.', 'r': 'https://roadmap.sh/android' },
        { 't': 'Flutter Foundations', 'd': 'Building beautiful 3D-accelerated UIs with Dart.', 'r': 'https://docs.flutter.dev/get-started/codelab' }
    ],
    'devops': [
        { 't': 'DevOps Roadmap', 'd': 'Guide to CI/CD, monitoring, and cloud automation.', 'r': 'https://roadmap.sh/devops' },
        { 't': 'GitHub Actions Mastery', 'd': 'Automating deployment cycles with modern CI tools.', 'r': 'https://docs.github.com/en/actions/quickstart' }
    ],
    'game_dev': [
        { 't': 'Game Development Roadmap', 'd': 'Path for mastering 3D engines and vertex logic.', 'r': 'https://roadmap.sh/game-developer' },
        { 't': 'Unity Essentials', 'd': 'Professional-grade Unity training for all levels.', 'r': 'https://learn.unity.com/' }
    ],
    'blockchain': [
        { 't': 'Blockchain Roadmap', 'd': 'Master Web3, Solidity, and DApp architecture.', 'r': 'https://roadmap.sh/blockchain' },
        { 't': 'Ethereum Development', 'd': 'Building decentralized finance (DeFi) platforms.', 'r': 'https://ethereum.org/en/developers/' }
    ],
    'ui_ux': [
        { 't': 'UX Design Roadmap', 'd': 'Guide to research, wireframing, and psychological design.', 'r': 'https://roadmap.sh/ux-design' },
        { 't': 'Figma Mastery', 'd': 'Learning high-fidelity prototyping and design systems.', 'r': 'https://help.figma.com/hc/en-us' }
    ],
    'backend': [
        { 't': 'Backend Engineering', 'd': 'Complete path for mastering server-side logic and systems.', 'r': 'https://roadmap.sh/backend' },
        { 't': 'System Design Primer', 'd': 'Architecting for scalability and distributed systems.', 'r': 'https://github.com/donnemartin/system-design-primer' }
    ],
    'data_engineer': [
        { 't': 'Data Engineer Roadmap', 'd': 'Building robust data pipelines and warehouses.', 'r': 'https://roadmap.sh/data-engineer' },
        { 't': 'Apache Spark Guide', 'd': 'Distributed computing for large-scale data processing.', 'r': 'https://spark.apache.org/docs/latest/' }
    ],
    'software_engineer': [
        { 't': 'Software Architecture', 'd': 'Path to mastering large-scale patterns and SOLID design.', 'r': 'https://roadmap.sh/software-architect' },
        { 't': 'DSA & Algorithms', 'd': 'Mastering data structures for technical interview prep.', 'r': 'https://www.geeksforgeeks.org/data-structures/' }
    ],
    'internship': [
        { 't': 'Internship Success Guide', 'd': 'How to pick a stack and land your first role.', 'r': 'https://roadmap.sh/' },
        { 't': 'Portfolio Architecture', 'd': 'Building high-impact projects that attract recruiters.', 'r': 'https://dev.to/t/portfolio' }
    ],
    'freelance': [
        { 't': 'Freelance Tech Roadmap', 'd': 'Guide to managing technical clients and solo projects.', 'r': 'https://roadmap.sh/full-stack' },
        { 't': 'Personal Branding', 'd': 'Establishing a professional online identity as a dev.', 'r': 'https://dev.to/t/branding' }
    ],
    'embedded_systems': [
        { 't': 'Embedded Systems Roadmap', 'd': 'Mastering the bridge between hardware and software.', 'r': 'https://roadmap.sh/cpp' },
        { 't': 'Digital Electronics Core', 'd': 'Fundamentals of logic gates and circuit design.', 'r': 'https://www.allaboutcircuits.com/textbook/digital/' },
        { 't': 'Microcontroller Architecture', 'd': 'Understanding CPU cores, memory mapping, and registers.', 'r': 'https://www.edx.org/learn/microcontrollers' }
    ],
    'medical_doctor': [
        { 't': 'Advanced Clinical Anatomy', 'd': 'Deep dive into structural and functional human anatomy.', 'r': 'https://www.kenhub.com/' },
        { 't': 'Pharmacology Fundamentals', 'd': 'Mechanisms of drug action and clinical applications.', 'r': 'https://www.osmosis.org/topics/pharmacology' },
        { 't': 'Diagnostic Medicine', 'd': 'Core principles of differential diagnosis and imaging.', 'r': 'https://www.medscape.com/index/section_10123_0' },
        { 't': 'Medical Research & PubMed', 'd': 'Navigating clinical trials and peer-reviewed journals.', 'r': 'https://pubmed.ncbi.nlm.nih.gov/' },
        { 't': 'Telemedicine & Digital Health', 'd': 'Future of healthcare delivery and virtual diagnostics.', 'r': 'https://www.khanacademy.org/science/health-and-medicine' }
    ]
}

# Language-specific specialization for Embedded Systems
LANGUAGE_EXTENSIONS = {
    'c': [
        { 't': 'Embedded C Mastery', 'd': 'Pointer arithmetic and register-level programming.', 'r': 'https://www.learn-c.org/' },
        { 't': 'Bare-Metal Driver Design', 'd': 'Writing your own I2C and UART drivers from scratch.', 'r': 'https://embedded-trainings.ferrous-systems.com/' }
    ],
    'cpp': [
        { 't': 'Modern C++ for Embedded', 'd': 'Standard Template Library (STL) in constrained environments.', 'r': 'https://academy.nordicsemi.com/' },
        { 't': 'OOP in Hardware', 'd': 'Class-based architecture for peripheral management.', 'r': 'https://www.cplusplus.com/doc/tutorial/' }
    ],
    'rust': [
        { 't': 'The Embedded Rust Book', 'd': 'Safe systems programming for microcontrollers.', 'r': 'https://docs.rust-embedded.org/book/' },
        { 't': 'PAC & HAL in Rust', 'd': 'Hardware Abstraction Layers and memory safety.', 'r': 'https://rust-embedded.github.io/book/intro/hardware.html' }
    ],
    'python': [
        { 't': 'MicroPython Essentials', 'd': 'Rapid prototyping for hardware with Python.', 'r': 'https://docs.micropython.org/en/latest/' },
        { 't': 'CircuitPython Workflow', 'd': 'Easy USB-level programming for sensors and I/O.', 'r': 'https://learn.adafruit.com/welcome-to-circuitpython' }
    ],
    'assembly': [
        { 't': 'Instruction Set Theory', 'd': 'Direct CPU control and opcode optimization.', 'r': 'https://www.arm.com/resources/education/books/assembly-language-programming' },
        { 't': 'Inline Assembly in C', 'd': 'Mixing low-level and high-level logic for speed.', 'r': 'https://www.tutorialspoint.com/assembly_programming/index.htm' }
    ]
}

# Medical Specialization extensions
MEDICAL_SPECIALTIES = {
    'cardiologist': [
        { 't': 'Cardiovascular Anatomy', 'd': 'Structure of the heart and circulatory system.', 'r': 'https://www.cvphysiology.com/' },
        { 't': 'ECG Interpretation', 'd': 'Mastering heart rate and rhythm diagnostics.', 'r': 'https://litfl.com/ecg-library/' }
    ],
    'neurologist': [
        { 't': 'Neuroanatomy Core', 'd': 'Central and peripheral nervous system mapping.', 'r': 'https://nba.uth.tmc.edu/neuroscience/' },
        { 't': 'Neurological Diagnostics', 'd': 'MRI/CT scans of the brain and nerve function tests.', 'r': 'https://www.ninds.nih.gov/health-information/public-education/brain-basics' }
    ],
    'dermatologist': [
        { 't': 'Clinical Dermatology', 'd': 'Diagnosis and treatment of skin conditions.', 'r': 'https://www.msdmanuals.com/professional/dermatologic-disorders' },
        { 't': 'Dermatopathology Basics', 'd': 'Histological analysis of skin biopsies.', 'r': 'https://dermnetnz.org/' }
    ],
    'gastroenterologist': [
        { 't': 'Digestive System Physiology', 'd': 'Advanced GI tract function and disorders.', 'r': 'https://gi.org/patients/gi-health-and-disease/' },
        { 't': 'Endoscopy & Procedures', 'd': 'Introduction to gastroenterological imaging.', 'r': 'https://medlineplus.gov/endoscopy.html' }
    ],
    'pulmonologist': [
        { 't': 'Respiratory Pathophysiology', 'd': 'Lung disease management and critical care basics.', 'r': 'https://www.thoracic.org/patients/patient-resources/' },
        { 't': 'Pulmonary Function Tests', 'd': 'Interpreting lung capacity and airflow metrics.', 'r': 'https://medlineplus.gov/ency/article/003853.htm' }
    ],
    'nephrologist': [
        { 't': 'Renal Physiology', 'd': 'Kidney function and electrolyte balance control.', 'r': 'https://www.asnonline.org/education/' },
        { 't': 'Clinical Nephrology', 'd': 'Chronic kidney disease and dialysis fundamentals.', 'r': 'https://www.kidney.org/professionals' }
    ]
}

def get_mock_insights(goal):
    insights = {
        'ai_engineer': {
            'identity': "Neural Architect & ML Optimizer",
            'skills': ["Python Basics", "Linear Algebra & Calculus", "Neural Networks", "Transformer Architecture", "LLM Fine-tuning"],
            'tools': ["PyTorch", "TensorFlow", "Hugging Face", "CUDA", "Scikit-Learn"],
            'projects': ["Custom Sentiment Analyzer", "Image Classification API", "Retrieval-Augmented Generation (RAG) Chatbot"],
            'ai_recommendation': "Focus heavily on foundational math before diving deep into complex architectures. The best AI Engineers understand the theory behind the framework."
        },
        'web_dev': {
            'identity': "Full-Stack System Builder",
            'skills': ["HTML/CSS/JS", "React/Vue Frontend", "Node.js/Python Backend", "Database Design", "System Architecture"],
            'tools': ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
            'projects': ["E-Commerce Mockup", "Real-time Chat App", "Full-Stack SaaS Platform"],
            'ai_recommendation': "Build consistently. A strong personal portfolio demonstrating complete end-to-end applications matters more than purely theoretical knowledge."
        },
        'data_scientist': {
            'identity': "Data Storyteller & Statistical Analyst",
            'skills': ["Data Wrangling", "Exploratory Data Analysis (EDA)", "Probability & Statistics", "Machine Learning Models", "Data Visualization"],
            'tools': ["Pandas", "NumPy", "Jupyter", "Tableau", "SQL"],
            'projects': ["Predictive Pricing Model", "Customer Churn Analysis", "Interactive Data Dashboard"],
            'ai_recommendation': "Your core value is extracting actionable insights. Don't just build models—learn to communicate what the data actually means for a business."
        },
        'cybersecurity': {
            'identity': "Security Analyst & Off/Def Specialist",
            'skills': ["Networking Basics", "Linux Administration", "Ethical Hacking", "Cryptography", "Incident Response"],
            'tools': ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap"],
            'projects': ["Vulnerability Scanner Tool", "Packet Analyzer", "Secure Home Network Setup"],
            'ai_recommendation': "Adopt a 'hacker mindset'—always think about how systems can be broken. Validate your skills through hands-on labs like HackTheBox or TryHackMe."
        },
        'embedded_systems': {
            'identity': "Hardware/Firmware Integrator",
            'skills': ["Digital Logic", "C/C++", "Microcontroller Architecture", "RTOS", "Signal Processing"],
            'tools': ["Oscilloscope", "STM32/Arduino", "PlatformIO", "KiCad", "Logic Analyzer"],
            'projects': ["Custom Weather Station", "Automated Robot Arm", "Custom Keyboard PCB Firmware"],
            'ai_recommendation': "The bridge between software and hardware requires immense patience. Learn to read technical datasheets thoroughly."
        },
        'medical_doctor': {
            'identity': "Clinical Diagnostics Specialist",
            'skills': ["Anatomy & Physiology", "Biochemistry", "Pathology", "Pharmacology", "Clinical Reasoning"],
            'tools': ["Stethoscope", "Electronic Health Records (EHR)", "Diagnostic Imaging (MRI/CT/X-Ray)", "Differential Diagnosis Matrix"],
            'projects': ["Clinical Case Studies", "Research Meta-Analysis", "Medical Volunteer Rotation"],
            'ai_recommendation': "Medicine is a marathon of continuous learning. Focus heavily on mastering the fundamentals of anatomy and pathology before specializing."
        },
        'cloud_engineer': {
            'identity': "Cloud Infrastructure Architect",
            'skills': ["Cloud Platforms (AWS/Azure/GCP)", "Infrastructure as Code", "Networking & Security", "Containerization", "Serverless Architecture"],
            'tools': ["AWS", "Terraform", "Docker", "Kubernetes", "CloudFormation", "Ansible"],
            'projects': ["Multi-tier Cloud Architecture", "Serverless API with Lambda", "Auto-scaling Deployment Pipeline"],
            'ai_recommendation': "Get hands-on with free tier accounts on AWS or GCP. Certifications like AWS Solutions Architect carry real weight in the job market."
        },
        'mobile_dev': {
            'identity': "Cross-Platform Mobile Engineer",
            'skills': ["UI/UX for Mobile", "State Management", "API Integration", "Native Platform APIs", "App Store Deployment"],
            'tools': ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Xcode"],
            'projects': ["Cross-Platform To-Do App", "Real-time Location Tracker", "Social Media Clone"],
            'ai_recommendation': "Pick either Flutter or React Native to start, master it deeply, then consider native development. Ship to app stores early to learn the full lifecycle."
        },
        'devops': {
            'identity': "DevOps & SRE Pipeline Architect",
            'skills': ["Linux Administration", "CI/CD Pipelines", "Container Orchestration", "Monitoring & Logging", "Infrastructure as Code"],
            'tools': ["Docker", "Kubernetes", "Jenkins", "Terraform", "Prometheus", "GitHub Actions"],
            'projects': ["Fully Automated CI/CD Pipeline", "Kubernetes Cluster Deployment", "Infrastructure Monitoring Dashboard"],
            'ai_recommendation': "DevOps is about culture as much as tools. Automate everything, measure everything, and always think about reliability and scalability."
        },
        'game_dev': {
            'identity': "Game Systems & Engine Developer",
            'skills': ["Game Physics & Math", "C#/C++ Programming", "3D Modeling Basics", "Game Design Patterns", "Shader Programming"],
            'tools': ["Unity", "Unreal Engine", "Godot", "Blender", "C#", "Visual Studio"],
            'projects': ["2D Platformer Game", "3D First-Person Exploration", "Multiplayer Online Game Prototype"],
            'ai_recommendation': "Start small with game jams and 2D games. Scope creep is the #1 killer of game projects. Finish small games before attempting large ones."
        },
        'blockchain': {
            'identity': "Web3 & Smart Contract Engineer",
            'skills': ["Blockchain Fundamentals", "Solidity Programming", "Smart Contract Security", "DeFi Protocols", "Tokenomics"],
            'tools': ["Solidity", "Hardhat", "Ethers.js", "MetaMask", "IPFS", "OpenZeppelin"],
            'projects': ["ERC-20 Token Contract", "NFT Minting DApp", "Decentralized Voting System"],
            'ai_recommendation': "Security is paramount in blockchain. Learn common vulnerabilities (reentrancy, overflow) before deploying any smart contracts."
        },
        'ui_ux': {
            'identity': "User Experience & Interface Designer",
            'skills': ["Design Thinking", "Wireframing & Prototyping", "Visual Design", "Interaction Design", "User Research"],
            'tools': ["Figma", "Adobe XD", "Sketch", "Miro", "Maze", "Framer"],
            'projects': ["Mobile App Redesign", "Design System from Scratch", "E-Commerce UX Flow"],
            'ai_recommendation': "Great design is invisible. Study real products you love, understand why they work, and practice recreating existing designs before creating original ones."
        },
        'backend': {
            'identity': "Server-Side Systems Architect",
            'skills': ["API Design (REST/GraphQL)", "Database Engineering", "Authentication & Security", "System Design", "Scalability Patterns"],
            'tools': ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "Nginx"],
            'projects': ["REST API with Auth & Rate Limiting", "WebSocket Chat Server", "Microservices Architecture"],
            'ai_recommendation': "Backend is about reliability and performance. Master fundamentals like caching, indexing, and connection pooling before chasing new frameworks."
        },
        'data_engineer': {
            'identity': "Data Pipeline & Platform Engineer",
            'skills': ["Advanced SQL", "ETL/ELT Design", "Data Warehousing", "Stream Processing", "Cloud Data Platforms"],
            'tools': ["Apache Spark", "Airflow", "Kafka", "Snowflake", "dbt", "Python"],
            'projects': ["End-to-End ETL Pipeline", "Real-time Streaming Dashboard", "Data Lake Architecture"],
            'ai_recommendation': "Data engineering is about scale and reliability. Learn to think in terms of data quality, lineage, and pipeline observability from day one."
        },
        'software_engineer': {
            'identity': "Interview-Ready Software Engineer",
            'skills': ["Data Structures & Algorithms", "System Design", "Object-Oriented Design", "Problem Solving", "Behavioral Interview Skills"],
            'tools': ["LeetCode", "HackerRank", "VS Code", "Git", "Excalidraw", "Pramp"],
            'projects': ["HTTP Server from Scratch", "Key-Value Store (Redis Clone)", "Open-Source Contribution"],
            'ai_recommendation': "Consistency beats intensity. Solve 2-3 problems daily rather than cramming 20 in a weekend. Focus on understanding patterns, not memorizing solutions."
        },
        'internship': {
            'identity': "Internship-Ready Developer",
            'skills': ["Project Building", "Resume & Portfolio", "DSA Fundamentals", "Networking", "Interview Preparation"],
            'tools': ["GitHub", "LinkedIn", "LeetCode", "VS Code", "Notion", "AngelList"],
            'projects': ["Portfolio Website", "Full-Stack CRUD App", "Open-Source Contribution", "Hackathon Project"],
            'ai_recommendation': "Quality over quantity. 3 polished, deployed projects on your resume are worth more than 15 incomplete ones. Apply broadly and start early."
        },
        'freelance': {
            'identity': "Independent Tech Consultant",
            'skills': ["Client Communication", "Project Scoping", "Pricing Strategy", "Personal Branding", "Time Management"],
            'tools': ["Upwork", "Fiverr", "Notion", "Stripe", "Calendly", "GitHub"],
            'projects': ["Client-Ready Portfolio", "Landing Page Template Business", "Niche Automation Tool"],
            'ai_recommendation': "Start with underpriced small projects to build reviews and reputation. Once you have 10+ positive reviews, you can charge your true rate."
        }
    }
    
    return insights.get(goal, {
        'identity': "Advanced Systems Specialist",
        'skills': ["Core Fundamentals", "Advanced Logic", "System Design", "Security Practices", "Optimization & Scale"],
        'tools': ["Git/GitHub", "Docker", "Linux Terminal", "Cloud Platforms", "CI/CD"],
        'projects': ["Automated Process Script", "CRUD Platform System", "Fully Deployed Scalable Application"],
        'ai_recommendation': "Consistency and deep fundamental understanding will guarantee your success in this chosen technical domain."
    })

@app.route("/")
def index():
    return send_file("index.html")

@app.route("/api/generate", methods=["POST"])
def generate():
    try:
        data = request.json
        skill = data.get("skill", "beginner")
        goal = data.get("goal", "web_dev")
        language = data.get("language", "c")
        specialty = data.get("specialty", "general")
        duration = int(data.get("duration", 30))
        
        base = TEMPLATES.get(goal, TEMPLATES['web_dev'])
        
        # Merge language-specific logic if goal is hardware-centric
        if goal == 'embedded_systems' and language in LANGUAGE_EXTENSIONS:
            base = base + LANGUAGE_EXTENSIONS[language]
            
        # Merge medical specialization logic if goal is medical
        if goal == 'medical_doctor' and specialty in MEDICAL_SPECIALTIES:
            base = base + MEDICAL_SPECIALTIES[specialty]

        roadmap_data = []
        
        # Generator logic: Expand templates to fit duration
        for i in range(1, duration + 1):
            template_item = base[(i - 1) % len(base)]
            roadmap_data.append({
                "day": i,
                "topic": template_item["t"],
                "description": template_item["d"],
                "resource": template_item["r"]
            })
            
        # Refine Title
        display_title = goal.replace('_', ' ').upper()
        if goal == 'embedded_systems': display_title += f" ({language.upper()})"
        elif goal == 'medical_doctor' and specialty != 'general': display_title = f"{specialty.replace('_', ' ').upper()} Specialist"

        insights = get_mock_insights(goal)

        return jsonify({
            "status": "success",
            "title": f"Your {duration}-Day {display_title} Path",
            "career_identity": insights['identity'],
            "skills_tree": insights['skills'],
            "tools_stack": insights['tools'],
            "projects": insights['projects'],
            "ai_recommendation": insights['ai_recommendation'],
            "roadmap": roadmap_data,
            "metadata": {
                "skill": skill,
                "goal": goal,
                "language": language,
                "specialty": specialty,
                "engine": "ZAARA Neural Python Core"
            }
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

# ═══════════════════════════════════════════════════════════════════════
# AI CAREER MENTOR — OpenAI Streaming Chat Integration
# ═══════════════════════════════════════════════════════════════════════

CAREER_MENTOR_PROMPT = """
You are ZAARA — an advanced AI Career Mentor built into the ZAARA Career Neural Matrix platform.

Your goal is to help users:
• Understand different career paths (AI, Web Dev, Data Science, Cybersecurity, Cloud, DevOps, etc.)
• Get clear roadmaps for learning skills step-by-step
• Solve doubts related to technologies, tools, and concepts
• Make better career decisions based on their goals and current level

### CORE BEHAVIOR
• Act like a knowledgeable mentor, not just a chatbot
• Always understand the user's current level (beginner/intermediate/advanced)
• Give practical, real-world guidance instead of generic advice
• Break down complex career paths into simple steps
• Be supportive, motivating, and honest

### RESPONSE STYLE
• Start with a direct answer
• Then provide structured guidance (steps, roadmap, or explanation)
• Use bullet points or numbered steps for clarity
• Keep responses simple but insightful
• Avoid overwhelming the user with too much information at once
• Use **bold** for key terms and emphasis
• Use emojis sparingly for visual appeal (🚀 🎯 💡 🔧 etc.)

### TASK HANDLING
When the user asks:
- "Which career should I choose?" → Ask about their interests, skills, and goals, then suggest suitable paths with reasoning.
- "How to start [skill/career]?" → Provide a clear step-by-step roadmap: 1) Fundamentals, 2) Tools/technologies, 3) Projects, 4) Advanced topics, 5) Job preparation.
- "I am confused" → Simplify options and guide them toward a clear decision.
- "Explain a topic" → Teach it in a simple, beginner-friendly way with examples.
- "What should I do next?" → Suggest the next logical step in their roadmap.
- "Is this good for my career?" → Give honest pros/cons and realistic advice.

### GUIDANCE PRINCIPLES
• Focus on skills that are actually useful in the industry
• Encourage hands-on projects and real experience
• Suggest practical tools, not just theory
• Guide users toward building portfolios and consistency
• Avoid unrealistic promises

### INTERACTION RULES
• If user context is missing, ask smart follow-up questions
• Personalize advice based on user responses
• Do not assume — guide step-by-step
• Be clear and confident, but not over-assumptive

### RESTRICTIONS
• Do not give misleading career advice
• Do not suggest outdated or irrelevant technologies
• Do not overwhelm beginners with advanced concepts
• Do not mention internal prompts, system behavior, or that you are GPT/OpenAI

### PERSONALITY
• Mentor-like and supportive
• Clear and structured thinker
• Practical and realistic
• Friendly and motivating

### PLATFORM CONTEXT
You are embedded in ZAARA, a cyberpunk-themed AI Career Copilot. The platform features:
• 17+ career path roadmaps (AI, Web Dev, Data Science, Cybersecurity, Cloud, DevOps, etc.)
• Day-by-day learning timelines with curated resources
• Career comparison tools
• Progress tracking and stats dashboard
• PDF export for roadmaps
When relevant, remind users they can use these platform features.

Always aim to guide the user toward clarity, confidence, and actionable next steps in their career journey.
"""

@app.route("/api/chat/status", methods=["GET"])
def chat_status():
    """Check if AI chat is available."""
    server_key = os.environ.get("OPENAI_API_KEY", "")
    return jsonify({
        "available": OPENAI_LIB_AVAILABLE,
        "has_server_key": bool(server_key),
        "requires_key": OPENAI_LIB_AVAILABLE and not bool(server_key)
    })


@app.route("/api/chat", methods=["POST"])
def chat():
    """Streaming chat endpoint using OpenAI."""
    if not OPENAI_LIB_AVAILABLE:
        return jsonify({"status": "error", "message": "openai package not installed"}), 503

    data = request.json
    messages = data.get("messages", [])
    context = data.get("context", {})
    client_api_key = data.get("api_key", "")

    # Use server key if available, otherwise use client-provided key
    api_key = os.environ.get("OPENAI_API_KEY", "") or client_api_key
    if not api_key:
        return jsonify({"status": "error", "message": "No API key configured"}), 401

    # Build system prompt with user context
    system_content = CAREER_MENTOR_PROMPT
    if context:
        ctx_lines = ["\n\n--- Current User Context ---"]
        if context.get("skillLevel") and context["skillLevel"] != "unknown":
            ctx_lines.append(f"Skill Level: {context['skillLevel']}")
        if context.get("careerGoal") and context["careerGoal"] not in ["", "not set"]:
            ctx_lines.append(f"Selected Career Goal: {context['careerGoal'].replace('_', ' ').title()}")
        if context.get("activeRoadmap") == "yes":
            ctx_lines.append("The user has an active roadmap generated on the platform.")
        if len(ctx_lines) > 1:
            system_content += "\n".join(ctx_lines)

    full_messages = [{"role": "system", "content": system_content}] + messages

    model = data.get("model", "gpt-4o-mini")

    def generate():
        try:
            client = OpenAI(api_key=api_key)
            stream = client.chat.completions.create(
                model=model,
                messages=full_messages,
                max_tokens=1200,
                temperature=0.7,
                stream=True
            )
            for chunk in stream:
                delta = chunk.choices[0].delta
                if delta.content:
                    yield f"data: {json.dumps({'content': delta.content})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            error_msg = str(e)
            # Clean up common OpenAI error messages
            if "Incorrect API key" in error_msg or "invalid_api_key" in error_msg:
                error_msg = "Invalid API key. Please check your OpenAI API key."
            elif "insufficient_quota" in error_msg:
                error_msg = "API quota exceeded. Please check your OpenAI billing."
            yield f"data: {json.dumps({'error': error_msg})}\n\n"

    return Response(
        stream_with_context(generate()),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive"
        }
    )


if __name__ == "__main__":
    api_key = os.environ.get("OPENAI_API_KEY", "")
    print("\n" + "=" * 55)
    print("  ZAARA Neural Logic Server v2.0")
    print("=" * 55)
    if api_key:
        print(f"  [OK] OpenAI API Key: ...{api_key[-6:]}")
    else:
        print("  [!!] No OPENAI_API_KEY env var set.")
        print("       You can enter your key in the chatbot settings.")
    print(f"  [LIB] OpenAI Library: {'Installed' if OPENAI_LIB_AVAILABLE else 'Not installed'}")
    print("=" * 55 + "\n")
    app.run(port=5000, debug=True)
