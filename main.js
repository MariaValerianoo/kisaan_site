document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('langToggle');
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  let lang = 'es';

  const waMessages = {
    es: 'https://wa.me/573000000000?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Kisaan%20Indian',
    en: 'https://wa.me/573000000000?text=Hello%20I%20would%20like%20to%20reserve%20a%20table%20at%20Kisaan%20Indian'
  };

  const refreshLanguage = () => {
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      el.textContent = el.dataset[lang];
    });

    document.documentElement.lang = lang;

    if (langToggle) {
      const span = langToggle.querySelector('span');
      if (span) {
        span.textContent = lang === 'es' ? 'EN' : 'ES';
      } else {
        langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
      }
    }

    document.querySelectorAll('.whatsapp-link').forEach(a => {
      a.href = waMessages[lang];
    });
  };

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      lang = lang === 'es' ? 'en' : 'es';
      refreshLanguage();
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 1150 && navLinks) {
        navLinks.classList.remove('open');
      }
    });
  });

  const revealEls = document.querySelectorAll(
    '.section, .page-card, .menu-group, .menu-category, .info-item, .gallery img, .pageimg'
  );

  revealEls.forEach(el => el.classList.add('reveal-item'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal-item').forEach(el => io.observe(el));

  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category[data-category]');

  const activateCategory = (filter) => {
    menuTabs.forEach(t => t.classList.remove('active'));
    menuCategories.forEach(c => c.classList.remove('active'));

    const activeTab = document.querySelector(`.menu-tab[data-filter="${filter}"]`);
    const activeCategory = document.querySelector(`.menu-category[data-category="${filter}"]`);

    if (activeTab) activeTab.classList.add('active');
    if (activeCategory) activeCategory.classList.add('active');
  };

  if (menuTabs.length && menuCategories.length) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        if (filter) activateCategory(filter);
      });
    });

    const currentActiveTab = document.querySelector('.menu-tab.active');
    const currentActiveCategory = document.querySelector('.menu-category.active');

    if (currentActiveTab && currentActiveTab.dataset.filter) {
      activateCategory(currentActiveTab.dataset.filter);
    } else if (currentActiveCategory && currentActiveCategory.dataset.category) {
      activateCategory(currentActiveCategory.dataset.category);
    } else {
      const firstTab = menuTabs[0];
      if (firstTab && firstTab.dataset.filter) {
        activateCategory(firstTab.dataset.filter);
      }
    }
  } else {
    menuCategories.forEach((category, index) => {
      category.classList.toggle('active', index === 0);
    });
  }

  refreshLanguage();
});