export default class Popup {
  constructor(selector, config) {
    this._selector = document.querySelector(selector);
    this._config = config;
    this._openedPopup = document.querySelector(config.popupOpenClass);
  }

  _handleEscClose(evt) { // что-то не так
    if (evt.key === "Escape") {
      this.close(this._openedPopup);
    }
  }

  open() {
    this._selector.classList.add(this._config.popupOpenClass); // слушатели должны быть в методе слушателей
    // document.addEventListener("keydown", (evt) => {
    //   this._handleEscClose(evt);
    // });
  }

  close() {
    this._selector.classList.remove(this._config.popupOpenClass);
    // document.removeEventListener("keydown", (evt) => {
    //   this._handleEscClose(evt);
    // });
  }

  renderLoading(isLoading, evt) {
    this._button = evt.submitter;

    if (isLoading) {
      this._button.textContent = "Сохранение...";
      this._button.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._button.textContent = "Сохранить";
      this._button.classList.add(this._config.inactiveButtonClass);
    }
  }

  setEventListeners() {
    this._selector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains(this._config.popupOpenClass)) {
        this.close();
      }

      // document.addEventListener("keydown", (evt) => {
      //   this._handleEscClose(evt);
      // });

      if (evt.target.classList.contains(this._config.popupButtonCloseClass)) {
        this.close();
      }

      // document.removeEventListener("keydown", (evt) => {
      //   this._handleEscClose(evt);
      // });
    });
  }
}
