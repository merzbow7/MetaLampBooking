import createNode from './utils';
import LampMonth from './lamp-date';
import LampCalendarBody from './lamp-calendar-body';

class Calendar {
  constructor(parentNode = null) {
    this.createNode = createNode;
    this.target = parentNode;
    this.target2 = this.getTargetSibling();
    this.parentNode = this.wrapTarget(this.target);
    this.state = 0;

    this.lampMonth = new LampMonth(this);
    this.month = this.lampMonth;

    this.parentNode.appendChild(this.init());
    this.addHandlers();
    this.dates = new Array(2).fill(null);
  }

  getTargetSibling() {
    if (this.target.nextSibling) {
      if (this.target.nextSibling.getName === 'INPUT') {
        return this.target.nextSibling;
      }
    }
    return null;
  }

  setDate(date) {
    this.target.value = date;
  }

  set date(date) {
    this.dates[this.state] = date;
  }

  get date() {
    return this.dates[this.state];
  }

  wrapTarget(target) {
    if (!target) return null;
    let parent = target.parentNode;
    if (!this.wrapper) {
      this.wrapper = this.createNode({ className: 'calendar-wrapper' });
      if (parent.tagName === 'LABEL') {
        target = parent;
        parent = parent.parentNode;
      }
    }
    const newTarget = target.cloneNode(true);
    this.wrapper.appendChild(newTarget);
    parent.replaceChild(this.wrapper, target);
    this.target = this.wrapper.querySelector('input');
    return this.wrapper;
  }

  addHandlers() {
    this.target.addEventListener('input', (event) => event.preventDefault());
    this.target.addEventListener('click', () => {
      this.state = 1;
      this.calendar.classList.toggle('calendar_active');
    });
    if (this.target2) {
      this.target2.addEventListener('click', () => {
        this.state = 2;
        this.calendar.classList.toggle('calendar_active');
      });
    }
  }

  send(obj, method) {
    try {
      this.calendar[obj][method]();
    } catch (e) {
      console.error(e);
    }
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
    const row = this.createNode({
      className: 'card__row',
    });
    const arrowBack = this.createNode({
      tag: 'button',
      className: 'calendar__arrow',
      innerHTML: 'arrow_back',
      attrs: { 'aria-label': 'Предыдущий месяц' },
    });
    const arrowForward = this.createNode({
      tag: 'button',
      className: 'calendar__arrow',
      innerHTML: 'arrow_forward',
      attrs: { 'aria-label': 'Следующий месяц' },
    });
    this.monthString = this.createNode({
      className: 'calendar__month-name',
      innerHTML: this.month.monthString(),
    });

    arrowBack.addEventListener('click', this.prevMonth.bind(this));
    arrowForward.addEventListener('click', this.nextMonth.bind(this));

    row.appendChild(arrowBack);
    row.appendChild(this.monthString);
    row.appendChild(arrowForward);
    this.header.appendChild(row);
    return this.header;
  }

  createControls() {
    this.controls = this.createNode({ className: 'controls card__row' });
    const reset = this.createNode({
      tag: 'button',
      className: 'option__reset',
      attrs: { 'aria-label': 'Очистить' },
      innerHTML: 'Очистить',
    });
    const apply = this.createNode({
      tag: 'button',
      className: 'option__apply',
      attrs: { 'aria-label': 'Применить' },
      innerHTML: 'Применить',
    });
    this.controls.appendChild(reset);
    this.controls.appendChild(apply);

    return this.controls;
  }

  init() {
    this.calendar = this.createNode({ tag: 'div', className: 'calendar' });

    // header month section
    this.calendar.month = this.createHeader();
    this.calendar.appendChild(this.calendar.month);

    // body section
    this.calendar.body = new LampCalendarBody(this);
    this.calendar.appendChild(this.calendar.body.createBody());

    // control section
    this.calendar.controls = this.createControls();
    this.calendar.appendChild(this.calendar.controls);

    return this.calendar;
  }
}

const calendars = document.querySelectorAll('[data-form-type="calendar"]');
calendars.forEach((calendar) => new Calendar(calendar));
