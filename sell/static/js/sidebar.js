document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('sidebar-toggle-button');
  const sideMenuTextElements = document.querySelectorAll('.side-menu-text');
  const navbar = document.getElementById('navbar');
  const sideToggleIcon = document.getElementById('sidebar-toggle-icon');

  button.addEventListener('click', function () {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);

    sideMenuTextElements.forEach(element => {
      if (expanded) {
        element.classList.add('hidden');
        navbar.classList.remove('side-expanded')
        sideToggleIcon.classList.add('rotate-180');
      }
      else {
        element.classList.remove('hidden');
        navbar.classList.add('side-expanded');
        sideToggleIcon.classList.remove('rotate-180');
      }

    });
  });
});