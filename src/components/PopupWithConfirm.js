import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ handleFormSubmit }, config) {
    super(config.popupSelector);
    this._config = config;
    this._handleFormSubmit = handleFormSubmit;
    this._submitElement = this._popupElement.querySelector(".form__button");
  }

  renderLoading(isLoading, buttonText = "Да") {
    this._submitElement.textContent = buttonText;
    this._submitElement.disabled = isLoading;
  }

  setEventListeners() {
    this._submitElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });

    super.setEventListeners();
  }
}
