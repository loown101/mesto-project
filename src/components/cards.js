import {
  galleryList,
  popupImage,
  imageGallery,
  figcaptionImageGallery,
} from './data.js';

import { cardConfig } from './configs.js';
import { openPopup } from './modal.js';
import { deleteCard, getlikeCard } from './api.js';

function like(event, likeShow, cardID) {
  const target = event.target;

  let method = '';

  if (target.classList.contains(cardConfig.likeButtonClassActive)) {
    method = 'DELETE';
  } else {
    method = 'PUT';
  }

  getlikeCard(cardID, method)
    .then((data) => {
      target.classList.toggle(cardConfig.likeButtonClassActive);
      likeShow.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
}

function del(event) {
  const target = event.target;

  target.closest(cardConfig.galleryItemSelector).remove();
}

function createCard
  (
    placeLinkValue,
    placeDescriptionValue,
    likes,
    myId,
    cardOwnerID,
    cardID,
    likesOwnerID
  ) {

  const cardTemplate = document.querySelector(cardConfig.cardTempaleteID).content;
  const cardElement = cardTemplate.querySelector(cardConfig.galleryItemSelector).cloneNode(true);

  const image = cardElement.querySelector(cardConfig.galleryPicSelector);
  const descriprionImage = cardElement.querySelector(cardConfig.galleryItemDescriptionSelector);

  const likeButton = cardElement.querySelector(cardConfig.likeButtonSelector);
  const deleteButton = cardElement.querySelector(cardConfig.deleteButtonSelector);

  const likeShow = cardElement.querySelector(cardConfig.likeShowSelector);

  image.src = `${placeLinkValue}`;
  image.alt = `${placeDescriptionValue}`;
  image.dataset.id = cardID;
  descriprionImage.textContent = `${placeDescriptionValue}`;
  likeShow.textContent = `${likes}`;

  image.addEventListener('click', function () {
    imageGallery.src = `${placeLinkValue}`;
    imageGallery.alt = `${placeDescriptionValue}`;
    figcaptionImageGallery.textContent = `${placeDescriptionValue}`;

    openPopup(popupImage);
  });

  if (myId === cardOwnerID) {
    deleteButton.addEventListener('click', function (event) {
      deleteCard(cardID)
        .then(() => {
          del(event);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
    })
  } else {
    deleteButton.remove();
  }

  if (likesOwnerID.includes(myId)) {
    likeButton.classList.add(cardConfig.likeButtonClassActive);
  }

  likeButton.addEventListener('click', function (event) {
    like(event, likeShow, cardID)
  })

  return cardElement;
}

function addPrependCard(placeLinkValue, placeDescriptionValue, likes, myId, cardOwnerID, cardID, likesOwnerID) {
  const cardElement = createCard(placeLinkValue, placeDescriptionValue, likes, myId, cardOwnerID, cardID, likesOwnerID);

  galleryList.prepend(cardElement);
}

export { addPrependCard };
