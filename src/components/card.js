import { cardsContainer } from './constants.js';
import { openPopup } from './modal.js';

const createCard = (name, link, config) => {
  const cardTemplate = document.querySelector(config.templateSelector).content;
  const cardElement = cardTemplate.querySelector(config.cardSelector).cloneNode(true);
  const cardImage = cardElement.querySelector(config.imageSelector);
  const cardName = cardElement.querySelector(config.nameSelector);

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  return cardElement;
}

const addCard = (type, data) => {
  switch (type) {
    case 'appendSomeCards':
      data.forEach(item => cardsContainer.append(item));
      break;
    case 'prependOneCard':
      cardsContainer.prepend(data);
      break;
    default:
      console.log(`Insert type ${type} not in select`);
      break;
  }
}

const openImageCardViewer = (element, config) => {
  const popupViewer = document.querySelector(config.popupViewerSelector);
  const popupViewerImage = popupViewer.querySelector(config.popupViewerImageSelector);
  const popupViewerDescription = popupViewer.querySelector(config.popupViewerDescriptionSelector);
  const imageElement = element.querySelector(config.imageSelector);

  popupViewerImage.src = imageElement.src;
  popupViewerImage.alt = imageElement.alt;
  popupViewerDescription.textContent = imageElement.alt;

  openPopup(popupViewer);
}

const setActionCardHandlers = (evt, config) => {
  const element = evt.target;
  switch (element.classList[0]) {
    case config.imageOverlayClass:
      openImageCardViewer(element, config);
      break;
    case config.likeClass:
      element.classList.toggle(config.likeActiveClass);
      break;
    case config.deleteClass:
      element.parentElement.remove();
      break;
    default:
      break;
  }
}

export {
  createCard,
  addCard,
  setActionCardHandlers
}
