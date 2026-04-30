// Плавное появление и исчезновение страницы
window.addEventListener('load', () => {
  document.body.classList.add('page-visible');
});

function goTo(url) {
  const body = document.body;
  if (body.classList.contains('page-fade-out')) return;
  body.classList.add('page-fade-out');
  body.addEventListener('transitionend', function handler(e) {
    if (e.propertyName === 'opacity') {
      body.removeEventListener('transitionend', handler);
      window.location.href = url;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const cards = document.querySelectorAll('.card');

  function normalize(str) {
    return str.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function toWords(str) {
    return normalize(str)
      .split(/[,\s]+/)
      .filter(Boolean);
  }

  function filterCards(query) {
    const q = normalize(query);
    if (!q) {
      cards.forEach(card => {
        card.style.display = '';
        card.classList.remove('hidden');
      });
      return;
    }

    const queryWords = toWords(q);

    cards.forEach(card => {
      const titleEl = card.querySelector('.card-title');
      const titleText = titleEl ? titleEl.textContent : '';
      const tags = card.dataset.tags || '';
      const haystack = `${titleText} ${tags}`.toLowerCase();

      const isMatch = queryWords.every(word => haystack.includes(word));
      if (isMatch) {
        card.style.display = '';
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterCards(this.value);
    });
  }

  // Загрузка цен
  fetch('price-config.json?' + Date.now())
    .then(response => response.json())
    .then(data => {
      // минимальные цены по набору ключей (главная)
      document.querySelectorAll('[data-min-keys]').forEach(el => {
        const keysAttr = el.getAttribute('data-min-keys');
        if (!keysAttr) return;

        const keys = keysAttr.split(',').map(k => k.trim()).filter(Boolean);
        if (!keys.length) return;

        const values = keys
          .map(key => {
            const v = data[key];
            return typeof v === 'number' ? v : null;
          })
          .filter(v => typeof v === 'number');

        if (!values.length) return;

        const minPrice = Math.min(...values);
        el.textContent = 'от ' + minPrice.toLocaleString('ru-RU') + ' ₽';
      });

      // прямые цены по ключу (внутренние страницы)
      document.querySelectorAll('[data-price]').forEach(el => {
        const key = el.getAttribute('data-price');
        if (data[key] !== undefined) {
          el.textContent = 'от ' + data[key].toLocaleString('ru-RU') + ' ';
        }
      });
    })
    .catch(err => {
      console.error('Ошибка загрузки цен:', err);
    });
});