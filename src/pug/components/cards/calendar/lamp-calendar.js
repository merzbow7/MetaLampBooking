import createNode from './utils';
import LampMonth from './lamp-date';
import LampCalendarBody from './lamp-calendar-body';

class Calendar {
  constructor(parentNode = null, secondParent = null) {
    this.createNode = createNode;
    this.target = parentNode;
    this.target2 = document.querySelector(secondParent);

    this.parentNode = this.wrapTarget();

    this.lampMonth = new LampMonth(this);
    this.month = this.lampMonth;

    this.parentNode.appendChild(this.init());
    this.addHandlers();
  }

  setDate(date) {
    this.target.value = date;
  }

  wrapTarget() {
    let { target } = this;
    let parent = target.parentNode;
    const wrapper = this.createNode({ className: 'calendar-wrapper' });
    if (parent.tagName === 'LABEL') {
      target = parent;
      parent = parent.parentNode;
    }
    const newTarget = target.cloneNode(true);
    wrapper.appendChild(newTarget);
    parent.replaceChild(wrapper, target);
    this.target = wrapper.querySelector('input');
    return wrapper;
  }

  addHandlers() {
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
