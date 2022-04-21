export default class Card {
  constructor(data, selector, config, { handleCardClick, handleLikeToggle, handleDelete }) {
    this._container = document.querySelector(selector);
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleLikeToggle = handleLikeToggle;
    this._handleDelete = handleDelete;
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
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });

    this._deleteBtn.addEventListener('click', (event) => {
      this._handleDelete(this._data._id)
        .then(() => {
          this._deleteCard(event);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
    });

    this._likeBtn.addEventListener('click', this._toggleLikeBtn.bind(this))
  }

  _toggleLikeBtn(event) {
    const target = event.target;

    let method = '';

    if (target.classList.contains(this._config.likeButtonClassActive)) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }

    this._handleLikeToggle(this._data._id, method)
      .then((data) => {
        this._data.likes = data.likes;

        target.classList.toggle(this._config.likeButtonClassActive);
        this._cardShowLike.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
  }

  _deleteCard(event) {
    const target = event.target;

    target.closest(this._config.galleryItemSelector).remove();
  }

  generate(userId) {
    this._element = this._getElement();

    this._image = this._element.querySelector(this._config.galleryPicSelector);
    this._cardImageDesc = this._element.querySelector(this._config.galleryItemDescriptionSelector);
    this._cardShowLike = this._element.querySelector(this._config.likeShowSelector);
    this._likeBtn = this._element.querySelector(this._config.likeButtonSelector);
    this._deleteBtn = this._element.querySelector(this._config.deleteButtonSelector)

    this._setEventListeners();

    this._image.src = `${this._data.link}`;
    this._image.alt = `${this._data.name}`;
    this._image.dataset.id = this._data._id;
    this._cardImageDesc.textContent = `${this._data.name}`;
    this._cardShowLike.textContent = `${this._data.likes.length}`;

    const likesOwnerID = [];

    this._data.likes.forEach(element => {
      likesOwnerID.push(element._id);
    });

    if (likesOwnerID.includes(this._data.owner._id)) {
      this._likeBtn.classList.add(this._config.likeButtonClassActive);
    }

    if (userId !== this._data.owner._id) {
      this._deleteBtn.remove();
    }

    return this._element;
  }
};
