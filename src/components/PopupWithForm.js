import Popup from "./Popup.js";
import { validationConfig } from "./constants.js";
import {
  getAllElementsBySelector,
  removeClassFromListElements,
} from "./utils.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, toogleSubmitButtonState }, config) {
    super(config.popupSelector);
    this._config = config;
    this._handleFormSubmit = handleFormSubmit;
    this._toogleSubmitButtonState = toogleSubmitButtonState;
    this._submitElement = this._popupElement.querySelector(".form__button");
    this._formElement = this._popupElement.querySelector(".form");
  }

  _getInputElements() {
    return getAllElementsBySelector(this._popupElement, ".form__input");
  }

  _getInputValues() {
    return this._getInputElements().reduce((acc, item) => {
      const inputName = item.name;
      const inputValue = item.value;
      acc[inputName] = inputValue;
      return acc;
    }, {});
  }

  _resetForm() {
    this._formElement.reset();
  }

  _clearInputErrors() {
    const errors = getAllElementsBySelector(
      this._formElement,
      validationConfig.errorSelector
    );
    const invalidInputs = getAllElementsBySelector(
      this._formElement,
      validationConfig.inputInvalidSelector
    );
    removeClassFromListElements(errors, validationConfig.errorClass);
    removeClassFromListElements(
      invalidInputs,
      validationConfig.inputInvalidClass
    );
  }

  _setEventListeners() {
    this._submitElement.addEventListener(
      "click",
      (evt) => {
        this._handleFormSubmit(evt, this._submitElement);
      },
      { once: true }
    );

    super._setEventListeners();
  }

  open() {
    this._toogleSubmitButtonState(
      this._popupElement,
      this._getInputElements(),
      validationConfig
    );
    super.open();
  }

  close() {
    this._resetForm();
    this._clearInputErrors();
    super.close();
  }
}
