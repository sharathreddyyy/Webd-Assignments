document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a.nav-link');
  links.forEach(l => {
    if (l.getAttribute('href') === location.pathname.split('/').pop()) {
      l.classList.add('active');
    }
  });
});