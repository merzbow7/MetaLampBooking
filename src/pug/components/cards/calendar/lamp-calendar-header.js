import createNode from './utils';

class LampCalendarHeader {
  constructor(cal) {
    this.cal = cal;
    this.month = cal.lampMonth;
    this.createNode = createNode;
  }

  nextMonth() {
    this.month.setNextMonth();
    this.monthString.innerHTML = this.month.monthString();
  }

  prevMonth() {
    this.month.setPrevMonth();
    this.monthString.innerHTML = this.month.monthString();
  }

  createHeader() {
    this.header = this.createNode({
      className: 'calendar__month calendar_mb-10',
    });
    this.row = this.createNode({
      className: 'card__row',
    });
    this.arrowBack = this.createNode({
      tag: 'button',
      className: 'calendar__arrow',
      innerHTML: 'arrow_back',
      attrs: { 'aria-label': 'Предыдущий месяц' },
    });
    this.arrowForward = this.createNode({
      tag: 'button',
      className: 'calendar__arrow',
      innerHTML: 'arrow_forward',
      attrs: { 'aria-label': 'Следующий месяц' },
    });
    this.monthString = this.createNode({
      className: 'calendar__month-name',
      innerHTML: this.month.monthString(),
    });

    this.arrowBack.addEventListener('click', this.prevMonth.bind(this));
    this.arrowForward.addEventListener('click', this.nextMonth.bind(this));

    this.row.appendChild(this.arrowBack);
    this.row.appendChild(this.monthString);
    this.row.appendChild(this.arrowForward);
    this.header.appendChild(this.row);
    return this.header;
  }

  static build(calendar) {
    return new this(calendar).createHeader();
  }
}

export default LampCalendarHeader;
