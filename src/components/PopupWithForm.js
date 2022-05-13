import PopupWithConfirm from "./PopupWithConfirm";

export default class PopupWithForm extends PopupWithConfirm {
  constructor({ handleFormSubmit }, config) {
    super({ handleFormSubmit }, config);

    this._formElement = this._popupElement.querySelector(".form");
    this._inputList = Array.from(
      this._popupElement.querySelectorAll(".form__input")
    );
  }

  getInputValues() {
    return this._inputList.reduce((acc, item) => {
      const inputName = item.name;
      const inputValue = item.value;
      acc[inputName] = inputValue;
      return acc;
    }, {});
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}
