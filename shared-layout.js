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
    min-width: 180px;
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
      projects: p === '/projects',
      solution: p === '/the-big-idea',
      bigIdea: p === '/the-big-idea',
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
    <a class="nav-link${flags.tripocalypse ? ' active' : ''}" href="/tripocalypse">Tripocalypse</a>

    <div class="nav-dropdown">
      <button class="nav-link nav-dropdown-trigger${flags.solution ? ' active' : ''}" aria-expanded="false" aria-haspopup="true" type="button">
        Solution <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div class="nav-dropdown-menu">
        <a href="/the-big-idea" class="nav-dropdown-item${flags.bigIdea ? ' active' : ''}">The Big Idea</a>
      </div>
    </div>

    <a href="/projects" class="nav-link${flags.projects ? ' active' : ''}">Projects</a>
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedLayout);
  } else {
    injectSharedLayout();
  }
})();
