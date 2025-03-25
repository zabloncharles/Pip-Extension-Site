// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, install cards, and steps
document.querySelectorAll('.feature-card, .install-card, .step').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Add typing effect to the code window
const codeContent = document.querySelector('.code-content code');
const originalText = codeContent.textContent;
codeContent.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        codeContent.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect when the code window is in view
const codeWindow = document.querySelector('.code-window');
const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            codeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

codeObserver.observe(codeWindow);

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add step number animation
document.querySelectorAll('.step-number').forEach(number => {
    number.addEventListener('mouseenter', () => {
        number.style.transform = 'scale(1.1) rotate(360deg)';
        number.style.transition = 'transform 0.5s ease';
    });
    
    number.addEventListener('mouseleave', () => {
        number.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add Chrome store button hover effect
const storeButton = document.querySelector('.chrome-store .btn.primary');
if (storeButton) {
    storeButton.addEventListener('mouseenter', () => {
        storeButton.style.transform = 'scale(1.05)';
        storeButton.style.transition = 'transform 0.3s ease';
    });
    
    storeButton.addEventListener('mouseleave', () => {
        storeButton.style.transform = 'scale(1)';
    });
}

// Add stats counter animation
const stats = document.querySelectorAll('.stat span');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            let current = 0;
            const increment = value / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= value) {
                    target.textContent = value.toLocaleString() + '+';
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(current).toLocaleString() + '+';
                }
            }, stepTime);
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat)); 