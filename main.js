/**
 * AVM School 3D Website JavaScript
 * Advanced 3D interactions and animations with comprehensive documentation
 * 
 * @author AVM School Development Team
 * @version 2.0
 * @date 2025
 * 
 * Features:
 * - 3D campus exploration with smooth transitions
 * - Interactive particle systems
 * - Advanced scroll animations
 * - Performance-optimized 3D effects
 * - Mobile-responsive interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all 3D functionality when DOM is ready
    initialize3DEffects();
    initializeAnimations();
    initializeParticleSystems();
    initializeScrollEffects();
    initializeCounters();
    initializeNavigation();
    initializeCampusExplorer();
    initializeAchievementCards();
    initializeButtonHandlers();
    initializeSmoothTransitions();
    optimizePerformance();
});

// =============================================================================
// 3D EFFECTS INITIALIZATION
// =============================================================================

/**
 * Initialize 3D hover effects for cards and interactive elements
 * Creates depth and rotation effects on hover for enhanced user experience
 */
function initialize3DEffects() {
    // 3D card hover effects - adds depth and rotation
    const cards3D = document.querySelectorAll('.card-3d');
    
    cards3D.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Apply 3D transformation on hover
            anime({
                targets: this,
                rotateX: 5,      // Slight upward tilt
                rotateY: 5,      // Slight right tilt
                translateY: -10, // Lift up
                scale: 1.02,     // Slight scale up
                duration: 600,   // Smooth transition
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Return to original state
            anime({
                targets: this,
                rotateX: 0,      // Reset tilt
                rotateY: 0,      // Reset tilt
                translateY: 0,   // Return to position
                scale: 1,        // Reset scale
                duration: 600,   // Smooth transition
                easing: 'easeOutCubic'
            });
        });
    });
    
    // 3D button effects - adds depth and elevation
    const buttons3D = document.querySelectorAll('.btn-3d');
    
    buttons3D.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Elevate button in 3D space
            anime({
                targets: this,
                translateZ: 10,  // Move forward
                scale: 1.05,     // Scale up slightly
                duration: 300,   // Quick response
                easing: 'easeOutCubic'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            // Return to original position
            anime({
                targets: this,
                translateZ: 0,   // Return to plane
                scale: 1,        // Reset scale
                duration: 300,   // Quick response
                easing: 'easeOutCubic'
            });
        });
    });
}

// =============================================================================
// ANIMATIONS INITIALIZATION
// =============================================================================

/**
 * Initialize text animations and typewriter effects
 * Creates engaging text reveals and typewriter animations for hero sections
 */
function initializeAnimations() {
    // Typewriter effect for hero text
    const typed = new Typed('#typed-text', {
        strings: [
            'Excellence in Education',
            '60 Years of Achievement',  // Updated for 60th anniversary
            'Home of Champions',
            'Where Dreams Take Flight',
            'Building Global Citizens'
        ],
        typeSpeed: 80,        // Typing speed in milliseconds
        backSpeed: 50,        // Backspacing speed
        backDelay: 2000,      // Delay before backspacing
        loop: true,           // Infinite loop
        showCursor: true,     // Show typing cursor
        cursorChar: '|'       // Cursor character
    });
}

// =============================================================================
// PARTICLE SYSTEMS
// =============================================================================

/**
 * Initialize particle systems for different sections
 * Creates ambient particle effects that enhance the 3D atmosphere
 */
function initializeParticleSystems() {
    // Hero section particles - creates ambient floating particles
    const heroParticles = new p5((p) => {
        let particles = [];
        const numParticles = 80;
        
        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particle-bg');
            
            // Initialize particle properties
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),    // Velocity X
                    vy: p.random(-0.5, 0.5),    // Velocity Y
                    size: p.random(2, 6),       // Particle size
                    opacity: p.random(0.1, 0.4), // Transparency
                    color: p.random(['gold', 'navy', 'white']) // Color theme
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            particles.forEach(particle => {
                // Update particle position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around screen edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Set particle color based on theme
                let color;
                switch(particle.color) {
                    case 'gold': color = [214, 158, 46]; break;
                    case 'navy': color = [26, 54, 93]; break;
                    case 'white': color = [255, 255, 255]; break;
                }
                
                // Draw particle
                p.fill(color[0], color[1], color[2], particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// =============================================================================
// SCROLL EFFECTS
// =============================================================================

/**
 * Initialize scroll-triggered reveal animations
 * Creates smooth reveal effects as elements enter the viewport
 */
function initializeScrollEffects() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger animation for child elements
                const staggerElements = entry.target.querySelectorAll('[class*="stagger-delay"]');
                staggerElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.2,           // Trigger when 20% visible
        rootMargin: '0px 0px -100px 0px' // Offset for early triggering
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-3d');
        if (hero) {
            // Apply parallax transformation
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// =============================================================================
// COUNTERS ANIMATION
// =============================================================================

/**
 * Initialize animated counters for statistics
 * Creates counting animations when statistics enter viewport
 */
function initializeCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds animation
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =============================================================================
// NAVIGATION
// =============================================================================

/**
 * Initialize smooth navigation and active state management
 * Handles smooth scrolling and navigation highlighting
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const scrolled = window.pageYOffset + 100;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// =============================================================================
// CAMPUS EXPLORER
// =============================================================================

/**
 * Initialize 3D campus exploration functionality
 * Creates smooth transitions and interactive campus exploration
 */
function initializeCampusExplorer() {
    const campusCards = document.querySelectorAll('.card-3d');
    
    campusCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Enhanced 3D click animation
            anime({
                targets: this,
                scale: [1, 1.05, 1],
                rotateY: [0, 10, 0],
                duration: 800,
                easing: 'easeOutElastic(1, .6)'
            });
            
            // Simulate 3D campus tour with detailed notification
            showCampusTourNotification();
        });
    });
}

/**
 * Show enhanced campus tour notification with detailed information
 * Provides users with clear feedback about the upcoming feature
 */
function showCampusTourNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-2xl z-50 transform translate-x-full max-w-md';
    
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <div class="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
            </div>
            <div class="ml-4 flex-1">
                <h4 class="font-bold text-lg mb-2">3D Campus Explorer</h4>
                <p class="text-sm opacity-90 mb-4">
                    Experience our 60-acre campus in immersive 3D! Walk through classrooms, explore facilities, and discover why AVM School leads in educational innovation.
                </p>
                <div class="flex items-center text-xs opacity-75">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Launching December 2025</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification entrance
    anime({
        targets: notification,
        translateX: 0,
        duration: 500,
        easing: 'easeOutCubic',
        complete: () => {
            // Auto-hide after 5 seconds
            setTimeout(() => {
                anime({
                    targets: notification,
                    translateX: '100%',
                    duration: 300,
                    easing: 'easeInCubic',
                    complete: () => {
                        notification.remove();
                    }
                });
            }, 5000);
        }
    });
}

// =============================================================================
// ACHIEVEMENT CARDS
// =============================================================================

/**
 * Initialize achievement card interactions
 * Adds 3D effects and animations to achievement displays
 */
function initializeAchievementCards() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Enhanced 3D effect for achievement cards
            anime({
                targets: this,
                scale: 1.02,
                rotateY: 2,
                rotateX: 2,
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Return to normal state
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
    });
}

// =============================================================================
// BUTTON HANDLERS
// =============================================================================

/**
 * Initialize button click handlers with ripple effects
 * Adds interactive feedback and handles button actions
 */
function initializeButtonHandlers() {
    const buttons = document.querySelectorAll('button, .btn-3d');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            
            // Create ripple effect for visual feedback
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Clean up ripple element
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle button actions with detailed responses
            handleButtonAction(text);
        });
    });
}

/**
 * Handle button actions with appropriate responses
 * @param {string} text - The button text to determine action
 */
function handleButtonAction(text) {
    const responses = {
        'Explore Campus': '3D Campus Explorer launching soon!',
        'View Achievements': 'Loading achievements gallery...',
        'Apply Now': 'Redirecting to admission portal...',
        'Schedule Visit': 'Opening campus visit scheduler...',
        'Take Virtual Tour': 'Starting immersive campus tour...',
        'View Full Story': 'Loading Ivana\'s complete journey...',
        'Championship Gallery': 'Opening 3D trophy gallery...',
        'Meet the Team': 'Loading team profiles...',
        'Virtual Tour': 'Launching virtual reality experience...',
        'Join Our Legacy': 'Opening admission application...'
    };
    
    const message = responses[text] || 'Feature coming soon!';
    showNotification(message);
}

// =============================================================================
// SMOOTH TRANSITIONS
// =============================================================================

/**
 * Initialize smooth transitions between sections
 * Creates seamless navigation experience
 */
function initializeSmoothTransitions() {
    // Add smooth page transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Add page transition effect
            if (href && href !== window.location.pathname.split('/').pop()) {
                e.preventDefault();
                
                // Fade out current page
                anime({
                    targets: 'body',
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInCubic',
                    complete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });
    
    // Fade in new page
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic'
    });
}

// =============================================================================
// PERFORMANCE OPTIMIZATION
// =============================================================================

/**
 * Optimize performance for different devices and conditions
 * Implements adaptive quality and reduced motion preferences
 */
function optimizePerformance() {
    // Detect low-end devices and reduce effects
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    // Detect slow connections
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('reduced-motion');
        }
    }
    
    // Pause particle systems when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations and particles
            document.body.classList.add('paused');
        } else {
            // Resume animations and particles
            document.body.classList.remove('paused');
        }
    });
    
    // Throttle scroll events for performance
    let ticking = false;
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Update parallax effects
        const hero = document.querySelector('.hero-3d');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Show notification messages with enhanced styling
 * @param {string} message - The notification message to display
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate notification entrance
    anime({
        targets: notification,
        translateX: 0,
        duration: 300,
        easing: 'easeOutCubic',
        complete: () => {
            // Auto-hide after 3 seconds
            setTimeout(() => {
                anime({
                    targets: notification,
                    translateX: '100%',
                    duration: 300,
                    easing: 'easeInCubic',
                    complete: () => {
                        notification.remove();
                    }
                });
            }, 3000);
        }
    });
}

/**
 * Preload critical images for better performance
 * Ensures smooth loading of essential visual assets
 */
function preloadCriticalImages() {
    const criticalImages = [
        'resources/hero-campus.jpg',
        'resources/ivana-portrait.jpg',
        'resources/achievement-trophy.jpg',
        'resources/campus-building.jpg',
        'resources/classroom-3d.jpg',
        'resources/new-logo-60years.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// =============================================================================
// CSS STYLES
// =============================================================================

// Add CSS for ripple effect and reduced motion
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .paused * {
        animation-play-state: paused !important;
    }
    
    /* Smooth page transitions */
    body {
        transition: opacity 0.3s ease;
    }
    
    /* Enhanced 3D performance */
    .card-3d, .btn-3d, .achievement-card {
        will-change: transform;
        transform-style: preserve-3d;
    }
    
    /* Better 3D rendering */
    .hero-3d, .section-3d {
        perspective: 1000px;
        transform-style: preserve-3d;
    }
`;
document.head.appendChild(style);

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize all functionality when DOM is ready
 * This is the main initialization function that coordinates all other initializations
 */
function initializeAll() {
    try {
        // Initialize core functionality
        initialize3DEffects();
        initializeAnimations();
        initializeParticleSystems();
        initializeScrollEffects();
        initializeCounters();
        initializeNavigation();
        initializeCampusExplorer();
        initializeAchievementCards();
        initializeButtonHandlers();
        initializeSmoothTransitions();
        optimizePerformance();
        preloadCriticalImages();
        
        // Log successful initialization
        console.log('AVM School 3D Website initialized successfully');
        
    } catch (error) {
        console.error('Error during initialization:', error);
        
        // Fallback to basic functionality
        document.body.classList.add('no-3d');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAll);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
        
        // Re-initialize if needed
        if (!document.body.classList.contains('initialized')) {
            initializeAll();
            document.body.classList.add('initialized');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Debounced resize handling
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        // Reinitialize particle systems if needed
        const particleCanvases = document.querySelectorAll('canvas');
        particleCanvases.forEach(canvas => {
            if (canvas.style.position === 'absolute') {
                // This is likely a particle canvas
                canvas.style.width = window.innerWidth + 'px';
            }
        });
    }, 250);
});

// Export for potential external use
window.AVMSchool = {
    initializeAll,
    showNotification,
    initializeCampusExplorer
};