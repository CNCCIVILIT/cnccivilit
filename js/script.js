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

// Contact form feedback
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will get back to you shortly.');
    form.reset();
  });
}
