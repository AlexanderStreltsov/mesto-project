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

const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#edit-popup');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profilePopup.querySelector('#title');
const profileJobInput = profilePopup.querySelector('#subtitle');

const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#add-popup');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const cardForm = popupAddCard.querySelector('.form');
const cardNameInput = popupAddCard.querySelector('#name-card');
const cardLinkInput = popupAddCard.querySelector('#link-img-card');

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupViewer = document.querySelector('#image-viewer-popup');
const popupViewerCloseButton = popupViewer.querySelector('.popup__close-button');
const popupViewerImage = popupViewer.querySelector('.image-viewer__picture');
const popupViewerDescription = popupViewer.querySelector('.image-viewer__caption');

export {
  initialCards,
  currentName,
  currentJob,
  profileEditButton,
  profilePopup,
  profilePopupCloseButton,
  profileForm,
  profileNameInput,
  profileJobInput,
  cardAddButton,
  popupAddCard,
  popupAddCardCloseButton,
  cardForm,
  cardNameInput,
  cardLinkInput,
  cardsContainer,
  cardTemplate,
  popupViewer,
  popupViewerCloseButton,
  popupViewerImage,
  popupViewerDescription
};
