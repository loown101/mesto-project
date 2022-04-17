import { popupConfig } from './configs.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(data) {
    super.open();
    this._image = document.querySelector(popupConfig.popupGalleryImageSelector);
    this._figcaption = document.querySelector(popupConfig.popupDescriptionImageSelector);
    this._image.src = data.link;
    this._image.alt = data.name;
    this._figcaption.textContent = data.name;
  }

}