// ===== CONFIGURATION =====
// IMPORTANT: Replace with your EmailJS credentials
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',    // Get from EmailJS dashboard
    templateId: 'YOUR_TEMPLATE_ID',  // Get from EmailJS dashboard
    publicKey: 'YOUR_PUBLIC_KEY'     // Get from EmailJS dashboard
};

// ===== CERTIFICATES DATA =====
// Edit this array to add/remove certificates
const certificates = [
    {
        image: 'certificate1.jpg',
        title: 'Certificate Title 1',
        description: 'Short description of this certificate and what it represents.'
    },
    {
        image: 'certificate2.jpg',
        title: 'Certificate Title 2',
        description: 'Short description of this certificate and what it represents.'
    },
    {
        image: 'certificate3.jpg',
        title: 'Certificate Title 3',
        description: 'Short description of this certificate and what it represents.'
    },
    {
        image: 'certificate4.jpg',
        title: 'Certificate Title 4',
        description: 'Short description of this certificate and what it represents.'
    }
];

// ===== FRIENDS DATA =====
// Edit this array to add/remove friends
const friends = [
    {
        photo: 'friend1.jpg',
        name: 'Friend Name 1',
        description: 'How you know them and your friendship story.'
    },
    {
        photo: 'friend2.jpg',
        name: 'Friend Name 2',
        description: 'How you know them and your friendship story.'
    },
    {
        photo: 'friend3.jpg',
        name: 'Friend Name 3',
        description: 'How you know them and your friendship story.'
    },
    {
        photo: 'friend4.jpg',
        name: 'Friend Name 4',
        description: 'How you know them and your friendship story.'
    },
    {
        photo: 'friend5.jpg',
        name: 'Friend Name 5',
        description: 'How you know them and your friendship story.'
    }
];

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== CERTIFICATES CAROUSEL =====
const certificateCarousel = document.getElementById('certificateCarousel');
const certPrev = document.getElementById('certPrev');
const certNext = document.getElementById('certNext');
const certDots = document.getElementById('certDots');

let currentCertIndex = 0;

// Render certificates
function renderCertificates() {
    certificateCarousel.innerHTML = certificates.map((cert, index) => `
        <div class="certificate-card" data-index="${index}">
            <img src="${cert.image}" alt="${cert.title}" class="certificate-image" onerror="this.src='https://via.placeholder.com/350x200?text=Certificate+Image'">
            <h3 class="certificate-title">${cert.title}</h3>
            <p class="certificate-desc">${cert.description}</p>
        </div>
    `).join('');

    // Render dots
    certDots.innerHTML = certificates.map((_, index) => `
        <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
    `).join('');

    // Add click events to dots
    document.querySelectorAll('#certDots .dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            scrollToIndex(certificateCarousel, index, '.certificate-card');
            updateDots(certDots, index);
        });
    });
}

// Certificate navigation
certPrev.addEventListener('click', () => {
    const cards = certificateCarousel.querySelectorAll('.certificate-card');
    currentCertIndex = Math.max(0, currentCertIndex - 1);
    scrollToIndex(certificateCarousel, currentCertIndex, '.certificate-card');
    updateDots(certDots, currentCertIndex);
});

certNext.addEventListener('click', () => {
    const cards = certificateCarousel.querySelectorAll('.certificate-card');
    currentCertIndex = Math.min(cards.length - 1, currentCertIndex + 1);
    scrollToIndex(certificateCarousel, currentCertIndex, '.certificate-card');
    updateDots(certDots, currentCertIndex);
});

// ===== FRIENDS GALLERY =====
const friendsGallery = document.getElementById('friendsGallery');
const friendPrev = document.getElementById('friendPrev');
const friendNext = document.getElementById('friendNext');
const friendDots = document.getElementById('friendDots');

let currentFriendIndex = 0;

// Render friends
function renderFriends() {
    friendsGallery.innerHTML = friends.map((friend, index) => `
        <div class="friend-card" data-index="${index}">
            <img src="${friend.photo}" alt="${friend.name}" class="friend-photo" onerror="this.src='https://via.placeholder.com/120?text=Friend'">
            <h3 class="friend-name">${friend.name}</h3>
            <p class="friend-desc">${friend.description}</p>
        </div>
    `).join('');

    // Render dots
    friendDots.innerHTML = friends.map((_, index) => `
        <span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
    `).join('');

    // Add click events to dots
    document.querySelectorAll('#friendDots .dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            scrollToIndex(friendsGallery, index, '.friend-card');
            updateDots(friendDots, index);
        });
    });
}

// Friend navigation
friendPrev.addEventListener('click', () => {
    const cards = friendsGallery.querySelectorAll('.friend-card');
    currentFriendIndex = Math.max(0, currentFriendIndex - 1);
    scrollToIndex(friendsGallery, currentFriendIndex, '.friend-card');
    updateDots(friendDots, currentFriendIndex);
});

friendNext.addEventListener('click', () => {
    const cards = friendsGallery.querySelectorAll('.friend-card');
    currentFriendIndex = Math.min(cards.length - 1, currentFriendIndex + 1);
    scrollToIndex(friendsGallery, currentFriendIndex, '.friend-card');
    updateDots(friendDots, currentFriendIndex);
});

// ===== CAROUSEL HELPER FUNCTIONS =====
function scrollToIndex(container, index, cardSelector) {
    const card = container.querySelectorAll(cardSelector)[index];
    if (card) {
        const scrollLeft = card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2);
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

function updateDots(dotsContainer, activeIndex) {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Touch swipe support for carousels
function addSwipeSupport(container, onSwipeLeft, onSwipeRight) {
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            onSwipeLeft();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            onSwipeRight();
        }
    }
}

// Add swipe support to carousels
addSwipeSupport(
    certificateCarousel,
    () => certNext.click(),
    () => certPrev.click()
);

addSwipeSupport(
    friendsGallery,
    () => friendNext.click(),
    () => friendPrev.click()
);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'rein.sangma@gmail.com'
    };

    // Disable submit button
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            formData
        );

        if (response.status === 200) {
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        formStatus.textContent = '✗ Failed to send message. Please try WhatsApp instead.';
        formStatus.className = 'form-status error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    renderCertificates();
    renderFriends();

    // Add placeholder image for hero if not set
    const heroPhoto = document.getElementById('heroPhoto');
    if (!heroPhoto.src || heroPhoto.src.includes('placeholder-profile.jpg')) {
        heroPhoto.src = 'https://via.placeholder.com/200?text=Your+Photo';
    }
});

// ===== SMOOTH MORPHING ON SCROLL =====
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Morph blobs based on scroll
    document.querySelectorAll('.blob').forEach((blob, index) => {
        const rotation = scrollPercent * 360 * (index + 1);
        const scale = 1 + Math.sin(scrollPercent * Math.PI) * 0.2;
        blob.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c✨ Portfolio by Rein Sangma ✨', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cTo customize this website:', 'color: #f093fb; font-size: 14px;');
console.log('%c1. Edit certificates array in script.js', 'color: #43e97b;');
console.log('%c2. Edit friends array in script.js', 'color: #43e97b;');
console.log('%c3. Update EmailJS credentials', 'color: #43e97b;');
console.log('%c4. Replace placeholder images', 'color: #43e97b;');
