/**
 * Satyam Patel - Main Portfolio Script
 * Interactive UI, live stats, heatmaps, and certificate viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initMobileMenu();
  initScrollProgress();
  initScrollReveal();
  initActiveNavSpy();
  initScrollToTop();
  initGitHubStats();
  initGitHubProjects();
  initLeetCodeStats();
  initHeatmaps();
  initCertificateModal();
  initContactForm();
  initCopyEmail();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const words = [
    'Frontend Developer',
    'MERN Stack Enthusiast',
    'Interested in Machine Learning',
    'Based in Lucknow, India'
  ];
  const textEl = document.getElementById('typewriter-text');
  if (!textEl) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 45;
  const delayBetweenWords = 1600;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      textEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      currentSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      currentSpeed = 400;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer || !overlay) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. ACTIVE NAVIGATION SPY
   ========================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   6. SCROLL TO TOP FLOATING BUTTON
   ========================================================================== */
function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   7. LIVE GITHUB STATS & CONTRIBUTIONS
   ========================================================================== */
function initGitHubStats() {
  const reposCountEl = document.getElementById('stat-repos-count');
  const heroReposCountEl = document.getElementById('hero-stat-repos');
  const commitsCountEl = document.getElementById('stat-commits-count');
  const heroContributionsEl = document.getElementById('hero-stat-contributions');

  // Fetch public repos from GitHub User API
  fetch('https://api.github.com/users/mrsatyampatel')
    .then(res => res.json())
    .then(data => {
      if (data && data.public_repos !== undefined) {
        if (reposCountEl) reposCountEl.textContent = `${data.public_repos}+`;
        if (heroReposCountEl) heroReposCountEl.textContent = `${data.public_repos}+`;
      }
    })
    .catch(() => {
      if (reposCountEl) reposCountEl.textContent = '4+';
      if (heroReposCountEl) heroReposCountEl.textContent = '4+';
    });

  // Fetch total contributions from Jogrubers API
  fetch('https://github-contributions-api.jogruber.de/v4/mrsatyampatel')
    .then(res => res.json())
    .then(data => {
      if (data && data.total) {
        let total = 0;
        for (const year in data.total) {
          if (!isNaN(year)) {
            total += data.total[year];
          }
        }
        if (total > 0) {
          if (commitsCountEl) commitsCountEl.textContent = `${total}+`;
          if (heroContributionsEl) heroContributionsEl.textContent = `${total}+`;
        }
      }
    })
    .catch(() => {
      if (commitsCountEl) commitsCountEl.textContent = '1061+';
      if (heroContributionsEl) heroContributionsEl.textContent = '1061+';
    });
}

/* --- Featured Projects --- */
const defaultProjects = [
  {
    title: 'Developer Portfolio',
    description: 'Personal developer portfolio built with semantic HTML5, modern CSS3, and JavaScript without external frameworks. Features live GitHub activity tracking, LeetCode analytics, and certificate modal viewer.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    github: 'https://github.com/mrsatyampatel/Portfolio',
    live: 'https://satyamportfolio-piii.vercel.app'
  },
  {
    title: 'Alumni Connect (SIH 2025)',
    description: 'University networking platform developed for Smart India Hackathon 2025 to connect students with alumni for mentorship, career advice, and community updates.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/mrsatyampatel/alumniconnectsih25-satyam',
    live: null
  },
  {
    title: 'Gas Alert Integration System',
    description: 'IoT-based hazard detection system using gas sensors to monitor indoor air quality and trigger instant alerts when toxic levels are detected.',
    tech: ['Python', 'IoT', 'Hardware Sensors', 'Alert APIs'],
    github: 'https://github.com/mrsatyampatel/GAS_ALERT_INTEGRATION',
    live: null
  },
  {
    title: 'Mangifera Shield',
    description: 'AI-assisted crop disease diagnostic tool for mango growers that detects leaf infections using computer vision and provides treatment recommendations.',
    tech: ['Machine Learning', 'Python', 'Computer Vision', 'Web'],
    github: 'https://github.com/mrsatyampatel/Mangifera-Shield-Satyam',
    live: null
  }
];

function initGitHubProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  renderProjects(defaultProjects, container);

  // Attempt to fetch dynamically from GitHub
  fetch('https://api.github.com/users/mrsatyampatel/repos?sort=updated&per_page=100')
    .then(res => res.json())
    .then(repos => {
      if (Array.isArray(repos) && repos.length > 0) {
        const merged = [...defaultProjects];

        repos.forEach(repo => {
          if (repo.fork || repo.name === 'mrsatyampatel') return;

          const exists = merged.some(p => 
            p.github && p.github.toLowerCase().endsWith(repo.name.toLowerCase())
          );

          if (!exists) {
            let tags = [];
            if (repo.topics && repo.topics.length > 0) {
              tags = repo.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1));
            } else if (repo.language) {
              tags = [repo.language];
            } else {
              tags = ['Web Tech'];
            }

            merged.push({
              title: repo.name.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
              description: repo.description || 'Open source software and systems engineering by Satyam Patel.',
              tech: tags,
              github: repo.html_url,
              live: repo.homepage || null
            });
          }
        });

        renderProjects(merged, container);
      }
    })
    .catch(() => {
      // Use fallback smoothly
    });
}

function renderProjects(projectsList, container) {
  container.innerHTML = '';

  projectsList.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = `project-card reveal delay-${(idx % 4) + 1} active`;

    const tagsHtml = proj.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

    let linksHtml = '';
    if (proj.github) {
      linksHtml += `
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link-action project-link-code">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          View Code
        </a>
      `;
    }
    if (proj.live) {
      linksHtml += `
        <a href="${proj.live}" target="_blank" rel="noopener noreferrer" class="project-link-action project-link-demo">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Live Demo
        </a>
      `;
    }

    card.innerHTML = `
      <div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">${tagsHtml}</div>
      </div>
      <div class="project-links-row">${linksHtml}</div>
    `;

    container.appendChild(card);
  });
}

/* ==========================================================================
   9. LEETCODE LIVE STATS
   ========================================================================== */
function initLeetCodeStats() {
  const easyEl = document.getElementById('lc-easy');
  const medEl = document.getElementById('lc-med');
  const hardEl = document.getElementById('lc-hard');
  const solvedEl = document.getElementById('lc-solved-badge');

  fetch('https://leetcode-stats-api.herokuapp.com/heyypatel')
    .then(res => res.json())
    .then(data => {
      if (data && data.status === 'success') {
        if (easyEl) easyEl.textContent = data.easySolved ?? '15+';
        if (medEl) medEl.textContent = data.mediumSolved ?? '10+';
        if (hardEl) hardEl.textContent = data.hardSolved ?? '2+';
        if (solvedEl && data.totalSolved) solvedEl.textContent = `${data.totalSolved} Solved`;
      }
    })
    .catch(() => {
      // Keep sensible default values
      if (easyEl) easyEl.textContent = '18+';
      if (medEl) medEl.textContent = '12+';
      if (hardEl) hardEl.textContent = '3+';
    });
}

/* ==========================================================================
   10. SUBMISSION ACTIVITY HEATMAPS (GFG & LeetCode)
   ========================================================================== */
const gfgSubmissions2026 = {
  '6-2': 2, '6-3': 4, '6-4': 1, '6-8': 3, '6-9': 5, '6-10': 2,
  '6-15': 3, '6-16': 4, '6-22': 2, '6-24': 3, '6-28': 1,
  '7-1': 2, '7-2': 3, '7-6': 1, '7-12': 2
};

const lcSubmissions2026 = {
  '5-14': 1, '5-18': 2, '5-22': 2,
  '6-5': 3, '6-11': 2, '6-18': 4, '6-25': 3,
  '7-4': 2, '7-15': 3, '7-20': 1
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function initHeatmaps() {
  buildBoard('gfg-heatmap-wrap', 'gfg', gfgSubmissions2026);
  buildBoard('lc-heatmap-wrap', 'lc', lcSubmissions2026);
}

function buildBoard(wrapId, theme, dataMap) {
  const wrapper = document.getElementById(wrapId);
  if (!wrapper) return;

  const tooltipBox = document.getElementById(`${theme}-tooltip-box`);
  wrapper.innerHTML = '';

  monthNames.forEach((month, mIdx) => {
    const col = document.createElement('div');
    col.className = 'heatmap-month-col';

    const grid = document.createElement('div');
    grid.className = 'heatmap-month-grid';

    const numDays = daysInMonths[mIdx];
    for (let d = 1; d <= numDays; d++) {
      const key = `${mIdx + 1}-${d}`;
      const count = dataMap[key] || 0;

      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';

      if (count > 0) {
        if (theme === 'gfg') {
          if (count === 1) cell.classList.add('cell-gfg-1');
          else if (count === 2) cell.classList.add('cell-gfg-2');
          else if (count === 3) cell.classList.add('cell-gfg-3');
          else cell.classList.add('cell-gfg-4');
        } else {
          if (count === 1) cell.classList.add('cell-lc-1');
          else if (count === 2) cell.classList.add('cell-lc-2');
          else if (count === 3) cell.classList.add('cell-lc-3');
          else cell.classList.add('cell-lc-4');
        }
      }

      cell.addEventListener('mouseenter', () => {
        if (tooltipBox) {
          tooltipBox.innerHTML = `
            <span class="heatmap-active-tooltip">
              <span class="badge-dot" style="background:${theme === 'gfg' ? '#059669' : '#d97706'}"></span>
              <strong>${count} submission${count === 1 ? '' : 's'}</strong> on ${month} ${d}, 2026
            </span>
          `;
        }
      });

      cell.addEventListener('mouseleave', () => {
        if (tooltipBox) {
          tooltipBox.innerHTML = `<span style="font-style:italic;color:#64748b;font-weight:500;">Hover over squares to see daily submissions</span>`;
        }
      });

      grid.appendChild(cell);
    }

    const label = document.createElement('span');
    label.className = 'heatmap-month-label';
    label.textContent = month.slice(0, 3);

    col.appendChild(grid);
    col.appendChild(label);
    wrapper.appendChild(col);
  });
}

/* ==========================================================================
   11. CERTIFICATE SHOWCASE & INTERACTIVE MODAL POPUP
   ========================================================================== */
const certificatesData = [
  {
    id: 1,
    title: "International Conference (ML in Algorithmic Trading)",
    organization: "Shri Ramswaroop Memorial University (SRMU) & IFBEC",
    location: "SRMU Campus, Lucknow-Deva Road, Barabanki, U.P.",
    date: "9th – 11th April, 2026",
    highlight: "Research Presentation",
    img: "certificates/International-Conference-ML-Trading.jpg",
    alt: "International Conference on Sustainable Innovation 2.0 Presentation - Satyam Patel",
    description: "Certificate of Participation for delivering an Offline Oral presentation on 'The Impact of Machine Learning on Algorithmic Trading: Strategies, Market Dynamics, and Regulatory Challenges' at the International Conference on Sustainable Innovation 2.0 (Bridging Research & Industry for a Resilient Future)."
  },
  {
    id: 2,
    title: "Smart India Hackathon 2026 (Coordinator)",
    organization: "Tech Fusion Club, SRMU | MoE's Innovation Cell & AICTE",
    location: "SRMU Campus, Lucknow-Deva Road, Barabanki, U.P.",
    date: "7th – 8th September, 2026",
    highlight: "Official Event Coordinator",
    img: "certificates/SIH-2026-Coordinator.jpg",
    alt: "Smart India Hackathon 2026 Coordinator Certificate of Appreciation - Satyam Patel",
    description: "Certificate of Appreciation for serving as an Event Coordinator for the Internal Round of Smart India Hackathon (SIH) 2026, leading management, logistics, and participant mentoring across rounds."
  },
  {
    id: 3,
    title: "Smart India Hackathon 2026 (Participant)",
    organization: "Ministry of Education (MoE), AICTE & SRMU",
    location: "SRMU Campus, Lucknow-Deva Road, Barabanki, U.P.",
    date: "September 2026",
    highlight: "Cleared Internal Round with Innovative Idea",
    isSIH: true,
    img: "certificates/SIH-2026-Participation.jpg",
    alt: "Smart India Hackathon 2026 Participation Certificate - Satyam Patel",
    description: "Participated as a B.Tech CSE (AI/ML) student in the internal round of Smart India Hackathon 2026. Successfully qualified and cleared the rigorous university internal round with our innovative idea and technical solution."
  },
  {
    id: 4,
    title: "Smart India Hackathon 2025 (Participant)",
    organization: "Ministry of Education (MoE), AICTE & SRMU",
    location: "SRMU Campus, Lucknow-Deva Road, Barabanki, U.P.",
    date: "September 2025",
    highlight: "Cleared Internal Round with Innovative Idea",
    isSIH: true,
    img: "certificates/SIH-2025-SRMU.png",
    alt: "Smart India Hackathon 2025 Participation Certificate - Satyam Patel",
    description: "Participated in the internal round of Smart India Hackathon 2025 as a B.Tech CSE (AI/ML) student. Successfully cleared the internal evaluation round by presenting an innovative, impactful problem-solving idea."
  },
  {
    id: 5,
    title: "VIVEKA 5.0 (Hack-A-Thon)",
    organization: "Tech Fusion Club & IQAC, SRMU",
    location: "SRMU Campus, Lucknow-Deva Road, Barabanki, U.P.",
    date: "18th – 20th February, 2026",
    highlight: "Techfest 2k26 Hack-A-Thon",
    img: "certificates/Viveka_5_Hackathon_Certificate.jpg",
    alt: "Viveka 5.0 Techfest Hack-A-Thon Participation Certificate - Satyam Patel",
    description: "Certificate of Participation in the Hack-A-Thon event at VIVEKA: The Intelligence 5.0 (Techfest 2k26) organized by Tech Fusion Club, SRMU. Built and presented software prototypes under tight deadlines."
  },
  {
    id: 6,
    title: "Hackfest Lucknow 2026",
    organization: "GDGoC SRMCEM x Major League Hacking (MLH)",
    location: "SRMCEM Campus, Lucknow, U.P.",
    date: "February 2026",
    highlight: "MLH Hackathon - Team Latent",
    img: "certificates/certificate-hackfest-srmcem.jpg",
    alt: "Hackfest Lucknow Participation Certificate - GDGoC SRMCEM x MLH - Satyam Patel",
    description: "Certificate of Participation proudly presented to Satyam Patel with Team Latent for building and pitching modern technology solutions at Hackfest Lucknow, organized by GDGoC SRMCEM in partnership with Major League Hacking (MLH)."
  },
  {
    id: 7,
    title: "Hackfest 2026 (Craftora & OSEN)",
    organization: "Craftora & OSEN (Powered by GDG, Render, ElevenLabs)",
    location: "Lucknow / Virtual",
    date: "2026",
    highlight: "Developer Community Hackathon",
    img: "certificates/certificate-hackfest-craftora.jpg",
    alt: "Hackfest 2026 Participation Certificate - Craftora & OSEN - Satyam Patel",
    description: "Awarded Certificate of Participation in Hackfest 2026 in recognition of dedication, creative teamwork, and technical contributions utilizing modern cloud & AI developer tools."
  },
  {
    id: 8,
    title: "Harmony'26 Technical Events",
    organization: "Tech Fusion Club, SRMU",
    location: "SRMU Campus, Lucknow-Deva Road, Barabanki, U.P.",
    date: "9th October, 2026",
    highlight: "Event Management Volunteer",
    img: "certificates/Harmony_26_Volunteer.jpg",
    pdfUrl: "certificates/Harmony_26_Volunteer_Certificate.pdf",
    alt: "Harmony'26 Event Volunteer Appreciation Certificate - Satyam Patel",
    description: "Certificate of Appreciation proudly presented to Satyam Patel for serving as an Event Volunteer in HARMONY'26 Technical Events, organized by Tech Fusion Club, SRMU on 9th October, 2026."
  }
];

let currentModalIndex = 0;

function initCertificateModal() {
  const grid = document.getElementById('certificates-grid');
  const modalBackdrop = document.getElementById('cert-modal-backdrop');
  const modalDialog = document.getElementById('cert-modal-dialog');
  const closeBtn = document.getElementById('modal-close-btn');
  const prevBtn = document.getElementById('modal-prev-btn');
  const nextBtn = document.getElementById('modal-next-btn');

  if (!grid || !modalBackdrop || !modalDialog) return;

  // Render Grid
  grid.innerHTML = '';
  certificatesData.forEach((cert, idx) => {
    const card = document.createElement('div');
    card.className = `cert-card reveal delay-${(idx % 3) + 1} active`;

    let thumbHtml = '';
    if (cert.img.endsWith('.pdf')) {
      thumbHtml = `
        <div class="cert-pdf-placeholder">
          <svg width="40" height="40" fill="none" stroke="#2563eb" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span style="font-size:0.75rem;color:#1d4ed8;font-weight:600;margin-top:0.5rem;">OFFICIAL DOCUMENT</span>
        </div>
      `;
    } else {
      thumbHtml = `
        <img src="${cert.img}" alt="${cert.alt}" class="cert-thumb-img" loading="lazy">
        <div class="cert-overlay-hover">
          <span class="cert-enlarge-pill">Click to Enlarge 🔍</span>
        </div>
      `;
    }

    let sihNoteHtml = '';
    if (cert.isSIH) {
      sihNoteHtml = `
        <div class="cert-sih-note">
          Qualified university internal round through prototype demonstration & review.
        </div>
      `;
    }

    card.innerHTML = `
      <div class="cert-thumb-box" onclick="openCertModal(${idx})">
        ${cert.highlight ? `<span class="cert-highlight-floating">${cert.highlight}</span>` : ''}
        ${thumbHtml}
      </div>
      <div class="cert-body">
        <div>
          <h3 class="cert-title" title="${cert.title}">${cert.title}</h3>
          <div class="cert-meta-row">
            <span class="cert-meta-item">
              <svg width="13" height="13" fill="none" stroke="#f87171" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${cert.location}
            </span>
            <span class="cert-meta-item">
              <svg width="13" height="13" fill="none" stroke="#60a5fa" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line></svg>
              ${cert.organization}
            </span>
          </div>
          <p class="cert-desc">${cert.description}</p>
          ${sihNoteHtml}
        </div>
        <div class="cert-footer-row">
          <button type="button" class="cert-view-btn" onclick="openCertModal(${idx})">
            View Full Details &rarr;
          </button>
          <a href="${cert.pdfUrl || cert.img}" download target="_blank" rel="noopener noreferrer" class="cert-dl-btn" title="Download Certificate">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Modal Handlers
  window.openCertModal = function(index) {
    currentModalIndex = index;
    updateModalContent();
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // REQUIREMENT: Open smoothly from the top
    modalDialog.scrollTop = 0;
  };

  window.closeCertModal = function() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeCertModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) window.closeCertModal();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentModalIndex = (currentModalIndex - 1 + certificatesData.length) % certificatesData.length;
      updateModalContent();
      modalDialog.scrollTop = 0;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentModalIndex = (currentModalIndex + 1) % certificatesData.length;
      updateModalContent();
      modalDialog.scrollTop = 0;
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modalBackdrop.classList.contains('open')) return;
    if (e.key === 'Escape') window.closeCertModal();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

function updateModalContent() {
  const cert = certificatesData[currentModalIndex];
  if (!cert) return;

  const mediaBox = document.getElementById('modal-media-box');
  const highlightEl = document.getElementById('modal-highlight');
  const titleEl = document.getElementById('modal-title');
  const orgEl = document.getElementById('modal-org');
  const locEl = document.getElementById('modal-loc');
  const dateEl = document.getElementById('modal-date');
  const descEl = document.getElementById('modal-desc');
  const sihEl = document.getElementById('modal-sih-note');
  const dlLink = document.getElementById('modal-dl-link');

  if (highlightEl) {
    if (cert.highlight) {
      highlightEl.textContent = cert.highlight;
      highlightEl.style.display = 'inline-flex';
    } else {
      highlightEl.style.display = 'none';
    }
  }

  if (titleEl) titleEl.textContent = cert.title;
  if (orgEl) orgEl.textContent = cert.organization || '';
  if (locEl) locEl.textContent = cert.location || '';
  if (dateEl) dateEl.textContent = cert.date || '';
  if (descEl) descEl.textContent = cert.description;

  if (sihEl) {
    sihEl.style.display = cert.isSIH ? 'block' : 'none';
  }

  if (mediaBox) {
    if (cert.img.endsWith('.pdf')) {
      mediaBox.innerHTML = `
        <iframe src="${cert.img}" class="modal-iframe" title="${cert.title}"></iframe>
      `;
    } else {
      mediaBox.innerHTML = `
        <img src="${cert.img}" alt="${cert.alt}" class="modal-img">
      `;
    }
  }

  if (dlLink) {
    dlLink.setAttribute('href', cert.pdfUrl || cert.img);
  }
}

/* ==========================================================================
   12. FUNCTIONAL CONTACT FORM (Web3Forms API)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin-slow">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      Sending...
    `;

    const formData = new FormData(form);
    formData.append('access_key', '28cea9de-7e82-4166-bfb6-ac711ae81b23');
    formData.append('subject', 'New Message from Satyam Patel Portfolio');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      }).then(r => r.json());

      if (res.success) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '🎉 Thank you! Your message has been sent successfully.';
        form.reset();
      } else {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Oops! Something went wrong. Please email directly at chandrayan2k23@gmail.com.';
      }
    } catch (err) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Network error. Please email directly at chandrayan2k23@gmail.com.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ==========================================================================
   13. QUICK COPY EMAIL ACTION
   ========================================================================== */
function initCopyEmail() {
  const badge = document.getElementById('copy-email-badge');
  if (!badge) return;

  badge.addEventListener('click', () => {
    const email = 'chandrayan2k23@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = badge.innerHTML;
      badge.innerHTML = `
        <span style="color:#34d399;font-weight:600;">✓ Email Copied to Clipboard!</span>
      `;
      setTimeout(() => {
        badge.innerHTML = originalText;
      }, 2500);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  });
}
