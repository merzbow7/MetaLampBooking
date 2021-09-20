const maskedData = document.querySelectorAll('[data-form-type="date"]');

maskedData.forEach((item) =>
  item.addEventListener('input', (event) => {
    console.log(event.target.value);
  })
);

const dateControl = document.querySelector('input[type="date"]');
dateControl.value = '2021-09-20';
console.log(dateControl);
