const getAllElementsBySelector = (element, selector) => {
  return Array.from(element.querySelectorAll(selector));
};

const removeClassFromListElements = (listElements, className) => {
  return listElements.forEach((element) => element.classList.remove(className));
};

const isElementContainClass = (element, className) => {
  return element.classList.contains(className);
};

const toggleElementClass = (element, className) => {
  return element.classList.toggle(className);
};

export {
  getAllElementsBySelector,
  removeClassFromListElements,
  isElementContainClass,
  toggleElementClass,
};
