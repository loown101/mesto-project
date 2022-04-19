import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ selector, config, callback }) {
    super(selector, config);
    this._callback = callback;
    this._form = this._selector.querySelector(config.popupFormSelector);
    this._objInput = {};
  }

  _getInputValues() {
    [...this._form].forEach(element => {
      this._objInput[element.name] = element.value;
    });

    return this._objInput;
  }

  renderLoading(isLoading, evt) {
    this._button = evt.submitter;

    if (isLoading) {
      this._button.textContent = 'Сохранение...';
      this._button.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._button.textContent = 'Сохранить';
      this._button.classList.add(this._config.inactiveButtonClass);
    }
  }

  close() {
    super.close()

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(evt, this._getInputValues());
    });
  }
}