import { popupConfig, validationConfig } from "./configs.js";
export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(popupConfig.popupOpenClass);
      this.close(openedPopup);
    }
  }

  open() {
    this._selector.classList.add(popupConfig.popupOpenClass);
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._selector.classList.remove(popupConfig.popupOpenClass);
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  disabledButton(evt) {
    evt.submitter.setAttribute("disabled", "disabled");
    evt.submitter.classList.add(validationConfig.inactiveButtonClass);
  }

  renderLoading(isLoading, evt) {
    const btn = evt.submitter;

    if (isLoading) {
      btn.textContent = "Сохранение...";
      btn.classList.remove(validationConfig.inactiveButtonClass);
    } else {
      btn.textContent = "Сохранить";
      btn.classList.add(validationConfig.inactiveButtonClass);
    }
  }

  setEventListeners() {
    this._selector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains(popupConfig.popupOpenClass)) {
        this.close();
      }
      if (evt.target.classList.contains(popupConfig.popupButtonCloseClass)) {
        this.close();
      }
    });
  }
}
