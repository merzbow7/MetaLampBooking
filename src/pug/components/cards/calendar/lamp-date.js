class LampMonth {
  constructor(calendar) {
    this.week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    this.getNow = () => new Date();
    this.currentMonth = new Date();
    this.calendar = calendar;
  }

  get now() {
    return this.getNow();
  }

  get getCurrentMonth() {
    return this.currentMonth;
  }

  setNextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.calendar.send('body', 'updateDays');
    return this.getMonth;
  }

  setPrevMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      0
    );
    this.calendar.send('body', 'updateDays');
    return this.getMonth;
  }

  get getMonth() {
    return {
      firstDay: new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        1
      ),
      lastDay: new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1,
        0
      ),
    };
  }

  get nextMonth() {
    return {
      firstDay: new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1,
        1
      ),
      lastDay: new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 2,
        0
      ),
    };
  }

  get prevMonth() {
    return {
      firstDay: new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() - 1,
        1
      ),
      lastDay: new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        0
      ),
    };
  }

  get firstDay() {
    return new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
  }

  get lastDay() {
    return new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );
  }

  monthString() {
    return this.currentMonth
      .toLocaleDateString('ru', { year: 'numeric', month: 'long' })
      .replace(/\s+(Г.|г.)/, '');
  }

  monthDays() {
    const monthDays = Array(this.lastDay.getDate())
      .fill(null)
      .map((_, i) => i + 1);

    Array(this.firstDay.getDay() === 0 ? 0 : this.firstDay.getDay() - 1)
      .fill(null)
      .forEach((_, index) =>
        monthDays.unshift(this.prevMonth.lastDay.getDate() - index)
      );
    if (monthDays.length % 7 !== 0)
      Array(7 - (monthDays.length % 7))
        .fill(null)
        .forEach((_, index) => monthDays.push(index + 1));
    return monthDays;
  }
}

window.LampMonth = new LampMonth();

export default LampMonth;
