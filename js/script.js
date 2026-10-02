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

// Contact form feedback
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will get back to you shortly.');
    form.reset();
  });
}
