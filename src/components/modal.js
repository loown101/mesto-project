import {
  popups,
  profileName,
  jobName,
  nameInput,
  jobInput,
} from './data.js';

import { popupConfig } from './configs.js';

function openPopup(element) {
  element.classList.add(popupConfig.popupOpenClass);
  document.addEventListener('keydown', closeByEscape);
}

function closePopup() {
  popups.forEach(element => {
    element.classList.remove(popupConfig.popupOpenClass);
    document.removeEventListener('keydown', closeByEscape);
  });
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(popupConfig.popupOpenClass)
    closePopup(openedPopup)
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  if (nameInputValue.length !== 0 && jobInputValue.length !== 0) {
    profileName.textContent = nameInputValue;
    jobName.textContent = jobInputValue;
  }

  closePopup()
}

export { openPopup, closePopup, handleProfileFormSubmit, closeByEscape };