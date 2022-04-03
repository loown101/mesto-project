import {
  initialCards,
  galleryList,
} from './data.js';

import { cardConfig, popupConfig } from './configs.js';
import { openPopup } from './modal.js';

function like(event) {
  let target = event.target;

  if (target.classList.contains(cardConfig.likeButtonClass)) {
    target.classList.toggle(cardConfig.likeButtonClassActive);
  }
}

function del(event) {
  let target = event.target;

  const listItem = target.closest(cardConfig.galleryItemSelector);
  listItem.remove();
}

function createImage(placeLinkValue, placeDescriptionValue) {
  const cardTemplate = document.querySelector(cardConfig.cardTempaleteID).content;
  const cardElement = cardTemplate.querySelector(cardConfig.galleryItemSelector).cloneNode(true);

  const image = cardElement.querySelector(cardConfig.galleryPicSelector);

  const likeButton = cardElement.querySelector(cardConfig.likeButtonSelector);
  const deleteButton = cardElement.querySelector(cardConfig.deleteButtonSelector);

  cardElement.querySelector(cardConfig.galleryPicSelector).src = `${placeLinkValue}`;
  cardElement.querySelector(cardConfig.galleryPicSelector).alt = `${placeDescriptionValue}`;
  cardElement.querySelector(cardConfig.galleryItemDescriptionSelector).textContent = `${placeDescriptionValue}`;

  galleryList.prepend(cardElement);

  image.addEventListener('click', function () {
    const popupImage = document.querySelector(popupConfig.popupImageSelector);

    const imageGallery = document.querySelector(popupConfig.popupGalleryImageSelector);
    const figcaptionImageGallery = document.querySelector(popupConfig.popupDescriptionImageSelector)

    imageGallery.src = `${placeLinkValue}`;
    figcaptionImageGallery.textContent = `${placeDescriptionValue}`;

    openPopup(popupImage);
  });

  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', del);
}

for (let i = initialCards.length - 1; i >= 0; i--) {
  createImage(initialCards[i].link, initialCards[i].name)
}

export { createImage };
