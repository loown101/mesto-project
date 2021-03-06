const userConfig = {
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar',
}

const validateConfig = {
  formSelector: '.pop-up__forms',
  inputSelector: '.pop-up__profile-input',

  submitButtonSelector: '.pop-up__btn-save',
  inactiveButtonClass: 'pop-up__btn-save_inactive',

  inputErrorClass: 'pop-up__profile-input_error',
}

const popupConfig = {
  popupFormSelector: '.pop-up__forms',

  popupOpenClass: 'pop-up_opened',
  popupImageGalleryClass: 'pop-up__gallery-image',

  popupButtonCloseClass: 'pop-up__btn-close',

  popupImageSelector: '.pop-up__image',
  popupGalleryImageSelector: '.pop-up__gallery-image',
  popupDescriptionImageSelector: '.pop-up__desctiption-image',

  popupAvatarActiveClass: 'profile__avatar-change_active',

  popupProfileSelector: '.pop-up__profile',
  popupAvatarSelector: '.pop-up__avatar',
  popupPlaceSelector: '.pop-up__place',
  deleteImagePopupSelector: '.pop-up__deletephoto',
}

const galleryConfig = {
  cardTempaleteSelector: '#card',

  likeButtonClass: 'gallery__button-like',
  likeButtonClassActive: 'gallery__button-like_active',

  likeButtonSelector: '.gallery__button-like',
  deleteButtonSelector: '.gallery__button-delete',

  likeShowSelector: '.gallery__show-like',

  galleryItemSelector: '.gallery__item',
  galleryPicSelector: '.gallery__pic',
  galleryItemDescriptionSelector: '.gallery__item-descriprion',

  galleryList: '.gallery__list',
}

export { userConfig, popupConfig, galleryConfig, validateConfig };