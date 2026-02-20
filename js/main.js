// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initTheme();
    initForms();
    initTooltips();
    initCounters();
});

// ==================== PARTICLES.JS INITIALIZATION ====================
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: '#6366f1' 
                },
                shape: { 
                    type: 'circle' 
                },
                opacity: { 
                    value: 0.2, 
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: { 
                    value: 3, 
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { 
                        enable: true, 
                        mode: 'repulse' 
                    },
                    onclick: { 
                        enable: true, 
                        mode: 'push' 
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ==================== NAVIGATION ====================
function initNavigation() {
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class from all
        link.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Handle click events
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Handle login/logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .quarterly-card, .integration-card, ' +
        '.testimonial-card, .stat-card, .hero-content, .hero-image, ' +
        '.section-header, .feature-block, .info-item'
    );
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add delay based on index for staggered animation
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(2, 6, 23, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '30px 0';
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (mobileMenuBtn && navMenu && navButtons) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            navButtons.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// ==================== THEME TOGGLE ====================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// ==================== FORM HANDLING ====================
function initForms() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
    
    // Login form
    const loginForm = document.querySelector('.auth-form');
    if (loginForm && window.location.pathname.includes('login')) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(e);
        });
    }
    
    // Registration form
    const registerForm = document.querySelector('.auth-form');
    if (registerForm && window.location.pathname.includes('register')) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister(e);
        });
    }
}

// Submit contact form
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showToast('Login successful! Redirecting to dashboard...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard/overview.html';
        }, 1500);
    }, 1500);
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName')?.value;
    const lastName = document.getElementById('lastName')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const terms = document.getElementById('terms')?.checked;
    
    if (!firstName || !lastName || !email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!terms) {
        showToast('Please accept the terms and conditions', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showToast('Account created successfully! Check your email to verify.', 'success');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 2000);
}

// ==================== TOOLTIPS ====================
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-box';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--dark)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.border = '1px solid rgba(255,255,255,0.1)';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start counter when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==================== PASSWORD STRENGTH CHECKER ====================
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    
    return strength;
}

function updatePasswordStrength(password) {
    const strength = checkPasswordStrength(password);
    const strengthBar = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    const strengthDiv = strengthBar.closest('.password-strength');
    strengthDiv.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    
    if (password.length === 0) {
        strengthText.textContent = 'Enter password';
        strengthBar.style.width = '0%';
        return;
    }
    
    if (strength < 3) {
        strengthDiv.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
        strengthBar.style.width = '33%';
    } else if (strength < 5) {
        strengthDiv.classList.add('strength-medium');
        strengthText.textContent = 'Medium';
        strengthBar.style.width = '66%';
    } else {
        strengthDiv.classList.add('strength-strong');
        strengthText.textContent = 'Strong';
        strengthBar.style.width = '100%';
    }
}

// ==================== PASSWORD MATCH CHECKER ====================
function checkPasswordMatch(password, confirm) {
    if (!confirm) return '';
    
    if (password === confirm) {
        return '<span style="color: var(--success);"><i class="fas fa-check"></i> Passwords match</span>';
    } else {
        return '<span style="color: var(--danger);"><i class="fas fa-times"></i> Passwords do not match</span>';
    }
}

// ==================== API SIMULATION ====================
// Simulate API call
function simulateAPI(endpoint, data, delay = 1500) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API Call to ${endpoint}:`, data);
            resolve({ success: true, message: 'Operation completed successfully' });
        }, delay);
    });
}

// ==================== LOCAL STORAGE HELPERS ====================
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

function clearStorage() {
    localStorage.clear();
}

// ==================== COOKIE HELPERS ====================
function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// ==================== URL PARAMETERS ====================
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParameter(name, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
}

// ==================== VALIDATION HELPERS ====================
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ==================== FORMATTING HELPERS ====================
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function formatDate(date, options = {}) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    }).format(new Date(date));
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
        return formatDate(date);
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

// ==================== EXPORT FUNCTIONS ====================
// Make functions available globally
window.guruAI = {
    showToast,
    formatCurrency,
    formatNumber,
    formatDate,
    formatRelativeTime,
    isValidEmail,
    isValidPhone,
    saveToStorage,
    loadFromStorage,
    simulateAPI,
    checkPasswordStrength
};

// ==================== PRICING TOGGLE ====================
function togglePricing(period) {
    const monthlyBtn = document.querySelector('.toggle-btn:first-child');
    const yearlyBtn = document.querySelector('.toggle-btn:last-child');
    
    if (!monthlyBtn || !yearlyBtn) return;
    
    if (period === 'monthly') {
        monthlyBtn.classList.add('active');
        yearlyBtn.classList.remove('active');
        
        // Update prices to monthly
        const starterPrice = document.getElementById('starterPrice');
        const proPrice = document.getElementById('proPrice');
        const enterprisePrice = document.getElementById('enterprisePrice');
        
        if (starterPrice) starterPrice.innerHTML = '$49<span>/month</span>';
        if (proPrice) proPrice.innerHTML = '$99<span>/month</span>';
        if (enterprisePrice) enterprisePrice.innerHTML = '$199<span>/month</span>';
        
        // Update period text
        const starterPeriod = document.getElementById('starterPeriod');
        const proPeriod = document.getElementById('proPeriod');
        const enterprisePeriod = document.getElementById('enterprisePeriod');
        
        if (starterPeriod) starterPeriod.innerHTML = 'billed monthly';
        if (proPeriod) proPeriod.innerHTML = 'billed monthly';
        if (enterprisePeriod) enterprisePeriod.innerHTML = 'billed monthly';
        
    } else {
        monthlyBtn.classList.remove('active');
        yearlyBtn.classList.add('active');
        
        // Update prices to yearly (20% discount)
        const starterPrice = document.getElementById('starterPrice');
        const proPrice = document.getElementById('proPrice');
        const enterprisePrice = document.getElementById('enterprisePrice');
        
        if (starterPrice) starterPrice.innerHTML = '$470<span>/year</span>';
        if (proPrice) proPrice.innerHTML = '$950<span>/year</span>';
        if (enterprisePrice) enterprisePrice.innerHTML = '$1,910<span>/year</span>';
        
        // Update period text
        const starterPeriod = document.getElementById('starterPeriod');
        const proPeriod = document.getElementById('proPeriod');
        const enterprisePeriod = document.getElementById('enterprisePeriod');
        
        if (starterPeriod) starterPeriod.innerHTML = 'billed annually (save 20%)';
        if (proPeriod) proPeriod.innerHTML = 'billed annually (save 20%)';
        if (enterprisePeriod) enterprisePeriod.innerHTML = 'billed annually (save 20%)';
    }
}

// ==================== DEMO ACCESS ====================
function accessDemo() {
    showToast('Accessing demo dashboard...', 'info');
    
    setTimeout(() => {
        window.location.href = 'dashboard/overview.html';
    }, 1000);
}

// ==================== SOCIAL LOGIN ====================
function socialLogin(provider) {
    showToast(`Connecting to ${provider}...`, 'info');
    
    setTimeout(() => {
        showToast(`Successfully logged in with ${provider}!`, 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard/overview.html';
        }, 1500);
    }, 1500);
}

// ==================== LOGOUT ====================
function logout() {
    showToast('Logging out...', 'info');
    
    setTimeout(() => {
        // Clear session
        removeFromStorage('user');
        deleteCookie('session');
        
        showToast('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1000);
}

// ==================== SCROLL TO TOP ====================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== COPY TO CLIPBOARD ====================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

// ==================== PRINT PAGE ====================
function printPage() {
    window.print();
}

// ==================== REFRESH PAGE ====================
function refreshPage() {
    window.location.reload();
}

// ==================== GO BACK ====================
function goBack() {
    window.history.back();
}

// ==================== DETECT USER DEVICE ====================
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// ==================== DETECT BROWSER ====================
function getBrowser() {
    const ua = navigator.userAgent;
    
    if (ua.indexOf('Chrome') > -1) return 'chrome';
    if (ua.indexOf('Safari') > -1) return 'safari';
    if (ua.indexOf('Firefox') > -1) return 'firefox';
    if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) return 'ie';
    
    return 'unknown';
}

// ==================== CHECK ONLINE STATUS ====================
window.addEventListener('online', () => {
    showToast('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    showToast('You are offline. Some features may be unavailable.', 'warning');
});

// ==================== PAGE VISIBILITY ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        // Refresh data or perform actions when page becomes visible
    }
});

// ==================== BEFORE UNLOAD ====================
window.addEventListener('beforeunload', (e) => {
    // Check if there are unsaved changes
    const unsavedChanges = document.querySelectorAll('[data-unsaved]');
    
    if (unsavedChanges.length > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
});
