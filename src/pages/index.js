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
    .finally(() => popupProfile.renderLoading(false, "Сохранить"));
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
    .finally(() => popupAvatar.renderLoading(false, "Сохранить"));
};

const handleCardFormSubmit = () => {
  popupAddCard.renderLoading(true, "Создание...");
  api
    .addCard(popupAddCard.getInputValues())
    .then((serverCard) => {
      cardElement.render("element", serverCard);
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
    .finally(() => popupConfirmDeleteCard.renderLoading(false));
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

function renderLoading(isLoading = true) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
    content.classList.add("content_hidden");
  } else {
    spinner.classList.remove("spinner_visible");
    content.classList.remove("content_hidden");
  }
}

const api = new Api(apiConfig);

// сможешь здесь передавать конфигурацию с селекторами -
// эту конфигурацию нужно определять в константах по аналогии с cardConfig или apiConfig
// назвать к примеру userConfig
// а элементы внутри класса искать в конструкторе класса по этим селекторам
// будет типа = new UserInfo(userConfig)
const userInfo = new UserInfo({
  name: currentName,
  info: currentJob,
  avatar: avatarProfile,
});

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

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileForm
);
profileEditFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(validationConfig, cardForm);
cardAddFormValidator.enableValidation();

const avatarEditFromValidator = new FormValidator(validationConfig, avatarForm);
avatarEditFromValidator.enableValidation();

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
const popupConfirmDeleteCard = new PopupWithConfirm(
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
  // <-- в этой строке нужно запустить и предварительно написать метод resetValidation() в классе валидации
  // в нем будет вызываться метод по смене статуса кнопки сабмита _toggleButtonState
  // также нужно пройтись по всем инпутам и очистить показанные ошибки (перед открытием попапа)
  popupProfile.open();
});

cardAddButton.addEventListener("click", () => {
  // <-- в этой строке нужно запустить и предварительно написать метод resetValidation() в классе валидации
  popupAddCard.open();
});

avatarProfile.addEventListener("click", () => {
  // <-- в этой строке нужно запустить и предварительно написать метод resetValidation() в классе валидации
  popupAvatar.open();
});

renderLoading();
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    cardList.render("list", cards);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(false));
