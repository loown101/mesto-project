export default class Popup {
  constructor(selector, config) {
    this._container = document.querySelector(selector);
    this._config = config;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._container.classList.add(this._config.popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._container.classList.remove(this._config.popupOpenClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._container.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains(this._config.popupOpenClass)) {
        this.close();
      }

      if (evt.target.classList.contains(this._config.popupButtonCloseClass)) {
        this.close();
      }

    });
  }
}
