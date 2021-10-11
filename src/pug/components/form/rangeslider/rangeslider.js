/* eslint-disable no-unused-vars */
const rangeSliders = document.querySelectorAll(
  '[data-form-type="range-slider"]'
);

rangeSliders.forEach((slider) => {
  const min = slider.querySelector('[data-range-slider="min"]');
  const max = slider.querySelector('[data-range-slider="max"]');

  const thumbLeft = slider.querySelector('.thumb__left');
  const thumbRight = slider.querySelector('.thumb__right');
  const range = slider.querySelector('.slider__range');

  function changeRangeText(minCount, maxCount) {
    const sliderGroup = slider.parentNode;
    const text = sliderGroup.querySelector('.slider-group__text');
    const lowRange =
      (parseInt(slider.getAttribute('data-range-min'), 10) * minCount) / 100;
    const highRange =
      (parseInt(slider.getAttribute('data-range-max'), 10) * maxCount) / 100;
    const currency = slider.getAttribute('data-range-currency');
    const low = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency,
      maximumSignificantDigits: 3,
    }).format(lowRange);

    const high = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency,
      maximumSignificantDigits: 3,
    }).format(highRange);
    text.innerText = `${low} - ${high}`;
  }

  function computedLeft() {
    const minLeft = parseInt(min.min, 10);
    const maxLeft = parseInt(min.max, 10);
    min.value = Math.min(parseInt(min.value, 10), parseInt(max.value, 10));

    const percent = ((min.value - minLeft) / (maxLeft - minLeft)) * 100;
    thumbLeft.style.left = `${percent}%`;
    thumbLeft.style.transform = `translate(${-1 - 0.1 * percent}px)`;
    range.style.left = `${percent}%`;
    range.style.width = `${max.value - min.value}%`;
    changeRangeText(min.value, max.value);
  }

  function computedRight() {
    const maxRight = parseInt(max.max, 10);
    const minRight = parseInt(max.min, 10);
    max.value = Math.max(parseInt(min.value, 10), parseInt(max.value, 10));

    const percent = ((max.value - minRight) / (maxRight - minRight)) * 100;
    thumbRight.style.right = `${100 - percent}%`;
    thumbRight.style.transform = `translate(${11 - 0.1 * percent}px)`;
    range.style.right = `${100 - percent}%`;
    range.style.width = `${max.value - min.value}%`;
    changeRangeText(min.value, max.value);
  }

  computedLeft();
  computedRight();

  min.addEventListener('input', computedLeft);

  max.addEventListener('input', computedRight);
});
