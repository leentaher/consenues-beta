(function () {
  const style = `
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 900;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to bottom, #0a0a0a 0%, transparent 100%);
  }

  .nav-logo {
    font-weight: 600;
    font-size: 15px;
    color: #ffffff;
    letter-spacing: -0.02em;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    font-size: 13px;
    color: #909090;
    text-transform: lowercase;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .nav-link:hover {
    color: #ffffff;
  }

  .nav-link.active {
    color: #ffffff;
    border-bottom: 1px solid var(--red-500, #e7ff00);
    padding-bottom: 2px;
  }

  .nav-dropdown {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .nav-dropdown-trigger {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: #909090;
    text-transform: lowercase;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    margin: 0;
    transition: color 0.15s ease;
  }

  .nav-dropdown-trigger:hover,
  .nav-dropdown-trigger:focus-visible,
  .nav-dropdown-trigger.active {
    color: #ffffff;
    outline: none;
  }

  .dropdown-arrow {
    font-size: 10px;
    transition: transform 0.2s ease;
  }

  .nav-dropdown[open] .dropdown-arrow,
  .nav-dropdown:hover .dropdown-arrow {
    transform: rotate(180deg);
  }

  .nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 240px;
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px);
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
    z-index: 1000;
  }

  .nav-dropdown:hover .nav-dropdown-menu,
  .nav-dropdown[open] .nav-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-dropdown-item {
    display: block;
    padding: 10px 16px;
    color: #c4b5fd;
    font-size: 14px;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .nav-dropdown-item:hover,
  .nav-dropdown-item:focus-visible,
  .nav-dropdown-item.active {
    background: rgba(167, 139, 250, 0.08);
    color: #ffffff;
    outline: none;
  }

  .nav-cta {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    font-size: 13px;
    color: var(--red-400, #f7ff70);
    font-weight: 500;
    text-transform: lowercase;
    text-decoration: none;
  }

  .nav-cta:hover {
    color: var(--red-300, #fbff9e);
  }

  .footer {
    padding: 60px 40px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 40px;
  }

  .footer-brand {
    max-width: 400px;
  }

  .footer-logo {
    font-weight: 600;
    font-size: 15px;
    color: #ffffff;
    margin-bottom: 16px;
  }

  .footer-tagline {
    font-size: 14px;
    color: #707070;
    line-height: 1.7;
  }

  .footer-links {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }

  .footer-link {
    font-size: 13px;
    color: #707070;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .footer-link:hover {
    color: #ffffff;
  }

  .footer-copy {
    width: 100%;
    padding-top: 40px;
    border-top: 1px solid #1a1a1a;
    margin-top: 20px;
    font-size: 12px;
    color: #505050;
  }

  /* ============================================
     SHARED PANIC BUTTON + GLITCH OVERLAY
  ============================================ */
  .shared-panic-btn {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 80px;
    height: 80px;
    background: #0a0a0a;
    border: none;
    border-radius: 16px;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1.4;
    cursor: pointer;
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 20px rgba(255, 32, 32, 0.4),
      0 0 40px rgba(255, 32, 32, 0.3),
      0 0 60px rgba(255, 32, 32, 0.2);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
  }

  .shared-panic-btn:hover {
    transform: scale(1.08);
    background: #ff2020;
    color: #0a0a0a;
    box-shadow:
      0 0 30px rgba(255, 32, 32, 0.6),
      0 0 60px rgba(255, 32, 32, 0.4),
      0 0 90px rgba(255, 32, 32, 0.3);
  }

  .shared-panic-btn:active { transform: scale(0.96); }

  .shared-panic-btn span {
    display: block;
    line-height: 1.1;
  }

  .shared-glitch-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: #0a0a0a;
    z-index: 2000;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    text-align: center;
  }

  .shared-glitch-overlay.active { display: flex; }

  .shared-glitch-overlay .close-glitch {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: 1px solid #2a2a2a;
    color: #909090;
    padding: 10px 16px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    font-size: 12px;
    cursor: pointer;
    text-transform: lowercase;
  }

  .shared-glitch-overlay .close-glitch:hover {
    color: #ffffff;
    border-color: #404040;
  }

  .shared-glitch-overlay .emergency-text {
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    font-size: clamp(40px, 9vw, 96px);
    color: #ff2020;
    letter-spacing: 0.08em;
    margin-bottom: 24px;
  }

  .shared-glitch-overlay .emergency-sub {
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    font-size: 14px;
    color: #909090;
    max-width: 560px;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .shared-panic-btn {
      bottom: 24px;
      right: 24px;
      width: 72px;
      height: 72px;
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .nav {
      padding: 16px 24px;
    }

    .nav-links {
      display: none;
    }

    .nav-dropdown-menu {
      position: static;
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0 0 0 16px;
      opacity: 1;
      visibility: hidden;
      transform: none;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease, visibility 0.2s;
    }

    .nav-dropdown.open .nav-dropdown-menu {
      visibility: visible;
      max-height: 200px;
    }

    .nav-dropdown:hover .nav-dropdown-menu {
      opacity: 1;
      visibility: hidden;
    }

    .nav-dropdown.open .nav-dropdown-menu {
      visibility: visible;
    }

    .footer {
      padding: 40px 24px;
    }

    .footer-links {
      gap: 16px;
    }
  }
  `;

  function normalizePath(pathname) {
    let p = pathname || '/';
    if (p.endsWith('.html')) p = '/' + p.replace(/^\//, '').replace(/\.html$/, '');
    if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  }

  function activeFlags(pathname) {
    const p = normalizePath(pathname);
    return {
      tripocalypse: p === '/tripocalypse',
      projects: p === '/projects' || p === '/crashlab' || p === '/wont-get-fooled-again-act' || p === '/cost-of-waiting' || p === '/bigsim' || p === '/ai-convening' || p === '/abundance-101' || p === '/nc-news',
      projectsMain: p === '/projects',
      crashlab: p === '/crashlab',
      wgfaa: p === '/wont-get-fooled-again-act',
      costOfWaiting: p === '/cost-of-waiting',
      bigsim: p === '/bigsim',
      aiConvening: p === '/ai-convening',
      abundance101: p === '/abundance-101',
      ncNews: p === '/nc-news',
      solution: p === '/the-mission' || p === '/mission-for-america',
      mission: p === '/the-mission',
      evidence: p === '/mission-for-america',
      bigIdea: p === '/the-big-idea',
      intel: p === '/library' || p === '/blog' || p === '/press',
      library: p === '/library',
      blog: p === '/blog',
      press: p === '/press',
      about: p === '/team' || p === '/jobs' || p === '/contact',
      team: p === '/team',
      jobs: p === '/jobs',
      contact: p === '/contact'
    };
  }

  function buildHeader(flags) {
    return `
<nav class="nav">
  <a href="/" class="nav-logo">New Consensus</a>
  <div class="nav-links">
    <a class="nav-link${flags.tripocalypse ? ' active' : ''}" href="/tripocalypse">The Tripocalypse</a>
    <div class="nav-dropdown">
      <button class="nav-link nav-dropdown-trigger${flags.solution ? ' active' : ''}" aria-expanded="false" aria-haspopup="true" type="button">
        The Solution <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div class="nav-dropdown-menu">
        <a href="/the-mission" class="nav-dropdown-item${flags.mission ? ' active' : ''}">Mission for Humanity</a>
        <a href="/mission-for-america" class="nav-dropdown-item${flags.evidence ? ' active' : ''}">Mission for America</a>
      </div>
    </div>

    <div class="nav-dropdown">
      <button class="nav-link nav-dropdown-trigger${flags.projects ? ' active' : ''}" aria-expanded="false" aria-haspopup="true" type="button">
        Projects <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div class="nav-dropdown-menu">
        <a href="/projects" class="nav-dropdown-item${flags.projectsMain ? ' active' : ''}">Fish Tank</a>
        <a href="/crashlab" class="nav-dropdown-item${flags.crashlab ? ' active' : ''}">CrashLab</a>
        <a href="/wont-get-fooled-again-act" class="nav-dropdown-item${flags.wgfaa ? ' active' : ''}">The Won't Get Fooled Again Act</a>
        <a href="/cost-of-waiting" class="nav-dropdown-item${flags.costOfWaiting ? ' active' : ''}">The Cost of Waiting</a>
        <a href="/bigsim" class="nav-dropdown-item${flags.bigsim ? ' active' : ''}">BigSim</a>
        <a href="/ai-convening" class="nav-dropdown-item${flags.aiConvening ? ' active' : ''}">2026 AI Convening</a>
        <a href="/abundance-101" class="nav-dropdown-item${flags.abundance101 ? ' active' : ''}">Class: REAL Abundance 101</a>
        <a href="/nc-news" class="nav-dropdown-item${flags.ncNews ? ' active' : ''}">NC News</a>
      </div>
    </div>
    <div class="nav-dropdown">
      <button class="nav-link nav-dropdown-trigger${flags.intel ? ' active' : ''}" aria-expanded="false" aria-haspopup="true" type="button">
        Intel <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div class="nav-dropdown-menu">
        <a href="/library" class="nav-dropdown-item${flags.library ? ' active' : ''}">Library</a>
        <a href="/blog" class="nav-dropdown-item${flags.blog ? ' active' : ''}">Blog</a>
        <a href="/press" class="nav-dropdown-item${flags.press ? ' active' : ''}">Press</a>
      </div>
    </div>
    <div class="nav-dropdown">
      <button class="nav-link nav-dropdown-trigger${flags.about ? ' active' : ''}" aria-expanded="false" aria-haspopup="true" type="button">
        About <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div class="nav-dropdown-menu">
        <a href="/team" class="nav-dropdown-item${flags.team ? ' active' : ''}">Team</a>
        <a href="/jobs" class="nav-dropdown-item${flags.jobs ? ' active' : ''}">Jobs</a>
        <a href="/contact" class="nav-dropdown-item${flags.contact ? ' active' : ''}">Contact</a>
      </div>
    </div>
    <a href="/#join" class="nav-cta">Start serving</a>
  </div>
</nav>`;
  }

  function buildFooter() {
    return `
<footer class="footer">
  <div class="footer-brand">
    <div class="footer-logo">New Consensus</div>
    <p class="footer-tagline">
      An economic policy think tank for people who think "realistic" policy got us into this mess.
      Authors of the Green New Deal and Mission for America.
    </p>
  </div>
  <div class="footer-links">
    <a href="/team" class="footer-link">about</a>
    <a href="https://blog.newconsensus.com" class="footer-link" target="_blank" rel="noopener noreferrer">blog</a>
    <a href="/projects" class="footer-link">projects</a>
    <a href="/jobs" class="footer-link">jobs</a>
    <a href="https://x.com/newconsensus" class="footer-link" target="_blank" rel="noopener noreferrer">twitter</a>
  </div>
  <div class="footer-copy">
    © 2026 New Consensus. All rights reserved. (Assuming there's still a world to reserve rights in.)
  </div>
</footer>`;
  }

  function setupNavDropdown() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    if (!dropdowns.length) return;

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function setOpen(dropdown, open) {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      dropdown.classList.toggle('open', open);
      if (open) {
        dropdown.setAttribute('open', '');
      } else {
        dropdown.removeAttribute('open');
      }
      if (trigger) {
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    }

    function closeAll() {
      dropdowns.forEach((dropdown) => setOpen(dropdown, false));
    }

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        if (isMobile()) {
          e.preventDefault();
          setOpen(dropdown, !dropdown.classList.contains('open'));
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(dropdown, !dropdown.classList.contains('open'));
        }
        if (e.key === 'Escape') {
          setOpen(dropdown, false);
          trigger.blur();
        }
      });

      dropdown.addEventListener('mouseenter', () => {
        if (!isMobile()) setOpen(dropdown, true);
      });

      dropdown.addEventListener('mouseleave', () => {
        if (!isMobile()) setOpen(dropdown, false);
      });

      dropdown.addEventListener('focusout', (e) => {
        if (!dropdown.contains(e.relatedTarget)) {
          setOpen(dropdown, false);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        closeAll();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });
  }

  function injectPanicButton() {
    // If this page already has its own panic button, leave it alone.
    if (document.querySelector('.panic-btn')) return;
    if (document.getElementById('shared-panic-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'shared-panic-btn';
    btn.className = 'shared-panic-btn';
    btn.setAttribute('aria-label', 'Panic button');
    btn.innerHTML = '<span>PANIC</span>';
    document.body.appendChild(btn);

    // Reuse an existing overlay if the page already defines one.
    let overlay = document.getElementById('glitchOverlay')
      || document.querySelector('.glitch-overlay');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'glitchOverlay';
      overlay.className = 'shared-glitch-overlay';
      overlay.innerHTML = [
        '<button class="close-glitch" type="button" aria-label="close">\u00d7 close</button>',
        '<div class="emergency-text">DON\'T PANIC</div>',
        '<div class="emergency-sub">you found the panic button. now get back to work \u2014 there isn\'t much time.</div>'
      ].join('');
      document.body.appendChild(overlay);
    }

    function openOverlay() {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeOverlay() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Prefer any page-defined handlers so existing behavior on index/library/etc. wins.
    btn.addEventListener('click', function () {
      if (typeof window.triggerPanic === 'function') {
        window.triggerPanic();
      } else {
        openOverlay();
      }
    });

    const closeBtn = overlay.querySelector('.close-glitch');
    if (closeBtn && !closeBtn.onclick) {
      closeBtn.addEventListener('click', function () {
        if (typeof window.closeGlitch === 'function') {
          window.closeGlitch();
        } else {
          closeOverlay();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (typeof window.closeGlitch === 'function') {
          window.closeGlitch();
        } else {
          closeOverlay();
        }
      }
    });
  }

  function injectSharedLayout() {
    if (!document.getElementById('shared-layout-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'shared-layout-style';
      styleEl.textContent = style;
      document.head.appendChild(styleEl);
    }

    const flags = activeFlags(window.location.pathname);
    const headerHost = document.getElementById('site-header');
    const footerHost = document.getElementById('site-footer');

    if (headerHost) headerHost.innerHTML = buildHeader(flags);
    if (footerHost) footerHost.innerHTML = buildFooter();

    setupNavDropdown();
    injectPanicButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedLayout);
  } else {
    injectSharedLayout();
  }
})();
