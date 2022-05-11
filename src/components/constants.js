import Api from "./api.js";

export const apiConfig_ed = new Api({
  url: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    'Content-Type': 'application/json',
    authorization: '45def5a2-c1e5-4149-8cae-fca78747b383'
  }
})

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    "Content-type": "application/json",
    authorization: "45def5a2-c1e5-4149-8cae-fca78747b383",
  },
};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClass: "form__input-error-message_visible",
  errorSelector: ".form__input-error-message_visible",
  inputInvalidClass: "form__input_invalid",
  inputInvalidSelector: ".form__input_invalid",
  buttonSelector: ".form__button",
  buttonDisabledClass: "form__button_disabled",
};

const cardConfig = {
  containerSelector: ".cards__list",
  templateSelector: "#card-template",
  cardSelector: ".cards__list-item",
  imageSelector: ".cards__picture",
  nameSelector: ".cards__title",
  likeClass: "cards__like-button",
  likeSelector: ".cards__like-button",
  likeActiveClass: "cards__like-button_active",
  likeCountSelector: ".cards__like-count",
  deleteClass: "cards__delete-button",
  deleteSelector: ".cards__delete-button",
  deleteVisibleClass: "cards__delete-button_visible",
  imageOverlaySelector: ".cards__overlay",
};

const popupWithImageConfig = {
  popupSelector: "#image-viewer-popup",
  viewerImageSelector: ".image-viewer__picture",
  viewerDescriptionSelector: ".image-viewer__caption",
};

const popupAddCardConfig = {
  popupSelector: "#add-popup",
};

const popupAvatarConfig = {
  popupSelector: "#edit-avatar-popup",
}

const profileIdKey = "data-profile-id";
const cardIdKey = "data-card-id";

const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector("#edit-popup");
const profileForm = profilePopup.querySelector(".form");
const profileNameInput = profilePopup.querySelector("#title");
const profileJobInput = profilePopup.querySelector("#job");
const profileSubmitButton = profileForm.querySelector(".form__button");

const cardAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector("#add-popup");
const cardForm = popupAddCard.querySelector(".form");
const cardNameInput = popupAddCard.querySelector("#name-card");
const cardLinkInput = popupAddCard.querySelector("#link-img-card");
const cardSubmitButton = popupAddCard.querySelector(".form__button");

const avatarProfile = document.querySelector(".profile__avatar");
const avatarPopup = document.querySelector("#edit-avatar-popup");
const avatarForm = avatarPopup.querySelector(".form");
const avatarLinkInput = avatarPopup.querySelector("#url-avatar");
const avatarSubmitButton = avatarPopup.querySelector(".form__button");

const confirmDeletePopup = document.querySelector("#confirm-action");
const confirmDeleteForm = confirmDeletePopup.querySelector(".form");
const confirmDeleteButton = confirmDeletePopup.querySelector(".form__button");

const spinner = document.querySelector(".spinner");
const content = document.querySelector(".content");

export {
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
  cardIdKey,
  popupWithImageConfig,
  popupAddCardConfig,
  popupAvatarConfig
};
