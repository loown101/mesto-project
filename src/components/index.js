import '../pages/index.css';

import {
  editButton,
  addButton,
  profileName,
  jobName,
  editAvatarBtn,
  editAvatarBtnActive,
  profileForm,
  profileAvatar,
  avatarForm,
  nameInput,
  jobInput,
  placeForm,
  galleryList,
} from './data.js';
import { cardConfig, validationConfig, popupConfig } from './configs.js';
import Api from './Api.js';
import FormValidate from './FormValidate.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js'

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

const profilePopup = new PopupWithForm({
  selector: popupConfig.popupProfileSelector,
  callback: (evt, data) => {
    profilePopup.renderLoading(true, evt);
    api.editUserInfo(data['profile-name'], data['profile-description'])
      .then(() => {
        profileName.textContent = data['profile-name'];
        jobName.textContent = data['profile-description'];
        profilePopup.disabledButton(evt);
        profilePopup.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        profilePopup.renderLoading(false, evt)
      })
  }
});

const avatarPopup = new PopupWithForm({
  selector: popupConfig.popupAvatarSelector,
  callback: (evt, data) => {
    avatarPopup.renderLoading(true, evt);
    api.editAvatar(data['profile-avatar'])
      .then(() => {
        profileAvatar.src = data['profile-avatar'];

        avatarPopup.disabledButton(evt);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false, evt)
      })
  }
});

const placePopup = new PopupWithForm({
  selector: popupConfig.popupPlaceSelector,
  callback: (evt, data) => {
    placePopup.renderLoading(true, evt);
    api.addCard(data['place-name'], data['place-description'])
      .then((res) => {
        const card = new Card(res, cardConfig.cardTempaleteID, handleCardClick)
        galleryList.prepend(card.generate(res.owner._id));

        placePopup.disabledButton(evt);
        placePopup.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        placePopup.renderLoading(false, evt)
      })
  }
});

addButton.addEventListener('click', function () {
  placePopup.open();
});

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;

  profilePopup.open();
});

placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  placePopup.open();
});

editAvatarBtn.addEventListener('mouseover', () => {
  showEditBtn(editAvatarBtnActive)
});

editAvatarBtn.addEventListener('mouseout', () => {
  hiddenEditBtn(editAvatarBtnActive)
});

editAvatarBtn.addEventListener('click', () => {
  avatarPopup.open();
});

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  avatarPopup.open();
})


Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    // const profile = new Section({
    // items: userData,
    // renderer: (item) => {
    // const user = new UserInfo(селекторы)
    // user.setUserInfo();
    // profileName.textContent = userData.name;
    // jobName.textContent = userData.about;
    // profileAvatar.src = userData.avatar;
    // }
    // }, '.profile') {

    // }
    profileName.textContent = userData.name;
    jobName.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    const cardList = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, cardConfig.cardTempaleteID, handleCardClick);
        const cardElement =
          card.generate(userData._id);
        cardList.addItem(cardElement);
      }
    }, cardConfig.galleryList)

    cardList.renderItems()
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

function handleCardClick() {
  console.log('asd')
}

function showEditBtn(editImage) {
  editImage.classList.add(popupConfig.popupAvatarActiveClass);
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove(popupConfig.popupAvatarActiveClass);
}