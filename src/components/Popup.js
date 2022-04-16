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
import { api } from './index.js';

export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector(popupConfig.popupOpenClass)
      this.close(openedPopup)
    }
  }

  open() {
    this._selector.classList.add(popupConfig.popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._selector.classList.remove(popupConfig.popupOpenClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(popupConfig.popupOpenClass)) {
        this.close()
      }
      if (evt.target.classList.contains(popupConfig.popupButtonCloseClass)) {
        this.close()
      }
    })
  }
}

const profilePopup = new Popup(popupConfig.popupProfileId);
profilePopup.open();
profilePopup.close();

function showEditBtn(editImage) {
  editImage.classList.add(popupConfig.popupAvatarActiveClass);
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove(popupConfig.popupAvatarActiveClass);
}

function disabledButton(evt) {
  evt.submitter.setAttribute('disabled', 'disabled');
  evt.submitter.classList.add(validationConfig.inactiveButtonClass);
}

// function openPopup(element) {
//   element.classList.add(popupConfig.popupOpenClass);
//   document.addEventListener('keydown', closeByEscape);
// }

// function closePopup() {
//   popups.forEach(element => {
//     element.classList.remove(popupConfig.popupOpenClass);
//     document.removeEventListener('keydown', closeByEscape);
//   });
// }

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector(popupConfig.popupOpenClass)
//     closePopup(openedPopup)
//   }
// }

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  renderLoading(true, evt);

  api.editUserInfo(nameInputValue, jobInputValue)
    .then(() => {
      profileName.textContent = nameInputValue;
      jobName.textContent = jobInputValue;

      disabledButton(evt);
      closePopup();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, evt)
    })
}

function handleAvatarFormSubmit(evt, avatarForm) {
  evt.preventDefault()

  const avatarSrc = avatarInput.value;

  renderLoading(true, evt);

  api.editAvatar(avatarSrc)
    .then(() => {
      profileAvatar.src = avatarSrc;

      disabledButton(evt);
      closePopup();
      avatarForm.reset();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, evt)
    })
}

function handlePlaceFormSubmit(evt, placeForm, placeLinkValue, placeDescriptionValue) {

  renderLoading(true, evt);

  api.addCard(placeLinkValue, placeDescriptionValue)
    .then((data) => {
      console.log(data)
      const like = data.likes;
      const cardOwnerID = data.owner._id;
      const cardID = data._id;
      const likesOwnerID = [];

      like.forEach(element => {
        likesOwnerID.push(element._id);
      });

      addPrependCard(placeLinkValue, placeDescriptionValue, like.length, cardOwnerID, cardOwnerID, cardID, likesOwnerID);

      disabledButton(evt);
      closePopup();
      placeForm.reset();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, evt)
    })
}

function renderLoading(isLoading, evt) {
  const btn = evt.submitter;

  if (isLoading) {
    btn.textContent = 'Сохранение...';
    btn.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    btn.textContent = 'Сохранить';
    btn.classList.add(validationConfig.inactiveButtonClass);
  }

}

export {
  showEditBtn,
  hiddenEditBtn,
  disabledButton,
  // openPopup,
  // closePopup,
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
  handlePlaceFormSubmit,
  //closeByEscape,
  renderLoading
};