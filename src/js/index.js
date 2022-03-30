import '../pages/index.css';

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


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitProfileHandler(evt) {
  evt.preventDefault();
  currentName.textContent = profileNameInput.value;
  currentJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__list-item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__picture');
  const cardImageOverlay = cardElement.querySelector('.cards__overlay');
  const cardName = cardElement.querySelector('.cards__title');
  const cardLikeButton = cardElement.querySelector('.cards__like-button');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  cardImageOverlay.addEventListener('click', () => {
    popupViewerImage.src = link;
    popupViewerImage.alt = name;
    popupViewerDescription.textContent = name;
    openPopup(popupViewer);
  });

  cardLikeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('cards__like-button_active');
  });

  cardDeleteButton.addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });

  return cardElement;
}

function addCard(insertType, insertData) {
  switch (insertType) {
    case 'appendSomeCards':
      insertData.forEach(item => cardsContainer.append(item));
      break;
    case 'prependOneCard':
      cardsContainer.prepend(insertData);
      break;
    default:
      console.log(`Insert type ${insertType} not in select`);
      break;
  }
}

function submitCardHandler(evt) {
  evt.preventDefault();
  const newCardElement = createCard(cardNameInput.value, cardLinkInput.value);
  addCard('prependOneCard', newCardElement);
  closePopup(popupAddCard);
}


profileEditButton.addEventListener("click", () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  openPopup(profilePopup);
});
profilePopupCloseButton.addEventListener("click", () => closePopup(profilePopup));
profileForm.addEventListener("submit", submitProfileHandler);

cardAddButton.addEventListener("click", () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openPopup(popupAddCard);
});
popupAddCardCloseButton.addEventListener("click", () => closePopup(popupAddCard));
cardForm.addEventListener("submit", submitCardHandler);

popupViewerCloseButton.addEventListener("click", () => closePopup(popupViewer));

const initCardsElements = initialCards.map(item => createCard(item.name, item.link));
addCard('appendSomeCards', initCardsElements)
