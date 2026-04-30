(function () {
  // Определяем мобильное устройство по userAgent
  var isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    .test(navigator.userAgent.toLowerCase());

  if (!isMobile) return;

  var path = window.location.pathname;           // например: /fasad/main-window.html
  var segments = path.split('/');               // ["", "fasad", "main-window.html"]
  var page = segments.pop() || 'index.html';    // main-window.html или index.html
  var base = segments.join('/') || '';          // "" или "/fasad"

  var map = {
    'index.html': 'm-index.html',
    'main-beton.html': 'm-beton.html',
    'main-window.html': 'm-window.html',
    'main-dobor.html': 'm-dobor.html',
    'main-fasad.html': 'm-fasad.html',
    'main-vent.html': 'm-vent.html'
  };

  // если заходят по адресу без имени файла (типа /fasad/), считаем это index.html
  if (!page || page === '') {
    page = 'index.html';
  }

  // Уже на мобильной странице — ничего не делаем
  if (page.startsWith('m-')) return;

  var target = map[page];
  if (!target) return; // нет соответствия

  // Собираем новый путь в той же папке
  var newPath = base + '/' + target;
  window.location.replace(newPath);
})();