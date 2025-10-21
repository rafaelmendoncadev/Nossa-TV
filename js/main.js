// Element references
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Initialize theme from localStorage
(function initTheme(){
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
})();

function updateThemeIcon(theme){
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

// Mobile menu toggle
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // close mobile nav
            if (navLinks) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// Counter
function animateCounter() {
    const counter = document.querySelector('.channels-counter');
    if (!counter) return;
    const target = parseInt(counter.dataset.target, 10) || 0;
    const duration = 2000;
    let start = null;

    function step(timestamp){
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        counter.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else counter.textContent = target;
    }

    // Observe visibility
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(step);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    obs.observe(counter);
}

// Animate elements on scroll
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.category-card, .feature-item, .plan-card, .section-header, .hero-text');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        obs.observe(el);
    });
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.getElementById('header');
    if (!header) return;
    let last = 0;
    window.addEventListener('scroll', () => {
        const cur = window.pageYOffset;
        if (cur > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        last = cur;
    }, { passive: true });
}

// Parallax for hero
function parallaxHero(){
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const text = hero.querySelector('.hero-text');
        if (text) {
            text.style.transform = `translateY(${scrolled * 0.06}px)`;
        }
    }, { passive: true });
}

// Plan modals
function setupPlanModals() {
    document.querySelectorAll('.plan-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planCard = e.target.closest('.plan-card');
            const planName = planCard ? (planCard.querySelector('.plan-name')?.textContent || planCard.querySelector('.plan-header .plan-name')?.textContent || 'Plano') : 'Plano';
            showModal(planName);
        });
    });
}

function showModal(planName){
    const modal = document.createElement('div'); modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Fechar">&times;</button>
            <h2>Você selecionou: ${planName}</h2>
            <p>Entre em contato para finalizar a compra ou aguarde o pagamento ser implementado no site.</p>
            <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;"><button class="modal-btn">Fechar</button></div>
        </div>`;

    const style = document.createElement('style');
    style.textContent = `
        .modal{position:fixed;inset:0;background:rgba(2,6,23,0.6);display:flex;align-items:center;justify-content:center;z-index:4000}
        .modal-content{background:var(--bg-secondary);color:var(--text-primary);padding:22px;border-radius:12px;max-width:520px;width:94%;box-shadow:var(--shadow-lg);text-align:center}
        .modal-close{position:absolute;right:18px;top:10px;background:none;border:none;font-size:26px;color:var(--text-secondary);cursor:pointer}
        .modal-btn{background:linear-gradient(90deg,#4facfe,#00f2fe);border:none;padding:10px 18px;border-radius:999px;color:white;font-weight:700}
    `;

    document.head.appendChild(style); document.body.appendChild(modal);
    function close(){ modal.remove(); style.remove(); }
    modal.querySelectorAll('.modal-close, .modal-btn').forEach(el=>el.addEventListener('click', close));
    modal.addEventListener('click', (ev)=>{ if (ev.target === modal) close(); });
}

// Lazy load images
function setupLazyLoading(){
    const images = document.querySelectorAll('img[data-src]');
    if (!('IntersectionObserver' in window)) { images.forEach(img=>{ if (img.dataset.src) img.src = img.dataset.src; }); return; }
    const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; img.classList.remove('lazy'); io.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 120px 0px' });
    images.forEach(i=>io.observe(i));
}

// Responsive image optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    images.forEach(img => {
        if (img.classList.contains('hero-mockup') && isMobile) {
            img.style.display = 'none';
        } else if (img.classList.contains('phone-mockup')) {
            if (isMobile) {
                img.style.maxWidth = '160px';
            } else if (isTablet) {
                img.style.maxWidth = '200px';
            }
        }
    });
}

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        optimizeImages();
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 860 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
}, { passive: true });

// Viewport height fix for mobile browsers
function setVhProperty() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVhProperty();
window.addEventListener('resize', debounce(setVhProperty, 100), { passive: true });

// Touch device detection and optimization
function detectTouchDevice() {
    const isTouch = ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0) || 
                    (navigator.msMaxTouchPoints > 0);
    
    if (isTouch) {
        document.body.classList.add('touch-device');
        
        // Improve touch scrolling on iOS
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

// Debounce
function debounce(fn, wait=100){ let t; return function(...a){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,a), wait); }; }

// Toast
function showToast(msg, time=3000){ const t = document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, time); }

// Init
document.addEventListener('DOMContentLoaded', () => {
    animateCounter();
    setupScrollAnimations();
    headerScrollEffect();
    parallaxHero();
    setupPlanModals();
    setupLazyLoading();
    optimizeImages();
    detectTouchDevice();

    // small welcome toast
    setTimeout(()=> showToast('Bem-vindo à Nossa TV!'), 1200);
});

// utility: detect mobile class
(function(){ if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) document.body.classList.add('mobile-device'); })();

// Analytics simulado (pode ser substituído por Google Analytics)
function trackEvent(action, category = 'User Interaction') {
    console.log(`Event tracked: ${category} - ${action}`);
    // Aqui você pode integrar com Google Analytics ou outro serviço
}

// Trackear cliques nos botões principais
document.querySelectorAll('.cta-button, .plan-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button Click', 'CTA');
    });
});

// Função para mostrar notificações (toast)
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2E7D32;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 300);
    }, duration);
}

// Exemplo de uso: showToast('Bem-vindo à Nossa TV!');
