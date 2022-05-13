import "./index.css";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Api from "../components/Api";
import PopupWithConfirm from "../components/PopupWithConfirm";
import {
  apiConfig,
  cardConfig,
  validationConfig,
  popupWithImageConfig,
  popupAddCardConfig,
  popupAvatarConfig,
  popupProfileConfig,
  popupConfirmDeleteConfig,
  avatarProfile,
  currentName,
  currentJob,
  cardForm,
  avatarForm,
  profileForm,
  profileNameInput,
  profileJobInput,
  profileEditButton,
  cardAddButton,
  confirmDeleteButton,
  spinner,
  content,
  cardIdKey,
} from "../utils/constants";

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
    .finally(() => changeButtonContent(submitButton, "Сохранить"));
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
  console.log(cardId)
  api
    .deleteCard(cardId)
    .then(() => {
      const cardToDelete = document.querySelector(`[${cardIdKey}="${cardId}"]`);
      if (!!cardToDelete) {
        cardToDelete.remove();
      }
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
