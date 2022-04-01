import '../pages/index.css';
import { openPopup, closePopup } from './modal.js';
import { createCard, addCard, setActionCardHandlers } from './card.js';
import {
  initialCards,
  cardConfig,
  currentName,
  currentJob,
  profileEditButton,
  profilePopup,
  profileForm,
  profileNameInput,
  profileJobInput,
  cardsContainer,
  cardAddButton,
  popupAddCard,
  cardForm,
  cardNameInput,
  cardLinkInput
} from './constants.js';

const submitProfileHandler = (evt) => {
  evt.preventDefault();
  currentName.textContent = profileNameInput.value;
  currentJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}

const submitCardHandler = (evt) => {
  evt.preventDefault();
  const newCardElement = createCard(cardNameInput.value, cardLinkInput.value, cardConfig);
  addCard('prependOneCard', newCardElement);
  closePopup(popupAddCard);
}

const editProfileHandler = () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  openPopup(profilePopup);
}

const addCardHandler = () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openPopup(popupAddCard);
}

const initCardsElements = initialCards.map(item => createCard(item.name, item.link, cardConfig));

profileEditButton.addEventListener("click", editProfileHandler);
cardAddButton.addEventListener("click", addCardHandler);
cardsContainer.addEventListener('click', evt => setActionCardHandlers(evt, cardConfig));

profileForm.addEventListener("submit", submitProfileHandler);
cardForm.addEventListener("submit", submitCardHandler);

addCard('appendSomeCards', initCardsElements);