const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardConfig = {
  templateSelector: '#card-template',
  cardSelector: '.cards__list-item',
  imageSelector: '.cards__picture',
  nameSelector: '.cards__title',
  likeClass: 'cards__like-button',
  likeActiveClass: 'cards__like-button_active',
  deleteClass: 'cards__delete-button',
  imageOverlayClass: 'cards__overlay',
  popupViewerSelector: '#image-viewer-popup',
  popupViewerImageSelector: '.image-viewer__picture',
  popupViewerDescriptionSelector: '.image-viewer__caption'
};

const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#edit-popup');
const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profilePopup.querySelector('#title');
const profileJobInput = profilePopup.querySelector('#job');

const cardsContainer = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#add-popup');
const cardForm = popupAddCard.querySelector('.form');
const cardNameInput = popupAddCard.querySelector('#name-card');
const cardLinkInput = popupAddCard.querySelector('#link-img-card');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  errorClass: 'form__input-error-message_visible',
  errorSelector: '.form__input-error-message_visible',
  inputInvalidClass: 'form__input_invalid',
  inputInvalidSelector: '.form__input_invalid',
  buttonSelector: '.form__button',
  buttonDisabledClass: 'form__button_disabled'
};

export {
  initialCards,
  cardConfig,
  currentName,
  currentJob,
  profileEditButton,
  profilePopup,
  profileForm,
  profileNameInput,
  profileJobInput,
  cardsContainer,
  cardAddButton,
  popupAddCard,
  cardForm,
  cardNameInput,
  cardLinkInput,
  validationConfig
};
