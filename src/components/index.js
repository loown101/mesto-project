import '../pages/index.css';

import {
  popups,
  popupProfile,
  popupPlace,
  editButton,
  addButton,
  profileName,
  jobName,
  profileForm,
  nameInput,
  jobInput,
  placeForm,
  placeLink,
  placeDescription,
} from './data.js';
import { openPopup, closePopup, handleProfileFormSubmit } from './modal.js';
import { popupConfig, validationConfig } from './configs.js';
import { addPrependCard } from './cards.js';
import { enableValidation } from './validate.js';

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

profileForm.addEventListener('submit', handleProfileFormSubmit);

placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  evt.submitter.setAttribute('disabled', 'disabled');
  evt.submitter.classList.add(validationConfig.inactiveButtonClass);

  addPrependCard(placeLink.value, placeDescription.value);

  closePopup()

  placeForm.reset()
});

enableValidation({
  formSelector: '.pop-up__forms',
  inputSelector: '.pop-up__profile-input',

  submitButtonSelector: '.pop-up__btn-save',
  inactiveButtonClass: 'pop-up__btn-save_inactive',

  inputErrorClass: 'pop-up__profile-input_error',
});
