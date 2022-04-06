const getAllElementsBySelector = (element, selector) => Array.from(element.querySelectorAll(selector));

const removeClassFromListElements = (listElements, className) => listElements.forEach(element => element.classList.remove(className));

const isElementContainClass = (element, className) => element.classList.contains(className);

const toggleElementClass = (element, className) => element.classList.toggle(className);

export {
  getAllElementsBySelector,
  removeClassFromListElements,
  isElementContainClass,
  toggleElementClass
};
