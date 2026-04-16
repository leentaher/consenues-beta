// CMS Wire
fetch('/content/homepage.json').then(r=>r.json()).then(d=>{
  const s=(q,v)=>{const e=document.querySelector(q);if(e&&e.textContent.trim()!==(v||'').trim())e.textContent=v};
  const h=(q,v)=>{const e=document.querySelector(q);if(e&&e.getAttribute('href')!==v)e.href=v};
  const g=(els,i,v)=>{if(els[i]&&els[i].textContent.trim()!==(v||'').trim())els[i].textContent=v};
  s('.hero-eyebrow',d.hero_eyebrow);
  s('.hero-headline',d.hero_headline);
  s('.hero-subhead',d.hero_subhead);
  s('.cta-row a',d.hero_cta_text);
  h('.cta-row a',d.hero_cta_url);
  s('.section-title',d.two_futures_title);
  const ey=document.querySelectorAll('.card-eyebrow');
  g(ey,0,d.end_eyebrow);g(ey,1,d.begin_eyebrow);
  const te=document.querySelectorAll('.card-teaser');
  g(te,0,d.end_teaser);g(te,1,d.begin_teaser);
  const bh=document.querySelectorAll('.card-back-headline');
  g(bh,0,d.end_headline);g(bh,1,d.begin_headline);
  const sh=document.querySelectorAll('.section-head');
  g(sh,0,d.mission_head);g(sh,1,d.done_before_head);g(sh,2,d.building_head);g(sh,3,d.thinktank_head);g(sh,4,d.join_head);
  s('.footer-brand p',d.footer_tagline);
  s('.footer-copy',d.footer_copyright);
});
