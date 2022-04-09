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
} from './data.js';
import {
  showEditBtn,
  hiddenEditBtn,
  openPopup,
  closePopup,
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
  handlePlaceFormSubmit,
} from './modal.js';
import { popupConfig } from './configs.js';
import { enableValidation } from './validate.js';
import { getUserInfo, getCards } from './api.js'
import { addPrependCard } from './cards.js'

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

enableValidation({
  formSelector: '.pop-up__forms',
  inputSelector: '.pop-up__profile-input',

  submitButtonSelector: '.pop-up__btn-save',
  inactiveButtonClass: 'pop-up__btn-save_inactive',

  inputErrorClass: 'pop-up__profile-input_error',
});

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    jobName.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    for (let i = 0; i < cards.length; i++) {
      const like = cards[i].likes;
      const cardOwnerID = cards[i].owner._id;
      const cardID = cards[i]._id;
      const likesOwnerID = [];

      like.forEach(element => {
        likesOwnerID.push(element._id);
      });

      addPrependCard(cards[i].link, cards[i].name, like.length, userData._id, cardOwnerID, cardID, likesOwnerID);
    }
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

