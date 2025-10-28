// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => observer.observe(bar));

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Set modal content based on which project was clicked
    const projectData = {
        'modal1': {
            title: 'RJBS JET Club',
            description: 'A comprehensive full-stack online educational platform featuring interactive learning modules, real-time collaboration tools, and advanced user management system.'
        },
        'modal2': {
            title: 'Task Management App',
            description: 'A productivity application with real-time updates, drag-and-drop functionality, and team collaboration features built with modern web technologies.'
        },
        'modal3': {
            title: 'Responsive Webpages',
            description: 'A collection of optimized web applications focusing on performance, accessibility, and user experience across all devices and screen sizes.'
        }
    };
    
    const data = projectData[modalId];
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
});

// EmailJS Integration for Contact Form
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("3Km8u7XqGfPFF76s-"); // You'll get this from EmailJS
    
    const contactForm = document.getElementById('contactForm');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Send email using EmailJS
        emailjs.send("lacrimosa14", "template_6p81wj7", {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "nnanyereanthony83@gmail.com"
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
        });
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
})();

// Alternative: Simple form submission without EmailJS
// Uncomment this if you don't want to use EmailJS

/*
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name') || this.querySelector('input[type="text"]').value;
    const email = formData.get('email') || this.querySelector('input[type="email"]').value;
    const message = formData.get('message') || this.querySelector('textarea').value;
    
    // Create mailto link as fallback
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = `mailto:nnanyereanthony83@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    alert('Thank you! Your email client will open to send the message.');
    this.reset();
});
*/

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add floating cards animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
});