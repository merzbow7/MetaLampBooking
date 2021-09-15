import './style/style.scss';

const menu = document.querySelector('.nav-list');
const header = document.querySelector('.header');
const menuToggler = document.querySelector('.nav-list-toggle');

document.querySelector('.nav-list-toggle').addEventListener('click', () => {
  menu.classList.toggle('active');
  menuToggler.classList.toggle('active-toggler');
});

window.addEventListener('resize', () => {
  const { width: widthMenu } = header.getBoundingClientRect();
  const activeMenu = menu.classList.contains('active');
  if (widthMenu > 767 && activeMenu) {
    menu.classList.remove('active');
    menuToggler.classList.remove('active-toggler');
  }
});
