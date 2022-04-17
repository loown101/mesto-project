import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(data) {
      super.open();
      this._image = document.querySelector('.pop-up__gallery-image');
      this._figcaption = document.querySelector('.pop-up__desctiption-image');
      this._image.src = data.link;
      this._image.alt = data.name;
      this._figcaption.textContent = data.name;
    }
   
}