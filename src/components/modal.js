const closePopup = (popup) => {
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handlePopupClick);
  popup.classList.remove("popup_opened");
};

const getOpenedPopup = () => document.querySelector(".popup_opened");

const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    closePopup(getOpenedPopup());
  }
};

const handlePopupClick = (evt) => {
  const elementClasses = evt.target.classList;
  if (
    elementClasses.contains("popup") ||
    elementClasses.contains("popup__close-button")
  ) {
    closePopup(getOpenedPopup());
  }
};

const openPopup = (popup) => {
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("mousedown", handlePopupClick);
  popup.classList.add("popup_opened");
};

export { openPopup, closePopup };
