import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ selector, config, submitForm }) {
    super(selector, config);
    this._submitForm = submitForm;
    this._form = this._container.querySelector(config.popupFormSelector);
    this._objInput = {};
    this._inputList = [...this._form];
  }

  _getInputValues() {
    this._inputList.forEach(element => {
      this._objInput[element.name] = element.value;
    });

    return this._objInput;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close()

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton = evt.submitter;

      this._initialText = this._submitButton.textContent;

      this._submitButton.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = this._initialText;
        })
    });
  };

}
