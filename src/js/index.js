import '../pages/index.css';
import {
  initialCards,
  currentName,
  currentJob,
  profileEditButton,
  profilePopupCloseButton,
  profileForm,
  profileNameInput,
  profileJobInput,
  cardAddButton,
  profilePopup,
  popupAddCard,
  popupAddCardCloseButton,
  cardForm,
  cardNameInput,
  cardLinkInput,
  popupViewer,
  popupViewerCloseButton
} from './constants.js';
import { createCard, addCard } from './card.js';
import {
  openPopup,
  closePopup,
  submitProfileHandler,
  submitCardHandler
} from './modal.js';

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  openPopup(profilePopup);
});
profilePopupCloseButton.addEventListener("click", () => closePopup(profilePopup));
profileForm.addEventListener("submit", submitProfileHandler);

cardAddButton.addEventListener("click", () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openPopup(popupAddCard);
});
popupAddCardCloseButton.addEventListener("click", () => closePopup(popupAddCard));
cardForm.addEventListener("submit", submitCardHandler);

popupViewerCloseButton.addEventListener("click", () => closePopup(popupViewer));

addCard('appendSomeCards', initialCards.map(item => createCard(item.name, item.link)));
