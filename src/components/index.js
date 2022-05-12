import "../pages/index.css";
import UserInfo from "./UserInfo";
import FormValidator from "./FormValidator";
import Card from "./Card";
import Section from "./Section";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import { Api } from "./Api.js";
import PopupWithConfirm from "./PopupWithConfirm.js";
import {
  cardConfig,
  currentName,
  currentJob,
  profileEditButton,
  profileForm,
  profileNameInput,
  profileJobInput,
  cardAddButton,
  validationConfig,
  apiConfig,
  avatarProfile,
  confirmDeletePopup,
  confirmDeleteForm,
  confirmDeleteButton,
  spinner,
  content,
  cardIdKey,
  cardForm,
  avatarForm,
  popupWithImageConfig,
  popupAddCardConfig,
  popupAvatarConfig,
  popupProfileConfig,
  popupConfirmDeleteConfig,
} from "./constants";

const changeButtonContent = (button, text, isDisabled = true) => {
  button.textContent = text;
  button.disabled = isDisabled;
};

const handleProfileFormSubmit = (evt, submitButton) => {
  evt.preventDefault();
  changeButtonContent(submitButton, "Сохранение...");
  api
    .setUserInfo(popupProfile._getInputValues())
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(submitButton, "Сохранение"));
};

const handleCardFormSubmit = (evt, submitButton) => {
  evt.preventDefault();
  changeButtonContent(submitButton, "Сохранение...");

  api
    .addCard(popupAddCard._getInputValues())
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
  api
    .deleteCard(cardId)
    .then(() => {
      document.querySelector(`[${cardIdKey}="${cardId}"]`).remove();
      popupWithConfirm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(confirmDeleteButton, "Да", false));
};

const handleAvatarFormSubmit = (evt, submitButton) => {
  evt.preventDefault();
  changeButtonContent(submitButton, "Сохранение...");

  api
    .updateUserAvatar(popupAvatar._getInputValues())
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(submitButton, "Сохранить"));
};

const handleUpdateCardLikesCount = (
  isLike,
  cardId,
  likeCountElement,
  likeButtonElement,
  likeActiveClassName
) => {
  if (isLike) {
    api
      .deleteLike(cardId)
      .then((res) => {
        likeCountElement.textContent = res.likes.length;
        likeButtonElement.classList.toggle(likeActiveClassName);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        likeCountElement.textContent = res.likes.length;
        likeButtonElement.classList.toggle(likeActiveClassName);
      })
      .catch((err) => console.log(err));
  }
};

const handleOpenConfirmDeleteCard = (cardId) => {
  sessionStorage.setItem(cardIdKey, cardId);
  popupWithConfirm.open();
};

const handleOpenCardImage = (name, link) => {
  popupWithImage.open(name, link);
};

const checkCardSubmitButtonState = () => {
  cardAddFormValidator.toogleButtonState();
};

const checkAvatarSubmitButtonState = () => {
  avatarEditFromValidator.toogleButtonState();
};

const checkProfileSubmitButtonState = () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.info;
  profileEditFormValidator.toogleButtonState();
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

const api = new Api(apiConfig);

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

const popupWithImage = new PopupWithImage(popupWithImageConfig);

const popupWithConfirm = new PopupWithConfirm(
  {
    handleFormSubmit: handleConfirmDeleteCardFormSubmit,
  },
  popupConfirmDeleteConfig
);

const popupAddCard = new PopupWithForm(
  {
    handleFormSubmit: handleCardFormSubmit,
    toogleSubmitButtonState: checkCardSubmitButtonState,
  },
  popupAddCardConfig
);

const popupAvatar = new PopupWithForm(
  {
    handleFormSubmit: handleAvatarFormSubmit,
    toogleSubmitButtonState: checkAvatarSubmitButtonState,
  },
  popupAvatarConfig
);

const popupProfile = new PopupWithForm(
  {
    handleFormSubmit: handleProfileFormSubmit,
    toogleSubmitButtonState: checkProfileSubmitButtonState,
  },
  popupProfileConfig
);

profileEditButton.addEventListener("click", () => popupProfile.open());
cardAddButton.addEventListener("click", () => popupAddCard.open());
avatarProfile.addEventListener("click", () => popupAvatar.open());

confirmDeleteForm.addEventListener("submit", (evt) =>
  handleConfirmDeleteCardFormSubmit(evt)
);

renderLoading(true);
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);

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
