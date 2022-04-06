import {
  cardsContainer,
  currentName,
  confirmDeletePopup,
  confirmDeleteButton,
} from "./constants";
import { deleteCard, addLike, deleteLike } from "./api";
import { openPopup, closePopup } from "./modal";
import { isElementContainClass, toggleElementClass } from "./utils";

const isCardOwner = (owner) =>
  owner === currentName.getAttribute("data-owner-id");

const isLikeCard = (likes) => {
  return likes.some(
    (item) => item._id === currentName.getAttribute("data-owner-id")
  );
};

const createCard = (id, owner, name, link, likes, config) => {
  const cardTemplate = document.querySelector(config.templateSelector).content;
  const cardElement = cardTemplate
    .querySelector(config.cardSelector)
    .cloneNode(true);
  const cardImage = cardElement.querySelector(config.imageSelector);
  const cardName = cardElement.querySelector(config.nameSelector);
  const cardLikeButton = cardElement.querySelector(config.likeSelector);
  const cardLikeCount = cardElement.querySelector(config.likeCountSelector);
  const deleteCardButton = cardElement.querySelector(config.deleteSelector);

  cardElement.setAttribute("data-id", id);
  cardElement.setAttribute("data-owner-id", owner);

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardLikeCount.textContent = likes.length;

  if (isLikeCard(likes)) {
    cardLikeButton.classList.add(config.likeActiveClass);
  }

  if (isCardOwner(owner)) {
    deleteCardButton.classList.add(config.deleteVisibleClass);
  }

  return cardElement;
};

const renderCard = (type, data) => {
  switch (type) {
    case "appendSomeCards":
      data.forEach((item) => cardsContainer.append(item));
      break;
    case "prependOneCard":
      cardsContainer.prepend(data);
      break;
    default:
      console.log(`Insert type ${type} not in select`);
      break;
  }
};

const openImageCardViewer = (element, config) => {
  const popupViewer = document.querySelector(config.popupViewerSelector);
  const popupViewerImage = popupViewer.querySelector(
    config.popupViewerImageSelector
  );
  const popupViewerDescription = popupViewer.querySelector(
    config.popupViewerDescriptionSelector
  );
  const imageElement = element.querySelector(config.imageSelector);

  popupViewerImage.src = imageElement.src;
  popupViewerImage.alt = imageElement.alt;
  popupViewerDescription.textContent = imageElement.alt;

  openPopup(popupViewer);
};

const changeLikeCount = (likeCountElement, likeButtonElement, res, config) => {
  likeCountElement.textContent = res.likes.length;
  toggleElementClass(likeButtonElement, config.likeActiveClass);
};

const getTypeForChangeLikeCount = (element, config, apiConfig) => {
  const cardElement = element.parentElement.parentElement.parentElement;
  const cardId = cardElement.getAttribute("data-id");
  const likeButtonElement = cardElement.querySelector(config.likeSelector);
  const likeCountElement = cardElement.querySelector(config.likeCountSelector);

  if (isElementContainClass(element, config.likeActiveClass)) {
    deleteLike(cardId, apiConfig)
      .then((res) => {
        changeLikeCount(likeCountElement, likeButtonElement, res, config);
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId, apiConfig)
      .then((res) => {
        changeLikeCount(likeCountElement, likeButtonElement, res, config);
      })
      .catch((err) => console.log(err));
  }
};

const submitDeleteCardHandler = (evt, id, apiConfig) => {
  evt.preventDefault();

  confirmDeleteButton.textContent = "Удаление...";
  confirmDeleteButton.disabled = true;

  deleteCard(id, apiConfig)
    .then(() => {
      document.querySelector(`[data-id="${id}"]`).remove();
      closePopup(confirmDeletePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (confirmDeleteButton.textContent = "Да"));
};

const setActionCardHandlers = (evt, config, apiConfig) => {
  const cardElement = evt.target;
  const parent = cardElement.parentElement;

  switch (cardElement.classList[0]) {
    case config.imageOverlayClass:
      openImageCardViewer(cardElement, config);
      break;
    case config.likeClass:
      getTypeForChangeLikeCount(cardElement, config, apiConfig);
      break;
    case config.deleteClass:
      confirmDeleteButton.setAttribute(
        "data-card-id",
        parent.getAttribute("data-id")
      );
      openPopup(confirmDeletePopup);
      break;
    default:
      break;
  }
};

export {
  createCard,
  renderCard,
  setActionCardHandlers,
  submitDeleteCardHandler,
};
