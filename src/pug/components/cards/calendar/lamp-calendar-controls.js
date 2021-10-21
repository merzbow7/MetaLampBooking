import createNode from './utils';

class LampCalendarControls {
  constructor(cal) {
    this.cal = cal;
    this.month = cal.lampMonth;
    this.createNode = createNode;
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

  static build(calendar) {
    return new this(calendar).createControls();
  }
}

export default LampCalendarControls;
