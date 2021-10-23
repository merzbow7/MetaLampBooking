import createNode from './utils';

class LampCalendarBody {
  constructor(cal) {
    this.cal = cal;
    this.month = cal.lampMonth;
    this.createNode = createNode;
  }

  emitEvent(date) {
    this.cal.setDate(date);
  }

  createButton({ n = 0, _class = '', month = '', date = null } = {}) {
    const buttonColor =
      date === this.month.today ? 'button_green' : 'button_white';
    const dayButton = this.createNode({
      tag: 'button',
      className: `button ${buttonColor} button_round button_center calendar__day ${_class}`,
      innerHTML: n,
      attrs: { 'aria-label': `${n} ${month}`, 'data-result-date': date },
    });
    dayButton.addEventListener('click', (e) => {
      this.emitEvent(e.target.getAttribute('data-result-date'));
    });
    return dayButton;
  }

  buildMonth(source, target, monthObject) {
    source.forEach((key) =>
      key.forEach((day) =>
        target.push(
          this.createButton({
            n: day,
            _class: monthObject.class || '',
            month: this.month.prevMonthName.string,
            date: this.month.prevMonthName.date.replace(/^\d+/, day),
          })
        )
      )
    );
  }

  createMonthPage() {
    const monthPage = [];
    const days = this.month.monthDays();
    // eslint-disable-next-line no-unused-vars
    const months = {
      prev: {
        source: '',
        method: 'prevMonthName',
        class: 'calendar__day_lighter',
      },
      current: { method: 'currentMonthName' },
      next: { method: 'nextMonthName', class: 'calendar__day_lighter' },
    };

    days.prev.forEach((day) =>
      monthPage.push(
        this.createButton({
          n: day,
          _class: 'calendar__day_lighter',
          month: this.month.prevMonthName.string,
          date: this.month.prevMonthName.date.replace(/^\d+/, day),
        })
      )
    );

    days.current.forEach((day) =>
      monthPage.push(
        this.createButton({
          n: day,
          month: this.month.currentMonthName.string,
          date: this.month.currentMonthName.date.replace(/^\d+/, day),
        })
      )
    );

    days.next.forEach((day) =>
      monthPage.push(
        this.createButton({
          n: day,
          _class: 'calendar__day_lighter',
          month: this.month.nextMonthName.string,
          date: this.month.nextMonthName.date.replace(/^\d+/, day),
        })
      )
    );

    return monthPage;
  }

  fillDays() {
    if (!this.calendarDays) {
      this.calendarDays = this.createNode({ className: 'calendar__days' });
    }
    this.createMonthPage().forEach((day) => this.calendarDays.appendChild(day));
    return this.calendarDays;
  }

  clearDays() {
    while (this.calendarDays.firstChild) {
      this.calendarDays.removeChild(this.calendarDays.firstChild);
    }
  }

  updateDays() {
    this.clearDays();
    this.fillDays();
  }

  createBody() {
    this.body = this.createNode({ className: 'calendar__body' });

    this.body.weekday = this.createNode({ className: 'calendar__weekday' });
    this.body.appendChild(this.body.weekday);
    this.month.week.forEach((day) =>
      this.body.weekday.appendChild(this.createNode({ innerHTML: day }))
    );

    this.body.appendChild(this.fillDays());

    return this.body;
  }

  static build(calendar) {
    return new this(calendar).createBody();
  }
}

export default LampCalendarBody;
