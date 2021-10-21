class LampMonth {
  constructor(calendar) {
    this.week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    this.months = new Map(
      Object.entries({
        январь: 'Января',
        февраль: 'Февраля',
        март: 'Марта',
        апрель: 'Апреля',
        май: 'Мая',
        июнь: 'Июня',
        июль: 'Июля',
        август: 'Августа',
        сентябрь: 'Сентября',
        октябрь: 'Октября',
        ноябрь: 'Ноября',
        декабрь: 'Декабря',
      })
    );
    console.log(this.months);
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

  get currentMonthName() {
    return this.months.get(
      this.currentMonth.toLocaleString('ru', { month: 'long' }).toLowerCase()
    );
  }

  get nextMonthName() {
    return this.months.get(
      this.nextMonth.firstDay
        .toLocaleString('ru', { month: 'long' })
        .toLowerCase()
    );
  }

  get prevMonthName() {
    return this.months.get(
      this.prevMonth.lastDay
        .toLocaleString('ru', { month: 'long' })
        .toLowerCase()
    );
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
    const currentMonthDays = Array(this.lastDay.getDate())
      .fill(null)
      .map((_, i) => i + 1);

    const prevMonth = Array(
      this.firstDay.getDay() === 0 ? 6 : this.firstDay.getDay() - 1
    )
      .fill(null)
      .map((_, index) => this.prevMonth.lastDay.getDate() - index);
    const lackDays = [...prevMonth, ...currentMonthDays];
    const nextMonth = Array(7 - (lackDays.length % 7))
      .fill(null)
      .map((_, index) => index + 1);

    return {
      prev: prevMonth,
      current: currentMonthDays,
      next: lackDays.length % 7 !== 0 ? nextMonth : [],
    };
  }
}

export default LampMonth;
