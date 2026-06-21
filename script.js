/* SCHATTENMUSTER — interactions */
(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      burger.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveal = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- Toast helper ---- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  /* ---- Cart (demo) ---- */
  var cart = [];
  document.querySelectorAll('.add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var title = btn.getAttribute('data-title') || 'Titel';
      cart.push(title);
      showToast('„' + title + '" in den Warenkorb gelegt ✓');
    });
  });

  /* ---- Lead form ---- */
  var lead = document.getElementById('lead-form');
  if (lead) {
    lead.addEventListener('submit', function (e) {
      e.preventDefault();
      lead.reset();
      showToast('Danke! Die Leseprobe ist unterwegs ✓');
    });
  }

  /* ---- Contact form ---- */
  var contact = document.getElementById('contact-form');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      contact.reset();
      showToast('Nachricht gesendet — wir melden uns ✓');
    });
  }

  /* ---- Cookie banner ---- */
  var cookie = document.getElementById('cookie');
  if (cookie && !localStorage.getItem('sm_cookie')) {
    setTimeout(function () { cookie.classList.remove('hide'); }, 1200);
  }
  function closeCookie() {
    localStorage.setItem('sm_cookie', '1');
    if (cookie) cookie.classList.add('hide');
  }
  var ok = document.getElementById('ck-ok');
  var no = document.getElementById('ck-no');
  if (ok) ok.addEventListener('click', closeCookie);
  if (no) no.addEventListener('click', closeCookie);

})();
