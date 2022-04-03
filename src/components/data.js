const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__button-change');
const addButton = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.pop-up__btn-close');

const profileName = document.querySelector('.profile__title');
const jobName = document.querySelector('.profile__subtitle');

const galleryList = document.querySelector('.gallery__list');

const popups = document.querySelectorAll('.pop-up');
const popupProfile = document.querySelector('.pop-up__profile');
const popupPlace = document.querySelector('.pop-up__place');

const profileForm = document.querySelector('#profile-forms');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-description');

const placeForm = document.querySelector('#place-forms');
const placeLink = document.querySelector('#place-name');
const placeDescription = document.querySelector('#place-description');

const popupImage = document.querySelector('.pop-up__image');

const imageGallery = document.querySelector('.pop-up__gallery-image');
const figcaptionImageGallery = document.querySelector('.pop-up__desctiption-image')

export {
  initialCards,

  editButton,
  addButton,
  closeButtons,

  profileName,
  jobName,

  galleryList,
  popupImage,
  imageGallery,
  figcaptionImageGallery,

  popups,
  popupProfile,
  popupPlace,

  profileForm,
  nameInput,
  jobInput,

  placeForm,
  placeLink,
  placeDescription,
}