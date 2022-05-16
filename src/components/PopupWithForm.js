import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, config) {
    super(config.popupSelector);
    this._config = config;
    this._handleFormSubmit = handleFormSubmit;
    this._submitElement = this._popupElement.querySelector(".form__button");
    this._formElement = this._popupElement.querySelector(".form");
    this._inputList = Array.from(
      this._popupElement.querySelectorAll(".form__input")
    );
  }

  getInputValues() {
    return this._inputList.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, buttonText = "Сохранить") {
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

  close() {
    this._formElement.reset();
    super.close();
  }
}
