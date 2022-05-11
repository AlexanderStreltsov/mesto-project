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

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscapeKey);
    document.addEventListener("mousedown", this._handlePopupClick);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeKey);
    document.removeEventListener("mousedown", this._handlePopupClick);
  }

  open() {
    this._setEventListeners();
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._removeEventListeners();
    this._popupElement.classList.remove("popup_opened");
  }
}
