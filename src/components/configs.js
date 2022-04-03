// const validationConfig = {
//   formSelector: '.pop-up__forms',
//   inputSelector: '.pop-up__profile-input',

//   submitButtonSelector: '.pop-up__btn-save',
//   inactiveButtonClass: 'pop-up__btn-save_inactive',

//   inputErrorClass: 'pop-up__profile-input_error',
// }

const popupConfig = {
  popupOpenClass: 'pop-up_opened',
  popupImageGalleryClass: 'pop-up__gallery-image',

  popupImageSelector: '.pop-up__image',
  popupGalleryImageSelector: '.pop-up__gallery-image',
  popupDescriptionImageSelector: '.pop-up__desctiption-image',
}

const cardConfig = {
  cardTempaleteID: '#card',

  likeButtonClass: 'gallery__button-like',
  likeButtonClassActive: 'gallery__button-like_active',

  likeButtonSelector: '.gallery__button-like',
  deleteButtonSelector: '.gallery__button-delete',

  galleryItemSelector: '.gallery__item',
  galleryPicSelector: '.gallery__pic',
  galleryItemDescriptionSelector: '.gallery__item-descriprion',
}

export { popupConfig, cardConfig };