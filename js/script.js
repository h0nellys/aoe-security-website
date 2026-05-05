// ===== DOM Elements =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');

// ===== Mobile Menu Toggle =====
if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    const isExpanded = nav.classList.contains('active');
    burger.setAttribute('aria-expanded', isExpanded);
  });
}

// ===== Close mobile menu on link click =====
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('active');
  });
});

// ===== Smooth Scroll Function =====
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const headerOffset = 80;
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Shadow on Scroll =====
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
    }
  }
});

// ===== Form Submission =====
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send data to server
    console.log('Form submitted:', data);
    
    // Show success message
    quoteForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Reset form
    quoteForm.reset();
    
    // Optional: Hide success message after 5 seconds and show form again
    setTimeout(() => {
      formSuccess.style.display = 'none';
      quoteForm.style.display = 'grid';
    }, 8000);
  });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.service-card, .industry-card, .review-card, .feature').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav__link').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--color-accent)';
    }
  });
});
