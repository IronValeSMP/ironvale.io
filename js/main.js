/* ==========================================================
   IRONVALE — main.js
   Loader, nav behavior, ember particles, reveal-on-scroll,
   copy-IP, mobile drawer, cursor glow, server status stub.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading screen ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 400);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('hidden'), 2200);

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      drawer.classList.remove('open');
    }));
  }

  /* ---------- Ember particles (ambient) ---------- */
  const emberField = document.querySelector('.embers');
  if (emberField) {
    const count = window.innerWidth < 700 ? 14 : 28;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 8 + Math.random() * 10;
      const drift = (Math.random() * 80 - 40) + 'px';
      s.style.left = left + 'vw';
      s.style.animationDelay = delay + 's';
      s.style.animationDuration = duration + 's';
      s.style.setProperty('--drift', drift);
      const size = 2 + Math.random() * 3;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      emberField.appendChild(s);
    }
  }

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => entry.target.classList.add('in'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Copy IP buttons ---------- */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      const original = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<span class="tick">&#10003;</span> Copied Successfully';
      showToast('Server address copied to clipboard');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 2200);
    });
  });

  /* ---------- Toast ---------- */
  window.showToast = function (msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = '<span class="tick">&#10003;</span> ' + msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  /* ---------- Active nav link ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  /* ---------- Server status (placeholder API, ready to wire up) ---------- */
  fetchServerStatus();
});

/**
 * Server status fetcher — placeholder implementation.
 *
 * To connect a live Minecraft server status API (e.g. mcsrvstat.us or
 * api.mcstatus.io), replace the body of this function with a real fetch:
 *
 *   const res = await fetch(`https://api.mcstatus.io/v2/status/java/${ADDRESS}`);
 *   const data = await res.json();
 *   renderStatus({
 *     online: data.online,
 *     players: `${data.players.online} / ${data.players.max}`,
 *     ping: data.ping ? `${data.ping}ms` : '—',
 *     version: data.version?.name_clean || '—'
 *   });
 *
 * Until then, this renders placeholder values so the panel is fully
 * designed and ready to go live.
 */
async function fetchServerStatus() {
  const JAVA_ADDRESS = 'IronVale_SMP.aternos.me:11112';

  const els = {
    dot: document.querySelector('.hero-badge .dot'),
    badgeText: document.querySelector('.hero-badge .badge-text'),
    online: document.querySelector('[data-status="online"]'),
    players: document.querySelector('[data-status="players"]'),
    ping: document.querySelector('[data-status="ping"]'),
    version: document.querySelector('[data-status="version"]'),
    address: document.querySelector('[data-status="address"]'),
  };

  if (!els.online && !els.dot) return; // status panel not on this page

  // Placeholder data — swap for the real API call above when ready.
  const placeholder = {
    online: null, // null = "unknown / check in-game", true/false once wired to a real API
    players: '—',
    ping: '—',
    version: 'Java 1.21.x',
  };

  renderStatus(placeholder);

  function renderStatus(data) {
    if (els.online) {
      els.online.textContent = data.online === null ? 'Checking…' : (data.online ? 'Online' : 'Offline');
      els.online.classList.toggle('on', data.online === true);
      els.online.classList.toggle('off', data.online === false);
    }
    if (els.dot) els.dot.classList.toggle('offline', data.online === false);
    if (els.badgeText) {
      els.badgeText.textContent = data.online === false ? 'Server Offline' : 'Server Status: Live Panel';
    }
    if (els.players) els.players.textContent = data.players;
    if (els.ping) els.ping.textContent = data.ping;
    if (els.version) els.version.textContent = data.version;
    if (els.address) els.address.textContent = JAVA_ADDRESS;
  }
}
