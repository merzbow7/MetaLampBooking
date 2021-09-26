import './style/style.scss';

import 'jquery';
import 'air-datepicker';

function requireAll(requireContext) {
  requireContext.keys().forEach(requireContext);
}

requireAll(require.context('./pug/', true, /\.js$/));
