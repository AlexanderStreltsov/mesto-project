import Popup from "./Popup";
import { validationConfig } from "../utils/constants";
import {
  getAllElementsBySelector,
  removeClassFromListElements,
} from "../utils/utils";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, config) {
    super(config.popupSelector);
    this._config = config;
    this._handleFormSubmit = handleFormSubmit;
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
    super.open();
  }

  close() {
    this._resetForm();
    super.close();
  }
}
