// JavaScript for Portfolio Website

// 1. Navbar Toggle for Mobile
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); // Change icon to 'X'
    navbar.classList.toggle('active'); // Show/hide navbar
};

// 2. Active Link Highlighting on Scroll & Smooth Scrolling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Adjusted offset for better activation
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky header
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// Smooth scrolling for navigation links
document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// 3. Typing Effect for Home Section
const typingTextSpan = document.querySelector('.typing-text span');
const words = ['Web Developer', 'Software Developer', 'UI/UX Designer', 'Youtuber', 'Gamer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingTextSpan.textContent = currentChar;

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentWord.length) {
            isDeleting = true;
            // Pause before deleting
            setTimeout(() => {
                // No action needed here, just a delay
            }, 1000);
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word
            // Pause before typing next word
            setTimeout(() => {
                // No action needed here, just a delay
            }, 500);
        }
    }
    setTimeout(typeEffect, isDeleting ? 75 : 150); // Typing speed
}

document.addEventListener('DOMContentLoaded', typeEffect); // Start typing effect on page load


// 4. Scroll Reveal Animations
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // 20% of the element must be visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            // observer.unobserve(entry.target); // Uncomment if you want animation to play only once
        } else {
            entry.target.classList.remove('show-animate'); // Revert when out of view
        }
    });
}, observerOptions);

sections.forEach(section => {
    // Skip the home section as it's already visible on load
    if (section.id !== 'home') {
        observer.observe(section);
    }
});


// 5. Form Submission (Basic)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // In a real application, you would send this data to a server
    // For now, we'll just show a success message.
    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const phone = this.querySelector('input[name="phone"]').value;
    const subject = this.querySelector('input[name="subject"]').value;
    const message = this.querySelector('textarea[name="message"]').value;

    // Display a custom alert/modal instead of window.alert
    showCustomAlert(`Thank you, ${name}! Your message has been sent. We will get back to you shortly.`);

    // Clear the form
    this.reset();
});

// Custom Alert Function (replaces window.alert)
function showCustomAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.innerHTML = `
        <div class="custom-alert-content">
            <p>${message}</p>
            <button class="custom-alert-close">OK</button>
        </div>
    `;
    document.body.appendChild(alertBox);

    // Style the custom alert
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-alert {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .custom-alert.show {
            opacity: 1;
            visibility: visible;
        }
        .custom-alert-content {
            background: var(--second-bg-color);
            color: var(--text-color);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        .custom-alert.show .custom-alert-content {
            transform: translateY(0);
        }
        .custom-alert-content p {
            font-size: 1.8rem;
            margin-bottom: 20px;
        }
        .custom-alert-close {
            background: var(--main-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.6rem;
            transition: background 0.3s ease;
        }
        .custom-alert-close:hover {
            background: var(--accent-color);
        }
    `;
    document.head.appendChild(style);

    // Show the alert
    setTimeout(() => alertBox.classList.add('show'), 10); // Small delay for transition

    // Close button functionality
    alertBox.querySelector('.custom-alert-close').addEventListener('click', () => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertBox);
            document.head.removeChild(style); // Clean up style tag
        }, 300); // Wait for fade out
    });

    // Close on outside click
    alertBox.addEventListener('click', (e) => {
        if (e.target === alertBox) {
            alertBox.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertBox);
                document.head.removeChild(style);
            }, 300);
        }
    });
}
