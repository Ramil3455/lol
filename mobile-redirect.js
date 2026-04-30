(function () {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);

  if (!isMobile) return;

  var path = window.location.pathname;
  var page = path.split('/').pop();

  var map = {
    '': 'm-index.html',
    'index.html': 'm-index.html',
    'main-beton.html': 'm-beton.html',
    'main-window.html': 'm-window.html',
    'main-dobor.html': 'm-dobor.html',
    'main-fasad.html': 'm-fasad.html',
    'main-vent.html': 'm-vent.html'
  };

  var target = map[page];

  if (!target) return;          // нет соответствия
  if (page && page.startsWith('m-')) return; // уже мобильная

  window.location.href = '/' + target;
})();