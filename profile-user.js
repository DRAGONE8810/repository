document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.querySelector('nav.main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('show');
    });
  }

  // Menú usuario (Profile, Settings, Logout)
  const userMenu = document.querySelector('.user-menu');
  const userDropdown = document.querySelector('.user-dropdown');
  const userBtn = document.getElementById('user-menu-btn');
  if (userMenu && userDropdown && userBtn) {
    const menuItems = Array.from(userDropdown.querySelectorAll('[role="menuitem"]'));

    const openMenu = () => {
      userMenu.classList.add('active');
      userBtn.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      userMenu.classList.remove('active');
      userBtn.setAttribute('aria-expanded', 'false');
    };

    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target)) closeMenu();
    });

    userBtn.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openMenu();
        menuItems[0]?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        openMenu();
        menuItems[menuItems.length - 1]?.focus();
      }
      if (e.key === 'Escape') {
        closeMenu();
        userBtn.focus();
      }
    });

    userDropdown.addEventListener('keydown', (e) => {
      const idx = menuItems.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        menuItems[(idx + 1) % menuItems.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        menuItems[(idx - 1 + menuItems.length) % menuItems.length].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        userBtn.focus();
      }
    });

    userMenu.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!userMenu.contains(document.activeElement)) closeMenu();
      }, 0);
    });
  }
});
