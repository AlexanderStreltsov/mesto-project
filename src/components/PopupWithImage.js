import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(config) {
    super(config.popupSelector);
    this._config = config;
  }

  open(name, link) {
    this._viewerImageElement = this._popupElement.querySelector(this._config.viewerImageSelector);
    this._viewerImageElement.src = link;
    this._viewerImageElement.alt = name;
    this._popupElement.querySelector(this._config.viewerDescriptionSelector).textContent = name;

    super.open();
  }
}
