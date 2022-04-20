import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selector, config) {
    super(selector, config);
    this._image = this._container.querySelector(this._config.popupGalleryImageSelector);
    this._figcaption = this._container.querySelector(this._config.popupDescriptionImageSelector);
  }

  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._figcaption.textContent = data.name;
  }

}