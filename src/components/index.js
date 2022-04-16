import '../pages/index.css';

import {
  popups,
  popupProfile,
  popupPlace,
  editButton,
  addButton,
  profileName,
  jobName,
  editAvatarBtn,
  editAvatarBtnActive,
  profileForm,
  profileAvatar,
  avatarForm,
  popupAvatar,
  nameInput,
  jobInput,
  placeForm,
  placeLink,
  placeDescription,
  galleryList,
} from './data.js';
import {
  showEditBtn,
  hiddenEditBtn,
  openPopup,
  closePopup,
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
  handlePlaceFormSubmit,
} from './Popup.js';
import { popupConfig, cardConfig, validationConfig } from './configs.js';
import Api from './Api.js';
import FormValidate from './FormValidate.js';
import Card from './Cards.js';

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8/",
  headers: {
    Authorization: "ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982",
    "Content-type": "application/json",
  },
});


const formProfile = new FormValidate(validationConfig, profileForm);
formProfile.enableValidation();

const formAvatar = new FormValidate(validationConfig, avatarForm);
formAvatar.enableValidation();

const formPlace = new FormValidate(validationConfig, placeForm);
formPlace.enableValidation();

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains(popupConfig.popupOpenClass)) {
      closePopup(popup)
    }
    if (evt.target.classList.contains(popupConfig.popupButtonCloseClass)) {
      closePopup(popup)
    }
  })
})

addButton.addEventListener('click', function () {
  openPopup(popupPlace)
});

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;

  openPopup(popupProfile)
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleProfileFormSubmit(evt);
});

placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handlePlaceFormSubmit(evt, placeForm, placeLink.value, placeDescription.value);
});

editAvatarBtn.addEventListener('mouseover', () => {
  showEditBtn(editAvatarBtnActive)
});

editAvatarBtn.addEventListener('mouseout', () => {
  hiddenEditBtn(editAvatarBtnActive)
});

editAvatarBtn.addEventListener('click', () => {
  openPopup(popupAvatar);
});

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  handleAvatarFormSubmit(evt, avatarForm);
})

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    jobName.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    cards.forEach(item => {
      const card = new Card(item, cardConfig.cardTempaleteID, handleCardClick);
      galleryList.append(card.generate(userData._id));
    });
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

function handleCardClick() {
  console.log('asd')
}
