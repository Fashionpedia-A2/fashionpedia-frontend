document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.dropdown-button');
  buttons.forEach(button => {
    const menuId = button.id;
    const menu = document.querySelector(`[aria-labelledby='${menuId}']`);

    button.addEventListener('click', function () {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('hidden');
    });

    document.addEventListener('click', function (event) {
      if (!button.contains(event.target) && !menu.contains(event.target)) {
        button.setAttribute('aria-expanded', 'false');
        menu.classList.add('hidden');
      }
    });
  });
});