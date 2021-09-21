/* eslint-disable no-undef */

$('#date-input').datepicker();

$(() => {
  const $datepicker = $('.js-datepicker');
  const disabledDates = [0, 6];

  // eslint-disable-next-line no-unused-vars
  const datepicker = $datepicker
    .datepicker({
      autoClose: true,
      classes: 'datepicker__calendar',
      position: 'bottom right',
      offset: 22,
      // eslint-disable-next-line consistent-return
      onRenderCell(date, cellType) {
        if (cellType === 'day') {
          const day = date.getDay();
          const isDisabled = disabledDates.indexOf(day) !== -1;
          return {
            disabled: isDisabled,
          };
        }
      },
      onSelect(formattedDate, date) {
        if (date) {
          // eslint-disable-next-line no-alert
          alert(date);
        }
      },
    })
    .data('datepicker');
});
