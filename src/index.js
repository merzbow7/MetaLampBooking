import './style/style.scss';
import 'air-datepicker';
// eslint-disable-next-line no-unused-vars
// import $ from 'jquery';

function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('./pug/', true, /\.js$/));
