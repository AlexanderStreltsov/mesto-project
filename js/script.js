const editPopupSection = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');
const titleInput = document.querySelector('#title');
const subtitleInput = document.querySelector('#subtitle');
const titleProfileElement = document.querySelector('.profile__title');
const subtitleProfileElement = document.querySelector('.profile__subtitle');

const addPopupSection = document.querySelector('#add-popup');
const addButton = document.querySelector('.profile__add-button');

const allPopupSections = document.querySelectorAll('.popup');
const allCloseButtons = document.querySelectorAll('.popup__close-button');
const allFormElements = document.querySelectorAll('.form');

function openPopupHander(evt) {
  const elementClassName = evt.target.className;
  switch (elementClassName) {
    case 'profile__edit-button':
      titleInput.value = document.querySelector('.profile__title').textContent;
      subtitleInput.value = document.querySelector('.profile__subtitle').textContent;
      editPopupSection.classList.add('popup_opened');
      break;
    case 'profile__add-button':
      addPopupSection.classList.add('popup_opened');
      break;
  }
}

function closePopupHandler() {
  [...allPopupSections].forEach(item => item.classList.remove('popup_opened'));
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const formName = evt.target.name;
  switch (formName) {
    case 'edit-form':
      titleProfileElement.textContent = titleInput.value;
      subtitleProfileElement.textContent = subtitleInput.value;
      break;
    case 'add-cards':
      console.log('test');
      break;
  }
  closePopupHandler();
}

editButton.addEventListener('click', openPopupHander);
addButton.addEventListener('click', openPopupHander);
[...allCloseButtons].forEach(item => item.addEventListener('click', closePopupHandler));
[...allFormElements].forEach(item => item.addEventListener('submit', formSubmitHandler))
