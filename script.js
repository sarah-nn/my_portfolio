const projectData = {
  medixa: {
    kicker: '01 / Web · AI Systems',
    title: 'MediXa',
    subtitle: 'AI-Powered Smart Pharmacy Management & Medication Consultation System',
    description: 'An AI-powered pharmacy management web application designed to help pharmacists manage inventory, sales, subscriptions, and pharmacy operations while providing medication consultation support.',
    features: ['Pharmacy management', 'AI medication assistant', 'Retrieval-Augmented Generation (RAG)', 'Trusted medication knowledge base', 'Role-based access control', 'Pharmacy-specific data isolation', 'Inventory tracking', 'Alerts and decision support'],
    technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'ChromaDB', 'RAG', 'Gemini API'],
    engineering: 'A full-stack system shaped around clear boundaries, role-aware access, isolated pharmacy data, and retrieval grounded in a trusted knowledge base.',
    github: 'https://github.com/alaa-mw/MediXa'
  },
  ajyal: {
    kicker: '02 / Mobile · Education',
    title: 'Ajyal',
    subtitle: 'Educational Management System',
    description: 'An educational management platform designed for administrators, teachers, students, and parents.',
    features: ['Four-role architecture', 'Flutter application', 'BLoC state management', 'MVVM', 'QR-based parent login', 'Student progress tracking', 'Attendance monitoring', 'Firebase Push Notifications', 'Automated examination system', 'Tuition management'],
    technologies: ['Flutter', 'Dart', 'BLoC', 'MVVM', 'Firebase'],
    engineering: 'The project combines role-specific workflows with a maintainable Flutter architecture, predictable state management, and useful communication touchpoints for families.',
    github: 'https://github.com/Oula-Mh/Ajyal/'
  },
  unigo: {
    kicker: '03 / Mobile · Tourism',
    title: 'UNIGO',
    subtitle: 'Tourism Management System',
    description: 'A mobile tourism application that helps users discover destinations and organize travel experiences.',
    features: ['Hotel booking', 'Flight booking', 'Trip planning', 'Personalized recommendations', 'Customizable itineraries', 'Activities', 'Loyalty system'],
    technologies: ['Flutter', 'Dart', 'REST APIs'],
    engineering: 'A mobile-first experience that turns scattered travel decisions into a more coherent journey through planning tools, recommendations, and service integrations.',
    github: 'https://github.com/sarah-nn/tourism_project'
  },
  hospital: {
    kicker: '04 / ERP · Healthcare',
    title: 'Smart Mobile Hospital',
    subtitle: 'Odoo ERP Customization & Healthcare Simulation',
    description: 'A smart hospital simulation built using Odoo ERP concepts, combining healthcare workflows, logistics, access control, and simulated IoT data.',
    features: ['Python/XML Odoo module', 'Automated medical triage', 'Simulated IoT vital signs', 'Access rights matrix', 'Segregation of Duties', 'Inventory management', 'Fleet management', 'Lot/batch expiration tracking', 'Tele-triage', 'Offline disaster-zone workflows'],
    technologies: ['Python', 'XML', 'Odoo ERP', 'IoT Simulation', 'ERP'],
    engineering: 'The work explores how business rules, permissions, logistics, and operational resilience come together in a domain where traceability and clear access boundaries matter.',
    github: ''
  }
};

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealItems = [...document.querySelectorAll('.reveal')];
const modal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalKicker = document.querySelector('#modal-kicker');
const modalSubtitle = document.querySelector('#modal-subtitle');
const modalDescription = document.querySelector('#modal-description');
const modalFeatures = document.querySelector('#modal-features');
const modalTechnologies = document.querySelector('#modal-technologies');
const modalEngineering = document.querySelector('#modal-engineering');
const modalGithub = document.querySelector('#modal-github');
let lastFocusedElement;

function setMenuState(isOpen) {
  menuToggle.classList.toggle('is-open', isOpen);
  navMenu.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

menuToggle.addEventListener('click', () => setMenuState(!navMenu.classList.contains('is-open')));
navLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 15);
}

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 180;
  let currentId = 'home';
  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`));
}

window.addEventListener('scroll', () => {
  updateHeader();
  updateActiveNavigation();
}, { passive: true });
updateHeader();
updateActiveNavigation();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

function fillModal(project) {
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalSubtitle.textContent = project.subtitle;
  modalDescription.textContent = project.description;
  modalEngineering.textContent = project.engineering;
  modalFeatures.innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join('');
  modalTechnologies.innerHTML = project.technologies.map((technology) => `<span>${technology}</span>`).join('');
  modalGithub.hidden = !project.github;
  if (project.github) modalGithub.href = project.github;
}

function openModal(projectKey, trigger) {
  const project = projectData[projectKey];
  if (!project) return;
  lastFocusedElement = trigger;
  fillModal(project);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!modal.classList.contains('is-open')) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('.details-button').forEach((button) => {
  button.addEventListener('click', () => openModal(button.closest('[data-project]').dataset.project, button));
});
modal.addEventListener('click', (event) => {
  if (event.target.closest('[data-close-modal]')) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

function showFieldError(field, message) {
  field.classList.toggle('invalid', Boolean(message));
  field.setAttribute('aria-invalid', String(Boolean(message)));
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  error.textContent = message;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name')).trim();
  const email = String(formData.get('email')).trim();
  const message = String(formData.get('message')).trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  showFieldError(document.querySelector('#name'), name ? '' : 'Please enter your name.');
  showFieldError(document.querySelector('#email'), emailIsValid ? '' : 'Please enter a valid email.');
  showFieldError(document.querySelector('#message'), message ? '' : 'Please add a short message.');
  if (!name || !emailIsValid || !message) {
    formStatus.textContent = 'Please review the highlighted fields.';
    return;
  }
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
  formStatus.textContent = 'Opening your email client...';
  window.location.href = `mailto:saranajjar647@gmail.com?subject=${subject}&body=${body}`;
});
