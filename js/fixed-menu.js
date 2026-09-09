//////
////// fixed-menu активный пункт
//////
const fixedMenuItems = document.querySelectorAll('.fixed-menu__item');

fixedMenuItems.forEach((item) => {
  const link = item.querySelector('.fixed-menu__link');

  link.addEventListener('click', () => {
    fixedMenuItems.forEach((menuItem) => menuItem.classList.remove('fixed-menu__item--active'));
    item.classList.add('fixed-menu__item--active');
  });
});

//////
////// fixed-menu переключение цветовых схем
//////
const fixedMenu = document.querySelector('.fixed-menu');
const menuSections = document.querySelectorAll('section[id]');

if (fixedMenu && menuSections.length) {
  const fixedMenuObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fixedMenu.classList.toggle('fixed-menu--dark', entry.target.dataset.bg === 'light');
        }
      });
    },
    { rootMargin: '-23% 0px -76% 0px', threshold: 0 },
  );

  menuSections.forEach((section) => fixedMenuObserver.observe(section));
}
