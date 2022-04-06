import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
import { enableValidation, toogleButtonState } from "./validate";
import { createCard, renderCard, setActionCardHandlers } from "./card";
import { getAllElementsBySelector, removeClassFromListElements } from "./utils";
import { getAllCards, getProfileInfo, editProfileInfo, addCard } from "./api";
import {
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
  cardLinkInput,
  validationConfig,
  apiConfig,
} from "./constants";

const submitProfileHandler = (evt) => {
  evt.preventDefault();

  const bodyData = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  };

  editProfileInfo(bodyData, apiConfig)
    .then((profile) => {
      currentName.textContent = profile.name;
      currentJob.textContent = profile.about;
      closePopup(profilePopup);
    })
    .catch((err) => console.log(err));
};

const submitCardHandler = (evt) => {
  evt.preventDefault();

  const bodyData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(bodyData, apiConfig)
    .then((card) => {
      const newCardElement = createCard(
        card._id,
        card.owner._id,
        card.name,
        card.link,
        card.likes,
        cardConfig
      );
      renderCard("prependOneCard", newCardElement);
      closePopup(popupAddCard);
    })
    .catch((err) => console.log(err));
};

const clearFormInputError = (popup) => {
  const errors = getAllElementsBySelector(
    popup,
    validationConfig.errorSelector
  );
  const invalidInputs = getAllElementsBySelector(
    popup,
    validationConfig.inputInvalidSelector
  );
  removeClassFromListElements(errors, validationConfig.errorClass);
  removeClassFromListElements(
    invalidInputs,
    validationConfig.inputInvalidClass
  );
};

const editProfileHandler = () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  clearFormInputError(profilePopup);
  toogleButtonState(
    profilePopup,
    [profileNameInput, profileJobInput],
    validationConfig
  );
  openPopup(profilePopup);
};

const addCardHandler = () => {
  cardForm.reset();
  clearFormInputError(popupAddCard);
  toogleButtonState(
    popupAddCard,
    [cardNameInput, cardLinkInput],
    validationConfig
  );
  openPopup(popupAddCard);
};

profileEditButton.addEventListener("click", editProfileHandler);
cardAddButton.addEventListener("click", addCardHandler);
cardsContainer.addEventListener("click", (evt) =>
  setActionCardHandlers(evt, cardConfig, apiConfig)
);

profileForm.addEventListener("submit", submitProfileHandler);
cardForm.addEventListener("submit", submitCardHandler);

enableValidation(validationConfig);

getProfileInfo(apiConfig)
  .then((profile) => {
    currentName.textContent = profile.name;
    currentName.setAttribute("data-owner-id", profile._id);
    currentJob.textContent = profile.about;
  })
  .catch((err) => console.log(err));

getAllCards(apiConfig)
  .then((cards) => {
    const serverCards = cards.map((card) => {
      return createCard(
        card._id,
        card.owner._id,
        card.name,
        card.link,
        card.likes,
        cardConfig
      );
    });
    renderCard("appendSomeCards", serverCards);
  })
  .catch((err) => console.log(err));
