/* Heaven Furniture Mart — landing page interactions.
   Vanilla, no dependencies, ~3KB. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Sticky nav ---------- */
  var nav = $('#site-nav');
  var fab = $('#fab');
  var footer = $('.footer');
  var lastY = -1;

  /* The footer lists the phone number, email, map link and its own WhatsApp
     icon, so the floating pill has nothing left to offer there — and it was
     sitting directly on top of the "Designed. Crafted. Customized." line.
     Retire it as soon as the footer comes into view. */
  var footerVisible = false;
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      function (entries) {
        footerVisible = entries[0].isIntersecting;
        applyFab();
      },
      { rootMargin: '0px 0px -40px 0px' }
    ).observe(footer);
  }

  function applyFab() {
    if (!fab) return;
    var pastHero = (window.pageYOffset || document.documentElement.scrollTop) > window.innerHeight * 0.7;
    fab.classList.toggle('is-visible', pastHero && !footerVisible);
  }

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (y === lastY) return;
    lastY = y;
    if (nav) nav.classList.toggle('is-stuck', y > 40);
    applyFab();
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

  /* ---------- Scroll spy ----------
     Marks the nav link for whichever section owns the upper third of the
     viewport, so a visitor always knows where they are in the page. */
  var spyLinks = $$('.nav-links a[href^="#"]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    spyLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var targets = Object.keys(byId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var visible = {};
    var spyIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0;
        });
        // Pick the most-visible tracked section.
        var best = null, bestVal = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestVal) { bestVal = visible[id]; best = id; }
        });
        spyLinks.forEach(function (a) {
          var on = best && a.getAttribute('href') === '#' + best;
          a.classList.toggle('is-current', !!on);
          if (on) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] }
    );
    targets.forEach(function (t) { spyIO.observe(t); });
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
  var status = $('#form-status');

  function clearErrors() {
    $$('.field.has-error', form).forEach(function (f) { f.classList.remove('has-error'); });
    $$('.err', form).forEach(function (e) { e.textContent = ''; });
    $$('[aria-invalid]', form).forEach(function (i) { i.removeAttribute('aria-invalid'); });
    if (status) status.textContent = '';
  }
  function showErrors(errors) {
    var first = null;
    var keys = Object.keys(errors);
    keys.forEach(function (k) {
      var f = fieldOf(k);
      if (!f) return;
      f.classList.add('has-error');
      var slot = f.querySelector('.err');
      if (slot) slot.textContent = errors[k];
      var input = f.querySelector('input, select, textarea');
      if (input) input.setAttribute('aria-invalid', 'true');
      if (!first) first = f;
    });
    // Announce the failure — the red text alone tells a screen reader nothing.
    if (status) {
      status.textContent =
        keys.length === 1
          ? 'There is a problem: ' + errors[keys[0]]
          : 'There are ' + keys.length + ' problems with your details. ' +
            keys.map(function (k) { return errors[k]; }).join(' ');
    }
    if (first) {
      var focusEl = first.querySelector('input, select, textarea');
      if (focusEl) focusEl.focus({ preventScroll: false });
    }
  }

  // Clear a field's error as soon as the visitor edits it.
  form.addEventListener('input', function (e) {
    var f = e.target.closest && e.target.closest('.field');
    if (f && f.classList.contains('has-error')) {
      f.classList.remove('has-error');
      var slot = f.querySelector('.err');
      if (slot) slot.textContent = '';
      if (e.target.removeAttribute) e.target.removeAttribute('aria-invalid');
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
      message: (fd.get('message') || '').toString(),
      website: (fd.get('website') || '').toString()
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
          // Move focus into the confirmation so it is announced and so the
          // next Tab continues from the new content, not the removed form.
          var heading = panel.querySelector('.form-success h3');
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            try { heading.focus({ preventScroll: true }); } catch (_) {}
          }
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
