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
} from './modal.js';
import { popupConfig, cardConfig } from './configs.js';
import { enableValidation } from './validate.js';
import { api } from './api.js';
import Card from './cards.js'

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

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    jobName.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    for (let i = 0; i < cards.length; i++) {
      const card = new Card(cards[i], cardConfig.cardTempaleteID, handleCardClick);
      galleryList.append(card.generate(userData._id));
    }
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

function handleCardClick() {
  console.log('asd')
}
