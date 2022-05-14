export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
  }

  _handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handlePopupClick = (evt) => {
    const elementClasses = evt.target.classList;
    if (
      elementClasses.contains("popup") ||
      elementClasses.contains("popup__close-button")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    document.addEventListener("mousedown", this._handlePopupClick);
  }

  open() {
    document.addEventListener("keydown", this._handleEscapeKey);
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscapeKey);
    this._popupElement.classList.remove("popup_opened");
  }
}
