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
} from './modal.js';
import { popupConfig, validationConfig } from './configs.js';
import { enableValidation } from './validate.js';
import { getPostsMe, postPostsCard } from './api.js'

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

  evt.submitter.setAttribute('disabled', 'disabled');
  evt.submitter.classList.add(validationConfig.inactiveButtonClass);

  handleProfileFormSubmit(evt)
});

placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  evt.submitter.setAttribute('disabled', 'disabled');
  evt.submitter.classList.add(validationConfig.inactiveButtonClass);

  postPostsCard(placeLink.value, placeDescription.value);

  closePopup()

  placeForm.reset()
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

  evt.submitter.setAttribute('disabled', 'disabled');
  evt.submitter.classList.add(validationConfig.inactiveButtonClass);

  handleAvatarFormSubmit(evt);
  avatarForm.reset();
})

enableValidation({
  formSelector: '.pop-up__forms',
  inputSelector: '.pop-up__profile-input',

  submitButtonSelector: '.pop-up__btn-save',
  inactiveButtonClass: 'pop-up__btn-save_inactive',

  inputErrorClass: 'pop-up__profile-input_error',
});

getPostsMe();