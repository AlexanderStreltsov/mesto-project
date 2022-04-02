const getAllElementsBySelector = (element, selector) => Array.from(element.querySelectorAll(selector));

const removeClassFromListElements = (listElements, className) => listElements.forEach(element => element.classList.remove(className));

export { getAllElementsBySelector, removeClassFromListElements };
