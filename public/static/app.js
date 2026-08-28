/* Heaven Furniture Mart — landing page interactions.
   Vanilla, no dependencies, ~3KB. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Sticky nav ---------- */
  var nav = $('#site-nav');
  var fab = $('#fab');
  var lastY = -1;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (y === lastY) return;
    lastY = y;
    if (nav) nav.classList.toggle('is-stuck', y > 40);
    // Surface the WhatsApp CTA once the visitor is past the hero.
    if (fab) fab.classList.toggle('is-visible', y > window.innerHeight * 0.7);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var burger = $('#burger');
  if (burger) {
    var setOpen = function (open) {
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('nav-open'));
    });
    // Staggered link entrance
    $$('#drawer .drawer-links a').forEach(function (a, i) {
      a.style.transitionDelay = (0.12 + i * 0.06) + 's';
    });
    $$('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) setOpen(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Quote form ---------- */
  var form = $('#quote-form');
  if (!form) return;
  var panel = $('#quote-panel');
  var btn = $('#quote-submit');

  function fieldOf(name) {
    var input = form.querySelector('[name="' + name + '"]');
    return input ? input.closest('.field') : null;
  }
  function clearErrors() {
    $$('.field.has-error', form).forEach(function (f) { f.classList.remove('has-error'); });
    $$('.err', form).forEach(function (e) { e.textContent = ''; });
  }
  function showErrors(errors) {
    var first = null;
    Object.keys(errors).forEach(function (k) {
      var f = fieldOf(k);
      if (!f) return;
      f.classList.add('has-error');
      var slot = f.querySelector('.err');
      if (slot) slot.textContent = errors[k];
      if (!first) first = f;
    });
    if (first) {
      var input = first.querySelector('input, select, textarea');
      if (input) input.focus({ preventScroll: false });
    }
  }

  // Clear a field's error as soon as the visitor edits it.
  form.addEventListener('input', function (e) {
    var f = e.target.closest && e.target.closest('.field');
    if (f && f.classList.contains('has-error')) {
      f.classList.remove('has-error');
      var slot = f.querySelector('.err');
      if (slot) slot.textContent = '';
    }
  });

  // Client-side mirror of the server rules (fast feedback, server still authoritative).
  function localValidate(data) {
    var errors = {};
    if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your name.';
    var digits = (data.phone || '').replace(/[\s\-().]/g, '');
    if (!digits) errors.phone = 'Please enter your phone number.';
    else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(digits)) errors.phone = 'Enter a valid BD number, e.g. 01712-345678.';
    if (!data.category) errors.category = 'Please choose a category.';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'That email looks incomplete.';
    return errors;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var fd = new FormData(form);
    var data = {
      name: (fd.get('name') || '').toString(),
      phone: (fd.get('phone') || '').toString(),
      email: (fd.get('email') || '').toString(),
      category: (fd.get('category') || '').toString(),
      message: (fd.get('message') || '').toString()
    };

    var local = localValidate(data);
    if (Object.keys(local).length) { showErrors(local); return; }

    btn.classList.add('is-loading');
    btn.disabled = true;

    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        return res.json().then(function (json) { return { status: res.status, json: json }; });
      })
      .then(function (r) {
        if (r.json && r.json.ok) {
          var note = $('#success-note');
          if (note && r.json.message) {
            note.textContent = r.json.message +
              ' Our design team will call you within one working day to arrange your free consultation.';
          }
          panel.classList.add('is-sent');
          // Keep the confirmation in view on small screens.
          try { panel.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
        } else if (r.json && r.json.errors) {
          showErrors(r.json.errors);
        } else {
          showErrors({ phone: 'Something went wrong. Please call or WhatsApp us instead.' });
        }
      })
      .catch(function () {
        showErrors({ phone: 'Network problem. Please call or WhatsApp us instead.' });
      })
      .finally(function () {
        btn.classList.remove('is-loading');
        btn.disabled = false;
      });
  });
})();
