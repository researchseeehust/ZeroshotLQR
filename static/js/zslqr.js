const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function initRail() {
  const rail = $('.rail');
  const toggle = $('.rail-toggle');
  const backdrop = $('.rail-backdrop');

  const closeRail = () => {
    rail?.classList.remove('open');
    backdrop?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  const openRail = () => {
    rail?.classList.add('open');
    backdrop?.classList.add('open');
    toggle?.setAttribute('aria-expanded', 'true');
  };

  toggle?.addEventListener('click', () => {
    rail?.classList.contains('open') ? closeRail() : openRail();
  });
  backdrop?.addEventListener('click', closeRail);

  const navLinks = $$('.rail nav a');
  const progress = $('.reading-progress span');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const percent = max > 0 ? (scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;

    let active = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 120) active = section.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active}`));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    const target = href && href !== '#' ? $(href) : null;
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    history.pushState(null, '', href);
    closeRail();
  });
}

document.addEventListener('DOMContentLoaded', initRail);
