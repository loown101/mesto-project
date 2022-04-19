import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selector, config) {
    super(selector, config);
  }

  open(data) {
    super.open();
    this._image = document.querySelector(this._config.popupGalleryImageSelector);
    this._figcaption = document.querySelector(this._config.popupDescriptionImageSelector);
    this._image.src = data.link;
    this._image.alt = data.name;
    this._figcaption.textContent = data.name;
  }

}