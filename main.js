// Mobile nav toggle
document.addEventListener('click', function (e) {
  if (e.target.closest('.menu-toggle')) {
    document.querySelector('.nav-links').classList.toggle('open');
  }
});

// Scroll-triggered reveal (one-shot)
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });
  els.forEach(function (el) { io.observe(el); });
})();

// Footer year
document.addEventListener('DOMContentLoaded', function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// ---- Niagara service-area map (Leaflet, lazy-loaded) ----
function initAreaMap() {
  if (typeof L === 'undefined' || !document.getElementById('areaMap')) return;
  var map = L.map('areaMap', { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
    .setView([43.10, -79.20], 10);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19, attribution: '&copy; OpenStreetMap &copy; CARTO'
  }).addTo(map);

  // [name, lat, lng, radius(m), isHQ]
  var towns = [
    ['St. Catharines · HQ', 43.1594, -79.2469, 5200, true],
    ['Niagara-on-the-Lake', 43.2557, -79.0717, 4200, false],
    ['Niagara Falls', 43.0896, -79.0849, 5000, false],
    ['Thorold', 43.1230, -79.1990, 3800, false],
    ['Welland', 42.9922, -79.2482, 4200, false],
    ['Pelham & Fonthill', 43.0420, -79.2870, 3800, false],
    ['Lincoln & Beamsville', 43.1668, -79.4750, 4200, false],
    ['Grimsby', 43.1992, -79.5601, 3800, false],
    ['Port Colborne', 42.8862, -79.2502, 3800, false],
    ['Fort Erie', 42.9094, -78.9447, 4200, false]
  ];
  towns.forEach(function (t) {
    var name = t[0], lat = t[1], lng = t[2], r = t[3], hq = t[4];
    L.circle([lat, lng], { radius: r, color: '#2f3722', weight: hq ? 2.5 : 1.4, opacity: 0.6, fillColor: '#4a5536', fillOpacity: hq ? 0.22 : 0.12 }).addTo(map);
    L.circleMarker([lat, lng], { radius: hq ? 8 : 5.5, color: '#fff', weight: 1.5, fillColor: hq ? '#2f3722' : '#4a5536', fillOpacity: 1 }).addTo(map)
      .bindTooltip(name, { permanent: true, direction: 'top', offset: [0, -6], className: 'maptip' + (hq ? ' hq' : '') });
  });
  var bounds = L.latLngBounds(towns.map(function (t) { return [t[1], t[2]]; })).pad(0.15);
  map.fitBounds(bounds);
  setTimeout(function () { map.invalidateSize(); map.fitBounds(bounds); }, 300);
}

(function () {
  var el = document.getElementById('areaMap');
  if (!el) return;
  var loaded = false;
  function loadMap() {
    if (loaded) return; loaded = true;
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = initAreaMap; document.head.appendChild(js);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { o.disconnect(); loadMap(); } }, { rootMargin: '600px' }).observe(el);
  } else {
    window.addEventListener('load', loadMap);
  }
})();
