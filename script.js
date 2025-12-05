
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Header scroll effect
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    function updateHeaderScroll() {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();
  }

  // Mobile nav
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
  }

  // Active navigation based on scroll position
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a[data-section]');
  
  function updateActiveNav() {
    var scrollPos = window.scrollY + 150;
    
    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Special case: at the top of the page, highlight "Start"
    if (window.scrollY < 100) {
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === 'hero') {
          link.classList.add('active');
        }
      });
    }
  }
  
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile nav if open
          if (mainNav && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
          }
        }
      }
    });
  });

  // Lightbox
  var overlay = document.getElementById('lightboxOverlay');
  var overlayImg = document.getElementById('lightboxImage');
  var overlayClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    if (!overlay || !overlayImg) return;
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.style.display = 'flex';
  }

  function closeLightbox() {
    if (!overlay || !overlayImg) return;
    overlay.style.display = 'none';
    overlayImg.src = '';
  }

  if (overlayClose) {
    overlayClose.addEventListener('click', closeLightbox);
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
  }

  document.querySelectorAll('.gallery-grid img, .project-image img').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  // Scroll-Reveal Animationen
  var revealElements = document.querySelectorAll('.card, .process-steps li, .benefit-card, .testimonial-card, .section-header, .contact-form');
  
  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function(el) {
      var elementTop = el.getBoundingClientRect().top;
      var revealPoint = 120;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });
  }
  
  // Initial check
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });

  // Kontaktformulare: lokal Demo, auf Server echter Versand
  document.querySelectorAll('.js-contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var href = window.location.href || '';
      var proto = window.location.protocol || '';
      var isLocal = proto === 'file:' || href.indexOf('content://') === 0;

      if (isLocal) {
        // Demo-Modus für lokale Vorschau (Acode, Datei-Ansicht)
        e.preventDefault();
        var success = form.querySelector('.form-success');
        if (success) {
          success.hidden = false;
          setTimeout(function () {
            success.hidden = true;
          }, 5000);
        }
        form.reset();
      } else {
        // Auf dem Webserver normale Übermittlung an send_mail.php (kein preventDefault)
      }
    });
  });
});
