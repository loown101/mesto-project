import { popupConfig, validationConfig } from './configs.js';
import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ selector, callback }) {
    super(selector);
    this._callback = callback;
    this._form = this._selector.querySelector(popupConfig.popupFormSelector);
    this.setEventListeners();
  }

  _getInputValues() {
    const objInput = {};

    [...this._form].forEach(element => {
      objInput[element.name] = element.value;
    });

    return objInput;
  }

  disabledButton(evt) {
    evt.submitter.setAttribute('disabled', 'disabled');
    evt.submitter.classList.add(validationConfig.inactiveButtonClass);
  }

  renderLoading(isLoading, evt) {
    const btn = evt.submitter;

    if (isLoading) {
      btn.textContent = 'Сохранение...';
      btn.classList.remove(validationConfig.inactiveButtonClass);
    } else {
      btn.textContent = 'Сохранить';
      btn.classList.add(validationConfig.inactiveButtonClass);
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