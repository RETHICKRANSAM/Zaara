// ═══════════════════════════════════════════════════════════════════════
// ZAARA Neural — Supabase Authentication Engine v2.0
// ═══════════════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────────────
// 🔑  CONFIGURATION — Replace these with your actual Supabase keys
// ──────────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://upsrxckrqrprprrmyeab.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_n63KU5FtBOybvtYqzHXPaA_vqZIG00M'; // PASTE YOUR PUBLISHABLE KEY HERE

// Initialize the Supabase client safely
let _supabase;
try {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[ZAARA Auth] Supabase client initialized.');
} catch (err) {
    console.error('[ZAARA Auth] CRITICAL: Supabase client initialization failed.', err);
    console.warn('Did you forget to replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY?');
}

// ──────────────────────────────────────────────────────────────────────
// Auth State Manager
// ──────────────────────────────────────────────────────────────────────
const ZaaraAuth = {
    currentUser: null,
    isInitialized: false,

    async init() {
        try {
            if (!_supabase) throw new Error("Supabase client is not initialized.");

            const { data: { session }, error } = await _supabase.auth.getSession();
            if (error) {
                console.error('[ZAARA Auth] Session retrieval error:', error);
                throw error;
            }
            if (session) {
                console.log('[ZAARA Auth] Active session found for:', session.user?.email);
                this.currentUser = session.user;
            }
            this.isInitialized = true;

            _supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    this.currentUser = session.user;
                    this._onAuthChange('signed_in', session.user);
                } else if (event === 'SIGNED_OUT') {
                    this.currentUser = null;
                    this._onAuthChange('signed_out', null);
                } else if (event === 'TOKEN_REFRESHED' && session) {
                    this.currentUser = session.user;
                }
            });

            return this.currentUser;
        } catch (err) {
            console.error('[ZAARA Auth] Init error:', err.message);
            this.isInitialized = true;
            return null;
        }
    },

    async signUp(email, password, fullName) {
        try {
            const { data, error } = await _supabase.auth.signUp({
                email, password,
                options: {
                    data: {
                        full_name: fullName || '',
                        avatar_url: '',
                        joined_at: new Date().toISOString()
                    }
                }
            });
            if (error) throw error;
            if (data.user && !data.session) {
                return { success: true, needsConfirmation: true, message: 'Account created! Check your email to confirm.' };
            }
            this.currentUser = data.user;
            return { success: true, needsConfirmation: false, user: data.user, message: 'Account created successfully!' };
        } catch (err) {
            return { success: false, message: this._parseError(err.message) };
        }
    },

    async signIn(email, password) {
        try {
            if (!_supabase) throw new Error("Supabase client is not initialized.");

            // 🧪 Debug Log: Start login flow
            console.log(`[ZAARA Auth] Attempting login for email: ${email}`);

            const { data, error } = await _supabase.auth.signInWithPassword({ 
                email: email, 
                password: password 
            });

            // 🧪 Debug Log: Check for specific Supabase errors
            if (error) {
                console.error('[ZAARA Auth] Raw Supabase Login Error:', error);
                throw error;
            }

            // 🧪 Debug Log: Verify session persistence
            if (!data.session) {
                console.warn('[ZAARA Auth] Warning: Login succeeded but no session was returned.');
            } else {
                console.log('[ZAARA Auth] Login successful. Session established and persisted.');
            }

            this.currentUser = data.user;
            return { success: true, user: data.user, message: 'Welcome back, agent.' };
        } catch (err) {
            console.error('[ZAARA Auth] Caught error during signIn:', err);
            return { success: false, message: this._parseError(err.message) };
        }
    },

    async signInWithOAuth(provider) {
        try {
            const { data, error } = await _supabase.auth.signInWithOAuth({
                provider,
                options: { redirectTo: window.location.origin + window.location.pathname }
            });
            if (error) throw error;
            return { success: true };
        } catch (err) {
            return { success: false, message: this._parseError(err.message) };
        }
    },

    async resetPassword(email) {
        try {
            const { error } = await _supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + window.location.pathname
            });
            if (error) throw error;
            return { success: true, message: 'Password reset link sent to your email.' };
        } catch (err) {
            return { success: false, message: this._parseError(err.message) };
        }
    },

    async updatePassword(newPassword) {
        try {
            const { error } = await _supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            return { success: true, message: 'Password updated successfully!' };
        } catch (err) {
            return { success: false, message: this._parseError(err.message) };
        }
    },

    async signOut() {
        try {
            const { error } = await _supabase.auth.signOut();
            if (error) throw error;
            this.currentUser = null;
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },

    getUser() { return this.currentUser; },
    isAuthenticated() { return !!this.currentUser; },

    getUserDisplayName() {
        if (!this.currentUser) return 'Agent';
        return this.currentUser.user_metadata?.full_name
            || this.currentUser.email?.split('@')[0]
            || 'Agent';
    },

    getUserEmail() { return this.currentUser?.email || ''; },
    getUserAvatar() { return this.currentUser?.user_metadata?.avatar_url || null; },

    getUserInitial() {
        const name = this.getUserDisplayName();
        return name.charAt(0).toUpperCase();
    },

    _authChangeCallbacks: [],
    onAuthChange(callback) { this._authChangeCallbacks.push(callback); },
    _onAuthChange(event, user) { this._authChangeCallbacks.forEach(cb => cb(event, user)); },

    _parseError(msg) {
        const m = {
            'Invalid login credentials': 'Invalid email or password. Please try again.',
            'Email not confirmed': 'Please confirm your email before logging in.',
            'User already registered': 'This email is already registered. Try logging in.',
            'Password should be at least 6 characters': 'Password must be at least 6 characters.',
            'Unable to validate email address: invalid format': 'Please enter a valid email address.',
            'Email rate limit exceeded': 'Too many attempts. Please try again later.',
            'Signup requires a valid password': 'Please enter a valid password.',
        };
        for (const [key, value] of Object.entries(m)) {
            if (msg.includes(key)) return value;
        }
        return msg || 'An unexpected error occurred.';
    }
};


// ══════════════════════════════════════════════════════════════════════
//  AUTH UI CONTROLLER — Manages auth-view ↔ app-content switching
// ══════════════════════════════════════════════════════════════════════

let currentAuthMode = 'login'; // login | signup | forgot

// ── Initialize page: show auth or app ───────────────────────────────
async function initAuthGate() {
    await ZaaraAuth.init();

    const authView = document.getElementById('auth-view');
    const appContent = document.getElementById('app-content');

    if (ZaaraAuth.isAuthenticated()) {
        // Already logged in → show app
        showAppContent();
    } else {
        // Not logged in → show auth
        if (authView) authView.classList.remove('hidden');
        if (appContent) appContent.classList.add('hidden');
        initAuthParticles();
    }
}

function showAppContent() {
    const authView = document.getElementById('auth-view');
    const appContent = document.getElementById('app-content');

    if (authView) authView.classList.add('hidden');
    if (appContent) appContent.classList.remove('hidden');

    // Update user bar
    const nameEl = document.getElementById('user-display-name');
    const avatarEl = document.getElementById('user-avatar');
    if (nameEl) nameEl.textContent = ZaaraAuth.getUserDisplayName();
    if (avatarEl) avatarEl.textContent = ZaaraAuth.getUserInitial();
}

function showAuthView() {
    const authView = document.getElementById('auth-view');
    const appContent = document.getElementById('app-content');

    if (authView) authView.classList.remove('hidden');
    if (appContent) appContent.classList.add('hidden');
    switchAuthMode('login');
}

// ── Switch between Login / Signup / Forgot ──────────────────────────
function switchAuthMode(mode) {
    currentAuthMode = mode;
    const titleEl = document.getElementById('auth-title');
    const subtitleEl = document.getElementById('auth-subtitle');
    const submitText = document.getElementById('auth-submit-text');
    const nameGroup = document.getElementById('auth-name-group');
    const confirmGroup = document.getElementById('auth-confirm-group');
    const forgotLink = document.getElementById('auth-forgot-link');
    const backLink = document.getElementById('auth-back-to-login');
    const switchText = document.getElementById('auth-switch-text');
    const oauthSection = document.querySelector('.auth-divider');
    const oauthButtons = document.querySelector('.auth-oauth-row');
    const passwordGroup = document.querySelector('#auth-password')?.closest('.auth-input-group');

    // Clear messages
    hideAuthMessages();

    if (mode === 'login') {
        if (titleEl) titleEl.textContent = 'Neural Link Access';
        if (subtitleEl) subtitleEl.textContent = 'Authenticate to access your career matrix';
        if (submitText) submitText.textContent = 'Initialize Link';
        if (nameGroup) nameGroup.classList.add('hidden');
        if (confirmGroup) confirmGroup.classList.add('hidden');
        if (forgotLink) forgotLink.classList.remove('hidden');
        if (backLink) backLink.classList.add('hidden');
        if (passwordGroup) passwordGroup.classList.remove('hidden');
        if (switchText) {
            switchText.classList.remove('hidden');
            switchText.innerHTML = 'New agent? <span class="auth-link" onclick="switchAuthMode(\'signup\')">Create Neural ID</span>';
        }
        if (oauthSection) oauthSection.style.display = '';
        if (oauthButtons) oauthButtons.style.display = '';
    } else if (mode === 'signup') {
        if (titleEl) titleEl.textContent = 'Create Neural ID';
        if (subtitleEl) subtitleEl.textContent = 'Register your identity in the ZAARA system';
        if (submitText) submitText.textContent = 'Create Profile';
        if (nameGroup) nameGroup.classList.remove('hidden');
        if (confirmGroup) confirmGroup.classList.remove('hidden');
        if (forgotLink) forgotLink.classList.add('hidden');
        if (backLink) backLink.classList.add('hidden');
        if (passwordGroup) passwordGroup.classList.remove('hidden');
        if (switchText) {
            switchText.classList.remove('hidden');
            switchText.innerHTML = 'Already have access? <span class="auth-link" onclick="switchAuthMode(\'login\')">Login</span>';
        }
        if (oauthSection) oauthSection.style.display = '';
        if (oauthButtons) oauthButtons.style.display = '';
    } else if (mode === 'forgot') {
        if (titleEl) titleEl.textContent = 'Reset Access Key';
        if (subtitleEl) subtitleEl.textContent = 'Enter your email to receive a reset link';
        if (submitText) submitText.textContent = 'Send Reset Link';
        if (nameGroup) nameGroup.classList.add('hidden');
        if (confirmGroup) confirmGroup.classList.add('hidden');
        if (forgotLink) forgotLink.classList.add('hidden');
        if (backLink) backLink.classList.remove('hidden');
        if (passwordGroup) passwordGroup.classList.add('hidden');
        if (switchText) switchText.classList.add('hidden');
        if (oauthSection) oauthSection.style.display = 'none';
        if (oauthButtons) oauthButtons.style.display = 'none';
    }
}

// ── Form Submit Handler ─────────────────────────────────────────────
async function handleAuthSubmit(e) {
    e.preventDefault();
    hideAuthMessages();

    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;
    const name = document.getElementById('auth-name')?.value.trim();
    const confirmPw = document.getElementById('auth-confirm-password')?.value;
    const btn = document.getElementById('auth-submit-btn');
    const spinner = document.getElementById('auth-spinner');

    // Validation
    if (!email) {
        showAuthError('Please enter your email address.');
        return;
    }

    if (currentAuthMode !== 'forgot' && !password) {
        showAuthError('Please enter your access key (password).');
        return;
    }

    if (currentAuthMode === 'signup') {
        if (password.length < 6) {
            showAuthError('Access key must be at least 6 characters.');
            return;
        }
        if (password !== confirmPw) {
            showAuthError('Access keys do not match.');
            return;
        }
    }

    // Show loading state
    if (btn) btn.disabled = true;
    if (spinner) spinner.classList.add('visible');

    let result;

    if (currentAuthMode === 'login') {
        result = await ZaaraAuth.signIn(email, password);
        if (result.success) {
            showAuthSuccess('Access granted. Initializing neural link...');
            setTimeout(() => showAppContent(), 1200);
        } else {
            showAuthError(result.message);
        }
    } else if (currentAuthMode === 'signup') {
        result = await ZaaraAuth.signUp(email, password, name);
        if (result.success) {
            if (result.needsConfirmation) {
                showAuthSuccess(result.message);
            } else {
                showAuthSuccess('Neural ID created. Entering the matrix...');
                setTimeout(() => showAppContent(), 1200);
            }
        } else {
            showAuthError(result.message);
        }
    } else if (currentAuthMode === 'forgot') {
        result = await ZaaraAuth.resetPassword(email);
        if (result.success) {
            showAuthSuccess(result.message);
        } else {
            showAuthError(result.message);
        }
    }

    // Reset loading state
    if (btn) btn.disabled = false;
    if (spinner) spinner.classList.remove('visible');
}

// ── OAuth Handlers ──────────────────────────────────────────────────
async function loginWithGoogle() {
    const result = await ZaaraAuth.signInWithOAuth('google');
    if (!result.success) showAuthError(result.message);
}

async function loginWithGitHub() {
    const result = await ZaaraAuth.signInWithOAuth('github');
    if (!result.success) showAuthError(result.message);
}

// ── Logout Handler ──────────────────────────────────────────────────
async function logout() {
    const result = await ZaaraAuth.signOut();
    if (result.success) {
        showAuthView();
    }
}

// ── Password Visibility Toggle ──────────────────────────────────────
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('auth-password');
    const toggleBtn = document.getElementById('password-toggle');
    if (!passwordInput || !toggleBtn) return;

    const icon = toggleBtn.querySelector('i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ── Error / Success Messages ────────────────────────────────────────
function showAuthError(msg) {
    const el = document.getElementById('auth-error');
    if (el) {
        el.textContent = msg;
        el.classList.remove('hidden');
        el.classList.add('show');
    }
    const suc = document.getElementById('auth-success');
    if (suc) { suc.classList.add('hidden'); suc.classList.remove('show'); }
}

function showAuthSuccess(msg) {
    const el = document.getElementById('auth-success');
    if (el) {
        el.textContent = msg;
        el.classList.remove('hidden');
        el.classList.add('show');
    }
    const err = document.getElementById('auth-error');
    if (err) { err.classList.add('hidden'); err.classList.remove('show'); }
}

function hideAuthMessages() {
    const err = document.getElementById('auth-error');
    const suc = document.getElementById('auth-success');
    if (err) { err.classList.add('hidden'); err.classList.remove('show'); }
    if (suc) { suc.classList.add('hidden'); suc.classList.remove('show'); }
}

// ── Auth Background Particle Animation ──────────────────────────────
function initAuthParticles() {
    const canvas = document.getElementById('auth-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? '139, 92, 246' : '236, 72, 153'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });
}

// ── Auto-init on DOM Ready ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initAuthGate);
