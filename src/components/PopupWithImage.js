import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(config) {
    super(config.popupSelector);
    this._config = config;
    this._viewerImageElement = this._popupElement.querySelector(
      this._config.viewerImageSelector
    );
    this._viewerDescriptionElement = this._popupElement.querySelector(
      this._config.viewerDescriptionSelector
    );
  }

  open(name, link) {
    this._viewerImageElement.src = link;
    this._viewerImageElement.alt = name;
    this._viewerDescriptionElement.textContent = name;

    super.open();
  }
}
