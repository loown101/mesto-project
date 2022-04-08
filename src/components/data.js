const editButton = document.querySelector('.profile__button-change');
const addButton = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.pop-up__btn-close');

const profileName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

const editAvatarBtn = document.querySelector('.profile__edit-avatar');
const editAvatarBtnActive = document.querySelector('.profile__avatar-change');

const galleryList = document.querySelector('.gallery__list');

const popups = document.querySelectorAll('.pop-up');
const popupProfile = document.querySelector('.pop-up__profile');
const popupPlace = document.querySelector('.pop-up__place');
const popupAvatar = document.querySelector('.pop-up__avatar');

const profileForm = document.querySelector('#profile-forms');
const avatarForm = document.querySelector('#avatar-forms');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-description');
const avatarInput = document.querySelector('#profile-avatar');

const placeForm = document.querySelector('#place-forms');
const placeLink = document.querySelector('#place-name');
const placeDescription = document.querySelector('#place-description');

const popupImage = document.querySelector('.pop-up__image');

const imageGallery = document.querySelector('.pop-up__gallery-image');
const figcaptionImageGallery = document.querySelector('.pop-up__desctiption-image');

export {
  editButton,
  addButton,
  closeButtons,

  profileName,
  jobName,
  profileAvatar,

  editAvatarBtn,
  editAvatarBtnActive,

  galleryList,
  popupImage,
  imageGallery,
  figcaptionImageGallery,

  popups,
  popupProfile,
  popupPlace,
  popupAvatar,

  profileForm,
  avatarForm,
  nameInput,
  jobInput,
  avatarInput,

  placeForm,
  placeLink,
  placeDescription,
}