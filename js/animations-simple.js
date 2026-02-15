// Simple working animations for Devesh's portfolio
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Splitting if available
    if (typeof Splitting !== 'undefined') {
        try {
            Splitting();
            console.log('Splitting initialized successfully');
        } catch (e) {
            console.log('Splitting failed:', e);
        }
    }
    
    // Simple fade-in for main title
    const mainTitle = document.querySelector('#section-8');
    if (mainTitle) {
        setTimeout(() => {
            mainTitle.classList.add('visible');
            console.log('Main title animated');
        }, 500);
    }
    
    // Smooth scrolling for all anchor links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
    
    // Background color changes on scroll
    function updateBackground() {
        const scrollTop = window.pageYOffset;
        const brownSection = document.querySelector('#brown');
        const whiteSection = document.querySelector('#white');
        const body = document.body;
        
        if (brownSection && whiteSection) {
            const brownTop = brownSection ? brownSection.offsetTop : 0;
            const whiteTop = whiteSection ? whiteSection.offsetTop : 0;
            
            // Brown section
            if (scrollTop >= brownTop - 100) {
                body.classList.add('brown');
            } else {
                body.classList.remove('brown');
            }
            
            // White section  
            if (scrollTop >= whiteTop - 100) {
                body.classList.add('white');
            } else {
                body.classList.remove('white');
            }
        }
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            updateBackground();
        });
    });
    
    // Initialize navbar active state
    if (typeof $ !== 'undefined') {
        try {
            $('.navbarfront .button:nth-child(2)').addClass('active');
            console.log('Navbar initialized');
        } catch (e) {
            console.log('Navbar initialization failed:', e);
        }
    }
    
    // Mobile scroll effect
    if (window.innerWidth <= 850) {
        const navbar = document.querySelector('.overlay-bar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 50) {
                    navbar.classList.add('scroll');
                } else {
                    navbar.classList.remove('scroll');
                }
            });
        }
    }
    
    console.log('Portfolio initialized successfully');
});
