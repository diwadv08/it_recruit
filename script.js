// ===== Initial theme detection =====
(function() {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    html.setAttribute('data-theme', saved);
  } else {
    const prefers = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    html.setAttribute('data-theme', prefers);
  }
})();

const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

// Open menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
});

// Close menu
closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
});

// Close menu on overlay click
overlay.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
});

// ===== DOM interactions =====
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Toggle light/dark theme
  themeBtn?.addEventListener('click', () => {
    const html = document.documentElement;
    const cur = html.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Toggle mobile menu
  menuBtn?.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.classList.toggle("dark");
  });

  // ===== Roles data (static demo) =====
  const roles = [
    { title: 'Senior React Developer', type: 'Full-time', location: 'Remote • India', tags: ['React', 'TypeScript', 'Redux'] },
    { title: 'DevOps Engineer', type: 'Contract', location: 'Hybrid • Bengaluru', tags: ['AWS', 'Kubernetes', 'Terraform'] },
    { title: 'Data Engineer', type: 'Full-time', location: 'Remote • APAC', tags: ['Python', 'Airflow', 'Spark'] },
    { title: 'QA Automation Lead', type: 'Full-time', location: 'Chennai', tags: ['Selenium', 'Cypress', 'CI/CD'] },
    { title: 'Spring Boot Backend Engineer', type: 'Full-time', location: 'Remote • India', tags: ['Java', 'Spring Boot', 'PostgreSQL'] },
    { title: 'Mobile App Developer', type: 'Contract', location: 'Pune', tags: ['Flutter', 'Android', 'iOS'] }
  ];

  const list = document.getElementById('roleList');
  const search = document.getElementById('roleSearch');

  function render(items) {
    list.innerHTML = '';
    for (const r of items) {
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `
        <div>
          <div style="font-weight:700">${r.title}</div>
          <div style="color:var(--muted); font-size:.95rem">${r.location}</div>
        </div>
        <div class="pill">${r.type}</div>
        <a class="btn btn-outline apply" href="#contact">Apply</a>
      `;
      list.appendChild(row);
    }
  }
  render(roles);

  search?.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    const filtered = roles.filter(r => (r.title + ' ' + r.tags.join(' ') + ' ' + r.location).toLowerCase().includes(q));
    render(filtered);
  });

  // ===== Form validation =====
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    for (const el of form.querySelectorAll('input[required], select[required]')) {
      const row = el.closest('.row');
      if (!el.value) { row?.classList.add('invalid'); ok = false; }
      else { row?.classList.remove('invalid'); }
    }
    if (ok) {
      note.textContent = 'Thanks! Your message is ready to send. Hook this form to your email/API to receive submissions.';
      form.reset();
    }
  });
});
