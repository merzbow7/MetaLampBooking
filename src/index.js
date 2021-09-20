import './style/style.scss';

function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('./pug/', true, /\.js$/));
