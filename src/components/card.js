import {
  cardTemplate,
  cardsContainer,
  currentName,
  confirmDeletePopup,
  confirmDeleteButton,
  popupViewer,
  popupViewerImage,
  popupViewerDescription,
  apiConfig,
} from "./constants";
import { addLike, deleteLike } from "./api";
import { openPopup } from "./modal";
import { isElementContainClass, toggleElementClass } from "./utils";

const isCardOwner = (owner) => {
  return owner === currentName.getAttribute("data-owner-id");
};

const isLikeCard = (likes) => {
  return likes.some(
    (item) => item._id === currentName.getAttribute("data-owner-id")
  );
};

const handleViewImageCard = (name, link) => {
  popupViewerImage.src = link;
  popupViewerImage.alt = name;
  popupViewerDescription.textContent = name;

  openPopup(popupViewer);
};

const renderLikesCount = (cardLikeCount, cardLikeButton, res, config) => {
  cardLikeCount.textContent = res.likes.length;
  toggleElementClass(cardLikeButton, config.likeActiveClass);
};

const handleChangeLikesCount = (
  cardId,
  cardLikeButton,
  cardLikeCount,
  cardConfig,
  apiConfig
) => {
  if (isElementContainClass(cardLikeButton, cardConfig.likeActiveClass)) {
    deleteLike(cardId, apiConfig)
      .then((res) => {
        renderLikesCount(cardLikeCount, cardLikeButton, res, cardConfig);
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId, apiConfig)
      .then((res) => {
        renderLikesCount(cardLikeCount, cardLikeButton, res, cardConfig);
      })
      .catch((err) => console.log(err));
  }
};

const createCard = (id, owner, name, link, likes, config) => {
  const cardElement = cardTemplate
    .querySelector(config.cardSelector)
    .cloneNode(true);
  const cardImage = cardElement.querySelector(config.imageSelector);
  const cardImageOverlay = cardElement.querySelector(
    config.imageOverlaySelector
  );
  const cardName = cardElement.querySelector(config.nameSelector);
  const cardLikeButton = cardElement.querySelector(config.likeSelector);
  const cardLikeCount = cardElement.querySelector(config.likeCountSelector);
  const deleteCardButton = cardElement.querySelector(config.deleteSelector);

  cardElement.setAttribute("data-card-id", id);

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

  cardImageOverlay.addEventListener("click", () => {
    handleViewImageCard(name, link);
  });

  cardLikeButton.addEventListener("click", () => {
    handleChangeLikesCount(
      id,
      cardLikeButton,
      cardLikeCount,
      config,
      apiConfig
    );
  });

  deleteCardButton.addEventListener("click", () => {
    confirmDeleteButton.setAttribute("data-card-id", id);
    openPopup(confirmDeletePopup);
  });

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

export { createCard, renderCard };
