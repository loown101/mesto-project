import { cardConfig } from './configs.js';
import { api } from './index.js';
export default class Card {
  constructor(data, selector, {handleCardClick}) {
    this._selector = selector;
    this._data = data;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content
      .querySelector(cardConfig.galleryItemSelector)
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._element
      .querySelector(cardConfig.galleryPicSelector)
      .addEventListener('click', () => {
        this._handleCardClick(this._data);
      });

    this._element
      .querySelector(cardConfig.deleteButtonSelector)
      .addEventListener('click', (event) => {
        api.deleteCard(this._data._id)
          .then(() => {
            this._deleteCard(event);
          })
          .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
          })
      });


    this._element
      .querySelector(cardConfig.likeButtonSelector)
      .addEventListener('click', this._toggleLikeBtn.bind(this))
  }

  _toggleLikeBtn(event) {
    const target = event.target;

    let method = '';

    if (target.classList.contains(cardConfig.likeButtonClassActive)) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }

    api.getLikeCard(this._data._id, method)
      .then((data) => {
        this._data.likes = data.likes;

        target.classList.toggle(cardConfig.likeButtonClassActive);
        this._element.querySelector(cardConfig.likeShowSelector).textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
  }

  _deleteCard(event) {
    const target = event.target;

    target.closest(cardConfig.galleryItemSelector).remove();
  }

  generate(myId) {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector(cardConfig.galleryPicSelector).src = `${this._data.link}`;
    this._element.querySelector(cardConfig.galleryPicSelector).alt = `${this._data.name}`;
    this._element.querySelector(cardConfig.galleryPicSelector).dataset.id = this._data._id;
    this._element.querySelector(cardConfig.galleryItemDescriptionSelector).textContent = `${this._data.name}`;
    this._element.querySelector(cardConfig.likeShowSelector).textContent = `${this._data.likes.length}`;

    const likesOwnerID = [];

    this._data.likes.forEach(element => {
      likesOwnerID.push(element._id);
    });

    if (likesOwnerID.includes(this._data.owner._id)) {
      this._element
        .querySelector(cardConfig.likeShowSelector)
        .classList
        .add(cardConfig.likeButtonClassActive);
    }

    if (myId !== this._data.owner._id) {
      this._element
        .querySelector(cardConfig.deleteButtonSelector)
        .remove();
    }

    return this._element;
  }
};
