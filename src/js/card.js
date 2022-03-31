import {
  cardTemplate,
  cardsContainer,
  popupViewer,
  popupViewerImage,
  popupViewerDescription
} from './constants.js';
import { openPopup } from './modal.js';

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__list-item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__picture');
  const cardImageOverlay = cardElement.querySelector('.cards__overlay');
  const cardName = cardElement.querySelector('.cards__title');
  const cardLikeButton = cardElement.querySelector('.cards__like-button');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  cardImageOverlay.addEventListener('click', () => {
    popupViewerImage.src = link;
    popupViewerImage.alt = name;
    popupViewerDescription.textContent = name;
    openPopup(popupViewer);
  });

  cardLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('cards__like-button_active');
  });

  cardDeleteButton.addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });

  return cardElement;
}

function addCard(insertType, insertData) {
  switch (insertType) {
    case 'appendSomeCards':
      insertData.forEach(item => cardsContainer.append(item));
      break;
    case 'prependOneCard':
      cardsContainer.prepend(insertData);
      break;
    default:
      console.log(`Insert type ${insertType} not in select`);
      break;
  }
}

export {
  createCard,
  addCard
};
