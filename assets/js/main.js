// Main JavaScript file
// Mobile-optimized with touch support

// Scroll to top on page load
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at top
  window.scrollTo(0, 0);
  // Detect touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.documentElement.classList.add('touch-device');
  }

  // Secure external links with rel="noopener noreferrer" for security
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('rel', 'noopener noreferrer');
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('#nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Store scroll position when menu opens
  let scrollPosition = 0;
  
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    navMenu.classList.remove('nav-open');
    menuToggle.classList.remove('menu-open');
    document.body.classList.remove('menu-active');
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  }

  function openMenu() {
    // Store current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    navMenu.classList.add('nav-open');
    menuToggle.classList.add('menu-open');
    document.body.classList.add('menu-active');
    
    // Focus first menu item for accessibility
    const firstLink = navMenu.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }
  
  if (menuToggle && navMenu) {
    // Handle both click and touch
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking on overlay
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
      });
      
      menuOverlay.addEventListener('touchstart', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('nav-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Handle window resize - close menu if resizing to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('nav-open')) {
          closeMenu();
        }
      }, 100);
    });
  }

  // Smooth scroll behavior for anchor links (respects reduced motion preference)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          // Set focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  // Add intersection observer for fade-in animations on scroll
  // Skip if user prefers reduced motion
  if (!prefersReducedMotion) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.hero-section, .hero-text, .hero-image').forEach(el => {
      observer.observe(el);
    });
  }

  // Prevent zoom on double-tap for buttons (iOS)
  if (isTouchDevice) {
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.click();
      });
    });
  }

  // Handle viewport height on mobile (accounts for browser chrome)
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // Set full app height for body min-height
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
  
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', function() {
    setTimeout(setViewportHeight, 100);
  });
});
