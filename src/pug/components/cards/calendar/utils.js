function createNode({
  tag = 'div',
  className = '',
  innerHTML = '',
  attrs = '',
}) {
  const resultNode = document.createElement(tag);
  if (className) {
    resultNode.classList.add(
      ...className.split(' ').filter((el) => Boolean(el))
    );
  }
  if (attrs) {
    Object.keys(attrs)
      .filter((el) => attrs[el])
      .forEach((attr) => resultNode.setAttribute(attr, attrs[attr]));
  }
  resultNode.innerHTML = innerHTML;
  return resultNode;
}

export default createNode;
