
// ZAARA Neural — Frontend Interface System
// Optimized for High-Stability API Fetching from Flask Core

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
    
    // Smooth Loader Sequence
    const loaderView = document.getElementById('loader-view');
    const loaderText = document.getElementById('loader-text');
    loaderView.classList.remove('hidden');
    loaderView.style.display = 'flex';
    
    loaderText.innerText = "Analyzing Neural Profile...";
    setTimeout(() => loaderText.innerText = "Generating Career Matrix...", 800);
    setTimeout(() => loaderText.innerText = "Syncing with ZAARA R-7...", 1600);

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill, goal, language, specialty, duration })
        });

        const data = await response.json();
        
        setTimeout(() => {
            loaderView.style.display = 'none';
            loaderView.classList.add('hidden');
            
            if (data.status === 'success') {
                document.getElementById('roadmap-view').classList.remove('hidden');
                document.getElementById('roadmap-title').innerText = data.title;
                
                // Advanced Result Payload
                document.getElementById('identity-text').innerText = data.career_identity || 'Specialist Mode Engaged';
                
                const ulSkills = document.getElementById('skill-tree-list');
                ulSkills.innerHTML = (data.skills_tree || []).map(s => `<li>${s}</li>`).join('');
                
                const ulTools = document.getElementById('tools-list');
                ulTools.innerHTML = (data.tools_stack || []).map(s => `<li>${s}</li>`).join('');
                
                const ulProjects = document.getElementById('projects-list');
                ulProjects.innerHTML = (data.projects || []).map(p => `<li>${p}</li>`).join('');
                
                document.getElementById('ai-rec-text').innerText = data.ai_recommendation || 'Consistency is key.';

                renderTimeline(data.roadmap);
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
        card.className = 'relative pl-8 mb-8 slide-in-card';
        card.innerHTML = `
            <div class="timeline-node"></div>
            <div class="glass-card p-6 rounded-xl">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-purple-400 text-[10px] font-bold">DAY ${item.day}</span>
                    <span class="font-semibold text-sm">${item.topic}</span>
                </div>
                <p class="text-zinc-500 text-xs mb-2">${item.description}</p>
                <a href="${item.resource}" target="_blank" class="text-cyan-400 text-[10px] hover:underline flex items-center gap-1">
                    <i class="fa-solid fa-link"></i> Launch Resource
                </a>
            </div>
        `;
        timeline.appendChild(card);
        setTimeout(() => card.classList.add('animate'), i * 30);
    });
}

function goHome() {
    document.getElementById('roadmap-view').classList.add('hidden');
    document.getElementById('landing-view').classList.remove('hidden');
    document.getElementById('timeline').innerHTML = '';
}
