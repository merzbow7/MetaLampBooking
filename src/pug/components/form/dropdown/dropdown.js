const dropdowns = document.querySelectorAll(
  '[data-form-type="dropdown-guest"]'
);

function closeDropdown(target) {
  target.nextSibling.classList.remove('dropdown_expand');
  target.setAttribute('aria-expanded', 'false');
  target.nextSibling.setAttribute('aria-hidden', 'true');
}

function expandDropdown(target) {
  target.nextSibling.classList.add('dropdown_expand');
  target.setAttribute('aria-expanded', 'true');
  target.nextSibling.setAttribute('aria-hidden', 'false');
}

function closeAllDropdowns() {
  dropdowns.forEach((drp) => closeDropdown(drp));
}

function toggleDropdown(target) {
  if (getComputedStyle(target.nextSibling).display === 'block') {
    closeDropdown(target);
  } else {
    dropdowns.forEach((drop) => closeDropdown(drop));
    expandDropdown(target);
  }
}

window.addEventListener('click', () => {
  closeAllDropdowns();
});

dropdowns.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { target } = event;
    toggleDropdown(target);
  });

  item.nextSibling.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  item.nextSibling.childNodes.forEach((elem) => {
    let node = elem.querySelector('.option__value');
    if (node) {
      node = new Proxy(node, {
        get(target, prop) {
          const obj = target;

          const value = parseInt(target.innerText, 10);
          const parent = target.closest('.dropdown').previousSibling;
          window.btn = parent;
          const parentValue = parseInt(parent.innerText, 10);
          if (prop === 'dec') {
            if (value > 0) {
              obj.innerText = value - 1;
              parent.value = `${parentValue - 1} гостей`;
            }
          } else if (prop === 'inc') {
            if (value < 4) {
              obj.innerText = value + 1;
              parent.value = `${+parentValue + 1} гостей`;
            }
          }
        },
      });

      elem
        .querySelector('.option__dec')
        .addEventListener('click', () => node.dec);

      elem
        .querySelector('.option__inc')
        .addEventListener('click', () => node.inc);
    }
  });
});
