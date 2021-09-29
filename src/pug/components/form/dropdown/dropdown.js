import { roomsTranslate, guestsTranslate } from './translate';

const dropdowns = document.querySelectorAll('[data-form-type="dropdown"]');

const closeDropdown = (target) => {
  target.nextSibling.classList.remove('dropdown_expand');
  target.setAttribute('aria-expanded', 'false');
  target.nextSibling.setAttribute('aria-hidden', 'true');
};

const expandDropdown = (target) => {
  target.nextSibling.classList.add('dropdown_expand');
  target.setAttribute('aria-expanded', 'true');
  target.nextSibling.setAttribute('aria-hidden', 'false');
};

const closeAllDropdowns = () => {
  dropdowns.forEach((drp) => closeDropdown(drp));
};

const toggleDropdown = (target) => {
  if (getComputedStyle(target.nextSibling).display === 'block') {
    closeDropdown(target);
  } else {
    closeAllDropdowns();
    expandDropdown(target);
  }
};

window.addEventListener('click', () => {
  closeAllDropdowns();
});

const caseGuestMap = new Map(Object.entries(guestsTranslate));
const caseRoomsMap = new Map(Object.entries(roomsTranslate));

const caseGuests = (target) => {
  const countInstance = String(
    Object.values(target).reduce((prev, curr) => prev + curr)
  );
  if (caseGuestMap.has(countInstance)) {
    return caseGuestMap.get(countInstance);
  }
  return `${countInstance} гостей`;
};

const caseRooms = (target) =>
  Object.entries(target)
    .filter((entry) => entry[1] !== 0)
    .map((entry) => {
      const preResult = `${entry[1]} ${entry[0].toLowerCase()}`;
      if (caseRoomsMap.has(preResult)) {
        return caseRoomsMap.get(preResult);
      }
      return preResult;
    })
    .join(', ');

const fillPlaceholder = (target) => {
  if (target.getAttribute('data-dropdown-type') === 'guests') {
    target.innerText = caseGuests(target);
  }
  if (target.getAttribute('data-dropdown-type') === 'rooms') {
    target.innerText = caseRooms(target);
  }
};

dropdowns.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleDropdown(event.target);
  });

  item.nextSibling.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  const countNodeValue = (node) => parseInt(node.innerText, 10);

  item.nextSibling.childNodes.forEach((elem) => {
    const countNode = elem.querySelector('.option__value');
    if (countNode) {
      const description = elem.querySelector('.option__description');

      const decBtn = elem.querySelector('.option__dec');
      const minCount = parseInt(decBtn.getAttribute('data-min-count'), 10);
      if (countNodeValue(countNode) === minCount) {
        decBtn.disabled = true;
      }

      const incBtn = elem.querySelector('.option__inc');
      const maxCount = parseInt(incBtn.getAttribute('data-max-count'), 10);
      if (countNodeValue(countNode) === maxCount) {
        incBtn.disabled = true;
      }

      const changeCountNode = (sign) => {
        const countNodeNewValue = countNodeValue(countNode) + sign;
        countNode.innerText = countNodeNewValue;
        item[description.innerText.toLowerCase()] = countNodeNewValue;
        fillPlaceholder(item);

        if (countNodeNewValue <= minCount) {
          decBtn.disabled = true;
        } else {
          decBtn.disabled = false;
        }
        if (countNodeNewValue >= maxCount) {
          incBtn.disabled = true;
        } else {
          incBtn.disabled = false;
        }
      };

      changeCountNode(0);

      decBtn.addEventListener('click', () => {
        changeCountNode(-1);
      });

      incBtn.addEventListener('click', () => {
        changeCountNode(1);
      });
    }
    fillPlaceholder(item);
  });
});
