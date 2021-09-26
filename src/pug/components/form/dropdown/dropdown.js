const dropdowns = document.querySelectorAll('[data-form-type="dropdown"]');

function expandDropdown(event) {
  event.preventDefault();
  const { target } = event;
  const dropdown = target.firstElementChild;
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  dropdown.classList.toggle('dropdown_expand');
  if (Array.from(dropdown.classList).includes('dropdown_expand')) {
    target.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
  } else {
    target.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
  }
}

function changeCount(event, sign) {
  const { target } = event;
  const node = target.parentNode.querySelector('.option__value');
  node.innerText = parseInt(node.innerText, 10) + sign;
}

dropdowns.forEach((item) => {
  item.addEventListener('click', (event) => expandDropdown(event));
  item.firstElementChild.childNodes.forEach((elem) => {
    elem
      .querySelector('.option__dec')
      .addEventListener('click', (event) => changeCount(event, -1));
    elem
      .querySelector('.option__inc')
      .addEventListener('click', (event) => changeCount(event, 1));
  });
});
