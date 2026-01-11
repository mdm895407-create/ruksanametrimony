document.addEventListener('DOMContentLoaded', function() {
    
    // --- Sticky Header Logic ---
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            menuBtn.style.color = 'var(--primary)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                menuBtn.style.color = 'var(--white)';
            }
        }
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.querySelector('.stat-number')) {
                    animateCounters(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    animatedElements.forEach(el => observer.observe(el));

    // --- Counter Animation ---
    let counted = false;
    function animateCounters(container) {
        if (counted) return;
        
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
        counted = true;
    }

    // --- Contact Form Handling (Muslim Context) ---
     // --- Contact Form to WhatsApp Integration ---
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Page refresh hone se rokega

        // 1. User ne kya bhara hai wo uthao
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;
        const message = document.getElementById('message').value;

        // 2. Message format taiyar karo (Jo WhatsApp par dikhega)
        // %0a ka matlab "New Line" (Enter) hota hai
        const whatsappText = `*Salam Ruksana Ji, Website se nayi enquiry aayi hai!*%0a%0a` +
                     `👤 *Naam:* ${name}%0a` +
                     `📞 *Phone:* ${phone}%0a` +
                     `📍 *City:* ${city}%0a` +
                     `📝 *Zaroorat:* ${message}`;
        // 3. WhatsApp Link banao (Aapke number ke sath)
        const phoneNumber = "918087412984"; 
        const url = `https://wa.me/${phoneNumber}?text=${whatsappText}`;

        // 4. Button ka text change karo "Sending..." dikhane ke liye
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Opening WhatsApp...';
        
        setTimeout(() => {
            // 5. WhatsApp open karo
            window.open(url, '_blank');
            
            // Form wapis normal kar do
            btn.innerText = originalText;
            form.reset();
        }, 1000);
    });
}
});

// --- Typing Effect ---
const textElement = document.querySelector('.typing-text');
if(textElement) {
    const texts = ["Noble Matches. Pure Intentions.", "Trusted by 1500+ Families.", "Halal & Verified Rishtey."];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
        if (count === texts.length) { count = 0; }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        textElement.textContent = letter;
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Pause at end
        } else {
            setTimeout(type, 100); // Typing speed
        }
    }());
}

// --- FAQ Logic ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// --- 3D Tilt Effect ---
const cards = document.querySelectorAll('.profile-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // -5 deg max tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// --- Scroll to Top ---
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Preloader Remove Logic (Isse screen hategi) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0'; // Dheere se gayab hoga
        setTimeout(() => {
            preloader.style.display = 'none'; // Background me bhi hat jayega
        }, 500);
    }
});

// --- Fake Notification Logic ---
const messages = [
    "New Groom Profile added from Nanded!",
    "Success Story: Altaf & Sana got engaged.",
    "New Bride Profile: Doctor from Parbhani.",
    "Someone just viewed your profile.",
    "15 new biodatas received today."
];

const toast = document.getElementById('notification-toast');
const msgText = toast.querySelector('.toast-msg');

function showToast() {
    // Random message select karo
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    msgText.innerText = randomMsg;
    
    // Show toast
    toast.classList.add('show');
    
    // 5 second baad hide karo
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
    
    // Har 15-20 second baad wapis dikhao
    setTimeout(showToast, Math.random() * 10000 + 15000); 
}

// Page load hone ke 3 second baad pehli baar dikhao
setTimeout(showToast, 3000);

// Active Link Toggle for Mobile Nav
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Mobile Touch Feedback
document.querySelectorAll('.profile-card, .btn').forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
        this.style.transition = '0.1s';
    });
    button.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});

// Close Mobile Menu on Link Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('navLinks');
        const icon = document.querySelector('.mobile-menu-btn i');
        if(nav.classList.contains('active')) {
            nav.classList.remove('active');
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
});

