const getAllElementsBySelector = (element, selector) => {
  return Array.from(element.querySelectorAll(selector));
};

const removeClassFromListElements = (listElements, className) => {
  return listElements.forEach((element) => element.classList.remove(className));
};


export {
  getAllElementsBySelector,
  removeClassFromListElements,
};
