import createNode from './utils';

class LampCalendarBody {
  constructor(cal) {
    this.cal = cal;
    this.month = cal.lampMonth;
    this.createNode = createNode;
  }

  makeButton({ n = 0, _class = '', month = '' } = {}) {
    return this.createNode({
      tag: 'button',
      className: 'button button_white button_round button_center',
      innerHTML: this.createNode({
        tag: 'span',
        className: `calendar__day ${_class}`,
        innerHTML: n,
        attrs: { 'aria-label': `${n} ${month}` },
      }).outerHTML,
    });
  }

  makeMonthPage() {
    const monthPage = [];
    const days = this.month.monthDays();
    days.prev.reverse().forEach((day) =>
      monthPage.push(
        this.makeButton({
          n: day,
          _class: 'calendar__day_lighter',
          month: this.month.prevMonthName,
        })
      )
    );

    days.current.forEach((day) =>
      monthPage.push(
        this.makeButton({ n: day, month: this.month.currentMonthName })
      )
    );

    days.next.forEach((day) =>
      monthPage.push(
        this.makeButton({
          n: day,
          _class: 'calendar__day_lighter',
          month: this.month.nextMonthName,
        })
      )
    );

    return monthPage;
  }

  fillDays() {
    if (!this.calendarDays) {
      this.calendarDays = this.createNode({ className: 'calendar__days' });
    }
    this.makeMonthPage().forEach((day) => this.calendarDays.appendChild(day));
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
