import './index.css';

import {
  editButton,
  addButton,
  editAvatarBtn,
  editAvatarBtnActive,
  user,
} from '../utils/data.js';
import {
  userConfig,
  popupConfig,
  galleryConfig,
  validateConfig,
} from '../utils/configs.js';
import Api from '../components/Api.js';
import FormValidate from '../components/FormValidate.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithDelete from '../components/PopupWithDelete';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8/',
  headers: {
    Authorization: 'ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982',
    'Content-type': 'application/json',
  },
});

const userInfo = new UserInfo({
  nameSelector: userConfig.userNameSelector,
  aboutSelector: userConfig.userAboutSelector,
  avatarSelector: userConfig.userAvatarSelector,
  handleGetUserInfo: () => {
    return api.getUserInfo();
  },
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidate(formElement, config);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const cardList = new Section(
  renderer,
  galleryConfig.galleryList,
  galleryConfig
);

const imagePopup = new PopupWithImage(
  popupConfig.popupImageSelector,
  popupConfig
);

const profilePopup = new PopupWithForm({
  selector: popupConfig.popupProfileSelector,
  config: popupConfig,
  submitForm: (data) => {
    return api
      .editUserInfo(data['profile-name'], data['profile-description'])
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  },
});

const avatarPopup = new PopupWithForm({
  selector: popupConfig.popupAvatarSelector,
  config: popupConfig,
  submitForm: (data) => {
    return api
      .editAvatar(data['profile-avatar'])
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  },
});

const placePopup = new PopupWithForm({
  selector: popupConfig.popupPlaceSelector,
  config: popupConfig,
  submitForm: (data) => {
    return api
      .addCard(data['place-name'], data['place-description'])
      .then((res) => {
        cardList.renderItems([res], 'prepend');
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  },
});

const deleteImagePopup = new PopupWithDelete(popupConfig.deleteImagePopupSelector, popupConfig)

addButton.addEventListener('click', function () {
  placePopup.open();

  formValidators['place-form'].resetValidation();
});

editButton.addEventListener('click', function () {
  userInfo.getUserInfo().then((res) => {
    profilePopup.setInputValues({
      'profile-name': res.name,
      'profile-description': res.about,
    });

    profilePopup.open();
  });

  formValidators['profile-form'].resetValidation();
});

editAvatarBtn.addEventListener('mouseover', () => {
  showEditBtn(editAvatarBtnActive);
});

editAvatarBtn.addEventListener('mouseout', () => {
  hiddenEditBtn(editAvatarBtnActive);
});

editAvatarBtn.addEventListener('click', () => {
  avatarPopup.open();

  formValidators['avatar-form'].resetValidation();
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    user.id = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards, 'append');
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

function renderer(item, config) {
  const card = new Card(item, config.cardTempaleteSelector, config, {
    handleCardClick: (item) => {
      imagePopup.open(item);
    },
    handleLikeToggle: (cardId, method) => {
      return api.getLikeCard(cardId, method);
    },
    handleDelete: (cardId, handleDeleteClick) => {
      deleteImagePopup.open()
      return deleteImagePopup.setSubmitAction(deleteCardApi, handleDeleteClick, cardId);
    },
  });

  const cardElement = card.generate(user.id);
  return cardElement;
}

function deleteCardApi(cardId) {
  return api.deleteCard(cardId)
}

function showEditBtn(editImage) {
  editImage.classList.add(popupConfig.popupAvatarActiveClass);
}

function hiddenEditBtn(editImage) {
  editImage.classList.remove(popupConfig.popupAvatarActiveClass);
}

deleteImagePopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
placePopup.setEventListeners();

enableValidation(validateConfig);