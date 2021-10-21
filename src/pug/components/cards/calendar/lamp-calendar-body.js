import createNode from './utils';

class LampCalendarBody {
  constructor(cal) {
    this.cal = cal;
    this.month = cal.lampMonth;
    this.createNode = createNode;
  }

  makeButton(n) {
    return this.createNode({
      tag: 'button',
      className:
        'button button-solid button-solid_white button_round button_center',
      innerHTML: this.createNode({
        className: 'button__text',
        innerHTML: n,
      }).outerHTML,
    });
  }

  fillDays() {
    if (!this.calendarDays) {
      this.calendarDays = this.createNode({ className: 'calendar__days' });
    }
    const days = this.month.monthDays();
    days.forEach((day) => this.calendarDays.appendChild(this.makeButton(day)));
    return this.calendarDays;
  }

  updateDays() {
    this.clearDays();
    this.fillDays();
  }

  clearDays() {
    while (this.calendarDays.firstChild) {
      this.calendarDays.removeChild(this.calendarDays.firstChild);
    }
  }

  createBody() {
    this.body = this.createNode({ className: 'calendar__body' });

    this.body.weekday = this.createNode({ className: 'calendar__weekday' });
    this.body.appendChild(this.body.weekday);
    this.month.week.forEach((day) =>
      this.body.weekday.insertAdjacentHTML('beforeend', `<span>${day}</span>`)
    );

    this.body.appendChild(this.fillDays());

    return this.body;
  }

  static build(calendar) {
    return new this(calendar).createBody();
  }
}

export default LampCalendarBody;
