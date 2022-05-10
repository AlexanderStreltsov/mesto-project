import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
//import { enableValidation, toogleButtonState } from "./validate"; // ed
import { toogleButtonState } from "./validate"; // ed
import UserInfo from './UserInfo.js' // ed
import FormValidator from './FormValidator.js' // ed

import { getAllElementsBySelector, removeClassFromListElements } from "./utils";
import {
  getCards,
  //getUserInfo, // ed
  editUserInfo,
  addCard,
  deleteCard,
  updateUserAvatar,
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
  profileIdKey,
  popupViewer,
  popupViewerImage,
  popupViewerDescription,
  cardIdKey,
  apiConfig_ed // ed
} from "./constants";

import Card from "./Card";
import Section from "./Section";

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
    .then((serverCard) => {
      const cardElement = new Section(
        {
          renderer: (item) => {
            const card = new Card(
              {
                data: item,
                handleViewImage,
                handleUpdateLikesCount,
                handleOpenConfirmDelete,
              },
              cardConfig
            );
            cardElement.addItem(card.generate(), "before");
          },
        },
        cardConfig.containerSelector
      );
      cardElement.render("newCard", serverCard);
      closePopup(popupAddCard);
    })
    .catch((err) => console.log(err))
    .finally(() => changeButtonContent(cardSubmitButton, "Создать"));
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

// const renderUserInfo = (profile) => {
//   avatarProfile.style.backgroundImage = `url(${profile.avatar}`;
//   currentName.textContent = profile.name;
//   sessionStorage.setItem(profileIdKey, profile._id);
//   currentJob.textContent = profile.about;
// };

// ed begin
const userInfo = new UserInfo ({
  name: currentName, 
  info: currentJob, 
  avatar: avatarProfile
})

const profileEditFormValidator = new FormValidator(validationConfig, profileForm)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(validationConfig, cardForm)
cardAddFormValidator.enableValidation()

const avatarEditFromValidator = new FormValidator(validationConfig, avatarForm)
avatarEditFromValidator.enableValidation()
// ed end


const handleViewImage = (name, link) => {
  popupViewerImage.src = link;
  popupViewerImage.alt = name;
  popupViewerDescription.textContent = name;
  openPopup(popupViewer);
};

const handleUpdateLikesCount = (
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

const handleOpenConfirmDelete = (cardId) => {
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

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);
avatarProfile.addEventListener("click", openAvatarPopup);

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
confirmDeleteForm.addEventListener("submit", (evt) =>
  handleConfirmDeleteCardFormSubmit(evt)
);

// enableValidation(validationConfig); // ed

renderLoading(true);

 // ed start 
 apiConfig_ed.getData() 
 .then(( [userData] ) => {
   userInfo.setUserInfo(userData)
   userId = userData._id
 })
 .catch((err) => console.log(err))
// ed end 

//Promise.all([getUserInfo(apiConfig_ed), getCards(apiConfig)])
Promise.all([getCards(apiConfig)])
  .then(([cards]) => {

    const cardList = new Section(
      {
        renderer: (item) => {
          const card = new Card(
            {
              data: item,
              handleViewImage,
              handleUpdateLikesCount,
              handleOpenConfirmDelete,
            },
            cardConfig
          );
          cardList.addItem(card.generate());
        },
      },
      cardConfig.containerSelector
    );
    cardList.render("cardList", cards);
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(false));
