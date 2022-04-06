import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
import { enableValidation, toogleButtonState } from "./validate";
import { getAllElementsBySelector, removeClassFromListElements } from "./utils";
import {
  createCard,
  renderCard,
  setActionCardHandlers,
  submitDeleteCardHandler,
} from "./card";
import {
  getAllCards,
  getProfileInfo,
  editProfileInfo,
  addCard,
  updateProfileLink,
} from "./api";
import {
  cardConfig,
  currentName,
  currentJob,
  profileEditButton,
  profilePopup,
  profileForm,
  profileNameInput,
  profileJobInput,
  profileSubmitButton,
  cardsContainer,
  cardAddButton,
  popupAddCard,
  cardForm,
  cardNameInput,
  cardLinkInput,
  cardSubmitButton,
  validationConfig,
  apiConfig,
  avatarProfile,
  avatarPopup,
  avatarForm,
  avatarLinkInput,
  avatarSubmitButton,
  confirmDeleteForm,
  confirmDeleteButton,
} from "./constants";

const changeButtonContent = (button, text) => {
  button.textContent = text;
  button.disabled = true;
};

const submitProfileHandler = (evt) => {
  evt.preventDefault();

  changeButtonContent(profileSubmitButton, "Сохранение...");

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
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(profileSubmitButton, "Сохранение"));
};

const submitCardHandler = (evt) => {
  evt.preventDefault();

  changeButtonContent(cardSubmitButton, "Сохранение...");

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
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(cardSubmitButton, "Создать"));
};

const submitAvatarHandler = (evt) => {
  evt.preventDefault();

  changeButtonContent(avatarSubmitButton, "Сохранение...");

  const bodyData = {
    avatar: avatarLinkInput.value,
  };

  updateProfileLink(bodyData, apiConfig)
    .then((profile) => {
      avatarProfile.style.backgroundImage = `url(${profile.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(avatarSubmitButton, "Сохранить"));
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

const editAvatarHandler = () => {
  avatarForm.reset();
  clearFormInputError(avatarPopup);
  toogleButtonState(avatarPopup, [avatarLinkInput], validationConfig);
  openPopup(avatarPopup);
};

profileEditButton.addEventListener("click", editProfileHandler);
cardAddButton.addEventListener("click", addCardHandler);
avatarProfile.addEventListener("click", editAvatarHandler);
cardsContainer.addEventListener("click", (evt) =>
  setActionCardHandlers(evt, cardConfig, apiConfig)
);

profileForm.addEventListener("submit", submitProfileHandler);
cardForm.addEventListener("submit", submitCardHandler);
avatarForm.addEventListener("submit", submitAvatarHandler);
confirmDeleteForm.addEventListener("submit", (evt) =>
  submitDeleteCardHandler(
    evt,
    confirmDeleteButton.getAttribute("data-card-id"),
    apiConfig
  )
);

enableValidation(validationConfig);

getProfileInfo(apiConfig)
  .then((profile) => {
    avatarProfile.style.backgroundImage = `url(${profile.avatar}`;
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
