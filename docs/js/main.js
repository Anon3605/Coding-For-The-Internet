// --- Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = ' <span>Light</span>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeToggle.innerHTML = isLight ? ' <span>Light</span>' : ' <span>Dark</span>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// --- Typed Text Effect ---
const phrases = [
    'CS Student @ BRAC University',
    'Aspiring Data Engineer',
    'Incident Responder',
    'Cybersecurity Enthusiast',
    'Open Source Contributor',
    'Tech Blogger',
    'Problem Solver',
    'Lifelong Learner'
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.querySelector('.typed-text');

function typeEffect() {
    if (!typedEl) return;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
        typedEl.textContent = currentPhrase.slice(0, charIdx - 1);
        charIdx--;
    } else {
        typedEl.textContent = currentPhrase.slice(0, charIdx + 1);
        charIdx++;
    }

    let delay = isDeleting ? 90 : 100;

    if (!isDeleting && charIdx === currentPhrase.length) {
        delay = 1800; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

// Start typed effect
setTimeout(typeEffect, 1000);

// --- Scroll Reveal ---
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// --- Active Navbar Link on Scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 80;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});

// --- Footer: Location & Last Modified ---
window.addEventListener('DOMContentLoaded', () => {
    const modifiedEl = document.getElementById('lastModified');
    const locationEl = document.getElementById('pageLocation');

    if (modifiedEl) {
        modifiedEl.textContent = `Last modified: ${document.lastModified}`;
    }

    if (locationEl) {
        locationEl.textContent = ` ${window.location.href}`;
    }
});

// --- Contact Form (Bonus) ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('fname').value.trim();
                const email = document.getElementById('femail').value.trim();
                const subject = document.getElementById('fsubject').value.trim();
                const message = document.getElementById('fmessage').value.trim();

                if (!name || !email || !message) {
                    showStatus('Please fill in all required fields.', 'error');
                    return;
                }

                // Build mailto link and open mail client
                const mailto = `mailto:md.arafat.sarkar@g.bracu.ac.bd` +
                    `?subject=${encodeURIComponent(subject || 'Message from Portfolio')}` +
                    `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailto;
    showStatus('Your mail client has been opened! Message ready to send.', 'success');
    contactForm.reset();
  });
}

function showStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.style.display = 'block';
  formStatus.style.color = type === 'success' ? 'var(--green)' : 'var(--danger)';
  formStatus.style.padding = '0.8rem 1rem';
  formStatus.style.border = `1px solid ${type === 'success' ? 'var(--green)' : 'var(--danger)'}`;
  formStatus.style.borderRadius = '8px';
  formStatus.style.marginTop = '1rem';
  formStatus.style.fontFamily = 'Courier New, monospace';
  formStatus.style.fontSize = '0.875rem';
  setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
}

// --- Navbar scroll shadow ---
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 1px 20px rgba(0,0,0,0.4)'
      : 'none';
  }
});