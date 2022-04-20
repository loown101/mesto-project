import './index.css';

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
} from '../utils/data.js';
import { popupConfig, galleryConfig, validateConfig } from '../utils/configs.js';
import Api from '../components/Api.js';
import FormValidate from '../components/FormValidate.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js';

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8/",
  headers: {
    Authorization: "ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982",
    "Content-type": "application/json",
  },
});

const userInfo = new UserInfo({ nameElement: profileName, aboutElement: jobName, avatarElement: profileAvatar });
const formProfile = new FormValidate(validateConfig, profileForm);
const formAvatar = new FormValidate(validateConfig, avatarForm);
const formPlace = new FormValidate(validateConfig, placeForm);

const profilePopup = new PopupWithForm({
  selector: popupConfig.popupProfileSelector,
  config: popupConfig,
  submitForm: (data) => { //убрала evt
   // profilePopup.renderLoading(true, evt);
    api.editUserInfo(data['profile-name'], data['profile-description'])
      .then((res) => {
        userInfo.setUserInfo(res);
        //profilePopup.close();
        
      })
      .then(() => {
        profilePopup.setEventListeners();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      // .finally(() => {
      //   profilePopup.renderLoading(false, evt)
      // })
  }
});

const avatarPopup = new PopupWithForm({
  selector: popupConfig.popupAvatarSelector,
  config: popupConfig,
  submitForm: (evt, data) => {
    avatarPopup.renderLoading(true, evt);
    api.editAvatar(data['profile-avatar'])
      .then((res) => {
        userInfo.setUserInfo(res);
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
  config: popupConfig,
  submitForm: (evt, data) => {
    placePopup.renderLoading(true, evt);
    api.addCard(data['place-name'], data['place-description'])
      .then((res) => {
        cardList.renderItems([res]);
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
  formPlace.enableValidation();
  placePopup.setEventListeners();
});

editButton.addEventListener('click', function () {
  userInfo.getUserInfo({ name: nameInput, about: jobInput });
  profilePopup.open();
  formProfile.enableValidation();
  profilePopup.setEventListeners();
});

editAvatarBtn.addEventListener('mouseover', () => {
  showEditBtn(editAvatarBtnActive)
});

editAvatarBtn.addEventListener('mouseout', () => {
  hiddenEditBtn(editAvatarBtnActive)
});

editAvatarBtn.addEventListener('click', () => {
  avatarPopup.open();
  formAvatar.enableValidation();
  avatarPopup.setEventListeners();
});

// вынести Section
const cardList = new Section(
renderer, galleryConfig.galleryList, galleryConfig)

function renderer(item, config) { //user id нужно
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, config.cardTempaleteSelector, config,
    {
      handleCardClick: (item) => {
        imagePopup.open(item);
        imagePopup.setEventListeners();
      }
    });

  const cardElement = card.generate('5fda73ed86d341a7042022c4');
  return cardElement
}
console.log();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
   
    cardList.renderItems(cards);//нужен массив карточек
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

const imagePopup = new PopupWithImage(popupConfig.popupImageSelector, popupConfig);

function showEditBtn(editImage) {
  editImage.classList.add(popupConfig.popupAvatarActiveClass);
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove(popupConfig.popupAvatarActiveClass);
}