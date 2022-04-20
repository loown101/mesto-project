export default class FormValidate {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._data.submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._data.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._data.inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._data.inputErrorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    this._hideInputError(inputElement);

    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
      );
    }
  }

  _setEventListeners() {
    
    this.resetValidation();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.setAttribute("disabled", "disabled");
    } else {
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.removeAttribute("disabled", "disabled");
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

  }
}
