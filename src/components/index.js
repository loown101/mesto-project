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
} from './data.js';
import { cardConfig, validationConfig, popupConfig } from './configs.js';
import Api from './Api.js';
import FormValidate from './FormValidate.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage';
import Section from './Section.js'
import UserInfo from './UserInfo.js';

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8/",
  headers: {
    Authorization: "ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982",
    "Content-type": "application/json",
  },
});

const userInfo = new UserInfo({ nameElement: profileName, aboutElement: jobName, avatarElement: profileAvatar });

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
      .then((res) => {
        userInfo.setUserInfo(res);

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
      .then((res) => {
        userInfo.setUserInfo(res);

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
        const cardList = new Section({
          items: [res],
          renderer: (item) => {
            const card = new Card(item, cardConfig.cardTempaleteID,
              {
                handleCardClick: (item) => {
                  imagePopup.open(item);
                  imagePopup.setEventListeners();
                }
              });
            const cardElement = card.generate(res.owner._id);
            cardList.addItem(cardElement, true);
          }
        }, cardConfig.galleryList)

        cardList.renderItems()
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
  userInfo.getUserInfo({ name: nameInput, about: jobInput });

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

    userInfo.setUserInfo(userData);

    const cardList = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, cardConfig.cardTempaleteID,
          {
            handleCardClick: (item) => {
              imagePopup.open(item);
              imagePopup.setEventListeners();
            }
          });
        const cardElement = card.generate(userData._id);
        cardList.addItem(cardElement);
      }
    }, cardConfig.galleryList)

    cardList.renderItems()
  })
  .catch(err => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

const imagePopup = new PopupWithImage(popupConfig.popupImageSelector);

function showEditBtn(editImage) {
  editImage.classList.add(popupConfig.popupAvatarActiveClass);
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove(popupConfig.popupAvatarActiveClass);
}