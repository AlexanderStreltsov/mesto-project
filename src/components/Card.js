import { profileIdKey, cardIdKey } from "../utils/constants";

export default class Card {
  constructor(
    {
      data,
      handleOpenCardImage,
      handleUpdateCardLikesCount,
      handleOpenConfirmDeleteCard,
    },
    config
  ) {
    this._config = config;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleOpenCardImage;
    this._handleLikeClick = handleUpdateCardLikesCount;
    this._handleDeleteIconClick = handleOpenConfirmDeleteCard;
    this._profileId = sessionStorage.getItem(profileIdKey);
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

  _setEventListeners() {
    this._imageOverlayElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButtonElement.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButtonElement.addEventListener("click", () => {
      this._handleDeleteIconClick(this._id);
    });
  }

  isLikeButtonActive() {
    return this._likeButtonElement.classList.contains(
      this._config.likeActiveClass
    );
  }

  getCardId() {
    return this._id;
  }

  changeLikeCount(data) {
    this._likeCountElement.textContent = data.likes.length;
    this._likeButtonElement.classList.toggle(this._config.likeActiveClass);
  }

  generate() {
    this._setElements();

    this._element.setAttribute(cardIdKey, this._id);
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    this._likeCountElement.textContent = this._likes.length;

    this._setLikeButtonActive();
    this._setDeleteButtonVisible();
    this._setEventListeners();

    return this._element;
  }
}
