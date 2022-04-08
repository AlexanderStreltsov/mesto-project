import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
import { createCard, renderCard } from "./card";
import { enableValidation, toogleButtonState } from "./validate";
import { getAllElementsBySelector, removeClassFromListElements } from "./utils";
import {
  getCards,
  getUserInfo,
  editUserInfo,
  addCard,
  deleteCard,
  updateUserAvatar,
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
  confirmDeletePopup,
  confirmDeleteForm,
  confirmDeleteButton,
  spinner,
  content,
} from "./constants";

const changeButtonContent = (button, text, isDisabled = true) => {
  button.textContent = text;
  button.disabled = isDisabled;
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  changeButtonContent(profileSubmitButton, "Сохранение...");

  const bodyData = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  };

  editUserInfo(bodyData, apiConfig)
    .then((profile) => {
      currentName.textContent = profile.name;
      currentJob.textContent = profile.about;
      closePopup(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(profileSubmitButton, "Сохранение"));
};

const handleCardFormSubmit = (evt) => {
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

const handleConfirmDeleteCardFormSubmit = (evt, id, apiConfig) => {
  evt.preventDefault();

  changeButtonContent(confirmDeleteButton, "Удаление...");

  deleteCard(id, apiConfig)
    .then(() => {
      document.querySelector(`[data-card-id="${id}"]`).remove();
      closePopup(confirmDeletePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(confirmDeleteButton, "Да", false));
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  changeButtonContent(avatarSubmitButton, "Сохранение...");

  const bodyData = {
    avatar: avatarLinkInput.value,
  };

  updateUserAvatar(bodyData, apiConfig)
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

const openProfilePopup = () => {
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

const openCardPopup = () => {
  cardForm.reset();
  clearFormInputError(popupAddCard);
  toogleButtonState(
    popupAddCard,
    [cardNameInput, cardLinkInput],
    validationConfig
  );
  openPopup(popupAddCard);
};

const openAvatarPopup = () => {
  avatarForm.reset();
  clearFormInputError(avatarPopup);
  toogleButtonState(avatarPopup, [avatarLinkInput], validationConfig);
  openPopup(avatarPopup);
};

const renderUserInfo = (profile) => {
  avatarProfile.style.backgroundImage = `url(${profile.avatar}`;
  currentName.textContent = profile.name;
  currentName.setAttribute("data-owner-id", profile._id);
  currentJob.textContent = profile.about;
};

const renderAllCards = (cards) => {
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
};

function renderLoading(isLoading) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
    content.classList.add("content_hidden");
  } else {
    spinner.classList.remove("spinner_visible");
    content.classList.remove("content_hidden");
  }
}

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);
avatarProfile.addEventListener("click", openAvatarPopup);

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
confirmDeleteForm.addEventListener("submit", (evt) =>
  handleConfirmDeleteCardFormSubmit(
    evt,
    confirmDeleteButton.getAttribute("data-card-id"),
    apiConfig
  )
);

enableValidation(validationConfig);

renderLoading(true);
Promise.all([getUserInfo(apiConfig), getCards(apiConfig)])
  .then(([userData, cards]) => {
    renderUserInfo(userData);
    renderAllCards(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(false));
