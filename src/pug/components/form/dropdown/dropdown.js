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

const fillPlaceholder = (target, apply) => {
  if (
    target.getAttribute('data-dropdown-type') === 'guests' &&
    apply === true
  ) {
    target.innerText = caseGuests(target);
  }
  if (target.getAttribute('data-dropdown-type') === 'rooms') {
    target.innerText = caseRooms(target);
  }
};

const nodeToInteger = (node) => parseInt(node.innerText, 10);

const initButtons = (baseNode) => {
  const decBtn = baseNode.previousSibling;
  decBtn.minCount = +decBtn.getAttribute('data-min-count');
  decBtn.disabled = nodeToInteger(baseNode) <= decBtn.minCount;

  const incBtn = baseNode.nextSibling;
  incBtn.maxCount = +incBtn.getAttribute('data-max-count');
  incBtn.disabled = nodeToInteger(baseNode) >= incBtn.maxCount;

  return { decBtn, incBtn };
};

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleDropdown(event.target);
  });

  dropdown.nextSibling.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  const resetToDeafault = (node) => {
    const countNode = node.querySelector('.option__value');
    const description = node.querySelector('.option__description');
    if (countNode && description) {
      dropdown[description.innerText.toLowerCase()] = nodeToInteger(countNode);
    }
  };

  const dropdownOptionsList = dropdown.nextSibling;
  const dropdownOptions = dropdownOptionsList.childNodes;
  const controls = dropdownOptionsList.querySelector('.option__controls');

  const isAllValuesDefault = () => {
    let result = true;
    dropdownOptions.forEach((node) => {
      const value = node.querySelector('.option__value');
      if (value) {
        if (value.innerText !== value.getAttribute('data-default-count')) {
          result = false;
        }
      }
    });
    return result;
  };

  if (controls) {
    dropdown.reset = controls.querySelector('.option__reset');
    Object.defineProperty(dropdown, 'reset', {
      enumerable: false,
    });
    dropdown.reset.addEventListener('click', () => {
      dropdownOptions.forEach((node) => {
        const value = node.querySelector('.option__value');
        if (value) {
          value.innerText = value.getAttribute('data-default-count');
          resetToDeafault(node);
          initButtons(value);
        }
      });
      fillPlaceholder(dropdown, true);
    });

    dropdown.apply = controls.querySelector('.option__apply');
    Object.defineProperty(dropdown, 'apply', {
      enumerable: false,
    });
    dropdown.apply.addEventListener('click', () => {
      fillPlaceholder(dropdown, true);
    });
  }

  const toggleReset = () => {
    if (dropdown.reset) {
      dropdown.reset.style.display = isAllValuesDefault() ? 'none' : 'block';
    }
  };

  dropdownOptions.forEach((elem) => {
    const countNode = elem.querySelector('.option__value');
    if (countNode) {
      const description = elem.querySelector('.option__description');

      const { decBtn, incBtn } = initButtons(countNode);

      const changeCountNode = (sign) => {
        const countNodeNewValue = nodeToInteger(countNode) + sign;
        countNode.innerText = countNodeNewValue;
        dropdown[description.innerText.toLowerCase()] = countNodeNewValue;

        decBtn.disabled = countNodeNewValue <= decBtn.minCount;
        incBtn.disabled = countNodeNewValue >= incBtn.maxCount;
      };

      const mathHanfler = (sign) => {
        changeCountNode(sign);
        fillPlaceholder(dropdown);
        toggleReset();
      };

      mathHanfler(0);

      decBtn.addEventListener('click', () => {
        mathHanfler(-1);
      });

      incBtn.addEventListener('click', () => {
        mathHanfler(1);
      });
    }

    fillPlaceholder(dropdown);
  });
});
