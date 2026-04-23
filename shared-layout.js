(function () {
  const style = `
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 920;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom: 1px solid transparent;
    transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
  }

  .nav--scrolled {
    background: rgba(10, 10, 10, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
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
    right: 0;
    left: auto;
    min-width: 200px;
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
    color: var(--yellow, var(--red-400, #f7ff70));
    font-weight: 500;
    text-transform: lowercase;
    text-decoration: none;
  }

  .nav-cta:hover {
    color: var(--yellow-mid, var(--red-300, #fbff9e));
  }

  /* ============================================
     MOBILE NAV: HAMBURGER + DRAWER
  ============================================ */
  .nav-hamburger {
    display: none;
    background: none;
    border: none;
    padding: 8px;
    margin: -8px;
    cursor: pointer;
    color: #ffffff;
    z-index: 920;
  }

  .nav-hamburger-bars {
    display: block;
    width: 22px;
    height: 14px;
    position: relative;
  }

  .nav-hamburger-bars::before,
  .nav-hamburger-bars::after,
  .nav-hamburger-bars span {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.2s ease, top 0.25s ease;
  }

  .nav-hamburger-bars::before { top: 0; }
  .nav-hamburger-bars span    { top: 6px; }
  .nav-hamburger-bars::after  { top: 12px; }

  .nav-hamburger[aria-expanded="true"] .nav-hamburger-bars::before {
    top: 6px;
    transform: rotate(45deg);
  }
  .nav-hamburger[aria-expanded="true"] .nav-hamburger-bars span {
    opacity: 0;
  }
  .nav-hamburger[aria-expanded="true"] .nav-hamburger-bars::after {
    top: 6px;
    transform: rotate(-45deg);
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0a0a0a;
    z-index: 910;
    padding: 80px 24px 40px;
    overflow-y: auto;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
  }

  .mobile-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .mobile-menu-body {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-menu-link {
    display: block;
    padding: 16px 0;
    color: #ffffff;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    text-transform: lowercase;
    text-decoration: none;
    border-bottom: 1px solid #1a1a1a;
    transition: color 0.15s ease;
  }

  .mobile-menu-link:hover,
  .mobile-menu-link.active {
    color: var(--red-400, #f7ff70);
  }

  .mobile-menu-group {
    border-bottom: 1px solid #1a1a1a;
  }

  .mobile-menu-group-trigger {
    width: 100%;
    background: none;
    border: none;
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-family: inherit;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    text-transform: lowercase;
    cursor: pointer;
    text-align: left;
  }

  .mobile-menu-group-trigger .chev {
    font-size: 12px;
    color: #707070;
    transition: transform 0.2s ease;
  }

  .mobile-menu-group.open .mobile-menu-group-trigger .chev {
    transform: rotate(180deg);
  }

  .mobile-menu-group-items {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .mobile-menu-group.open .mobile-menu-group-items {
    max-height: 600px;
  }

  .mobile-menu-sublink {
    display: block;
    padding: 12px 0 12px 16px;
    color: #909090;
    font-size: 15px;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .mobile-menu-sublink:last-child {
    padding-bottom: 20px;
  }

  .mobile-menu-sublink:hover,
  .mobile-menu-sublink.active {
    color: #ffffff;
  }

  .mobile-menu-cta {
    display: inline-block;
    margin-top: 28px;
    padding: 14px 28px;
    background: var(--red-400, #f7ff70);
    color: #0a0a0a;
    font-size: 15px;
    font-weight: 600;
    text-transform: lowercase;
    text-decoration: none;
    border-radius: 100px;
    align-self: flex-start;
  }

  body.mobile-menu-lock {
    overflow: hidden;
  }

  .footer {
    display: block !important;
    padding: 0 !important;
    border-top: none !important;
    gap: 0 !important;
    background: #0a0a0a;
  }

  .footer-main {
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: start;
    gap: 48px;
    padding: 56px 48px 48px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .footer-brand {}

  .footer-logo {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em;
    text-decoration: none;
    display: block;
    margin-bottom: 12px;
  }

  .footer-tagline {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.65;
    margin: 0 0 20px;
  }

  .footer-social {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .footer-social-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .footer-social-link:hover {
    color: #ffffff;
  }

  .footer-nav {
    display: grid;
    grid-template-columns: repeat(5, max-content);
    gap: 8px 48px;
    justify-content: flex-end;
  }

  .footer-nav-col {}

  .footer-nav-label {
    font-size: 10px;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 10px;
    display: block;
  }

  .footer-link {
    display: block;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: color 0.15s ease;
    background: none;
    border: none;
    cursor: pointer;
    padding: 3px 0;
    font-family: inherit;
    line-height: 1.5;
  }

  .footer-link:hover {
    color: #ffffff;
  }

  .footer-cta-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 22px;
  }

  .footer-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    color: var(--red-400, #f7ff70);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.15s ease;
    white-space: nowrap;
  }

  .footer-cta:hover {
    color: #ffffff;
  }

  .footer-copy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 20px 48px;
    border-top: 1px solid rgba(255,255,255,0.07);
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    line-height: 1.5;
  }

  .footer-copy-link {
    color: rgba(255,255,255,0.25);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .footer-copy-link:hover {
    color: rgba(255,255,255,0.6);
  }

  .footer-copy-aside {
    font-style: italic;
    color: rgba(255,255,255,0.18);
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

  .panic-modal-wrap {
    display: none;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background: #000;
    align-items: center;
    justify-content: center;
  }

  .panic-modal-wrap.active { display: flex; }

  .pm-scanlines {
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px);
    pointer-events: none;
    z-index: 1;
  }

  .panic-modal {
    position: relative;
    width: 500px;
    max-width: 94vw;
    background: #060608;
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 2;
  }

  .panic-modal-header {
    padding: 9px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .panic-modal-header > div {
    display: flex;
    align-items: center;
  }

  .pm-rec-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff2a14;
    animation: pmBlink 1s step-end infinite;
    display: inline-block;
  }

  @keyframes pmBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  .pm-rec-label {
    font-size: 8px;
    letter-spacing: 0.28em;
    color: rgba(255,60,40,0.55);
    text-transform: uppercase;
    margin-left: 7px;
    vertical-align: middle;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    white-space: nowrap;
  }

  .pm-close-btn {
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.35);
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    padding: 4px 10px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
  }

  .pm-close-btn:hover { color: #fff; border-color: rgba(255,255,255,0.4); }

  .panic-modal-body {
    padding: 44px 52px 52px;
    text-align: center;
  }

  .pm-eyebrow {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #ff2a14;
    text-transform: uppercase;
    display: block;
    margin-bottom: 28px;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  }

  .pm-counter-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 6px;
  }

  .pm-counter-num {
    font-size: 46px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
    letter-spacing: -1px;
    font-variant-numeric: tabular-nums;
    display: block;
    position: relative;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  }

  .pm-ghost {
    position: absolute;
    inset: 0;
    font-size: 46px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
    pointer-events: none;
    opacity: 0;
    transition: none;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  }

  .pm-ghost-r { color: rgba(255,30,10,0.6); }
  .pm-ghost-b { color: rgba(0,170,255,0.4); }

  .pm-counter-sub {
    font-size: 8px;
    letter-spacing: 0.28em;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    display: block;
    margin-top: 10px;
    margin-bottom: 36px;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  }

  .pm-rule {
    width: 28px;
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 0 auto 32px;
  }

  .pm-headline {
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    line-height: 1.75;
    letter-spacing: 0.03em;
    margin-bottom: 22px;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  }

  .pm-body-text {
    font-size: 10px;
    color: rgba(255,255,255,0.55);
    line-height: 2;
    letter-spacing: 0.03em;
    font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  }

  .pm-glitch-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    opacity: 0;
    pointer-events: none;
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

    .nav-hamburger {
      display: inline-flex;
    }

    .footer-main {
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 40px 24px 32px;
    }

    .footer-cta-col {
      align-items: flex-start;
      padding-top: 0;
    }

    .footer-nav {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .footer-nav-label {
      display: none;
    }

    .footer-link {
      padding: 8px 0;
      font-size: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .footer-copy {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 20px 24px;
      margin-bottom: 100px;
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
      library: p === '/library',
      blog: p === '/blog',
      press: p === '/press',
      about: p === '/team' || p === '/jobs' || p === '/contact' || p === '/library' || p === '/blog' || p === '/press',
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
    <a class="nav-link${flags.evidence ? ' active' : ''}" href="/mission-for-america">The Mission</a>

    <a class="nav-link${flags.projects ? ' active' : ''}" href="/projects">projects</a>
    <div class="nav-dropdown">
      <button class="nav-link nav-dropdown-trigger${flags.about ? ' active' : ''}" aria-expanded="false" aria-haspopup="true" type="button">
        About <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div class="nav-dropdown-menu">
        <a href="/team" class="nav-dropdown-item${flags.team ? ' active' : ''}">Team</a>
        <a href="/jobs" class="nav-dropdown-item${flags.jobs ? ' active' : ''}">Jobs</a>
        <a href="/press" class="nav-dropdown-item${flags.press ? ' active' : ''}">Press</a>
        <a href="/library" class="nav-dropdown-item${flags.library ? ' active' : ''}">Library</a>
        <a href="/blog" class="nav-dropdown-item${flags.blog ? ' active' : ''}">Blog</a>
        <a href="/contact" class="nav-dropdown-item${flags.contact ? ' active' : ''}">Contact</a>
      </div>
    </div>
    <a href="/#join" class="nav-cta">Start serving</a>
  </div>
  <button class="nav-hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
    <span class="nav-hamburger-bars"><span></span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <div class="mobile-menu-body">
    <a class="mobile-menu-link${flags.tripocalypse ? ' active' : ''}" href="/tripocalypse">The Tripocalypse</a>
    <a class="mobile-menu-link${flags.evidence ? ' active' : ''}" href="/mission-for-america">The Mission</a>

    <a class="mobile-menu-link${flags.projects ? ' active' : ''}" href="/projects">projects</a>

    <div class="mobile-menu-group${flags.about ? ' open' : ''}">
      <button class="mobile-menu-group-trigger" type="button" aria-expanded="${flags.about ? 'true' : 'false'}">
        About <span class="chev">&#9660;</span>
      </button>
      <div class="mobile-menu-group-items">
        <a href="/team" class="mobile-menu-sublink${flags.team ? ' active' : ''}">Team</a>
        <a href="/jobs" class="mobile-menu-sublink${flags.jobs ? ' active' : ''}">Jobs</a>
        <a href="/press" class="mobile-menu-sublink${flags.press ? ' active' : ''}">Press</a>
        <a href="/library" class="mobile-menu-sublink${flags.library ? ' active' : ''}">Library</a>
        <a href="/blog" class="mobile-menu-sublink${flags.blog ? ' active' : ''}">Blog</a>
        <a href="/contact" class="mobile-menu-sublink${flags.contact ? ' active' : ''}">Contact</a>
      </div>
    </div>

    <a href="/#join" class="mobile-menu-cta">Start serving</a>
  </div>
</div>`;
  }

  function buildFooter() {
    return `
<footer class="footer">
  <div class="footer-main">

    <div class="footer-brand">
      <a href="/" class="footer-logo">New Consensus</a>
      <p class="footer-tagline">An economic policy think tank for people who think &ldquo;realistic&rdquo; policy got us into this mess. Authors of the Green New Deal and Mission for America.</p>
      <div class="footer-social">
        <a href="https://x.com/newconsensus" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
          X / Twitter
        </a>
        <a href="https://newconsensus.substack.com" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Substack">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
          Substack
        </a>
      </div>
    </div>

    <nav class="footer-nav" aria-label="Footer navigation">
      <div class="footer-nav-col">
        <span class="footer-nav-label">The Problem</span>
        <a href="/tripocalypse" class="footer-link">Tripocalypse</a>
      </div>
      <div class="footer-nav-col">
        <span class="footer-nav-label">The Solution</span>
        <a href="/mission-for-america" class="footer-link">Mission for America</a>
      </div>
      <div class="footer-nav-col">
        <span class="footer-nav-label">The Projects</span>
        <a href="/crashlab" class="footer-link">CrashLab</a>
        <a href="/wont-get-fooled-again-act" class="footer-link">Won&rsquo;t Get Fooled Again Act</a>
        <a href="/cost-of-waiting" class="footer-link">The Cost of Waiting</a>
      </div>
      <div class="footer-nav-col">
        <span class="footer-nav-label">The Intel</span>
        <a href="/library" class="footer-link">Library</a>
        <a href="https://newconsensus.substack.com" class="footer-link" target="_blank" rel="noopener noreferrer">Blog</a>
        <a href="/press" class="footer-link">Press</a>
      </div>
      <div class="footer-nav-col">
        <span class="footer-nav-label">The Team</span>
        <a href="/team" class="footer-link">About</a>
        <a href="/jobs" class="footer-link">Jobs</a>
        <a href="/contact" class="footer-link">Contact</a>
      </div>
    </nav>


  </div>
  <div class="footer-copy">
    <span>&copy; 2026 New Consensus. All rights reserved. <span class="footer-copy-aside">(Assuming there&rsquo;s still a world to reserve rights in.)</span></span>
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

  function setupMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!hamburger || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('mobile-menu-lock', open);
    }

    hamburger.addEventListener('click', () => {
      setOpen(!menu.classList.contains('open'));
    });

    menu.querySelectorAll('.mobile-menu-link, .mobile-menu-sublink, .mobile-menu-cta').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });

    menu.querySelectorAll('.mobile-menu-group').forEach((group) => {
      const trigger = group.querySelector('.mobile-menu-group-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const willOpen = !group.classList.contains('open');
        group.classList.toggle('open', willOpen);
        trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setOpen(false);
        hamburger.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && menu.classList.contains('open')) {
        setOpen(false);
      }
    });
  }

  function injectPanicButton() {
    // Inject the shared modal once
    if (!document.getElementById('shared-panic-modal')) {
      const wrap = document.createElement('div');
      wrap.id = 'shared-panic-modal';
      wrap.className = 'panic-modal-wrap';
      wrap.innerHTML = `
<div class="pm-scanlines"></div>
<div class="panic-modal" id="pm-box">
  <div class="pm-glitch-line" id="pm-g1"></div>
  <div class="pm-glitch-line" id="pm-g2"></div>
  <div class="panic-modal-header">
    <div>
      <span class="pm-rec-dot"></span>
    </div>
    <button class="pm-close-btn" id="pm-close">&times; close (fine, I&rsquo;ll help)</button>
  </div>
  <div class="panic-modal-body">
    <span class="pm-eyebrow">don&rsquo;t panic</span>
    <div class="pm-counter-wrap">
      <span class="pm-ghost pm-ghost-r" id="pm-ghost-r"></span>
      <span class="pm-ghost pm-ghost-b" id="pm-ghost-b"></span>
      <span class="pm-counter-num" id="pm-counter"></span>
    </div>
    <span class="pm-counter-sub">days to get everything in place</span>
    <div class="pm-rule"></div>
    <p class="pm-body-text">The 2029 administration needs a plan and people to staff it. We&rsquo;re writing the plan. You could be one of the people.</p>
  </div>
</div>`;
      document.body.appendChild(wrap);

      function getDays() {
        const t = new Date('2029-01-20');
        t.setHours(0,0,0,0);
        const n = new Date();
        n.setHours(0,0,0,0);
        return Math.ceil((t - n) / 864e5);
      }

      function updateCounter() {
        const d = getDays().toLocaleString();
        const el = document.getElementById('pm-counter');
        const gr = document.getElementById('pm-ghost-r');
        const gb = document.getElementById('pm-ghost-b');
        const il = document.getElementById('pm-days-inline');
        if (el) el.textContent = d;
        if (gr) gr.textContent = d;
        if (gb) gb.textContent = d;
        if (il) il.textContent = d;
      }
      updateCounter();

      const box = document.getElementById('pm-box');
      const cm  = document.getElementById('pm-counter');
      const gr  = document.getElementById('pm-ghost-r');
      const gb  = document.getElementById('pm-ghost-b');
      const g1  = document.getElementById('pm-g1');
      const g2  = document.getElementById('pm-g2');
      const CH  = ['1','0','3','|','_','\u2588','\u2592'];

      function corrupt() {
        let s = '';
        for (let i = 0; i < 4; i++) s += CH[Math.floor(Math.random() * CH.length)];
        return s[0] + ',' + s.slice(1, 4);
      }

      function glitch() {
        const tv = getDays().toLocaleString();
        const fr = [corrupt(), tv, corrupt(), tv];
        let f = 0;
        const iv = setInterval(function() {
          const v = fr[f++];
          if (cm) cm.textContent = v;
          if (f >= fr.length) { clearInterval(iv); if (cm) cm.textContent = tv; }
        }, 60);
        const rx = (Math.random() - 0.5) * 5;
        const bx = (Math.random() - 0.5) * 4;
        if (gr) gr.style.cssText = 'opacity:1;transform:translate(' + rx + 'px,1px)';
        if (gb) gb.style.cssText = 'opacity:1;transform:translate(' + bx + 'px,-1px)';
        if (g1) g1.style.cssText = 'top:' + (Math.floor(Math.random()*280+60)) + 'px;background:rgba(255,30,10,.1);opacity:1;height:2px';
        if (g2) g2.style.cssText = 'top:' + (Math.floor(Math.random()*280+80)) + 'px;background:rgba(0,170,255,.07);opacity:1;height:1px';
        if (box) box.style.transform = 'translateX(' + ((Math.random()-0.5)*3) + 'px)';
        setTimeout(function() {
          if (gr) gr.style.cssText = 'opacity:0';
          if (gb) gb.style.cssText = 'opacity:0';
          if (g1) g1.style.opacity = '0';
          if (g2) g2.style.opacity = '0';
          if (box) box.style.transform = '';
        }, 110);
      }

      setTimeout(glitch, 500);
      setInterval(glitch, 3400);

      function openModal() {
        wrap.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        if (box) {
          box.style.transition = 'opacity .2s,transform .2s';
          box.style.opacity = '0';
          box.style.transform = 'scaleY(.03) scaleX(1.04)';
          setTimeout(function() {
            wrap.classList.remove('active');
            box.style.cssText = '';
            document.body.style.overflow = '';
          }, 220);
        }
      }

      document.getElementById('pm-close').addEventListener('click', closeModal);
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wrap.classList.contains('active')) closeModal();
      });

      window.openPanicModal  = openModal;
      window.closePanicModal = closeModal;
    }

    // Inject the floating button if no page-level panic button exists
    if (document.querySelector('.panic-btn') || document.getElementById('shared-panic-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'shared-panic-btn';
    btn.className = 'shared-panic-btn';
    btn.setAttribute('aria-label', 'Panic button');
    btn.innerHTML = '<span>PANIC</span>';
    document.body.appendChild(btn);
    btn.addEventListener('click', function() {
      if (typeof window.openPanicModal === 'function') window.openPanicModal();
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
    setupMobileMenu();
    injectPanicButton();

    const nav = document.querySelector('.nav');
    if (nav) {
      const heroEl = document.querySelector('.hero, [class*="hero"], header + *, main > *:first-child');
      function updateNav() {
        const threshold = heroEl ? heroEl.offsetHeight * 0.6 : window.innerHeight * 0.6;
        nav.classList.toggle('nav--scrolled', window.scrollY > threshold);
      }
      window.addEventListener('scroll', updateNav, { passive: true });
      updateNav();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedLayout);
  } else {
    injectSharedLayout();
  }
})();
