import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ handleFormSubmit }, config) {
    super(config.popupSelector);
    this._config = config;
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
