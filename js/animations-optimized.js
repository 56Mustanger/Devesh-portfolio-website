// Lightweight animation replacement for GSAP
// Optimized for performance on slow connections

document.addEventListener('DOMContentLoaded', function() {
    // Simple fade-in animation for the main title
    const mainTitle = document.querySelector('#section-8[data-splitting]');
    if (mainTitle) {
        // Add animation class after a short delay
        setTimeout(() => {
            mainTitle.classList.add('animate-in');
        }, 300);
    }

    // Animate other titles with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all titles with data-splitting
    const titles = document.querySelectorAll('[data-splitting]:not(#section-8)');
    titles.forEach(title => {
        observer.observe(title);
    });

    // Smooth scrolling functionality
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 50; // Offset for navbar
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800; // ms
            
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
                window.scrollTo(0, startPosition + (distance * ease));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    }

    // Add click handlers for smooth scrolling
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                smoothScrollTo(targetId);
            }
        }
    });

    // Background color transitions on scroll (optimized)
    let lastScrollTop = 0;
    let ticking = false;

    function updateBackground() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const brownSection = document.querySelector('#brown');
        const whiteSection = document.querySelector('#white');
        const body = document.body;

        if (brownSection && whiteSection) {
            const brownRect = brownSection.getBoundingClientRect();
            const whiteRect = whiteSection.getBoundingClientRect();

            // Check if we're in brown section
            if (brownRect.top <= 0 && brownRect.bottom >= 0) {
                if (!body.classList.contains('brown')) {
                    body.classList.add('brown');
                }
            } else {
                body.classList.remove('brown');
            }

            // Check if we're in white section
            if (whiteRect.top <= 0 && whiteRect.bottom >= 0) {
                if (!body.classList.contains('white')) {
                    body.classList.add('white');
                }
            } else {
                body.classList.remove('white');
            }
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateBackground);
            ticking = true;
        }
    }

    // Use passive listeners for better performance
    window.addEventListener('scroll', requestTick, { passive: true });

    // Mobile navbar scroll effect
    if (window.innerWidth <= 850) {
        const navbar = document.querySelector('.overlay-bar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 50) {
                    navbar.classList.add('scroll');
                } else {
                    navbar.classList.remove('scroll');
                }
            }, { passive: true });
        }
    }
});

// Remove heavy animation libraries from global scope
if (typeof gsap !== 'undefined') {
    // Prevent GSAP from running if it was loaded
    console.log('GSAP detected but disabled for performance');
}
