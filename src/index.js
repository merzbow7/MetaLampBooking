import './style/style.scss';

function requireAll(requireContext) {
  requireContext.keys().forEach(requireContext);
}

requireAll(require.context('./pug/', true, /\.js$/));
