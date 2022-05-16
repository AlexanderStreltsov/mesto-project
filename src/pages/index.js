import "./index.css";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
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
  profileEditButton,
  cardAddButton,
  spinner,
  content,
  cardIdKey,
} from "../utils/constants";

const handleProfileFormSubmit = () => {
  popupProfile.renderLoading(true, "Сохранение...");
  api
    .setUserInfo(popupProfile.getInputValues())
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupProfile.renderLoading(false));
};

const handleAvatarFormSubmit = () => {
  popupAvatar.renderLoading(true, "Сохранение...");
  api
    .updateUserAvatar(popupAvatar.getInputValues())
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
};

const handleCardFormSubmit = () => {
  popupAddCard.renderLoading(true, "Создание...");
  api
    .addCard(popupAddCard.getInputValues())
    .then((serverCard) => {
      cardElements.render("element", serverCard);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false, "Создать");
    });
};

const handleConfirmDeleteCardFormSubmit = () => {
  popupConfirmDeleteCard.renderLoading(true, "Удаление...");
  const cardId = sessionStorage.getItem(cardIdKey);
  api
    .deleteCard(cardId)
    .then(() => {
      const cardToDelete = document.querySelector(`[${cardIdKey}="${cardId}"]`);
      if (!!cardToDelete) {
        cardToDelete.remove();
      }
      popupConfirmDeleteCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupConfirmDeleteCard.renderLoading(false, "Да"));
};

const handleOpenConfirmDeleteCard = (cardId) => {
  sessionStorage.setItem(cardIdKey, cardId);
  popupConfirmDeleteCard.open();
};

const handleUpdateCardLikesCount = (card) => {
  if (card.isLikeButtonActive()) {
    api
      .deleteLike(card.getCardId())
      .then((res) => {
        card.changeLikeCount(res);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(card.getCardId())
      .then((res) => {
        card.changeLikeCount(res);
      })
      .catch((err) => console.log(err));
  }
};

const handleOpenCardImage = (name, link) => {
  popupCardImageViewer.open(name, link);
};

const renderLoading = (isLoading = true) => {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
    content.classList.add("content_hidden");
  } else {
    spinner.classList.remove("spinner_visible");
    content.classList.remove("content_hidden");
  }
};

const api = new Api(apiConfig);

const userInfo = new UserInfo({
  name: currentName,
  info: currentJob,
  avatar: avatarProfile,
});

const cardElements = new Section(
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
      cardElements.addItem(card.generate());
    },
  },
  cardConfig.containerSelector
);

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

const popupAvatar = new PopupWithForm(
  { handleFormSubmit: handleAvatarFormSubmit },
  popupAvatarConfig
);
const popupProfile = new PopupWithForm(
  { handleFormSubmit: handleProfileFormSubmit },
  popupProfileConfig
);
const popupAddCard = new PopupWithForm(
  { handleFormSubmit: handleCardFormSubmit },
  popupAddCardConfig
);
const popupConfirmDeleteCard = new PopupWithForm(
  { handleFormSubmit: handleConfirmDeleteCardFormSubmit },
  popupConfirmDeleteConfig
);
const popupCardImageViewer = new PopupWithImage(popupWithImageConfig);

[
  popupAvatar,
  popupProfile,
  popupAddCard,
  popupCardImageViewer,
  popupConfirmDeleteCard,
].forEach((popup) => popup.setEventListeners());

profileEditButton.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  formValidators["edit-profile"].resetValidation();
  popupProfile.open();
});

cardAddButton.addEventListener("click", () => {
  formValidators["add-cards"].resetValidation();
  popupAddCard.open();
});

avatarProfile.addEventListener("click", () => {
  formValidators["edit-avatar"].resetValidation();
  popupAvatar.open();
});

renderLoading();
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    cardElements.render("list", cards.reverse());
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(false));
