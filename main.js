document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('langToggle');
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');

  // 🔹 Inglés por defecto
  let lang = localStorage.getItem('lang') || 'en';

  const waMessages = {
    es: 'https://wa.me/34601997776?text=Hola%20quiero%20reservar%20una%20mesa%20en%20Kisaan%20Indian',
    en: 'https://wa.me/34601997776?text=Hello%20I%20would%20like%20to%20reserve%20a%20table%20at%20Kisaan%20Indian'
  };

  const refreshLanguage = () => {
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      el.textContent = el.dataset[lang] || el.textContent;
    });

    document.documentElement.lang = lang;

    if (langToggle) {
      const span = langToggle.querySelector('span');
      const nextLang = lang === 'es' ? 'EN' : 'ES';

      if (span) {
        span.textContent = nextLang;
      } else {
        langToggle.textContent = nextLang;
      }
    }

    document.querySelectorAll('.whatsapp-link').forEach(a => {
      a.href = waMessages[lang];
    });
  };

  // 🔹 Cambiar idioma y guardarlo
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      lang = lang === 'es' ? 'en' : 'es';

      // Guarda idioma elegido
      localStorage.setItem('lang', lang);

      refreshLanguage();
    });
  }

  // 🔹 Menú hamburguesa
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 🔹 Cerrar menú en móvil
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 1150) {
          navLinks.classList.remove('open');
        }
      });
    });
  }

  // 🔹 Tabs del menú
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
  } else if (menuCategories.length) {
    menuCategories.forEach((category, index) => {
      category.classList.toggle('active', index === 0);
    });
  }

  // 🔹 Animaciones reveal
  const revealEls = document.querySelectorAll(
    '.page-card, .menu-group, .info-item, .gallery img, .pageimg'
  );

  revealEls.forEach(el => el.classList.add('reveal-item'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    document.querySelectorAll('.reveal-item').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('visible'));
  }

  // 🔹 Aplicar idioma inicial
  refreshLanguage();
});

