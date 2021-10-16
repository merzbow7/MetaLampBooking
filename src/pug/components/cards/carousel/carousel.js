class Carousel {
  constructor(carousel, active = 0) {
    this.carousel = carousel;
    this.active = active;

    this.images = this.carousel.querySelector('.carousel__inner').childNodes;
    this.indicators = this.carousel.querySelector(
      '.carousel__indicators'
    ).childNodes;

    this.prev = this.carousel.querySelector('.carousel__prev');
    this.next = this.carousel.querySelector('.carousel__next');

    this.next.addEventListener('click', this.nextImg.bind(this));
    this.prev.addEventListener('click', this.prevImg.bind(this));

    this.indicators.forEach((indicator) =>
      indicator.addEventListener('click', this.changeImage.bind(this))
    );

    this.indicatorNumber = (indicator) =>
      parseInt(indicator.getAttribute('data-bs-slide-to'), 10);

    this.setState(this.active);
  }

  changeImage(event) {
    const index = this.indicatorNumber(event.target);
    this.setImage(index);
  }

  setImage(index) {
    this.images.forEach((image) => {
      if (parseInt(image.getAttribute('data-bs-image'), 10) !== index) {
        image.className = 'carousel__item';
      } else {
        image.classList.add('carousel__item_active');
      }
    });

    this.active = index;
    this.setState(index);
  }

  setState(index) {
    this.fillIndicator(index);
    this.prev.disabled = this.active === 0;
    this.next.disabled = this.active === this.images.length - 1;
  }

  nextImg() {
    const newIndex =
      this.active < this.images.length - 1
        ? this.active + 1
        : this.images.length - 1;
    this.setImage(newIndex);
  }

  prevImg() {
    const newIndex = this.active > 0 ? this.active - 1 : 0;
    this.setImage(newIndex);
  }

  fillIndicator(fillingIndicator) {
    this.indicators.forEach((indicator) => {
      if (this.indicatorNumber(indicator) !== fillingIndicator) {
        console.log(this.indicatorNumber(indicator));
        indicator.className = 'carousel__indicator';
      } else {
        indicator.classList.add('carousel__indicator_active');
      }
    });
  }
}

const carousels = document.querySelectorAll('[data-bs-ride="carousel"]');
carousels.forEach((carousel) => new Carousel(carousel));
