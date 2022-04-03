import {
  initialCards,
  galleryList,
  popupImage,
  imageGallery,
  figcaptionImageGallery,
} from './data.js';

import { cardConfig } from './configs.js';
import { openPopup } from './modal.js';

function like(event) {
  const target = event.target;

  target.classList.toggle(cardConfig.likeButtonClassActive);
}

function del(event) {
  const target = event.target;

  target.closest(cardConfig.galleryItemSelector).remove();
}

function createCard(placeLinkValue, placeDescriptionValue) {
  const cardTemplate = document.querySelector(cardConfig.cardTempaleteID).content;
  const cardElement = cardTemplate.querySelector(cardConfig.galleryItemSelector).cloneNode(true);

  const image = cardElement.querySelector(cardConfig.galleryPicSelector);
  const descriprionImage = cardElement.querySelector(cardConfig.galleryItemDescriptionSelector);

  const likeButton = cardElement.querySelector(cardConfig.likeButtonSelector);
  const deleteButton = cardElement.querySelector(cardConfig.deleteButtonSelector);

  image.src = `${placeLinkValue}`;
  image.alt = `${placeDescriptionValue}`;
  descriprionImage.textContent = `${placeDescriptionValue}`;

  image.addEventListener('click', function () {
    imageGallery.src = `${placeLinkValue}`;
    imageGallery.alt = `${placeDescriptionValue}`;
    figcaptionImageGallery.textContent = `${placeDescriptionValue}`;

    openPopup(popupImage);
  });

  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', del);

  return cardElement;
}

function addPrependCard(placeLinkValue, placeDescriptionValue) {
  const cardElement = createCard(placeLinkValue, placeDescriptionValue);

  galleryList.prepend(cardElement);
}

for (let i = initialCards.length - 1; i >= 0; i--) {
  addPrependCard(initialCards[i].link, initialCards[i].name);
}

export { addPrependCard };
