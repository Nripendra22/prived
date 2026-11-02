(() => {
  const header = document.querySelector('.site-header');
  const hamburger = header?.querySelector('.hamburger');
  const nav = header?.querySelector('#primary-navigation');
  if (!header || !hamburger || !nav) return;

  const closeNavMenus = (except = null) => {
    header.querySelectorAll('.nav-item.menu-open').forEach((item) => {
      if (item === except) return;
      item.classList.remove('menu-open', 'mobile-open');
      item.querySelector('.nav-link')?.setAttribute('aria-expanded', 'false');
    });
  };

  const closeMobileNav = () => {
    header.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') !== 'true';
    header.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    if (!isOpen) closeNavMenus();
  });

  header.querySelectorAll('.nav-item').forEach((item) => {
    const button = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!button || !dropdown) return;

    item.addEventListener('pointerenter', () => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      closeNavMenus(item);
      button.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('pointerleave', () => {
      if (!item.classList.contains('menu-open') && !item.contains(document.activeElement)) {
        button.setAttribute('aria-expanded', 'false');
      }
    });

    item.addEventListener('focusin', () => button.setAttribute('aria-expanded', 'true'));
    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget) && !item.classList.contains('menu-open')) {
        button.setAttribute('aria-expanded', 'false');
      }
    });

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('menu-open');
      closeNavMenus(item);
      item.classList.toggle('menu-open', !isOpen);
      item.classList.toggle('mobile-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    });

    dropdown.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeNavMenus();
        closeMobileNav();
      });
    });
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
      closeNavMenus();
      closeMobileNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const activeMenuButton = document.activeElement?.closest('.nav-item')?.querySelector('.nav-link');
    closeNavMenus();
    closeMobileNav();
    if (window.getComputedStyle(hamburger).display !== 'none') hamburger.focus();
    else activeMenuButton?.focus();
  });

  window.matchMedia('(min-width: 68.7501rem)').addEventListener('change', () => {
    closeNavMenus();
    closeMobileNav();
  });
})();
