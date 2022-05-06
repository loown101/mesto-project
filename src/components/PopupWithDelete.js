import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(selector, config) {
    super(selector, config);
    this._form = this._container.querySelector(config.popupFormSelector);
  }

  setSubmitAction(action, handleDeleteClick, cardOwnerID) {
    this._cardOwnerID = cardOwnerID;
    this._handleDeleteClick = handleDeleteClick;
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitButton = evt.submitter;
      this._initialText = this._submitButton.textContent;

      this._submitButton.textContent = 'Удаление...';

      this._handleSubmitCallback(this._cardOwnerID)
        .then(() => {
          this.close()
          this._handleDeleteClick()
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
          this._submitButton.textContent = this._initialText;
        })
    })
  }
}
