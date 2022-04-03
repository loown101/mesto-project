import '../pages/index.css';

import {
  popups,
  popupProfile,
  popupPlace,
  editButton,
  addButton,
  closeButtons,
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
import { popupConfig } from './configs.js';
import { addPrependCard } from './cards.js';
import { enableValidation } from './validate.js';

popups.forEach(item => {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup()
    }
  })
})

popups.forEach(item => {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains(popupConfig.popupImageGalleryClass) || evt.target.closest('.pop-up__forms')) {
      return false;
    } else {
      closePopup();
    }
  })
})

addButton.addEventListener('click', function () {
  placeLink.value = '';
  placeDescription.value = '';

  openPopup(popupPlace)
});

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;

  openPopup(popupProfile)
});

closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addPrependCard(placeLink.value, placeDescription.value);

  closePopup()

  placeLink.value = '';
  placeDescription.value = '';
});

enableValidation({
  formSelector: '.pop-up__forms',
  inputSelector: '.pop-up__profile-input',

  submitButtonSelector: '.pop-up__btn-save',
  inactiveButtonClass: 'pop-up__btn-save_inactive',

  inputErrorClass: 'pop-up__profile-input_error',
});
