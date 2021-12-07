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



const allPopupSections = document.querySelectorAll('.popup');
const allActionButtons = document.querySelectorAll('.action-open');
const allCloseButtons = document.querySelectorAll('.popup__close-button');
const allFormElements = document.querySelectorAll('.form');

const editPopupSection = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');
const titleInput = document.querySelector('#title');
const subtitleInput = document.querySelector('#subtitle');
const titleProfileElement = document.querySelector('.profile__title');
const subtitleProfileElement = document.querySelector('.profile__subtitle');

const addPopupSection = document.querySelector('#add-popup');
const addButton = document.querySelector('.profile__add-button');
const nameCardInput = document.querySelector('#name-card');
const linkImgCardInput = document.querySelector('#link-img-card');

const cardsContainer = document.querySelector('.cards__list');

const imageViewerPopupSection = document.querySelector('#image-viewer-popup');
const imageViewerContainer = imageViewerPopupSection.querySelector('.popup__container_content_image-viewer');

function openPopupHander(evt) {
  const elementClassName = evt.target.className;
  switch (elementClassName) {
    case 'profile__edit-button action-open':
      titleInput.value = titleProfileElement.textContent;
      subtitleInput.value = subtitleProfileElement.textContent;
      editPopupSection.classList.add('popup_opened');
      break;
    case 'profile__add-button action-open':
      nameCardInput.value = '';
      linkImgCardInput.value = '';
      addPopupSection.classList.add('popup_opened');
      break;
    case 'cards__overlay action-open':
      renderImageViewer(evt);
      imageViewerPopupSection.classList.add('popup_opened');
      break;
    default:
      console.log(`No switch to open popup with element ${elementClassName}`);
      break;
  }
}

function closePopupHandler() {
  const openedPopupElement = [...allPopupSections].find(item => [...item.classList].includes('popup_opened'));
  openedPopupElement.classList.remove('popup_opened');
}

function submitFormHandler(evt) {
  evt.preventDefault();
  const formName = evt.target.name;
  switch (formName) {
    case 'edit-form':
      titleProfileElement.textContent = titleInput.value;
      subtitleProfileElement.textContent = subtitleInput.value;
      break;
    case 'add-cards':
      addCard(nameCardInput.value, linkImgCardInput.value, true)
      break;
    default:
      console.log(`No switch to submit with element name ${formName}`);
      break;
  }
  closePopupHandler();
}

function addCard(nameCardValue, imageLinkCardValue, prepend=false) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__list-item').cloneNode(true);
  const cardImgElement = cardElement.querySelector('.cards__picture');
  cardImgElement.src = imageLinkCardValue;
  cardImgElement.alt = nameCardValue;
  cardElement.querySelector('.cards__overlay').addEventListener('click', openPopupHander);
  cardElement.querySelector('.cards__title').textContent = nameCardValue;
  const cardLikeButton = cardElement.querySelector('.cards__like-button');
  cardLikeButton.addEventListener('click', evt => evt.target.classList.toggle('cards__like-button_active'));
  const cardDeleteButton = cardElement.querySelector('.cards__delete-button');
  cardDeleteButton.addEventListener('click', evt => evt.target.parentElement.remove());
  cardsContainer.append(cardElement);
  if (prepend) {
    cardsContainer.prepend(cardElement);
  }
}

function renderImageViewer(evt) {
  const imageViewerTemplate = document.querySelector('#image-viewer-template').content;
  const figureElement = imageViewerTemplate.querySelector('.image-viewer__figure').cloneNode(true);
  const figureImageElement = figureElement.querySelector('.image-viewer__picture');
  const figureCaptionElement = figureElement.querySelector('.image-viewer__caption');
  const targetCardImgElement = evt.target.firstElementChild;
  figureImageElement.src = targetCardImgElement.src;
  figureImageElement.alt = targetCardImgElement.alt;
  figureCaptionElement.textContent = targetCardImgElement.alt;
  if (imageViewerContainer.children.length > 1) {
    imageViewerContainer.removeChild(imageViewerContainer.querySelector('.image-viewer__figure'));
  }
  imageViewerContainer.append(figureElement);
}

[...allActionButtons].forEach(item => item.addEventListener('click', openPopupHander));
[...allCloseButtons].forEach(item => item.addEventListener('click', closePopupHandler));
[...allFormElements].forEach(item => item.addEventListener('submit', submitFormHandler));
initialCards.forEach(item => addCard(item.name, item.link));
