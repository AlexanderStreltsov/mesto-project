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
};

const popupProfileConfig = {
  popupSelector: "#edit-popup",
};

const popupConfirmDeleteConfig = {
  popupSelector: "#confirm-action",
};

const profileIdKey = "data-profile-id";
const cardIdKey = "data-card-id";

const avatarProfile = document.querySelector(".profile__avatar");
const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");

const cardAddButton = document.querySelector(".profile__add-button");

const spinner = document.querySelector(".spinner");
const content = document.querySelector(".content");

export {
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
  profileIdKey,
};
