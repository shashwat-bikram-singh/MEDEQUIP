/* ========================================
   Animations Module
======================================== */

const Animations = {
    // Initialize all animations
    init() {
        this.setupScrollAnimations();
        this.setupParticles();
        this.setupCounters();
        this.setupRippleEffect();
        this.setupParallax();
    },

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Count animation for numbers
                    if (entry.target.querySelector('.stat-number[data-count]')) {
                        const counters = entry.target.querySelectorAll('.stat-number[data-count]');
                        counters.forEach(counter => this.animateCounter(counter));
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Also observe stat numbers directly
        document.querySelectorAll('.stat-number[data-count]').forEach(el => {
            const parentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        parentObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            parentObserver.observe(el);
        });
    },

    // Counter animation
    animateCounter(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    },

    // Particle effect for hero section
    setupParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 10 + 4;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.3 + 0.1};
            `;
            
            container.appendChild(particle);
        }
    },

    // Ripple effect for buttons
    setupRippleEffect() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            btn.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    },

    // Parallax effect
    setupParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroImage = hero.querySelector('.hero-image');
            
            if (heroImage && scrollY < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        });
    },

    // Smooth page transitions
    pageTransition(url) {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        requestAnimationFrame(() => {
            transition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        });
    },

    // Typing effect
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    },

    // Shake animation (for errors)
    shake(element) {
        element.classList.add('animate-shake');
        element.addEventListener('animationend', () => {
            element.classList.remove('animate-shake');
        }, { once: true });
    },

    // Smooth scroll to element
    scrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Loading state for buttons
    setLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    },

    // Fade in element
    fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = '';
        
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = Math.min(progress, 1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },

    // Fade out element
    fadeOut(element, duration = 300) {
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = Math.max(1 - progress, 0);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }
};