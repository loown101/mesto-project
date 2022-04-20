import { api } from '../pages/index.js'; // в будущем удалить
export default class Card {
  constructor(data, selector, config, { handleCardClick }) {
    this._container = document.querySelector(selector);
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._config = config;
  }

  _getElement() {
    const cardTemplate = this._container
      .content
      .querySelector(this._config.galleryItemSelector)
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._element.querySelector(this._config.galleryPicSelector).addEventListener('click', () => {
        this._handleCardClick(this._data);
      });

    this._element.querySelector(this._config.deleteButtonSelector).addEventListener('click', (event) => {
        api.deleteCard(this._data._id)
          .then(() => {
            this._deleteCard(event);
          })
          .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
          })
      });


    this._element
      .querySelector(this._config.likeButtonSelector)
      .addEventListener('click', this._toggleLikeBtn.bind(this))
  }

  _toggleLikeBtn(event) {
    const target = event.target;

    let method = '';

    if (target.classList.contains(this._config.likeButtonClassActive)) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }

    api.getLikeCard(this._data._id, method)
      .then((data) => {
        this._data.likes = data.likes;

        target.classList.toggle(this._config.likeButtonClassActive);
        this._element.querySelector(this._config.likeShowSelector).textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
  }

  _deleteCard(event) {
    const target = event.target;

    target.closest(this._config.galleryItemSelector).remove();
  }

  generate(myId) {
    this._element = this._getElement();
    this._gallery = this._element.querySelector(this._config.galleryPicSelector);
    
    this._setEventListeners();
    
    this._gallery.src = `${this._data.link}`;
    this._gallery.alt = `${this._data.name}`;
    this._gallery.dataset.id = this._data._id;
    this._element.querySelector(this._config.galleryItemDescriptionSelector).textContent = `${this._data.name}`;//подумать сделать переменные отдельно
    this._element.querySelector(this._config.likeShowSelector).textContent = `${this._data.likes.length}`;

    const likesOwnerID = [];

    this._data.likes.forEach(element => {
      likesOwnerID.push(element._id);
    });

    if (likesOwnerID.includes(this._data.owner._id)) {
      this._element
        .querySelector(this._config.likeButtonSelector)
        .classList
        .add(this._config.likeButtonClassActive);
    }

    if (myId !== this._data.owner._id) {
      this._element
        .querySelector(this._config.deleteButtonSelector)
        .remove();
    }

    return this._element;
  }
};
