import { profileName, jobName, profileAvatar } from './data.js';
import { addPrependCard } from './cards.js';
import { renderLoading } from './modal.js'

let myID;

const configCohort = {
  url: 'https://nomoreparties.co/v1/plus-cohort-8/cards',
  urlUser: 'https://nomoreparties.co/v1/plus-cohort-8/users/me',
  headers: {
    'Authorization': 'ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982',
    'Content-type': 'application/json',
  }
}

function getPostsMe() {
  return fetch(configCohort.urlUser, {
    headers: configCohort.headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      myID = data._id;
      profileName.textContent = data.name;
      jobName.textContent = data.about;
      profileAvatar.src = data.avatar;
    })
    .then(() => {
      getPostsInitialCard();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
}

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

function getPostsInitialCard() {
  return fetch(configCohort.url, {
    headers: configCohort.headers,
  })
    .then(onResponce)
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const like = data[i].likes;
        const cardOwnerID = data[i].owner._id;
        const cardID = data[i]._id;
        const likesOwnerID = [];

        like.forEach(element => {
          likesOwnerID.push(element._id);
        });

        addPrependCard(data[i].link, data[i].name, like.length, myID, cardOwnerID, cardID, likesOwnerID);
      }

      return data;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err)
      return Promise.reject(err);
    });
}

function pathPostsPersonalInfo(nameInputValue, jobInputValue) {
  renderLoading(true);
  return fetch(configCohort.urlUser, {
    method: 'PATCH',
    headers: configCohort.headers,
    body: JSON.stringify({
      name: `${nameInputValue}`,
      about: `${jobInputValue}`,
    })
  })
    .then(onResponce)
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false)
    })
}

function postPostsCard(placeLinkValue, placeDescriptionValue) {
  renderLoading(true)
  return fetch(configCohort.url, {
    method: 'POST',
    headers: configCohort.headers,
    body: JSON.stringify({
      name: `${placeDescriptionValue}`,
      link: `${placeLinkValue}`,
    })
  })
    .then(onResponce)
    .then((data) => {
      const like = data.likes;
      const cardOwnerID = data.owner._id;
      const cardID = data._id;
      const likesOwnerID = [];

      like.forEach(element => {
        likesOwnerID.push(element._id);
      });

      return addPrependCard(placeLinkValue, placeDescriptionValue, like.length, myID, cardOwnerID, cardID, likesOwnerID);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false)
    })
}

function deletePostsCard(cardID) {
  return fetch(`${configCohort.url}/${cardID}`, {
    method: 'DELETE',
    headers: configCohort.headers,
  })
    .then(onResponce)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
}

function putPostsLikeCard(cardID, method) {
  return fetch(`${configCohort.url}/likes/${cardID}`, {
    method: method,
    headers: configCohort.headers,
  })
    .then(onResponce)
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
}

function pathPostsAvatar(avatarInputValue) {
  renderLoading(true);
  return fetch(`${configCohort.urlUser}/avatar`, {
    method: 'PATCH',
    headers: configCohort.headers,
    body: JSON.stringify({
      avatar: `${avatarInputValue}`,
    })
  })
    .then(onResponce)
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false)
    })
}

export {
  getPostsMe,
  postPostsCard,
  pathPostsPersonalInfo,
  deletePostsCard,
  putPostsLikeCard,
  pathPostsAvatar,
};

