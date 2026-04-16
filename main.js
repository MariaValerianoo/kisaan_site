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
      const langSpan = langToggle.querySelector('span');
      if (langSpan) {
        langSpan.textContent = lang === 'es' ? 'EN' : 'ES';
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

  if (menuTabs.length && menuCategories.length) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');

        const targetCategory = document.querySelector(
          `.menu-category[data-category="${tab.dataset.filter}"]`
        );

        if (targetCategory) {
          targetCategory.classList.add('active');
        }
      });
    });
  }

  refreshLanguage();
});