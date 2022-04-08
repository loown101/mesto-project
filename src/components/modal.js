import {
  popups,
  profileAvatar,
  profileName,
  jobName,
  nameInput,
  jobInput,
  avatarInput,
} from './data.js';

import { popupConfig, validationConfig } from './configs.js';
import { pathPostsPersonalInfo, pathPostsAvatar } from './api.js';

function showEditBtn(editImage) {
  editImage.classList.add(popupConfig.popupAvatarActiveClass);
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove(popupConfig.popupAvatarActiveClass);
}

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

  profileName.textContent = nameInputValue;
  jobName.textContent = jobInputValue;

  pathPostsPersonalInfo(nameInputValue, jobInputValue);

  closePopup()
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault()

  const avatarSrc = avatarInput.value;

  profileAvatar.src = avatarSrc;

  pathPostsAvatar(avatarSrc);

  closePopup()
}

function renderLoading(isLoading) {
  const btnsSave = document.querySelectorAll(validationConfig.submitButtonSelector);

  btnsSave.forEach(btn => {
    if (isLoading) {
      btn.textContent = 'Сохранение...';
      btn.classList.remove(validationConfig.inactiveButtonClass);
    } else {
      btn.textContent = 'Сохранить';
      btn.classList.add(validationConfig.inactiveButtonClass);
    }
  })
}

export {
  showEditBtn,
  hiddenEditBtn,
  openPopup,
  closePopup,
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
  closeByEscape,
  renderLoading
};