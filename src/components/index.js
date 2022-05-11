import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
import UserInfo from "./UserInfo.js";
import { toogleButtonState } from "./validate.js";
import Api from "./api.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card";
import Section from "./Section";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

import { getAllElementsBySelector, removeClassFromListElements } from "./utils";
import {
  getCards,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
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
  validationConfig,
  apiConfig,
  avatarProfile,
  avatarSubmitButton,
  confirmDeletePopup,
  confirmDeleteForm,
  confirmDeleteButton,
  spinner,
  content,
  profileIdKey,
  cardIdKey,
  apiConfig_ed,
  cardForm,
  avatarForm,
  popupWithImageConfig,
  popupAddCardConfig,
  popupAvatarConfig,

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

  apiConfig_ed
    .setUserInfo(bodyData)
    .then(([userData]) => {
      userInfo.setUserInfo(userData);
      closePopup(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(profileSubmitButton, "Сохранение"));
};

const handleCardFormSubmit = (evt, submitButton) => {
  evt.preventDefault();
  changeButtonContent(submitButton, "Сохранение...");

  console.log(popupAddCard._getInputValues())

  addCard(popupAddCard._getInputValues(), apiConfig)
    .then((serverCard) => {
      const cardElement = new Section(
        {
          renderer: (item) => {
            const card = new Card(
              {
                data: item,
                handleOpenCardImage,
                handleUpdateCardLikesCount,
                handleOpenConfirmDeleteCard,
              },
              cardConfig
            );
            cardElement.addItem(card.generate(), "before");
          },
        },
        cardConfig.containerSelector
      );
      cardElement.render("element", serverCard);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      changeButtonContent(submitButton, "Создать");
    });
};

const handleConfirmDeleteCardFormSubmit = (evt) => {
  evt.preventDefault();

  changeButtonContent(confirmDeleteButton, "Удаление...");

  const cardId = sessionStorage.getItem(cardIdKey);
  deleteCard(cardId, apiConfig)
    .then(() => {
      document.querySelector(`[${cardIdKey}="${cardId}"]`).remove();
      closePopup(confirmDeletePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(confirmDeleteButton, "Да", false));
};

const handleAvatarFormSubmit = (evt, submitButton) => {
  evt.preventDefault();

  changeButtonContent(submitButton, "Сохранение...");

  apiConfig_ed
    .updateUserAvatar(popupAvatar._getInputValues())
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => changeButtonContent(submitButton, "Сохранить"));
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
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.info;
  clearFormInputError(profilePopup);
  openPopup(profilePopup);
};

// const openCardPopup = () => {
//   cardForm.reset();
//   clearFormInputError(popupAddCard);
//   openPopup(popupAddCard);
// };

const openAvatarPopup = () => {
  avatarForm.reset();
  clearFormInputError(avatarPopup);
  openPopup(avatarPopup);
};

const userInfo = new UserInfo({
  name: currentName,
  info: currentJob,
  avatar: avatarProfile,
});

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileForm
);
profileEditFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(validationConfig, cardForm);
cardAddFormValidator.enableValidation();

const avatarEditFromValidator = new FormValidator(validationConfig, avatarForm);
avatarEditFromValidator.enableValidation();

const handleOpenCardImage = (name, link) => {
  popupWithImage.open(name, link);
};

const handleUpdateCardLikesCount = (
  isLike,
  cardId,
  likeCountElement,
  likeButtonElement,
  likeActiveClassName
) => {
  if (isLike) {
    deleteLike(cardId, apiConfig)
      .then((res) => {
        likeCountElement.textContent = res.likes.length;
        likeButtonElement.classList.toggle(likeActiveClassName);
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId, apiConfig)
      .then((res) => {
        likeCountElement.textContent = res.likes.length;
        likeButtonElement.classList.toggle(likeActiveClassName);
      })
      .catch((err) => console.log(err));
  }
};

const handleOpenConfirmDeleteCard = (cardId) => {
  sessionStorage.setItem(cardIdKey, cardId);
  openPopup(confirmDeletePopup);
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

const popupWithImage = new PopupWithImage(popupWithImageConfig);
const popupAddCard = new PopupWithForm(
  {
    handleFormSubmit: handleCardFormSubmit,
    toogleSubmitButtonState: toogleButtonState,
  },
  popupAddCardConfig
);
const popupAvatar = new PopupWithForm(
  {
    handleFormSubmit: handleAvatarFormSubmit,
    toogleSubmitButtonState: toogleButtonState,
  },
  popupAvatarConfig
);


profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", () => popupAddCard.open());
avatarProfile.addEventListener("click", () => popupAvatar.open());

profileForm.addEventListener("submit", handleProfileFormSubmit);
confirmDeleteForm.addEventListener("submit", (evt) =>
  handleConfirmDeleteCardFormSubmit(evt)
);

renderLoading(true);


apiConfig_ed
  .getData()
  .then(([userData]) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => console.log(err));


//Promise.all([getUserInfo(apiConfig_ed), getCards(apiConfig)])
Promise.all([getCards(apiConfig)])
.then(([cards]) => {
  const cardList = new Section(
    {
      renderer: (item) => {
        const card = new Card(
          {
            data: item,
            handleOpenCardImage,
            handleUpdateCardLikesCount,
            handleOpenConfirmDeleteCard,
          },
          cardConfig
        );
        cardList.addItem(card.generate());
      },
    },
    cardConfig.containerSelector
  );
  cardList.render("list", cards);
})
.catch((err) => console.log(err))
.finally(() => renderLoading(false));
