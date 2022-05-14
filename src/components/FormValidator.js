export default class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;

    this._inputElement = data.inputSelector;
    this._errorElement = data.errorSelector;
    this._errorClass = data.errorClass;
    this._inputInvalidClass = data.inputInvalidClass;
    this._inputInvalidSelector = data.inputInvalidSelector;
    this._buttonSelector = data.buttonSelector;
    this._buttonDisabledClass = data.buttonDisabledClass;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputElement)
    );
    this._buttonElement = this._formElement.querySelector(data.buttonSelector);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.remove(this._inputInvalidClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.add(this._inputInvalidClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _disableButton() {
    this._buttonElement.classList.add(this._buttonDisabledClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._buttonDisabledClass);
    this._buttonElement.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
