
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
    const skill = document.getElementById('skill-level').value;
    const goal = document.getElementById('career-goal').value;
    const language = document.getElementById('preferred-language').value;
    const specialty = document.getElementById('medical-specialty').value;
    const duration = document.querySelector('input[name="duration"]:checked').value;
    
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '<p class="text-zinc-500 animate-pulse text-center py-10">Accessing Neural Matrix...</p>';

    document.getElementById('landing-view').classList.add('hidden');
    document.getElementById('roadmap-view').classList.remove('hidden');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill, goal, language, specialty, duration })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            document.getElementById('roadmap-title').innerText = data.title;
            renderTimeline(data.roadmap);
        } else {
            timeline.innerHTML = `<p class="text-red-500">Error: ${data.message}</p>`;
        }
    } catch (e) {
        timeline.innerHTML = `<p class="text-red-500">Connection Failed: AI Core is currently offline.</p>`;
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
