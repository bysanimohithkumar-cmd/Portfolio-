/**
 * Portfolio Main JavaScript File
 * Tailored for Bysani Mohith Kumar - ECE Portfolio
 * Pure Vanilla ES6+ - Zero External Dependencies
 * Suitable for GitHub Pages hosting
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollSpy();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initContactForm();
  initCurrentYear();
});

/* ==========================================================================
   1. Theme Toggle (Light / Dark Mode)
   Default: Minimalist Light Theme
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');

  if (storedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Scroll Spy (Highlight active section in navbar)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   4. Project Filter Tabs
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (selectedFilter === 'all' || category === selectedFilter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Details Modal (Overview Data for Bysani Mohith Kumar)
   ========================================================================== */
const projectData = {
  p1: {
    category: "UAV & Aerospace Technology",
    title: "Trinetra – Survival UAV",
    img: "./assets/img/project-uav.svg",
    desc: "Designed and engineered the Trinetra Survival Unmanned Aerial Vehicle (UAV) concept created for emergency reconnaissance, search & rescue operations, and rapid delivery of survival telemetry in hazardous environments.",
    highlights: [
      "Engineered airframe conceptual design focused on flight stability, endurance, and emergency payload deployment.",
      "Integrated sensor payload considerations including thermal/optical cameras and environmental sensors.",
      "Designed telemetry communication protocols ensuring robust line-of-sight signal transmission.",
      "Recognized for innovative application in disaster relief and search-and-rescue response."
    ],
    contactUrl: "mailto:bysanimohithkumar@gmail.com?subject=Inquiry%20about%20Trinetra%20Survival%20UAV"
  },
  p2: {
    category: "Renewable Energy Harvesting & Mechanics",
    title: "Generation of Electricity Using Speed Breaker – Rolling Mechanism",
    img: "./assets/img/project-energy.svg",
    desc: "A clean energy harvesting mechanism that embeds rolling cylinders into roadway speed breakers. As vehicles drive over the hump, vehicular weight and momentum spin the rollers, driving high-efficiency dynamos to generate electrical power.",
    highlights: [
      "Designed a robust mechanical roller assembly capable of enduring high axle-load impacts.",
      "Coupled rotating rollers to dynamos through bearing shafts to convert linear vehicle kinetic energy into rotational mechanical energy.",
      "Developed energy storage circuitry with diodes and battery banks for continuous DC storage.",
      "Proposed for powering municipal street lights, speed sensors, and emergency roadside signals."
    ],
    contactUrl: "mailto:bysanimohithkumar@gmail.com?subject=Inquiry%20about%20Speed%20Breaker%20Rolling%20Mechanism"
  },
  p3: {
    category: "Mechanical Power Generation & Dynamics",
    title: "Generation of Electricity Using Speed Breaker – Gear Mechanism",
    img: "./assets/img/project-gear.svg",
    desc: "An advanced mechanical power generation model employing a rack, pinion, and spur gear train. The downward vertical displacement of vehicles pressing the speed breaker plate is multiplied through gear ratios to drive an electrical generator.",
    highlights: [
      "Formulated gear ratio calculations to maximize generator RPM from brief vehicular downward strokes.",
      "Integrated a one-way freewheel clutch ensuring unidirectional flywheel rotation regardless of stroke release.",
      "Engineered spring-return damping mechanisms to protect gear teeth from dynamic shock stresses.",
      "Demonstrated measurable output voltages across resistive load test benches."
    ],
    contactUrl: "mailto:bysanimohithkumar@gmail.com?subject=Inquiry%20about%20Speed%20Breaker%20Gear%20Mechanism"
  },
  p4: {
    category: "EDA Simulation & Digital Systems",
    title: "Cadence Virtuoso & MATLAB Circuit Simulations",
    img: "./assets/img/project-circuit.svg",
    desc: "Simulation and verification workflows for digital logic gates, sensor conditioning circuits, and signal analysis utilizing industry-standard Cadence Virtuoso and MATLAB numerical computing.",
    highlights: [
      "Simulated combinational and sequential digital logic circuits with timing analysis.",
      "Explored analog and mixed-signal design schematics in Cadence Virtuoso environment.",
      "Wrote MATLAB scripts for signal processing, filter response evaluation, and waveform graphing.",
      "Analyzed circuit stability, power dissipation parameters, and frequency responses."
    ],
    contactUrl: "mailto:bysanimohithkumar@gmail.com?subject=Inquiry%20about%20Cadence%20and%20MATLAB%20Work"
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('.view-details-trigger');

  if (!modal || !modalContent) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <img src="${data.img}" alt="${data.title}" class="modal-img" />
      <div class="modal-badge">${data.category}</div>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.desc}</p>
      
      <div class="modal-section-title">Key Technical Highlights:</div>
      <ul class="modal-features">
        ${data.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <div class="modal-actions">
        <a href="${data.contactUrl}" class="btn btn-primary btn-sm">
          <span>Inquire About Project</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </a>
        <a href="tel:+918333879474" class="btn btn-secondary btn-sm">
          <span>Call: +91 8333879474</span>
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = trigger.getAttribute('data-project');
      openModal(pId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailEl = document.getElementById('user-email-text');
  const tooltip = document.getElementById('copy-tooltip');

  if (!copyBtn || !emailEl || !tooltip) return;

  copyBtn.addEventListener('click', () => {
    const emailText = emailEl.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        showCopiedFeedback();
      }).catch(() => {
        fallbackCopy(emailText);
      });
    } else {
      fallbackCopy(emailText);
    }
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showCopiedFeedback();
    } catch (err) {
      console.error('Copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  function showCopiedFeedback() {
    tooltip.textContent = 'Copied! ✓';
    tooltip.classList.add('show');
    setTimeout(() => {
      tooltip.classList.remove('show');
      setTimeout(() => {
        tooltip.textContent = 'Copy';
      }, 200);
    }, 2000);
  }
}

/* ==========================================================================
   7. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').classList.add('visible');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      document.getElementById('email-error').classList.add('visible');
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      document.getElementById('subject-error').classList.add('visible');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      document.getElementById('message-error').classList.add('visible');
      isValid = false;
    }

    if (!isValid) return;

    // Compose mailto link for Bysani Mohith Kumar
    const toEmail = 'bysanimohithkumar@gmail.com';
    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
    const encodedBody = encodeURIComponent(
      `Hello Mohith,\n\nFrom: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`
    );

    const mailtoUrl = `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    if (formStatus) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Opening your email client to send message...';
      formStatus.style.display = 'block';
    }

    window.location.href = mailtoUrl;

    setTimeout(() => {
      form.reset();
      if (formStatus) {
        formStatus.textContent = 'Thank you! If your email client did not open automatically, please reach out directly at bysanimohithkumar@gmail.com or +91 8333879474.';
      }
    }, 1500);
  });
}

/* ==========================================================================
   8. Dynamic Copyright Year
   ========================================================================== */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
