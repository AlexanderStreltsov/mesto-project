import {
  cardNameInput,
  cardLinkInput,
  popupAddCard
} from './constants.js';
import { addCard, createCard } from './card.js';

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitProfileHandler(evt) {
  evt.preventDefault();
  currentName.textContent = profileNameInput.value;
  currentJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}

function submitCardHandler(evt) {
  evt.preventDefault();
  const newCardElement = createCard(cardNameInput.value, cardLinkInput.value);
  addCard('prependOneCard', newCardElement);
  closePopup(popupAddCard);
}

export {
  openPopup,
  closePopup,
  submitProfileHandler,
  submitCardHandler
};
