const cardConfig = {
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
  imageOverlayClass: "cards__overlay",
  popupViewerSelector: "#image-viewer-popup",
  popupViewerImageSelector: ".image-viewer__picture",
  popupViewerDescriptionSelector: ".image-viewer__caption",
};

const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector("#edit-popup");
const profileForm = profilePopup.querySelector(".form");
const profileNameInput = profilePopup.querySelector("#title");
const profileJobInput = profilePopup.querySelector("#job");
const profileSubmitButton = profileForm.querySelector(".form__button");

const cardsContainer = document.querySelector(".cards__list");
const cardAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector("#add-popup");
const cardForm = popupAddCard.querySelector(".form");
const cardNameInput = popupAddCard.querySelector("#name-card");
const cardLinkInput = popupAddCard.querySelector("#link-img-card");
const cardSubmitButton = popupAddCard.querySelector(".form__button");

const avatarProfile = document.querySelector(".profile__avatar");
const avatarPopup = document.querySelector("#edit-avtar-popup");
const avatarForm = avatarPopup.querySelector(".form");
const avatarLinkInput = avatarPopup.querySelector("#url-avatar");
const avatarSubmitButton = avatarPopup.querySelector(".form__button");

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

const apiConfig = {
  urlProfile: "https://nomoreparties.co/v1/plus-cohort-8/users/me",
  urlCards: "https://nomoreparties.co/v1/plus-cohort-8/cards",
  urlLikes: "https://nomoreparties.co/v1/plus-cohort-8/cards/likes",
  urlAvatar: "https://nomoreparties.co/v1/plus-cohort-8/users/me/avatar ",
  headers: {
    "Content-type": "application/json",
    authorization: "45def5a2-c1e5-4149-8cae-fca78747b383",
  },
};

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
};
