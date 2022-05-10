import { profileIdKey, cardIdKey } from "./constants";

export default class Card {
  constructor(
    { data, handleViewImage, handleUpdateLikesCount, handleOpenConfirmDelete },
    config
  ) {
    this._config = config;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleViewImage = handleViewImage;
    this._handleUpdateLikesCount = handleUpdateLikesCount;
    this._handleOpenConfirmDelete = handleOpenConfirmDelete;
  }

  _setElements() {
    this._element = document
      .querySelector(this._config.templateSelector)
      .content.querySelector(this._config.cardSelector)
      .cloneNode(true);

    this._nameElement = this._element.querySelector(this._config.nameSelector);
    this._imageElement = this._element.querySelector(
      this._config.imageSelector
    );
    this._imageOverlayElement = this._element.querySelector(
      this._config.imageOverlaySelector
    );
    this._likeButtonElement = this._element.querySelector(
      this._config.likeSelector
    );
    this._likeCountElement = this._element.querySelector(
      this._config.likeCountSelector
    );
    this._deleteButtonElement = this._element.querySelector(
      this._config.deleteSelector
    );
  }

  _setLikeButtonActive() {
    if (this._likes.some((like) => like._id === this._profileId)) {
      this._likeButtonElement.classList.add(this._config.likeActiveClass);
    }
  }

  _setDeleteButtonVisible() {
    if (this._ownerId === this._profileId) {
      this._deleteButtonElement.classList.add(this._config.deleteVisibleClass);
    }
  }

  _isLikeButtonActive() {
    return this._likeButtonElement.classList.contains(
      this._config.likeActiveClass
    );
  }

  _setEventListeners() {
    this._imageOverlayElement.addEventListener("click", () => {
      this._handleViewImage(this._name, this._link);
    });

    this._likeButtonElement.addEventListener("click", () => {
      this._handleUpdateLikesCount(
        this._isLikeButtonActive(),
        this._id,
        this._likeCountElement,
        this._likeButtonElement,
        this._config.likeActiveClass
      );
    });

    this._deleteButtonElement.addEventListener("click", () => {
      this._handleOpenConfirmDelete(this._id);
    });
  }

  generate() {
    this._setElements();

    this._element.setAttribute(cardIdKey, this._id);
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    this._likeCountElement.textContent = this._likes.length;

    this._profileId = sessionStorage.getItem(profileIdKey);
    this._setLikeButtonActive();
    this._setDeleteButtonVisible();

    this._setEventListeners();

    return this._element;
  }
}
