// Mobile nav toggle
document.querySelectorAll('.nav-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('open');
  });
});

// Highlight active nav link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Division filter (Services page)
document.querySelectorAll('.switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const div = btn.dataset.div;
    document.querySelectorAll('[data-division]').forEach(el => {
      el.classList.toggle('hidden', div !== 'all' && el.dataset.division !== div);
    });
  });
});

// Tabs (Projects page)
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active', 'civil'));
    btn.classList.add('active');
    if (btn.dataset.tab === 'civil') btn.classList.add('civil');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
  });
});

// ---------- Teams dropdown in the nav (progressive enhancement) ----------
// The plain <a href="teams.html">Teams</a> stays in the HTML, so the nav still
// works if JS is off. We only add the submenu listing individual members.
const navList = document.querySelector('nav ul');
if (navList && typeof TEAM !== 'undefined') {
  const teamsLi = [...navList.children].find(li => li.querySelector('a[href="teams.html"]'));

  if (teamsLi) {
    teamsLi.classList.add('has-sub');
    teamsLi.setAttribute('aria-haspopup', 'true');

    // Members share teams.html in the nav, so mark the label active for them too.
    // Adding it to the <a> reuses the standard `nav a.active::after` underline.
    const teamsLink = teamsLi.querySelector('a[href="teams.html"]');
    if (page === 'teams.html' || page === 'member.html') teamsLink.classList.add('active');

    const toggle = document.createElement('button');
    toggle.className = 'sub-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Toggle team member menu');
    toggle.textContent = '▾';
    teamsLi.insertBefore(toggle, teamsLi.querySelector('ul') || null);

    // Caret lives *inside* the anchor so the label keeps the same box,
    // padding and underline as every other nav item.
    if (teamsLink) {
      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.setAttribute('aria-hidden', 'true');
      caret.textContent = '▾';
      teamsLink.appendChild(caret);
    }

    const sub = document.createElement('ul');
    sub.className = 'sub';

    const groups = [
      ['leadership', 'Leadership'],
      ['civil', 'Civil Division'],
      ['it', 'IT Division']
    ];

    sub.innerHTML = groups.map(([key, label]) => `
      <li class="sub-label">${label}</li>` + TEAM
        .filter(m => m.group === key)
        .map(m => `<li><a href="member.html?m=${m.slug}" class="${m.division}">
            <strong>${m.name}</strong><em>${m.role}</em>
          </a></li>`)
        .join('')).join('');

    teamsLi.appendChild(sub);

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = teamsLi.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
}

// ---------- Member profile page ----------
const profileRoot = document.getElementById('profile-root');
if (profileRoot && typeof TEAM !== 'undefined') {
  const slug = new URLSearchParams(location.search).get('m');
  const member = slug ? getMember(slug) : null;

  if (!member) {
    document.title = 'Member Not Found | CNC Consultancy';
    profileRoot.innerHTML = `
      <div class="container empty-note">
        <h1>Member not found</h1>
        <p>We could not find that team profile. It may have been renamed or removed.</p>
        <a class="btn btn-blue" href="teams.html">Back to Teams</a>
      </div>`;
  } else {
    const idx = TEAM.indexOf(member);
    const prev = TEAM[idx - 1];
    const next = TEAM[idx + 1];
    const divLabel = member.division === 'civil' ? 'Civil Division' : 'IT Division';
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    document.title = `${member.name} — ${member.role} | CNC Consultancy`;
    profileRoot.innerHTML = `
      <div class="profile-hero">
        <div class="container">
          <nav class="crumbs"><a href="index.html">Home</a><span>/</span><a href="teams.html">Teams</a><span>/</span>${esc(member.name)}</nav>
          <span class="badge ${member.division}">${divLabel}</span>
          <h1>${esc(member.name)}</h1>
          <p>${esc(member.role)}</p>
        </div>
      </div>

      <div class="container profile-grid">
        <figure class="profile-photo ${member.division}">
          <img src="img/team/${member.slug}.svg" width="320" height="400"
               alt="Portrait of ${esc(member.name)}, ${esc(member.role)}">
        </figure>

        <article class="profile-body ${member.division}">
          <div class="role">${esc(member.role)}</div>
          <p style="color:var(--slate)">${esc(member.summary)}</p>

          <div class="profile-facts">
            ${Object.entries(member.facts).map(([k, v]) => `<div><b>${esc(k)}</b>${esc(v)}</div>`).join('')}
          </div>

          <h2>About</h2>
          <p style="color:var(--slate)">${esc(member.bio)}</p>

          <h2>Areas of Focus</h2>
          <ul class="focus-list">${member.focus.map(f => `<li>${esc(f)}</li>`).join('')}</ul>

          <h2>Selected Work</h2>
          <ul class="work-list">
            ${member.work.map(w => `<li><b>${esc(w.title)}</b><span>${esc(w.desc)}</span></li>`).join('')}
          </ul>

          <div class="profile-nav">
            ${prev ? `<a href="member.html?m=${prev.slug}">&larr; ${esc(prev.name)}</a>` : '<span></span>'}
            ${next ? `<a href="member.html?m=${next.slug}">${esc(next.name)} &rarr;</a>` : '<span></span>'}
          </div>
        </article>
      </div>

      <div style="height:56px"></div>`;

    document.getElementById('profile-cta').innerHTML =
      `<a class="btn btn-blue" href="teams.html">All Team Members</a>` +
      `<a class="btn" style="background:var(--amber-2);color:#1f2937" href="contact.html">Talk to Us</a>`;
  }
}

// ---------- Hero slideshow (5s per slide) ----------
const hero = document.querySelector('.hero');
if (hero) {
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dotsBox = hero.querySelector('.hero-dots');
  const SLIDE_MS = 5000;

  // With a single photo (or no JS at all) there is nothing to rotate, so the
  // markup's .is-active class is left as-is and no dots are rendered.
  if (dotsBox && slides.length > 1) {
    let index = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
    let timer = null;

    // Dots are built here so the HTML only needs one empty container.
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show slide ${i + 1} of ${slides.length}`);
      dot.addEventListener('click', () => { go(i); start(); });
      dotsBox.appendChild(dot);
      return dot;
    });

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
      dots.forEach((d, n) => d.classList.toggle('active', n === index));
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), SLIDE_MS);
    }

    // Hold the current photo while the visitor is reading or hovering it.
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', start);
    // Background tabs throttle timers, so restart when the tab is shown again.
    document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : start()));

    go(index);
    start();
  }
}

// ---------- Floating WhatsApp button ----------
// Injected from here instead of being pasted into all nine pages, so the number
// and the service copy only ever have to be updated in this one place.
const WHATSAPP_NUMBER = '9779860777413'; // +977 9860777413 — country code, digits only

// The service menu, kept in step with the cards on services.html. Numbered lists
// are generated from these arrays, so adding a service updates every message.
const WA_SERVICES = {
  it: [
    'Web & App Development',
    'Custom Software Solutions (ERP / CRM)',
    'IoT & Hardware Integration',
    'Cloud Solutions, Hosting & DevOps'
  ],
  civil: [
    'Architectural Design',
    'Structural Engineering',
    'DPR Preparation & Feasibility Study',
    'Drainage & Water Management',
    'Construction Supervision'
  ]
};

// encodeURIComponent turns the newlines into %0A, which WhatsApp re-renders as
// real line breaks.
const waLink = lines => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

// Pre-typed chat starter. WhatsApp opens the text in the visitor's own composer
// (fully editable) and sends it on their tap, so the service menu reaches them
// without a single extra click.
const waGeneral = [
  'Hello CNC Consultancy \u{1F44B} I\'d like to know more about your services.',
  '',
  'Which division can help me?',
  '',
  '*IT Division*',
  ...WA_SERVICES.it.map((s, i) => `${i + 1}. ${s}`),
  '',
  '*Civil Division*',
  ...WA_SERVICES.civil.map((s, i) => `${i + WA_SERVICES.it.length + 1}. ${s}`),
  '',
  'Please share the details and we\'ll get back to you. Thank you!'
];

// Quick replies for visitors who already know which half of the firm they need,
// so they don't have to read past the other division's list.
const waDivision = (label, key) => [
  `Hello CNC Consultancy \u{1F44B} I'm interested in your ${label} services:`,
  '',
  ...WA_SERVICES[key].map((s, i) => `${i + 1}. ${s}`),
  '',
  'Please share the details and we\'ll get back to you. Thank you!'
];

const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

if (!document.querySelector('.wa-wrap')) {
  const wrap = document.createElement('div');
  wrap.className = 'wa-wrap';

  // The pill stays a plain link — one tap still opens the general enquiry, so
  // the menu is an optional shortcut rather than a step in front of it.
  const fab = document.createElement('a');
  fab.className = 'whatsapp-fab';
  fab.href = waLink(waGeneral);
  fab.target = '_blank';
  fab.rel = 'noopener';
  fab.setAttribute('aria-label', 'Chat with us on WhatsApp');
  fab.innerHTML = `<span class="whatsapp-fab-label">Chat on WhatsApp</span>${WHATSAPP_ICON}`;

  const more = document.createElement('button');
  more.className = 'wa-more';
  more.type = 'button';
  more.setAttribute('aria-label', 'Choose a service');
  more.setAttribute('aria-expanded', 'false');

  const menu = document.createElement('div');
  menu.className = 'wa-menu';
  menu.id = 'wa-menu';
  menu.hidden = true;
  [['IT services', 'IT', 'it'], ['Civil services', 'Civil', 'civil']].forEach(([title, label, key]) => {
    const link = document.createElement('a');
    link.href = waLink(waDivision(label, key));
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = title;
    menu.appendChild(link);
  });

  more.setAttribute('aria-controls', menu.id);
  more.textContent = '+';

  const setMenu = open => {
    menu.hidden = !open;
    more.setAttribute('aria-expanded', String(open));
  };

  more.addEventListener('click', () => setMenu(menu.hidden));
  // Dismiss on an outside click or Escape, as a menu should behave.
  document.addEventListener('click', e => {
    if (!menu.hidden && !wrap.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      more.focus();
    }
  });

  wrap.append(more, fab, menu);
  document.body.appendChild(wrap);
}

// Contact form feedback
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will get back to you shortly.');
    form.reset();
  });
}
