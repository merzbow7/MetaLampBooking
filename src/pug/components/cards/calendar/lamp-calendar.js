import createNode from './utils';
import LampMonth from './lamp-date';
import LampCalendarHeader from './lamp-calendar-header';
import LampCalendarBody from './lamp-calendar-body';
import LampCalendarControls from './lamp-calendar-controls';

class Calendar {
  constructor(parentNode) {
    this.parentNode = document.querySelector(parentNode).parentNode;
    this.lampMonth = new LampMonth(this);
    this.createNode = createNode;
    this.init();
  }

  send(obj, method) {
    try {
      this.calendar[obj][method]();
    } catch (e) {
      console.error(e);
    }
  }

  init() {
    this.calendar = this.createNode({ tag: 'div', className: 'calendar' });

    // header month section
    this.calendar.month = new LampCalendarHeader(this);
    this.calendar.appendChild(this.calendar.month.createHeader());

    // body section
    this.calendar.body = new LampCalendarBody(this);
    this.calendar.appendChild(this.calendar.body.createBody());

    // control section
    this.calendar.controls = new LampCalendarControls(this);
    this.calendar.appendChild(this.calendar.controls.createControls());

    this.parentNode.appendChild(this.calendar);
  }
}

const calendar = new Calendar('#datepickertest');
export default calendar;
