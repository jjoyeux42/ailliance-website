// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 500);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars when visible
            if (entry.target.classList.contains('expertise-item')) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.style.width;
                    progressFill.style.width = '0';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 100);
                }
            }
            
            // Stop observing this element once it's been animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not(#openModalBtn)').forEach(anchor => {
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

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('contact-modal');
const openModalBtn = document.getElementById('openModalBtn');
const openModalBtn2 = document.getElementById('openModalBtn2');
const closeModalBtn = document.getElementById('closeModalBtn');

// Function to open modal
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners for opening modal
if (openModalBtn) {
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
}

if (openModalBtn2) {
    openModalBtn2.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
}

// Event listener for closing modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal when clicking on overlay (outside modal content)
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Update mobile menu close to also handle modal buttons
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // If it's the modal button, don't close immediately
        if (link.id === 'openModalBtn') {
            // Modal will open, so we want menu closed
            return;
        }
    });
});

// Typing effect for hero title (optional)
const heroTitle = document.querySelector('.hero h1 span');
const words = ['grandir', 'innover', 'automatiser', 'transformer'];
let currentWord = 0;

function typeWord() {
    heroTitle.style.opacity = '0';
    setTimeout(() => {
        heroTitle.textContent = words[currentWord];
        heroTitle.style.opacity = '1';
        currentWord = (currentWord + 1) % words.length;
    }, 300);
}

// Start typing effect after 3 seconds, then every 4 seconds
setTimeout(() => {
    typeWord();
    setInterval(typeWord, 4000);
}, 3000);