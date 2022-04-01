const closePopup  = (popup) => {
  document.removeEventListener('keydown', closeByEscHandler);
  document.removeEventListener('click', closeByClickHandler);
  popup.classList.remove('popup_opened');
}

const getOpenedPopup = () => document.querySelector('.popup_opened');

const closeByEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(getOpenedPopup());
  }
}

const closeByClickHandler = (evt) => {
  const elementClasses = evt.target.classList;
  if (elementClasses.contains('popup') || elementClasses.contains('popup__close-button')) {
    closePopup(getOpenedPopup());
  }
}

const openPopup = (popup) => {
  document.addEventListener('keydown', closeByEscHandler);
  document.addEventListener('click', closeByClickHandler);
  popup.classList.add('popup_opened');
}

export {
  openPopup,
  closePopup
}
