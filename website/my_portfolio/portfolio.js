/* ==========================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   ========================================== */

// Video Background Handler
function initVideoBackground() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    // Try to play the video
    video.play().catch(error => {
        console.log('Video autoplay blocked or failed:', error);
        // Fallback: ensure overlay and gradient background are visible
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.background = 'linear-gradient(135deg, rgba(10, 30, 61, 0.95) 0%, rgba(26, 58, 92, 0.95) 100%)';
        }
    });

    // Handle video errors
    video.onerror = () => {
        console.log('Video failed to load');
        video.style.display = 'none';
    };

    // Handle video load
    video.onloadstart = () => {
        console.log('Video loading...');
    };

    video.oncanplay = () => {
        console.log('Video ready to play');
    };
}

// Dynamic Word Rotation for Hero Heading
function initDynamicWord() {
    const dynamicWord = document.getElementById('dynamicWord');
    if (!dynamicWord) return;

    const words = ['Meaningful Insights', 'Smart Decisions', 'Powerful Analytics', 'Data-Driven Results'];
    let currentWordIndex = 0;

    // Update word every 4 seconds (half of the 8s animation cycle)
    setInterval(() => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        dynamicWord.textContent = words[currentWordIndex];
    }, 4000);
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video background
    initVideoBackground();
    
    // Initialize dynamic word animation
    initDynamicWord();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.style.display = 'none';
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            if (navLinks) navLinks.style.display = 'none';
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.skill-card, .project-card, .education-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showMessage('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Show Message Function
function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(messageEl);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Add active nav link styling
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'var(--text-color)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
        }
    });
});

// Prevent animation on page load
window.addEventListener('load', () => {
    document.body.style.overscrollBehavior = 'smooth';
});

// Log portfolio loaded
console.log('✓ Anita Sajjad Professional Portfolio Loaded Successfully');
