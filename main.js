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
