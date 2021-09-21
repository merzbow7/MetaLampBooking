const maskedData = document.querySelectorAll('[data-form-type="date"]');

const onlyNumbers = (input) => input.replace(/\D/g, '');

function formatInput(inputNumbers) {
  let formatedInput;
  if (inputNumbers.length <= 2) {
    formatedInput = inputNumbers;
  }
  if (inputNumbers.length > 2) {
    formatedInput = `${inputNumbers.slice(0, 2)}.${inputNumbers.slice(2, 4)}`;
  }
  if (inputNumbers.length > 4) {
    formatedInput += `.${inputNumbers.slice(4)}`;
  }
  return formatedInput;
}

function dateInput(event) {
  const { target } = event;
  const inputNumbers = onlyNumbers(target.value).slice(0, 8);
  if (target.value.length === target.selectionStart && event.data) {
    target.value = formatInput(inputNumbers);
  }
}

function dateEdit(event) {
  const { target } = event;
  const { code } = event;
  const { selectionStart: position } = target;
  const allowedCodes = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    'Backspace',
    'Home',
    'End',
  ];
  const allowedCode = !allowedCodes.includes(code);
  const beforePoint = target.value.charAt(position) === '.';
  const incorrectDlt = code === 'Delete' && beforePoint;
  const afterPoint = target.value.charAt(position - 1) === '.';
  const incorrectBcsp = code === 'Backspace' && afterPoint;
  const overflow = target.value.length >= 10 && allowedCode;
  const firstPoint = target.value.indexOf('.');
  const secondPointIndex = target.value.indexOf('.', firstPoint + 1);
  const secondPoint = secondPointIndex - firstPoint;
  const incorrectFirst =
    firstPoint >= 2 && position <= firstPoint && allowedCode;
  const incorrectSecond =
    secondPoint >= 3 &&
    position <= secondPointIndex &&
    position > firstPoint &&
    allowedCode;
  // const yearLen = target.value.length - secondPoint + firstPoint;
  const incorrectThird =
    position > secondPointIndex &&
    secondPointIndex > 0 &&
    target.value.slice(secondPointIndex + 1).length - secondPointIndex >= 3 &&
    allowedCode;
  if (incorrectBcsp) {
    target.selectionStart -= 1;
    target.selectionEnd = target.selectionStart;
  }
  if (((incorrectFirst || incorrectSecond) && allowedCode) || incorrectDlt) {
    target.selectionStart += 1;
  }
  if (overflow || incorrectThird) {
    event.preventDefault();
  }
}

maskedData.forEach((item) => {
  item.addEventListener('input', (event) => dateInput(event));
  item.addEventListener('keydown', (event) => dateEdit(event));
});

const dateControl = document.querySelector('input[type="date"]');
console.log(dateControl);
