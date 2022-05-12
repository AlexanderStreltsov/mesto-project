import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ handleFormSubmit }, config) {
    super(config.popupSelector);
    this._config = config;
    this._handleFormSubmit = handleFormSubmit;
    this._submitElement = this._popupElement.querySelector(".form__button");
  }

  open() {
    this._submitElement.addEventListener(
      "click",
      (evt) => {
        this._handleFormSubmit(evt, this._submitElement);
      },
      { once: true }
    );

    super.open();
  }
}
